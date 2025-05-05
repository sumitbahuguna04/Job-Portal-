import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { setApplicants } from "@/redux/applicantsSlice";

const useGetAllApplicants = (id) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!id) {
      console.log("No ID yet");
      return;
    }

    console.log("Fetching applicants for job ID:", id);

    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/${id}/applicants`,
          { withCredentials: true }
        );
        console.log("API Response:", res.data);

        if (res.data.success) {
          dispatch(setApplicants(res.data.job));
        }
      } catch (error) {
        console.log("API Error:", error);
        toast.error("Something went wrong");
      }
    };

    fetchAllApplicants();
  }, [id]);
};

export default useGetAllApplicants;
