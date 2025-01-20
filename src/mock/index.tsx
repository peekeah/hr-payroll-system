import { Checkbox } from "@/components/ui/checkbox";
import Chip from "@/components/chip";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown } from "lucide-react";

export const roleSelectMock = [
  { "label": "Senior Marketer", "value": "senior_marketer" },
  { "label": "Lead Designer", "value": "lead_designer" },
  { "label": "Product Manager", "value": "product_manager" },
  { "label": "Lead Marketer", "value": "lead_marketer" },
  { "label": "Lead Growth", "value": "lead_growth" },
  { "label": "Product Designer", "value": "product_designer" }
]

export const statusSelectMock = [
  { "label": "Active", "value": "active" },
  { "label": "Payroll Only", "value": "payroll_only" },
  { "label": "Invite Sent", "value": "invite_sent" }
]

export type Status = "active" | "payroll_only" | "intive_sent";
export const employeeColumns = [
  {
    accessorKey: "id",
    header: ({ table }) => (
      <span className="px-3">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        // className="m-5"
        />
      </span>
    ),
    cell: ({ row }) => (
      <span className="px-3">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        // className="m-5"
        />
      </span>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "employeeId",
    header: ({ table }) => (
      <Button
        className="text-lg flex w-full justify-between"
        variant={"ghost"}
      // onClick={() => table.toggleSorting(table.getIsSorted() === "asc")}
      >
        Employee ID
        <ChevronsUpDown />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="px-3 text-primary underline">
        {row.getValue("employeeId")}
      </span>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "employeeName",
    header: ({ column }) => (
      <Button
        className="text-lg flex w-full justify-between"
        variant={"ghost"}
      >
        Employee Name
        <ChevronsUpDown />
      </Button>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "employeeProfile",
    header: ({ column }) => (
      <Button
        className="text-lg flex w-full justify-between"
        variant={"ghost"}
      // onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Employee Profile
        <ChevronsUpDown />
      </Button>
    ),
    // cell: ({ row }) => (
    //   <span className="m-5">{row.getValue("employeeProfile")}</span>
    // ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <Button
        className="text-lg flex w-full justify-between"
        variant={"ghost"}
      // onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Employee Profile
        <ChevronsUpDown />
      </Button>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <Button
        className="text-lg flex w-full justify-between"
        variant={"ghost"}
      // onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <span>Role</span>
        <ChevronsUpDown />
      </Button>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <Button
        className="text-lg flex w-full justify-between"
        variant={"ghost"}
      // onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <span>Status</span>
        <ChevronsUpDown />
      </Button>
    ),
    cell: ({ row }: { row: any }) => {
      const value = row.getValue("status");
      return (
        <Chip status={value} />
      )
    },
    enableSorting: true,
    enableHiding: true,
  },
  // { accessorKey: "nationality", header: "Nationality" },
  // { accessorKey: "employmentType", header: "Employment Type" }
];

export interface Employee {
  employeeId: string;
  employeeProfile: string;
  email: string;
  role: "Senior Marketer" | "Lead Designer" | "Product Manager" | "Lead Marketer" | "Lead Growth" | "Product Designer";
  status: "active" | "payroll_only" | "invite_sent";
  nationality: string;
  employmentType: "Contract" | "Full-Time" | "Part-Time";
}
