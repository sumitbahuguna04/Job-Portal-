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
    <div className="bg-[#1E1F29] min-h-screen text-white">
      <Navbar />
      <div className="flex text-white items-center justify-center max-w-7xl px-4 sm:px-0 mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-full sm:w-[500px] bg-[#282A36] border border-[#2f3848] rounded-2xl p-8 my-12 shadow-xl"
        >
          <h1 className="font-bold text-3xl mb-6 text-center">Create Account</h1>
          <p className="text-center text-gray-400 mb-8 text-sm">
            Join us and start your journey today!
          </p>

          {/* Full Name */}
          <div className="mb-5">
            <Label className="text-gray-300 text-sm">Full Name</Label>
            <Input
              className="border-[#3a4557] mt-2 text-white bg-[#272934] rounded-md focus:border-[#6dd3db] focus:ring-1 focus:ring-[#6dd3db]"
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              placeholder="Enter your name"
            />
          </div>

          {/* Email */}
          <div className="mb-5">
            <Label className="text-gray-300 text-sm">Email</Label>
            <Input
              className="border-[#3a4557] mt-2 text-white bg-[#272934] rounded-md focus:border-[#6dd3db] focus:ring-1 focus:ring-[#6dd3db]"
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="Enter your email"
            />
          </div>

          {/* Phone Number */}
          <div className="mb-5">
            <Label className="text-gray-300 text-sm">Phone Number</Label>
            <Input
              className="border-[#3a4557] mt-2 text-white bg-[#272934] rounded-md focus:border-[#6dd3db] focus:ring-1 focus:ring-[#6dd3db]"
              type="text"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="Enter your phone number"
            />
          </div>

          {/* Password */}
          <div className="mb-5">
            <Label className="text-gray-300 text-sm">Password</Label>
            <Input
              className="border-[#3a4557] mt-2 text-white bg-[#272934] rounded-md focus:border-[#6dd3db] focus:ring-1 focus:ring-[#6dd3db]"
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Enter your password"
            />
          </div>

          {/* Role & Profile Image */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            {/* Role Selection */}
            <RadioGroup className="flex items-center gap-8">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer border-[#3a4557] accent-[#6dd3db]"
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
                  className="cursor-pointer border-[#3a4557] accent-[#6dd3db]"
                />
                <Label className="text-gray-300">Recruiter</Label>
              </div>
            </RadioGroup>

            {/* Profile Image Upload */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Label className="text-gray-300">Profile</Label>
              <Input
                accept="image/*"
                type="file"
                onChange={changeFileHandler}
                className="border-[#3a4557] cursor-pointer bg-[#272934] text-white rounded-md"
              />
            </div>
          </div>

          {/* Submit Button */}
          {loading ? (
            <Button className="w-full my-4 bg-gradient-to-r from-[#6dd3db] to-[#6dd3db] text-black font-semibold py-2 rounded-lg">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full my-4 bg-gradient-to-r from-[#6dd3db] to-[#6dd3db] hover:opacity-90 text-black font-semibold py-2 rounded-lg transition"
            >
              Sign Up
            </Button>
          )}

          {/* Login Redirect */}
          <p className="text-gray-400 text-sm text-center mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="underline text-[#6dd3db] hover:text-[#5bbfc7] font-medium"
            >
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
