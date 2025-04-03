import { Label } from "@radix-ui/react-label"
import { Button } from "../components/ui/Buttons"
import { Card, CardContent } from "../components/ui/Cards"
import { Input } from "../components/ui/Input"

export default function ResetPasswordPage() {
    return (
        <div className="flex items-center justify-center h-screen">
            <Card className="w-100">
                <CardContent>
                    <div className="space-y-4 w-full">
                        <h3 className="text-xl font-bold text-dark-gray">Reset Password</h3>
                        {/* <p className="text-dark-gray">Enter your new password.</p> */}

                        <form>
                            <div className="space-y-2 mb-4">
                                <Label htmlFor="reset-email">Enter New Password</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="••••••••"
                                    required
                                    // onBlur={handleBlur}
                                    // onChange={() => setErrors({...errors, password: undefined})}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="reset-email">Confirm New Password</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="••••••••"
                                    required
                                    // onBlur={handleBlur}
                                    // onChange={() => setErrors({...errors, password: undefined})}
                                />
                            </div>

                                <div className="flex justify-end gap-3 mt-6">
                                <Button type="button" variant="outline">Cancel</Button>
                                <Button type="submit" variant="default" >Submit</Button>
                                </div>
                            </form>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}