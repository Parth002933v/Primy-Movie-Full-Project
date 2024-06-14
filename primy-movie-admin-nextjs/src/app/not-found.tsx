import Link from "next/link";

export default function NoPage() {
  return (
    <div className="grid text-center w-screen place-content-center ">
      <div className="text-center">
        <h1 className="text-9xl  font-semibold text-gray-200">404</h1>

        <p className="text-2xl font-bold tracking-tight text-muted-foreground sm:text-4xl">
          Uh-oh!
        </p>

        <p className="mt-4 text-gray-500">We can&apos;t find that page.</p>

        <Link
          href={"/"}
          className="mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
