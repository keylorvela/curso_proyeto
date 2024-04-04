import { BrowserRouter, Routes, Route } from "react-router-dom";
import Treatments from 'src/views/Treatments.jsx';
import ModifyTreatment from 'src/views/ModifyTreatment.jsx';

function App() {
  return (
    <BrowserRouter>
          <Routes>
            <Route path="/" element={<ModifyTreatment />} />
            <Route path="treatments" element={<Treatments />} />
            <Route path="modifyTreatment/:id" element={<ModifyTreatment />} />
          </Routes>
    </BrowserRouter>
  );
}

export default App;