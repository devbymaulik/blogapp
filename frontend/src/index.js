import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";
import "bootstrap/dist/css/bootstrap.min.css"; // ✅ Bootstrap styles
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Toaster } from "react-hot-toast";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/Store";
TimeAgo.addDefaultLocale(en); // ✅ only once
TimeAgo.addLocale(ru); // ✅ any additional locales
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>

      <Toaster />
    </Provider>
  </React.StrictMode>
);
