import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { sections } from "@/lib/exports";
import { Link } from "react-router-dom";

function AccountManagement() {
  return (
    <>
      <div className="account-management bg-[#F3F4F6] w-full h-screen">
        <div className="top opensans-semibold p-6 bg-white text-2xl shadow">
          <p>Welcome to Keycloak account management</p>
        </div>
        <div className="all-cards flex items-start justify-start gap-4 p-6">
          {sections.map((section, index) => {
            return (
              <div key={index}>
                <Card className="rounded-sm shadow w-[250px] h-[250px] p-3 opensans-regular">
                  <CardHeader>
                    {section.icon}
                    <CardTitle className="text-lg">{section.title}</CardTitle>
                    <CardDescription className="text-md text-black">{section.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {section.subSections.map((subSection, index) => {
                      return (
                        <div key={index}>
                          {subSection.url ? (
                            <Link to={subSection.url} className="text-blue-600 hover:underline cursor-pointer">
                              {subSection.title}
                            </Link>
                          ) : (
                            <p className="text-blue-600 hover:underline cursor-pointer">{subSection.title}</p>
                          )}
                        </div>
                      );
                    })}
                  </CardContent>
                  <CardFooter></CardFooter>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default AccountManagement;
