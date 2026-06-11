// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Dashboard from "./pages/user/Dashboard";
// import Home from "./pages/user/Home";
// import InquiryForm from "./pages/user/InquiryPage";
// import LeadPage from "./pages/user/LeadPage";

// import "./styles/UserDash.css";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>

//         <Route path="/" element={<Dashboard />}>

//           {/* default dashboard page */}
//           <Route index element={<Home />} />

//           <Route path="inquire" element={<InquiryForm />} />
//           <Route path="leads" element={<LeadPage />} />

//         </Route>

//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import AdminDashboard from "./pages/admin/AdminDashboard";

import ManagerPage from "./pages/admin/ManagerPage";
import AgentPage from "./pages/admin/AgentPage";
import RegionPage from "./pages/admin/RegionPage";
import ProjectPage from "./pages/admin/ProjectPage";
import PropertyPage from "./pages/admin/PropertyPage";
import LeadPage from "./pages/admin/LeadPage";
import ReportsPage from "./pages/admin/ReportsPage";
import AddManager from "./pages/admin/AddManager";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Redirect / to /admin */}
        <Route
          path="/"
          element={<Navigate to="/admin" />}
        />

        {/* Admin Layout */}
        <Route
          path="/admin"
          element={<AdminDashboard />}
        >
          <Route
            index
            element={<h2>Welcome Admin Dashboard</h2>}
          />

          <Route
            path="managers"
            element={<ManagerPage />}
          />

          <Route path="managers/add" 
          element={<AddManager />} 
          />

          <Route
            path="agents"
            element={<AgentPage />}
          />

          <Route
            path="regions"
            element={<RegionPage />}
          />

          <Route
            path="projects"
            element={<ProjectPage />}
          />

          <Route
            path="properties"
            element={<PropertyPage />}
          />

          <Route
            path="leads"
            element={<LeadPage />}
          />

          <Route
            path="reports"
            element={<ReportsPage />}
          />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
 