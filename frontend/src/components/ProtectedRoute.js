import { Navigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import api from "../api";
import { REFRESH_TOKEN,ACCESS_TOKEN } from "../constants";
import { useState ,useEffect ,useCallback} from "react";

export default function ProtectedRoute({children}) {
    const [isAuthorized ,setAuthorised]=useState(null);
    const refreshToken=async()=>{
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)
        try{
            const res = await api.post('/api/token/refresh/',{refresh:refreshToken});
            if(res.status ===200){
                localStorage.setItem(ACCESS_TOKEN,res.data.access)
                setAuthorised(true)
            }
        }catch(error){
            console.log(error)
        }
    }
    const auth = useCallback(async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            setAuthorised(false);
            return;
        }
        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000;
        if (tokenExpiration < now) {
            await refreshToken();
        } else {
            setAuthorised(true);
        }
    }, []);

    useEffect(() => {
        auth().catch(() => {
            setAuthorised(false);
        });
    }, [auth]);
    if (isAuthorized ===null){
        return <div>Loading...</div>
    }
    return isAuthorized ? children : <Navigate to='/login' />
}