import { useState } from "react";
import { FaAngleRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const personalClass = location.pathname.includes("/personal-info")
    ? "bg-[#026FFA] border-l-4 text-white border-[#73BCF7] hover:bg-[#026FFA]"
    : "hover:bg-gray-200";
  const applicationsClass = location.pathname.includes("/applications")
    ? "bg-[#026FFA] border-l-4 text-white border-[#73BCF7] hover:bg-[#026FFA]"
    : "hover:bg-gray-200";

  return (
    <>
      <div className="sidebar h-screen bg-[#FAFAFA] opensans-semibold w-[300px] shadow-2xl leading-[2.8rem]">
        <div className="py-4">
          <p
            onClick={() => navigate("/realms/reunion/account/personal-info")}
            className={`cursor-pointer px-4 ${personalClass}`}
          >
            Personal info
          </p>
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-between cursor-pointer px-4 hover:bg-gray-200"
          >
            <p>Account security</p>
            <FaAngleRight
              fontSize={20}
              className={`text-black ${
                isOpen ? "rotate-90 transition-all" : "transition-all"
              }`}
            />
          </div>
          {isOpen ? (
            <div className="extra-security ml-10">
              <p className="cursor-pointer hover:bg-gray-200 hover:border-l-[1px] hover:border-gray-500 px-2">
                Signing in
              </p>
              <p className="cursor-pointer hover:bg-gray-200 hover:border-l-[1px] hover:border-gray-500 px-2">
                Device activity
              </p>
              <p className="cursor-pointer hover:bg-gray-200 hover:border-l-[1px] hover:border-gray-500 px-2">
                Linked accounts
              </p>
            </div>
          ) : null}
          <p
            onClick={() => navigate("/realms/reunion/account/applications")}
            className={`cursor-pointer px-4 ${applicationsClass}`}
          >
            Applications
          </p>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
