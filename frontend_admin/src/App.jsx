import { BrowserRouter, Routes, Route } from "react-router-dom";
import Treatments from 'src/views/Treatments.jsx';

function App() {
  return (
    <BrowserRouter>
          <Routes>
            <Route path="/" element={<Treatments />} />
            <Route path="treatments" element={<Treatments />} />
          </Routes>
    </BrowserRouter>
  );
}

export default App;