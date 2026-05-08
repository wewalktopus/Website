import { Body, Container, Head, Html, Preview, Section, Text } from '@react-email/components';
import type { ContactPayload } from '@/types';

interface ContactNotificationProps {
  data: ContactPayload;
}

export function ContactNotification({ data }: ContactNotificationProps) {
  return (
    <Html>
      <Head />
      <Preview>New lead received from Walktopus website</Preview>
      <Body style={{ backgroundColor: '#EEEAD9', color: '#3A3737', fontFamily: 'Arial, sans-serif' }}>
        <Container style={{ margin: '0 auto', padding: '24px' }}>
          <Section style={{ backgroundColor: '#ffffff', padding: '24px', border: '1px solid #D9D2BF' }}>
            <Text style={{ fontWeight: 700 }}>New Lead: {data.name}</Text>
            <Text>Type: {data.type}</Text>
            <Text>Email: {data.email}</Text>
            <Text>Phone: {data.phone}</Text>
            <Text>Company: {data.company ?? 'N/A'}</Text>
            <Text>Services: {data.services.join(', ')}</Text>
            <Text>Budget: {data.budgetRange ?? 'Not specified'}</Text>
            <Text>Message: {data.message}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
