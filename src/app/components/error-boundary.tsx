
'use client'

interface ErrorBoundaryProps {
  error?: Error & { digest?: string }
  reset?: () => void
  children?: React.ReactNode
}

export default function ErrorBoundary({ error, reset, children }: ErrorBoundaryProps) {
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong!</h2>
        <p className="text-gray-700 mb-4">{error.message}</p>
        {reset && (
          <button
            onClick={reset}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-blue-600"
          >
            Try again
          </button>
        )}
      </div>
    )
  }

  return children
}