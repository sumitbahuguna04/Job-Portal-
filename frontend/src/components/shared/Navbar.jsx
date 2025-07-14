import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import axios from "axios";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.message || "Logout failed");
    }
  };

  return (
    <div className="bg-[#151c29] text-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl w-full h-16 px-4 overflow-hidden">
        <div className="font-[Orbitron] ">
         <h1 className="sm:text-xl ">NEXT<span className="pl-2 sm:text-xl  shadow-2xl  text-green-500 ">HIRE</span></h1>
        </div>
        <div className="flex items-center sm:gap-6 gap-2 flex-wrap">
          <ul className="flex items-center gap-2 sm:gap-4 whitespace-nowrap">
            {user && user.role === "recruiter" ? (
              <>
                <li className="cursor-pointer hover:text-blue-500">
                  <Link to="/admin/companies">Companies</Link>
                </li>
                <li className="cursor-pointer hover:text-blue-500">
                  <Link to="/admin/comapnies/jobs">Job</Link>
                </li>
              </>
            ) : (
              <>
                <li className="cursor-pointer hover:text-blue-500">
                  <Link to="/">Home</Link>
                </li>
                <li className="cursor-pointer hover:text-blue-500">
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li className="cursor-pointer hover:text-blue-500">
                  <Link to="/browse">Browse</Link>
                </li>
              </>
            )}
          </ul>
          {!user ? (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="" className="cursor-pointer border border-[#474e52] hover:bg-[#272c30] hover:border-[#272c30]">
                  Log in
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="cursor-pointer bg-[#5b21b6] hover:bg-[#5a21b6cb] text-white">
                  Sign up
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="Profile"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-60 mr-2 sm:w-80 text-white bg-[#2a323f] border border-[#4f5c73]">
                <div className="flex gap-4">
                  <Avatar>
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="Profile"
                    />
                  </Avatar>
                  <div className="truncate">
                    <h4 className="font-medium truncate max-w-[150px]">
                      {user?.fullname}
                    </h4>
                    {user?.role === "student" && (
                      <p className="text-sm">{user?.profile?.bio}</p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col text-white mt-3">
                  {user?.role === "student" && (
                    <div className="flex items-center gap-2">
                      <User2 />
                      <Button variant="link">
                        <Link to="/profile">View Profile</Link>
                      </Button>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <LogOut />
                    <Button className="cursor-pointer" onClick={logoutHandler} variant="link">
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
