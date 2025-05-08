import axios  from "axios";
const axiosInstance=axios.create({
    baseURL:"http://localhost:5179/api",
    withCredentials:true,
});

//Gan access token  vao request neu co
axiosInstance.interceptors.request.use(
    (config)=>{
        
        return config;
    },
    (error) => Promise.reject(error)
)

//Tu dong refresh token neu token het han
axiosInstance.interceptors.response.use(
    (response)=>response,
    async (error)=>{
        
        const originalRequest=error.config;
        if(error.response?.status===401 && !originalRequest._retry){
            originalRequest._retry=true;
            try{
                const res=await axiosInstance.post("/user/refresh-token");
                const newAccessToken=res.data.accessToken;
                
                return axiosInstance(originalRequest);
            }
            catch (err) {
                console.error("Error refreshing token:", err);
                localStorage.removeItem('accessToken');
                window.location.href="/login";
            }
        }
        return Promise.reject(error);
    }
)
export default axiosInstance;