"use client";
import {isAuthenticated} from "@/utils/Auth.utils";
import {useEffect} from "react";
import {redirect} from "next/navigation";

const withAuth = (Component) => {

}

export default function isAuth(Component) {
  return function IsAuth(props) {
    const auth = isAuthenticated;

    useEffect(() => {
      if (!auth) {
        return redirect("/login");
      }
    }, []);

    if (!auth) {
      return null;
    }

    return <Component {...props} />;
  };
}