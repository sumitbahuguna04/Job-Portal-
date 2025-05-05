import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";
import Jobs from "./components/Jobs";
import Browse from "./components/Browse";
import Profile from "./components/Profile";
import Jobdescription from "./components/Jobdescription";
import Companies from "./components/admin/Companies";
import Create from "./components/admin/CreateNewCompany/Create";
import CompanySetup from "./components/admin/CompanySetup";
import JobsAdmin from "./components/admin/JobsAdmin";
import AdminCreateJob from "./components/admin/AdminCreateJob";
import AdminJobUpdate from "./components/admin/AdminJobUpdate";
import Applicant from "./components/admin/Applicant";
import ApplicantsTable from "./components/admin/ApplicantsTable";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import ProtectedRouteStudent from "./components/ProtectedRouteStudent";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/jobs",
    element: (
      <ProtectedRouteStudent>
        <Jobs />
      </ProtectedRouteStudent>
    ),
  },
  {
    path: "/description/:id",
    element: (
      <ProtectedRouteStudent>
        <Jobdescription />
      </ProtectedRouteStudent>
    ),
  },
  {
    path: "/browse",
    element: (
      <ProtectedRouteStudent>
        <Browse />
      </ProtectedRouteStudent>
    ),
  },

  {
    path: "/profile",
    element: (
      <ProtectedRouteStudent>
        <Profile />
      </ProtectedRouteStudent>
    ),
  },

  {
    path: "/admin/companies",
    element: (
      <ProtectedRoute>
        <Companies />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/companies/create",
    element: (
      <ProtectedRoute>
        <Create />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/comapnies/:id",
    element: (
      <ProtectedRoute>
        <CompanySetup />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/comapnies/jobs",
    element: (
      <ProtectedRoute>
        <JobsAdmin />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/companies/createjobs",
    element: (
      <ProtectedRoute>
        <AdminCreateJob />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/companies/updatejobs/:id",
    element: (
      <ProtectedRoute>
        <AdminJobUpdate />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: (
      <ProtectedRoute>
        <Applicant />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/companies/applicants",
    element: (
      <ProtectedRoute>
        <ApplicantsTable />
      </ProtectedRoute>
    ),
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
