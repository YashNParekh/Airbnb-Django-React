import React, { useState } from 'react';
import axios from 'axios';
import { Button, Input, Label, TextArea, FileInput, Checkbox } from 'shadcn/ui';

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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      images: e.target.files,
    });
  };

  const handleAmenityChange = (amenityId) => {
    if (selectedAmenities.includes(amenityId)) {
      setSelectedAmenities(selectedAmenities.filter((id) => id !== amenityId));
    } else {
      setSelectedAmenities([...selectedAmenities, amenityId]);
    }
  };

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

    try {
      const response = await axios.post('/api/properties/', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Add your JWT token
        },
      });
      console.log(response.data);
      setUploading(false);
      alert('Property uploaded successfully!');
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  // Fetch property types, location types, and amenities on component mount
  useEffect(() => {
    const fetchData = async () => {
      const propertyTypeResponse = await axios.get('/api/property-types/');
      const locationTypeResponse = await axios.get('/api/location-types/');
      const amenitiesResponse = await axios.get('/api/amenities/');

      setPropertyTypes(propertyTypeResponse.data);
      setLocationTypes(locationTypeResponse.data);
      setAmenities(amenitiesResponse.data);
    };
    fetchData();
  }, []);

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
        <TextArea
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
            <option key={type.id} value={type.id}>
              {type.name}
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
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <Label>Amenities</Label>
        <div className="grid grid-cols-2 gap-4">
          {amenities.map((amenity) => (
            <div key={amenity.id}>
              <Checkbox
                id={`amenity-${amenity.id}`}
                checked={selectedAmenities.includes(amenity.id)}
                onChange={() => handleAmenityChange(amenity.id)}
              />
              <Label htmlFor={`amenity-${amenity.id}`} className="ml-2">
                {amenity.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <Label htmlFor="images">Upload Images</Label>
        <FileInput
          id="images"
          name="images"
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
        <Checkbox
          id="pets_allowed"
          name="pets_allowed"
          checked={formData.pets_allowed}
          onChange={handleInputChange}
        />
        <Label htmlFor="pets_allowed" className="ml-2">
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
