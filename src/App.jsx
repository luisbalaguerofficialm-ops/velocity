import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
// import { AuthProvider } from "./store/AuthProvider.jsx";
import AppRoutes from "./routes/AppRoutes";
import { SocketProvider } from "./context/SocketProvider.jsx";

const queryClient = new QueryClient();

export default function App() {
  return (
    <>
      <Toaster position="top-right" richColors />
      <QueryClientProvider client={queryClient}>
        {/* <AuthProvider> */}
        <SocketProvider>
          <AppRoutes />
        </SocketProvider>
        {/* </AuthProvider> */}
      </QueryClientProvider>
    </>
  );
}
