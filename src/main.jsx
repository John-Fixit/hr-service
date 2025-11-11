import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import DashboardContext from "./context/Dashboard.jsx";
import { NextUIProvider } from "@nextui-org/react";
import ToastProvider from "./providers/ToastProvider.jsx";
import QueryProvider from "./providers/QueryProvider.jsx";
import PostContext from "./context/Post.jsx";
import { SocketContextProvider } from "./context/SocketContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <React.StrictMode>
      <ToastProvider />
      <NextUIProvider>
        <DashboardContext>
          <QueryProvider>
            <SocketContextProvider>
              <PostContext>
                <App />
              </PostContext>
            </SocketContextProvider>
          </QueryProvider>
        </DashboardContext>
      </NextUIProvider>
    </React.StrictMode>
  </BrowserRouter>
);
