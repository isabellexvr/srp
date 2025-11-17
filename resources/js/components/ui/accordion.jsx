import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const Accordion = ({ 
  className, 
  children, 
  ...props 
}) => {
  return (
    <div className={cn("w-full space-y-2", className)} {...props}>
      {children}
    </div>
  );
};

const AccordionItem = React.forwardRef(({ 
  className, 
  children, 
  ...props 
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "border border-gray-200 rounded-lg bg-white overflow-hidden",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef(({ 
  className, 
  children, 
  onClick,
  isOpen,
  ...props 
}, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        "flex w-full items-center justify-between p-4 font-medium text-left",
        "transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500",
        "text-gray-900 text-base",
        isOpen ? "bg-gray-50 border-b border-gray-200" : "",
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
      <ChevronDown 
        className={cn(
          "h-5 w-5 shrink-0 text-gray-500 transition-transform duration-200",
          isOpen && "rotate-180 transform"
        )} 
      />
    </button>
  );
});
AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = React.forwardRef(({ 
  className, 
  children, 
  isOpen,
  ...props 
}, ref) => {
  const contentRef = React.useRef(null);
  const [maxHeight, setMaxHeight] = React.useState(0);

  React.useEffect(() => {
    if (contentRef.current) {
      setMaxHeight(contentRef.current.scrollHeight);
    }
  }, [children]);

  return (
    <div
      ref={ref}
      className="transition-all duration-300 ease-in-out overflow-hidden"
      style={{
        maxHeight: isOpen ? `${maxHeight}px` : '0px'
      }}
      {...props}
    >
      <div 
        ref={contentRef}
        className={cn("p-4 pt-0", className)}
      >
        {children}
      </div>
    </div>
  );
});
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };