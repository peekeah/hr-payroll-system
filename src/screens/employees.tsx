import { DataTable } from "@/components/data-table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  employeeColumns,
  employeeMockData,
  roleSelectMock,
  statusSelectMock
} from "@/mock";
import { SearchIcon } from "lucide-react";

const Employees = () => {

  return (
    <div className="p-5 space-y-5">
      {/* Cards */}
      <div className="flex gap-3 w-full justify-between">
        <div className="rounded-xl h-32 w-full bg-primary p-5">Left Card</div>
        <div className="rounded-xl h-32 w-full bg-primary p-5">Center Card</div>
        <div className="rounded-xl h-32 w-full bg-primary p-5">Right Card</div>
      </div>

      {/* Table */}
      <div className="flex justify-between py-5">
        <div className="text-2xl font-semibold">All Employees</div>
        <div className="flex gap-3">
          <div>
            <Input
              startIcon={SearchIcon}
              placeholder="Search employee"
              className="rounded-xl !focus:outline-none !focus:ring-2 !focus:ring-primary"
            />
          </div>
          <div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>All Status</SelectLabel>
                  <>
                    {
                      statusSelectMock?.map(status => (
                        <SelectItem
                          key={status.value}
                          value={status.value}
                        >{status.label}</SelectItem>
                      ))
                    }
                  </>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select>
              <SelectTrigger className="w-[220px]">
                <SelectValue placeholder="All Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>All Role</SelectLabel>
                  <>
                    {
                      roleSelectMock?.map(role => (
                        <SelectItem
                          key={role.value}
                          value={role.value}
                        >{role.label}</SelectItem>
                      ))
                    }
                  </>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <div>
        <DataTable
          columns={employeeColumns}
          data={employeeMockData}
        />
      </div>

    </div>
  );
};

export default Employees;
