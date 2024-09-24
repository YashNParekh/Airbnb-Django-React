// import { Button } from "@/components/ui/button";



// export default function Home() {
//   return (
//     <>
//     hello 
//     </>
//   );
// }


import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
 
import { 
  FaSwimmingPool, FaTractor, FaMountain, FaHome, FaFire, FaBed, FaTree, FaGem,
  FaCampground, FaLandmark, FaCrown, FaUmbrellaBeach, FaLeaf, FaSnowflake,
  FaWater, FaCity, FaHeart, FaPalette, FaGlobe, FaCamera
} from 'react-icons/fa';

const categories = [
  { name: 'Amazing pools', icon: FaSwimmingPool },
  { name: 'Farms', icon: FaTractor },
  { name: 'Amazing views', icon: FaMountain },
  { name: 'Domes', icon: FaHome },
  { name: 'Trending', icon: FaFire },
  { name: 'Rooms', icon: FaBed },
  { name: 'Treehouses', icon: FaTree },
  { name: 'OMG!', icon: FaGem },
  { name: 'Cabins', icon: FaCampground },
  { name: 'Historical homes', icon: FaLandmark },
  { name: 'Luxe', icon: FaCrown },
  { name: 'Beach', icon: FaUmbrellaBeach },
  { name: 'Countryside', icon: FaLeaf },
  { name: 'Ski-in/out', icon: FaSnowflake },
  { name: 'Lakefront', icon: FaWater },
  { name: 'Urban', icon: FaCity },
  { name: 'Romantic', icon: FaHeart },
  { name: 'Design', icon: FaPalette },
  { name: 'International', icon: FaGlobe },
  { name: 'Photoshoot', icon: FaCamera }
];

const AccommodationCategoriesCarousel = () => {
  return (
    <div className="flex justify-center w-full">
    <Carousel
    opts={{
      align: "center",
    }}
    className="w-full max-w-sm"
  >
    <CarouselContent>
  {categories.map((category, index) => (
        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
          <div className="p-1 text-center">
            <Card className="border-none">
              <CardContent className="flex items-center justify-center p-6 aspect-square">
                <category.icon className="w-6 h-6 text-gray-700" />
              </CardContent>
            </Card>
            <span>{category.name}</span>
          </div>
        </CarouselItem>
      ))}
    </CarouselContent>
    <CarouselPrevious/>
    <CarouselNext />
  </Carousel>
  </div>
  );
};

export default AccommodationCategoriesCarousel;

