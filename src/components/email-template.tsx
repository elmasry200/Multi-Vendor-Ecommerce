import {
  Body,
  Button,
  Container,
  Row,
  Column,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface EmailTemplateProps {
  name?: string;
  redirectUrl: string;
  linkText: string;
  description: string;
  subject: string;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const EmailTemplate = ({
  name = "",
  redirectUrl = "/login",
  linkText,
  description,
  subject,
}: EmailTemplateProps) => (
  <Html>
    <Head />
    <Preview>
      {subject}
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`${baseUrl}/static/github.png`}
          width="32"
          height="32"
          alt="Github"
        />  
        <Text style={title}>{linkText}</Text>

        <Section style={section}>
          <Text style={text}>
            Hey <strong>{name}</strong>!
          </Text>
          <Text style={text}>
             {description}
          </Text>
          <Link style={button} href={`${baseUrl}/${redirectUrl}`}>
            {linkText}
          </Link>  
        </Section>

        {/* ✅ FIXED STRUCTURE - Social Media Links */}
        <Section>
          <Row>
            <Column>
              <Link href="/">
                <Img
                  src={`${baseUrl}/static/slack-twitter.png`}
                  width="32"
                  height="32"
                  alt="Twitter"
                  style={socialMediaIcon}
                />
              </Link>
            </Column>
            <Column>
              <Link href="/">
                <Img
                  src={`${baseUrl}/static/slack-facebook.png`}
                  width="32"
                  height="32"
                  alt="Facebook"
                  style={socialMediaIcon}
                />
              </Link>
            </Column>
            <Column>
              <Link href="/">
                <Img
                  src={`${baseUrl}/static/slack-linkedin.png`}
                  width="32"
                  height="32"
                  alt="LinkedIn"
                  style={socialMediaIcon}
                />
              </Link>
            </Column>
          </Row>
        </Section>
        {/* ✅ FIXED STRUCTURE - Removed incorrect closing tags */}

        <Text style={links}>
          <Link style={link}>Your security audit log</Link> ・{" "}
          <Link style={link}>Contact support</Link>
        </Text>

        <Text style={footer}>
          Auth System By JB, Inc. ・88 Colin P Kelly Jr Street ・San Francisco, CA 94107
        </Text>
      </Container>
    </Body>
  </Html>
);

export default EmailTemplate;

const main = {
  backgroundColor: '#ffffff',
  color: '#24292e',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
};

const container = {
  maxWidth: '480px',
  margin: '0 auto',
  padding: '20px 0 48px',
};

const socialMediaIcon = {
  display: 'inline',
  marginLeft: '16px',
};

const title = {
  fontSize: '24px',
  lineHeight: 1.25,
};

const section = {
  padding: '24px',
  border: 'solid 1px #dedede',
  borderRadius: '5px',
  textAlign: 'center' as const,
};

const text = {
  margin: '0 0 10px 0',
  textAlign: 'left' as const,
};

const button = {
  fontSize: '14px',
  backgroundColor: '#28a745',
  color: '#fff',
  lineHeight: 1.5,
  borderRadius: '0.5em',
  padding: '0.75em 1.5em',
  display: 'inline-block',
};

const links = {
  textAlign: 'center' as const,
};

const link = {
  color: '#0366d6',
  fontSize: '12px',
};

const footer = {
  color: '#6a737d',
  fontSize: '12px',
  textAlign: 'center' as const,
  marginTop: '60px',
};
