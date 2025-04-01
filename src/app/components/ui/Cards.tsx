import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/app/lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    noPadding?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ className, noPadding = false, ...props}, ref) => {
        return(
            <div
                ref={ref}
                className={cn(
                    'rounded-lg bg-white text-card foreground shadow-sm',
                    !noPadding && 'p-4',
                    className
                )}
                {...props}
            />
        )
    }
)
Card.displayName = 'Card'

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({className, ...props}, ref) => (
        <div
            ref={ref}
            className={cn(
                'flex flex-col space-y-1.5 p-6',
                className
            )}
            {...props}
        ></div>
    )
)
CardHeader.displayName = 'CardHeader'

const CardTitle = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLHeadingElement>>(
    ({className, ...props}, ref) => (
        <h3 
            ref={ref}
            className={cn('text-lg font-semibold leading-none tracking-tight', className)}
            {...props}/>
    )
)
CardTitle.displayName = 'CardTitle'

const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
    ({ className, ...props }, ref) => (
        <p
            ref={ref}
            className={cn('text-sm text-muted-foreground', className)}
            {...props}/>
    )
)
CardDescription.displayName = 'CardDescription'

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props}, ref) => (
        <div 
            ref={ref}
            className={cn('flex items-center p-2 pt-0', className)}
            {...props} />
    )
)
CardContent.displayName = 'CardContent'

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props}, ref) => (
        <div
            ref={ref}
            className={cn('flex items-center p-6 pt-0', className)}
            {...props} />
    )
)
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter}