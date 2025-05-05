import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./job";
import { useDispatch, useSelector } from "react-redux";
import useGetAlljobs from "@/hooks/useGetAlljobs";

function Jobs() {
  const dispatch = useDispatch();
  const { allJobs } = useSelector((store) => store.job);
  const { searchedQuery } = useSelector((store) => store.job);
  const [filterjobs, setFilterJobs] = useState(allJobs);
  useGetAlljobs();
  console.log(allJobs)
  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = allJobs.filter(
        (job) =>
          job?.title?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job?.description
            ?.toLowerCase()
            .includes(searchedQuery.toLowerCase()) ||
          job?.location?.toLowerCase().includes(searchedQuery.toLowerCase())
      );
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery, dispatch]);

  return (
    <div>
      <div>
        <Navbar />
        <div className=" max-w-7xl  mt-5">
          <div className="flex gap-5">
            <div className="ml-10 w-[20%]">
              <FilterCard />
            </div>
            {filterjobs.length <= 0 ? (
              <span className="text-white">No job found !</span>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full px-2">
              {filterjobs.map((job) => (
                <div key={job._id} className="h-full">
                  <Job job={job} />
                </div>
              ))}
            </div>
            
            
            
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Jobs;
