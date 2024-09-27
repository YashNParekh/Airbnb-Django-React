// // Updating the state with hotels in the region
// import React, { useState, useEffect } from "react";
// import { MapContainer, TileLayer, Marker, Tooltip, useMap, useMapEvents } from "react-leaflet";
// import L from 'leaflet';
// import "leaflet/dist/leaflet.css";
// import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
// import markerIcon from 'leaflet/dist/images/marker-icon.png';
// import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// // Marker icon setup
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: markerIcon2x,
//   iconUrl: markerIcon,
//   shadowUrl: markerShadow
// });

// const MapComponent = () => {
//   const [hotels, setHotels] = useState([]);
  
//   const fetchHotelsInRegion = async (northEastLat, northEastLng, southWestLat, southWestLng) => {
//     try {
//       // Simulated API call (replace with actual API call when ready)

//       setHotels(
//         [
//           {
//             "id": 1,
//             "name": "Central Hotel",
//             "address": "123 Main St, New York, USA",
//             "latitude": 40.7128,
//             "longitude": -74.0060,
//             "price": 200
//           },
//           {
//             "id": 2,
//             "name": "Seaside Inn",
//             "address": "456 Ocean Blvd, Miami, USA",
//             "latitude": 25.7617,
//             "longitude": -80.1918,
//             "price": 150
//           },
//           {
//             "id": 3,
//             "name": "Mountain Retreat",
//             "address": "789 Hillside Dr, Aspen, USA",
//             "latitude": 39.1911,
//             "longitude": -106.8175,
//             "price": 300
//           },
//           {
//             "id": 4,
//             "name": "Desert Oasis",
//             "address": "321 Desert Ln, Phoenix, USA",
//             "latitude": 33.4484,
//             "longitude": -112.0740,
//             "price": 180
//           },
//           {
//             "id": 5,
//             "name": "Lakeside Hotel",
//             "address": "654 Lakeview Rd, Chicago, USA",
//             "latitude": 41.8781,
//             "longitude": -87.6298,
//             "price": 220
//           },
//           {
//             "id": 6,
//             "name": "Forest Lodge",
//             "address": "987 Evergreen Way, Portland, USA",
//             "latitude": 45.5051,
//             "longitude": -122.6750,
//             "price": 140
//           },
//           {
//             "id": 7,
//             "name": "Beachfront Resort",
//             "address": "123 Sandy Shores, Honolulu, USA",
//             "latitude": 21.3069,
//             "longitude": -157.8583,
//             "price": 320
//           },
//           {
//             "id": 8,
//             "name": "Downtown Suites",
//             "address": "456 Urban St, Los Angeles, USA",
//             "latitude": 34.0522,
//             "longitude": -118.2437,
//             "price": 250
//           },
//           {
//             "id": 9,
//             "name": "Countryside Inn",
//             "address": "789 Pasture Rd, Dallas, USA",
//             "latitude": 32.7767,
//             "longitude": -96.7970,
//             "price": 160
//           },
//           {
//             "id": 10,
//             "name": "Cliffside B&B",
//             "address": "321 Cliff View, San Francisco, USA",
//             "latitude": 37.7749,
//             "longitude": -122.4194,
//             "price": 280
//           },
//           {
//             "id": 11,
//             "name": "Riverside Hotel",
//             "address": "654 River St, Boston, USA",
//             "latitude": 42.3601,
//             "longitude": -71.0589,
//             "price": 190
//           },
//           {
//             "id": 12,
//             "name": "Island Getaway",
//             "address": "987 Palm Grove, Key West, USA",
//             "latitude": 24.5551,
//             "longitude": -81.7800,
//             "price": 350
//           },
//           {
//             "id": 13,
//             "name": "Historic Hotel",
//             "address": "123 Heritage Ln, Charleston, USA",
//             "latitude": 32.7765,
//             "longitude": -79.9311,
//             "price": 230
//           },
//           {
//             "id": 14,
//             "name": "Urban Escape",
//             "address": "456 Skyline Rd, Atlanta, USA",
//             "latitude": 33.7490,
//             "longitude": -84.3880,
//             "price": 170
//           },
//           {
//             "id": 15,
//             "name": "Highland Inn",
//             "address": "789 Mountain Pass, Denver, USA",
//             "latitude": 39.7392,
//             "longitude": -104.9903,
//             "price": 260
//           },
//           {
//             "id": 16,
//             "name": "Harbor View Hotel",
//             "address": "321 Marina Dr, Seattle, USA",
//             "latitude": 47.6062,
//             "longitude": -122.3321,
//             "price": 240
//           },
//           {
//             "id": 17,
//             "name": "Parkside Lodge",
//             "address": "654 Forest Way, Minneapolis, USA",
//             "latitude": 44.9778,
//             "longitude": -93.2650,
//             "price": 150
//           },
//           {
//             "id": 18,
//             "name": "Ski Resort",
//             "address": "987 Snowy Peak, Lake Tahoe, USA",
//             "latitude": 39.0968,
//             "longitude": -120.0324,
//             "price": 400
//           },
//           {
//             "id": 19,
//             "name": "City View Suites",
//             "address": "123 Skyscraper St, New York, USA",
//             "latitude": 40.7128,
//             "longitude": -74.0060,
//             "price": 350
//           },
//           {
//             "id": 20,
//             "name": "Coastal Bungalow",
//             "address": "456 Beach Rd, San Diego, USA",
//             "latitude": 32.7157,
//             "longitude": -117.1611,
//             "price": 290
//           },
//           {
//             "id": 21,
//             "name": "Parisian Paradise",
//             "address": "123 Champs-Élysées, Paris, France",
//             "latitude": 48.8566,
//             "longitude": 2.3522,
//             "price": 350
//           },
//           {
//             "id": 22,
//             "name": "London Lodge",
//             "address": "456 Westminster Rd, London, UK",
//             "latitude": 51.5074,
//             "longitude": -0.1278,
//             "price": 270
//           },
//           {
//             "id": 23,
//             "name": "Berlin Break",
//             "address": "789 Alexanderplatz, Berlin, Germany",
//             "latitude": 52.5200,
//             "longitude": 13.4050,
//             "price": 240
//           },
//           {
//             "id": 24,
//             "name": "Rome Retreat",
//             "address": "321 Colosseum Ave, Rome, Italy",
//             "latitude": 41.9028,
//             "longitude": 12.4964,
//             "price": 300
//           },
//           {
//             "id": 25,
//             "name": "Barcelona Bliss",
//             "address": "654 Las Ramblas, Barcelona, Spain",
//             "latitude": 41.3851,
//             "longitude": 2.1734,
//             "price": 230
//           },
//           {
//             "id": 26,
//             "name": "Sydney Shores",
//             "address": "987 Bondi Beach, Sydney, Australia",
//             "latitude": -33.8688,
//             "longitude": 151.2093,
//             "price": 350
//           },
//           {
//             "id": 27,
//             "name": "Tokyo Towers",
//             "address": "123 Shibuya Crossing, Tokyo, Japan",
//             "latitude": 35.6762,
//             "longitude": 139.6503,
//             "price": 400
//           },
//           {
//             "id": 28,
//             "name": "Dubai Deluxe",
//             "address": "456 Palm Jumeirah, Dubai, UAE",
//             "latitude": 25.276987,
//             "longitude": 55.296249,
//             "price": 500
//           },
//           {
//             "id": 29,
//             "name": "Cape Town Coast",
//             "address": "789 Table Mountain, Cape Town, South Africa",
//             "latitude": -33.9249,
//             "longitude": 18.4241,
//             "price": 180
//           },
//           {
//             "id": 30,
//             "name": "Rio Resort",
//             "address": "321 Copacabana, Rio de Janeiro, Brazil",
//             "latitude": -22.9068,
//             "longitude": -43.1729,
//             "price": 250
//           }
//         ]
//       ); 
//     } catch (error) {
//       console.error("Error fetching hotels:", error);
//     }
//   };

//   const MapEvents = () => {
//     const map = useMap();
//     useMapEvents({
//       moveend: () => {
//         const bounds = map.getBounds();
//         const northEast = bounds.getNorthEast();
//         const southWest = bounds.getSouthWest();
//         fetchHotelsInRegion(northEast.lat, northEast.lng, southWest.lat, southWest.lng);
//       },
//     });
//     return null;
//   };

//   useEffect(() => {
//     // Initial fetch of hotels
//     fetchHotelsInRegion(90, 180, -90, -180);
//   }, []);

//   return (
//     <MapContainer center={[40.7128, -74.0060]} zoom={13} style={{ height: "100vh", width: "100%" }}>
//       <TileLayer
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />
      
//       <MapEvents />

//       {hotels.map((hotel) => (
//         <Marker key={hotel.id} position={[hotel.latitude, hotel.longitude]}>
//           <Tooltip direction="top" offset={[0, -10]} opacity={1} >
//             <div>
//               <h4>{hotel.name}</h4>
//               <p>{hotel.address}</p>
//               <p>Price: ${hotel.price} per night</p>
//             </div>
//           </Tooltip>
//         </Marker>
//       ))}
//     </MapContainer>
//   );
// };

// export default MapComponent;



// import React, { useState, useEffect } from 'react';
// import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
// import { Button } from '@/components/ui/button';
// import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
// import 'leaflet/dist/leaflet.css';

// const MapComponent = () => {
//   const [center, setCenter] = useState({ lat: 51.505, lng: -0.09 });
//   const [zoom, setZoom] = useState(13);
//   const [showAlert, setShowAlert] = useState(false);
//   const [alertMessage, setAlertMessage] = useState('');

//   const MapEvents = () => {
//     const map = useMapEvents({
//       move() {
//         setCenter(map.getCenter());
//       },
//       zoom() {
//         setZoom(map.getZoom());
//       },
//     });
//     return null;
//   };

//   const handleGetLocation = () => {
//     if ("geolocation" in navigator) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           setAlertMessage(`Latitude: ${latitude.toFixed(4)}, Longitude: ${longitude.toFixed(4)}`);
//           setShowAlert(true);
//         },
//         () => {
//           setAlertMessage("Unable to retrieve your location");
//           setShowAlert(true);
//         }
//       );
//     } else {
//       setAlertMessage("Geolocation is not supported by your browser");
//       setShowAlert(true);
//     }
//   };

//   return (
//     <div className="h-[400px] w-full relative">
//       <MapContainer
//         center={[center.lat, center.lng]}
//         zoom={zoom}
//         style={{ height: '100%', width: '100%' }}
//       >
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />
//         <Marker position={[center.lat, center.lng]} />
//         <MapEvents />
//       </MapContainer>
//       <Button
//         className="absolute bottom-4 left-4 z-[1000]"
//         onClick={handleGetLocation}
//       >
//         Get Location
//       </Button>
//       {showAlert && (
//         <Alert className="absolute top-4 left-4 right-4 z-[1000]">
//           <AlertTitle>Location</AlertTitle>
//           <AlertDescription>{alertMessage}</AlertDescription>
//         </Alert>
//       )}
//     </div>
//   );
// };

// export default MapComponent;

// import React, { useState, useEffect } from 'react';
// import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
// import { Button } from '@/components/ui/button';
// import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
// import 'leaflet/dist/leaflet.css';

// const MapComponent = () => {
//   const [center, setCenter] = useState({ lat: 51.505, lng: -0.09 });
//   const [zoom, setZoom] = useState(13);
//   const [showAlert, setShowAlert] = useState(false);
//   const [alertMessage, setAlertMessage] = useState('');

//   const MapEvents = () => {
//     const map = useMapEvents({
//       move() {
//         setCenter(map.getCenter());
//       },
//       zoom() {
//         setZoom(map.getZoom());
//       },
//     });
//     return null;
//   };

//   const handleGetLocation = () => {
//     if ("geolocation" in navigator) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           setAlertMessage(`Your Location - Latitude: ${latitude.toFixed(4)}, Longitude: ${longitude.toFixed(4)}`);
//           setShowAlert(true);
//         },
//         () => {
//           setAlertMessage("Unable to retrieve your location");
//           setShowAlert(true);
//         }
//       );
//     } else {
//       setAlertMessage("Geolocation is not supported by your browser");
//       setShowAlert(true);
//     }
//   };

//   const handleGetPointerLocation = () => {
//     setAlertMessage(`Pointer Location - Latitude: ${center.lat.toFixed(4)}, Longitude: ${center.lng.toFixed(4)}`);
//     setShowAlert(true);
//   };

//   return (
//     <div className="h-[400px] w-full relative">
//       <MapContainer
//         center={[center.lat, center.lng]}
//         zoom={zoom}
//         style={{ height: '100%', width: '100%' }}
//       >
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />
//         <Marker position={[center.lat, center.lng]} />
//         <MapEvents />
//       </MapContainer>
//       <div className="absolute bottom-4 left-4 z-[1000] space-x-2">
//         <Button onClick={handleGetLocation}>
//           Get My Location
//         </Button>
//         <Button onClick={handleGetPointerLocation}>
//           Get Pointer Location
//         </Button>
//       </div>
//       {showAlert && (
//         <Alert className="absolute top-4 left-4 right-4 z-[1000]">
//           <AlertTitle>Location Information</AlertTitle>
//           <AlertDescription>{alertMessage}</AlertDescription>
//         </Alert>
//       )}
//     </div>
//   );
// };

// export default MapComponent;

// import React, { useState, useRef } from 'react';
// import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
// import { Button } from '@/components/ui/button';
// import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
// import { Map } from 'lucide-react';
// import 'leaflet/dist/leaflet.css';

// const MapComponent = () => {
//   const [center, setCenter] = useState({ lat: 51.505, lng: -0.09 });
//   const [zoom, setZoom] = useState(13);
//   const [showAlert, setShowAlert] = useState(false);
//   const [alertMessage, setAlertMessage] = useState('');
//   const mapRef = useRef(null);

//   const MapEvents = () => {
//     const map = useMapEvents({
//       move() {
//         setCenter(map.getCenter());
//       },
//       zoom() {
//         setZoom(map.getZoom());
//       },
//     });
//     mapRef.current = map;
//     return null;
//   };

//   const handleGetLocation = () => {
//     if ("geolocation" in navigator) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           setCenter({ lat: latitude, lng: longitude });
//           mapRef.current.setView([latitude, longitude], 15);
//           setAlertMessage(`Your Location - Latitude: ${latitude.toFixed(4)}, Longitude: ${longitude.toFixed(4)}`);
//           setShowAlert(true);
//         },
//         () => {
//           setAlertMessage("Unable to retrieve your location");
//           setShowAlert(true);
//         }
//       );
//     } else {
//       setAlertMessage("Geolocation is not supported by your browser");
//       setShowAlert(true);
//     }
//   };

//   const handleGetPointerLocation = () => {
//     setAlertMessage(`Pointer Location - Latitude: ${center.lat.toFixed(4)}, Longitude: ${center.lng.toFixed(4)}`);
//     setShowAlert(true);
//   };

//   const handleOpenStreetView = () => {
//     const url = `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${center.lat},${center.lng}`;
//     window.open(url, '_blank');
//   };

//   return (
//     <div className="h-[400px] w-full relative">
//       <MapContainer
//         center={[center.lat, center.lng]}
//         zoom={zoom}
//         style={{ height: '100%', width: '100%' }}
//       >
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />
//         <Marker position={[center.lat, center.lng]} />
//         <MapEvents />
//       </MapContainer>
//       <div className="absolute bottom-4 left-4 z-[1000] space-x-2">
//         <Button onClick={handleGetLocation}>
//           Get My Location
//         </Button>
//         <Button onClick={handleGetPointerLocation}>
//           Get Pointer Location
//         </Button>
//         <Button onClick={handleOpenStreetView}>
//           <Map className="mr-2 h-4 w-4" /> Street View
//         </Button>
//       </div>
//       {showAlert && (
//         <Alert className="absolute top-4 left-4 right-4 z-[1000]">
//           <AlertTitle>Location Information</AlertTitle>
//           <AlertDescription>{alertMessage}</AlertDescription>
//         </Alert>
//       )}
//     </div>
//   );
// };

// export default MapComponent;

// info: this is second best

// import React, { useState, useRef } from 'react';
// import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
// import { Button } from '@/components/ui/button';
// import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
// import { Map, X } from 'lucide-react';
// import 'leaflet/dist/leaflet.css';

// const MapComponent = () => {
//   const [center, setCenter] = useState({ lat: 51.505, lng: -0.09 });
//   const [zoom, setZoom] = useState(13);
//   const [showAlert, setShowAlert] = useState(false);
//   const [alertMessage, setAlertMessage] = useState('');
//   const [showStreetView, setShowStreetView] = useState(false);
//   const mapRef = useRef(null);

//   const MapEvents = () => {
//     const map = useMapEvents({
//       move() {
//         setCenter(map.getCenter());
//       },
//       zoom() {
//         setZoom(map.getZoom());
//       },
//     });
//     mapRef.current = map;
//     return null;
//   };

//   const handleGetLocation = () => {
//     if ("geolocation" in navigator) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           setCenter({ lat: latitude, lng: longitude });
//           mapRef.current.setView([latitude, longitude], 15);
//           setAlertMessage(`Your Location - Latitude: ${latitude.toFixed(4)}, Longitude: ${longitude.toFixed(4)}`);
//           setShowAlert(true);
//         },
//         () => {
//           setAlertMessage("Unable to retrieve your location");
//           setShowAlert(true);
//         }
//       );
//     } else {
//       setAlertMessage("Geolocation is not supported by your browser");
//       setShowAlert(true);
//     }
//   };

//   const handleGetPointerLocation = () => {
//     setAlertMessage(`Pointer Location - Latitude: ${center.lat.toFixed(4)}, Longitude: ${center.lng.toFixed(4)}`);
//     setShowAlert(true);
//   };

//   const handleToggleStreetView = () => {
//     setShowStreetView(!showStreetView);
//   };

//   const streetViewUrl = `https://www.google.com/maps/embed/v1/streetview?location=${center.lat},${center.lng}&fov=80&heading=70&pitch=0&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`;

//   return (
//     <div className="h-[400px] w-full relative">
//       <div className={`h-full w-full ${showStreetView ? 'hidden' : ''}`}>
//         <MapContainer
//           center={[center.lat, center.lng]}
//           zoom={zoom}
//           style={{ height: '100%', width: '100%' }}
//         >
//           <TileLayer
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           />
//           <Marker position={[center.lat, center.lng]} />
//           <MapEvents />
//         </MapContainer>
//       </div>
//       {showStreetView && (
//         <iframe
//           width="100%"
//           height="100%"
//           frameBorder="0"
//           style={{ border: 0 }}
//           src={streetViewUrl}
//           allowFullScreen
//         />
//       )}
//       <div className="absolute bottom-4 left-4 z-[1000] space-x-2">
//         <Button onClick={handleGetLocation}>
//           Get My Location
//         </Button>
//         <Button onClick={handleGetPointerLocation}>
//           Get Pointer Location
//         </Button>
//         <Button onClick={handleToggleStreetView}>
//           {showStreetView ? <X className="mr-2 h-4 w-4" /> : <Map className="mr-2 h-4 w-4" />}
//           {showStreetView ? 'Close Street View' : 'Street View'}
//         </Button>
//       </div>
//       {showAlert && (
//         <Alert className="absolute top-4 left-4 right-4 z-[1000]">
//           <AlertTitle>Location Information</AlertTitle>
//           <AlertDescription>{alertMessage}</AlertDescription>
//         </Alert>
//       )}
//     </div>
//   );
// };

// export default MapComponent;

//info: 3rd final
import React, { useState, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Map, X, Navigation } from "lucide-react";
import "leaflet/dist/leaflet.css";

const MapComponent = () => {
  const [center, setCenter] = useState({ lat: 51.505, lng: -0.09 });
  const [zoom, setZoom] = useState(13);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showStreetView, setShowStreetView] = useState(false);
  const [showRoutes, setShowRoutes] = useState(false);
  const [destination, setDestination] = useState({ lat: 51.51, lng: -0.1 }); // Example destination
  const mapRef = useRef(null);

  const MapEvents = () => {
    const map = useMapEvents({
      move() {
        setCenter(map.getCenter());
      },
      zoom() {
        setZoom(map.getZoom());
      },
    });
    mapRef.current = map;
    return null;
  };

  const handleGetLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCenter({ lat: latitude, lng: longitude });
          mapRef.current.setView([latitude, longitude], 15);
          setAlertMessage(
            `Your Location - Latitude: ${latitude.toFixed(
              4
            )}, Longitude: ${longitude.toFixed(4)}`
          );
          setShowAlert(true);
        },
        () => {
          setAlertMessage("Unable to retrieve your location");
          setShowAlert(true);
        }
      );
    } else {
      setAlertMessage("Geolocation is not supported by your browser");
      setShowAlert(true);
    }
  };

  const handleGetPointerLocation = () => {
    setAlertMessage(
      `Pointer Location - Latitude: ${center.lat.toFixed(
        4
      )}, Longitude: ${center.lng.toFixed(4)}`
    );
    setShowAlert(true);
  };

  const handleToggleStreetView = () => {
    setShowStreetView(!showStreetView);
    setShowRoutes(false);
  };

  const handleToggleRoutes = () => {
    setShowRoutes(!showRoutes);
    setShowStreetView(false);
  };

  const streetViewUrl = `https://www.google.com/maps/embed/v1/streetview?location=${center.lat},${center.lng}&fov=80&heading=70&pitch=0&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`;

  const routesUrl = `https://www.google.com/maps/embed/v1/directions?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&origin=${center.lat},${center.lng}&destination=${destination.lat},${destination.lng}&mode=transit`;

  return (
    <div className="h-[400px] w-full relative">
      <div
        className={`h-full w-full ${
          showStreetView || showRoutes ? "hidden" : ""
        }`}
      >
        <MapContainer
          center={[center.lat, center.lng]}
          zoom={zoom}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[center.lat, center.lng]} />
          <MapEvents />
        </MapContainer>
      </div>
      {showStreetView && (
        <iframe
          width="100%"
          height="100%"
          frameBorder="0"
          style={{ border: 0 }}
          src={streetViewUrl}
          allowFullScreen
        />
      )}
      {showRoutes && (
        <iframe
          width="100%"
          height="100%"
          frameBorder="0"
          style={{ border: 0 }}
          src={routesUrl}
          allowFullScreen
        />
      )}
      <div className="absolute bottom-4 left-4 z-[1000] space-x-2">
        <Button onClick={handleGetLocation}>Get My Location</Button>
        <Button onClick={handleGetPointerLocation}>Get Pointer Location</Button>
        <Button onClick={handleToggleStreetView}>
          {showStreetView ? (
            <X className="mr-2 h-4 w-4" />
          ) : (
            <Map className="mr-2 h-4 w-4" />
          )}
          {showStreetView ? "Close Street View" : "Street View"}
        </Button>
        <Button onClick={handleToggleRoutes}>
          <Navigation className="mr-2 h-4 w-4" />
          {showRoutes ? "Close Routes" : "Show Routes"}
        </Button>
      </div>
      {showAlert && (
        <Alert className="absolute top-4 left-4 right-4 z-[1000]">
          <AlertTitle>Location Information</AlertTitle>
          <AlertDescription>{alertMessage}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default MapComponent;
