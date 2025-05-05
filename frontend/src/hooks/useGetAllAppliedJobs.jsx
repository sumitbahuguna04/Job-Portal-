import {
   APPLICATION_API_END_POINT,
  } from "@/utils/constant";
  import React, { useEffect } from "react";
  import { useDispatch } from "react-redux";
  import axios from "axios";
  import { toast } from "sonner";
  import { setCompanies } from "@/redux/companySlice";
import { setAllAppliedJobs } from "@/redux/jobSlice";
  
  const useGetAllAppliedJobs = () => {
    const dispatch = useDispatch();
  
    useEffect(() => {
      const fetchAllAppliedJobs = async () => {
        try {
          const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, {
            withCredentials: true,
          });
  
          if (res.data.success) {
            dispatch(setAllAppliedJobs(res.data.application));
          }
        } catch (error) {
          console.log(error);
          toast.error("Failed to fetch jobs");
        }
      };
  
      fetchAllAppliedJobs();
    }, []);
  };
  
  export default useGetAllAppliedJobs;
  