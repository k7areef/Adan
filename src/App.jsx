import { Route, Routes } from "react-router-dom";
// Pages:
import HomePage from "@pages/HomePage";
// Common Components:
import Header from "@components/layout/Header";
import Footer from "@components/layout/Footer";

function App() {
  return (
    <div className="App min-h-screen bg-background">
      {/* Header */}
      <Header />
      {/* Routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App;