import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

export default function Profile() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [showEmergencyContactFields, setShowEmergencyContactFields] = useState(
    false
  );
  const [error, setError] = useState(null);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [date_of_birth, setDateOfBirth] = useState("");
  const [government_id, setGovernmentID] = useState("");
  const [address, setAddress] = useState("");
  const [emergency_contact_name, setEmergencyContactName] = useState("");
  const [
    emergency_contact_relationship,
    setEmergencyContactRelationship,
  ] = useState("");
  const [emergency_contact_language, setEmergencyContactLanguage] = useState(
    ""
  );
  const [emergency_contact_email, setEmergencyContactEmail] = useState("");
  const [emergency_contact_phone, setEmergencyContactPhone] = useState("");
  const [
    emergency_contact_country_code,
    setEmergencyContactCountryCode,
  ] = useState("");
  const [profile_image, setProfileImage] = useState(null);
  const [profile_image_preview, setProfileImagePreview] = useState(null);

  const fatch_Data = async () => {
    try {
      const response = await api.get("/api/user/"); // Ensure the leading slash is included
      setUser(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fatch_Data();
  }, []);

  // Other state variables...

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    // const formData = {};
    formData.append("username", username ? username : user.username);
    formData.append("email", email ? email : user.email); ;
    formData.append("phone_number", phone_number ? phone_number : user.phone_number);
    formData.append("date_of_birth", date_of_birth);
    formData.append("government_id", government_id);
    formData.append("address", address);
    formData.append("emergency_contact_name", emergency_contact_name);
    formData.append(
      "emergency_contact_relationship",
      emergency_contact_relationship
    );
    formData.append("emergency_contact_language", emergency_contact_language);
    formData.append("emergency_contact_email", emergency_contact_email);
    formData.append("emergency_contact_phone", emergency_contact_phone);
    formData.append(
      "emergency_contact_country_code",
      emergency_contact_country_code
    );
    if (profile_image) {
      formData.append("profile_image", profile_image);
    }

    api
      .patch(`/api/edit-profile/`, formData)
      .then((response) => {
        toast.success("Profile updated successfully");
        navigate("/profile");
      })
      .catch((error) => {
        setError(error);
      });
  };

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-1/2 p-10 bg-gray-100 rounded-md shadow-md">
        <h1 className="text-3xl font-bold text-center mb-5">Profile</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-5">
            <label className="mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={user.username}
              className="p-2 rounded-md border border-gray-300"
            />
          </div>
          <div className="flex flex-col mb-5">
            <label className="mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={user.email}
              className="p-2 rounded-md border border-gray-300"
            />
          </div>
          <div className="flex flex-col mb-5">
            <label className="mb-2" htmlFor="phone_number">
              Phone Number
            </label>
            <input
              type="text"
              id="phone_number"
              value={phone_number}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder={user.phone_number}
              className="p-2 rounded-md border border-gray-300"
            />
          </div>
          <div className="flex flex-col mb-5">
            <label className="mb-2" htmlFor="date_of_birth">
              Date of Birth
            </label>
            <input
              type="date"
              id="date_of_birth"
              value={date_of_birth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              placeholder={user.date_of_birth}
              className="p-2 rounded-md border border-gray-300"
            />
          </div>
          <div className="flex flex-col mb-5">
            <label className="mb-2" htmlFor="government_id">
              Government ID
            </label>
            <input
              type="text"
              id="government_id"
              value={government_id}
              onChange={(e) => setGovernmentID(e.target.value)}
              placeholder={user.government_id}
              className="p-2 rounded-md border border-gray-300"
            />
          </div>
          <div className="flex flex-col mb-5">
            <label className="mb-2" htmlFor="address">
              Address
            </label>
            <textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder={user.address}
              className="p-2 rounded-md border border-gray-300"
            />
          </div>
          <div className="flex items-center mb-5">
            <input
              type="checkbox"
              id="show-emergency-contact-fields"
              checked={showEmergencyContactFields}
              onChange={(e) => setShowEmergencyContactFields(e.target.checked)}
            />
            <label className="ml-2" htmlFor="show-emergency-contact-fields">
              Show Emergency Contact Fields
            </label>
          </div>
          {showEmergencyContactFields && (
            <>
              <div className="flex flex-col mb-5">
                <label className="mb-2" htmlFor="emergency_contact_name">
                  Emergency Contact Name
                </label>
                <input
                  type="text"
                  id="emergency_contact_name"
                  value={emergency_contact_name}
                  onChange={(e) => setEmergencyContactName(e.target.value)}
                  placeholder={user.emergency_contact_name}
                  className="p-2 rounded-md border border-gray-300"
                />
              </div>
              <div className="flex flex-col mb-5">
                <label
                  className="mb-2"
                  htmlFor="emergency_contact_relationship"
                >
                  Emergency Contact Relationship
                </label>
                <input
                  type="text"
                  id="emergency_contact_relationship"
                  value={emergency_contact_relationship}
                  onChange={(e) =>
                    setEmergencyContactRelationship(e.target.value)
                  }
                  placeholder={user.emergency_contact_relationship}
                  className="p-2 rounded-md border border-gray-300"
                />
              </div>
              <div className="flex flex-col mb-5">
                <label className="mb-2" htmlFor="emergency_contact_language">
                  Emergency Contact Language
                </label>
                <input
                  type="text"
                  id="emergency_contact_language"
                  value={emergency_contact_language}
                  onChange={(e) => setEmergencyContactLanguage(e.target.value)}
                  placeholder={user.emergency_contact_language}
                  className="p-2 rounded-md border border-gray-300"
                />
              </div>
              <div className="flex flex-col mb-5">
                <label className="mb-2" htmlFor="emergency_contact_email">
                  Emergency Contact Email
                </label>
                <input
                  type="email"
                  id="emergency_contact_email"
                  value={emergency_contact_email}
                  onChange={(e) => setEmergencyContactEmail(e.target.value)}
                  placeholder={user.emergency_contact_email}
                  className="p-2 rounded-md border border-gray-300"
                />
              </div>
              <div className="flex flex-col mb-5">
                <label className="mb-2" htmlFor="emergency_contact_phone">
                  Emergency Contact Phone
                </label>
                <input
                  type="text"
                  id="emergency_contact_phone"
                  value={emergency_contact_phone}
                  onChange={(e) => setEmergencyContactPhone(e.target.value)}
                  placeholder={user.emergency_contact_phone}
                  className="p-2 rounded-md border border-gray-300"
                />
              </div>
              
            </>
          )}
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">Save</button>
        </form>
      </div>
    </div>
  );
}
