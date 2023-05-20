import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

import history from "./history";
import { store } from "./store";

import App from "./App";
import { StoreProvider } from "./store/globalstate";
import ScrollTop from "./components/ScrollTop";
const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: "30px",
  // you can also just use 'scale'
  transition: transitions.SCALE,
};

// Bọc App component vào trong Store Provider để App và toàn bộ Component con đều có thể truy xuất đến Store
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter history={history}>
        <AlertProvider template={AlertTemplate} {...options}>
          <I18nextProvider i18n={i18n}>
            <StoreProvider>
              <ScrollTop />
              <App />
            </StoreProvider>
          </I18nextProvider>
        </AlertProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,

  document.getElementById("root")
);
