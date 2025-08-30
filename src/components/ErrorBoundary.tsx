"use client";

import React from "react";
// import { type ErrorInfo } from "react";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";

const Fallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  console.error("Error caught by ErrorBoundary:", error.message);

  return (
    <div
      className="w-full flex flex-col px-4 py-12 items-center bg-white min-h-[100vh] gap-4"
      role="alert"
    >
      <p className="text-red-600 text-3xl">Oops!!! Something went wrong</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
      <button
        onClick={resetErrorBoundary}
        className="w-36 bg-gray-300 rounded-2xl p-3 cursor-pointer hover:bg-gray-900 hover:text-white"
      >
        Try Refreshing the page
      </button>
    </div>
  );
};

// const logError = (error: Error, info: ErrorInfo) => {
//   console.error("Error:", error.message);
//   console.error("Component Stack:", info.componentStack);
// };

const MainAppErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  return <ErrorBoundary FallbackComponent={Fallback}>{children}</ErrorBoundary>;
};

export default MainAppErrorBoundary;
