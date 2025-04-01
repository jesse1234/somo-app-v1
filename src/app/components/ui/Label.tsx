import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cn } from "@/app/lib/utils"

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & {
    error?: boolean
  }
>(({ className, error, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(
      "text-sm text-black font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      error && "text-red-500",
      className
    )}
    {...props}
  />
))
Label.displayName = "Label"

export { Label } 