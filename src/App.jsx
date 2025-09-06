import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "@/components/organisms/Header";
import JobSearch from "@/components/pages/JobSearch";
import JobDetail from "@/components/pages/JobDetail";
import SavedJobs from "@/components/pages/SavedJobs";
import Applications from "@/components/pages/Applications";
import Alerts from "@/components/pages/Alerts";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <main>
          <Routes>
            <Route path="/" element={<JobSearch />} />
            <Route path="/jobs/:id" element={<JobDetail />} />
            <Route path="/saved-jobs" element={<SavedJobs />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/alerts" element={<Alerts />} />
          </Routes>
        </main>
        
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          toastStyle={{
            borderRadius: "0.5rem",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
          }}
        />
      </div>
    </Router>
  );
}

export default App;