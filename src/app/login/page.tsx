import AuthImage from "@/app/components/ui/AuthImage"
import LogoImage from "@/app/assets/images/Group 394.png"
import { Button } from "@/app/components/ui/Buttons"
import { Input } from "@/app/components/ui/Input"
import { Label } from "@/app/components/ui/Label"
import { Link } from "@/app/components/ui/Link"
import Image from "next/image"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Login Form */}
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col">
          <div className="">
          <Image 
            src={LogoImage}
            alt="Somo logo"
            width={130}
            height={130}
            className="mx-auto -mt-32 ml-9"
            priority
          />
          </div>
          <h2 className="mt-4 ml-10 text-left text-2xl font-bold text-gray-900">
            Login
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-3 px-4 sm:rounded-lg sm:px-10">
            <form action="space-y-6" method="POST">
              <div className="">
                <Label htmlFor="email">Email</Label>
                <div className="mt-3 text-black">
                  <Input 
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div className="mt-3 text-black">
                <Label htmlFor="password">Password</Label>
                <div className="mt-2">
                  <Input 
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••" 
                    required 
                  /> 
                </div>
              </div>

              <div className="flex items-center justify-end">
                <div className="text-sm mt-4 mb-4">
                  <Link href='#'>
                    Forgot Password?
                  </Link>
                </div>
              </div>

              <div>
                <Button type="submit" className="w-full bg-primary hover:bg-secondary">
                  Sign In
                </Button>
              </div> 
            </form>
          </div>
        </div>
      </div>
      <AuthImage />
    </div>
  )
}
