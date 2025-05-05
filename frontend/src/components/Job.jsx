import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import {
  Bookmark,
  PanelRightDashedIcon,
  PlusIcon,
} from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { SetSavedJobsArray } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import axios from "axios";

function Job({ job }) {
  const daysAgoFun = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDiff = currentTime - createdAt;
    return Math.floor(timeDiff / (1000 * 24 * 60 * 60));
  };

  const { savedJobsArray } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isSaved, setissaved] = useState(false);

  useEffect(() => {
    setissaved(savedJobsArray.some((item) => item._id === job._id));
  }, [savedJobsArray, job._id]);

  const statusHandler = async (jobId) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(`${JOB_API_END_POINT}/savedjob/${jobId}`, {
        jobId,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        setissaved(true);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
    }
  };

  const unsaveJob = async (jobId) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.delete(`${JOB_API_END_POINT}/deletejob/${jobId}`);

      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(
          SetSavedJobsArray(savedJobsArray.filter((job) => job._id !== jobId))
        );
        setissaved(false);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="w-full max-w-[600px] mx-auto text-white p-4 sm:p-5 rounded-md shadow-xl bg-[#030712] border border-[#2b384a]">
      {/* Top Row: Time and Save Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <p className="text-gray-400 text-sm">
          {daysAgoFun(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFun(job?.createdAt)} days ago`}
        </p>
        <Button
          variant="outline"
          className={`rounded-full border-[#324157] size-8 ${
            isSaved ? "text-[#fff]" : ""
          }`}
        >
          <Bookmark
            className={`w-4 h-4 ${
              isSaved ? "fill-current text-[#eceaf0]" : ""
            }`}
          />
        </Button>
      </div>

      {/* Company Info */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 my-4">
        <Avatar className="rounded-full overflow-hidden size-12">
          <AvatarImage src={job?.company?.logo} alt="Company Logo" />
        </Avatar>
        <div>
          <h1 className="text-base sm:text-lg font-semibold">
            {job?.company?.name}
          </h1>
          <p className="text-sm text-gray-400">{job?.location}</p>
        </div>
      </div>

      <div className="mb-3">
        <h1 className="font-bold text-base sm:text-lg mb-1">{job?.title}</h1>
        <p className="text-gray-400 text-sm break-words">{job?.description}</p>
      </div>

      <div className="flex flex-wrap gap-2 py-3">
        <Badge className="font-bold text-[#51A2FF] bg-[#16263E] border border-[#274C79] ">
          {`${job?.position} Positions`}
        </Badge>
        <Badge className="font-bold text-[#F0B100] bg-[#272A24] border border-[#524A1D] ">
          {job?.jobType}
        </Badge>
        <Badge className="font-bold text-[#0de045c8] bg-[#0E2A2C] border border-[#0B4A33]">
          {`${job?.salary} LPA`}
        </Badge>
      </div>

     
      <div className="flex flex-col sm:flex-row gap-3 mt-3">
        <Button
          onClick={() => navigate(`/description/${job._id}`)}
          className="cursor-pointer bg-[#6D28D9] hover:bg-[#6c28d9d8] w-full sm:w-auto"
        >
          Details
        </Button>
        <Button
          onClick={() =>
            isSaved ? unsaveJob(job._id) : statusHandler(job._id)
          }
          className="cursor-pointer bg-[#6D28D9] hover:bg-[#6c28d9d8] w-full sm:w-auto"
        >
          Save
          {!isSaved ? <PlusIcon /> : <PanelRightDashedIcon />}
        </Button>
      </div>
    </div>
  );
}

export default Job;
