import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import FormView from "./pages/FormView.jsx";
import Terms from "./pages/Terms.jsx";
import FormPreview from "./pages/FormPreview.jsx";
import Privacy from "./pages/Privacy.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/:username/:formId" element={<FormView />} />
      <Route path="/preview" element={<FormPreview />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />
    </Routes>
  );
}
