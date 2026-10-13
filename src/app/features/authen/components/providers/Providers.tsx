"use client";

import { ReactNode } from "react";

import { Provider } from "react-redux";
import { createStore, PreloadedState, AppStore } from "../../store/store";
import { useRef } from "react";
import { setAuthInfo } from "../../store/store.slice";

type ProvidersProps = {
  children: ReactNode;
  preloadedState: Parameters<typeof createStore>[0];
};

export default function Providers({
  children,
  preloadedState,
}: ProvidersProps) {
  const storeRef = useRef<null | AppStore>(null);

  if (!storeRef.current) {
    storeRef.current = createStore(preloadedState);
  }

  return (
    <Provider store={storeRef.current}>
      {children}
    </Provider>
  );
}