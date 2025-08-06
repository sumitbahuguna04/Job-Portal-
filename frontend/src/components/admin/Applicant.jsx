import React, { useEffect } from "react";
import Navbar from "../shared/Navbar";
import ApplicantsTable from "./ApplicantsTable";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { useParams } from "react-router-dom";
import { setApplicants } from "@/redux/applicantsSlice";
import useGetAllApplicants from "@/hooks/useGetAllApplicants";

function Applicant() {

  const params = useParams();
  useGetAllApplicants(params.id);
  const { allapplicants } = useSelector((store) => store.applicant);

  return (
    <div className="text-white">
      <Navbar />
      <div className="max-w-6xl mx-auto">
        <h1 className="font-bold text-xl my-5">
          Applicants {allapplicants?.length}
        </h1>
        <ApplicantsTable />
      </div>
    </div>
  );
}

export default Applicant;
