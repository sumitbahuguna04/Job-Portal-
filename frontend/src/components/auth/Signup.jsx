import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form, Link, useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

export default function Signup() {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });
  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    if (
      !input.fullname.trim() ||
      !input.email.trim() ||
      !input.phoneNumber.trim() ||
      !input.password.trim() ||
      !input.role.trim() ||
      !input.file
    ) {
      toast.error("All fields are required");
      return;
    }
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);
  return (
    <div>
      <Navbar />
      <div className="flex text-white items-center justify-center max-w-7xl px-8 sm:px-0 mx-auto">
        <form
          onSubmit={submitHandler}
          className="sm:w-1/2 bg-[#1e2126] border border-[#2f3848] rounded-md p-6 my-10 shadow-lg"
        >
          <h1 className="font-bold text-2xl mb-6 text-white">Sign Up</h1>
          <div className="my-4">
            <Label className="text-gray-300">Full Name</Label>
            <Input
              className="border-[#3a4557] mt-1 text-white bg-[#2a2e36] focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              placeholder="Enter your name"
            />
          </div>
          <div className="my-4">
            <Label className="text-gray-300">Email</Label>
            <Input
              className="border-[#3a4557] mt-1 text-white bg-[#2a2e36] focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="Enter your email"
            />
          </div>
          <div className="my-4">
            <Label className="text-gray-300">Phone Number</Label>
            <Input
              className="border-[#3a4557] mt-1 text-white bg-[#2a2e36] focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              type="text"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="Enter your phone number"
            />
          </div>
          <div className="my-4">
            <Label className="text-gray-300">Password</Label>
            <Input
              className="border-[#3a4557] mt-1 text-white bg-[#2a2e36] focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Enter your password"
            />
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <RadioGroup className="flex items-center gap-10 sm:gap-4">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer border-[#3a4557] text-purple-500"
                />
                <Label className="text-gray-300">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer border-[#3a4557] text-purple-500"
                />
                <Label className="text-gray-300">Recruiter</Label>
              </div>
            </RadioGroup>
            <div className="flex mt-2 sm:mt-0 items-center gap-2">
              <Label className="text-gray-300">Profile</Label>
              <Input
                accept="image/*"
                type="file"
                onChange={changeFileHandler}
                className="border-[#3a4557] cursor-pointer bg-[#2a2e36] text-white"
              />
            </div>
          </div>
          {loading ? (
            <Button className="w-full my-4 bg-gradient-to-r from-purple-700 to-purple-500 text-white">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full my-4 bg-[#6dd3db] hover:bg-[#6dd4dbe9] text-black font-semibold"
            >
              Sign Up
            </Button>
          )}
          <span className="text-gray-300">
            Already have an account?
            <Link
              to="/login"
              className="p-2 underline text-[#6dd3db] hover:text-[#5bbfc7]"
            >
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}
