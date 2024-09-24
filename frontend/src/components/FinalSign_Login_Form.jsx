import React, { useState, forwardRef, useImperativeHandle, useRef } from 'react';

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



const SignUpForm = forwardRef((props, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const buttonRef = useRef();
  
  useImperativeHandle(ref, () => ({
    click: () => {
      buttonRef.current.click(); // Trigger the button click
    }
  }));
  
  

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const checkPasswordStrength = (password) => {
    // This is a simple check. You might want to implement a more robust solution.
    if (password.length < 8) return "weak";
    if (password.match(/[a-z]/) && password.match(/[A-Z]/) && password.match(/[0-9]/) && password.match(/[^a-zA-Z0-9]/))
      return "strong";
    return "medium";
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
            style={{"display":"none"}}
        
        variant="outline" ref={buttonRef}></Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Finish signing up</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="first-name">Legal name</Label>
            <Input id="first-name" placeholder="First name on ID" />
            <Input id="last-name" placeholder="Last name on ID" />
            <p className="text-sm text-gray-500">
              Make sure this matches the name on your government ID. If you go by another name, you
              can add a preferred first name.
            </p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="dob">Date of birth</Label>
            <Input id="dob" type="date" />
            <p className="text-sm text-gray-500">
              To sign up, you need to be at least 18. Your birthday won't be shared with other people
              who use Airbnb.
            </p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Contact info</Label>
            <Input id="email" type="email" placeholder="Email" defaultValue="ganpatajmera12@gmail.com" />
            <p className="text-sm text-gray-500">
              We'll email you trip confirmations and receipts.
            </p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            <div className="text-sm">
              <p>Password strength: {checkPasswordStrength(password)}</p>
              <ul className="list-disc list-inside">
                <li>Can't contain your name or email address</li>
                <li>At least 8 characters</li>
                <li>Contains a number or symbol</li>
              </ul>
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-500">
          By selecting Agree and continue, I agree to Airbnb's Terms of Service, Payments Terms of
          Service, and Nondiscrimination Policy and acknowledge the Privacy Policy.
        </p>
        <Button className="w-full bg-[#ff385c] hover:bg-[#d90b63] text-white">
          Agree and continue
        </Button>
      </DialogContent>
    </Dialog>
  );
});

export default SignUpForm;