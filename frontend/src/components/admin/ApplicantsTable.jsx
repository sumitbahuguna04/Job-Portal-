import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { Button } from "../ui/button";

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { allapplicants } = useSelector((store) => store.applicant);
  const applications = allapplicants?.applications || [];

  const [showAlert, setShowAlert] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedApplicantId, setSelectedApplicantId] = useState(null);

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status }
      );

      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
    }
  };

  const submitHandler = (status, id) => {
    setSelectedStatus(status);
    setSelectedApplicantId(id);
    setShowAlert(true);
  };

  return (
    <div className="rounded-2xl p-5 bg-[#030712] border border-[#2b384a]">
      <Table>
        <TableCaption className="text-gray-400">
          A list of your recent applied users
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.length > 0 ? (
            applications.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item?.applicant?.fullname}</TableCell>
                <TableCell>{item?.applicant?.email}</TableCell>
                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                <TableCell>
                  {item?.applicant?.profile?.resume ? (
                    <a
                      className="text-blue-600 cursor-pointer"
                      href={item?.applicant?.profile?.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item?.applicant?.profile?.resumeOriginalName}
                    </a>
                  ) : (
                    <span>NA</span>
                  )}
                </TableCell>
                <TableCell>
                  {new Date(item?.applicant?.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="float-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="cursor-pointer" />
                    </PopoverTrigger>
                    <PopoverContent className="flex flex-col text-center bg-[#161d26] border-[#2b384a] border w-32 p-1">
  {shortlistingStatus.map((status) => (
    <div
      key={status}
      className=" rounded-2xl hover:bg-[#2b384a] cursor-pointer"
    >
      <Button
        onClick={() => submitHandler(status, item._id)}
        className="  text-white border-none"
        variant="ghost"
      >
        {status}
      </Button>
    </div>
  ))}
</PopoverContent>

                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No applicants found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
        <AlertDialogContent className="text-white border-gray-600 bg-[#151619]">
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Status Change</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to mark this applicant as{" "}
              <strong>{selectedStatus}</strong>? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="border-gray-600 hover:bg-[#24262a] hover:border-[#24262a] "
              onClick={() => setShowAlert(false)}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-[#fff] hover:bg-[#ffffffcf] text-black "
              onClick={() => {
                statusHandler(selectedStatus, selectedApplicantId);
                setShowAlert(false);
              }}
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ApplicantsTable;
