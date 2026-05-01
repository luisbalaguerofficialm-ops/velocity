import React, { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SuspenseUi from "../components/SuspenseUi.jsx";
import Message from "../pages/Message.jsx";

/* =========================
   📦 Layouts
========================= */
const MainLayout = lazy(() => import("../layouts/MainLayout.jsx"));
const DashboardLayout = lazy(() => import("../layouts/DashboardLayout.jsx"));

/* =========================
   🌐 Public Pages
========================= */
const HomePage = lazy(() => import("../pages/HomePage.jsx"));
const Services = lazy(() => import("../pages/Services.jsx"));
const GlobalNetwork = lazy(() => import("../pages/GlobalNetwork.jsx"));
const Onboarding = lazy(() => import("../pages/Onboarding.jsx"));
const TrackingDetail = lazy(() => import("../pages/TrackingDetail.jsx"));
const Tracking = lazy(() => import("../pages/Tracking.jsx"));
const AboutUs = lazy(() => import("../pages/AboutUs.jsx"));
const ContactUs = lazy(() => import("../pages/ContactUs.jsx"));
const UpdateStatusSuccess = lazy(
  () => import("../features/UpdateStatusSuccess.jsx"),
);

/* =========================
   🛠 Admin Pages
========================= */
const AdminDashboard = lazy(
  () => import("../components/dashboard/AdminDashboard.jsx"),
);
const CreateShipment = lazy(() => import("../pages/CreateShipment.jsx"));
const EditShipment = lazy(() => import("../components/EditShipment.jsx"));
const ShipmentCreatedSuccessfully = lazy(
  () => import("../features/ShipmentCreatedSuccessfully.jsx"),
);
const NotificationHistory = lazy(
  () => import("../pages/NotificationHistory.jsx"),
);
const ShipmentDetail = lazy(() => import("../pages/ShipmentDetail.jsx"));
const UpdateStatus = lazy(() => import("../features/UpdateStatus.jsx"));
const LiveMap = lazy(() => import("../pages/LiveMap.jsx"));
const ManageShipments = lazy(() => import("../pages/ManageShipments.jsx"));
const SelectCourier = lazy(() => import("../pages/SelectCourier.jsx"));
const AllShipmentFeed = lazy(() => import("../pages/AllShipmentFeed.jsx"));
const CourierAssigned = lazy(() => import("../features/CourierAssigned.jsx"));
const Notifications = lazy(() => import("../pages/Notifications.jsx"));
const AddCourier = lazy(() => import("../pages/AddCourier.jsx"));
const ViewInFleet = lazy(() => import("../pages/ViewInFleet.jsx"));
const CourierRegistrationSuccess = lazy(
  () => import("../components/CourierRegistrationSuccess.jsx"),
);
const AdminProfile = lazy(() => import("../components/AdminProfile.jsx"));
const AdminCourierProfile = lazy(
  () => import("../components/AdminCourierProfile.jsx"),
);

/* =========================
   🔐 Auth / Standalone
========================= */
const ResetPassword = lazy(() => import("../pages/Auth/ResetPassword.jsx"));
const SignIn = lazy(() => import("../pages/Auth/SignIn.jsx"));
const SignUp = lazy(() => import("../pages/Auth/SignUp.jsx"));
const VerifyAccount = lazy(() => import("../pages/Auth/VerifyAccount.jsx"));
const VerificationSuccess = lazy(
  () => import("../features/VerificationSuccess.jsx"),
);

/* =========================
   🚀 Router
========================= */
export default function AppRoutes() {
  const routes = [
    /* =========================
       🌐 PUBLIC ROUTES
    ========================= */
    {
      path: "/",
      element: (
        <Suspense fallback={<SuspenseUi />}>
          <MainLayout />
        </Suspense>
      ),
      children: [
        { index: true, element: <HomePage /> },
        { path: "services", element: <Services /> },
        { path: "global-network", element: <GlobalNetwork /> },
        { path: "onboarding", element: <Onboarding /> },
        { path: "tracking-detail/:trackingId", element: <TrackingDetail /> },
        { path: "tracking", element: <Tracking /> },
        { path: "about-us", element: <AboutUs /> },
        { path: "contact-us", element: <ContactUs /> },
      ],
    },

    /* =========================
       🛠 ADMIN ROUTES (NO NAVBAR/FOOTER)
    ========================= */
    {
      path: "/admin",
      element: (
        <Suspense fallback={<SuspenseUi />}>
          <DashboardLayout />
        </Suspense>
      ),
      children: [
        { index: true, element: <AdminDashboard /> },
        { path: "dashboard", element: <AdminDashboard /> },
        { path: "create-shipment", element: <CreateShipment /> },
        { path: "edit-shipment/:id", element: <EditShipment /> },
        {
          path: "shipment-successful",
          element: <ShipmentCreatedSuccessfully />,
        },
        { path: "Update-Status-Success", element: <UpdateStatusSuccess /> },
        {
          path: "courier-success",
          element: <CourierRegistrationSuccess />,
        },
        { path: "admin-profile", element: <AdminProfile /> },
        { path: "shipment-detail/:id", element: <ShipmentDetail /> },
        { path: "message", element: <Message /> },
        { path: "update-status/:id", element: <UpdateStatus /> },
        { path: "live-map/:id", element: <LiveMap /> },
        { path: "manage-shipments", element: <ManageShipments /> },
        { path: "select-courier", element: <SelectCourier /> },
        { path: "shipment-list", element: <AllShipmentFeed /> },
        { path: "courier-assigned", element: <CourierAssigned /> },
        { path: "notifications", element: <Notifications /> },
        { path: "add-courier", element: <AddCourier /> },
        { path: "view-in-fleet", element: <ViewInFleet /> },
        { path: "admin-courier-profile/:id", element: <AdminCourierProfile /> },
        { path: "Notification-History", element: <NotificationHistory /> },
      ],
    },

    /* =========================
       🔐 AUTH / STANDALONE
    ========================= */
    {
      path: "reset-password",
      element: (
        <Suspense fallback={<SuspenseUi />}>
          <ResetPassword />
        </Suspense>
      ),
    },
    {
      path: "auth/signup",
      element: (
        <Suspense fallback={<SuspenseUi />}>
          <SignUp />
        </Suspense>
      ),
    },
    {
      path: "verify",
      element: (
        <Suspense fallback={<SuspenseUi />}>
          <VerifyAccount />
        </Suspense>
      ),
    },
    {
      path: "signIn",
      element: (
        <Suspense fallback={<SuspenseUi />}>
          <SignIn />
        </Suspense>
      ),
    },
    {
      path: "verification-Success",
      element: (
        <Suspense fallback={<SuspenseUi />}>
          <VerificationSuccess />
        </Suspense>
      ),
    },
  ];

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
}
