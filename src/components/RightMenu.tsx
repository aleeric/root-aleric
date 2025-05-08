import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useNavigate, useLocation } from 'react-router-dom'

const MenuContainer = styled.div`
  position: fixed;
  right: 0;
  top: var(--topbar-height);
  width: var(--rightmenu-width);
  height: calc(100vh - var(--topbar-height));
  background: var(--kali-dark);
  border-left: 1px solid var(--kali-border);
  padding: 1rem;
  z-index: 100;
  box-shadow: var(--shadow-md);

  @media (max-width: 768px) {
    top: auto;
    bottom: 0;
    left: 0;
    width: 100%;
    height: var(--mobile-menu-height);
    border-left: none;
    border-top: 1px solid var(--kali-blue);
    overflow: hidden;
    padding: 0;
    display: flex;
    justify-content: space-around;
    align-items: stretch;
    background: rgba(0, 0, 0, 0.95);
    box-shadow: var(--glow-blue);
  }
`

const MenuItem = styled.div<{ isActive: boolean; isSubmenu?: boolean; hidden?: boolean }>`
  color: ${props => props.isActive ? 'var(--kali-blue)' : 'var(--kali-text)'};
  padding: 0.5rem;
  margin: 0.25rem 0;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
  padding-left: ${props => props.isSubmenu ? '2rem' : '0'};
  opacity: ${props => props.hidden ? '0' : '1'};
  pointer-events: ${props => props.hidden ? 'none' : 'auto'};
  border-radius: 4px;

  &:hover {
    color: var(--kali-hover);
    background: rgba(0, 169, 255, 0.1);
    box-shadow: var(--glow-blue);
  }

  &::before {
    content: '${props => props.isActive ? '►' : ''}';
    position: absolute;
    right: 0.5rem;
    opacity: ${props => props.isActive ? '1' : '0'};
    color: var(--kali-blue);
    text-shadow: 0 0 8px var(--kali-blue);
  }

  @media (max-width: 768px) {
    padding: 4px 0;
    height: 100%;
    justify-content: center;
    margin: 0;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 0;
    
    &::before {
      display: none;
    }

    &:hover {
      background: rgba(0, 169, 255, 0.1);
    }

    ${props => props.isActive && `
      background: linear-gradient(to bottom, rgba(0, 169, 255, 0.1), transparent);
      box-shadow: inset 0 -2px 0 var(--kali-blue);
    `}
  }
`

const MenuItemContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: auto;
  position: relative;
  
  @media (max-width: 768px) {
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2px;
    width: auto;
    padding: 4px 0;
  }
`

const MenuIcon = styled.span`
  margin-right: 0.5rem;
  font-size: 1.2rem;
  color: var(--kali-blue);
  transition: all 0.3s ease;
  text-shadow: 0 0 8px rgba(0, 169, 255, 0.2);
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    margin: 0;
    font-size: 1.4rem;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    ${MenuItem}:hover & {
      transform: translateY(-2px);
      text-shadow: 0 0 8px var(--kali-blue);
    }
  }
`

const MenuLabel = styled.span`
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    font-size: 0.7rem;
    text-align: center;
    display: block;
    line-height: 1;
    opacity: 0.8;
    
    ${MenuItem}:hover & {
      opacity: 1;
      text-shadow: 0 0 8px var(--kali-blue);
    }
  }
`

const SubMenu = styled.div<{ isOpen: boolean }>`
  max-height: ${props => props.isOpen ? '500px' : '0'};
  overflow: hidden;
  transition: all 0.3s ease;
  background: var(--kali-dark);
  border-radius: 4px;
  margin-left: 1rem;
  border: 1px solid var(--kali-border);

  @media (max-width: 768px) {
    position: fixed;
    bottom: var(--mobile-menu-height);
    left: 0;
    width: 100%;
    max-height: ${props => props.isOpen ? '40vh' : '0'};
    background: rgba(0, 0, 0, 0.95);
    border-top: 1px solid var(--kali-blue);
    z-index: 99;
    display: flex;
    flex-direction: column;
    border-radius: 12px 12px 0 0;
    box-shadow: var(--glow-blue);
  }
`

const HiddenIndicator = styled.div<{ showLogs: boolean }>`
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.2);
  text-align: right;
  pointer-events: none;
  user-select: none;
  
  @media (max-width: 768px) {
    position: fixed;
    bottom: calc(var(--mobile-menu-height) + 10px);
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.3);
    background: rgba(0, 0, 0, 0.5);
    padding: 5px 10px;
    border-radius: 4px;
    display: ${props => props.showLogs ? 'block' : 'none'};
  }
`

const MobileSecretButton = styled.div`
  position: fixed;
  bottom: calc(var(--mobile-menu-height) + 5px);
  right: 10px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.3);
  cursor: pointer;
  z-index: 101;
  
  @media (min-width: 769px) {
    display: none;
  }
`

interface MenuItemType {
  path: string;
  label: string;
  submenu?: MenuItemType[];
  icon: string;
  hidden?: boolean;
}

const menuItems: MenuItemType[] = [
  { path: '/', label: 'Home', icon: '🏠' },
  { path: '/career', label: 'Career', icon: '💼' },
  { path: '/articles', label: 'Articles', icon: '📚' }
];

const RightMenu: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  const [showLogs, setShowLogs] = useState(false)
  const [keySequence, setKeySequence] = useState<string[]>([])
  const [tapCount, setTapCount] = useState(0)
  const [lastTapTime, setLastTapTime] = useState(0)
  const secretSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    const handleKeyDown = (e: KeyboardEvent) => {
      const newSequence = [...keySequence, e.key]
      setKeySequence(newSequence.slice(-10)) // Keep only the last 10 keys
      
      // Check if the sequence matches the secret sequence
      if (newSequence.slice(-10).join(',') === secretSequence.join(',')) {
        setShowLogs(true)
        // Show a brief flash effect
        const flash = document.createElement('div')
        flash.style.position = 'fixed'
        flash.style.top = '0'
        flash.style.left = '0'
        flash.style.width = '100%'
        flash.style.height = '100%'
        flash.style.backgroundColor = 'rgba(114, 159, 207, 0.3)'
        flash.style.zIndex = '9999'
        flash.style.pointerEvents = 'none'
        document.body.appendChild(flash)
        
        setTimeout(() => {
          document.body.removeChild(flash)
        }, 300)
      }
    }
    
    window.addEventListener('resize', handleResize)
    window.addEventListener('keydown', handleKeyDown)
    
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [keySequence])
  
  // Check if logs should be visible based on URL or secret sequence
  useEffect(() => {
    if (location.pathname === '/logs' && !showLogs) {
      navigate('/')
    }
  }, [location.pathname, showLogs, navigate])

  const handleMenuClick = (item: MenuItemType) => {
    if (item.submenu) {
      setOpenSubmenu(openSubmenu === item.path ? null : item.path)
    } else {
      navigate(item.path)
    }
  }

  const handleSecretButtonClick = () => {
    const now = Date.now()
    
    // Reset tap count if more than 2 seconds have passed since last tap
    if (now - lastTapTime > 2000) {
      setTapCount(1)
    } else {
      setTapCount(prev => prev + 1)
    }
    
    setLastTapTime(now)
    
    // If tapped 5 times within 2 seconds, show logs
    if (tapCount + 1 >= 5) {
      setShowLogs(true)
      setTapCount(0)
      
      // Show a brief flash effect
      const flash = document.createElement('div')
      flash.style.position = 'fixed'
      flash.style.top = '0'
      flash.style.left = '0'
      flash.style.width = '100%'
      flash.style.height = '100%'
      flash.style.backgroundColor = 'rgba(114, 159, 207, 0.3)'
      flash.style.zIndex = '9999'
      flash.style.pointerEvents = 'none'
      document.body.appendChild(flash)
      
      setTimeout(() => {
        document.body.removeChild(flash)
      }, 300)
    }
  }

  const isActive = (path: string) => location.pathname === path

  return (
    <MenuContainer>
      {menuItems.map((item) => (
        <React.Fragment key={item.path}>
          <MenuItem
            isActive={isActive(item.path)}
            onClick={() => handleMenuClick(item)}
            hidden={item.hidden && !showLogs}
          >
            {isMobile ? (
              <>
                <MenuIcon>{item.icon}</MenuIcon>
                <MenuLabel>{item.label}</MenuLabel>
              </>
            ) : (
              <MenuItemContent>
                <MenuIcon>{item.icon}</MenuIcon>
                <MenuLabel>{item.label}</MenuLabel>
              </MenuItemContent>
            )}
          </MenuItem>
          {item.submenu && (
            <SubMenu isOpen={openSubmenu === item.path}>
              {item.submenu.map((subItem) => (
                <MenuItem
                  key={subItem.path}
                  isActive={isActive(subItem.path)}
                  isSubmenu
                  onClick={() => navigate(subItem.path)}
                >
                  <MenuItemContent>
                    <MenuIcon>{subItem.icon}</MenuIcon>
                    <MenuLabel>{subItem.label}</MenuLabel>
                  </MenuItemContent>
                </MenuItem>
              ))}
            </SubMenu>
          )}
        </React.Fragment>
      ))}
      <HiddenIndicator showLogs={showLogs}>
        {showLogs ? 'ACCESS GRANTED' : 'ACCESS DENIED'}
      </HiddenIndicator>
      <MobileSecretButton onClick={handleSecretButtonClick}>
        {tapCount > 0 ? tapCount : '?'}
      </MobileSecretButton>
    </MenuContainer>
  )
}

export default RightMenu 