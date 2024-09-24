import React, { forwardRef, useImperativeHandle, useRef } from "react";

import api from "../api";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { toast } from "sonner";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// info: for icon
import { Mail, Phone } from "lucide-react";

import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";

import { useState } from "react";
import FinalSign_Login_Form from "./FinalSign_Login_Form";

const Sign_Login_Form = forwardRef((props, ref) => {
  const countryCodes = [
    { code: "+1", country: "US", flag: "🇺🇸" },
    { code: "+44", country: "GB", flag: "🇬🇧" },
    { code: "+91", country: "IN", flag: "🇮🇳" },
    { code: "+61", country: "AU", flag: "🇦🇺" },
    { code: "+86", country: "CN", flag: "🇨🇳" },
    // Add more country codes as needed
  ];
  const buttonRef = useRef();
  const buttonRef1 = useRef();
  const buttonRef2 = useRef();

  const [otpValues, setOtpValues] = useState("");

  const [emailInput, setEmailInput] = useState("");
  const [numberInput, setNumberInput] = useState("");

  useImperativeHandle(ref, () => ({
    click: () => {
      buttonRef.current.click(); // Trigger the button click
    },
  }));

  const [loginMethod, setLoginMethod] = useState("phone");
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[2]); // Default to India

  const toggleLoginMethod = () => {
    setLoginMethod(loginMethod === "phone" ? "email" : "phone");
  };

  const sendOTP = async (methode, param) => {
    try {
      const res = await api.post(`/api/${methode}/`, param);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            style={{ display: "none" }}
            variant="ghost"
            ref={buttonRef}
          ></Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] p-0 bg-white">
          <DialogHeader className="p-6 border-b">
            <DialogTitle className="text-xl font-semibold">
              Log in or sign up
            </DialogTitle>
          </DialogHeader>
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Welcome to Airbnb</h2>
            {loginMethod === "phone" ? (
              <div className="space-y-4">
                <div className="flex">
                  <Select
                    onValueChange={(value) =>
                      setSelectedCountry(
                        countryCodes.find((c) => c.code === value)
                      )
                    }
                  >
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="Code">
                        {selectedCountry.flag} {selectedCountry.code}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {countryCodes.map((country) => (
                        <SelectItem key={country.code} value={country.code}>
                          {country.flag} {country.country} ({country.code})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <input
                    type="tel"
                    value={numberInput}
                    onChange={(e) => setNumberInput(e.target.value)}
                    placeholder="Phone number"
                    className="flex-grow ml-2"
                    required
                    title="Phone number length must be between 9 and 15 characters"
                  />
                </div>
              </div>
            ) : (
              <Input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Email"
              />
            )}
            <Button
              onClick={async () => {
                if (loginMethod === "phone") {
                  if (!/^\d{10,15}$/.test(numberInput)) {
                    alert(
                      "Phone number must be between 10 and 15 digits and only contain numbers"
                    );
                    return;
                  }

                  console.log("phone number", numberInput);
                  await api
                    .post("/api/send-phone/", { phone_number: numberInput })
                    .catch((error) => {
                      alert("error sending otp on phone number");
                      return;
                    });

                  buttonRef1.current.click();
                  buttonRef.current.click();
                } else {
                  buttonRef2.current.click();
                  buttonRef.current.click();
                }
              }}
              className="w-full bg-[#ff385c] hover:bg-[#d90b63] text-white mt-6 py-6 rounded-lg text-lg font-semibold"
            >
              Continue
            </Button>
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">or</span>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full py-6 font-semibold"
              onClick={toggleLoginMethod}
            >
              {loginMethod === "phone" ? (
                <>
                  {/* <img src="/path-to-email-icon.png" alt="Email icon" className="mr-2 h-5 w-5" /> */}
                  <Mail className="mx-2" size={24} color="#000" />
                  <span className="mx-2 block">Continue with email</span>
                </>
              ) : (
                <>
                  {/* <img src="/path-to-phone-icon.png" alt="Phone icon" className="mr-2 h-5 w-5" /> */}
                  <Phone className="mx-2" size={24} color="#000" />
                  <span className="mx-2">Continue with phone</span>
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <>
        <Dialog>
          <DialogTrigger>
            <Button
              style={{ display: "none" }}
              className="w-full bg-[#ff385c] hover:bg-[#d90b63] text-white mt-6 py-6 rounded-lg text-lg font-semibold"
              ref={buttonRef1}
            ></Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[425px] bg-white ">
            <DialogHeader>
              <DialogTitle className="text-center">Enter OTP</DialogTitle>
            </DialogHeader>

            <div className="space-y-2">
              <InputOTP
                maxLength={6}
                value={otpValues}
                onChange={(value) => setValue(value)}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              <div className="text-center text-sm">
                {otpValues === "" ? (
                  <>Enter your one-time password.</>
                ) : (
                  <>You entered: {otpValues}</>
                )}
              </div>
            </div>

            <Button
              onClick={async () => {
                try {
                  const res = await api.post("/api/verify-phone/", {
                    otp: otpValues,
                    phone_number: numberInput,
                  });

                  if (res.status === 200) {
                    toast("SUCCESS", {
                      description: "OTP Verified",
                      action: {
                        label: "Undo",
                        onClick: () => console.log("Undo"),
                      },
                    });
                    buttonRef1.current.click();
                    buttonRef2.current.click();
                  } else {
                    toast("ERROR", {
                      description: "OTP Not Verified",
                      action: {
                        label: "Undo",
                        onClick: () => console.log("Undo"),
                      },
                    });
                    // return;
                    // alert("OTP is not valied");
                  }
                } catch {
                  alert("error checking otp on phone number");
                }
              }}
              className="w-full bg-[#ff385c] hover:bg-[#d90b63] text-white"
            >
              continue
            </Button>
          </DialogContent>
        </Dialog>
      </>

      <FinalSign_Login_Form ref={buttonRef2} loginMethod={loginMethod} />
    </>
  );
});

export default Sign_Login_Form;
