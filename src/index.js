import React, { lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.scss";
import { Provider } from "react-redux";
import { store } from "logic/store/configureStore";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import RequiredAuthPage from "views/pages/RequiredAuthPage";

import LayoutAdmin from "views/layout/LayoutAdmin";
import LayoutManager from "views/layout/LayoutManager";
import LayoutTrainee from "views/layout/LayoutTrainee";
import LayoutTrainer from "views/layout/LayoutTrainer";
import { permissions } from "logic/constants/permissions";

const SignInPage = lazy(() => import("views/pages/SignInPage"));
const UnauthorizePage = lazy(() => import("views/pages/UnauthorizePage"));
const ResetPasswordPage = lazy(() => import("views/pages/ResetPasswordPage"));

// Admin Page
const AdminDashBoardPage = lazy(() =>
  import("views/pages/Admin/AdminDashBoardPage")
);
const ConfigPage = lazy(() => import("views/pages/Admin/ConfigPage"));
const AccountListPage = lazy(() => import("views/pages/Admin/AccountListPage"));
const AccountDetailPage = lazy(() =>
  import("views/pages/Admin/AccountDetailPage")
);
const CourseDetailPage = lazy(() =>
  import("views/pages/Admin/CourseDetailPage")
);
const CourseListPage = lazy(() => import("views/pages/Admin/CourseListPage"));
const CreateNewAccountPage = lazy(() =>
  import("views/pages/Admin/CreateNewAccountPage")
);
const CreateNewCoursePage = lazy(() =>
  import("views/pages/Admin/CreateNewCoursePage")
);
const CreateNewUniversityPage = lazy(() =>
  import("views/pages/Admin/CreateNewUniversityPage")
);
const CreateNewOJTBatch = lazy(() =>
  import("views/pages/Admin/CreateNewOJTBatch")
);
const SkillListPage = lazy(() => import("views/pages/Admin/SkillListPage"));
const PositionListPage = lazy(() =>
  import("views/pages/Admin/PositionListPage")
);
const UniversityListPage = lazy(() =>
  import("views/pages/Admin/UniversityListPage")
);
const UniversityDetailPage = lazy(() =>
  import("views/pages/Admin/UniversityDetailPage")
);
const ChangePasswordPage = lazy(() =>
  import("views/pages/Admin/ChangePasswordPage")
);

// Manager Page
const AttendancePage = lazy(() => import("views/pages/Manager/AttendancePage"));
const ManagerDashboardPage = lazy(() =>
  import("views/pages/Manager/ManagerDashboardPage")
);
const ManagerReportListPage = lazy(() =>
  import("views/pages/Manager/ManagerReportListPage")
);
const ManagerRoleTraineeDetailPage = lazy(() =>
  import("views/pages/Manager/TraineeDetailPage")
);
const TraineeListPage = lazy(() =>
  import("views/pages/Manager/TraineeListPage")
);
const TrainerAssignmentPage = lazy(() =>
  import("views/pages/Manager/TrainerAssignmentPage")
);
const TrainerDetailPage = lazy(() =>
  import("views/pages/Manager/TrainerDetailPage")
);
const TrainerListPage = lazy(() =>
  import("views/pages/Manager/TrainerListPage")
);
const TrainingPlanCertifyPage = lazy(() =>
  import("views/pages/Manager/TrainingPlanCertifyPage")
);
const TrainingPlanListPage = lazy(() =>
  import("views/pages/Manager/TrainingPlanListPage")
);
const DefineNewReportPage = lazy(() =>
  import("views/pages/Manager/DefineNewReportPage")
);
const DefineFormulaPage = lazy(() =>
  import("views/pages/Manager/DefineFormulaPage")
);
const ListFormulaPage = lazy(() =>
  import("views/pages/Manager/ListFormulaPage")
);
const ListTemplatePage = lazy(() =>
  import("views/pages/Manager/ListTemplatePage")
);
const FormulaDetailPage = lazy(() =>
  import("views/pages/Manager/FormulaDetailPage")
);
const TemplateDetailPage = lazy(() =>
  import("views/pages/Manager/TemplateDetailPage")
);
const ManagerProfilePage = lazy(() =>
  import("views/pages/Manager/ManagerProfilePage")
);

// Trainer Page
const AssignedTraineeListPage = lazy(() =>
  import("views/pages/Trainer/AssignedTraineeListPage")
);
const AssignedTraineeTaskListPage = lazy(() =>
  import("views/pages/Trainer/AssignedTraineeTaskListPage")
);
const CertificateCertifyPage = lazy(() =>
  import("views/pages/Trainer/CertificateCertifyPage")
);
const CreateNewTrainingPlanPage = lazy(() =>
  import("views/pages/Trainer/CreateNewTrainingPlanPage")
);
const OJTEvaluationPage = lazy(() =>
  import("views/pages/Trainer/OJTEvaluationPage")
);
const OJTStatisticsPage = lazy(() =>
  import("views/pages/Trainer/OJTStatisticsPage")
);
const TrainerDashboardPage = lazy(() =>
  import("views/pages/Trainer/TrainerDashboardPage")
);
const TrainerProfilePage = lazy(() =>
  import("views/pages/Trainer/TrainerProfilePage")
);
const TrainerTrainingPlanPage = lazy(() =>
  import("views/pages/Trainer/TrainerTrainingPlanPage")
);
const EvaluateExcelPage = lazy(() =>
  import("views/pages/Trainer/EvaluateExcelPage")
);
const TrainerRoleTraineeDetailPage = lazy(() =>
  import("views/pages/Trainer/TraineeDetailPage")
);
const AssignTrainingPlanPage = lazy(() =>
  import("views/pages/Trainer/AssignTrainingPlanPage")
);
const TrainerTaskCertifyPage = lazy(() => import("views/pages/Trainer/TrainerTaskCertifyPage"));

// Trainee Page
const TraineeCourseDetailPage = lazy(() =>
  import("views/pages/Trainee/TraineeCourseDetailPage")
);
const TraineeCourseListPage = lazy(() =>
  import("views/pages/Trainee/TraineeCourseListPage")
);
const TraineeDashboardPage = lazy(() =>
  import("views/pages/Trainee/TraineeDashboardPage")
);
const TraineePersonalStatisticsPage = lazy(() =>
  import("views/pages/Trainee/TraineePersonalStatisticsPage")
);
const TraineeProfilePage = lazy(() =>
  import("views/pages/Trainee/TraineeProfilePage")
);
const TraineeTaskListPage = lazy(() =>
  import("views/pages/Trainee/TraineeTaskListPage")
);
const TraineeTrainingPlanPage = lazy(() =>
  import("views/pages/Trainee/TraineeTrainingPlanPage")
);
const TraineeCertificateSubmitPage = lazy(() =>
  import("views/pages/Trainee/TraineeCertificateSubmitPage")
);

const container = document.getElementById("root");

const router = createBrowserRouter([
  {
    path: "/login",
    element: <SignInPage></SignInPage>,
  },
  {
    path: "/",
    element: (
      <RequiredAuthPage allowRole={permissions.ADMIN}></RequiredAuthPage>
    ),
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
            path: "/account-list/:userId",
            element: <AccountDetailPage></AccountDetailPage>,
          },
          {
            path: "/course-list/:courseId",
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
            path: "/create-new-ojt-batch/:universityId",
            element: <CreateNewOJTBatch></CreateNewOJTBatch>,
          },
          {
            path: "/skill-list",
            element: <SkillListPage></SkillListPage>,
          },
          {
            path: "/position-list",
            element: <PositionListPage></PositionListPage>,
          },
          {
            path: "/university-list",
            element: <UniversityListPage></UniversityListPage>,
          },
          {
            path: "/university/:universityId",
            element: <UniversityDetailPage></UniversityDetailPage>,
          },
          {
            path: "/change-password",
            element: <ChangePasswordPage></ChangePasswordPage>,
          },
          {
            path: "/config",
            element: <ConfigPage></ConfigPage>,
          },
        ],
      },
    ],
  },
  {
    path: "/",
    element: (
      <RequiredAuthPage allowRole={permissions.MANAGER}></RequiredAuthPage>
    ),
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
            path: "/manager-define-new-report",
            element: <DefineNewReportPage></DefineNewReportPage>,
          },
          {
            path: "/trainee-list/:traineeId",
            element: (
              <ManagerRoleTraineeDetailPage></ManagerRoleTraineeDetailPage>
            ),
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
            path: "/trainer-list/:trainerId",
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
          {
            path: "/define-formula",
            element: <DefineFormulaPage></DefineFormulaPage>,
          },
          {
            path: "/list-formula",
            element: <ListFormulaPage></ListFormulaPage>,
          },
          {
            path: "/list-template",
            element: <ListTemplatePage></ListTemplatePage>,
          },
          {
            path: "/formula-detail/:formulaId",
            element: <FormulaDetailPage></FormulaDetailPage>,
          },
          {
            path: "/template-detail/:templateId",
            element: <TemplateDetailPage></TemplateDetailPage>,
          },
          {
            path: "/manager-profile",
            element: <ManagerProfilePage></ManagerProfilePage>,
          },
        ],
      },
    ],
  },
  {
    path: "/",
    element: (
      <RequiredAuthPage allowRole={permissions.TRAINER}></RequiredAuthPage>
    ),
    children: [
      {
        path: "/",
        element: <LayoutTrainer></LayoutTrainer>,
        children: [
          {
            path: "/trainees-evaluate-excel/:ojtBatchId/:action",
            element: <EvaluateExcelPage></EvaluateExcelPage>,
          },
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
            path: "/trainer-training-plan",
            element: <TrainerTrainingPlanPage></TrainerTrainingPlanPage>,
          },
          {
            path: "/trainee/:traineeId",
            element: (
              <TrainerRoleTraineeDetailPage></TrainerRoleTraineeDetailPage>
            ),
          },
          {
            path: "/assign-training-plan",
            element: <AssignTrainingPlanPage></AssignTrainingPlanPage>,
          },
          {
            path: "/task-certify",
            element: <TrainerTaskCertifyPage></TrainerTaskCertifyPage>,
          },
        ],
      },
    ],
  },
  {
    path: "/",
    element: (
      <RequiredAuthPage allowRole={permissions.TRAINEE}></RequiredAuthPage>
    ),
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
            path: "/trainee-course-detail/:courseId",
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
          {
            path: "/trainee-certificate",
            element: (
              <TraineeCertificateSubmitPage></TraineeCertificateSubmitPage>
            ),
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <UnauthorizePage></UnauthorizePage>,
  },
  {
    path: "/unauthorize",
    element: <UnauthorizePage></UnauthorizePage>,
  },
  {
    path: "/reset-password",
    element: <ResetPasswordPage></ResetPasswordPage>,
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
