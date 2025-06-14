import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Star } from "lucide-react"

export default function HotelCard({ hotel }) {
    return (
        <Card className="mt-4 flex flex-col md:flex-row p-4 items-start gap-4 rounded-xl shadow-sm w-4/5">
            {/* Left Image Section */}
            <div className="relative w-full md:w-48 h-36 overflow-hidden rounded-md">
                <img
                    src="/placeholder_cardimg.png" // replace with hotel.image if available
                    alt={hotel["Hotel Name"]}
                    className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded">
                    Exclusive deal
                </div>
            </div>

            {/* Info Section */}
            <div className="flex flex-col justify-between flex-1">
                {/* Title & Stars */}
                <div>
                    <h2 className="text-lg font-semibold">{hotel["Hotel Name"]}</h2>
                    <div className="flex items-center mt-1 text-blue-500">
                        <Star size={16} fill="currentColor" />
                        <Star size={16} fill="currentColor" />
                        <Star size={16} fill="currentColor" />
                        <Star size={16} fill="currentColor" />
                    </div>
                </div>

                {/* Features */}
                <div className="text-sm text-muted-foreground mt-2 space-y-1">
                    <div>🛏️ {hotel.Description}</div>
                    <div>📍 {hotel.Destination}</div>
                    <div>📆 {hotel.Date} - {hotel.Month}</div>
                    <div>📆 Reserve Type: {hotel["Reserve Type"]}</div>
                    <div>📆 Payment Type: {hotel["Payment Type"]}</div>


                </div>
            </div>

            {/* Price & Button Section */}
            <div className="flex flex-col items-end justify-between ml-auto h-full">
                <div className="text-2xl font-semibold text-right text-black">
                    ${hotel["Total Price"]}
                </div>
                <div className="text-xs font-light text-right text-black">
                    ${hotel["Price"]}
                </div>
                <Button className="mt-2 rounded-full">View hotel</Button>
            </div>
        </Card>
    )
}

// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { Star } from "lucide-react"

// export default function HotelCard(hotel) {
//     return (
//         <Card className="mt-4 flex flex-col md:flex-row p-4 items-start gap-4 rounded-xl shadow-sm w-3/4">
//             {/* Left Image Section */}
//             <div className="relative w-full md:w-48 h-36 overflow-hidden rounded-md">
//                 <img
//                     src="/hotel.jpg" // Replace with actual image path
//                     alt="Hotel"
//                     className="w-full h-full object-cover"
//                 />
//                 <div className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded">
//                     Exclusive deal
//                 </div>
//             </div>

//             {/* Info Section */}
//             <div className="flex flex-col justify-between flex-1">
//                 {/* Title & Stars */}
//                 <div>
//                     <h2 className="text-lg font-semibold">
//                         {hotel["Hotel Name"]}
//                     </h2>
//                     <div className="flex items-center mt-1 text-blue-500">
//                         <Star size={16} fill="currentColor" />
//                         <Star size={16} fill="currentColor" />
//                         <Star size={16} fill="currentColor" />
//                         <Star size={16} fill="currentColor" />
//                     </div>
//                 </div>

//                 {/* Features */}
//                 <div className="text-sm text-muted-foreground mt-2 space-y-1">
//                     <div>🅿️ Free self parking</div>
//                     <div>🏊 Outdoor seasonal pool</div>
//                     <div>🍽️ Kitchen</div>
//                 </div>
//             </div>

//             {/* Price & Button Section */}
//             <div className="flex flex-col items-end justify-between ml-auto h-full">
//                 <div className="text-2xl font-semibold text-right text-black">
//                     $296
//                 </div>
//                 <Button className="mt-2 rounded-full">View hotel</Button>
//             </div>
//         </Card>
//     )
// }
