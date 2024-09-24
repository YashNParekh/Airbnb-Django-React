// import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import api from "../api";

export default function Home() {
    
    const handleSubmit = async () => {
        try {
            const res = await api.post("/api/send-phone/",{phone_number:"1234567890"});
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <div >
            <Navbar className="w-full " />
            <div className=" h-[600px] w-full block">
                <h1 >Home</h1>
            </div>
            <Footer className="w-full "/>
        </div>
    );
}
