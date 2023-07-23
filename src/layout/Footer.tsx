import { RiFacebookBoxFill, RiInstagramLine } from "react-icons/ri";
import logo from "../assets/images/books-logo-white-bg.png";
export default function Footer() {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <div className="bg-[#242630] text-secondary p-20">
      <div className="max-w-7xl mx-auto relative">
        <div className="flex justify-between">
          <div>
            <img className="h-10" src={logo} alt="Logo" />
          </div>
          <div className="flex gap-20">
            <ul className="space-y-2">
              <li>Upcoming</li>
              <li>Top Listed</li>
              <li>How it works</li>
            </ul>
            <ul className="space-y-2">
              <li>Support</li>
              <li>Careers</li>
            </ul>
            <ul className="space-y-2">
              <li>List your Book</li>
              <li>Contact team</li>
            </ul>
          </div>
          <div className="flex gap-2 text-2xl">
            <RiFacebookBoxFill />
            <RiInstagramLine />
          </div>
        </div>
        <div className="flex w-full gap-5 mt-20">
          <p>Privacy Policy</p>
          <p>Terms & Condition</p>
          <p className="ml-auto"> &#169; Books Universe {year}</p>
        </div>
      </div>
    </div>
  );
}
