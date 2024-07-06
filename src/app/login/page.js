"use client";

import {useEffect, useState} from "react";
import userApi from "amaker/app/api/user";
import {useRouter} from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const authToken = queryParams.get('code');
    if (authToken) setAuthToken(authToken);
  }, []);


  useEffect(() => {
    const login = async () => {
      const res = await userApi.login(authToken);
      localStorage.setItem("token", res.data.data.token);
      return res
    }

    if (authToken) login().then(r => router.push('/chat'))
  }, [authToken])


  return (<div>
      <h1>로그인중...</h1>
    </div>)
}