import { Search } from "lucide-react";
import { useState } from "react";
import { Separator } from "./ui/separator";

export const SearchBar = () => {
  const [state, setState] = useState("Stay");

  return (
    <div className="flex justify-center items-center w-full ">
      <div className="ml-40  w-[40%] flex flex-row text-gray-500 justify-between items-center  border-2 shadow-md p-3 rounded-full ">
        
      <div>
            <div className="flex w-10  justify-around ">
              <button
                onClick={() => {
                  setState("Stay");
                }}
              >
                <div
                  className={
                    state === "Stay" ? "mx-5 text-xl text-white" : "mx-5 text-xl"
                  }
                >
                  {" "}
                  Stay{" "}
                </div>
              </button>

              <Separator
                orientation="vertical"
                className="bg-gray-500 h-6 mx-2"
              />

              <button
                onClick={() => {
                  setState("Experiences");
                }}
              >
                <div
                  className={
                    state === "Experiences"
                      ? "mx-5 text-xl text-white"
                      : "mx-5 text-xl "
                  }
                >
                  {" "}
                  Experiences{" "}
                </div>
              </button>
            
            </div>

          </div>
          


          <button className="flex flex-row items-center justify-between  border-2 border-gray-500 rounded-full ml-2 mr-2 p-2 px-4">
                <div className="text-white mx-3">Search</div>
        <div className="bg-[#ff385c] flex flex-row items-center justify-between  border border-gray-500 rounded-full  p-2">
          <Search className="h-5 w-5 text-white" />
        </div>
          </button>
      </div>
    </div>
  );
};

