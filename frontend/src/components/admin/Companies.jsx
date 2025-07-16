import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchbycompany } from "@/redux/companySlice";
import { ComputerIcon } from "lucide-react";

function Companies() {
  const navigate = useNavigate();
  const [input, setinput] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSearchbycompany(input));
  });
  return (
  import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchbycompany } from "@/redux/companySlice";
import { ComputerIcon } from "lucide-react";

function Companies() {
  const navigate = useNavigate();
  const [input, setinput] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSearchbycompany(input));
  });
  return (
     <div className="text-white  overflow-hidden">
      <Navbar />
      <div className="max-w-6xl p-5   md:p-5  lg:p-0 mx-auto my-5 sm:mt-10 ">
        <div className="flex gap-3 items-center justify-between">
          <Input
            className="w-full max-w-sm border-[#42608a]"
            placeholder="Filter by name"
            onChange={(e) => setinput(e.target.value)}
          />

          <Button
            onClick={() => navigate("/admin/companies/create")}
            className="border border-[#222f3e] hover:bg-[#1F2937] hover:border-[#1F2937] text-white transition  cursor-pointer duration-200">
            Create New Company
          </Button>
        </div>
        <div>
          <CompaniesTable />
        </div>
      </div>
    </div>
  );
}

export default Companies;

  );
}

export default Companies;
