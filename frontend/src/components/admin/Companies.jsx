import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchbycompany } from "@/redux/companySlice";
import { ComputerIcon } from "lucide-react";
import { Building2 } from "lucide-react";

function Companies() {
  const navigate = useNavigate();
  const [input, setinput] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchbycompany(input));
  }, [input, dispatch]);

  return (
     <div className="text-white">
      <Navbar />
      <div className="max-w-6xl p-5 lg:p-0 mx-auto my-6 sm:mt-10 space-y-6">
   
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Building2 className="h-6 w-6 text-[#8760D4]" />
            Manage Companies
          </h1>
          <Button
            onClick={() => navigate("/admin/companies/create")}
            className="bg-[#8760D4] hover:bg-[#926ae1] text-white transition duration-200 rounded-md"
          >
            Create New Company
          </Button>
        </div>
        <div className="flex items-center gap-3">
          <Input
            className="w-full max-w-sm bg-[#1f202c] border border-[#3d4046] placeholder:text-gray-400"
            placeholder="Search companies by name"
            onChange={(e) => setinput(e.target.value)}
            value={input}
          />
        </div>
          <CompaniesTable />
       
      </div>
    </div>
  );
}

export default Companies;
