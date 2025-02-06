import * as React from "react";

import { cn } from "@/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
  variant?: "default" | "underlined" | "white";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          `flex h-9 w-full ${
            variant === "underlined"
              ? "border-b-[1px] rounded-none text-gray1 outline-none bg-transparent"
              : "outline-none rounded-md focus:border focus:border-input bg-transparent px-3 py-1 shadow-sm"
          } ${
            variant === "white" && "bg-white focus:border focus:border-black"
          } text-base file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`,
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
