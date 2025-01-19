import { cn } from "@/lib/utils";

type Status = "active" | "payroll_only" | "invite_sent";

interface ChipProps {
  status: Status;
}

const config = {
  active: {
    name: "Active",
    color: "primary",
    backgroundColor: "primary-light"
  },
  payroll_only: {
    name: "Payroll Only",
    color: "secondary",
    backgroundColor: "secondary-light"
  },
  invite_sent: {
    name: "Invite Sent",
    color: "accent",
    backgroundColor: "accent-light"
  },
};

const Chip = ({ status }: ChipProps) => {

  const { name, color, backgroundColor } = config[status];
  console.log("value:", name, `text-${color}`, `bg-${backgroundColor}`);

  return (
    <div
      className={
        cn(
          "w-fit h-fit flex items-center gap-3 px-5 py-2 rounded-full",
          `bg-${backgroundColor}`
        )
      }>
      <span className={
        cn(
          "h-2 w-2 rounded-full",
          `bg-${color}`
        )
      }></span>
      <span className={
        cn("font-semibold flex-1",
          `text-${color} `
        )
      }>{name}</span>
    </div >
  )
}

export default Chip;
