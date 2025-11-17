// components/ui/sidebar.jsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { VariantProps, cva } from "class-variance-authority";
import { PanelLeft } from "lucide-react";

import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const SIDEBAR_COOKIE_NAME = "sidebar:state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

const SidebarContext = React.createContext(null);

function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }
  return context;
}

const SidebarProvider = React.forwardRef(({ children, defaultOpen = true, open: openProp, onOpenChange: setOpenProp, ...props }, ref) => {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = React.useState(false);

  const open = openProp ?? openMobile;
  const setOpen = React.useCallback((value) => {
    if (setOpenProp) {
      setOpenProp(value);
    } else {
      setOpenMobile(value);
    }
  }, [setOpenProp]);

  const toggleSidebar = React.useCallback(() => {
    return setOpen(!open);
  }, [open, setOpen]);

  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggleSidebar();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);

  const state = open ? "expanded" : "collapsed";

  return React.createElement(SidebarContext.Provider, { value: { open, setOpen, toggleSidebar, state, isMobile } }, children);
});
SidebarProvider.displayName = "SidebarProvider";

const Sidebar = React.forwardRef(({ side = "left", variant = "sidebar", collapsible = "offcanvas", className, children, ...props }, ref) => {
  const { isMobile, state } = useSidebar();

  if (isMobile) {
    return React.createElement(SidebarProvider, null, children);
  }

  return React.createElement("div", {
    ref: ref,
    "data-state": state,
    "data-side": side,
    "data-variant": variant,
    "data-collapsible": collapsible,
    className: cn("flex h-full flex-col bg-sidebar text-sidebar-foreground", className),
    style: {
      "--sidebar-width": SIDEBAR_WIDTH,
      "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
    },
    ...props
  }, children);
});
Sidebar.displayName = "Sidebar";

const SidebarTrigger = React.forwardRef(({ className, ...props }, ref) => {
  const { toggleSidebar } = useSidebar();

  return React.createElement(Button, {
    ref: ref,
    "data-sidebar": "trigger",
    variant: "ghost",
    size: "icon",
    className: cn("h-7 w-7", className),
    onClick: toggleSidebar,
    ...props
  }, React.createElement(PanelLeft, { className: "h-4 w-4" }));
});
SidebarTrigger.displayName = "SidebarTrigger";

const SidebarRail = React.forwardRef(({ className, ...props }, ref) => {
  const { toggleSidebar } = useSidebar();

  return React.createElement("button", {
    ref: ref,
    "data-sidebar": "rail",
    "aria-label": "Toggle Sidebar",
    tabIndex: -1,
    onClick: toggleSidebar,
    className: cn("absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-sidebar-border group-data-[side=left]:-right-4 group-data-[side=right]:-left-4 sm:flex [&:after]:hover:scale-100 [[data-state=collapsed]_&]:after:scale-0 [[data-state=collapsed][data-side=left]_&]:cursor-w-resize [[data-state=collapsed][data-side=right]_&]:cursor-e-resize", className),
    ...props
  });
});
SidebarRail.displayName = "SidebarRail";

const SidebarInset = React.forwardRef(({ className, ...props }, ref) => {
  return React.createElement("main", {
    ref: ref,
    className: cn("flex min-h-svh flex-1 flex-col bg-background", className),
    ...props
  });
});
SidebarInset.displayName = "SidebarInset";

const SidebarInput = React.forwardRef(({ className, ...props }, ref) => {
  return React.createElement(Input, {
    ref: ref,
    className: cn("h-8 w-full bg-background shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring", className),
    ...props
  });
});
SidebarInput.displayName = "SidebarInput";

const SidebarHeader = React.forwardRef(({ className, ...props }, ref) => {
  return React.createElement("div", {
    ref: ref,
    className: cn("flex flex-col gap-2 p-2", className),
    ...props
  });
});
SidebarHeader.displayName = "SidebarHeader";

const SidebarFooter = React.forwardRef(({ className, ...props }, ref) => {
  return React.createElement("div", {
    ref: ref,
    className: cn("flex flex-col gap-2 p-2", className),
    ...props
  });
});
SidebarFooter.displayName = "SidebarFooter";

const SidebarSeparator = React.forwardRef(({ className, ...props }, ref) => {
  return React.createElement(Separator, {
    ref: ref,
    className: cn("mx-2 w-auto bg-sidebar-border", className),
    ...props
  });
});
SidebarSeparator.displayName = "SidebarSeparator";

const SidebarContent = React.forwardRef(({ className, ...props }, ref) => {
  return React.createElement("div", {
    ref: ref,
    className: cn("flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=offcanvas]:p-2", className),
    ...props
  });
});
SidebarContent.displayName = "SidebarContent";

const SidebarGroup = React.forwardRef(({ className, ...props }, ref) => {
  return React.createElement("div", {
    ref: ref,
    className: cn("relative flex w-full min-w-0 flex-col p-2", className),
    ...props
  });
});
SidebarGroup.displayName = "SidebarGroup";

const SidebarGroupLabel = React.forwardRef(({ className, ...props }, ref) => {
  return React.createElement("div", {
    ref: ref,
    className: cn("flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-[margin,opa] duration-200 ease-linear focus-visible:ring-2 [[data-state=collapsed]_&]:-mt-8 [[data-state=collapsed]_&]:opacity-0", className),
    ...props
  });
});
SidebarGroupLabel.displayName = "SidebarGroupLabel";

const SidebarGroupAction = React.forwardRef(({ className, ...props }, ref) => {
  return React.createElement("button", {
    ref: ref,
    className: cn("absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [[data-state=collapsed]_&]:scale-0 [[data-state=collapsed]_&]:opacity-0", className),
    ...props
  });
});
SidebarGroupAction.displayName = "SidebarGroupAction";

const SidebarGroupContent = React.forwardRef(({ className, ...props }, ref) => {
  return React.createElement("div", {
    ref: ref,
    className: cn("w-full text-sm", className),
    ...props
  });
});
SidebarGroupContent.displayName = "SidebarGroupContent";

const SidebarMenu = React.forwardRef(({ className, ...props }, ref) => {
  return React.createElement("div", {
    ref: ref,
    className: cn("flex w-full min-w-0 flex-col gap-1", className),
    ...props
  });
});
SidebarMenu.displayName = "SidebarMenu";

const SidebarMenuItem = React.forwardRef(({ className, ...props }, ref) => {
  return React.createElement("div", {
    ref: ref,
    className: cn("group/menu-item relative", className),
    ...props
  });
});
SidebarMenuItem.displayName = "SidebarMenuItem";

const sidebarMenuButtonVariants = cva("peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground [[data-state=collapsed]_&]:size-8 [[data-state=collapsed]_&]:p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0", {
  variants: {
    variant: {
      default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
      outline: "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"
    }
  },
  defaultVariants: {
    variant: "default"
  }
});

const SidebarMenuButton = React.forwardRef(({ asChild = false, isActive = false, variant = "default", className, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";

  return React.createElement(Comp, {
    ref: ref,
    "data-sidebar": "menu-button",
    "data-active": isActive,
    className: cn(sidebarMenuButtonVariants({ variant }), className),
    ...props
  });
});
SidebarMenuButton.displayName = "SidebarMenuButton";

const SidebarMenuAction = React.forwardRef(({ asChild = false, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";

  return React.createElement(Comp, {
    ref: ref,
    "data-sidebar": "menu-action",
    className: cn("absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 peer-hover/menu-button:text-sidebar-accent-foreground [[data-state=collapsed]_&]:scale-0 [[data-state=collapsed]_&]:opacity-0 [&>svg]:size-4", className),
    ...props
  });
});
SidebarMenuAction.displayName = "SidebarMenuAction";

const SidebarMenuBadge = React.forwardRef(({ className, ...props }, ref) => {
  return React.createElement("span", {
    ref: ref,
    "data-sidebar": "menu-badge",
    className: cn("inline-flex items-center justify-center rounded-md border border-sidebar-border bg-sidebar-accent px-1.5 py-0.5 text-xs font-medium text-sidebar-accent-foreground text-nowrap transition-all ease-linear [[data-state=collapsed]_&]:px-0.5 [[data-state=collapsed]_&]:opacity-0", className),
    ...props
  });
});
SidebarMenuBadge.displayName = "SidebarMenuBadge";

const SidebarMenuSkeleton = React.forwardRef(({ className, showIcon = false, ...props }, ref) => {
  const width = React.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`;
  }, []);

  return React.createElement("div", {
    ref: ref,
    "data-sidebar": "menu-skeleton",
    className: cn("flex h-8 items-center gap-2 rounded-md px-2", className),
    ...props
  }, showIcon && React.createElement(Skeleton, { className: "size-4 rounded-md" }), React.createElement(Skeleton, { className: "h-4 flex-1 max-w-[--skeleton-width] rounded-md", style: { "--skeleton-width": width } }));
});
SidebarMenuSkeleton.displayName = "SidebarMenuSkeleton";

const SidebarMenuSub = React.forwardRef(({ className, ...props }, ref) => {
  return React.createElement("div", {
    ref: ref,
    "data-sidebar": "menu-sub",
    className: cn("mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5", className),
    ...props
  });
});
SidebarMenuSub.displayName = "SidebarMenuSub";

const SidebarMenuSubItem = React.forwardRef(({ ...props }, ref) => {
  return React.createElement(SidebarMenuButton, {
    ref: ref,
    variant: "outline",
    ...props
  });
});
SidebarMenuSubItem.displayName = "SidebarMenuSubItem";

export { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupAction, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarInput, SidebarInset, SidebarMenu, SidebarMenuAction, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem, SidebarMenuSkeleton, SidebarMenuSub, SidebarMenuSubItem, SidebarProvider, SidebarRail, SidebarSeparator, SidebarTrigger, useSidebar };