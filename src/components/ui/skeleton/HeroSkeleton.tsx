export default function HeroSkeleton() {
  return (
    <div className="container grid grid-flow-row col-span-12 gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
      <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
        <div className="w-full bg-gray-300 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128 animate-pulse"></div>
      </div>
      <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
        <div className="w-full h-4 my-5 bg-gray-300 rounded-md animate-pulse"></div>
        <div className="w-full h-4 my-5 bg-gray-300 rounded-md animate-pulse"></div>
        <div className="w-full h-4 my-5 bg-gray-300 rounded-md animate-pulse"></div>
        <div className="w-full h-4 bg-gray-300 rounded-md animate-pulse"></div>
        <div className="w-full h-4 my-5 bg-gray-300 rounded-md animate-pulse"></div>
      </div>
    </div>
  );
}
