import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "./ui/separator";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { FaAnglesLeft } from "react-icons/fa6";

function Register() {
  return (
    <div className="login flex flex-col items-center justify-center w-full h-screen bg-[#F3F4F6] opensans-regular">
      <Card className="flex flex-col items-center justify-center rounded-sm">
        <CardHeader>
          <CardTitle></CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center w-full">
            <img
              src="/logo.webp"
              alt="logo"
              className="w-[220px] object-cover"
            />
            <p className="text-lg">Register</p>
            <form className="w-[380px] m-4">
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5 w-full">
                  <Input id="fname" placeholder="First Name" />
                </div>
                <div className="flex flex-col space-y-1.5 w-full">
                  <Input id="lname" placeholder="Last Name" />
                </div>
                <div className="flex flex-col space-y-1.5 w-full">
                  <Input id="name" type="email" placeholder="Email" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Input id="password" type="password" placeholder="Password" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="Confirm Password"
                  />
                </div>
              </div>
            </form>

            <div className="btns w-full my-6 px-4">
              <Button className="w-full bg-[#2563EB] hover:bg-blue-700">
                Register
              </Button>
            </div>
            <div className="w-full flex flex-col items-center justify-center my-2 px-4">
              <Separator className="w-full" />
              <p className="bg-white p-2 absolute text-gray-500 text-sm">
                Or sign in with
              </p>
            </div>
            <div className="btns my-5 w-full px-4">
              <Button variant="outline" className="w-full">
                <FcGoogle fontSize={26} />
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
      <Link
        to="/login"
        className="text-gray-500 text-sm flex items-center justify-center mt-4"
      >
        <FaAnglesLeft fontSize={10} className="mr-1" />
        Back to login
      </Link>
    </div>
  );
}

export default Register;
