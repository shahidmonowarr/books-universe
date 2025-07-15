import CardSkeleton from "./CardSkeleton";

export default function Skeletons() {
  return (
    <div className="relative grid grid-cols-12 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-flow-row col-span-12 gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </div>
  );
}
