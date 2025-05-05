import {
  COMPANY_REGISTER_API_END_POINT,
  JOB_API_END_POINT,
} from "@/utils/constant";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "sonner";

import { setSingleJob } from "@/redux/jobSlice";

const useGetJobById = (JobId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${JobId}`, {
          withCredentials: true,
        });
        console.log(res.data.job);

        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch job");
      }
    };

    fetchJob();
  }, [JobId, dispatch]);
};

export default useGetJobById;
