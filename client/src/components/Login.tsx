import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from './ui/separator';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { getUser } from '@/slice/user';
import { useDispatch } from 'react-redux';
import mixpanel from 'mixpanel-browser';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function Login() {
  const dispatch = useDispatch();

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      if (!tokenResponse || !tokenResponse.access_token) {
        console.error("No token response received");
        return;
      }

      try {
        const userInfoResponse = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          },
        );

        const userData = userInfoResponse.data;
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/oauth`,
          {
            userData: userData,
            token: tokenResponse.access_token,
          },
          { withCredentials: true },
        );

        if (!response.data) {
          throw new Error("Failed to save auth data to database");
        } else {
          mixpanel.track("signin_completed", {
            signin_method: "Google",
          });
          dispatch(getUser(response.data.user));
        }
      } catch (error) {
        return error;
      }
    },
  });

  const handleGoogleLogin = async () => {
    try {
      mixpanel.track("signin_initiated");
      googleLogin();
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  return (
    <div className="login flex items-center justify-center w-full h-screen bg-[#F3F4F6] opensans-regular">
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
            <p className="text-lg">Sign in</p>
            <form className="w-[380px] m-4">
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5 w-full">
                  <Input id="name" placeholder="Username or Email" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Input id="password" type="password" placeholder="Password" />
                </div>
              </div>
            </form>
            <div className="flex items-center justify-between w-full px-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <label
                  htmlFor="terms"
                  className="text-sm text-gray-500 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remember me
                </label>
              </div>
              <p
                onClick={() => {
                  mixpanel.track("forgot_password_clicked");
                }}
                className="text-blue-500 text-sm cursor-pointer hover:underline"
              >
                Forgot password?
              </p>
            </div>
            <div className="btns w-full my-6 px-4">
              <Button
                className="w-full bg-[#2563EB] hover:bg-blue-700"
                onClick={() => {
                  mixpanel.track("signin button clicked");
                }}
              >
                Sign in
              </Button>
            </div>
            <div className="w-full flex flex-col items-center justify-center my-2 px-4">
              <Separator className="w-full" />
              <p className="bg-white p-2 absolute text-gray-500 text-sm">
                Or sign in with
              </p>
            </div>
            <div className="btns my-5 w-full px-4">
              <Button
                onClick={handleGoogleLogin}
                variant="outline"
                className="w-full"
              >
                <FcGoogle fontSize={26} />
              </Button>
            </div>
            <span className="my-3 text-[15px]">
              New user?{" "}
              <Link to="/register" className="text-blue-500">
                Register
              </Link>
            </span>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </div>
  );
}

export default Login;
