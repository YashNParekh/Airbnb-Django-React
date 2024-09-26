import airbnb from "../assets/airbnb.png";
import { Search, Globe, Menu, User } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Separator } from "./ui/separator";
import Sign_Login_Form from "./Sign_Login_Form";

import { toast } from "sonner";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { useNavigate } from "react-router-dom";


import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";

export default function Navbar() {
  const [state, setState] = useState("Stay");
  const navigate = useNavigate();
  

  const signUpButtonRef = useRef();

  const Log_sign = () => {
    return (
      <>
        <MenubarItem>
          <button
            onClick={() => {
              signUpButtonRef.current.click();
            }}
          >
            Sign Up
          </button>
        </MenubarItem>
        
        <MenubarItem>
          <button
            onClick={() => {
              signUpButtonRef.current.click();
            }}
          >
            Login
          </button>
        </MenubarItem>
      </>
    );
  };

  const Log_sign2 = () => {
    return (
      
      <MenubarItem>
        <button
          onClick={() => {
            navigate('/profile')
          }}
        >
          Profile
        </button>
      </MenubarItem>

    )
  }




  return (
    <div className="flex flex-col justify-center">
      <div>
        {
          //info: left pannel
        }

        <div className="flex flex-row justify-between m-6 px-6">
          <Link to={"/"}>
            <div className=" w-[35px] h-[35px] flex flex-row items-center">
              <img
                height={"10px"}
                widht={"10px"}
                className="float-left "
                src={airbnb}
                alt="logo"
              />
              <span className="font-bold p-2 text-xl">airbnb</span>
            </div>
          </Link>

          {
            //info: search
          }

          <div>
            <div className="flex w-10  justify-around ">
              <button
                onClick={() => {
                  setState("Stay");
                }}
              >
                <div
                  className={
                    state === "Stay" ? "mx-5 text-xl font-bold" : "mx-5 text-xl"
                  }
                >
                  {" "}
                  Stay{" "}
                </div>
              </button>
              <button
                onClick={() => {
                  setState("Experiences");
                }}
              >
                <div
                  className={
                    state === "Experiences"
                      ? "mx-5 text-xl font-bold"
                      : "mx-5 text-xl"
                  }
                >
                  {" "}
                  Experiences{" "}
                </div>
              </button>
            </div>
          </div>

          {
            //info: right panel
          }

          <div>
            <div className="flex items-center">
              <button className=" font-medium px-4 py-2 rounded-full hover:bg-gray-100 text-lg">
                Airbnb your home
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Globe className="h-6 w-6" />
              </button>
              <div className="ml-4 flex items-center border border-gray-300 rounded-full p-2">
                {
                  // info:
                  // <Menu className="h-5 w-5 mr-2" />
                  // <User className="h-8 w-8 bg-gray-500 rounded-full text-white p-1" />
                }

                <Menubar>
                  <MenubarMenu>
                    <MenubarTrigger>
                      <Menu className="h-5 w-5 mr-2 " />
                      <User className="h-8 w-8 bg-gray-500 rounded-full text-white p-1" />
                    </MenubarTrigger>
                    <MenubarContent className="bg-white border rounded-sm">
                        {/* 
                        // info: this is for sign up and login button this only turn if the user is not logged in
                        */}
                      {!localStorage.getItem(ACCESS_TOKEN) ? <Log_sign /> : <Log_sign2 />}
                        

                      {/* ---- */}
                      <MenubarSeparator className="border" />
                      {/* ---- */}
                      <MenubarItem>Airbnb your home</MenubarItem>
                      <MenubarItem>Host an experience </MenubarItem>
                      <MenubarItem>Help Center</MenubarItem>
                      {
                        localStorage.getItem(ACCESS_TOKEN) && (
                          <MenubarItem
                            onClick={() => {
                              localStorage.removeItem(ACCESS_TOKEN);
                              localStorage.removeItem(REFRESH_TOKEN);
                              navigate("/");
                            }}
                            
                          >
                            Logout
                          </MenubarItem>
                        )
                      }
                      
                      
                    </MenubarContent>
                  </MenubarMenu>
                </Menubar>

                {
                  // info:
                }
              </div>
            </div>
          </div>
        </div>
      </div>

      

      <div className="flex justify-center items-center w-full ">
        <div className="w-fit  border-2 shadow-md p-3 rounded-full ">
          <button className="bg-[#ff385c]  rounded-full ml-2 mr-2 p-4">
            
            
            <Search className="h-5 w-5 text-white" />
            
            
            
          </button>
        </div>
      </div>

      <Sign_Login_Form ref={signUpButtonRef} />
    </div>
  );
}
