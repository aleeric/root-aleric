import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { motion } from 'framer-motion'
import AnimatedHeader from './AnimatedHeader'

const Container = styled.div`
  padding: 2rem;
  color: #FFFFFF;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`

const Header = styled.div`
  margin-bottom: 2rem;
  text-align: center;
`

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #729FCF;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #CCCCCC;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const scanline = keyframes`
  0% { transform: translateY(0); }
  100% { transform: translateY(100%); }
`;

const typewriter = keyframes`
  from { width: 0 }
  to { width: 100% }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const blink = keyframes`
  0%, 100% { border-color: var(--kali-blue); }
  50% { border-color: transparent; }
`;

const glow = keyframes`
  0% { box-shadow: 0 0 5px var(--kali-blue); }
  50% { box-shadow: 0 0 15px var(--kali-blue); }
  100% { box-shadow: 0 0 5px var(--kali-blue); }
`

const TimelineContainer = styled.div`
  position: relative;
  margin: 2rem 0;
  padding-left: 2rem;
  animation: ${fadeIn} 0.8s ease-out;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background: var(--kali-terminal-border);
  }
`

const TimelineEvent = styled.div<{ active?: boolean; delay?: number }>`
  position: relative;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: var(--kali-terminal-bg);
  border: 1px solid var(--kali-terminal-border);
  border-radius: 4px;
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.8s ease-out ${props => props.delay || 0}s both;

  &:hover {
    border-color: var(--kali-blue);
    transform: translateX(4px);
    box-shadow: 0 0 10px rgba(114, 159, 207, 0.3);
  }

  &::before {
    content: '';
    position: absolute;
    left: -2.5rem;
    top: 1.5rem;
    width: 1rem;
    height: 1rem;
    background: var(--kali-terminal-bg);
    border: 2px solid var(--kali-blue);
    border-radius: 50%;
  }
`

const EventHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`

const EventTitle = styled.h3`
  color: var(--kali-blue);
  margin: 0;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--kali-blue);
    transition: width 0.3s ease;
  }
  
  ${TimelineEvent}:hover &::after {
    width: 100%;
  }
`

const EventDate = styled.span`
  color: var(--kali-text);
  opacity: 0.8;
`

const EventCompany = styled.div`
  font-weight: bold;
  margin-bottom: 0.5rem;
`

const EventDetails = styled.div`
  margin-top: 1rem;
  opacity: 1;
  visibility: visible;
  position: relative;
  padding: 0.5rem 0;
`

const AchievementList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1rem 0;

  li {
    margin-bottom: 0.8rem;
    padding-left: 1.5rem;
    position: relative;
    opacity: 1;
    transform: none;
    line-height: 1.6;
    color: var(--kali-text);

    &::before {
      content: '$';
      position: absolute;
      left: 0;
      color: var(--kali-blue);
    }
  }
`

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-top: 1.5rem;
  padding-bottom: 0.5rem;
`

const Tag = styled.span`
  background: var(--kali-terminal-bg);
  color: var(--kali-blue);
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  font-size: 0.9rem;
  border: 1px solid var(--kali-blue);
  transition: all 0.2s ease;
  
  &:hover {
    background: var(--kali-blue);
    color: var(--kali-terminal-bg);
    transform: translateY(-2px);
  }
`

const SkillsContainer = styled.div`
  margin-top: 3rem;
  animation: ${fadeIn} 0.8s ease-out 0.5s both;
`

const SkillCategory = styled.div`
  margin-bottom: 2rem;
  opacity: 1;
  transform: none;
`

const CategoryTitle = styled.h3`
  color: var(--kali-blue);
  margin-bottom: 1rem;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 50px;
    height: 2px;
    background: var(--kali-blue);
  }
`

const SkillBar = styled.div`
  margin-bottom: 1rem;
`

const SkillInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`

const SkillName = styled.span`
  color: var(--kali-text);
`

const SkillLevel = styled.span`
  color: var(--kali-blue);
`

const ProgressBar = styled.div`
  height: 4px;
  background: var(--kali-terminal-header);
  border-radius: 2px;
  overflow: hidden;
`

const Progress = styled.div<{ level: number }>`
  height: 100%;
  background: var(--kali-blue);
  width: ${props => props.level}%;
  animation: ${glow} 2s infinite;
`

const EducationContainer = styled.div`
  margin-top: 3rem;
  animation: ${fadeIn} 0.8s ease-out 0.3s both;
`

const EducationTitle = styled.h3`
  color: var(--kali-blue);
  margin-bottom: 1.5rem;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 50px;
    height: 2px;
    background: var(--kali-blue);
  }
`

const EducationItem = styled.div`
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: var(--kali-terminal-header);
  border: 1px solid var(--kali-terminal-border);
  border-radius: 4px;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: var(--kali-blue);
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`

const SchoolName = styled.h4`
  color: var(--kali-blue);
  margin: 0 0 0.5rem 0;
`

const DegreeName = styled.div`
  font-weight: bold;
  margin-bottom: 0.5rem;
`

const EducationDate = styled.div`
  color: var(--kali-text);
  opacity: 0.8;
  margin-bottom: 0.5rem;
`

const EducationSkills = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`

const CertificationsContainer = styled.div`
  margin-top: 3rem;
  animation: ${fadeIn} 0.8s ease-out 0.4s both;
`

const CertificationsTitle = styled.h3`
  color: var(--kali-blue);
  margin-bottom: 1.5rem;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 50px;
    height: 2px;
    background: var(--kali-blue);
  }
`

const CertificationItem = styled.div`
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  background: var(--kali-terminal-header);
  border: 1px solid var(--kali-terminal-border);
  border-radius: 4px;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: var(--kali-blue);
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`

const CertificationName = styled.h4`
  color: var(--kali-blue);
  margin: 0 0 0.5rem 0;
`

const CertificationOrg = styled.div`
  font-weight: bold;
  margin-bottom: 0.5rem;
`

const CertificationDate = styled.div`
  color: var(--kali-text);
  opacity: 0.8;
  margin-bottom: 0.5rem;
`

const CertificationSkills = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`

const TerminalCursor = styled.span`
  display: inline-block;
  width: 8px;
  height: 16px;
  background-color: var(--kali-blue);
  margin-left: 5px;
  animation: blink 1s step-end infinite;
  
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
`

const SectionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`

const SectionCard = styled(motion.div)`
  background: rgba(31, 31, 31, 0.8);
  border: 1px solid #729FCF;
  border-radius: 8px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(114, 159, 207, 0.3);
  }
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`

const CardTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #729FCF;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.5rem;
  }
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`

const ItemList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

const Item = styled.li`
  margin-bottom: 0.8rem;
  display: flex;
  align-items: center;
  
  &:before {
    content: '►';
    color: #729FCF;
    margin-right: 0.5rem;
    font-size: 0.8rem;
  }
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`

const ParallaxLines = styled.div`
  position: fixed;
  top: 0; left: 0; width: 100vw; height: 100vh;
  pointer-events: none;
  z-index: 0;
  @media (min-width: 769px) { display: none; }
  & > div {
    position: absolute;
    width: 100vw;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--kali-blue), transparent);
    opacity: 0.08;
    animation: parallaxMove 10s linear infinite;
  }
  & > div:nth-child(1) { top: 20%; animation-delay: 0s; }
  & > div:nth-child(2) { top: 40%; animation-delay: 2s; }
  & > div:nth-child(3) { top: 60%; animation-delay: 4s; }
  & > div:nth-child(4) { top: 80%; animation-delay: 6s; }
  @keyframes parallaxMove {
    0% { transform: translateX(-10vw); }
    100% { transform: translateX(10vw); }
  }
`;

const CRTOverlay = styled.div`
  pointer-events: none;
  position: fixed;
  z-index: 10;
  top: 0; left: 0; width: 100vw; height: 100vh;
  background: repeating-linear-gradient(
    to bottom,
    rgba(114,159,207,0.04) 0px,
    rgba(114,159,207,0.04) 1px,
    transparent 1px,
    transparent 4px
  );
  mix-blend-mode: lighten;
  @media (min-width: 769px) { display: none; }
`;

const DesktopParallaxLines = styled(ParallaxLines)`
  @media (max-width: 768px) { display: none; }
  z-index: 1;
`;

const DesktopCRTOverlay = styled(CRTOverlay)`
  @media (max-width: 768px) { display: none; }
  z-index: 2;
`;

const MobileHeader = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 1rem 1rem 1rem;
    text-align: center;
    background: linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.95) 100%);
    border-bottom: 1px solid var(--kali-blue);
    box-shadow: 0 0 20px rgba(0, 0, 255, 0.1);
    animation: ${fadeIn} 0.8s ease-out;
    position: relative;
    overflow: hidden;
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 255, 0.1) 50%, transparent 100%);
      animation: ${scanline} 4s linear infinite;
      pointer-events: none;
    }
  }
`;

const MobileTitle = styled.h1`
  color: var(--kali-blue);
  font-size: 2rem;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  animation: ${fadeIn} 0.5s ease-out, ${pulse} 3s infinite;
  text-shadow: 0 0 10px var(--kali-blue);
`;

const Typewriter = styled.span`
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  border-right: 2px solid var(--kali-blue);
  width: 0;
  animation: ${typewriter} 2s steps(20, end) 0.2s forwards, ${blink} 1s step-end infinite 2.2s;
`;

interface TimelineItem {
  id: string;
  date: string;
  company: string;
  role: string;
  achievements: string[];
  technologies: string[];
}

interface SkillItem {
  name: string;
  level: number;
  yearsOfExperience: number;
}

interface SkillCategoryType {
  name: string;
  skills: SkillItem[];
}

interface EducationItem {
  school: string;
  degree: string;
  date: string;
  skills: string[];
}

interface CertificationItem {
  name: string;
  organization: string;
  issueDate: string;
  expirationDate?: string;
  skills: string[];
}

const timeline: TimelineItem[] = [
  {
    id: 'satispay',
    date: 'January 2025 - Present',
    company: 'Satispay Spa',
    role: 'Cloud Security Engineer',
    achievements: [
      'Responsible for improving and maintaining security solutions to enable effective monitoring, identification, and response to vulnerabilities across cloud and on-premises environments',
      'Participating in the detection, analysis, and response to information security incidents',
      'Collaborating with cross-functional teams to design and validate secure architectures aligned with business objectives',
      'Leveraging DevSecOps methodologies to integrate automated and manual security measures into the development process',
      'Contributing to the continuous improvement of organizational processes and procedures',
      'Supporting regulatory compliance efforts by addressing obligations imposed by regulatory authorities'
    ],
    technologies: ['Splunk', 'Splunk Enterprise Security', 'Cloud Security', 'DevSecOps', 'Security Monitoring', 'Incident Response', 'Compliance']
  },
  {
    id: 'moviri',
    date: 'November 2023 - January 2025',
    company: 'Moviri Spa',
    role: 'Cyber Security Analyst',
    achievements: [
      'Responsible for the design and management of SIEM and anti-fraud infrastructure, with particular expertise on Splunk',
      'Creation of monitoring dashboards to provide visibility into real-time on security events and suspicious activity',
      'Development and optimization of anti-fraud rules and alerts, to detect and prevent potential threats and fraudulent behavior',
      'Implementation of security monitoring solutions for enterprise clients',
      'Analysis of security logs and events to identify potential security incidents',
      'Collaboration with development teams to implement security controls'
    ],
    technologies: ['Splunk', 'SIEM', 'Anti-Fraud', 'Security Monitoring', 'Fraud Investigation', 'Security Dashboards', 'Alert Management']
  },
  {
    id: 'kpmg',
    date: 'April 2021 - June 2021',
    company: 'KPMG Italy',
    role: 'Cyber Security Intern',
    achievements: [
      'Consulting activities dedicated to the assessment and management of risks related to the technologies supporting corporate business processes',
      'Inclusion within a team project of the "Information Risk Management" line of services',
      'Engaged in the analysis and management of cyber risk',
      'Assisted in security assessments for client organizations',
      'Participated in vulnerability scanning and reporting',
      'Supported the development of security recommendations for clients'
    ],
    technologies: ['Nessus', 'Burp Suite', 'Risk Assessment', 'Vulnerability Scanning', 'Security Consulting', 'Information Risk Management', 'Cyber Risk Analysis']
  }
];

const education: EducationItem[] = [
  {
    school: 'University of Milan',
    degree: 'Master\'s Degree in Computer Security',
    date: 'September 2021 - October 2023',
    skills: []
  },
  {
    school: 'University of Milan-Bicocca',
    degree: 'Bachelor\'s Degree in Computer Science',
    date: 'January 2018 - July 2021',
    skills: []
  },
  {
    school: 'IIS Niccolò Machiavelli',
    degree: 'Scientific High School Diploma',
    date: '2013 - 2018',
    skills: []
  }
];

const certifications: CertificationItem[] = [
  {
    name: 'AWS Certified DevOps Engineer Professional (DOP-C02)',
    organization: 'Udemy',
    issueDate: 'April 2025',
    skills: ['AWS Cloud Infrastructure', 'DevOps Practices', 'CI/CD Pipelines', 'Infrastructure as Code', 'Cloud Security']
  },
  {
    name: 'Splunk Enterprise Certified Admin',
    organization: 'Splunk',
    issueDate: 'November 2024',
    expirationDate: 'November 2027',
    skills: ['Splunk Enterprise Administration', 'Data Management', 'User Management', 'Security Configuration', 'Troubleshooting']
  },
  {
    name: 'Splunk Core Certified Power User',
    organization: 'Splunk',
    issueDate: 'September 2024',
    expirationDate: 'September 2027',
    skills: ['Advanced Search Commands', 'Data Analysis', 'Field Extractions', 'Lookups and Field Aliases', 'Reports and Dashboards']
  },
  {
    name: 'SpyCloud Technical Training',
    organization: 'SpyCloud',
    issueDate: 'March 2024',
    skills: ['Post-Infection Remediation', 'Ransomware Prevention', 'Automated ATO Prevention', 'Session Hijacking Prevention', 'Threat Actor Attribution', 'Fraud Prevention', 'Dark Web Monitoring']
  },
];


const securityTools = [
  'Nmap - Network scanning and security auditing',
  'Wireshark - Network protocol analyzer',
  'Metasploit - Penetration testing framework',
  'Burp Suite - Web application security testing',
  'John the Ripper - Password cracking',
  'Aircrack-ng - Wireless network security',
  'Hashcat - Advanced password recovery',
  'SQLmap - Automated SQL injection tool',
  'Nikto - Web server scanner',
  'Hydra - Password brute-forcing tool',
  'OpenVAS - Vulnerability scanning and management',
  'Nessus - Vulnerability assessment tool',
  'WPScan - WordPress vulnerability scanner',
  'wafw00f - Web application firewall detection',
  'Ettercap - Network sniffing and spoofing',
  'Bettercap - Advanced MITM framework',
  'ID Spoofer - Identity spoofing tool',
  'VeraCrypt - Disk encryption software',
  'Secret Sharing - Cryptographic key splitting',
  'PhoneInFoga - Phone number OSINT tool',
  'Sherlock - Username reconnaissance',
  'Intelx - Deep OSINT search engine',
  'IMSI Analyzer - GSM forensics tool',
  'FakeBTS - Mobile base station simulator'
];


const securityDomains = [
  'Network Security - Protecting network infrastructure',
  'Web Security - Securing web applications',
  'Cloud Security - Securing cloud infrastructure',
  'Cryptography - Implementing secure communication',
  'Incident Response - Handling security incidents',
  'Threat Intelligence - Gathering and analyzing threat data',
  'Malware Analysis - Studying malicious software',
  'Social Engineering - Understanding human vulnerabilities',
  'OSINT - Open Source Intelligence collection and analysis',
  'Password Cracking - Techniques to recover credentials',
  'Sniffing & Spoofing - Network manipulation and MITM',
  'Web App Vulnerability - Detecting and exploiting web flaws',
  'GSM Forensics - Mobile signal and base station analysis'
];


const technologies = [
  'Linux - Various distributions for security testing (Kali, Parrot, Dragon OS, Debian, Ubuntu, Oracle Linux)',
  'Windows - Windows security and administration',
  'MacOS - Apple operating system security',
  'Docker - Container security',
  'Kubernetes - Container orchestration security',
  'AWS - Cloud security on Amazon Web Services',
  'Python - Security automation and scripting',
  'JavaScript - Web security and frontend development',
  'SQL - Data extraction and injection testing',
  'HTML & CSS - Web content structuring and styling',
  'WordPress - CMS security and management',
  'Shopify - E-commerce platform configuration',
  'VMware & VirtualBox - Virtualization platforms'
];


const CareerSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    setIsVisible(true)
  }, [])
  
  return (
    <Container>
      <div className="desktop-only">
        <AnimatedHeader />
      </div>
      <DesktopParallaxLines>
        <div></div><div></div><div></div><div></div>
      </DesktopParallaxLines>
      <DesktopCRTOverlay />
      <ParallaxLines>
        <div></div><div></div><div></div><div></div>
      </ParallaxLines>
      <CRTOverlay />
      <MobileHeader>
        <MobileTitle>
          <Typewriter>Career@aleric</Typewriter>
        </MobileTitle>
        <Subtitle>
          Cybersecurity Career & Journey
        </Subtitle>
      </MobileHeader>
      <Header>
        <Title>Cybersecurity Career</Title>
        <Subtitle>Explore my professional journey in cybersecurity</Subtitle>
      </Header>
      
      <TimelineContainer>
        {timeline.map((item, index) => (
          <TimelineEvent key={item.id} delay={index * 0.2}>
            <EventHeader>
              <EventTitle>{item.role}</EventTitle>
              <EventDate>{item.date}</EventDate>
            </EventHeader>
            <EventCompany>{item.company}</EventCompany>
            <EventDetails>
              <AchievementList>
                {item.achievements.map((achievement, i) => (
                  <li key={i}>{achievement}</li>
                ))}
              </AchievementList>
              <TagContainer>
                {item.technologies.map((tech, i) => (
                  <Tag key={i}>{tech}</Tag>
                ))}
              </TagContainer>
            </EventDetails>
          </TimelineEvent>
        ))}
      </TimelineContainer>
      
      <EducationContainer>
        <EducationTitle>Education</EducationTitle>
        {education.map((item, index) => (
          <EducationItem key={index}>
            <SchoolName>{item.school}</SchoolName>
            <DegreeName>{item.degree}</DegreeName>
            <EducationDate>{item.date}</EducationDate>
            {item.skills.length > 0 && (
              <EducationSkills>
                {item.skills.map((skill, i) => (
                  <Tag key={i}>{skill}</Tag>
                ))}
              </EducationSkills>
            )}
          </EducationItem>
        ))}
      </EducationContainer>
      
      <CertificationsContainer>
        <CertificationsTitle>Certifications</CertificationsTitle>
        {certifications.map((item, index) => (
          <CertificationItem key={index}>
            <CertificationName>{item.name}</CertificationName>
            <CertificationOrg>{item.organization}</CertificationOrg>
            <CertificationDate>
              {item.issueDate}
              {item.expirationDate && ` - ${item.expirationDate}`}
            </CertificationDate>
            {item.skills.length > 0 && (
              <CertificationSkills>
                {item.skills.map((skill, i) => (
                  <Tag key={i}>{skill}</Tag>
                ))}
              </CertificationSkills>
            )}
          </CertificationItem>
        ))}
      </CertificationsContainer>
      

      
      <SectionGrid>
        <SectionCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <CardTitle>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="#729FCF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 7L12 12L22 7" stroke="#729FCF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 22V12" stroke="#729FCF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Security Tools
          </CardTitle>
          <ItemList>
            {securityTools.map((tool, index) => (
              <Item key={index}>{tool}</Item>
            ))}
          </ItemList>
        </SectionCard>
        
        <SectionCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <CardTitle>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#729FCF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19.4 15C19.1277 15.6171 19.2583 16.3378 19.73 16.82L19.79 16.88C20.1656 17.2551 20.3765 17.7642 20.3765 18.295C20.3765 18.8258 20.1656 19.3349 19.79 19.71C19.4149 20.0856 18.9058 20.2965 18.375 20.2965C17.8442 20.2965 17.3351 20.0856 16.96 19.71L16.9 19.65C16.4178 19.1783 15.6971 19.0477 15.08 19.32C14.4755 19.5791 14.0826 20.1724 14.08 20.83V21C14.08 22.1046 13.1846 23 12.08 23C10.9754 23 10.08 22.1046 10.08 21V20.91C10.0642 20.2327 9.63587 19.6339 9 19.4C8.38291 19.1277 7.66219 19.2583 7.18 19.73L7.12 19.79C6.74485 20.1656 6.23582 20.3765 5.705 20.3765C5.17418 20.3765 4.66515 20.1656 4.29 19.79C3.91435 19.4149 3.70349 18.9058 3.70349 18.375C3.70349 17.8442 3.91435 17.3351 4.29 16.96L4.35 16.9C4.82167 16.4178 4.95231 15.6971 4.68 15.08C4.42093 14.4755 3.82764 14.0826 3.17 14.08H3C1.89543 14.08 1 13.1846 1 12.08C1 10.9754 1.89543 10.08 3 10.08H3.09C3.76733 10.0642 4.36613 9.63587 4.6 9C4.87231 8.38291 4.74167 7.66219 4.27 7.18L4.21 7.12C3.83435 6.74485 3.62349 6.23582 3.62349 5.705C3.62349 5.17418 3.83435 4.66515 4.21 4.29C4.58515 3.91435 5.09418 3.70349 5.625 3.70349C6.15582 3.70349 6.66485 3.91435 7.04 4.29L7.1 4.35C7.58219 4.82167 8.30291 4.95231 8.92 4.68H9C9.60447 4.42093 9.99738 3.82764 10 3.17V3C10 1.89543 10.8954 1 12 1C13.1046 1 14 1.89543 14 3V3.09C14.0026 3.74764 14.3955 4.34093 15 4.6C15.6171 4.87231 16.3378 4.74167 16.82 4.27L16.88 4.21C17.2551 3.83435 17.7642 3.62349 18.295 3.62349C18.8258 3.62349 19.3349 3.83435 19.71 4.21C20.0856 4.58515 20.2965 5.09418 20.2965 5.625C20.2965 6.15582 20.0856 6.66485 19.71 7.04L19.65 7.1C19.1783 7.58219 19.0477 8.30291 19.32 8.92V9C19.5791 9.60447 20.1724 9.99738 20.83 10H21C22.1046 10 23 10.8954 23 12C23 13.1046 22.1046 14 21 14H20.91C20.2524 14.0026 19.6591 14.3955 19.4 15Z" stroke="#729FCF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Security Domains
          </CardTitle>
          <ItemList>
            {securityDomains.map((domain, index) => (
              <Item key={index}>{domain}</Item>
            ))}
          </ItemList>
        </SectionCard>
        
        <SectionCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <CardTitle>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6H20" stroke="#729FCF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4 12H20" stroke="#729FCF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4 18H20" stroke="#729FCF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Technologies
          </CardTitle>
          <ItemList>
            {technologies.map((tech, index) => (
              <Item key={index}>{tech}</Item>
            ))}
          </ItemList>
        </SectionCard>
      </SectionGrid>
    </Container>
  )
}

export default CareerSection 