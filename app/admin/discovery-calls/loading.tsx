import { LoadingState } from "../_components/States";

export default function Loading() {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Discovery Calls</h1>
      </div>
      <LoadingState label="Loading discovery calls…" />
    </>
  );
}
