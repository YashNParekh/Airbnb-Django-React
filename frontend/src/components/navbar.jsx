import airbnb from "../assets/airbnb.png";
import { Search, Globe, Menu, User } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Sign_Login_Form from "./Sign_Login_Form";

import { toast } from "sonner";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "./SearchBar";
import { HiOutlineChatBubbleBottomCenterText } from "react-icons/hi2";
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
      <>
        <MenubarItem>
          <button
            onClick={() => {
              navigate("/profile");
            }}
          >
            Profile
          </button>
        </MenubarItem>
        <MenubarItem>
          <div>
            <Link to={"/hotels"}>MyHome</Link>
          </div>
        </MenubarItem>
      </>
    );
  };

  return (
    <div className="flex h-fit flex-col justify-center bg-black">
      <div>
        {
          //info: left pannel
        }

        <div className="group flex flex-row justify-between m-6 px-6">
          <Link to={"/"}>
            <div className=" w-[35px] h-[35px] flex flex-row items-center">
              <img
                height={"10px"}
                widht={"10px"}
                className="float-left  brightness-75 group-hover:brightness-100 group-hover:transition group-hover:duration-200"
                src={airbnb}
                alt="logo"
              />
              <span className="font-bold p-2 text-white text-xl brightness-75 group-hover:brightness-100 group-hover:transition group-hover:duration-200">
                airbnb
              </span>
            </div>
          </Link>
          {
            //info: search
          }

          <SearchBar />

          {
            //info: right panel
          }

          <div>
            <div className="flex items-center gap-2">
              <button className="bg-gray-200 truncate whitespace-nowrap font-medium px-4 py-2 rounded-full hover:bg-gray-100 text-lg">
                Airbnb your home
              </button>
              <button className="p-2 rounded-full bg-gray-50 hover:bg-white">
                

                <a href="http://localhost:8501" target="_blank" rel="noopener noreferrer" >
                <HiOutlineChatBubbleBottomCenterText />
                
                </a>

              </button>
              <div className="ml-4 flex items-center border bg-white border-gray-300 rounded-full p-2">
                <Menubar>
                  <MenubarMenu>
                    <MenubarTrigger>
                      <Menu className="h-5 w-5 mr-2 bg-white" />
                      <User className="h-8 w-8 bg-gray-500  rounded-full  text-white p-1" />
                    </MenubarTrigger>
                    <MenubarContent className="bg-white border rounded-sm">
                      {/* 
                        // info: this is for sign up and login button this only turn if the user is not logged in
                        */}
                      {!localStorage.getItem(ACCESS_TOKEN) ? (
                        <Log_sign />
                      ) : (
                        <Log_sign2 />
                      )}

                      {/* ---- */}
                      <MenubarSeparator className="border" />
                      {/* ---- */}
                      <MenubarItem>Airbnb your home</MenubarItem>
                      <MenubarItem>Host an experience </MenubarItem>
                      <MenubarItem>Help Center</MenubarItem>
                      {localStorage.getItem(ACCESS_TOKEN) && (
                        <MenubarItem
                          onClick={() => {
                            localStorage.removeItem(ACCESS_TOKEN);
                            localStorage.removeItem(REFRESH_TOKEN);
                            navigate("/");
                          }}
                        >
                          Logout
                        </MenubarItem>
                      )}
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

      <Sign_Login_Form ref={signUpButtonRef} />
    </div>
  );
}
