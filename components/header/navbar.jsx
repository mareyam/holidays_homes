'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
// import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

export function Navbar() {
    const [open, setOpen] = useState(false)

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
                <Link href="/" className="text-lg font-semibold">Reservation Stays</Link>

                <nav className="hidden md:flex gap-6">
                    <Link href="/" className="text-sm hover:underline">Explore</Link>
                    <Link href="/about" className="text-sm hover:underline">Support</Link>
                </nav>

                {/* <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="md:hidden">
                            <Menu className="h-5 w-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <div className="flex flex-col gap-4 mt-4">
                            <Link href="/" onClick={() => setOpen(false)}>Home</Link>
                            <Link href="/about" onClick={() => setOpen(false)}>About</Link>
                            <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>
                        </div>
                    </SheetContent>
                </Sheet> */}
            </div>
        </header>
    )
}
