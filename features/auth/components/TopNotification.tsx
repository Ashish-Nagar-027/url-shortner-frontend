"use client";

import { useUserData } from "@/hooks/useUserData";
import { useMutation } from "@tanstack/react-query";
import { Mail, X } from "lucide-react";
import { useEffect, useState } from "react";
import { authApi } from "../api/auth.api";
import { toast } from "sonner";
import { AxiosError } from "axios";

const DISMISS_KEY = "email-verification-banner-dismissed";
const EMAIL_ALREADY_SENT = "is-email-sent";

type TopNotificationProps = {
  showNotification: boolean;
  setShowNotification: React.Dispatch<React.SetStateAction<boolean>>;
};

const TopNotification = ({
  showNotification,
  setShowNotification,
}: TopNotificationProps) => {
  const { isError, isLoading, data } = useUserData();
  const [isEmailSent, setIsEmailSent ] = useState(() => {
      const saved = sessionStorage.getItem(EMAIL_ALREADY_SENT);
      return saved ? new Date(saved) : null
  })

  const resendToken = useMutation({
    mutationKey: ['resendEmailToken'],
    mutationFn: authApi.resendEmail,
    onSuccess: (d) => {
      toast.success(d.message)
      // setShowNotification(false)
      setIsEmailSent(new Date())
    }
  })


  useEffect(() => {
    if (
      !isLoading &&
      !isError &&
      data &&
      !data.isVerified &&
      sessionStorage.getItem(DISMISS_KEY) !== "true"
    ) {
      setShowNotification(true);
      
    }
  }, [data, isLoading, isError, setShowNotification]);

  if (!showNotification) {
    return null;
  }

  const handleClose = () => {
    sessionStorage.setItem(DISMISS_KEY, "true");
    setShowNotification(false);
  };

  const ResendEmail = async () => {
        sessionStorage.setItem(EMAIL_ALREADY_SENT, JSON.stringify(Date.now()));
        await resendToken.mutate()
        if(resendToken.error && resendToken.error instanceof AxiosError){
          // if(resendToken.error?.response?.status == 429) {
          //   // sessionStorage.setItem(EMAIL_ALREADY_SENT, JSON.stringify(Date.now()));
          // }
          const message = resendToken.error?.response?.data?.message || "Something Wen Wrong !"
          toast.error(message)
        }
  }




  return (
    <div className="relative z-50 flex h-10  items-center justify-center border-b bg-amber-50 px-10 py-2 text-amber-900 dark:bg-amber-950/40 dark:text-amber-100">
      <div className="flex items-center gap-2 text-sm">
        <Mail className="h-4 w-4 shrink-0" />

        <p>
          <span className="font-medium">Verify your email</span>
          <span className="mx-1.5 text-amber-700 dark:text-amber-300">
            —
          </span>
          {(resendToken.isSuccess )  ? resendToken.data.message : "Check your inbox to verify your account."}
        </p>
{
  ((data?.isVerificationTokenExpired || !data.isVerified) && !resendToken.isSuccess  ) &&  <button
          type="button"
          onClick={ResendEmail}
    
          className="font-medium underline underline-offset-4 transition-opacity hover:opacity-70"
        >
          Resend
        </button>}
      </div>

      <button
        type="button"
        aria-label="Close notification"
        onClick={handleClose}
        className="absolute right-3 rounded-md p-1 text-amber-800 transition-colors hover:bg-amber-200/60 dark:text-amber-200 dark:hover:bg-amber-900/60"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export default TopNotification;