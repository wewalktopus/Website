import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminRequest } from '@/lib/admin-auth';
import { getFirebaseAdminDb } from '@/lib/firebase-admin';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  const session = await verifyAdminRequest(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const db = getFirebaseAdminDb();

    // Run all counts in parallel
    const [leadsSnap, newLeadsSnap, subscribersSnap, blogsSnap, convertedSnap] = await Promise.all([
      db.collection('leads').count().get(),
      db.collection('leads').where('status', '==', 'new').count().get(),
      db.collection('newsletter_subscribers').where('active', '==', true).count().get(),
      db.collection('blogs').where('status', '==', 'published').count().get(),
      db.collection('leads').where('status', '==', 'converted').count().get(),
    ]);

    const todayKey = new Date().toISOString().slice(0, 10);
    const [dailyEmailUsageSnap] = await Promise.all([
      db.collection('email_daily_limits').doc(todayKey).get(),
    ]);
    const emailsSentToday = Number(dailyEmailUsageSnap.data()?.used ?? 0);

    // Recent leads (last 10)
    const recentLeadsSnap = await db.collection('leads')
      .orderBy('createdAt', 'desc')
      .limit(10)
      .get();

    const recentLeads = recentLeadsSnap.docs.map(doc => ({
      id: doc.id,
      name: doc.data().name,
      email: doc.data().email,
      type: doc.data().type,
      status: doc.data().status,
      createdAt: doc.data().createdAt?.toDate?.()?.toISOString() ?? null,
    }));

    // Lead breakdown by type
    const [bizLeadsSnap, indLeadsSnap] = await Promise.all([
      db.collection('leads').where('type', '==', 'business').count().get(),
      db.collection('leads').where('type', '==', 'individual').count().get(),
    ]);

    // Lead breakdown by status
    const [contactedSnap, closedSnap] = await Promise.all([
      db.collection('leads').where('status', '==', 'contacted').count().get(),
      db.collection('leads').where('status', '==', 'closed').count().get(),
    ]);

    return NextResponse.json({
      stats: {
        totalLeads: leadsSnap.data().count,
        newLeads: newLeadsSnap.data().count,
        convertedLeads: convertedSnap.data().count,
        contactedLeads: contactedSnap.data().count,
        closedLeads: closedSnap.data().count,
        activeSubscribers: subscribersSnap.data().count,
        publishedBlogs: blogsSnap.data().count,
        emailsSentToday,
        emailDailyLimit: 100,
        leadsByType: {
          business: bizLeadsSnap.data().count,
          individual: indLeadsSnap.data().count,
        },
      },
      recentLeads,
    });
  } catch (err) {
    console.error('[admin/analytics GET]', err);
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
}
