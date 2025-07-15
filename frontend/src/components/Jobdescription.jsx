import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { setSingleJob } from "@/redux/jobSlice";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function Jobdescription() {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const isIntiallyApplied = singleJob?.applications?.some(
    (application) => application.applicant === user?._id
  );
  const [isApplied, setIsApplied] = useState(isIntiallyApplied);
  console.log(isApplied);
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div>
      <Navbar />
    <div className="p-4 sm:p-0">  <div className="mt-10 lg:max-w-4xl sm:max-w-2xl rounded-2xl mx-auto bg-[#030712] border border-[#2b384a]">
        <div className="p-5 sm:p-10 text-white">
          <div className="flex flex-col sm:flex-row  sm:items-center justify-between">
            <div className="rounded-2xl sm:p-3">
              <h1 className="font-bold text-xl">{singleJob?.title}</h1>
              <div className="flex items-center gap-3 mt-4 text-black">
                 <Badge className="font-bold text-[#51A2FF] bg-[#16263E] border border-[#274C79] ">
                         {`${singleJob?.position} Positions`}
                       </Badge>
                       <Badge className="font-bold text-[#F0B100] bg-[#272A24] border border-[#524A1D] ">
                         {singleJob?.jobType}
                       </Badge>
                       <Badge className="font-bold text-[#0de045c8] bg-[#0E2A2C] border border-[#0B4A33]">
                         {`${singleJob?.salary} LPA`}
                       </Badge>
              </div>
            </div>

            {singleJob && (
              <Button
                onClick={isApplied ? null : applyJobHandler}
                className={`rounded-lg ${
                  isApplied
                    ? "bg-[#1f2937d3] mt-3 text-gray-300 cursor-not-allowed"
                    : "bg-[#6225C5] hover:bg-[#6225c5cf] cursor-pointer"
                }`}
              >
                {isApplied ? "Already Applied" : "Apply Now"}
              </Button>
            )}
          </div>

          <h1 className="pl-2 text-gray-00 border-b-2 border-b-[#1F2937] font-medium py-4">
            {singleJob?.description}
          </h1>

          <div className="mt-4 p-3 rounded-2xl bg-[#1F2937]">
            <h1 className="font-medium my-1">
              Company:
              <span className="pl-2 font-normal text-white">
                {singleJob?.company?.name}
              </span>
            </h1>
            <h1 className="font-medium my-1">
              Role:
              <span className="pl-2 font-normal text-white">
                {singleJob?.title}
              </span>
            </h1>
            <h1 className="font-medium my-1">
              Requirments:
              <span className="pl-2 font-normal text-white">
                {singleJob?.requirements?.map((val, ind) => (
                  <span key={ind}>
                    {val}
                    {ind !== singleJob.requirements.length - 1 ? ", " : ""}
                  </span>
                ))}
              </span>
            </h1>
            <h1 className="font-medium my-1">
              Location:
              <span className="pl-2 font-normal text-white">
                {singleJob?.location}
              </span>
            </h1>
            <h1 className="font-medium my-1">
              Job Type:
              <span className="pl-2 font-normal text-white">
                {singleJob?.jobType}
              </span>
            </h1>
            <h1 className="font-medium my-1">
              Description:
              <span className="pl-2 font-normal text-white">
                {singleJob?.description}
              </span>
            </h1>
            <h1 className="font-medium my-1">
              Experience:
              <span className="pl-2 font-normal text-white">
                {`${singleJob?.experience || 0}`}
              </span>
            </h1>
            <h1 className="font-medium my-1">
              Salary:
              <span className="pl-2 font-normal text-white">
                {`${singleJob?.salary} LPA`}
              </span>
            </h1>
            <h1 className="font-medium my-1">
              Applied Candidates:
              <span className="pl-2 font-normal text-white">
                {singleJob?.applications?.length}
              </span>
            </h1>
            <h1 className="font-medium my-1">
              Posted Date:
              <span className="pl-2 font-normal text-white">
                {singleJob?.createdAt?.split("T")[0]}
              </span>
            </h1>
          </div>
        </div>
      </div></div>
    </div>
  );
}

export default Jobdescription;
