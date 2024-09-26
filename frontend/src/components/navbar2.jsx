import React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import {
  FaSwimmingPool,
  FaTractor,
  FaMountain,
  FaHome,
  FaFire,
  FaBed,
  FaTree,
  FaGem,
  FaCampground,
  FaLandmark,
  FaCrown,
  FaUmbrellaBeach,
  FaLeaf,
  FaSnowflake,
  FaWater,
  FaCity,
  FaHeart,
  FaPalette,
  FaGlobe,
  FaCamera,
} from "react-icons/fa";

const categories = [
  { name: "Amazing pools", icon: FaSwimmingPool },
  { name: "Farms", icon: FaTractor },
  { name: "Amazing views", icon: FaMountain },
  { name: "Domes", icon: FaHome },
  { name: "Trending", icon: FaFire },
  { name: "Rooms", icon: FaBed },
  { name: "Treehouses", icon: FaTree },
  { name: "OMG!", icon: FaGem },
  { name: "Cabins", icon: FaCampground },
  { name: "Historical homes", icon: FaLandmark },
  { name: "Luxe", icon: FaCrown },
  { name: "Beach", icon: FaUmbrellaBeach },
  { name: "Countryside", icon: FaLeaf },
  { name: "Ski-in/out", icon: FaSnowflake },
  { name: "Lakefront", icon: FaWater },
  { name: "Urban", icon: FaCity },
  { name: "Romantic", icon: FaHeart },
  { name: "Design", icon: FaPalette },
  { name: "International", icon: FaGlobe },
  { name: "Photoshoot", icon: FaCamera },
];

const AccommodationCategoriesCarousel = () => {
  return (

    <Carousel
      opts={{
        align: "start",
        // loop: true,
      }}
      className=" w-full max-w-full mx-auto px-4 sm:px-6 lg:px-8 relative flex flex-col items-center"
    >
      <div className="  px-10 py-4 w-[90%] flex-row  flex  justify-center items-center">
        <div className="flex relative items-center justify-center">
          <CarouselPrevious
             className="border-none relative flex-grow top-[14px] right-0 ml-10"
            style={{
                
              boxShadow:
                "0 0 4px 2px rgba(0, 0, 0, 0.1), 0 0 8px 4px rgba(0, 0, 0, 0.1), 0 0 16px 8px rgba(0, 0, 0, 0.1)",
                
            }} />
        </div>

          <CarouselContent>
            {categories.map((category, index) => (
              <CarouselItem
                key={index}
                className=" md:basis-1/4 lg:basis-1/6 xl:basis-[12%]"
              >
                <div className="flex flex-col items-center p-2">
                  <div className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200">
                    <category.icon className="w-6 h-6 text-gray-700" />
                  </div>
                  <span className="mt-2 text-xs text-center">
                    {category.name}
                  </span>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

        <div className="flex items-center justify-center">
          <CarouselNext
            className="border-none relative flex-grow top-[14px] right-0 mr-10"
            style={{
                
              boxShadow:
                "0 0 4px 2px rgba(0, 0, 0, 0.1), 0 0 8px 4px rgba(0, 0, 0, 0.1), 0 0 16px 8px rgba(0, 0, 0, 0.1)",
                
            }}
          />
        </div>
      </div>
    </Carousel>

  );
};

export default AccommodationCategoriesCarousel;
