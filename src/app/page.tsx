"use client";

import { useState } from "react";
import Sidebar from "@/components/sidebar";
import SearchUser from "@/assets/search-user.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import BulkUploadModal from "@/components/bulk-upload-modal";

import BulkUpload from "@/assets/bulk-upload.svg";
import AddEmployee from "@/assets/add-person.svg";
import { Separator } from "@/components/ui/separator";
import Employees from "@/screens/employees";

export default async function Home() {
  const [displayEmployees, setDisplayEmployees] = useState(true);

  return (
    <div className="flex h-screen w-screen">
      <div className="w-[300px] p-5">
        <Sidebar />
      </div>
      <Separator orientation="vertical" />
      <div className="flex-1 bg-slate-50">
        <div className="bg-white px-10 py-7 text-4xl font-bold">Employees</div>
        <Separator orientation="horizontal" />
        {
          displayEmployees ?
            <Employees /> :
            <div className="space-y-3 flex flex-col justify-center items-center border m-10 p-14 rounded-2xl bg-white">
              <div>
                <Image
                  src={SearchUser}
                  alt="Search User"
                  width={300}
                />
              </div>
              <div className="text-4xl font-semibold">Start Building Your own team</div>
              <div className="text-lg">Add your first member or import your entire team.</div>
              <div className="flex gap-3 py-5">
                <BulkUploadModal />
                <Button className="flex gap-2 rounded-lg">
                  <Image color="blue" className="text-blue-300" src={AddEmployee} alt="Add Employee" />
                  Add Employee</Button>
              </div>
            </div>
        }
      </div>
    </div>
  );
}
