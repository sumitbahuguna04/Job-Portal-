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
          className=" border sm:w-1/2 border-[#283347]  bg-[#030712] rounded-md p-5 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Log In</h1>

          <div className="my-2">
            <Label className="">Email</Label>
            <Input
              className="border-[#283347] text-[#7744c7] "
        
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="enter your email"
            />
          </div>

          <div className="my-2">
            <Label className="">Password</Label>
            <Input
              className="border-[#283347] text-[#7744c7]"
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="enter your password"
            />
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer border-[#283347] text-[#7744c7]"
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer border-[#283347] text-[#7744c7]"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          {loading ? (
            <Button className="w-full my-4 bg-[#6225c5d4]">
              <Loader2 className="mr-2 h-4 w-4 animate-spin " />
              Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className=" w-full  items-center  my-4 cursor-pointer bg-[#6225C5] hover:bg-[#6225c5d4]"
            >
              Log in
            </Button>
          )}
          <div className="grid gap-2">
            <span>
              <Link className="underline text-blue-400">Forgot Password?</Link>
            </span>
            <span>
              Don't have an account?
              <Link to="/signup" className="p-2 text underline text-blue-400">
                Sing up
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
