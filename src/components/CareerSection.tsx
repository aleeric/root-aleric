import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'

const SectionContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - 30px);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  position: relative;
  
  @media (max-width: 768px) {
    padding-bottom: calc(var(--mobile-menu-height) + 2rem);
    min-height: calc(100vh - var(--topbar-height) - var(--mobile-menu-height));
  }
`

const CareerContainer = styled.div`
  padding: 2rem;
  color: var(--kali-text);
  max-width: 1200px;
  margin: 0 auto;
`

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`

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

const SectionTitle = styled.h2`
  color: var(--kali-blue);
  margin-bottom: 2rem;
  position: relative;
  display: inline-block;
  animation: ${fadeIn} 0.8s ease-out;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100px;
    height: 3px;
    background: var(--kali-blue);
  }
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
    company: 'Satispay',
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
    company: 'Moviri',
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
    skills: ['Linux', 'Cryptography']
  },
  {
    school: 'University of Milan-Bicocca',
    degree: 'Bachelor\'s Degree in Computer Science',
    date: 'January 2018 - July 2021',
    skills: ['Basic Java Programming', 'Linux']
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

const skillCategories: SkillCategoryType[] = [
  {
    name: 'Security Tools',
    skills: [
      { name: 'Nmap', level: 100, yearsOfExperience: 0 },
      { name: 'Nessus', level: 100, yearsOfExperience: 0 },
      { name: 'Burp Suite', level: 100, yearsOfExperience: 0 },
      { name: 'Metasploit', level: 100, yearsOfExperience: 0 },
      { name: 'Hashcat', level: 100, yearsOfExperience: 0 }
    ]
  },
  {
    name: 'Security Domains',
    skills: [
      { name: 'Web Application Security', level: 100, yearsOfExperience: 0 },
      { name: 'Network Architecture', level: 100, yearsOfExperience: 0 },
      { name: 'Unix/Linux Administration', level: 100, yearsOfExperience: 0 },
      { name: 'Post-Infection Remediation', level: 100, yearsOfExperience: 0 },
      { name: 'Ransomware Prevention', level: 100, yearsOfExperience: 0 },
      { name: 'Automated ATO Prevention', level: 100, yearsOfExperience: 0 },
      { name: 'Session Hijacking Prevention', level: 100, yearsOfExperience: 0 },
      { name: 'Threat Actor Attribution', level: 100, yearsOfExperience: 0 },
      { name: 'Fraud Prevention', level: 100, yearsOfExperience: 0 },
      { name: 'Dark Web Monitoring', level: 100, yearsOfExperience: 0 }
    ]
  },
  {
    name: 'Platforms & Technologies',
    skills: [
      { name: 'Splunk', level: 100, yearsOfExperience: 0 },
      { name: 'AWS', level: 100, yearsOfExperience: 0 },
      { name: 'Linux', level: 100, yearsOfExperience: 0 },
      { name: 'OSINT', level: 100, yearsOfExperience: 0 },
      { name: 'Digital Forensics', level: 100, yearsOfExperience: 0 },
      { name: 'Penetration Testing', level: 100, yearsOfExperience: 0 },
      { name: 'Cryptography', level: 100, yearsOfExperience: 0 }
    ]
  }
];

const CareerSection: React.FC = () => {
  const [typingText, setTypingText] = useState('');
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const fullText = "root@aleric:~/career$ cat profile.txt";

  useEffect(() => {
    if (currentCharIndex < fullText.length) {
      const timer = setTimeout(() => {
        setTypingText(prev => prev + fullText[currentCharIndex]);
        setCurrentCharIndex(prev => prev + 1);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [currentCharIndex, fullText]);

  return (
    <SectionContainer>
      <CareerContainer>
        <SectionTitle>
          {typingText}
          {currentCharIndex < fullText.length && <TerminalCursor />}
        </SectionTitle>
        
        <TimelineContainer>
          {timeline.map((event, index) => (
            <TimelineEvent
              key={event.id}
              delay={index * 0.2}
            >
              <EventHeader>
                <EventTitle>{event.role}</EventTitle>
                <EventDate>{event.date}</EventDate>
              </EventHeader>
              <EventCompany>{event.company}</EventCompany>
              <EventDetails>
                <AchievementList>
                  {event.achievements.map((achievement, index) => (
                    <li key={index}>{achievement}</li>
                  ))}
                </AchievementList>
                <TagContainer>
                  {event.technologies.map(tech => (
                    <Tag key={tech}>{tech}</Tag>
                  ))}
                </TagContainer>
              </EventDetails>
            </TimelineEvent>
          ))}
        </TimelineContainer>

        <EducationContainer>
          <EducationTitle>Education</EducationTitle>
          {education.map((edu, index) => (
            <EducationItem key={index}>
              <SchoolName>{edu.school}</SchoolName>
              <DegreeName>{edu.degree}</DegreeName>
              <EducationDate>{edu.date}</EducationDate>
              {edu.skills.length > 0 && (
                <EducationSkills>
                  {edu.skills.map(skill => (
                    <Tag key={skill}>{skill}</Tag>
                  ))}
                </EducationSkills>
              )}
            </EducationItem>
          ))}
        </EducationContainer>

        <CertificationsContainer>
          <CertificationsTitle>Certifications</CertificationsTitle>
          {certifications.map((cert, index) => (
            <CertificationItem key={index}>
              <CertificationName>{cert.name}</CertificationName>
              <CertificationOrg>{cert.organization}</CertificationOrg>
              <CertificationDate>
                {cert.issueDate}
                {cert.expirationDate && ` - Expires: ${cert.expirationDate}`}
              </CertificationDate>
              {cert.skills.length > 0 && (
                <CertificationSkills>
                  {cert.skills.map(skill => (
                    <Tag key={skill}>{skill}</Tag>
                  ))}
                </CertificationSkills>
              )}
            </CertificationItem>
          ))}
        </CertificationsContainer>

        <SkillsContainer>
          {skillCategories.map((category) => (
            <SkillCategory key={category.name}>
              <CategoryTitle>{category.name}</CategoryTitle>
              {category.skills.map(skill => (
                <SkillBar key={skill.name}>
                  <SkillInfo>
                    <SkillName>{skill.name}</SkillName>
                  </SkillInfo>
                  <ProgressBar>
                    <Progress level={skill.level} />
                  </ProgressBar>
                </SkillBar>
              ))}
            </SkillCategory>
          ))}
        </SkillsContainer>
      </CareerContainer>
    </SectionContainer>
  );
};

export default CareerSection; 