import { LoadingState } from "../_components/States";

export default function Loading() {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Conference Leads</h1>
      </div>
      <LoadingState label="Loading conference boards…" />
    </>
  );
}
