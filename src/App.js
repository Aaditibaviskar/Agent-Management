import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/user/Dashboard";
import Home from "./pages/user/Home";
import InquiryForm from "./pages/user/InquiryPage";
import LeadPage from "./pages/user/LeadPage";
import ReportsPage from "./pages/admin/ReportsPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";

import AdminDashboard from "./pages/admin/AdminDashboard";
import ManagerPage from "./pages/admin/ManagerPage";
import AgentPage from "./pages/admin/AgentPage";
import RegionPage from "./pages/admin/RegionPage";
import ProjectPage from "./pages/admin/ProjectPage";
import PropertyPage from "./pages/admin/PropertyPage";
import AdminLeadPage from "./pages/admin/LeadPage";
import AdminReportsPage from "./pages/admin/ReportsPage";
import AdminHome from "./pages/admin/AdminHome";

import ManagerDashboard from "./pages/manager/ManagerDash";
import ManagerLeads from "./pages/manager/ManagerLeads";
import ManagerInquiries from "./pages/manager/ManagerInquiry";
import RegionStats from "./pages/manager/RegionStats";
import AgentPages from "./pages/manager/AgentPages";


import "./styles/UserDash.css";
import ManagerInquiry from "./pages/manager/ManagerInquiry";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="inquiry" element={<InquiryForm />} />

        <Route
          path="/manager"
          element={
            <ProtectedRoute roles={["MANAGER"]}>
              <ManagerDashboard />
            </ProtectedRoute>
          }
        >
          <Route path="leads" element={<ManagerLeads />} />
          <Route path="agents" element={<AgentPages />} />
          <Route path="inquiry"element={<ManagerInquiry />}/>
          <Route path="reports" element={<RegionStats />}/>
        </Route>

        <Route
          path="/admin"
          element={
            <ProtectedRoute roles={["ADMIN"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminHome />} />
          <Route path="managers" element={<ManagerPage />} />
          <Route path="agents" element={<AgentPage />} />
          <Route path="regions" element={<RegionPage />} />
          <Route path="projects" element={<ProjectPage />} />
          <Route path="properties" element={<PropertyPage />} />
          <Route path="leads" element={<AdminLeadPage />} />
          <Route path="reports" element={<AdminReportsPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

// import React from "react";
// import {
//   BrowserRouter,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";

// import AdminDashboard from "./pages/admin/AdminDashboard";

// import ManagerPage from "./pages/admin/ManagerPage";
// import AgentPage from "./pages/admin/AgentPage";
// import RegionPage from "./pages/admin/RegionPage";
// import ProjectPage from "./pages/admin/ProjectPage";
// import PropertyPage from "./pages/admin/PropertyPage";
// import LeadPage from "./pages/admin/LeadPage";
// import ReportsPage from "./pages/admin/ReportsPage";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>

//         {/* Redirect / to /admin */}
//         <Route
//           path="/"
//           element={<Navigate to="/admin" />}
//         />

//         {/* Admin Layout */}
//         <Route
//           path="/admin"
//           element={<AdminDashboard />}
//         >
//           <Route
//             index
//             element={<h2>Welcome Admin Dashboard</h2>}
//           />

//           <Route
//             path="managers"
//             element={<ManagerPage />}
//           />

//           <Route
//             path="agents"
//             element={<AgentPage />}
//           />

//           <Route
//             path="regions"
//             element={<RegionPage />}
//           />

//           <Route
//             path="projects"
//             element={<ProjectPage />}
//           />

//           <Route
//             path="properties"
//             element={<PropertyPage />}
//           />

//           <Route
//             path="leads"
//             element={<LeadPage />}
//           />

//           <Route
//             path="reports"
//             element={<ReportsPage />}
//           />
//         </Route>

//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
 
