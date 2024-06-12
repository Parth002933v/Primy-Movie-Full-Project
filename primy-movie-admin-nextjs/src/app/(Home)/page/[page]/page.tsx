import HomePage from "@/components/home";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import HomeError from "@/app/(Home)/error";


export default function page({ params }: { params: { page: string } }) {
    return (
        <ErrorBoundary errorComponent={HomeError}>
            <HomePage page={params.page} />
        </ErrorBoundary>

    )
}
