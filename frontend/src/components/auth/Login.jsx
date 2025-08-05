import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { RadioGroup } from "@/components/ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

export default function Login() {
  const [input, setinput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const { user } = useSelector((store) => store.auth);

  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setinput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");

        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
  return (
    <div className="bg-[#1E1F29] min-h-screen text-white">
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto px-4">
        <form
          onSubmit={submitHandler}
          className="w-full sm:w-[450px] bg-[#282A36] border border-[#2f3848] rounded-2xl p-8 my-12 shadow-xl"
        >
          <h1 className="font-bold text-3xl mb-6 text-center text-white">
            Welcome Back
          </h1>
          <p className="text-center text-gray-400 mb-8 text-sm">
            Log in to continue your journey
          </p>

       
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


          <div className="flex items-center justify-between mb-6">
            <RadioGroup className="flex items-center gap-6">
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
                  className="cursor-pointer border-[#32435f] accent-[#6dd3db]"
                />
                <Label className="text-gray-300">Recruiter</Label>
              </div>
            </RadioGroup>
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
              Log in
            </Button>
          )}

          {/* Links */}
          <div className="text-sm text-center space-y-2 mt-6">
            <Link className="underline text-[#6dd3db] hover:text-[#5bbfc7]">
              Forgot Password?
            </Link>
            <p className="text-gray-400">
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="underline text-[#6dd3db] hover:text-[#5bbfc7] font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
