"use client";

import { BarChart } from "@/components/charts/bar";
import { DonutChart } from "@/components/charts/donut";
import { RadialChart } from "@/components/charts/radial";
import { DataTable } from "@/components/data-table";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Employee,
  employeeColumns,
  roleSelectMock,
  statusSelectMock
} from "@/mock";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";

const fetchData = async () => {
  const res = await fetch("/api/employee/stats")
  const resData = await res.json();

  return resData?.data
}

const Employees = ({ employees }: { employees: Employee[] }) => {
  const [employeesStats, setEmployeeStats] = useState<any | null>(null);

  useEffect(() => {
    fetchData().then((stats) => {
      setEmployeeStats(stats);
    })
  }, [])

  return (
    <div className="p-5 space-y-5">
      {/* Cards */}
      <div className="flex gap-3 w-full">
        <Card className="border-0 max-w-[180px] bg-secondary-light rounded-xl p-5 flex flex-col justify-between">
          <div className="flex justify-between">
            <div>
              <div className="text-muted pb-3">Nationality</div>
              <div>
                <div className="text-4xl font-bold pt-5">{employeesStats?.totalCount}</div>
                <div className="text-lg">Singporeans</div>
              </div>
            </div>
            <div>
              <DonutChart
                data={employeesStats?.nationality}
              />
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <div className="flex gap-3 items-center">
              <div className="w-2 h-8 rounded-full bg-primary"></div>
              <div>{employeesStats?.nationality?.singaporean}</div>
              <div >Singaporean</div>
            </div>
            <div className="flex gap-3 items-center">
              <div className="w-2 h-8 rounded-full bg-primary"></div>
              <div className="text-lg">{employeesStats?.nationality?.PR}</div>
              <div>PR</div>
            </div>
            <div className="flex gap-3 items-center">
              <div className="w-2 h-8 rounded-full bg-secondary"></div>
              <div className="text-lg">{employeesStats?.nationality?.foreigners}</div>
              <div>Foreigner</div>
            </div>
            <div className="flex gap-3 items-center">
              <div className="w-2 h-8 rounded-full bg-primary"></div>
              <div className="text-lg">{employeesStats?.nationality?.Others}</div>
              <div>Others</div>
            </div>
          </div>
        </Card>
        <Card className="border-0 rounded-xl min-w-[250px] flex-1 bg-secondary-light p-5 flex flex-col justify-between">
          <div>
            <div className="text-muted pb-3">Employment Type</div>
            <div>
              <div className="text-4xl font-bold pt-5">{employeesStats?.totalCount}</div>
              <div className="text-lg">Full Timers</div>
            </div>
            <BarChart
              data={employeesStats?.employmentType}
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            <div className="flex gap-3 items-center">
              <div className="w-2 h-8 rounded-full bg-primary"></div>
              <div>{employeesStats?.employmentType?.FULL_TIME}</div>
              <div >Full Timers</div>
            </div>
            <div className="flex gap-3 items-center">
              <div className="w-2 h-8 rounded-full bg-primary"></div>
              <div className="text-lg">{employeesStats?.employmentType?.PART_TIME}</div>
              <div>Part Timers</div>
            </div>
            <div className="flex gap-3 items-center">
              <div className="w-2 h-8 rounded-full bg-secondary"></div>
              <div className="text-lg">{employeesStats?.employmentType?.CONTRACT}</div>
              <div>Contract</div>
            </div>
            <div className="flex gap-3 items-center">
              <div className="w-2 h-8 rounded-full bg-primary"></div>
              <div className="text-lg">{employeesStats?.employmentType?.INTERN || 0}</div>
              <div>Interns</div>
            </div>
          </div>

        </Card>
        <Card className="rounded-xl border-0 max-w-[200px] bg-secondary-light p-5 flex flex-col justify-between">
          <div className="flex justify-between">
            <div>
              <div className="text-muted pb-3">Employee Status</div>
              <div>
                <div className="text-4xl font-bold pt-5">{employeesStats?.status?.ACTIVE}</div>
                <div className="text-lg">Active Employees</div>
              </div>
            </div>
            <div>
              <RadialChart
                data={employeesStats?.status}
              /></div>
          </div>

          <div className="flex gap-2 flex-wrap">
            <div className="flex gap-3 items-center">
              <div className="w-2 h-8 rounded-full bg-primary"></div>
              <div>{employeesStats?.status?.ACTIVE}</div>
              <div>Active</div>
            </div>
            <div className="flex gap-3 items-center">
              <div className="w-2 h-8 rounded-full bg-primary"></div>
              <div className="text-lg">{employeesStats?.status?.INVITE_SENT}</div>
              <div>Invite Sent</div>
            </div>
            <div className="flex gap-3 items-center">
              <div className="w-2 h-8 rounded-full bg-secondary"></div>
              <div className="text-lg">{employeesStats?.status?.PAYROLL_ONLY}</div>
              <div>Payroll Only</div>
            </div>
          </div>
        </Card>
      </div >

      {/* Table */}
      < div className="flex justify-between py-5" >
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
      <div className="">
        <DataTable
          columns={employeeColumns}
          data={employees}
        />
      </div>
    </div>
  );
};

export default Employees;
