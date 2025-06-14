'use client';

import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';

export default function DownloadJSON() {
  async function downloadHotelDataAsJSON() {
    const { data, error } = await supabase.from('Hotel Details').select('*');

    if (error) {
      console.error('Error fetching data:', error);
      return;
    }

    const jsonBlob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });

    const url = URL.createObjectURL(jsonBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'hotel_details.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  return <Button onClick={downloadHotelDataAsJSON}>Download JSON</Button>;
}

// 'use client';

// import { useEffect, useState } from 'react';
// import { supabase } from '../../lib/supabaseClient';

// export default function HotelsList() {
//   const [hotels, setHotels] = useState([]);

//   useEffect(() => {
//     const fetchHotels = async () => {
//       const { data, error } = await supabase.from('Hotel Details').select();
//       console.log('Data is', data);
//       if (error) {
//         console.error('Error:', error);
//       } else {
//         console.log('Data in else', data);
//         setHotels(data);
//       }
//     };

//     fetchHotels();
//   }, []);

//   return (
//     <div>
//       <h1>Hotels</h1>
//       <ul>
//         {hotels.map((hotel) => (
//           <li key={hotel.id}>{hotel.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }
// // 'use client';

// // import { useEffect, useState } from 'react';
// // import { supabase } from '@/lib/supabaseClient';

// // export default function HotelsList() {
// //   const [hotels, setHotels] = useState([]);
// //   const [isMounted, setIsMounted] = useState(false);

// //   useEffect(() => {
// //     setIsMounted(true);

// //     const fetchHotels = async () => {
// //       const { data, error } = await supabase.from('test').select('*');
// //       console.log('Data', data);
// //       if (error) {
// //         console.error('Error:', error);
// //       } else {
// //         console.log('data is else is', data);
// //         setHotels(data);
// //       }
// //     };

// //     fetchHotels();
// //     console.log('Fetching');
// //   }, []);

// //   if (!isMounted) return null;

// //   return (
// //     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //       <p className="col-span-2 font-semibold">hello data is</p>
// //       {hotels.map((hotel) => (
// //         <div
// //           key={hotel.id}
// //           className="p-4 border rounded-md shadow-sm bg-white"
// //         >
// //           <h2 className="text-lg font-semibold">{hotel.name}</h2>
// //           <p className="text-sm text-gray-600">{hotel.created_at}</p>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // }

// // // 'use client';

// // // import { useEffect, useState } from 'react';
// // // import { supabase } from '@/lib/supabaseClient';

// // // export default function HotelsList() {
// // //   const [hotels, setHotels] = useState([]);

// // //   useEffect(() => {
// // //     const fetchHotels = async () => {
// // //       const { data, error } = await supabase.from('test').select('*');
// // //       console.log('Data', data);
// // //       if (error) {
// // //         console.error('Error:', error);
// // //       } else {
// // //         console.log('data is else is', data);
// // //         setHotels(data);
// // //       }
// // //     };

// // //     fetchHotels();
// // //     console.log('fetching');
// // //   }, []);

// // //   return (
// // //     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // //       hello data is
// // //       {hotels.map((hotel) => (
// // //         <div
// // //           key={hotel.id}
// // //           className="p-4 border rounded-md shadow-sm bg-white"
// // //         >
// // //           <h2 className="text-lg font-semibold">{hotel.name}</h2>
// // //           <p className="text-sm text-gray-600">{hotel.created_at}</p>
// // //         </div>
// // //       ))}
// // //     </div>
// // //   );
// // // }

// // // // 'use client';

// // // // import { useEffect, useState } from 'react';
// // // // import { supabase } from '@/lib/supabaseClient';

// // // // export default function HotelsList() {
// // // //   const [hotels, setHotels] = useState([]);

// // // //   useEffect(() => {
// // // //     const fetchHotels = async () => {
// // // //       //   const { data, error } = await supabase.from('hotel_details').select('*');
// // // //       const { data, error } = await supabase.from('test').select('*');
// // // //       console.log('Data', data);
// // // //       if (error) {
// // // //         console.error('Error:', error);
// // // //       } else {
// // // //         setHotels(data);
// // // //       }
// // // //     };

// // // //     fetchHotels();
// // // //   }, []);

// // // //   return (
// // // //     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // //       hello
// // // //       {hotels.map((hotel) => (
// // // //         <div
// // // //           key={hotel.id}
// // // //           className="p-4 border rounded-md shadow-sm bg-white"
// // // //         >
// // // //           <h2 className="text-lg font-semibold">{hotel.name}</h2>
// // // //           <p className="text-sm text-gray-600">{hotel.location}</p>
// // // //           <p className="text-sm mt-1">${hotel.price}</p>
// // // //         </div>
// // // //       ))}
// // // //     </div>
// // // //   );
// // // // }
