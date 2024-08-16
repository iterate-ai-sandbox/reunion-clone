import Sidebar from "./ui/Sidebar";
import type { RootState } from "../store";
import { useSelector } from "react-redux";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineLoading } from "react-icons/ai";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import mixpanel from "mixpanel-browser";

function Personal() {
  const isToggle = useSelector((state: RootState) => state.toggle.value);
  const user = useSelector((state: RootState) => state.user.data);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isChanged, setIsChanged] = useState<boolean>(false);

  useEffect(() => {
    setFirstName(user?.fname || "");
    setLastName(user?.lname || "");
  }, [user]);

  const resetInputs = () => {
    setFirstName(user?.fname || "");
    setLastName(user?.lname || "");
    setIsChanged(false);
  };

  const updateUser = async () => {
    try {
      mixpanel.track("Update user clicked");

      if (!firstName || !lastName) {
        return;
      }

      setIsLoading(true);

      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/user`,
        {
          fname: firstName,
          lname: lastName,
          email: user?.email,
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        setFirstName(response.data?.user?.fname);
        setLastName(response.data?.user?.lname);
        setIsLoading(false);
        toast.success("User updated successfully!");
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("Unknown error occurred!");
    }
  };

  return (
    <>
      <Toaster richColors />

      <div className="personal flex items-start">
        {isToggle ? (
          <div className="left absolute lg:relative z-[8]">
            <Sidebar />
          </div>
        ) : null}
        <div className="right py-5 px-7 opensans-semibold">
          <p className="text-2xl">Personal info</p>
          <p className="text-lg my-10">Manage you basic information.</p>
          <p className="text-lg text-gray-500">All fields are required.</p>
          <div className="form my-10">
            <div className="grid w-full max-w-sm items-center gap-1.5 mb-6">
              <Label htmlFor="email" className="text-lg">
                Email
              </Label>
              <Input
                type="email"
                id="email"
                disabled
                value={user?.email ?? "test@gmail.com"}
                className="w-[600px] text-lg bg-gray-300 text-black"
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5 mb-6">
              <Label htmlFor="fname" className="text-lg">
                First name
              </Label>
              <Input
                type="name"
                id="fname"
                placeholder="First name"
                className="w-[600px] text-lg text-black"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  setIsChanged(true);
                }}
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="lname" className="text-lg">
                Last name
              </Label>
              <Input
                type="name"
                id="lname"
                placeholder="Last name"
                value={lastName}
                className="w-[600px] text-lg text-black"
                onChange={(e) => {
                  setLastName(e.target.value);
                  setIsChanged(true);
                }}
              />
            </div>
          </div>
          <div className="buttons flex items-center gap-8">
            <Button
              disabled={isLoading || !isChanged}
              onClick={updateUser}
              className="bg-[#026FFA] text-lg hover:bg-blue-700"
            >
              {isLoading ? (
                <AiOutlineLoading className="animate-spin mr-3" />
              ) : null}
              Save
            </Button>
            <Button
              disabled={isLoading || !isChanged}
              onClick={resetInputs}
              variant="ghost"
              className="text-lg text-[#026FFA] hover:text-blue-700"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Personal;
