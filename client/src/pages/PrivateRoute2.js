import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Login from "./Login";

const PrivateRoute2 = ({ children }) =>{

    const [isloggedin, setLoggedin] = useState(false)
    const [isLoading, setIsLoading] = useState(true);

    const isUserAuth = async() =>{
        try {
          const response = await fetch('http://localhost:3001/isUSerAuth',{
            method: "GET",
            headers: { "x-access-token": localStorage.getItem("token") },   
          });
          const data = await response.json();
          console.log(data.auth)
          if(data.auth === true){
            setLoggedin(true)
          }else{
            setLoggedin(false)
          }
          console.log(isloggedin)
          setIsLoading(false)
        } catch (error) {
          console.log(error.message)
        }

      }
useEffect(()=>{
    isUserAuth();
}, [])
 
   return (
        isLoading ? <p>Loading....</p> : isloggedin ? <Navigate to ="/profile" /> : children
   );


}

export default PrivateRoute2