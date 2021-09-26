import Axios from "axios";
import { useAppBridge } from "@shopify/app-bridge-react";
import { getSessionToken } from "@shopify/app-bridge-utils";

export function useAxios() {
  const app = useAppBridge();
  const instance = Axios.create();
  // Intercept each axios call, and run this function first
  instance.interceptors.request.use(function (config) {
    return getSessionToken(app).then((token) => {
      config.headers["Authorization"] = `Bearer ${token}`;
      return config;
    });
  });
  // Array because of react convention
  return [instance];
}
