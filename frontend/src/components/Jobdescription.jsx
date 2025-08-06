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
      <div className="p-4 sm:p-6">
        <div className="mt-10 max-w-5xl mx-auto rounded-2xl bg-[#282A36] border border-[#3d4046] shadow-lg">
          <div className="p-6 sm:p-10 text-white space-y-6">

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="font-bold text-2xl sm:text-3xl">{singleJob?.title}</h1>
                <div className="flex flex-wrap items-center gap-3 mt-4">
 <Badge className="font-bold text-[#51A2FF] bg-[#16263E] border border-[#274C79]">
                    {`${singleJob?.position} Positions`}
                  </Badge>
                  <Badge className="font-bold text-[#F0B100] bg-[#272A24] border border-[#524A1D]">
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
                  className={`px-6 py-3 rounded-lg text-lg ${
                    isApplied
                      ? "bg-[#2a2d37] text-gray-400 cursor-not-allowed"
                      : "bg-[#8760D4] hover:bg-[#926ae1] cursor-pointer"
                  }`}
                >
                  {isApplied ? "Already Applied" : "Apply Now"}
                </Button>
              )}
            </div>

           
            <div>
              <h2 className="text-xl font-semibold border-b border-[#3d404e] pb-3">
                Job Overview
              </h2>
              <p className="text-gray-300 mt-4">{singleJob?.description}</p>
            </div>

           
            <div className="grid sm:grid-cols-2 gap-6 p-5 rounded-2xl bg-[#31323fd6]">
              <div>
                <h3 className="font-medium text-gray-400">Company</h3>
                <p className="text-white">{singleJob?.company?.name}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-400">Role</h3>
                <p className="text-white">{singleJob?.title}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-400">Requirements</h3>
                <p className="text-white">
                  {singleJob?.requirements?.map((val, ind) => (
                    <span key={ind}>
                      {val}
                      {ind !== singleJob.requirements.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-400">Location</h3>
                <p className="text-white">{singleJob?.location}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-400">Experience</h3>
                <p className="text-white">{`${singleJob?.experience || 0} Years`}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-400">Salary</h3>
                <p className="text-white">{`${singleJob?.salary} LPA`}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-400">Applied Candidates</h3>
                <p className="text-white">{singleJob?.applications?.length}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-400">Posted Date</h3>
                <p className="text-white">{singleJob?.createdAt?.split("T")[0]}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Jobdescription;
