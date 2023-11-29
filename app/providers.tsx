// app/providers.tsx
"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider, createLocalStorageManager } from "@chakra-ui/react";

import theme from "../app/src/themes/index";
import { Provider } from "react-redux";
import store from "./src/reduxs/store";


export function Providers({ children }: { children: React.ReactNode }) {
const manager = createLocalStorageManager(theme.toString())
  return (
    <Provider store={store}>
      <CacheProvider>
        <ChakraProvider theme={theme}  colorModeManager={manager}>{children}</ChakraProvider>
      </CacheProvider>
    </Provider>
  );
}
