import { cn } from "@/app/lib/utils";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { AnchorHTMLAttributes, forwardRef } from "react";

interface LinkProps extends NextLinkProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>,keyof NextLinkProps> {
    variant?: "default" | "muted"
    className?: string
}

const Link = forwardRef<HTMLAnchorElement, LinkProps> (
    ({ className, variant = "default", href, ...props }, ref) => {
        const variantStyles = {
            default: "text-primary hover:text-primary/90",
            muted: "text-light-gray hover:text-gray-800",
        }

        return (
            <NextLink
                className={cn(
                    "text-sm transition-colors",
                    variantStyles[variant],
                    className
                )}
                href={href}
                ref={ref}
                {...props} 
            />
        )
    }
)

Link.displayName = "Link"
export { Link }
