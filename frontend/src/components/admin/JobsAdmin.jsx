import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AdminJobsTable from "./AdminJobsTable";
import { setSearchJobByText } from "@/redux/jobSlice";
import { BellIcon, EditIcon, PiIcon } from "lucide-react";

function JobsAdmin() {
  const navigate = useNavigate();
  const [input, setinput] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSearchJobByText(input));
  });
  return (
     <div className="text-white overflow-hidden">
      <Navbar />
      <div className="max-w-6xl px-5 mx-auto my-10 ">
        <div className="flex gap-5 items-center justify-between">
          <Input
            className="w-full max-w-sm border-[#2b384a]"
            placeholder="Filter by name"
            onChange={(e) => setinput(e.target.value)}
          />

          <Button
            onClick={() => navigate("/admin/companies/createjobs")}
            className="border border-[#222f3e] hover:bg-[#1F2937] hover:border-[#1F2937] transition  cursor-pointer duration-200"
          >
            <EditIcon className="mr-2" />
            New Jobs
          </Button>
        </div>

        <AdminJobsTable />
      </div>
    </div>
  );
}

export default JobsAdmin;
