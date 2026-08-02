import api from "@/services/api"
import type { FormValues } from "../components/LnkPopup"


const urlApi = {
    create: async ( data: Partial<FormValues>) => {
        const res = await api.post('/url/create', data)
        return res.data
    },
    update: async (id: string, data: Partial<FormValues>) => {
        const res = await api.put(`/url/${id}`, data)
        return res.data
    },
    delete: async (id: string) => {
        const res = await api.delete(`/url/${id}`)
        return res.data
    },
    currentUsersUrls: async () => {
        const res = await api.get('/url/user')
        return res.data
    }
}
export default urlApi