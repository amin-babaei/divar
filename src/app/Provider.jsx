"use client";

import AuthProvider from "@/context/AuthContext";
import { ChatProvider } from "@/context/ChatContext";
import { QueryProvider } from "@/context/QueryContext";
import Compose from "@/context/store";
import { Hydrate, QueryClient, QueryClientProvider, dehydrate } from "@tanstack/react-query";
import { useState } from "react";
import 'react-toastify/dist/ReactToastify.css';

export default function Providers({ children }) {
  const [queryClient] = useState(() => new QueryClient(
    {
      defaultOptions: {
        queries: {
          retry: 1,
          refetchOnWindowFocus: false,
        }
      }
    }));

  return (
    <Compose components={[AuthProvider, ChatProvider, QueryProvider]}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={dehydrate}>
          {children}
        </Hydrate>
      </QueryClientProvider>
    </Compose>
  );
}
