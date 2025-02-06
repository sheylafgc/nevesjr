import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  LeftComponent?: React.ReactElement;
  divProps?: string;
  withEye?: boolean;
  onShow?: () => void;
}

export default function InputText({
  label,
  LeftComponent,
  withEye,
  onShow,
  type = "text",
  divProps,
  ...rest
}: InputProps) {
  return (
    <div className={`grid w-full items-center ${divProps}`}>
      <Label htmlFor="search">{label}</Label>
      <div className="relative">
        {LeftComponent && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            {LeftComponent}
          </div>
        )}
        <Input
          id="search"
          className={`${LeftComponent && "pl-10"} bg-white`}
          {...rest}
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          {withEye ? (
            type === "password" ? (
              <i onClick={onShow} className="pi pi-eye cursor-pointer" />
            ) : (
              <i onClick={onShow} className="pi pi-eye-slash cursor-pointer" />
            )
          ) : null}
        </div>
      </div>
    </div>
  );
}
