import React, { Component, type ErrorInfo, type ReactNode } from "react"



export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
    }

    public static getDerivedStateFromError(_: Error): State {
        return { hasError: true }
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo)
    }

    public render() {
        if (this.state.hasError) {
            return (
                this.props.fallback || (
                    <div className="w-full h-full flex items-center justify-center">
                        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg">
                            <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
                            <p className="text-gray-600">Please try refreshing the page</p>
                        </div>
                    </div>
                )
            )
        }

        return this.props.children
    }
}

