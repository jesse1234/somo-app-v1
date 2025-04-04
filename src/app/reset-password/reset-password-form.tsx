'use client';

import { Label } from "@radix-ui/react-label"
import { Button } from "../components/ui/Buttons"
import { Card, CardContent } from "../components/ui/Cards"
import { Input } from "../components/ui/Input"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useResetPassword } from "@/store/useResetPassword"

export function ResetPasswordForm() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState<{password?: string, confirmPassword?: string}>({});
    const router = useRouter();
    const { resetPassword, isLoading, error, isSuccess} = useResetPassword();

    const validatePassword = (value: string) => {
        if (!value) return 'Password is required';
        if (value.length < 8) return 'Password must be at least 8 characters';
        return '';
    }

    const validateConfirmPassword = (value: string) => {
        if (!value) return 'Please confirm your password';
        if (value !== password) return 'Passwords do not match';
        return '';
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const passwordError = validatePassword(password);
        const confirmError = validatePassword(confirmPassword);

        if (passwordError || confirmError) {
            setErrors({
                password: passwordError,
                confirmPassword: confirmError
            });
            return;
        }

        try {
            await resetPassword(password, confirmPassword);
            router.push('/')
        } catch (err) {
            console.error('Password reset error:', err);
        }
    };

    if(isSuccess){
        return (
            <div className="flex items-center justify-center h-screen">
              <Card className="w-100">
                <CardContent>
                  <div className="space-y-4 w-full text-center">
                    <h3 className="text-xl font-bold text-dark-gray">Password Reset Successful</h3>
                    <p className="text-dark-gray">Your password has been successfully updated. Now you may access the app.</p>
                    {/* <Button 
                    //   onClick={() => router.push('/')}
                      className="mt-4"
                    >
                      Return to Login
                    </Button> */}
                  </div>
                </CardContent>
              </Card>
            </div>
          );
    }
    return (
        <div className="flex items-center justify-center h-screen">
            <Card className="w-100">
                <CardContent>
                    <div className="space-y-4 w-full">
                        <h3 className="text-xl font-bold text-dark-gray">Reset Password</h3>
                        {/* <p className="text-dark-gray">Enter your new password.</p> */}

                        {error && (
                            <div className="text-red-500 text-sm p-2 bg-red-50 rounded">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="space-y-2 mb-4">
                                <Label htmlFor="reset-email">Enter New Password</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="••••••••"
                                    required
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setErrors({...errors, password: undefined})
                                    }}
                                    onBlur={() => setErrors({
                                        ...errors,
                                        password: validatePassword(password)
                                    })}
                                />
                                {errors.password && (
                                    <p className="text-red-500 text-sm">{errors.password}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="reset-email">Confirm New Password</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="••••••••"
                                    required
                                    onBlur={() => setErrors({
                                        ...errors,
                                        confirmPassword: validateConfirmPassword(confirmPassword)
                                    })}
                                    onChange={(e) => {
                                        setConfirmPassword(e.target.value)
                                        setErrors({...errors, confirmPassword: undefined})
                                    }}
                                />
                            </div>

                                <div className="flex justify-end gap-3 mt-6">
                                <Button type="button" variant="outline" onClick={() => router.push('/')}>Cancel</Button>
                                <Button type="submit" variant="default" disabled={isLoading}>{isLoading ? 'Processing...' : 'Submit'}</Button>
                                </div>
                            </form>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}