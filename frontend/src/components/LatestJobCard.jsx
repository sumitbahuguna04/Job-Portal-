import { Badge } from "@/components/ui/badge";
import React from "react";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { useNavigate } from "react-router-dom";

function LatestJobCard({ job }) {
  const daysAgoFun = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timDiff = currentTime - createdAt;
    return Math.floor(timDiff / (1000 * 24 * 60 * 60));
  };
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="w-full bg-[#030712] border border-[#2b384a] cursor-default shadow-lg rounded-xl overflow-hidden transition-transform transform hover:scale-105 duration-300 text-white p-5 "
    >
      <div className="flex items-center justify-between text-sm text-gray-400">
        <p>
          {daysAgoFun(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFun(job?.createdAt)} days ago`}
        </p>
      </div>

      <div className="flex items-start sm:items-center gap-4 my-4">
        <Avatar className="w-12 h-12 rounded-full overflow-hidden">
          <AvatarImage
            src={job?.company?.logo}
            alt="Company Logo"
            className="w-full h-full object-cover"
          />
        </Avatar>
        <div>
          <h1 className="text-lg font-semibold">{job?.company?.name}</h1>
          <p className="text-sm text-gray-400">{job?.location}</p>
        </div>
      </div>

      <div className="mb-2 sm:mb-4 ">
        <h1 className="font-bold  text-lg">{job?.title}</h1>
        <p className="text-sm text-gray-400 mt-1">{job?.description}</p>
      </div>

      <div className="flex text-black flex-wrap gap-3">
        <Badge className="font-bold text-[#51A2FF] bg-[#16263E] border border-[#274C79] ">
          {`${job?.position} Positions`}
        </Badge>
        <Badge className="font-bold text-[#F0B100] bg-[#272A24] border border-[#524A1D] ">
          {job?.jobType}
        </Badge>
        <Badge className="font-bold text-[#0de045c8] bg-[#0E2A2C] border border-[#0B4A33]">
          {`${job?.salary} LPA`}
        </Badge>
      </div>
    </div>
  );
}

export default LatestJobCard;
