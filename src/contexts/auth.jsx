"use client";

import React, {createContext, useState, useContext, useEffect} from 'react'
import api from "@/utils/Api";
import {useRouter} from "next/router";
import {useSearchParams} from "next/navigation";

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
  const params = useSearchParams()
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    async function loadAuth() {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          console.log("Got a token in the LocalStorage, let's see if it is valid:", token);
          api.defaults.headers.Authorization = `Bearer ${token}`
          const response = await api.get('/auth/me')
          const user = response.data;
          if (user) {
            console.log(user);
            setUser(user);
          }
        }
        setLoading(false);
      } catch (error) {
        localStorage.removeItem('token');
        setLoading(false);
      }
    }

    loadAuth().then().catch(error => {
      console.log(error);
    });
  }, [])

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', {username: email, password})
      const {token} = response.data;
      if (token) {
        console.log("Got Token:", token);
        localStorage.setItem('token', token)
        api.defaults.headers.Authorization = `Bearer ${token}`
        const {data: user} = await api.get('/auth/me');
        setUser(user);
        console.log("Got user", user);
        const returnUrl = params.get('returnUrl');
        await router.push({
          pathname: returnUrl ? returnUrl : '/',
        });
      } else {
        await router.push({
          pathname: '/login'
        });
      }
    } catch (error) {
      setErrors(error.response.data.message);
    }
  }

  const logout = async () => {
    localStorage.removeItem('token');
    setUser(null);
    delete api.defaults.headers.Authorization;
    await router.push({
      pathname: '/login',
    })
  }

  return (
    <AuthContext.Provider value={{isAuthenticated: !!user, user, login, errors, loading, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

export const ProtectRoute = ({children}) => {
  const router = useRouter();
  const {isAuthenticated, loading} = useAuth();

  if (!!loading) {
    return <>Loading</>
  }

  if (!isAuthenticated && router.pathname !== '/login') {
    router.push({
      pathname: '/login',
      query: {returnUrl: router.asPath}
    });
  }
  return children;
};

export const useAuth = () => useContext(AuthContext);