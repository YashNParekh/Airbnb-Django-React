import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label";
import { useNavigate } from 'react-router-dom';

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


import {
  FaTv,
  FaToilet,
  FaShower,
  FaUtensils,
  FaCoffee,
  FaHiking,
  FaBicycle,
  FaHotTub,
  FaSmoking,
  FaWheelchair,
  FaParking,
  FaSkiing,
  FaSwimmer,
  FaDumbbell,
} from "react-icons/fa";
import { CgGym } from "react-icons/cg";
import { FaHouse } from "react-icons/fa6";

import { PiHairDryerLight } from "react-icons/pi";
const amenities1 = [
  { title: "TV", icon: FaTv },
  { title: "Entire home", icon: FaHouse },
  { title: "Hair dryer", icon: PiHairDryerLight },
  { title: "Toilet", icon: FaToilet },
  { title: "Shower", icon: FaShower },
  { title: "Kitchen", icon: FaUtensils },
  { title: "Coffee maker", icon: FaCoffee },
  { title: "Hiking", icon: FaHiking },
  { title: "Bicycle", icon: FaBicycle },
  { title: "Hot tub", icon: FaHotTub },
  { title: "Smoking allowed", icon: FaSmoking },
  { title: "Wheelchair accessible", icon: FaWheelchair },
  { title: "Free parking", icon: FaParking },
  { title: "Gym", icon: CgGym  },
  { title: "Ski-in/out", icon: FaSkiing },
  { title: "Private pool", icon: FaSwimmer },
  { title: "Private hot tub", icon: FaDumbbell },
];

import {
  FaHouseUser,
  FaBuilding,
  FaHotel,
} from "react-icons/fa";

const property_types = [
  { title: "House", icon: FaHouseUser },
  { title: "Apartment", icon: FaBuilding },
  { title: "Hotel room", icon: FaHotel },
  { title: "Cabin", icon: FaCampground },
  { title: "Bed & breakfast", icon: FaBed },
];




const PropertyUploadForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    property_type: '',
    location_type: '',
    address: '',
    city: '',
    state: '',
    country: '',
    price_per_night: '',
    bedrooms: 0,
    bathrooms: 0,
    max_guests: 0,
    pets_allowed: false,
    entire_place: true,
    amenities: [],
    images: [],
  });
  
  

  const [propertyTypes, setPropertyTypes] = useState([]);
  const [locationTypes, setLocationTypes] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [uploading, setUploading] = useState(false);

  // Handle regular input fields
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Handle checkbox for amenities
  const handleAmenityChange = (amenityId) => {
    setSelectedAmenities((prevSelected) =>
      prevSelected.includes(amenityId)
        ? prevSelected.filter((id) => id !== amenityId)
        : [...prevSelected, amenityId]
    );
  };

  // Handle image uploads
  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      images: e.target.files,
    });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === 'images') {
        Array.from(formData.images).forEach((file) => {
          form.append('images', file);
        });
      } else if (key === 'amenities') {
        form.append('amenities', selectedAmenities);
      } else {
        form.append(key, formData[key]);
      }
    });

    console.log('Form Data:', formData);
    console.log('Selected Amenities:', selectedAmenities);
    try {
      const response = await axios.post('/api/properties/', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log(response.data);
      setUploading(false);
      alert('Property uploaded successfully!');
      navigate('/')
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  // Fetch property types, location types, and amenities on component mount
  useEffect(() => {
    const fetchData = async () => {
      // const propertyTypeResponse = await axios.get('/api/property-types/');
      // const locationTypeResponse = await axios.get('/api/location-types/');
      // const amenitiesResponse = await axios.get('/api/amenities/');
      setPropertyTypes(property_types);
      setLocationTypes(categories);
      setAmenities(amenities1);
    };
    fetchData();
  }, []);

  const navigate = useNavigate();
  

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Upload Property</h2>

      <div className="mb-4">
        <Label htmlFor="title">Property Title</Label>
        <Input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleInputChange}
          required
          placeholder="Enter property title"
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
          placeholder="Enter property description"
        />
      </div>

       <div className="mb-4">
        <Label htmlFor="property_type">Property Type</Label>
        <select
          id="property_type"
          name="property_type"
          value={formData.property_type}
          onChange={handleInputChange}
          required
        >
          <option value="">Select property type</option>
          {propertyTypes.map((type) => (
            <option key={type.title} value={type.title}>
              {type.title} : {type.icon}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <Label htmlFor="location_type">Location Type</Label>
        <select
          id="location_type"
          name="location_type"
          value={formData.location_type}
          onChange={handleInputChange}
          required
        >
          <option value="">Select location type</option>
          {locationTypes.map((type) => (
            <option key={type.name} value={type.name}>
              {type.name} : {type.icon}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <Label>Amenities</Label>
        <div className="grid grid-cols-2 gap-4">
          {amenities.map((amenity) => (
            <div key={amenity.id}>
              <input
              type='checkbox'
                id={`amenity-${amenity.icon}`}
                checked={selectedAmenities.includes(amenity.icon)}
                onChange={() => handleAmenityChange(amenity.icon)}
              />
              <Label htmlFor={`amenity-${amenity.id}`} className="ml-2">
                {amenity.title} {amenity.icon}
              </Label>
            </div>
          ))}
        </div>
      </div> 

      <div className="mb-4">
        <Label htmlFor="images">Upload Images</Label>
        <Input
          id="images"
          name="images"
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="price_per_night">Price per Night</Label>
        <Input
          id="price_per_night"
          name="price_per_night"
          type="number"
          value={formData.price_per_night}
          onChange={handleInputChange}
          required
          placeholder="Enter price per night"
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="bedrooms">Bedrooms</Label>
        <Input
          id="bedrooms"
          name="bedrooms"
          type="number"
          value={formData.bedrooms}
          onChange={handleInputChange}
          required
          placeholder="Enter number of bedrooms"
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="bathrooms">Bathrooms</Label>
        <Input
          id="bathrooms"
          name="bathrooms"
          type="number"
          value={formData.bathrooms}
          onChange={handleInputChange}
          required
          placeholder="Enter number of bathrooms"
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="max_guests">Max Guests</Label>
        <Input
          id="max_guests"
          name="max_guests"
          type="number"
          value={formData.max_guests}
          onChange={handleInputChange}
          required
          placeholder="Enter max guests"
        />
      </div>

      <div className="mb-4">
      <input  
          type="checkbox"
          id="pets_allowed"
          name="pets_allowed"
          checked={formData.pets_allowed}
          onChange={handleInputChange}
        />
        <Label htmlFor="pets_allowed"
         className="ml-2   text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"  >
          Pets Allowed
        </Label>
      </div>

      <Button type="submit" className="w-full" disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload Property'}
      </Button>
    </form>
  );
};

export default PropertyUploadForm;
