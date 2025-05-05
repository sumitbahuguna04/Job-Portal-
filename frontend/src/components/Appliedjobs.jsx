import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";

function Appliedjobs() {
  const capitalizeFirst = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const { allAppliedJobs } = useSelector((store) => store.job);
  return (
    <div className="mt-5 ">
      <div className="m-5">
        <Table className="">
          <TableCaption className="text-gray-400">
            Your Applied Jobs
          </TableCaption>
          <TableHeader className=" ">
            <TableRow className="text-gray-400">
              <TableHead className="">Date</TableHead>
              <TableHead>Job Role</TableHead>
              <TableHead>Company</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allAppliedJobs.map((val) => (
              <TableRow className=" hover:bg-[#1F2937]" key={val._id}>
                <TableCell>
                  {" "}
                  {new Date(val?.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>{val?.job?.title}</TableCell>
                <TableCell>{val?.job?.company?.name}</TableCell>
                <TableCell className="text-right">
                  <Badge
                    className={`w-17  ${
                      val?.status === "accepted"
                        ? "text-[#0de085] bg-[#0d391ba1]"
                        : "text-[#f22828] bg-[#39190da1]"
                    } ${
                      val?.status === "pending"
                        ? "text-gray-400 bg-[#1e2637]"
                        : ""
                    }`}
                  >
                    {capitalizeFirst(val?.status)}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default Appliedjobs;
