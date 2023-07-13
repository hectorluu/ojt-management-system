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

import LayoutAdminDashboard from "layout/LayoutAdminDashboard";
import LayoutManagerDashboard from "layout/LayoutManagerDashboard";
import AdminDashBoardPage from "./pages/Admin/AdminDashBoardPage";
import ManagerDashboardPage from "./pages/Manager/ManagerDashboardPage";

const SignInPage = lazy(() => import("./pages/SignInPage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
// const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const CampaignPage = lazy(() => import("./pages/CampaignPage"));
const StartCampaignPage = lazy(() => import("./pages/StartCampaignPage"));
const PaymentPage = lazy(() => import("./pages/PaymentPage"));
const WithdrawPage = lazy(() => import("./pages/WithdrawPage"));
const UnauthorizePage = lazy(() => import("./pages/UnauthorizePage"));

// prevent adding new lines when importing pages
// prettier-ignore
{
// Admin Page
const AdminDashboardPage = lazy(() => import("./pages/Admin/AdminDashBoardPage"));
const AccountListPage = lazy(() => import("./pages/Admin/AccountListPage"));
const CourseDetailPage = lazy(() => import("./pages/Admin/CourseDetailPage"));
const CourseListPage = lazy(() => import("./pages/Admin/CourseListPage"));
const CreateNewAccountPage = lazy(() => import("./pages/Admin/CreateNewAccountPage"));
const CreateNewCoursePage = lazy(() => import("./pages/Admin/CreateNewCoursePage"));
const CreateNewUniversityPage = lazy(() => import("./pages/Admin/CreateNewUniversityPage"));
const CriteriaListPage = lazy(() => import("./pages/Admin/CriteriaListPage"));
const SkillListPage = lazy(() => import("./pages/Admin/SkillListPage"));
const UniversityDetailPage = lazy(() => import("./pages/Admin/UniversityDetailPage"));
const UniversityListPage = lazy(() => import("./pages/Admin/UniversityListPage"));

// Manager Page
const AttendancePage = lazy(() => import("./pages/Manager/AttendancePage"));
const ManagerDashboardPage = lazy(() => import("./pages/Manager/ManagerDashboardPage"));
const ManagerReportListPage = lazy(() => import("./pages/Manager/ManagerReportListPage"));
const TraineeDetailPage = lazy(() => import("./pages/Manager/TraineeDetailPage"));
const TraineeListPage = lazy(() => import("./pages/Manager/TraineeListPage"));
const TrainerAssignmentPage = lazy(() => import("./pages/Manager/TrainerAssignmentPage"));
const TrainerDetailPage = lazy(() => import("./pages/Manager/TrainerDetailPage"));
const TrainerListPage = lazy(() => import("./pages/Manager/TrainerListPage"));
const TrainingPlanCertifyPage = lazy(() => import("./pages/Manager/TrainingPlanCertifyPage"));
const TrainingPlanListPage = lazy(() => import("./pages/Manager/TrainingPlanListPage"));

// Trainer Page
const AssignedTraineeListPage = lazy(() => import("./pages/Trainer/AssignedTraineeListPage"));
const AssignedTraineeTaskListPage = lazy(() => import("./pages/Trainer/AssignedTraineeTaskListPage"));
const CertificateCertifyPage = lazy(() => import("./pages/Trainer/CertificateCertifyPage"));
const CreateNewTrainingPlanPage = lazy(() => import("./pages/Trainer/CreateNewTrainingPlanPage"));
const ManageTrainingPlanPage = lazy(() => import("./pages/Trainer/ManageTrainingPlanPage"));
const OJTEvaluationPage = lazy(() => import("./pages/Trainer/OJTEvaluationPage"));
const OJTStatisticsPage = lazy(() => import("./pages/Trainer/OJTStatisticsPage"));
const TrainerReportListPage = lazy(() => import("./pages/Trainer/TrainerReportListPage"));
const TrainerDashboardPage = lazy(() => import("./pages/Trainer/TrainerDashboardPage"));
const TrainerProfilePage = lazy(() => import("./pages/Trainer/TrainerProfilePage"));
const TrainerTrainingPlanPage = lazy(() => import("./pages/Trainer/TrainerTrainingPlanPage"));

// Trainee Page
const TraineeCourseDetailPage = lazy(() => import("./pages/Trainee/TraineeCourseDetailPage"));
const TraineeCourseListPage = lazy(() => import("./pages/Trainee/TraineeCourseListPage"));
const TraineeDashboardPage = lazy(() => import("./pages/Trainee/TraineeDashboardPage"));
const TraineePersonalStatisticsPage = lazy(() => import("./pages/Trainee/TraineePersonalStatisticsPage"));
const TraineeProfilePage = lazy(() => import("./pages/Trainee/TraineeProfilePage"));
const TraineeTaskListPage = lazy(() => import("./pages/Trainee/TraineeTaskListPage"));
const TraineeTrainingPlanPage = lazy(() => import("./pages/Trainee/TraineeTrainingPlanPage"));
}

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
