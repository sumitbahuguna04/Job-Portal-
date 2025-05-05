import { setAllJobs, SetSeachedJobsArray } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";

const useGetAlljobs = () => {
  const dispatch = useDispatch();
  const { searchJob } = useSelector((store) => store.job);

  useEffect(() => {
    const fetchAlljobs = async () => {
      try {
        if (searchJob) {
          const res = await axios.get(
            `${JOB_API_END_POINT}/get?keyword=${searchJob}`,
            {
              withCredentials: true,
            }
          );

          if (res.data.success) {
            dispatch(SetSeachedJobsArray(res.data.jobs));
          }
        } else {
          const res = await axios.get(`${JOB_API_END_POINT}/get`, {
            withCredentials: true,
          });

          if (res.data.success) {
            dispatch(setAllJobs(res.data.jobs));
          }
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch jobs");
      }
    };

    fetchAlljobs();
  }, [dispatch, searchJob]);
};

export default useGetAlljobs;
