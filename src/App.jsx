import { Route, Routes } from "react-router-dom";
// Pages:
import HomePage from "@pages/HomePage";

function App() {
  return (
    <div className="App">
      {/* Routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  )
}

export default App;