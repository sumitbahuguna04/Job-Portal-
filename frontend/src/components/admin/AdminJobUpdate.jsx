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
import { JOB_API_END_POINT } from "@/utils/constant";

import useGetJobById from "@/hooks/useGetJobById";

function AdminJobUpdate() {
  const params = useParams();

  useGetJobById(params.id);
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: "",
  });
  const { singleJob } = useSelector((store) => store.job);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.put(
        `${JOB_API_END_POINT}/update/${params.id}`,
        {
          title: input.title,
          description: input.description,
          requirements: input.requirements, // make sure this is a string or an array
          salary: input.salary,
          location: input.location,
          jobType: input.jobType,
          experience: input.experience,
          position: input.position,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/comapnies/jobs");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInput({
      title: singleJob.title || "",
      description: singleJob.description || "",
      requirements: singleJob.requirements || "",
      salary: singleJob.salary || "",
      location: singleJob.location || "",
      jobType: singleJob.jobType || "",
      experience: singleJob.experienceLevel || 0,
      position: singleJob.position || "",
      companyId: singleJob.company?._id || "",
    });
  }, [singleJob]);

  return (
    <div className="min-h-screen text-white">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="flex items-center mb-6 gap-4">
          <Button
            onClick={() => navigate("/admin/comapnies/jobs")}
 className="text-gray-500 cursor-pointer hover:bg-[#313339] hover:text-gray-200"            variant="ghost"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="ml-2">Back</span>
          </Button>
          <h1 className="text-2xl  font-bold">Update The Job</h1>
        </div>

        <div className="p-6 rounded-xl bg-[#030712] border border-[#2b384a] shadow-lg">
          <form onSubmit={submitHandler}>
            <div className="space-y-5">
              {/* Job Details Section */}
              <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                <Label className="text-right">Job Title</Label>
                <Input
                  name="title"
                  value={input.title}
                  onChange={changeEventHandler}
                  placeholder="Enter job title"
                  className="sm:col-span-3 border-[#2b384a]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                <Label className="text-right">Description</Label>
                <Input
                  name="description"
                  value={input.description}
                  onChange={changeEventHandler}
                  placeholder="Enter job description"
                  className="sm:col-span-3 border-[#2b384a]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                <Label className="text-right">Requirements</Label>
                <Input
                  name="requirements"
                  value={input.requirements}
                  onChange={changeEventHandler}
                  placeholder="Enter job requirements"
                  className="sm:col-span-3 border-[#2b384a]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                <Label className="text-right">Salary</Label>
                <Input
                  name="salary"
                  value={input.salary}
                  onChange={changeEventHandler}
                  placeholder="e.g. 3 Lpa "
                  className="sm:col-span-3 border-[#2b384a]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                <Label className="text-right">Location</Label>
                <Input
                  name="location"
                  value={input.location}
                  onChange={changeEventHandler}
                  placeholder="e.g. Bengaluru"
                  className="sm:col-span-3 border-[#2b384a]"
                />
              </div>

              {/* Job Type and experience */}
              <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                <Label className="text-right">Job Type</Label>
                <Input
                  name="jobType"
                  value={input.jobType}
                  onChange={changeEventHandler}
                  placeholder="e.g. Full-time"
                  className="sm:col-span-3 border-[#2b384a]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                <Label className="text-right">Experience</Label>
                <Input
                  name="experience"
                  value={input.experience}
                  onChange={changeEventHandler}
                  placeholder="e.g. 2-3 years"
                  className="sm:col-span-3 border-[#2b384a]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                <Label className="text-right">No. of Positions</Label>
                <Input
                  name="position"
                  value={input.position}
                  onChange={changeEventHandler}
                  placeholder="e.g. 2"
                  className="sm:col-span-3 border-[#2b384a]"
                />
              </div>
            </div>

            <DialogFooter className="mt-8">
              {loading ? (
                <Button className="w-full bg-[#6225c5d4] ">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait...
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full cursor-pointer  bg-[#6225C5] hover:bg-[#6225c5d4] "
                >
                  Update Job
                </Button>
              )}
            </DialogFooter>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminJobUpdate;
