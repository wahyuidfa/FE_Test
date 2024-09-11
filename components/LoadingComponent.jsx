import React from "react";
import Image from "next/image";

export default function LoadingComponent() {
  return (
    <div className="flex min-h-[100vh] items-center justify-center bg-background">
      <div className="animate-spin rounded-full border-4 border-primary border-t-transparent h-12 w-12" />
    </div>
  );
}
