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
      <div className=" max-w-2xl mb-10 sm:mb-0  mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-4 p-4 sm:p-8">
          <Button
            onClick={() => navigate("/admin/companies")}
            className="text-gray-500 cursor-pointer hover:bg-[#2b313d] hover:text-gray-200"
          >
            <ArrowLeft />
            <span className="ml-2">Back</span>
          </Button>
          <h1 className="text-lg sm:text-xl pl-[5%] font-semibold">
            Company Setup
          </h1>
        </div>

        <div className="bg-[#030712] border border-[#2b384a]  p-4 sm:p-8  rounded-md ">
          <form onSubmit={submitHandler}>
            <div className="grid gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
                <Label className="text-left sm:text-right">Company Name</Label>
                <Input
                  name="name"
                  value={input.name}
                  onChange={changeEventHandler}
                  className="sm:col-span-3 w-full border-[#2b384a]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
                <Label className="text-left sm:text-right">Description</Label>
                <Input
                  name="description"
                  value={input.description}
                  onChange={changeEventHandler}
                  placeholder="Enter your description"
                  className="sm:col-span-3 w-full border-[#2b384a]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
                <Label className="text-left sm:text-right">Website</Label>
                <Input
                  name="website"
                  value={input.website}
                  onChange={changeEventHandler}
                  placeholder="Enter your website"
                  className="sm:col-span-3 w-full border-[#2b384a]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
                <Label className="text-left sm:text-right">Location</Label>
                <Input
                  name="location"
                  onChange={changeEventHandler}
                  value={input.location}
                  placeholder="Enter your location"
                  className="sm:col-span-3 w-full border-[#2b384a]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
                <Label className="text-left sm:text-right" htmlFor="file">
                  Logo
                </Label>
                <Input
                  type="file"
                  onChange={changeFileHandler}
                  accept="image/*"
                  className="sm:col-span-3 w-full border-[#2b384a] cursor-pointer"
                />
              </div>
            </div>

            <DialogFooter className="mt-6">
              {loading ? (
                <Button className="w-full text-black bg-[#ffffffce] ">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="bg-[#6225C5] hover:bg-[#6225c5d4] w-full cursor-pointer"
                >
                 Save
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
