// import React from "react";

// import { Card, CardContent } from "@/components/ui/card";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";

// import {
//   FaSwimmingPool,
//   FaTractor,
//   FaMountain,
//   FaHome,
//   FaFire,
//   FaBed,
//   FaTree,
//   FaGem,
//   FaCampground,
//   FaLandmark,
//   FaCrown,
//   FaUmbrellaBeach,
//   FaLeaf,
//   FaSnowflake,
//   FaWater,
//   FaCity,
//   FaHeart,
//   FaPalette,
//   FaGlobe,
//   FaCamera,
// } from "react-icons/fa";

// const categories = [
//   { name: "Amazing pools", icon: FaSwimmingPool },
//   { name: "Farms", icon: FaTractor },
//   { name: "Amazing views", icon: FaMountain },
//   { name: "Domes", icon: FaHome },
//   { name: "Trending", icon: FaFire },
//   { name: "Rooms", icon: FaBed },
//   { name: "Treehouses", icon: FaTree },
//   { name: "OMG!", icon: FaGem },
//   { name: "Cabins", icon: FaCampground },
//   { name: "Historical homes", icon: FaLandmark },
//   { name: "Luxe", icon: FaCrown },
//   { name: "Beach", icon: FaUmbrellaBeach },
//   { name: "Countryside", icon: FaLeaf },
//   { name: "Ski-in/out", icon: FaSnowflake },
//   { name: "Lakefront", icon: FaWater },
//   { name: "Urban", icon: FaCity },
//   { name: "Romantic", icon: FaHeart },
//   { name: "Design", icon: FaPalette },
//   { name: "International", icon: FaGlobe },
//   { name: "Photoshoot", icon: FaCamera },
// ];

// const AccommodationCategoriesCarousel = () => {
//   return (

//     <Carousel
//       opts={{
//         align: "start",
//         // loop: true,
//       }}
//       className=" w-full max-w-full mx-auto px-4 sm:px-6 lg:px-8 relative flex flex-col items-center"
//     >
//       <div className="  px-10 py-4 w-[90%] flex-row  flex  justify-center items-center">
//         <div className="flex relative items-center justify-center">
//           <CarouselPrevious
//              className="border-none relative flex-grow top-[14px] right-0 ml-10"
//             style={{

//               boxShadow:
//                 "0 0 4px 2px rgba(0, 0, 0, 0.1), 0 0 8px 4px rgba(0, 0, 0, 0.1), 0 0 16px 8px rgba(0, 0, 0, 0.1)",

//             }} />
//         </div>

//           <CarouselContent>
//             {categories.map((category, index) => (
//               <CarouselItem
//                 key={index}
//                 className=" md:basis-1/4 lg:basis-1/6 xl:basis-[12%]"
//               >
//                 <div className="flex flex-col items-center p-2">
//                   <div className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200">
//                     <category.icon className="w-6 h-6 text-gray-700" />
//                   </div>
//                   <span className="mt-2 text-xs text-center">
//                     {category.name}
//                   </span>
//                 </div>
//               </CarouselItem>
//             ))}
//           </CarouselContent>

//         <div className="flex items-center justify-center">
//           <CarouselNext
//             className="border-none relative flex-grow top-[14px] right-0 mr-10"
//             style={{

//               boxShadow:
//                 "0 0 4px 2px rgba(0, 0, 0, 0.1), 0 0 8px 4px rgba(0, 0, 0, 0.1), 0 0 16px 8px rgba(0, 0, 0, 0.1)",

//             }}
//           />
//         </div>
//       </div>
//     </Carousel>

//   );
// };

// export default AccommodationCategoriesCarousel;

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
