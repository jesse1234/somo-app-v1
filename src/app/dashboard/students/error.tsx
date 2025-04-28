'use client'

import { Link } from "@/app/components/ui/Link"
import { FaceFrownIcon } from "@heroicons/react/24/outline"

export default function StudentsError({
  error,
  //reset,
}: {
  error: Error & { digest?: string }
  //reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <FaceFrownIcon className="w-30 text-light-gray" />
          <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong!</h2>
          <p className="text-gray-700 mb-4">{error.message}</p>
          <Link 
                href="/dashboard/students"
                className="mt-4 rounded-md bg-primary px-4 py-2 text-sm text-white transition-colors hover:bg-blue-600" 
          >
                Go Back
          </Link>
        </div>
      </body>
    </html>
  )
}