import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { toast } from "sonner";
import api from "../api";

import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

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

const Sign_Login_Form = forwardRef((props1, ref) => {
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
  const email_pass_ref = useRef();

  const [otpValues, setOtpValues] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [numberInput, setNumberInput] = useState("");
  const [loginMethod, setLoginMethod] = useState("phone");
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[2]);
  const [openPassword, setOpenPassword] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  useImperativeHandle(ref, () => ({
    click: () => {
      setOtpValues("");
      setEmailInput("");
      setNumberInput("");
      setSelectedCountry(countryCodes[2]);
      setOpenPassword("");
      // console.log("clicked");
      buttonRef.current.click(); // Trigger the button click
      console.log("clicked");
      setLoginMethod("phone");
    },
  }));
  // Default to India

  const toggleLoginMethod = () => {
    setLoginMethod(loginMethod === "phone" ? "email" : "phone");
    if (loginMethod === "phone") { setEmailInput(""); }
    if (loginMethod === "email") { setNumberInput(""); }
  };

  const methodeAfter_First_input = async () => {
    try {
      if (loginMethod === "phone") {
        console.log("phone number", numberInput);
        console.log("phone number", !/^\d{10,15}$/.test(numberInput));

        if (!/^\d{10,15}$/.test(numberInput)) {
          toast.error(
             "Error"
            ,{            
            description: <span className="text-red-500">"Phone number must be between 10 and 15 digits and only contain numbers"</span>,
              action: {
                label: "X",
              },
          });
          return;
        }

        console.log("phone number", numberInput);

        await api.post("/api/send-phone/", { phone_number: numberInput });

        buttonRef1.current.click();
        buttonRef.current.click();
      } else {
        console.log("email", validateEmail(emailInput));
        if (!validateEmail(emailInput)) {
          alert("Email is not valid");
          return;
        }
        console.log("email", emailInput);

        const res = await api.post("/api/verify-existing/", {
          email: emailInput,
        });

        if (res.data.message === "exists") {
          buttonRef.current.click();
          email_pass_ref.current.click();

          return;
        }

        buttonRef.current.click();
        buttonRef2.current.click();
      }
    } catch (error) {
      toast.error({
        description: error.message,
        action: {
          label: "X",
        },
      });
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
                <div className="flex bg-white">
                  <Select
                    onValueChange={(value) =>
                      setSelectedCountry(
                        countryCodes.find((c) => c.code === value)
                      )
                    }
                  >
                    <SelectTrigger className="w-[100px]">
                      <SelectValue  placeholder={selectedCountry.flag+" "+selectedCountry.code}>
                        {selectedCountry.flag} {selectedCountry.code}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent className="bg-white">
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
                    className="border p-1 rounded  flex-grow ml-2"
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
              onClick={methodeAfter_First_input}
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
          <DialogTrigger asChild>
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

            <div className="flex items-center justify-center space-y-2">
              <InputOTP
                className="mx-auto"
                maxLength={6}
                value={otpValues}
                onChange={(value) => setOtpValues(value)}
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
                    
                    toast.success("success",{
                      description: <span className="text-green-500">OTP is valied</span>,
                      action: {
                        label: "X",
                      },
                    });

                    const res = await api.post("/api/verify-existing/", {
                      phone_number: numberInput,
                    });
                    if (res.data.message === "exists") {
                      try {


                        // todo: here 
                        // info: is the number thing to sotre the access token and the refresh token
                        
                        const res = await api.post("/api/token-number/", {
                          phone_number: numberInput,
                        });
                        console.log("res.data", res.data);
                        localStorage.setItem(ACCESS_TOKEN, res.data.access);
                        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);

                        toast.success("success",{
                          description: <span className="text-cyan-400-500">
                              Welcome Back {res.data.user}!
                            </span>,
                          action: {
                            label: "X",
                          },
                        });
                        
                        buttonRef1.current.click();

                        
                        navigate("/");
                      } catch (error) {

                        toast.error("ERROR", {
                          description: <span className="text-red-500">
                              Something went wrong 
                            </span>
                          ,
                          action: {
                            label: "X",
                          },
                        });
                      }
                    } else {
                      buttonRef2.current.click();
                      buttonRef1.current.click();
                    }
                  } else {
                    toast.error("ERROR", {
                      description: 
                        <span className="text-red-500">OTP is not valied</span>
                      ,
                      action: {
                        label: "X",
                      },
                    });
                    // return;
                    // alert("OTP is not valied");
                  }
                } catch {
                  // alert("error checking otp on phone number");
                  toast.error("ERROR", {
                    description: 
                      <span className="text-red-500">OTP is not valied</span>
                    ,
                    action: {
                      label: "X",
                    },
                    
                  });
                }
              }}
              className="w-full bg-[#ff385c] hover:bg-[#d90b63] text-white"
            >
              continue
            </Button>
          </DialogContent>
        </Dialog>
      </>

      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full hidden" ref={email_pass_ref}></Button>
        </DialogTrigger>
        <DialogContent className="space-y-6 bg-white">
          <DialogHeader>
          <DialogTitle className="text-center">Enter Passwoard</DialogTitle>
          </DialogHeader>
          
          <Input
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200"
            type="password"
            placeholder="Enter Password"
            value={openPassword}
            onChange={(e) => setOpenPassword(e.target.value)}
          />
          <Button
            className="w-full"
            onClick={async () => {
              // todo: here we login by email and password
              // info: token store here also


              
              try {
                console.log("emailInput", emailInput);
                console.log("password",openPassword );
                const res = await api.post("/api/token/", { email:emailInput, password:openPassword });
                try {
                  const response = await api.get("/api/user/"); // Ensure the leading slash is included
                  toast.success("Welcome back " + response.data.username, {
                    description: <span className="text-green-500">Login success</span>,
                    action: {
                      label: "X",
                    },
                  });
                  
                  
                } catch (error) {
                  console.error("Error fetching user data:", error);
                }
                
                
                
                email_pass_ref.current.click();


                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);

                
                
                navigate("/");
              } catch {
                toast.error("Email or password is incorrect", {
                  description: <span className="text-red-500">Email or password is incorrect</span>,
                  action: {
                    label: "X",
                  },
                });
              }
            }}
          >
            Continue
          </Button>
        </DialogContent>
      </Dialog>

      <FinalSign_Login_Form
        ref={buttonRef2}
        {...{
          [loginMethod === "phone" ? "number" : "email"]:
            loginMethod === "phone" ? numberInput : emailInput,
        }}
      />
    </>
  );
});

export default Sign_Login_Form;
