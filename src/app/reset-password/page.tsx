'use client';

import { Suspense } from "react";
import { ResetPasswordForm } from './reset-password-form'

export default function ResetPasswordPage() {
    return (
        <div className="flex items-center justify-center h-screen">
            <Suspense>
                <ResetPasswordForm />
            </Suspense>
        </div>
    )
}