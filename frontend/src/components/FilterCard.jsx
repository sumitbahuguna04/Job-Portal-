import { Label } from "@radix-ui/react-label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
const filterData = [
  {
    filterType: "Location",
    array: [
      "Delhi NCR",
      "Bangalore",
      "Hyderabad",
      "Mumbai",
      "Pune",
      "Noida",
      "Gurugram",
    ],
  },
  {
    filterType: "Industry",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "Data Science",
      "Technical Support",
    ],
  },
  {
    filterType: "Salary",
    array: ["10-40k", "42-60k", "64-90k", "90k-1lakh"],
  },
];

function FilterCard() {
  const { searchedQuery } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  const { allJobs } = useSelector((store) => store.job);
  const [Radiovalue, setRadiovalue] = useState("");
  const changeHandler = (val) => {
    setRadiovalue(val);
  };
  useEffect(() => {
    dispatch(setSearchedQuery(Radiovalue));
    console.log(searchedQuery);
  },[Radiovalue]);

  return (
       <div className="text-white  cursor-pointer w-80 sm:w-60 p-3 rounded-md bg-[#22232e] border border-[#3d4046]">
      <div>
        <h1 className="font-bold text-xl">Filter Jobs</h1>
        <hr className="mt-3" />
        <RadioGroup value={Radiovalue} onValueChange={changeHandler}>
          {filterData.map((category, catIdx) => (
            <div key={catIdx}>
              <h1 className="font-bold mt-4">{category.filterType}</h1>
              {category.array.map((option, optIdx) => {
                const id = `${catIdx}-${optIdx}`;
                return (
                  <div key={id} className="flex items-center space-x-2 my-2">
                    <RadioGroupItem
                      id={id}
                      value={option}
                      className="cursor-pointer"
                    />
                    <Label htmlFor={id}>{option}</Label>
                  </div>
                );
              })}
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}

export default FilterCard;
