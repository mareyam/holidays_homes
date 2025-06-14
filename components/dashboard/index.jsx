'use client'
import { Navbar } from "../header/navbar"
import SearchBar from "../header/search"
import { Button } from "../ui/button"
import { cn } from '@/lib/utils'
import { Menu } from 'lucide-react'
import { useState } from "react"
import SidebarFilters from "./sidebar"

const Dashboard = () => {
    const [open, setOpen] = useState(true)
    return (
        <>
            <Navbar />
            <SidebarFilters />
        </>

    )

}
export default Dashboard