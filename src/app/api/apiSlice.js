import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { logOut, receivedToken} from 'features/auth/authSlice';
import { toast } from 'react-toastify';

let  token;


// Get  token and set token as  header bearer
const baseQuery = fetchBaseQuery({        
    baseUrl: "https://medicare-server-ashy.vercel.app/api/v1/",             
    // baseUrl: "http://localhost:5000/api/v1/",        
    prepareHeaders: (headers) => {        
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
    },
});

export  const apiSlice = createApi({
    // baseQuery: baseQueryWithReauth,
    baseQuery: async (args, api, extraOptions)=>{
        token = localStorage.getItem("accessToken")
        const result = await baseQuery(args, api, extraOptions);
        if(result?.error?.status === 401) {
            token = localStorage.getItem("refreshToken")
            const  refreshResult = await  baseQuery({
                url: "auth/refresh-token",
                method: "GET",                                  
            }, api, extraOptions,)
            console.log(refreshResult)
                                   
            if(refreshResult ?.data){                                
                api.dispatch(receivedToken(refreshResult.data.accessToken))
                // retry the original  query with new access token
                result = await baseQuery(args, api, extraOptions)                      
            } else {                
                api.dispatch(logOut())                
                toast.error("Token expired, please login again")                           
            }
        }
        return result
    },
    endpoints: builder => ({})
})
