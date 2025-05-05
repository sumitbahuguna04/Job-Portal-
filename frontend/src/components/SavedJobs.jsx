import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSelector } from "react-redux";
import { Button } from "./ui/button";
import useGetAllSavedJob from "@/hooks/useGetAllSavedJob";
import { useNavigate } from "react-router-dom";

function SavedJobs() {
  const navigate = useNavigate();

  useGetAllSavedJob();
  const { allJobs, savedJobsArray } = useSelector((store) => store.job);

  const savedJobDetails = savedJobsArray.length
    ? savedJobsArray
    : allJobs.filter((job) => savedJobsArray.includes(job._id));

  return (
    <div className="text-white">
    <div className="m-2">
      <Table>
        <TableCaption className="text-gray-400">
          A list of your saved jobs.
        </TableCaption>
        <TableHeader>
          <TableRow className="text-gray-400">
            <TableHead>Job Title</TableHead>
            <TableHead>Company Name</TableHead>
            <TableHead>Job Location</TableHead>
            <TableHead>Salary</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {savedJobDetails.length > 0 ? (
            savedJobDetails.map((job) => (
              <TableRow key={job._id}>
                <TableCell>{job.title}</TableCell>
                <TableCell>{job.company?.name}</TableCell>
                <TableCell>{job.location}</TableCell>
                <TableCell>{job.salary} LPA</TableCell>
                <TableCell className="text-center">
                  <Button 
                    onClick={() => navigate(`/description/${job._id}`)}
                    className=" border border-[#222f3e] hover:bg-[#1F2937] hover:border-[#1F2937] text-white  shadow-x shadow-[#1b1c20cf]  transition rounded-xl cursor-pointer duration-200">
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                No saved jobs found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  </div>
  
  );
}

export default SavedJobs;
