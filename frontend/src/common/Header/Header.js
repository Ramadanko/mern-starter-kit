import React, { useState, useEffect } from 'react'
import HeaderUI from './HeaderUI'

function Header () {
  const [anchorEl, setAnchorEl] = useState(null)
  const [isDesktop, setIsDesktop] = useState(window.outerWidth > 600)
  useEffect(() => {
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
    }
  })

  const onResize = () => {
    if (window.outerWidth > 600) {
      setIsDesktop(true)
    } else {
      setIsDesktop(false)
    }
  }

  const toggleMenu = () => {
    setIsDesktop(!isDesktop)
  }

  const toggleAvatarMenu = (e) => {
    setAnchorEl(e.currentTarget)
  }

  const closeAvatarMenu = () => {
    setAnchorEl(null)
  }

  return (
    <HeaderUI
      toggleMenu={toggleMenu} toggleAvatarMenu={toggleAvatarMenu}
      closeAvatarMenu={closeAvatarMenu} anchorEl={anchorEl} isDesktop={isDesktop}
    />
  )
}

export default Header
