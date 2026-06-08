import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import InquiryForm from "./pages/InquiryPage";
import LeadPage from "./pages/LeadPage";
import Home from "./pages/Home";
import "./styles/crm.css";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Dashboard />}>
        <Route index element={<Home />} />

          <Route index element={<h2>Dashboard Home</h2>} />

          <Route path="inquire" element={<InquiryForm />} />

          <Route path="leads" element={<LeadPage />}/>
          

        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;