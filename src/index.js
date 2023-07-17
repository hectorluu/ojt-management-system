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

import RequiredAuthPage from "pages/RequiredAuthPage";

import LayoutAdmin from "layout/LayoutAdmin";
import LayoutManager from "layout/LayoutManager";
import LayoutTrainee from "layout/LayoutTrainee";
import LayoutTrainer from "layout/LayoutTrainer";
import { permissions } from "constants/permissions";

const SignInPage = lazy(() => import("./pages/SignInPage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const UnauthorizePage = lazy(() => import("./pages/UnauthorizePage"));

// prevent adding new lines when importing pages

// Admin Page
const AdminDashBoardPage = lazy(() =>
  import("./pages/Admin/AdminDashBoardPage")
);
const AccountListPage = lazy(() => import("./pages/Admin/AccountListPage"));
const CourseDetailPage = lazy(() => import("./pages/Admin/CourseDetailPage"));
const CourseListPage = lazy(() => import("./pages/Admin/CourseListPage"));
const CreateNewAccountPage = lazy(() =>
  import("./pages/Admin/CreateNewAccountPage")
);
const CreateNewCoursePage = lazy(() =>
  import("./pages/Admin/CreateNewCoursePage")
);
const CreateNewUniversityPage = lazy(() =>
  import("./pages/Admin/CreateNewUniversityPage")
);
const CriteriaListPage = lazy(() => import("./pages/Admin/CriteriaListPage"));
const SkillListPage = lazy(() => import("./pages/Admin/SkillListPage"));
const UniversityDetailPage = lazy(() =>
  import("./pages/Admin/UniversityDetailPage")
);
const UniversityListPage = lazy(() =>
  import("./pages/Admin/UniversityListPage")
);

// Manager Page
const AttendancePage = lazy(() => import("./pages/Manager/AttendancePage"));
const ManagerDashboardPage = lazy(() =>
  import("./pages/Manager/ManagerDashboardPage")
);
const ManagerReportListPage = lazy(() =>
  import("./pages/Manager/ManagerReportListPage")
);
const TraineeDetailPage = lazy(() =>
  import("./pages/Manager/TraineeDetailPage")
);
const TraineeListPage = lazy(() => import("./pages/Manager/TraineeListPage"));
const TrainerAssignmentPage = lazy(() =>
  import("./pages/Manager/TrainerAssignmentPage")
);
const TrainerDetailPage = lazy(() =>
  import("./pages/Manager/TrainerDetailPage")
);
const TrainerListPage = lazy(() => import("./pages/Manager/TrainerListPage"));
const TrainingPlanCertifyPage = lazy(() =>
  import("./pages/Manager/TrainingPlanCertifyPage")
);
const TrainingPlanListPage = lazy(() =>
  import("./pages/Manager/TrainingPlanListPage")
);

// Trainer Page
const AssignedTraineeListPage = lazy(() =>
  import("./pages/Trainer/AssignedTraineeListPage")
);
const AssignedTraineeTaskListPage = lazy(() =>
  import("./pages/Trainer/AssignedTraineeTaskListPage")
);
const CertificateCertifyPage = lazy(() =>
  import("./pages/Trainer/CertificateCertifyPage")
);
const CreateNewTrainingPlanPage = lazy(() =>
  import("./pages/Trainer/CreateNewTrainingPlanPage")
);
const ManageTrainingPlanPage = lazy(() =>
  import("./pages/Trainer/ManageTrainingPlanPage")
);
const OJTEvaluationPage = lazy(() =>
  import("./pages/Trainer/OJTEvaluationPage")
);
const OJTStatisticsPage = lazy(() =>
  import("./pages/Trainer/OJTStatisticsPage")
);
const TrainerReportListPage = lazy(() =>
  import("./pages/Trainer/TrainerReportListPage")
);
const TrainerDashboardPage = lazy(() =>
  import("./pages/Trainer/TrainerDashboardPage")
);
const TrainerProfilePage = lazy(() =>
  import("./pages/Trainer/TrainerProfilePage")
);
const TrainerTrainingPlanPage = lazy(() =>
  import("./pages/Trainer/TrainerTrainingPlanPage")
);

// Trainee Page
const TraineeCourseDetailPage = lazy(() =>
  import("./pages/Trainee/TraineeCourseDetailPage")
);
const TraineeCourseListPage = lazy(() =>
  import("./pages/Trainee/TraineeCourseListPage")
);
const TraineeDashboardPage = lazy(() =>
  import("./pages/Trainee/TraineeDashboardPage")
);
const TraineePersonalStatisticsPage = lazy(() =>
  import("./pages/Trainee/TraineePersonalStatisticsPage")
);
const TraineeProfilePage = lazy(() =>
  import("./pages/Trainee/TraineeProfilePage")
);
const TraineeTaskListPage = lazy(() =>
  import("./pages/Trainee/TraineeTaskListPage")
);
const TraineeTrainingPlanPage = lazy(() =>
  import("./pages/Trainee/TraineeTrainingPlanPage")
);

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
    path: "/",
    element: <RequiredAuthPage allowRole={permissions.ADMIN}></RequiredAuthPage>,
    children: [
      {
        path: "/",
        element: <LayoutAdmin></LayoutAdmin>,
        children: [
          {
            path: "/admin-dashboard",
            element: <AdminDashBoardPage></AdminDashBoardPage>,
          },
          {
            path: "/account-list",
            element: <AccountListPage></AccountListPage>,
          },
          {
            path: "/course-detail",
            element: <CourseDetailPage></CourseDetailPage>,
          },
          {
            path: "/course-list",
            element: <CourseListPage></CourseListPage>,
          },
          {
            path: "/create-new-account",
            element: <CreateNewAccountPage></CreateNewAccountPage>,
          },
          {
            path: "/create-new-course",
            element: <CreateNewCoursePage></CreateNewCoursePage>,
          },
          {
            path: "/create-new-university",
            element: <CreateNewUniversityPage></CreateNewUniversityPage>,
          },
          {
            path: "/criteria-list",
            element: <CriteriaListPage></CriteriaListPage>,
          },
          {
            path: "/skill-list",
            element: <SkillListPage></SkillListPage>,
          },
          {
            path: "/university-detail",
            element: <UniversityDetailPage></UniversityDetailPage>,
          },
          {
            path: "/university-list",
            element: <UniversityListPage></UniversityListPage>,
          },
        ],
      },
    ],
  },
  {
    path: "/",
    element: <RequiredAuthPage allowRole={permissions.MANAGER}></RequiredAuthPage>,
    children: [
      {
        path: "/",
        element: <LayoutManager></LayoutManager>,
        children: [
          {
            path: "/manager-dashboard",
            element: <ManagerDashboardPage></ManagerDashboardPage>,
          },
          {
            path: "/attendance",
            element: <AttendancePage></AttendancePage>,
          },
          {
            path: "/manager-report-list",
            element: <ManagerReportListPage></ManagerReportListPage>,
          },
          {
            path: "/trainee-detail",
            element: <TraineeDetailPage></TraineeDetailPage>,
          },
          {
            path: "/trainee-list",
            element: <TraineeListPage></TraineeListPage>,
          },
          {
            path: "/trainer-assignment",
            element: <TrainerAssignmentPage></TrainerAssignmentPage>,
          },
          {
            path: "/trainer-detail",
            element: <TrainerDetailPage></TrainerDetailPage>,
          },
          {
            path: "/trainer-list",
            element: <TrainerListPage></TrainerListPage>,
          },
          {
            path: "/training-plan-certify",
            element: <TrainingPlanCertifyPage></TrainingPlanCertifyPage>,
          },
          {
            path: "/training-plan-list",
            element: <TrainingPlanListPage></TrainingPlanListPage>,
          },
        ],
      },
    ],
  },
  {
    path: "/",
    element: <RequiredAuthPage allowRole={permissions.TRAINER}></RequiredAuthPage>,
    children: [
      {
        path: "/",
        element: <LayoutTrainer></LayoutTrainer>,
        children: [
          {
            path: "/trainer-dashboard",
            element: <TrainerDashboardPage></TrainerDashboardPage>,
          },
          {
            path: "/assigned-trainee-list",
            element: <AssignedTraineeListPage></AssignedTraineeListPage>,
          },
          {
            path: "/assigned-trainee-task-list",
            element: (
              <AssignedTraineeTaskListPage></AssignedTraineeTaskListPage>
            ),
          },
          {
            path: "/certificate-certify",
            element: <CertificateCertifyPage></CertificateCertifyPage>,
          },
          {
            path: "/create-new-training-plan",
            element: <CreateNewTrainingPlanPage></CreateNewTrainingPlanPage>,
          },
          {
            path: "/manage-training-plan",
            element: <ManageTrainingPlanPage></ManageTrainingPlanPage>,
          },
          {
            path: "/ojt-evaluation",
            element: <OJTEvaluationPage></OJTEvaluationPage>,
          },
          {
            path: "/ojt-statistics",
            element: <OJTStatisticsPage></OJTStatisticsPage>,
          },
          {
            path: "/trainer-profile",
            element: <TrainerProfilePage></TrainerProfilePage>,
          },
          {
            path: "/trainer-report-list",
            element: <TrainerReportListPage></TrainerReportListPage>,
          },
          {
            path: "/trainer-training-plan",
            element: <TrainerTrainingPlanPage></TrainerTrainingPlanPage>,
          },
        ],
      },
    ],
  },
  {
    path: "/",
    element: <RequiredAuthPage allowRole={permissions.TRAINEE}></RequiredAuthPage>,
    children: [
      {
        path: "/",
        element: <LayoutTrainee></LayoutTrainee>,
        children: [
          {
            path: "/trainee-dashboard",
            element: <TraineeDashboardPage></TraineeDashboardPage>,
          },
          {
            path: "/trainee-course-detail",
            element: <TraineeCourseDetailPage></TraineeCourseDetailPage>,
          },
          {
            path: "/trainee-course-list",
            element: <TraineeCourseListPage></TraineeCourseListPage>,
          },
          {
            path: "/trainee-personal-statistics",
            element: (
              <TraineePersonalStatisticsPage></TraineePersonalStatisticsPage>
            ),
          },
          {
            path: "/trainee-profile",
            element: <TraineeProfilePage></TraineeProfilePage>,
          },
          {
            path: "/trainee-task-list",
            element: <TraineeTaskListPage></TraineeTaskListPage>,
          },
          {
            path: "/trainee-training-plan",
            element: <TraineeTrainingPlanPage></TraineeTrainingPlanPage>,
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
  <Provider store={store}>
    <Suspense fallback={<p></p>}>
      <App>
        <RouterProvider router={router}></RouterProvider>
      </App>
    </Suspense>
    <ToastContainer bodyClassName="font-primary text-sm"></ToastContainer>
  </Provider>
);

reportWebVitals();
