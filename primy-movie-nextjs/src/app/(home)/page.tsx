import HomeComponent from "@/components/home";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import HomeError from "./error";




import data from "../../../data/data.json"


export default async function HomePage() {
  return (
    <div>
      <ErrorBoundary errorComponent={HomeError}>
        <HomeComponent  />
      </ErrorBoundary>
    </div>
  );
}
