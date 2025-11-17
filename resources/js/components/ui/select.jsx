// components/ui/simple-select.jsx
import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

const Select = ({ 
    value, 
    onValueChange, 
    options = [], 
    placeholder = "Selecione...",
    className,
    error
}) => {
    const [open, setOpen] = React.useState(false);
    const containerRef = React.useRef(null);

    // Fechar dropdown ao clicar fora
    React.useEffect(() => {
        if (!open) return;
        
        function handleClickOutside(event) {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setOpen(false);
            }
        }
        
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [open]);

    const selectedOption = options.find(opt => String(opt.value) === String(value));

    return (
        <div className="relative" ref={containerRef}>
            {/* Trigger */}
            <button
                type="button"
                className={cn(
                    "flex h-10 w-full items-center justify-between rounded-md border bg-white px-3 py-2 text-sm transition-colors",
                    "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
                    error 
                        ? "border-red-500 focus:ring-red-500 focus:border-red-500" 
                        : "border-gray-300",
                    "disabled:cursor-not-allowed disabled:opacity-50",
                    className
                )}
                onClick={() => setOpen(!open)}
            >
                <span className={cn(
                    "truncate",
                    !value && "text-gray-500"
                )}>
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown */}
            {open && (
                <div className="absolute z-50 w-full mt-1 max-h-60 overflow-auto rounded-md border border-gray-200 bg-white py-1 text-sm shadow-lg animate-in fade-in-80">
                    {options.map((option) => (
                        <div
                            key={option.value}
                            className={cn(
                                "cursor-pointer px-3 py-2.5 transition-colors",
                                "hover:bg-gray-50 focus:bg-blue-50 focus:text-blue-900",
                                String(value) === String(option.value) && "bg-blue-50 text-blue-900"
                            )}
                            onClick={() => {
                                onValueChange(option.value);
                                setOpen(false);
                            }}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export { Select };