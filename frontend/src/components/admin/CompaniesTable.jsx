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
   <div className="rounded-xl p-5 bg-[#282A36] border border-[#31353b]  shadow-lg">
      <Table className="min-w-[700px]">
        <TableCaption className="text-gray-400">
          A list of your recently registered companies
        </TableCaption>

     
        <TableHeader>
          <TableRow className="border-b border-[#3d4046]">
            <TableHead className="text-gray-300">Logo</TableHead>
            <TableHead className="text-gray-300">Name</TableHead>
            <TableHead className="text-gray-300">Listed Date</TableHead>
            <TableHead className="text-right text-gray-300">Action</TableHead>
          </TableRow>
        </TableHeader>

       
        <TableBody>
          {filterCompany && filterCompany.length > 0 ? (
            filterCompany.map((company) => (
              <TableRow
                key={company._id}
                className="hover:bg-[#323443] transition duration-200"
              >
                <TableCell>
                  <Avatar>
                    <AvatarImage
                      src={company?.logo || "https://via.placeholder.com/40"}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium text-white">
                  {company.name}
                </TableCell>
                <TableCell className="text-gray-400">
                  {new Date(company.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="cursor-pointer text-gray-300 hover:text-white" />
                    </PopoverTrigger>
                    <PopoverContent className="bg-[#2a2b37] border border-[#42454b] w-32 mx-2 sm:mx-1 p-2 rounded-md">
                      <Button
                        onClick={() =>
                          navigate(`/admin/comapnies/${company._id}`)
                        }
                        className="flex items-center gap-2 w-full text-sm text-white bg-[#8760D4] hover:bg-[#926ae1] transition rounded-md py-2"
                      >
                        <Edit2 className="w-4" />
                        Edit
                      </Button>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center text-gray-400 py-6"
              >
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
