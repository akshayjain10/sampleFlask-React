import React from "react";
import { useHistory } from "react-router-dom";

export const MyContext = React.createContext();

const MyContextValues = () => {
  return {
    fetchData: async (url, options = {}, ...args) => {
      const { headers = {} } = options;
      try {
        const res = await fetch(
          url,
          {
            ...options,
            headers: { "Content-Type": "application/json", ...headers },
          },
          ...args
        );
        if (res.ok) {
          const response = await res.json();
          return response;
        } else {
          let error = {};
          error.error = res.statusText;
          error.status = res.status;
          error.msg = res;
          throw error;
        }
      } catch (e) {
        return e;
      }
    },
  };
};

export function MyContextProvider({ children }) {
  const history = useHistory();
  return (
    <MyContext.Provider value={{ ...MyContextValues(), history }}>
      {children}
    </MyContext.Provider>
  );
}
