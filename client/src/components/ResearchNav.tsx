import { FaAngleDown } from "react-icons/fa6";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

function ResearchNav() {
  const navigate = useNavigate();

  return (
    <>
      <div className="navbar relative z-[10] opensans-semibold text-gray-500 flex items-center justify-center w-full shadow p-4">
        <div className="flex items-center justify-between w-[70%]">
          <div className="left flex items-center justify-center">
            <img
              onClick={() => navigate("/")}
              src="/Research/logo.webp"
              alt="logo"
              className="w-[150px] object-cover mr-8 cursor-pointer"
            />
            <div className="sections flex items-center justify-between">
              <div className="flex items-center justify-center w-fit mr-8 cursor-pointer">
                <p className="hover:text-black transition-all">Search</p>
                <FaAngleDown className="text-gray-400 ml-2" fontSize={10} />
              </div>
              <div className="flex items-center justify-center w-fit mr-8 cursor-pointer">
                <p className="hover:text-black transition-all">My Searches</p>
                <FaAngleDown className="text-gray-400 ml-2" fontSize={10} />
              </div>
            </div>
          </div>
          <div className="right flex items-center justify-center gap-4">
            <Button
              onClick={() => navigate("/login")}
              className="h-10 bg-[#026FFA] hover:bg-blue-300 transition-all"
            >
              Log in
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ResearchNav;
