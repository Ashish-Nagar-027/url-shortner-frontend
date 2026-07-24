import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"
import Signin from "@/features/auth/components/Signin"



const Register = () => {


  return (
    <div className="flex items-center justify-center   my-auto ">
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Create Account</CardTitle>
        <CardDescription>
          Enter your email, password  below to log in your account
        </CardDescription>
        <CardAction>
          <Link href={'/sign-up'}>
          <Button variant="link">Register</Button>
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
          <Signin />
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button variant="outline" className="w-full">
          Login with Google
        </Button>
      </CardFooter>
    </Card>
    </div>
  )
}

export default Register