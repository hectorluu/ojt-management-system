import React, { lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.scss";
import { Provider } from "react-redux";
import { store } from "./store/configureStore";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import LayoutDashboard from "layout/LayoutDashboard";
import RequiredAuthPage from "pages/RequiredAuthPage";
import CampaignView from "modules/campaign/CampaignView";
import AdminDashBoardPage from "pages/Admin/AdminDashBoardPage";
import ManagerDashboardPage from "pages/Manager/ManagerDashboardPage";

import LayoutAdminDashboard from "layout/LayoutAdminDashboard";
import LayoutManagerDashboard from "layout/LayoutManagerDashboard";

const SignInPage = lazy(() => import("./pages/SignInPage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
// const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const CampaignPage = lazy(() => import("./pages/CampaignPage"));
const StartCampaignPage = lazy(() => import("./pages/StartCampaignPage"));
const PaymentPage = lazy(() => import("./pages/PaymentPage"));
const WithdrawPage = lazy(() => import("./pages/WithdrawPage"));
const UnauthorizePage = lazy(() => import("./pages/UnauthorizePage"));
const container = document.getElementById("root");

const router = createBrowserRouter([
  {
    path: "/login",
    element: <SignInPage></SignInPage>,
  },
  {
    path: "/register",
    element: <SignUpPage></SignUpPage>,
  },
  {
    element: <RequiredAuthPage allowRole={["admin"]}></RequiredAuthPage>,
    children: [
      {
        path: "/admin-dashboard",
        element: <LayoutAdminDashboard></LayoutAdminDashboard>,
        children: [
          {
            path: "/admin-dashboard/admin-dashboard",
            element: <AdminDashBoardPage></AdminDashBoardPage>,
          },
          {
            path: "/admin-dashboard/campaign",
            element: <CampaignPage></CampaignPage>,
          },
          {
            path: "/admin-dashboard/payment",
            element: <PaymentPage></PaymentPage>,
          },
          {
            path: "/admin-dashboard/withdraw",
            element: <WithdrawPage></WithdrawPage>,
          },
          {
            path: "/admin-dashboard/start-campaign",
            element: <StartCampaignPage></StartCampaignPage>,
          },
          {
            path: "/admin-dashboard/campaign/:slug",
            element: <CampaignView></CampaignView>,
          },
        ],
      },
    ],
  },
  {
    element: <RequiredAuthPage allowRole={["manager"]}></RequiredAuthPage>,
    children: [
      {
        path: "/manager-dashboard",
        element: <LayoutManagerDashboard></LayoutManagerDashboard>,
        children: [
          {
            path: "/manager-dashboard/manager-dashboard",
            element: <ManagerDashboardPage></ManagerDashboardPage>,
          },
          {
            path: "/manager-dashboard/campaign",
            element: <CampaignPage></CampaignPage>,
          },
          {
            path: "/manager-dashboard/payment",
            element: <PaymentPage></PaymentPage>,
          },
          {
            path: "/manager-dashboard/withdraw",
            element: <WithdrawPage></WithdrawPage>,
          },
          {
            path: "/manager-dashboard/start-campaign",
            element: <StartCampaignPage></StartCampaignPage>,
          },
          {
            path: "/manager-dashboard/campaign/:slug",
            element: <CampaignView></CampaignView>,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <>This page is not exist</>,
  },
  {
    path: "/unauthorize",
    element: <UnauthorizePage></UnauthorizePage>,
  },
]);

createRoot(container).render(
  <React.StrictMode>
    <Provider store={store}>
      <Suspense fallback={<p></p>}>
        <App>
          <RouterProvider router={router}></RouterProvider>
        </App>
      </Suspense>
      <ToastContainer bodyClassName="font-primary text-sm"></ToastContainer>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
