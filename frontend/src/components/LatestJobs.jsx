import React from "react";
import LatestJobCard from "./LatestJobCard";
import { useSelector } from "react-redux";


function LatestJobs() {
  const {allJobs} = useSelector((store)=>store.job)
  return (
   <div className="text-white max-w-7xl   px-5 sm:px-24 mb-23">
      <h1 className="text-3xl sm:text-4xl font-bold ">
        <span className="text-[#7653c8]">Latest & Top </span>Jobs Openings
      </h1>
      <div className="my-5 grid sm:grid-cols-3 gap-6">
        {allJobs.length <= 0 ? <span>No jobs found</span> : allJobs.slice(0, 6).map((job) => (
          <LatestJobCard key={job._id}  job={job}/>
        ))}
      </div>
    </div>
  );
}

export default LatestJobs;
