import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { store } from "./store/store";
import { Provider } from "react-redux";
import FixScroll from "./components/Ui/FixScroll";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename="/goldenshoe">
        <FixScroll>
          <App />
        </FixScroll>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
