import { forwardRef } from "react";
import { NavLink as RouterNavLink, type NavLinkProps } from "react-router-dom";
import { cn } from "@/lib/utils";

interface Props extends Omit<NavLinkProps, "className"> {
  className?: string;
  activeClassName?: string;
}

const NavLink = forwardRef<HTMLAnchorElement, Props>(
  ({ className, activeClassName, to, ...rest }, ref) => (
    <RouterNavLink
      ref={ref}
      to={to}
      className={({ isActive }) => cn(className, isActive && activeClassName)}
      {...rest}
    />
  )
);

NavLink.displayName = "NavLink";

export { NavLink };
