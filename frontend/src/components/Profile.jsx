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
import SavedJobs from "./SavedJobs";

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
      <div className="bg-[#1E1F29] min-h-screen text-white">
      <Navbar />


      <div className="flex gap-4 mt-8 px-6 justify-center">
        <Button
          className="px-6 py-2 rounded-xl text-white bg-[#2C2E3A] border border-[#3d4348] hover:bg-[#3A3C49] transition"
          onClick={() => scrollToSection(appliedRef)}
        >
          Applied Jobs
        </Button>
        <Button
          className="px-6 py-2 rounded-xl text-white bg-[#2C2E3A] border border-[#3d4348] hover:bg-[#3A3C49] transition"
          onClick={() => scrollToSection(savedRef)}
        >
          Saved Jobs
        </Button>
      </div>


      <div className="max-w-4xl mx-4 md:mx-auto rounded-2xl bg-[#282A36] border border-[#31353b] my-8 p-8 shadow-lg">
        <div className="flex justify-between items-start">
         
          <div className="flex items-center">
            <Avatar className="h-24 w-24 border-2 border-[#3d4348]">
              <AvatarImage src={user?.profile?.profilePhoto} />
            </Avatar>
            <div className="pl-6">
              <h1 className="font-semibold text-2xl">{user?.fullname}</h1>
              <p className="text-gray-400 text-sm mt-1">{user?.profile?.bio}</p>
            </div>
          </div>

          <UpdateProfile open={open} setOpen={setOpen} />
          <Button
            onClick={() => setOpen(true)}
            className="cursor-pointer rounded-full bg-[#2C2E3A] border border-[#40444a] hover:bg-[#3A3C49] transition"
            variant="outline"
          >
            <Pen size={18} />
          </Button>
        </div>

      
        <div className="mt-6 space-y-3">
          <div className="flex items-center gap-3 text-gray-300">
            <Mail size={18} />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-300">
            <Contact size={18} />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>

     
        <div className="my-6">
          <h2 className="text-lg font-semibold mb-3">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {user?.profile?.skills.length !== 0 ? (
              user?.profile?.skills.map((val, key) => (
                <Badge
                  className=" text-white font-medium px-3 py-1 rounded-xl bg-[#4A4C5B]"
                  key={key}
                >
                  {valToCaptital(val)}
                </Badge>
              ))
            ) : (
              <span className="text-gray-400">No Skills</span>
            )}
          </div>
        </div>

   
        <div className="mt-6">
          <Label className="text-md font-semibold">Resume</Label>
          {isResume ? (
            <a
              target="_blank"
              href={user?.profile?.resume}
              rel="noreferrer"
              className="block text-blue-400 hover:text-blue-500 mt-1 transition"
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span className="text-gray-400">NA</span>
          )}
        </div>
      </div>

 
      <div
        ref={appliedRef}
        className="bg-[#282A36] border border-[#31353b]   max-w-4xl mx-4 md:mx-auto rounded-2xl my-8 p-8 shadow-md"
      >
        <h1 className="font-semibold text-xl mb-4">Applied Jobs</h1>
        <Appliedjobs />
      </div>


      <div
        ref={savedRef}
        className="bg-[#282A36] border border-[#31353b] max-w-4xl mx-4 md:mx-auto rounded-2xl my-8 p-8 shadow-md"
      >
        <h1 className="font-semibold text-xl mb-4">Saved Jobs</h1>
        <SavedJobs />
      </div>

      <Footer />
    </div>
  );
}

export default Profile;
