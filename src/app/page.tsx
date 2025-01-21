"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/sidebar";
import SearchUser from "@/assets/search-user.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import BulkUploadModal from "@/components/bulk-upload-modal";

import BulkUpload from "@/assets/bulk-upload.svg";
import AddEmployee from "@/assets/add-person.svg";
import { Separator } from "@/components/ui/separator";
import Employees from "@/screens/employees";
import { ArrowDownToLine, CircleCheck, CircleX, UserRoundPlus } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Spinner } from "@/components/ui/spinner";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface BulkUploadResponse {
  success: boolean;
  message: string;
  data: any;
}

const fetchData = async () => {
  try {
    const res = await fetch("/api/employee")
    const resData = await res.json();
    return resData?.data;
  } catch (err) {
    console.log("error while fetching data:", err)
    throw err;
  }
}

async function bulkUpload(file: File): Promise<BulkUploadResponse> {
  const payload = new FormData();
  payload.set("file", file);

  const config = {
    method: "POST",
    body: payload
  };

  const res = await fetch("/api/employee/bulk-upload", config)
  if (!res.ok) {
    throw new Error("Something went wrong")
  }
  return res.json();
}

export default function Home() {
  const [openModal, setOpenModal] = useState(false);
  const [file, setFile] = useState<File | undefined | null>(null);

  const { data: employees, refetch, isLoading: employeeLoading, isError: emloyeeError } = useQuery({
    queryKey: ['employees'],
    queryFn: fetchData
  })

  const { toast } = useToast();

  const { mutate, isPending, isError } =
    useMutation({
      mutationFn: (file: File) => bulkUpload(file), // Fix mutation function
      onSuccess: () => {
        setOpenModal(false);
        setFile(null);
        refetch();
        toast({
          description:
            <div className="text-lg flex items-center gap-3">
              <CircleCheck />
              Employees added successfully
            </div>
        })
      },
      onError: (error: Error) => {
        console.log("err while uploading", error)
        setOpenModal(false);
        setFile(null);
        toast({
          variant: "destructive",
          description:
            <div className="text-lg flex items-center gap-3">
              <CircleX />
              Error while adding employees
            </div>
        })
      },
    });

  useEffect(() => {
    fetchData();
  }, [])

  const handleExport = async () => {
    try {
      const response = await fetch('/api/employee/download-report', {
        method: 'GET',
        headers: {
          'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = 'employee-report.xlsx';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(downloadUrl);

      toast({
        description:
          <div className="text-lg flex items-center gap-3">
            <CircleCheck />
            Report saved successfully
          </div>
      })
    } catch (error) {
      console.error('Error downloading file:', error);
      toast({
        variant: "destructive",
        description:
          <div className="text-lg flex items-center gap-3">
            <CircleX />
            Error while saving report
          </div>
      })
    }
  };

  const isLoading = (employeeLoading && !emloyeeError) || (isPending && !isError);

  return (
    <div className="flex h-screen w-screen">
      <div className="w-[300px] p-5">
        <Sidebar />
      </div>
      <Separator orientation="vertical" />
      {
        isLoading ?
          <div className="w-full h-full grid place-content-center">
            <Spinner
              className="h-24 w-24"
            />
          </div> :
          <div className="flex-1 bg-slate-50 overflow-y-auto">
            <div className="sticky bg-white z-10 top-0 w-full bg-white flex justify-between items-center">
              <div className="px-10 py-7 text-4xl font-bold">Employees</div>
              <div className={
                cn("flex gap-3 mx-5",
                  !employees?.length ? "hidden" : ""
                )
              }>
                <Button
                  className="rounded-xl p-3"
                >
                  <UserRoundPlus />
                  Add Employee</Button>
                <Button
                  variant={"outline"}
                  className="rounded-xl p-3"
                  onClick={handleExport}
                >
                  <ArrowDownToLine />
                  Export</Button>
              </div>
            </div>
            <Separator orientation="horizontal" />
            <div>
              {
                employees?.length ?
                  (
                    <Employees
                      employees={employees}
                    />
                  ) :
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

                      <Button className="flex gap-2 rounded-lg"
                        variant={"outline"}
                        onClick={() => setOpenModal(true)}
                      >
                        <Image
                          src={BulkUpload}
                          alt="Bulk Uplaod"
                        />
                        Bulk Upload</Button>
                      {
                        openModal ?
                          <BulkUploadModal
                            file={file}
                            setFile={setFile}
                            submitAction={mutate}
                            openModal={openModal}
                            onClose={() => {
                              setOpenModal((false))
                              setFile(null)
                            }}
                          /> : null
                      }
                      <Button className="flex gap-2 rounded-lg">
                        <Image color="blue" className="text-blue-300" src={AddEmployee} alt="Add Employee" />
                        Add Employee</Button>
                    </div>
                  </div>
              }
            </div>
          </div>

      }
    </div >
  );
}
