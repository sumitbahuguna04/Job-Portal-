import { SetSavedJobsArray } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const useGetAllSavedJob = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllSavedjobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/savedjob`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(SetSavedJobsArray(res.data.savedJobs));
        }
      } catch (error) {
        console.log(error);
        toast.error("jobs not found");
      }
    };
    fetchAllSavedjobs();
  }, [dispatch]);
};

export default useGetAllSavedJob;
