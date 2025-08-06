import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2, TrainFrontTunnel } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { DialogFooter } from "../ui/dialog";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { JOB_API_END_POINT } from "@/utils/constant";

function AdminCreateJob() {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: "",
    companyId: "",
  });
  const { companies } = useSelector((store) => store.company);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );
    setInput({ ...input, companyId: selectedCompany._id });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies/createjobs");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
     <div className="min-h-screen text-white">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="flex items-center mb-6 gap-4">
          <Button
            onClick={() => navigate("/admin/comapnies/jobs")}
            className={`rounded-md    hover:bg-[#343639fd] border-gray-500  cursor-pointer `}
            variant="ghost"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="ml-2">Back</span>
          </Button>
          <h1 className="text-2xl  font-bold">Create New Job</h1>
        </div>

        <div className="p-6 rounded-xl bg-[#282A36] border border-[#31353b] shadow-lg">
          <form onSubmit={submitHandler}>
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                <Label className="text-left  sm:text-right">Job Title</Label>
                <Input
                  name="title"
                  value={input.title}
                  onChange={changeEventHandler}
                  placeholder="Enter job title"
                  className="sm:col-span-3 bg-[#2f303a] border border-[#3c3d47]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                <Label className="text-left sm:text-right">Description</Label>
                <Input
                  name="description"
                  value={input.description}
                  onChange={changeEventHandler}
                  placeholder="Enter job description"
                  className="sm:col-span-3 bg-[#2f303a] border border-[#3c3d47]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                <Label className="text-left sm:text-right">Requirements</Label>
                <Input
                  name="requirements"
                  type="text"
                  value={input.requirements}
                  onChange={changeEventHandler}
                  placeholder="Enter job requirements"
                  className="sm:col-span-3 bg-[#2f303a] border border-[#3c3d47]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                <Label className="text-left sm:text-right">Salary</Label>
                <Input
                  name="salary"
                  type="number"
                  value={input.salary}
                  onChange={changeEventHandler}
                  placeholder="e.g. 3 Lpa "
                  className="sm:col-span-3 bg-[#2f303a] border border-[#3c3d47]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                <Label className="text-left sm:text-right">Location</Label>
                <Input
                  name="location"
                  value={input.location}
                  onChange={changeEventHandler}
                  placeholder="e.g. Bengaluru"
                  className="sm:col-span-3 bg-[#2f303a] border border-[#3c3d47]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                <Label className="text-left sm:text-right">Job Type</Label>
                <Input
                  name="jobType"
                  value={input.jobType}
                  onChange={changeEventHandler}
                  placeholder="e.g. Full-time"
                  className="sm:col-span-3 bg-[#2f303a] border border-[#3c3d47]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                <Label className="text-left sm:text-right">
                  Experience Level
                </Label>
                <Input
                  name="experience"
                  type="number"
                  value={input.experience}
                  onChange={changeEventHandler}
                  placeholder="e.g. 2-3 years"
                  className="sm:col-span-3 bg-[#2f303a] border border-[#3c3d47]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                <Label className="text-left sm:text-right">
                  No. of Positions
                </Label>
                <Input
                  name="position"
                  type="number"
                  value={input.position}
                  onChange={changeEventHandler}
                  placeholder="e.g. 2"
                  className="sm:col-span-3 bg-[#2f303a] border border-[#3c3d47]"
                />
              </div>

              {companies.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4 ">
                  <Label className=" text-left sm:text-right">Company</Label>
                  <Select onValueChange={selectChangeHandler}>
                    <SelectTrigger className="sm:col-span-3   w-[180px] bg-[#2f303a] border border-[#3c3d47]">
                      <SelectValue placeholder="Select a Company" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#2f303a]   text-white border border-[#494a53]">
                      <SelectGroup className="">
                        {companies.map((company) => (
                          <SelectItem
                            className="hover:bg-[#3a3b46]  cursor-pointer"
                            key={company._id}
                            value={company.name.toLowerCase()}
                          >
                            {company.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            <DialogFooter className="mt-8">
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
                  Post Job
                </Button>
              )}
            </DialogFooter>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminCreateJob;
