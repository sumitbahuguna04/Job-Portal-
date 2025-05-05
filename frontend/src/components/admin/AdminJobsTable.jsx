import React, { useEffect, useState } from "react";
import {
  Table,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from "../ui/table";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";

function AdminJobsTable() {
  useGetAllAdminJobs();

  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);

  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(searchJobByText);
    const filteredJobs = allAdminJobs.filter((job) => {
      if (!searchJobByText) {
        return true;
      }

      return (
        job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase())
      );
    });
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  return (
    <div className="overflow-x-auto my-10">
      <div className="rounded-2xl p-5 bg-[#030712] border border-[#2b384a] ">
        <Table className="min-w-[700px] ">
          <TableCaption className={"text-gray-400"}>
            A list of your recently posted jobs
          </TableCaption>
          <TableHeader>
            <TableRow className="text-gray-400">
              <TableHead className="">Job Role</TableHead>
              <TableHead>Job Description</TableHead>
              <TableHead>Applied Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="">
            {filterJobs && filterJobs.length > 0 ? (
              filterJobs.map((job) => (
                <TableRow className="" key={job._id}>
                  <TableCell>{job?.title}</TableCell>
                  <TableCell>{job?.description}</TableCell>
                  <TableCell>
                    {new Date(job?.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right cursor-pointer">
                    <Popover>
                      <PopoverTrigger>
                        <MoreHorizontal className="cursor-pointer" />
                      </PopoverTrigger>
                      <PopoverContent className="flex flex-col   bg-[#282a30]  border  border-[#42454b] rounded-md">
                        <Button
                          onClick={() =>
                            navigate(`/admin/companies/updatejobs/${job._id}`)
                          }
                          className="flex items-center  hover:underline cursor-pointer gap-2 w-fit pl-3 pt-2"
                        >
                          <Edit2 className="w-4" />
                          <span>Edit</span>
                        </Button>
                        <Button
                          className=" cursor-pointer hover:underline "
                          onClick={() => {
                            navigate(`/admin/jobs/${job._id}/applicants`);
                          }}
                        >
                          <Eye />
                          <span>Applicants</span>
                        </Button>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow className="">
                <TableCell colSpan={4} className="text-center">
                  No Jobs found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default AdminJobsTable;
