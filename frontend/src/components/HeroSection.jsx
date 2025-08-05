import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { setSearchJob } from "@/redux/jobSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function HeroSection() {
  const [query, setquery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitHandler = () => {
    dispatch(setSearchJob(query));
    if (query) {
      navigate("/browse");
    } else toast.error("Something is missing");
  };
  return (
   <div className=" text-white py-16 px-4">
      <div className="max-w-4xl mx-auto text-center flex flex-col gap-6">
     
        <span className="bg-[#342a48cf] text-[#8760D4] px-4 py-2 rounded-full text-sm w-fit mx-auto font-medium shadow-md">
          The best way to shape your career
        </span>

  
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
          Your Dream Job <br />
          Starts <span className="text-[#8760D4]">Here</span>
        </h1>

        <p className="text-gray-300 text-sm sm:text-base px-2 sm:px-10">
          Discover thousands of opportunities tailored to your skills and interests.
          Whether you're starting fresh or taking the next step, find the job
          that aligns with your goals and passion. Let’s build your future—one
          application at a time.
        </p>


        <div className="flex justify-center mt-4">
          <div className="flex w-full max-w-md items-center gap-2 bg-[#1e1f29] border border-[#3d4046] rounded-md px-3 py-2 shadow-sm">
            <Input
              onChange={(e) => setquery(e.target.value)}
              value={query}
              className="bg-transparent border-none focus:outline-none text-white placeholder:text-gray-400"
              type="text"
              placeholder="Find your dream jobs"
            />
            <Button
              onClick={submitHandler}
              type="button"
              className="bg-[#8760D4] hover:bg-[#926ae1] text-black font-semibold"
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
