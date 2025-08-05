import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
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
 <div className="text-white w-full max-w-3xl mx-auto p-4 sm:p-20 mb-10">
  <Carousel className="cursor-pointer">
    <CarouselContent>
      {allJobs.map((category, index) => (
        <CarouselItem key={index} className="flex justify-center">
          <div
            className="cursor-pointer"
            onClick={() => submithandler(category?.title)}
          >
            <Card className="w-80 h-72 flex items-center justify-center shadow-lg bg-[#1e1f29] border border-[#3d4046] rounded-xl hover:border-[#8760D4] transition-all duration-200">
              <CardContent className="text-center p-6">
                <span className="text-lg font-semibold text-white">
                  {category?.title}
                </span>
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
      ))}
    </CarouselContent>
    <CarouselPrevious className="hover:scale-125 transition-transform duration-200 absolute left-2 text-[#8760D4] hover:text-[#9d78e9]" />
    <CarouselNext className="hover:scale-125 transition-transform duration-200 absolute right-2 text-[#8760D4] hover:text-[#9d78e9]" />
  </Carousel>
</div>
  );
}

export default CategoryCarousel;
