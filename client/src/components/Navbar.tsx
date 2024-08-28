import { FaAngleDown, FaBars, FaUser } from 'react-icons/fa6';
import { Button } from './ui/button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMenu } from '@/slice/toggleSlice';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { FiMenu } from 'react-icons/fi';
import { RootState } from '@/store';
import { getUser } from '@/slice/user';
import mixpanel from 'mixpanel-browser';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

function Navbar() {
  const user = useSelector((state: RootState) => state.user.data);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const isLandingPage = location.pathname === "/";
  const navbarCondition =
    location.pathname !== "/login" &&
    location.pathname !== "/register" &&
    !location.pathname.includes("/research");
  const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    if (!isDropdownOpen) {
      mixpanel.track("profile_ham_menu_opened");
    }
  };

  const ProtectedRoutes = [
    "/realms/reunion/account/personal-info",
    "/realms/reunion/account/applications",
    "/realms/reunion/account",
  ];

  const logout = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/logout`,
        {
          withCredentials: true,
        },
      );

      if (response.data.success) {
        dispatch(getUser(null));
        navigate("/");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (!navbarCondition) {
    return null;
  }

  return (
    <div className="navbar relative z-[10] opensans-semibold text-gray-500 flex items-center justify-center w-full shadow p-4">
      <div
        className={`flex items-center justify-between ${
          isLandingPage ? "w-[70%]" : "w-full"
        }`}
      >
        <div className="left flex items-center justify-center">
          {!isLandingPage &&
            location.pathname !== "/realms/reunion/account" && (
              <FaBars
                className="text-gray-300 mr-6 cursor-pointer hover:text-gray-300/80"
                fontSize={30}
                onClick={() => dispatch(toggleMenu())}
              />
            )}
          <img
            onClick={() => navigate("/")}
            src="/logo.webp"
            alt="logo"
            className="w-[150px] object-cover mr-8 cursor-pointer"
          />
          {isLandingPage && (
            <div className="sections hidden lg:flex items-center justify-between">
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
          )}
        </div>
        <div
          className={`right flex items-center justify-center ${
            !isLandingPage ? "gap-4" : ""
          }`}
        >
          {!user?.email ? (
            <Button
              onClick={() => {
                navigate("/login");
                mixpanel.track("login button clicked");
              }}
              className="h-10 bg-[#026FFA] hover:bg-blue-300 transition-all hidden lg:block"
            >
              Log in
            </Button>
          ) : user?.email && !ProtectedRoutes.includes(location.pathname) ? (
            <div className="relative" ref={dropdownRef}>
              <div
                onClick={toggleDropdown}
                className="bg-gray-300 rounded-full p-3 lg:block hidden cursor-pointer"
              >
                <FaUser fontSize={22} className="text-[#5A5A5A]" />
              </div>
              {isDropdownOpen && (
                <div className="absolute right-0 border top-full mt-2 w-48 bg-white rounded-md shadow-lg p-2 z-10">
                  <button
                    onClick={() => {
                      navigate("/realms/reunion/account/personal-info");
                      setIsDropdownOpen(false);
                      mixpanel.track("profile_ham_menu_item_selected", {
                        selected_item_name: "My Account",
                      });
                    }}
                    className="block px-4 py-2 text-sm text-gray-700 transition-all rounded hover:bg-[#026FFA] hover:text-white w-full text-left"
                  >
                    My Account
                  </button>
                  <button
                    onClick={() => {
                      navigate("/realms/reunion/account/applications");
                      setIsDropdownOpen(false);
                      mixpanel.track("profile_ham_menu_item_selected", {
                        selected_item_name: "My Apps",
                      });
                    }}
                    className="block px-4 py-2 text-sm text-gray-700 transition-all rounded hover:bg-[#026FFA] hover:text-white w-full text-left"
                  >
                    My Apps
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      setIsDropdownOpen(false);
                      mixpanel.track("profile_ham_menu_item_selected", {
                        selected_item_name: "Log out",
                      });
                    }}
                    className="block px-4 py-2 text-sm text-gray-700 transition-all rounded hover:bg-[#026FFA] hover:text-white w-full text-left"
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center gap-3">
              <Button
                onClick={logout}
                className="h-10 bg-[#026FFA] hover:bg-blue-300 transition-all"
              >
                Log out
              </Button>
              <p className="text-black hidden lg:block">
                {user?.fname + " " + user?.lname}
              </p>
            </div>
          )}
        </div>
      </div>
      {!ProtectedRoutes.includes(location.pathname) && (
        <div className="menu block lg:hidden">
          <Sheet>
            <SheetTrigger>
              <Button size="icon" className="bg-white shadow hover:bg-gray-200">
                <FiMenu color="black" fontSize={22} />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle></SheetTitle>
                <SheetDescription></SheetDescription>
              </SheetHeader>
              <div className="sidebar flex flex-col items-start justify-between h-full">
                <div className="w-full">
                  <div className="top">
                    <img
                      src="/logo.webp"
                      alt="logo"
                      className="w-[150px] object-cover"
                    />
                  </div>
                  <div className="middle w-full mt-14">
                    <div className="home mb-10">
                      <p className="text-black font-semibold text-xl">Home</p>
                    </div>
                    <div className="products flex items-center justify-between mb-10">
                      <p className="text-black font-semibold text-xl">
                        Products
                      </p>
                      <FaAngleDown color="black" size={18} />
                    </div>
                    <div className="company flex items-center justify-between mb-10">
                      <p className="text-black font-semibold text-xl">
                        Company
                      </p>
                      <FaAngleDown color="black" size={18} />
                    </div>
                    <div className="knowledge flex items-center justify-between">
                      <p className="text-black font-semibold text-xl">
                        Knowledge
                      </p>
                      <FaAngleDown color="black" size={18} />
                    </div>
                  </div>
                </div>
                <div className="bottom mb-6 w-full">
                  {!user?.email ? (
                    <Button
                      onClick={() => navigate("/login")}
                      variant="ghost"
                      className="text-blue-600 text-xl"
                    >
                      Log in
                    </Button>
                  ) : user?.email &&
                    !ProtectedRoutes.includes(location.pathname) ? (
                    <>
                      <div
                        onClick={() => {
                          setIsUserMenuOpen(!isUserMenuOpen);
                        }}
                        className="w-full flex items-center justify-between"
                      >
                        <p className="text-black font-normal text-xl">User</p>
                        <FaAngleDown
                          color="black"
                          size={18}
                          className={isUserMenuOpen ? "rotate-180" : ""}
                        />
                      </div>
                      {isUserMenuOpen && (
                        <div className="user-data leading-10 relative left-10 mt-6 flex flex-col">
                          <Link to="/realms/reunion/account/personal-info">
                            My Account
                          </Link>
                          <Link to="/realms/reunion/account/applications">
                            My Apps
                          </Link>
                          <p onClick={logout}>Log out</p>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="flex items-center justify-center gap-3">
                      <Button
                        onClick={logout}
                        className="h-10 bg-[#026FFA] hover:bg-blue-300 transition-all"
                      >
                        Log out
                      </Button>
                      <p className="text-black">
                        {user?.fname + " " + user?.lname}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      )}
    </div>
  );
}

export default Navbar;
