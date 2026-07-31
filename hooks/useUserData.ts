import { api } from "@/services/api"
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { usePathname,  } from "next/navigation"
import { toast } from "sonner"


export const useUserData  = () => {
    const path = usePathname()
    return useQuery({
        queryKey: ['currentUser'],
        
        queryFn: async () => {
           const res = await api.get('/user/me')
           return res?.data?.data
        },
        staleTime: 5 * 60 * 1000,
         gcTime: 10 * 60 * 1000,
         refetchOnMount: false,
        retry: (count, err) => {
            console.log('err ',count,"==" , err)
            if(err instanceof AxiosError ) {
              if(err.response?.status === 401){
                const paths = ['/', "/sign-in", "/sign-up"]
                if(!paths.includes(path)){
                    toast.error('Unauthorized ! Please login')
                }
                return false
              }
            }
            return true
        }
     })
}

