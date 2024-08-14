import { FaAngleDown } from "react-icons/fa6";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { toggleMenu } from "@/slice/toggleSlice";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLandingPage = location.pathname === "/";
  const navbarCondition =
    location.pathname !== "/login" &&
    location.pathname !== "/register" &&
    !location.pathname.includes("/research");

  return (
    <>
      {navbarCondition ? (
        <div className="navbar relative z-[10] opensans-semibold text-gray-500 flex items-center justify-center w-full shadow p-4">
          <div
            className={`flex items-center justify-between ${
              location.pathname === "/" ? "w-[70%]" : "w-full"
            }`}
          >
            <div className="left flex items-center justify-center">
              {!isLandingPage &&
              location.pathname !== "/realms/reunion/account" ? (
                <FaBars
                  className="text-gray-300 mr-6 cursor-pointer hover:text-gray-300/80"
                  fontSize={30}
                  onClick={() => dispatch(toggleMenu())}
                />
              ) : null}
              <img
                onClick={() => navigate("/")}
                src="/logo.webp"
                alt="logo"
                className="w-[150px] object-cover mr-8 cursor-pointer"
              />
              {isLandingPage ? (
                <div className="sections flex items-center justify-between">
                  <p className="mr-8 cursor-pointer hover:text-black transition-all">
                    Home
                  </p>
                  <div className="flex items-center justify-center w-fit mr-8 cursor-pointer">
                    <p className="hover:text-black transition-all">Products</p>
                    <FaAngleDown className="text-gray-400 ml-2" fontSize={10} />
                  </div>
                  <div className="flex items-center justify-center w-fit mr-8 cursor-pointer">
                    <p className="hover:text-black transition-all">Company</p>
                    <FaAngleDown className="text-gray-400 ml-2" fontSize={10} />
                  </div>
                  <div className="flex items-center justify-center w-fit cursor-pointer">
                    <p className="hover:text-black transition-all">Knowledge</p>
                    <FaAngleDown className="text-gray-400 ml-2" fontSize={10} />
                  </div>
                </div>
              ) : null}
            </div>
            <div
              className={`right flex items-center justify-center ${
                !isLandingPage ? "gap-4" : ""
              }`}
            >
              <Button
                onClick={() => navigate("/login")}
                className="h-10 bg-[#026FFA] hover:bg-blue-300 transition-all"
              >
                Log in
              </Button>
              {!isLandingPage ? (
                <p className="text-black">Shubhojeet Bera</p>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Navbar;
