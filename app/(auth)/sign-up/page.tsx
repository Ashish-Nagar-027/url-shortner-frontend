import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,

  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Signup from "@/features/auth/components/Signup";

const Register = () => {
  return (
    <div className="flex items-center justify-center   my-auto ">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardAction>
            <Link href={"/sign-in"}>
              <Button variant="link">Sign In</Button>
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <Signup />
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
