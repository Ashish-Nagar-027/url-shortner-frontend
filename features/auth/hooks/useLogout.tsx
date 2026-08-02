import { useRouter } from "next/navigation";
import { api } from "@/services/api";
import { toast } from "sonner";

const useLogout = () => {

  const router = useRouter();

  const logout = async () => {
    try {
      const res = await api.post("/auth/logout");

      const resData = await res?.data;

      if (!resData?.success) {
        throw new Error(resData?.message || "Login failed");
      }

      toast.success("logout !");

      localStorage.clear();
      router.push("/sign-in");
      window.location.reload()
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return { logout };
};


export default useLogout