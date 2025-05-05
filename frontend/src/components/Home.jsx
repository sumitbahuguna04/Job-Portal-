import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import HeroSection from "./HeroSection";
import CategoryCarausel from "./CategoryCarausel";

import LatestJobs from "./LatestJobs";
import useGetAlljobs from "@/hooks/useGetAlljobs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "./shared/Footer";

function Home() {
  useGetAlljobs();
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === "recruiter") {
      navigate("/admin/companies");
    }
  },[]);
  return (
    <div>
      <Navbar />
      <HeroSection />
      <CategoryCarausel />
      <LatestJobs />
      <Footer />
    </div>
  );
}

export default Home;
