"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.log(error.message);
  }, [error]);

  return (
    <div className="w-full text-gray-400 place-content-center text-xl  text-center ">
      <p>{error.message}</p>
    </div>
  );
}
