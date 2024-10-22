'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Menu, X, Sun, Moon, Leaf } from "lucide-react"
import Image from 'next/image'
import Link from 'next/link'
import { getCookie, setCookie } from 'cookies-next'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark' | 'eco'>('dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Immediately set the theme based on cookie or default to 'dark'
    const savedTheme = getCookie('theme') as 'light' | 'dark' | 'eco' | undefined;
    const initialTheme = savedTheme || 'dark';
    setTheme(initialTheme);
    document.documentElement.className = initialTheme;

    // Inject a script to set the theme immediately to prevent flash
    const script = document.createElement('script');
    script.innerHTML = `
      (function() {
        function getCookie(name) {
          const value = '; ' + document.cookie;
          const parts = value.split('; ' + name + '=');
          if (parts.length === 2) return parts.pop().split(';').shift();
        }
        var theme = getCookie('theme') || 'dark';
        document.documentElement.className = theme;
      })();
    `;
    document.head.appendChild(script);

    setMounted(true);
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const cycleTheme = () => {
    const themes: ('dark' | 'light' | 'eco')[] = ['dark', 'light', 'eco'];
    const nextTheme = themes[(themes.indexOf(theme) + 1) % themes.length];
    setTheme(nextTheme);
    setCookie('theme', nextTheme, { maxAge: 60 * 60 * 24 * 365 }); // Set cookie to expire in 1 year
    document.documentElement.className = nextTheme;
  }

  const getThemeIcon = () => {
    switch (theme) {
      case 'light': return <Sun className="h-6 w-6" />
      case 'dark': return <Moon className="h-6 w-6" />
      case 'eco': return <Leaf className="h-6 w-6" />
    }
  }

  if (!mounted) {
    return null;
  }

  return (
    <nav className="fixed top-0 left-0 w-full bg-background text-foreground border-b border-border z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Image src="/icct.png" alt='logo' width={75} height={75} />
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/projects" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary hover:text-primary-foreground">Projects</Link>
              <Link href="/rss" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary hover:text-primary-foreground">RSS</Link>
              <Link href="/events" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary hover:text-primary-foreground">Events</Link>
              <Link href="/datasets" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary hover:text-primary-foreground">Datasets</Link>
              <Link href="/requests" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary hover:text-primary-foreground">Requests</Link>
              <Button variant="ghost" size="icon" onClick={cycleTheme} aria-label="Toggle theme">
                {getThemeIcon()}
              </Button>
            </div>
          </div>
          <div className="md:hidden flex items-center">
            <Button variant="ghost" size="icon" onClick={cycleTheme} aria-label="Toggle theme" className="mr-2">
              {getThemeIcon()}
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Toggle menu">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-border">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/projects" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary hover:text-primary-foreground">Projects</Link>
            <Link href="/rss" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary hover:text-primary-foreground">RSS</Link>
            <Link href="/events" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary hover:text-primary-foreground">Events</Link>
            <Link href="/datasets" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary hover:text-primary-foreground">Datasets</Link>
            <Link href="/requests" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary hover:text-primary-foreground">Requests</Link>
          </div>
        </div>
      )}
    </nav>
  )
}
