import React, { use, useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { DialogFooter } from "../ui/dialog";
import { COMPANY_REGISTER_API_END_POINT } from "@/utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetCompanyByid from "@/hooks/useGetCompanyByid";

function CompanySetup() {
  const params = useParams();
  useGetCompanyByid(params.id);
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });
  const { singleCompany } = useSelector((store) => store.company);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      setLoading(true);
      const res = await axios.put(
        `${COMPANY_REGISTER_API_END_POINT}/update/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInput({
      name: singleCompany.name || "",
      description: singleCompany.description || "",
      website: singleCompany.website || "",
      location: singleCompany.location || "",
      file: singleCompany.file || null,
    });
  }, [singleCompany]);

  return (
     <div className="text-white">
      <Navbar />
      <div className="max-w-3xl mx-auto my-8 px-5">
       
        <div className="flex items-center gap-4 mb-6">
          <Button
            onClick={() => navigate("/admin/companies")}
            className="bg-[#1f202c] hover:bg-[#2b2d3a] text-gray-300"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">Edit Company</h1>
        </div>


        <div className="bg-[#282A36] border border-[#31353b]  rounded-xl p-6 shadow-lg">
          <form onSubmit={submitHandler} className="space-y-5">
            {[
              { label: "Company Name", name: "name" },
              { label: "Description", name: "description", placeholder: "Enter company description" },
              { label: "Website", name: "website", placeholder: "Enter company website" },
              { label: "Location", name: "location", placeholder: "Enter company location" },
            ].map((field, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4"
              >
                <Label className="text-left ">{field.label}</Label>
                <Input
                  name={field.name}
                  value={input[field.name]}
                  onChange={changeEventHandler}
                  placeholder={field.placeholder || ""}
                  className="sm:col-span-3 bg-[#2f303a] border border-[#3c3d47] text-white placeholder:text-gray-400"
                />
              </div>
            ))}


            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
              <Label className="text-left ">Logo</Label>
              <Input
                type="file"
                onChange={changeFileHandler}
                accept="image/*"
                className="sm:col-span-3 bg-[#2f303a] border border-[#3c3d47] text-white cursor-pointer"
              />
            </div>

            <DialogFooter className="pt-4">
              {loading ? (
                <Button className="w-full bg-[#8760D4] text-white">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full bg-[#8760D4] hover:bg-[#926ae1] text-white"
                >
                  Save Changes
                </Button>
              )}
            </DialogFooter>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CompanySetup;
