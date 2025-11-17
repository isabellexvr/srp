import * as React from "react";
import { cn } from "@/lib/utils";

const RadioGroupContext = React.createContext(null);

const RadioGroup = React.forwardRef(({ value, onValueChange, className, ...props }, ref) => {
  return (
    <RadioGroupContext.Provider value={{ value, onValueChange }}>
      <div ref={ref} className={cn("grid gap-2", className)} {...props} />
    </RadioGroupContext.Provider>
  );
});
RadioGroup.displayName = "RadioGroup";

const RadioGroupItem = React.forwardRef(({ className, value, ...props }, ref) => {
  const { value: selectedValue, onValueChange } = React.useContext(RadioGroupContext);

  return (
    <button
      ref={ref}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        selectedValue === value && "bg-primary",
        className
      )}
      onClick={() => onValueChange(value)}
      {...props}
    >
      {selectedValue === value && (
        <div className="h-2 w-2 rounded-full bg-primary-foreground m-auto" />
      )}
    </button>
  );
});
RadioGroupItem.displayName = "RadioGroupItem";

export { RadioGroup, RadioGroupItem };