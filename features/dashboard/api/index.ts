import { api } from "@/services/api"


const dashboardApi = {
    analytics: async () => {
        const res = await api.get('/url/analytics')
        return res.data
    }
}
export default dashboardApi