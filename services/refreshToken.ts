import { toast } from "sonner"
import api from "./api"


const refreshUserToken = async () => {
     try {
        const res = await api.post('/auth/refresh')

        if(res.status === 200) {
            return res
        } 
        else {
        toast.error("log In again")
        window.location.href = '/'
        }

     } catch (error) {
        toast.error("log In again")
        console.error(error)
        window.location.href = '/'
     }
}

export default refreshUserToken