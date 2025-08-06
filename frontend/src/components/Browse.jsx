import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { setSearchJob } from "@/redux/jobSlice";
import useGetAlljobs from "@/hooks/useGetAlljobs";

function Browse() {
useGetAlljobs()
const dispatch = useDispatch();
  const { searchedjobArray } = useSelector((store) => store.job);
  
  useEffect(()=>{
     return()=>{
        dispatch(setSearchJob(""));
     }
  })
  return (
        <div className="text-white ">
      <Navbar />
      <div className=" max-w-7xl m-auto mt-10 mb-10">
        <h1 className="font-bold text-xl px-5 sm:px-2">
          Search Results: {searchedjobArray.length}
        </h1>
        <div className="grid  px-5 sm:px-2 mt-4 sm:grid-cols-3 gap-4">
          {searchedjobArray.map((job ) => {
            return <Job job={job}  />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Browse;
