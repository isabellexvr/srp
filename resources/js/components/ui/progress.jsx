import * as React from "react";
import { cn } from "@/lib/utils";

const Progress = React.forwardRef(({ 
  className, 
  value = 0, 
  ...props 
}, ref) => {
  const percentage = Math.min(Math.max(value, 0), 100);
  
  return (
    <div
      ref={ref}
      className={cn(
        "relative h-3 w-full overflow-hidden rounded-full bg-gray-200",
        className
      )}
      {...props}
    >
      <div
        className="h-full bg-blue-600 transition-all duration-500 ease-out rounded-full"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
});

Progress.displayName = "Progress";

export { Progress };