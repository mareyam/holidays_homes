'use client'

import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Menu } from 'lucide-react'
import { cn } from '@/lib/utils'
import SearchBar from '../header/search'
import HotelCard from './card'
import { supabase } from '@/lib/supabaseClient'

export default function SidebarFilters() {
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [priceRange, setPriceRange] = useState([0, 100000])
    const [totalPrice, setTotalPrice] = useState([0, 1000000])
    const [hotelName, setHotelName] = useState('')
    const [location, setLocation] = useState('')
    const [destination, setDestination] = useState('')
    const [adults, setAdults] = useState(0)
    const [children, setChildren] = useState(0)
    const [rooms, setRooms] = useState(0)
    const [date, setDate] = useState({
        from: new Date(),
        to: new Date(),
    })

    const [reservationTypes, setReservationTypes] = useState([])
    const [paymentType, setPaymentType] = useState('')
    const [refundType, setRefundType] = useState('')

    const [hotels, setHotels] = useState([])

    function extractNumericValue(priceStr) {
        if (!priceStr || typeof priceStr !== 'string') return 0
        const clean = priceStr.replace(/[^0-9.]/g, '')
        const number = parseFloat(clean)
        return isNaN(number) ? 0 : number
    }

    useEffect(() => {
        const fetchHotels = async () => {
            const { data, error } = await supabase.from('Hotel Details').select()
            if (error) {
                console.error('Error:', error)
                return
            }

            const filtered = data.filter((hotel) => {
                const price = extractNumericValue(hotel.Price)
                const total = extractNumericValue(hotel['Total Price'])
                const name = hotel['Hotel Name']?.toLowerCase() || ''
                const dest = hotel.Destination?.toLowerCase() || ''
                const reserve = hotel['Reserve Type']?.toLowerCase() || ''
                const payment = hotel['Payment Type']?.toLowerCase() || ''
                const refund = hotel['Refund Type']?.toLowerCase() || ''

                return (
                    price >= priceRange[0] &&
                    price <= priceRange[1] &&
                    total >= totalPrice[0] &&
                    total <= totalPrice[1] &&
                    name.includes(hotelName.toLowerCase()) &&
                    dest.includes(location.toLowerCase()) &&
                    (reservationTypes.length > 0 ? reservationTypes.includes(hotel['Reserve Type']) : true) &&
                    (paymentType ? payment.includes(paymentType.toLowerCase()) : true) &&
                    (refundType ? refund.includes(refundType.toLowerCase()) : true)
                )
            })

            console.log("filtered is", filtered)
            setHotels(filtered)
        }

        fetchHotels()
    }, [priceRange, totalPrice, hotelName, location, reservationTypes, paymentType, refundType])

    return (
        <div className="h-[100dvh] flex bg-gray-50 overflow-hidden">
            {/* Sidebar */}
            <aside
                className={cn(
                    'bg-white border-r shadow-sm transition-all duration-200 px-4 py-6 overflow-y-auto',
                    sidebarOpen ? 'w-72' : 'w-16'
                )}
            >
                <div className="flex items-center justify-between mb-4">
                    {sidebarOpen && <span className="text-lg font-semibold">Filters</span>}
                    <Button variant="outline" onClick={() => {
                        setReservationTypes([])
                        setPaymentType('')
                        setRefundType('')
                        setHotelName('')
                        setLocation('')
                        setPriceRange([0, 100000])
                        setTotalPrice([0, 1000000])
                    }}>
                        Clear Filters
                    </Button>

                    <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
                        <Menu className="h-5 w-5" />
                    </Button>
                </div>

                {sidebarOpen && (
                    <div className="space-y-6">
                        {/* Name */}
                        <div>
                            <Label>Name</Label>
                            <Input
                                placeholder="Enter name"
                                value={hotelName}
                                onChange={(e) => setHotelName(e.target.value)}
                            />
                        </div>

                        {/* Price Range */}
                        <div>
                            <Label className="pb-3">Price Range</Label>
                            <Slider
                                value={priceRange}
                                onValueChange={setPriceRange}
                                max={50000}
                                step={100}
                                min={0}
                            />
                            <div className="text-sm mt-1">
                                CNY {priceRange[0]} - CNY {priceRange[1]}
                            </div>
                        </div>

                        {/* Total Price */}
                        <div>
                            <Label className="pb-3">Total Price</Label>
                            <Slider
                                value={totalPrice}
                                onValueChange={setTotalPrice}
                                max={500000}
                                step={1000}
                                min={0}
                            />
                            <div className="text-sm mt-1">
                                CNY {totalPrice[0]} - CNY {totalPrice[1]}
                            </div>
                        </div>

                        {/* Reservation Type */}
                        <div>
                            <Label>Reservation Type</Label>
                            <div className="space-y-1 mt-2">
                                {[
                                    "Accor - HERA",
                                    "Accor Preferred",
                                    "Enhanced Rates",
                                    "Expedia",
                                    "Fora Reserve",
                                    "Four Seasons Preferred",
                                    "Hilton Honors Member Rates",
                                    "Hyatt Privé",
                                    "IHG One Member Rates",
                                    "Marriott Bonvoy Member Rates",
                                    "Marriott LUMINOUS",
                                    "Marriott STARS",
                                    "Preferred Platinum",
                                    "Shangri-La Luxury Circle",
                                    "Tablet Plus",
                                    "Virtuoso",
                                ].map((label) => (
                                    <CheckboxWithLabel
                                        key={label}
                                        label={label}
                                        checked={reservationTypes.includes(label)}
                                        onChange={(checked) => {
                                            if (checked) {
                                                setReservationTypes([...reservationTypes, label])
                                            } else {
                                                setReservationTypes(reservationTypes.filter((r) => r !== label))
                                            }
                                        }}
                                    />
                                ))}
                            </div>

                        </div>

                        {/* Payment Type */}
                        <div>
                            <Label>Payment Type</Label>
                            <div className="space-y-1 mt-2">
                                <CheckboxWithLabel
                                    label="Deposit Required"
                                    checked={paymentType === 'Deposit Required'}
                                    onChange={() => setPaymentType('Deposit Required')}
                                />
                                <CheckboxWithLabel
                                    label="Pay Later"
                                    checked={paymentType === 'Pay Later'}
                                    onChange={() => setPaymentType('Pay Later')}
                                />
                            </div>
                        </div>

                        {/* Refund Type */}
                        <div>
                            <Label>Refund Type</Label>
                            <div className="space-y-1 mt-2">
                                <CheckboxWithLabel
                                    label="Non-refundable"
                                    checked={refundType === 'Non-refundable'}
                                    onChange={() => setRefundType('Non-refundable')}
                                />
                                <CheckboxWithLabel
                                    label="See details for cancellation policy"
                                    checked={refundType === 'See details for cancellation policy'}
                                    onChange={() => setRefundType('See details for cancellation policy')}
                                />
                            </div>
                        </div>

                        {/* Location */}
                        <div>
                            <Label>Location</Label>
                            <Input
                                placeholder="Enter location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </div>
                    </div>
                )}
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden">
                <div className="p-6 pb-0">
                    <SearchBar
                        destination={destination}
                        setDestination={setDestination}
                        adults={adults}
                        setAdults={setAdults}
                        children={children}
                        setChildren={setChildren}
                        rooms={rooms}
                        setRooms={setRooms}
                        date={date}
                        setDate={setDate}
                    />
                    <div>total results {hotels.length}</div>
                </div>

                <div className="flex-1 overflow-y-auto px-6 pb-6">
                    {hotels.length > 0 ? (
                        hotels.map((hotel, index) => (
                            <HotelCard key={index} hotel={hotel} />
                        ))
                    ) : (
                        <p className="text-center text-muted-foreground mt-10">
                            No hotels found matching filters.
                        </p>
                    )}
                </div>
            </main>
        </div>
    )
}

function CheckboxWithLabel({ label, checked, onChange }) {
    return (
        <div className="flex items-center space-x-2">
            <Checkbox id={label} checked={checked} onCheckedChange={onChange} />
            <label htmlFor={label} className="text-sm">
                {label}
            </label>
        </div>
    )
}
