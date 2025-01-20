import Image from "next/image"
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { ReactNode } from "react";
import { Progress } from "@/components/ui/progress"

import Logo from "@/assets/logo.png";
import Company from "@/assets/company.svg";
import DashboardIcon from "@/assets/home.svg";
import Employees from "@/assets/people.svg";
import Payroll from "@/assets/payroll.svg";
import Leaves from "@/assets/leaves.svg";
import More from "@/assets/more.svg";
import Notification from "@/assets/notification.svg";
import Wallet from "@/assets/wallet.svg";
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils";

interface NavProps {
  name: string | ReactNode;
  icon: StaticImport;
  isActive?: boolean;
  className?: string;
}

const Navlink = (props: NavProps): ReactNode => {

  const { name, icon, isActive = false, className } = props;

  return (
    <div className={
      cn("flex gap-3 cursor-pointer px-5 py-3 rounded-xl w-full",
        className,
        isActive ?
          "border bg-secondary-light" : ""
      )
    }>
      <Image
        src={icon}
        alt={typeof name === "string" ? name : ""}
        height={24}
      />
      <div className={
        cn("flex items-center flex-1",
          isActive ? "font-semibold" : ""
        )
      }>{name}</div>
    </div>
  )
}

const Sidebar = () => {
  return (
    <div className="flex flex-col justify-between h-full">
      <div className="space-y-3">
        <div className="flex gap-3 w-full items-center">
          <Image src={Logo}
            alt="logo"
            height={32}
          />
          <div className="text-2xl font-bold flex items-center"><span>Kelick</span></div>
        </div>
        <Navlink name={"Dashboard"} icon={DashboardIcon} />

        <div>
          <div className="uppercase pb-3">Organization</div>
          <Navlink name={"Kelick"} icon={Company} />
        </div>
        <div className="space-y-3">
          <div className="uppercase pb-3">Manage</div>
          <Navlink
            isActive
            name={"Employees"}
            icon={Employees}
          />
          <Navlink name={"Payroll"} icon={Payroll} />
          <Navlink name={"Leaves"} icon={Leaves} />
          <Navlink name={"Claim"} icon={Payroll} />
          <Navlink name={"More"} icon={More} />
        </div>
      </div>


      <div>
        <Separator />
        <div className="space-y-3">
          <div className="py-5 space-y-3">
            <Navlink name={"Free plan"} icon={Wallet} />
            <div className="px-5">
              <div className="pb-2">1/10 Employees</div>
              <div><Progress value={20} /></div>
            </div>
          </div>

          <Separator />

          <div className="space-y-3 py-3">
            <Navlink
              className="w-full"
              name={
                <div className="w-full flex items-center justify-between">
                  <span>Notifications</span>
                  <span className="h-2 w-2 bg-[hsla(0,100%,70%,1)] rounded"></span>
                </div>
              }
              icon={Notification}
            />
            <div className="flex gap-5 items-center p-3">
              <Avatar>
                <AvatarImage src="https://avatars.githubusercontent.com/u/59255732?v=4" />
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
              <div>
                <div>Jhon Doe</div>
                <div className="text-gray-400">jhondoe@asure.pro</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar;
