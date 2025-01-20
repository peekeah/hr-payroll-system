import { cn } from "@/lib/utils";

type Status = "ACTIVE" | "PAYROLL_ONLY" | "INVITE_SENT";

interface ChipProps {
  status: Status;
}

const config = {
  ACTIVE: {
    name: "Active",
    color: "hsl(177,98%,37%)",
    backgroundColor: "hsl(176,100%,94%)",
  },
  PAYROLL_ONLY: {
    name: "Payroll Only",
    color: "hsl(180,5%,39%)",
    backgroundColor: "hsl(210,40%,96%)"
  },
  INVITE_SENT: {
    name: "Invite Sent",
    color: "hsl(271,81%,50%)",
    backgroundColor: "hsl(270,100%,95%)"
  },
};

const Chip = ({ status }: ChipProps) => {

  const { name, color, backgroundColor } = config[status];
  console.log("cc:", status, { name, color, backgroundColor })

  return (
    <div
      className={
        cn(
          `w-fit h-fit flex items-center gap-3 px-5 py-1 rounded-full bg-[${backgroundColor}]`
        )
      }
      style={{
        backgroundColor: backgroundColor,
      }}
    >
      <span className={
        cn(
          `h-2 w-2 rounded-full bg-[${color}]`
        )
      }
        style={{
          backgroundColor: color,
        }}
      ></span>
      <span
        className={cn(
          `flex-1 text-${color}`
        )}
        style={{
          color: color,
        }}
      >{name}</span>
    </div >
  )
}

export default Chip;
