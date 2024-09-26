// import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import api from "../api";
import { Link } from "react-router-dom";
import { toast } from "sonner"

import Navbar2 from "../components/navbar2";
export default function Home() {

  const handleSubmit = async () => {
    try {
      const res = await api.post("/api/create-user/", {
        email: "yashdadad4615@gmail.com",
        username: "test1132",
        password: "123451",
        // phone_number: "123456789001",
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>

      <Navbar2 />
      
      {/* <button onClick={handleSubmit} className="w-full text-center">
        click
      </button> */}
      <Link className="text-center" to="/map" >map</Link>
    
      <div className=" h-[600px] w-full block">
      <img
                data-lg-size='1600-2400'
                className='mx-auto w-full cursor-pointer'
                alt=''
                src='https://airbnb-app.vercel.app/Images/banner_airbnb.webp'
              />
        <h1>Home</h1>
      </div>

    </div>
  );
}
