'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Menu, X, Pencil } from "lucide-react"
import Image from 'next/image'
import Link from 'next/link'

// TODO: handle redirects

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className="bg-white text-primary-foreground text-black">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Image src={"/icct.png"} alt='logo' width={75} height={75} />
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4 text-black">
              <Link href="/projects" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-foreground hover:text-teal-500">Projects</Link>
              <Link href="/rss" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-foreground hover:text-teal-500">RSS</Link>
              <Link href="/events" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-foreground hover:text-teal-500">Events</Link>
              <Link href="/datasets" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-foreground hover:text-teal-500">Datasets</Link>
            </div>
          </div>
          <div className="md:hidden text-black">
            <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Toggle menu">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-black">
            <Link href="/projects"  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-foreground hover:text-teal-500">Projects</Link>
            <Link href="/rss" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-foreground hover:text-teal-500">RSS</Link>
            <Link href="/events" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-foreground hover:text-teal-500">Events</Link>
            <Link href="/datasets" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-foreground hover:text-teal-500">Datasets</Link>
          </div>
        </div>
      )}
    </nav>
  )
}