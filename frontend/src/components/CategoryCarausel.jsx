import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card"; // Ensure this is correct
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useDispatch, useSelector } from "react-redux";
import useGetAlljobs from "@/hooks/useGetAlljobs";
import { setSearchJob } from "@/redux/jobSlice";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

function CategoryCarousel() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const { allJobs } = useSelector((store) => store.job);
  const submithandler = (query) => {
    dispatch(setSearchJob(query));
    navigate("/browse");
  };
  useGetAlljobs();
  return (
    <div className="text-white w-full  max-w-3xl mx-auto p-20">
      <Carousel className="cursor-pointer ">
        <CarouselContent className="">
          {allJobs.map((category, index) => (
            <CarouselItem key={index} className="flex justify-center">
              <div
                className="cursor-pointer "
                onClick={() => submithandler(category?.title)}
              >
                <Card className="w-80 h-72  bg-[#12182577] flex items-center justify-center shadow-2xl  border-[#2b324a]   text-white">
                  <CardContent className="text-center p-4">
                    <span className="text-lg font-semibold">
                      {category?.title}
                    </span>
                  </CardContent>
                </Card>{" "}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hover:scale-125 transition-transform duration-200 absolute left-2" />
        <CarouselNext className="hover:scale-125 transition-transform duration-200 absolute right-2" />
      </Carousel>
    </div>
  );
}

export default CategoryCarousel;
