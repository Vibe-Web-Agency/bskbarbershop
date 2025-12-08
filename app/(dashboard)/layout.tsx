import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
    <div>Dashboard Navbar</div>
    <div>{children}</div>
    </>
  )
}

export default Layout