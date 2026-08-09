import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import api from "@/services/api";
import { AxiosError } from "axios";
import RedirectWithTimer from "@/features/auth/components/RedirectWithTimer";
import Header from "@/components/Header";

type SearchParams = Promise<{
  emailToken: string;
  email: string;
}>;

const VerifyEmailToken = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const { emailToken, email } = await searchParams;

  let isSuccess = false;
  let message = "Something went wrong";

  try {
    const res = await api.post(
      `/auth/verify-email?emailToken=${encodeURIComponent(
        emailToken,
      )}&email=${encodeURIComponent(email)}`,
    );

    if (res.data.success) {
      isSuccess = true;
      message = res.data.message || "Email verified successfully!";
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.message;

      if (errorMessage === "Invalid request query") {
        message = "Email verification failed";
      } else {
        message = errorMessage || "Email verification failed";
      }
    }
  }

  return (
    <main className="min-h-screen">
      
      <Header />
      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4">
        
        <Card className="w-full max-w-md">
          
          <CardHeader className="text-center">
            
            <CardTitle className={`text-2xl ${!isSuccess ? "text-red-500" : "text-emerald-500"}`} >
              
              {isSuccess ? "Email Verified! ✅ " : "Verification Failed ❌"}
            </CardTitle>
          </CardHeader>{" "}
          <CardContent className="text-center space-y-4">
            
            <p className="text-muted-foreground">{message}</p>
            <RedirectWithTimer />
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default VerifyEmailToken;
