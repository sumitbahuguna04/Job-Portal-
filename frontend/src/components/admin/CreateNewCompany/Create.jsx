import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { setSingleCompany } from "@/redux/companySlice";
import { COMPANY_REGISTER_API_END_POINT } from "@/utils/constant";
import { Label } from "@radix-ui/react-label";
import axios from "axios";
import { ArrowBigLeft, ArrowLeft, ArrowLeftCircle } from "lucide-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function Create() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [companyName, setCompanyName] = useState();
  const registerNewCompany = async () => {
    try {
      const res = await axios.post(
        `${COMPANY_REGISTER_API_END_POINT}/register`,
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        const companyId = res?.data?.company?._id;
        navigate(`/admin/comapnies/${companyId}`);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="text-white">
      <Navbar />

      <div className="max-w-4xl mx-auto">
        <div className="my-10">
          <h1 className="font-bold text-2xl">Your Company Name</h1>
          <p className="text-gray-500">
            What would you like to give your company name? you can change this
            later.
          </p>
        </div>
        <Label>Company Name</Label>
        <Input
          onChange={(e) => setCompanyName(e.target.value)}
          type={"text"}
          className={`my-2`}
          placeholder="JobHunt, microsoft etc."
        />
        <div className="flex items-center gap-2 my-10 ">
          <Button
            onClick={() => navigate("/admin/companies")}
            className=" hover:bg-[#2b313d]   hover:border-gray-500 cursor-pointer"
          >
           <ArrowLeft/>
            Cancel
          </Button>
          <Button
            onClick={registerNewCompany}
            className="border bg-[#2ba429] border-gray-300  cursor-pointer"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Create;
