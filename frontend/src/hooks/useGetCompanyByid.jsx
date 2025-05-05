import {
  COMPANY_REGISTER_API_END_POINT,
  JOB_API_END_POINT,
} from "@/utils/constant";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { setSingleCompany } from "@/redux/companySlice";

const useGetCompanyByid = (companyId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchcompany = async () => {
      try {
        const res = await axios.get(
          `${COMPANY_REGISTER_API_END_POINT}/get/${companyId}`,
          {
            withCredentials: true,
          }
        );
        console.log(res.data.company);

        if (res.data.success) {
          dispatch(setSingleCompany(res.data.company));
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch company");
      }
    };

    fetchcompany();
  }, [companyId, dispatch]);
};

export default useGetCompanyByid;
