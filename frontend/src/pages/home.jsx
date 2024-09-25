// import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import api from "../api";

export default function Home() {
    
    const handleSubmit = async () => {
        try {
            const res = await api.post("/api/create-user/",{email:"yashdad4615@gmail.com",username:"test5",password:"123451"});
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <div >
            <Navbar className="w-full " />
            <button onClick={handleSubmit} className="w-full text-center">click</button>
            <div className=" h-[600px] w-full block">
                <h1 >Home</h1>
            </div>
            <Footer className="w-full "/>
        </div>
    );
}
