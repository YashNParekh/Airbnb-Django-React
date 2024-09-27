
import React from "react";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar2 from "../components/navbar2";
import api from "../api";

const Home = () => {
  const handel = async() => {
    const res = await api.post("/api/token/", { email:"yash2005@gmail.com", password:"1234" });
    console.log(res.data);
  }
  
  
  
  return (
    <div className="bg-gray-100 min-h-screen">

      <Navbar2 />

      <img
        data-lg-size="1600-2400"
        className="mx-auto w-full cursor-pointer"
        alt=""
        src="https://airbnb-app.vercel.app/Images/banner_airbnb.webp"
        // src="homepage.jpg"

      />
      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Find your next stay</h1>
          <p className="text-gray-600 mb-4">
            Discover unique homes and experiences around the world
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { category: "Beach", src: "home/Beach.jpeg" },
              { category: "Mountain", src: "home/Mountain.jpeg" },
              { category: "City", src: "home/City.jpeg" },
              { category: "Countryside", src: "home/Countryside.jpeg" },
            ].map((item) => (
              <div
                key={item.category}
                className="bg-white rounded-lg shadow-sm hover:shadow-md p-4 transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-105"
              >
                <img
                  src={item.src}
                  alt={item.category}
                  className="w-full h-40 object-cover rounded mb-2"
                />
                <h3 className="font-semibold">{item.category}</h3>
              </div>
            ))}
          </div>
        </section>

        <Separator className="my-8" />

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">How It Works</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Find the perfect place</AccordionTrigger>
              <AccordionContent>
                <p>
                  Browse through millions of listings in thousands of cities
                  around the world. Use our advanced filters to find the perfect
                  match for your needs:
                </p>
                <ul className="list-disc list-inside mt-2">
                  <li>Filter by price range, amenities, and property type</li>
                  <li>
                    Read detailed descriptions and view high-quality photos
                  </li>
                  <li>Check guest reviews and host ratings</li>
                  <li>
                    Use the map view to find properties in your preferred
                    location
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Book with confidence</AccordionTrigger>
              <AccordionContent>
                <p>
                  Our secure platform ensures your booking is protected from
                  start to finish:
                </p>
                <ul className="list-disc list-inside mt-2">
                  <li>Secure payment processing</li>
                  <li>Clear cancellation policies</li>
                  <li>Verified host profiles</li>
                  <li>24/7 customer support</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Travel with peace of mind</AccordionTrigger>
              <AccordionContent>
                <p>
                  Our 24/7 customer support is always here to help if you need
                  it. We also offer:
                </p>
                <ul className="list-disc list-inside mt-2">
                  <li>AirCover protection for guests</li>
                  <li>Local recommendations and travel guides</li>
                  <li>
                    Easy communication with hosts through our messaging system
                  </li>
                  <li>Emergency support during your stay</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">AirCover for Guests</h2>
          <Card>
            <CardHeader>
              <CardTitle>
                Top-to-bottom protection, free for every booking
              </CardTitle>
              <CardDescription>
                AirCover is comprehensive protection included for free with
                every booking.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>
                  <Badge variant="secondary">
                    Booking Protection Guarantee
                  </Badge>
                  <p className="mt-1">
                    In the unlikely event a Host needs to cancel your booking
                    within 30 days of check-in, we'll find you a similar or
                    better home, or we'll refund you.
                  </p>
                </li>
                <li>
                  <Badge variant="secondary">Check-In Guarantee</Badge>
                  <p className="mt-1">
                    If you can't check into your home and the Host cannot
                    resolve the issue, we'll find you a similar or better home
                    for the length of your original stay, or we'll refund you.
                  </p>
                </li>
                <li>
                  <Badge variant="secondary">
                    Get-What-You-Booked Guarantee
                  </Badge>
                  <p className="mt-1">
                    If at any time during your stay you find your listing isn't
                    as advertised, you'll have three days to report it and we'll
                    find you a similar or better home, or we'll refund you.
                  </p>
                </li>
                <li>
                  <Badge variant="secondary">24-hour Safety Line</Badge>
                  <p className="mt-1">
                    If you ever feel unsafe, you'll get priority access to
                    specially-trained safety agents, day or night.
                  </p>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Become a Host</h2>
          <div className="bg-cyan-100 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">
              Share your space, earn extra income
            </h3>
            <p className="text-gray-700 mb-4">
              Turn your extra space into an opportunity. Hosting is easy with
              our step-by-step guidance and 24/7 support.
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>
                Set your own schedule, prices, and requirements for guests
              </li>
              <li>Host insurance and protection included for free</li>
              <li>24/7 support from our hosting specialists</li>
              <li>Access to hosting tips and resources to help you succeed</li>
            </ul>
            <button className="bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700 transition-colors">
              Learn More About Hosting
            </button>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Popular Experiences</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Cooking Class in Rome", 
                category: "Food & Drink" ,
                src:"home\\Coking.jpeg"
              },
              { title: "Street Art Tour in Berlin",
                 category: "Art & Culture",
                 src:"\\home\\streetArt.jpg" 
                },

                 
              { title: "Surf Lesson in Bali", 
                category: "Adventure",
                src:'home\\surfe.jpeg'
               },
            ].map((experience, index) => (
              <Card key={index}>
                <img
                  src={experience.src}
                  alt={experience.title}
                  className="w-full h-48 object-cover"
                />
                <CardHeader>
                  <CardTitle>{experience.title}</CardTitle>
                  <CardDescription>{experience.category}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Join local experts and fellow travelers for unforgettable
                    activities.
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Featured Destinations</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {
            [{title:"New York",src:"home\\NewYork.jpg"},
             {title:"Paris",src:"home\\Paris.jpg"},
             {title:"Tokyo",src:"home\\Tokyo.webp"},
              {title:"London",src:"home\\london.jpg"},].map((item) => (
                <div
                  key={item.title}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md p-4 transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                >
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-40 object-cover rounded mb-2"
                  />
                  <h3 className="font-semibold">{item.title}</h3>
                </div>
              ))}

          </div>
        </section>
      </main>

    </div>
  );
};

export default Home;
