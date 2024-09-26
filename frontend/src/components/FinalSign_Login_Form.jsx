import { toast } from "sonner";
import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Eye, EyeOff } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

const SignUpForm = forwardRef((props, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [otpValues, setOtpValues] = useState("");

  const navigate = useNavigate();

  const buttonRef = useRef();
  const buttonRef1 = useRef();

  useImperativeHandle(ref, () => ({
    click: () => {
      console.log(props);
      setErrors({});
      setEmail("");
      setUsername("");
      setPassword("");
      setOtpValues("");
      buttonRef.current.click();
    },
  }));

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasNonAlphas = /\W/.test(password);
    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumbers &&
      hasNonAlphas
    );
  };

  const finalSubmit = async () => {
    try {
      const response = await api.post("/api/create-user/", {
        email: props.email ? props.email : email,
        username: username,
        password: password,
        is_email_verified: true,
        phone_number: props.phone_number ? props.phone_number : null,
        is_phone_verified: props.phone_number ? true : false,
      });

      console.log(response.data);
      if (response.data.status === 201) {
        alert("Signup successful");
        console.log("Signup successful");
        // Handle successful signup (e.g., show a success message, redirect)
        return res.data        
      } else {
        console.error("Signup failed");
        // Handle errors (e.g., show error message)
      }
    } catch (error) {
      console.error("Error during signup:", error);
      // Handle network errors
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};


      try{

        const res = await api.post("/api/verify-existing/", {
          email: email,
        });
        if (res.data.message === "exists") {
          newErrors.email = "email is already registered";
        }
      }catch{

      }

    if (!validateEmail(email) && !props.email) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!validatePassword(password)) {
      newErrors.password =
        "Password must be at least 8 characters long and contain uppercase, lowercase, number, and special character.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    await api
      .post("/api/send-email/", { email: props.email ? props.email : email })
      .catch((error) => {
        console.log(error);
      });

    buttonRef1.current.click();
    buttonRef.current.click();
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            style={{ display: "none" }}
            variant="outline"
            ref={buttonRef}
          ></Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px] bg-white">
          <DialogHeader>
            <DialogTitle>Sign Up</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                disabled={props.email ? true : false}
                id="email"
                type="email"
                placeholder="Enter your email"
                value={props.email ? props.email : email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors({});
                }}
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                placeholder="Enter your username"
                onChange={(e) => {
                  setUsername(e.target.value);
                  setErrors({});
                }}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors({});
                  }}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full bg-[#ff385c] hover:bg-[#d90b63] text-white"
            >
              Sign Up
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      {/* 
    
    // info: here we check otp after giving all details correctly  

    */}

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

            <div className="space-y-2">
              <InputOTP
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
                  const res = await api.post("/api/verify-email/", {
                    otp: otpValues,
                    email: props.email ? props.email : email,
                  });

                  if (res.status === 200) {
                    // todo: here the final usbmit happen
                    // info: here store the token

                    buttonRef1.current.click();
                    var data = finalSubmit();
                    
                    
                    console.log(data)
                    
                    localStorage.setItem(ACCESS_TOKEN, data.access);
                    localStorage.setItem(REFRESH_TOKEN, data.refresh);

                    toast("Login success", {
                      description: (
                        <span className="text-green-500">"Login success"</span>
                      ),
                      action: {
                        label: "X",
                      },
                    });
                    navigate("/");
                  } else {
                    alert("OTP is not valied");
                    return;
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
    </>
  );
});

export default SignUpForm;
