import { useState } from "react";
import Home from "./pages/home";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import Footer from "./components/Footer";
import Navbar from "./components/navbar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MapComponent from "./components/MapComponent";


import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />}></Route>
          <Route path="map" element={<MapComponent />}></Route>
          
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer className="w-full " />
      </BrowserRouter>

      <Toaster />
    </>
  );
}

export default App;
