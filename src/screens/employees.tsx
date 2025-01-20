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
  statusSelectMock
} from "@/mock";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";

const fetchData = async () => {
  const res = await fetch("/api/employee/stats")
  const resData = await res.json();

  return resData?.data
}

const filterData = (employees: Employee[], searchText: string, filterStatus: string, filterRole: string) => {
  if (searchText) {
    employees = employees.filter(el =>
      el.employeeName.toLowerCase().includes(searchText.toLowerCase()) ||
      el.employeeId.toLowerCase().includes(searchText.toLowerCase())
    )
  }
  if (filterStatus) {
    employees = employees.filter(el => el.status.toLocaleLowerCase() === filterStatus)
  }
  if (filterRole) {
    employees = employees.filter(el => el.role === filterRole)
  }
  return employees;
}

type SelectOption = { label: string, value: string };
const Employees = ({ employees }: { employees: Employee[] }) => {
  const [searchText, setSearchText] = useState<string>("");
  const [employeesStats, setEmployeeStats] = useState<any | null>(null);
  const [filterRole, setFilterRole] = useState<string>("")
  const [filterStatus, setFilterStatus] = useState<string>("")
  const filteredEmployees = filterData(employees, searchText, filterStatus, filterRole)

  useEffect(() => {
    fetchData().then((stats) => {
      setEmployeeStats(stats);
    })
  }, [])

  const roleSet: Set<string> = new Set();
  employees.forEach(el => {
    roleSet.add(el.role)
  })

  const roleOptions: SelectOption[] = [];

  roleSet.forEach(role => {
    if (role) {
      roleOptions.push({
        label: role,
        value: role
      })
    }
  })

  return (
    <div className="p-7 space-y-5">
      {/* Cards */}
      <div className="flex flex gap-5 w-full">
        <Card className="border-0 w-[25%] bg-white p-5 flex flex-col justify-between">
          <div className="flex justify-between">
            <div>
              <div className="text-gray text-lg">Nationality</div>
              <div>
                <div className="text-5xl font-bold pt-4">{employeesStats?.nationality?.singaporean}</div>
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
        <Card className="border-0 rounded-xl w-[45%] flex-1 bg-white p-5 flex flex-col justify-between">
          <div>
            <div className="text-gray">Employment Type</div>
            <div>
              <div className="text-5xl font-bold pt-4">{employeesStats?.totalCount}</div>
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
        <Card className="rounded-xl border-0 w-[30%] bg-white p-5 flex flex-col justify-between">
          <div className="flex justify-between">
            <div>
              <div className="text-gray">Employee Status</div>
              <div>
                <div className="text-5xl font-bold pt-4">{employeesStats?.status?.ACTIVE}</div>
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
      <div>
        <div className="flex justify-between py-5">
          <div className="text-2xl font-semibold">All Employees</div>
          <div className="flex gap-3">
            <div>
              <Input
                startIcon={SearchIcon}
                placeholder="Search employee"
                className="rounded-xl !focus:outline-none !focus:ring-2 !focus:ring-primary"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
            <div>
              <Select
                value={filterStatus}
                onValueChange={(val) => setFilterStatus(val)}
              >
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
              <Select
                value={filterRole}
                onValueChange={(val) => setFilterRole(val)}
              >
                <SelectTrigger className="w-[220px]">
                  <SelectValue placeholder="All Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>All Role</SelectLabel>
                    <>
                      {
                        roleOptions?.map(role => (
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
        <DataTable
          columns={employeeColumns}
          data={filteredEmployees}
        />
      </div>
    </div>
  );
};

export default Employees;
