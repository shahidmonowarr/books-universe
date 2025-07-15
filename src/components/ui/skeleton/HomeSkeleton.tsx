import HeroSkeleton from "./HeroSkeleton";
import Skeletons from "./Skeletons";

export default function HomeSkeletons() {
  return (
    <div>
      <div className="py-10">
        <HeroSkeleton />
      </div>
      <br />
      <br />
      <Skeletons />
    </div>
  );
}
