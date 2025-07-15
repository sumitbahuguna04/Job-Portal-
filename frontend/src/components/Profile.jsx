import React, { useRef, useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "@radix-ui/react-label";
import Appliedjobs from "./Appliedjobs";
import UpdateProfile from "./UpdateProfile";
import { useSelector } from "react-redux";
import Footer from "./shared/Footer";
import useGetAllAppliedJobs from "@/hooks/useGetAllAppliedJobs";
import SavedJobs from "./savedJobs";

const profileupdate = () => {};
const valToCaptital = (str) => {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
const isResume = true;

function Profile() {
  useGetAllAppliedJobs();
  const appliedRef = useRef(null);
  const savedRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const { user } = useSelector((store) => store.auth);
  const [open, setOpen] = useState(false);

  return (
    <div className="text-white">
      <Navbar />
      <div className=" ml-5 mt-5 flex gap-3 ">
        <Button
          className=" text-white cursor-pointer border border-[#323d58] bg-[#030712] hover:bg-[#1F2937]"
          ref={appliedRef}
          onClick={() => scrollToSection(appliedRef)}
        >
          Applied Jobs
        </Button>
        <Button
          className=" text-white cursor-pointer border border-[#323d58] bg-[#030712] hover:bg-[#1F2937]"
          ref={savedRef}
          onClick={() => scrollToSection(savedRef)}
        >
          Saved Jobs
        </Button>
      </div>

      <div className="max-w-4xl m-4 sm:mx-auto rounded-2xl bg-[#481dac] sm:bg-[#030712] border border-[#2b384a] my-5 p-8 mt-10">
        <div className="flex justify-between">
          <div className="flex items-center">
            <Avatar className="h-23 cursor-pointer w-23">
              <AvatarImage src={user?.profile?.profilePhoto} />
            </Avatar>
            <div className="pl-8">
              <h1 className="font-medium text-xl">{user?.fullname}</h1>
              <p>{user?.profile?.bio}</p>
            </div>
          </div>
          <UpdateProfile open={open} setOpen={setOpen} />
          <Button
            onClick={() => setOpen(true)}
            className="text-right cursor-pointer  bg-[#1F2937] hover:bg-[#263242] border-[#3f5065]"
            variant="outline"
          >
            <Pen />
          </Button>
        </div>

        {/* Contact Details */}
        <div className="flex item-center gap-3 my-2">
          <Mail />
          <span>{user?.email}</span>
        </div>
        <div className="mt-2 flex items-center gap-3 my-2">
          <Contact />
          <span>{user?.phoneNumber}</span>
        </div>

        {/* Skills Section */}
        <div className="my-5">
          <h1>Skills</h1>
          <div className="flex h-7 gap-2 mt-1">
            {user?.profile?.skills.length !== 0 ? (
              user?.profile?.skills.map((val, key) => (
                <Badge
                  className="bg-[#fff] text-black font-bold rounded-2xl"
                  key={key}
                >
                  {valToCaptital(val)}
                </Badge>
              ))
            ) : (
              <span>No Skills</span>
            )}
          </div>
        </div>

        {/* Resume Section */}
        <div className="grid w-full max-w-sm gap-1.5">
          <Label className="text-md font-bold">Resume</Label>
          {isResume ? (
            <a
              target="blank"
              href={user?.profile?.resume}
              rel="noreferrer"
              className="text-blue-500 w-full hover:underline cursor-pointer"
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span>NA</span>
          )}
        </div>
      </div>

      {/* Applied Jobs Section */}
      <div
        ref={appliedRef}
        className="bg-[#481dac] sm:bg-[#030712] border border-[#2b384a] max-w-4xl m-4 sm:mx-auto rounded-2xl my-5 p-8 mb-10 mt-10"
      >
        <h1 className="font-medium text-xl">Applied Jobs</h1>
        <Appliedjobs />
      </div>

      {/* Saved Jobs Section */}
      <div
        ref={savedRef}
        className="bg-[#481dac] sm:bg-[#030712] border border-[#2b384a] max-w-4xl m-4 sm:mx-auto rounded-2xl  my-5 p-8 mb-10 mt-10"
      >
        <h1 className="font-medium text-xl">Saved Jobs</h1>
        <SavedJobs />
      </div>

      <Footer />
    </div>
  );
}

export default Profile;
