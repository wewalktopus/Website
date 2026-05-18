import { Body, Container, Head, Html, Preview, Section, Text } from '@react-email/components';

interface ContactConfirmationProps {
  name: string;
  type: 'business' | 'individual';
}

export function ContactConfirmation({ name, type }: ContactConfirmationProps) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to Walktopus - your quote request is in</Preview>
      <Body style={{ backgroundColor: '#EEEAD9', color: '#3A3737', fontFamily: 'Arial, sans-serif' }}>
        <Container style={{ margin: '0 auto', padding: '24px' }}>
          <Section style={{ backgroundColor: '#ffffff', padding: '24px', border: '1px solid #D9D2BF' }}>
            <Text>Welcome to Walktopus, {name}.</Text>
            <Text>
              Thanks for requesting a quote with us. We received your {type} inquiry and our team will respond within 24
              hours.
            </Text>
            <Text style={{ color: '#EF4D30', fontWeight: 700 }}>A Proud Initiative by Dgen Technologies Private Limited</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
