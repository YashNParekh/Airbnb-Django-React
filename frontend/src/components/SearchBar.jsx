import { Search } from "lucide-react";
import { useState } from "react";
import { Separator } from "./ui/separator";

export const SearchBar = () => {
  const [state, setState] = useState("Stay");

  return (
    <div className="flex justify-center items-center w-full ">
      <div className="w-fit  border-2 shadow-md p-3 rounded-full ">
        <button className="bg-[#ff385c]  rounded-full ml-2 mr-2 p-2">
          <Search className="h-5 w-5 text-white" />
        </button>
      </div>
    </div>
  );
};

// {
//     <div>
//             <div className="flex w-10  justify-around ">
//               <button
//                 onClick={() => {
//                   setState("Stay");
//                 }}
//               >
//                 <div
//                   className={
//                     state === "Stay" ? "mx-5 text-xl font-bold" : "mx-5 text-xl"
//                   }
//                 >
//                   {" "}
//                   Stay{" "}
//                 </div>
//               </button>
//               <button
//                 onClick={() => {
//                   setState("Experiences");
//                 }}
//               >
//                 <div
//                   className={
//                     state === "Experiences"
//                       ? "mx-5 text-xl font-bold"
//                       : "mx-5 text-xl"
//                   }
//                 >
//                   {" "}
//                   Experiences{" "}
//                 </div>
//               </button>
//             </div>
//           </div>
// }
