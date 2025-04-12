import React from 'react'
import styled from 'styled-components'
import { useNavigate, useLocation } from 'react-router-dom'

const NavContainer = styled.div`
  position: fixed;
  top: 30px;
  left: 0;
  width: 200px;
  background: var(--kali-terminal-bg);
  border-right: 1px solid var(--kali-terminal-border);
  height: calc(100vh - 30px);
  z-index: 10;
  padding: 1rem 0;
  font-family: 'Share Tech Mono', monospace;
`

const NavItem = styled.div<{ active?: boolean }>`
  padding: 0.5rem 1rem;
  color: ${props => props.active ? 'var(--kali-blue)' : 'var(--kali-text)'};
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: var(--kali-terminal-header);
    color: var(--kali-blue);
  }

  &::before {
    content: ${props => props.active ? '"▶"' : '"$"'};
    color: var(--kali-blue);
    font-size: 0.8rem;
  }
`

const Navigation = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems = [
    { path: '/home', label: 'Home' },
    { path: '/career', label: 'Career' },
    { path: '/articles', label: 'Articles' }
  ]

  return (
    <NavContainer>
      {menuItems.map(item => (
        <NavItem
          key={item.path}
          active={location.pathname === item.path}
          onClick={() => navigate(item.path)}
        >
          {item.label}
        </NavItem>
      ))}
    </NavContainer>
  )
}

export default Navigation 