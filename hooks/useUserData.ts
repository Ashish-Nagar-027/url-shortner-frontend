import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "sonner"
import { authApi } from "@/features/auth/api/auth.api"
import { isCurrentPublicRoute } from "@/lib/utils"


export const useUserData  = () => {
    return useQuery({
        queryKey: ['currentUser'],
        
        queryFn: authApi.currentUser,
        staleTime: 5 * 60 * 1000,
         gcTime: 10 * 60 * 1000,
         refetchOnMount: false,
        retry: (count, err) => {
            console.log('err ',count,"==" , err)
            if(err instanceof AxiosError ) {
              if(err.response?.status === 401){
                if(isCurrentPublicRoute()){
                    toast.error('Unauthorized ! Please login')
                }
                return false
              }
            }
            return true
        }
     })
}

