'use client'

import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from 'next-themes'
const ThemeButton = () => {
  const { theme, setTheme } = useTheme()

  const handleThemeChange = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const icon = theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />

  return (
    <Button size="icon" variant="ghost" onClick={handleThemeChange}>
      {icon}
    </Button>
  )
}

export default ThemeButton
