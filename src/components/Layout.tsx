import { ReactNode } from "react"

interface LayoutProps {
  children: ReactNode,
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="w-full max-w-[1200px]">{children}</div>
  )
}

export default Layout