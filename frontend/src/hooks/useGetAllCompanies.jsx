import {
  COMPANY_REGISTER_API_END_POINT,
  JOB_API_END_POINT,
} from "@/utils/constant";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { setCompanies } from "@/redux/companySlice";

const useGetAllCompanies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllcompanies = async () => {
      try {
        const res = await axios.get(`${COMPANY_REGISTER_API_END_POINT}/get`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setCompanies(res.data.companies));
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch jobs");
      }
    };

    fetchAllcompanies();
  }, []);
};

export default useGetAllCompanies;
