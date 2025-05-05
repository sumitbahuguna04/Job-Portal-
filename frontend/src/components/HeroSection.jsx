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
    <div className="text-center #262C36">
      <div className="flex text-white flex-col gap-5 my-10">
        <span className="bg-[#1e222ff1] mx-auto px-4 py-2 rounded-full  text-[#8980f0] ">
          The best way to shape your career
        </span>
        <h1 className="text-5xl font-bold">
          {" "}
          Your Dream job
          <br /> Starts <span className="text-[#655ef2]">Here</span>
        </h1>
        <p className="p-3">
          Discover thousands of opportunities tailored to your skills and
          interests. Whether you're starting fresh or taking the next step, find
          the job that aligns with your goals and passion. Let's build your
          future—one application at a time.
        </p>
        <div className="flex justify-center">
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
            className="border-[#3d4046]"
              onChange={(e) => setquery(e.target.value)}
              type="text"
              placeholder="Find your dream jobs"
            />
            <Button className=" hover:bg-[#6c28d9e1] bg-[#6D28D9] " onClick={submitHandler} type="text">
              <Search />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
