
'use client'


import { api } from "@/services/api"
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { redirect } from "next/navigation"
import { toast } from "sonner"

 const ProtectedLayout  = ({children}: {children: React.ReactNode}) => {

     const {_data, isLoading, isError} = useQuery({
        queryKey: ['currentUser'],
        queryFn: async () => {
           const res = await api.get('/user/me')
           return res.data
        },
        retry: (count, err) => {
            console.log('err ',count,"==" , err)
            if(err instanceof AxiosError ) {
              if(err.response?.status === 401){
                toast.error('Unauthorized ! Please login')
                return false
              }
            }
            return true
        }
     })
 

     if(isLoading) {
      return  <div className="h-screen w-screen flex justify-center items-center gap-6">
      {/* <Spinner className="size-24" /> */}
       <span className="font-extrabold text-2xl">iLynk</span>
    </div>
     }

     if(isError) {
        redirect('/')
     }

   return <div>
    {children}
   </div>
}

export default ProtectedLayout