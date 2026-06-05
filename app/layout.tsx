// app/layout.tsx
import "./globals.css";
import { Toaster } from "react-hot-toast";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="font-poppins antialiased bg-black text-white min-h-screen p-0 m-0 overflow-x-hidden">
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#000000",
              color: "#fff",
            },
          }}
        />
      </body>
    </html>
  );
};

export default RootLayout;
