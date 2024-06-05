import { CapacitorCookies } from "@capacitor/core";
import { isPlatform } from "@ionic/react";
import React from "react";
import { useCookies } from "react-cookie";

const useDeviceCookies = () => {
  const [cookies, setCookie, removeCookie] = useCookies();

  const getDeviceCookie = async (name: string): Promise<string | null> => {
    if (isPlatform("hybrid")) {
      const cookie = await CapacitorCookies.getCookies();

      return cookie[name] || null;
    } else {
      return cookies[name] || null;
    }
  };

  const setDeviceCookie = async (
    name: string,
    value: string,
    options?: any
  ): Promise<string> => {
    const tokenExists = await getDeviceCookie(name);
    if (tokenExists) {
      await removeDeviceCookie(name);
    }
    if (isPlatform("hybrid")) {
      await CapacitorCookies.setCookie({
        url: "/",
        key: name,
        value: value,
      });
    } else {
      setCookie(name, value, options);
    }
    return value;
  };

  const removeDeviceCookie = async (name: string) => {
    if (isPlatform("hybrid")) {
      await CapacitorCookies.deleteCookie({
        url: "/",
        key: name,
      });
    } else {
      removeCookie(name);
    }
  };

  return {
    getDeviceCookie,
    setDeviceCookie,
    removeDeviceCookie,
  };
};

export default useDeviceCookies;
