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
    <div>
      <Navbar />
      <div className="flex  text-white items-center justify-center max-w-7xl mx-auto ">
      <form
  onSubmit={submitHandler}
  className="sm:w-1/2 bg-[#1e2126] border border-[#2f3848] rounded-md p-6 my-10 shadow-lg"
>
  <h1 className="font-bold text-2xl mb-6 text-white">Log In</h1>

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

  <div className="flex items-center justify-between my-4">
    <RadioGroup className="flex items-center gap-6">
      <div className="flex items-center space-x-2">
        <Input
          type="radio"
          name="role"
          value="student"
          checked={input.role === "student"}
          onChange={changeEventHandler}
          className="cursor-pointer border-[#3a4557] mt-1 text-purple-500"
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
          className="cursor-pointer border-[#3a4557] mt-1 text-purple-500"
        />
        <Label className="text-gray-300">Recruiter</Label>
      </div>
    </RadioGroup>
  </div>

  {loading ? (
    <Button className="w-full my-4 bg-gradient-to-r from-purple-700 to-purple-500 text-white">
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Please wait
    </Button>
  ) : (
    <Button
      type="submit"
      className="w-full my-4 bg-gradient-to-r bg-[#6dd3db]  hover:bg-[#6dd4dbe9] hover:to-purple-400 text-black font-semibold"
    >
      Log in
    </Button>
  )}

 <div className="grid gap-2 text-sm">
  <span>
    <Link className="underline text-[#6dd3db] hover:text-[#5bbfc7]">
      Forgot Password?
    </Link>
  </span>
  <span className="text-gray-300">
    Don't have an account?
    <Link
      to="/signup"
      className="p-2 underline text-[#6dd3db] hover:text-[#5bbfc7]"
    >
      Sign up
    </Link>
  </span>
</div>

</form>

      </div>
    </div>
  );
}
