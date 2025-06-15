'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { CalendarIcon, Search, Users } from 'lucide-react'
import { cn } from '@/lib/utils'
import { DateRange } from 'react-day-picker'

export default function SearchBar({
    destination,
    setDestination,
    adults,
    setAdults,
    children,
    setChildren,
    rooms,
    setRooms,
    date,
    setDate }) {


    const formatDate = (date) =>
        date ? `${date.toDateString().split(' ').slice(0, 3).join(' ')}` : ''

    return (
        <div className="w-full flex items-center justify-center">
            <div className="flex gap-2 w-full">
                {/* Destination */}
                <div className="flex-1 rounded-md border px-4 py-2 bg-white shadow-sm">
                    <label className="text-xs text-gray-500 flex items-center gap-1">
                        <Search className="h-4 w-4" />
                        Destination
                    </label>
                    <Input
                        placeholder="Select Destination"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="border-0 p-0 h-6 text-sm font-medium"
                    />
                </div>

                {/* Dates */}
                <Popover>
                    <PopoverTrigger asChild>
                        <div className="flex-1 rounded-md border px-4 py-2 bg-white shadow-sm cursor-pointer">
                            <label className="text-xs text-gray-500 flex items-center gap-1">
                                <CalendarIcon className="h-4 w-4" />
                                Dates
                            </label>
                            <div className="h-6 text-sm font-medium">
                                {date?.from && date?.to
                                    ? `${formatDate(date.from)} - ${formatDate(date.to)}`
                                    : 'Select dates'}
                            </div>
                        </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="range"
                            selected={date}
                            onSelect={setDate}
                            numberOfMonths={2}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>

                {/* Guests & Rooms */}
                <Popover>
                    <PopoverTrigger asChild>
                        <div className="flex-1 rounded-md border px-4 py-2 bg-white shadow-sm cursor-pointer">
                            <label className="text-xs text-gray-500 flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                Guests & Rooms
                            </label>
                            <div className="h-6 text-sm font-medium">
                                {adults + children} Guests, {rooms} Room
                            </div>
                        </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-72">
                        <div className="space-y-3">
                            {/* Adults */}
                            <div className="flex justify-between items-center">
                                <span>Adults</span>
                                <div className="flex items-center gap-2">
                                    <Button variant="outline" size="icon" onClick={() => setAdults(Math.max(1, adults - 1))}>-</Button>
                                    <span>{adults}</span>
                                    <Button variant="outline" size="icon" onClick={() => setAdults(adults + 1)}>+</Button>
                                </div>
                            </div>

                            {/* Children */}
                            <div className="flex justify-between items-center">
                                <span>Children</span>
                                <div className="flex items-center gap-2">
                                    <Button variant="outline" size="icon" onClick={() => setChildren(Math.max(0, children - 1))}>-</Button>
                                    <span>{children}</span>
                                    <Button variant="outline" size="icon" onClick={() => setChildren(children + 1)}>+</Button>
                                </div>
                            </div>

                            {/* Rooms */}
                            <div className="flex justify-between items-center">
                                <span>Rooms</span>
                                <div className="flex items-center gap-2">
                                    <Button variant="outline" size="icon" onClick={() => setRooms(Math.max(1, rooms - 1))}>-</Button>
                                    <span>{rooms}</span>
                                    <Button variant="outline" size="icon" onClick={() => setRooms(rooms + 1)}>+</Button>
                                </div>
                            </div>

                            <div className="flex justify-between items-center border-t pt-2 text-sm">
                                <span>{adults + children} Guests, {rooms} Room</span>
                                <Button size="sm">Apply</Button>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>

                {/* Search Button */}
                <Button className="rounded-full w-10 h-10 p-0">
                    <Search className="h-5 w-5" />
                </Button>
            </div>
        </div>
    )
}
