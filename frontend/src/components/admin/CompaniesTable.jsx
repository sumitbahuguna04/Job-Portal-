import React, { use, useDebugValue, useEffect, useState } from "react";
import {
  Table,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from "../ui/table";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../ui/button";

function CompaniesTable() {
  useGetAllCompanies();
  const [isinput, setisinput] = useState();

  const navigate = useNavigate();
  const { companies, seachbycompany } = useSelector((store) => store.company);
  const [filterCompany, setFilterCompany] = useState(companies);

  useEffect(() => {
    const filteredCompany =
      companies.length >= 0 &&
      companies.filter((company) => {
        if (!seachbycompany) {
          return true;
        }

        return company?.name
          ?.toLowerCase()
          .includes(seachbycompany.toLowerCase());
      });

    setFilterCompany(filteredCompany);
  }, [companies, seachbycompany]);

  return (
    <div className="rounded-2xl p-5 mt-10 bg-[#030712] border border-[#2b384a]">
      <Table className="min-w-[700px]">
        <TableCaption className={"text-gray-400"}>
          A list of your recently registered companies
        </TableCaption>
        <TableHeader className="text-gray-400">
          <TableRow>
            <TableHead>Company Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Listed Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="">
          {filterCompany && filterCompany.length > 0 ? (
            filterCompany.map((company) => (
              <TableRow className="" key={company._id}>
                <TableCell>
                  <Avatar>
                    <AvatarImage
                      src={company?.logo || "https://via.placeholder.com/40"}
                      className="w-12 h-12  rounded-4xl object-cover"
                    />
                  </Avatar>
                </TableCell>
                <TableCell>{company.name}</TableCell>
                <TableCell>
                  {new Date(company.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="cursor-pointer" />
                    </PopoverTrigger>
                    <PopoverContent className="bg-[#282a30]  border  border-[#42454b]  w-30 h-14  rounded-md">
                      <Button
                        onClick={() =>
                          navigate(`/admin/comapnies/${company._id}`)
                        }
                        className="flex hover:underline items-center cursor-pointer gap-2 w-fit pl-3 pt-2"
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </Button>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow className="border border-gray-500">
              <TableCell colSpan={4} className="text-center">
                No companies found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default CompaniesTable;
