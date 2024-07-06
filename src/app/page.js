"use client";

import {DEFAULT_URL} from "amaker/app/constants";
import {useEffect, useState} from "react";
import Link from "next/link";
import axios from "axios";

export default function Home() {
  const [isLogin, SetIsLogin] = useState(true);

  useEffect(() => {
    if(!localStorage.getItem('token')) SetIsLogin(false)
  }, []);


  const onButtonClick = async () => {
    let res = await axios.get(`${DEFAULT_URL}/api/v1/auth/oauth/google`);
    window.location.href = res.data.data.url
  }

  return (
    <div className=" flex flex-col justify-center items-center bg-gray-100 min-h-1">
      <h1 className="text-4xl font-bold text-center mb-4">A-Maker</h1>
      {isLogin ?
        <Link href="/chat">
          <button className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700">
            채팅방 입장하기
          </button>
        </Link>
        :
        <button
          onClick={onButtonClick}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">
          Login
        </button>
      }
    </div>
  );
}
