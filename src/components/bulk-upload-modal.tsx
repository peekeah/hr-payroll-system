"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "./ui/button";
import Image from "next/image";

import Download from "@/assets/download.svg";
import Files from "@/assets/files.png";
import Excel from "@/assets/excel-logo.png";
import { Dispatch, SetStateAction } from "react";

interface Props {
  file: File | null | undefined;
  setFile: Dispatch<SetStateAction<File | undefined | null>>
  onClose: () => void;
  openModal: boolean;
  submitAction: (file: File) => void
}

const BulkUploadModal = ({ file, setFile, onClose, openModal, submitAction }: Props) => {

  const handleFileUpload = async () => {
    try {
      if (!file) return;
      submitAction(file)
    } catch (err) {
      console.log("err", err)
    }
  }

  const downloadTemplate = () => {
    const uri = "./bulk-upload-template.xlsx";
    const link = document.createElement("a");
    link.href = uri;
    link.download = "bulk-upload-template.xlsx"
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onClose();
  }

  return (
    <Dialog open={openModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload file</DialogTitle>
          <DialogDescription>
          </DialogDescription>
        </DialogHeader>
        <div>
          <input
            type="file"
            id="file"
            className="hidden"
            onChange={(e) => setFile(e?.target?.files?.[0])}
          />
          <label htmlFor="file" className="cursor-pointer">
            <div className="h-48 bg-secondary-light border-2 border-primary rounded-xl border-dashed flex flex-col items-center justify-center">
              <Image
                src={Files}
                alt="File upload"
                width={64}
              />
              {
                !file ?
                  <div className="text-sm text-center bg-muted">Drag and drop your file here<br />
                    or <span className="underline">click to upload</span>
                  </div> :
                  <div>{file?.name}</div>
              }
            </div>

          </label>
          <div className="flex justify-between py-1">
            <div className="text-xs text-gray-700">Supported Formats: XLS, CSV</div>
            <div className="text-xs text-gray-700">Maximum file size: 25MB</div>
          </div>
          <div className="flex items-center gap-3 bg-secondary-light rounded-lg p-3 my-5">
            <div>
              <Image
                src={Excel}
                alt="Excel"
                width={64}
              />
            </div>
            <div>
              <div className="font-bold text-sm pb-1">Table Example</div>
              <div className="text-xs">You can download the attached example and use them as a starting point for your own file.</div>
            </div>
            <Button
              variant={"outline"}
              className="rounded-xl"
              onClick={downloadTemplate}
            >
              <Image
                src={Download}
                alt="Download"
                width={16}
                className="ml-1"
              />
              Download XLSX</Button>
          </div>
          <div className="py-3 flex justify-end gap-3">
            <Button
              variant={"outline"}
              className="rounded-xl"
              onClick={onClose}
            >Cancel</Button>
            <Button
              className="rounded-xl"
              onClick={handleFileUpload}
            >Continue</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default BulkUploadModal;
