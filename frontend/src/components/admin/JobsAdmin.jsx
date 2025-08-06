import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AdminJobsTable from "./AdminJobsTable";
import { setSearchJobByText } from "@/redux/jobSlice";
import { PenBoxIcon } from "lucide-react";


function JobsAdmin() {
  const navigate = useNavigate();
  const [input, setinput] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSearchJobByText(input));
  });
  return (
    <div className="text-white">
      <Navbar />
      <div className="max-w-6xl p-5 lg:p-0 mx-auto my-6 sm:mt-10 space-y-6">
       
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <PenBoxIcon className="h-6 w-6 text-[#8760D4]" />
            Manage Jobs
          </h1>
          <Button
            onClick={() => navigate("/admin/companies/createjobs")}
            className="bg-[#8760D4] hover:bg-[#926ae1] text-white transition duration-200 rounded-md"
          >
            Create New Job
          </Button>
        </div>


        <div className="flex items-center gap-3">
          <Input
            className="w-full max-w-sm bg-[#1f202c] border border-[#3d4046] placeholder:text-gray-400"
            placeholder="Search jobs by title"
            onChange={(e) => setinput(e.target.value)}
            value={input}
          />
        </div>

        
        <AdminJobsTable />
      </div>
    </div>
  );
}

export default JobsAdmin;
