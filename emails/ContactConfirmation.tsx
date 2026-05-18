import { Body, Container, Head, Html, Link, Preview, Section, Text } from '@react-email/components';

interface ContactConfirmationProps {
  name: string;
  type: 'business' | 'individual';
}

export function ContactConfirmation({ name, type }: ContactConfirmationProps) {
  const inquiryLabel = type === 'business' ? 'business' : 'individual';

  return (
    <Html>
      <Head />
      <Preview>Welcome to Walktopus - your quote request is in</Preview>
      <Body
        style={{
          margin: '0',
          padding: '0',
          backgroundColor: '#F3F1E7',
          color: '#333333',
          fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
          WebkitTextSizeAdjust: '100%',
          msTextSizeAdjust: '100%',
        }}
      >
        <Container style={{ margin: '0 auto', padding: '40px 10px' }}>
          <Section
            style={{
              maxWidth: '550px',
              margin: '0 auto',
              backgroundColor: '#FFFFFF',
              borderTop: '8px solid #F05A3E',
              borderRadius: '4px',
              overflow: 'hidden',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            }}
          >
            <Section style={{ padding: '40px 40px 15px 40px' }}>
              <table role="presentation" cellSpacing="0" cellPadding="0" border={0}>
                <tbody>
                  <tr>
                    <td
                      style={{
                        backgroundColor: '#F05A3E',
                        color: '#333333',
                        fontSize: '24px',
                        fontWeight: 900,
                        letterSpacing: '1px',
                        padding: '6px 4px 6px 14px',
                        fontFamily: 'Arial Black, sans-serif',
                      }}
                    >
                      WALK
                    </td>
                    <td
                      style={{
                        color: '#333333',
                        fontSize: '24px',
                        fontWeight: 900,
                        letterSpacing: '1px',
                        paddingLeft: '4px',
                        fontFamily: 'Arial Black, sans-serif',
                      }}
                    >
                      TOPUS
                    </td>
                  </tr>
                </tbody>
              </table>
            </Section>

            <Section style={{ padding: '15px 40px 40px 40px' }}>
              <Text
                style={{
                  margin: '0 0 15px 0',
                  fontSize: '24px',
                  fontWeight: 800,
                  color: '#333333',
                  textTransform: 'uppercase',
                  lineHeight: '1.2',
                }}
              >
                We don&apos;t just run ads.
                <br />
                <span style={{ color: '#F05A3E' }}>We engineer growth.</span>
              </Text>

              <Text style={{ margin: '0 0 12px 0', fontSize: '15px', lineHeight: '1.6' }}>Hi {name},</Text>

              <Text style={{ margin: '0 0 12px 0', fontSize: '15px', lineHeight: '1.6' }}>
                Your {inquiryLabel} quote request is in. Thanks for reaching out to Walktopus.
              </Text>

              <Text style={{ margin: '0 0 25px 0', fontSize: '15px', lineHeight: '1.6' }}>
                Most agencies offer recycled templates and generic posting. We do the opposite: strategy, creative, and
                performance execution built for measurable outcomes. Our team will respond within 24 hours.
              </Text>

              <table role="presentation" cellSpacing="0" cellPadding="0" border={0} style={{ margin: '10px 0' }}>
                <tbody>
                  <tr>
                    <td align="center" bgcolor="#333333" style={{ borderRadius: '4px' }}>
                      <Link
                        href="https://www.walktopus.in/contact"
                        target="_blank"
                        style={{
                          backgroundColor: '#333333',
                          color: '#F3F1E7',
                          padding: '12px 24px',
                          fontSize: '14px',
                          fontWeight: 700,
                          textDecoration: 'none',
                          display: 'inline-block',
                          textTransform: 'uppercase',
                          letterSpacing: '1px',
                          borderRadius: '4px',
                        }}
                      >
                        Let&apos;s Fix Your Marketing -&gt;
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Section>

            <Section style={{ backgroundColor: '#333333', padding: '35px 40px', textAlign: 'center' }}>
              <Text
                style={{
                  margin: '0 0 8px 0',
                  color: '#F3F1E7',
                  fontWeight: 700,
                  fontSize: '13px',
                  letterSpacing: '0.5px',
                }}
              >
                WALKTOPUS
              </Text>
              <Text style={{ margin: '0 0 15px 0', color: '#A0A0A0', fontSize: '11px', lineHeight: '1.5' }}>
                Have a marketing bottleneck or an upcoming launch? Reply directly to this email and our team will help
                you move fast.
              </Text>
              <Text style={{ margin: '0 0 8px 0', color: '#A0A0A0', fontSize: '11px', lineHeight: '1.5' }}>
                A Proud Initiative by Dgen Technologies Private Limited
              </Text>
              <Text style={{ margin: '0', fontSize: '12px' }}>
                <Link href="https://www.walktopus.in" style={{ color: '#F05A3E', textDecoration: 'none', fontWeight: 700 }}>
                  Website
                </Link>{' '}
                <span style={{ color: '#555555' }}>|</span>{' '}
                <Link
                  href="https://www.linkedin.com/company/walktopus"
                  style={{ color: '#F05A3E', textDecoration: 'none', fontWeight: 700 }}
                >
                  LinkedIn
                </Link>
              </Text>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
