import { useNavigate } from "react-router-dom";

type HeaderButtonsProps = {
  icon?: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  path: string;
}



export function CompanyButton({ icon, children, variant = "primary", path }: HeaderButtonsProps) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(path)}
      data-variant={variant}
      className="data-[variant=primary]:bg-blue-500 data-[variant=secondary]:bg-blue-900 flex gap-2 items-center leading-none py-1 px-2 rounded-xs text-xs font-semibold">
      {
        icon && <img src={icon} alt="Gold Icon" />
      }
      {children}
    </button>
  )
}
