export default function CardSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4 space-y-4 border border-gray-100">
      <div className="w-full h-64 bg-gray-300 rounded-md animate-pulse"></div>
      <div className="w-full h-4 bg-gray-300 rounded-md animate-pulse"></div>
      <div className="w-full h-4 bg-gray-300 rounded-md animate-pulse"></div>
      <div className="w-full h-4 bg-gray-300 rounded-md animate-pulse"></div>
      <div className="w-full h-4 bg-gray-300 rounded-md animate-pulse"></div>
      <div className="w-full h-4 bg-gray-300 rounded-md animate-pulse"></div>
    </div>
  );
}
