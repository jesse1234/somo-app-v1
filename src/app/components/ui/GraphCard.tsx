import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from './Cards'

interface GraphCardProps {
    title: string;
    children: React.ReactNode;
}

export function GraphCard({ title, children }: GraphCardProps) {
    return (
        <Card className="mb-8">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    )
}