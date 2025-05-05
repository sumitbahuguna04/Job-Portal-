import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "@radix-ui/react-label";
import { USER_API_END_POINT } from "@/utils/constant";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader, Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import axios from "axios";

function UpdateProfile({ open, setOpen }) {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(", ") || "",
    file: user?.profile?.resume || "",
  });

  const dispatch = useDispatch();
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);

    if (input.file && input.file instanceof File) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
    setOpen(false);
  };

  return (
    <div className=" text-white bg-white">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger></DialogTrigger>
        <DialogContent
          className="bg-[#26292f] border-1 border-[#41444c] text-white"
          onInteractOutside={() => setOpen(false)}
        >
          <DialogHeader className=" items-center">
            <DialogTitle className="">Update Profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={submitHandler}>
            <div className="grid gap-4 py-4 text-white">
              <div className="grid grid-cols-4 items-center gap-4 text-white">
                <Label className="text-right">Name</Label>
                <Input
                  id="name"
                  name="fullname"
                  onChange={changeEventHandler}
                  value={input.fullname}
                  placeholder="Enter your name"
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4 text-white">
                <Label className="text-right">Email</Label>
                <Input
                  id="email"
                  name="email"
                  onChange={changeEventHandler}
                  value={input.email}
                  type="email"
                  placeholder="Enter your email"
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4 text-white">
                <Label className="text-right">Phone Number</Label>
                <Input
                  id="number"
                  name="phoneNumber"
                  onChange={changeEventHandler}
                  value={input.phoneNumber}
                  placeholder="Enter your number"
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4 text-white">
                <Label className="text-right">Bio</Label>
                <Input
                  id="bio"
                  name="bio"
                  value={input.bio}
                  onChange={changeEventHandler}
                  placeholder="Enter your bio"
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4 text-white">
                <Label className="text-right">Skills</Label>
                <Input
                  id="skills"
                  name="skills"
                  value={input.skills}
                  onChange={changeEventHandler}
                  placeholder="Enter your skills (comma-separated)"
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4 text-white">
                <Label htmlFor="file" className="text-right">
                  Resume
                </Label>
                <Input
                  id="file"
                  name="file"
                  type="file"
                  accept="application/pdf"
                  onChange={fileChangeHandler}
                  className="col-span-3 cursor-pointer"
                />
              </div>
              
            </div>
            <DialogFooter>
              {loading ? (
                <Button className="w-full my-4  text-black bg-[#fffffff0] hover:bg-[#ffffffce]">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin " />
                  Please wait
                </Button>
              ) : (
                <Button
                  type="submit"
                  className=" bg-[#fffffff0] hover:bg-[#ffffffce] cursor-pointer w-full text-black"
                >
                  Save
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default UpdateProfile;
