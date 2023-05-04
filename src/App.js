import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import Templates from "./pages/Templates";
import Home from "./pages/Home";
import Template1 from "./pages/Template1";
import { AuthContextProvider } from "./context/AuthContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditEducationForm from "./components/template1/educationEdit/EditEducationForm";
import EditExperienceForm from "./components/template1/educationEdit/EditExperienceForm";
import AddEducationForm from "./components/template1/educationEdit/AddEducationForm";
import ProtectedRoute from "./components/ProtectedRoute";
import Footer from "./components/Footer";
function App() {
  return (
    <>
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/templates' element={<Templates />} />
          <Route path='/' element={<Home />} />
          {/* <Route path='/template1' element={<Template1 />} /> */}
          <Route path='/template1/edit-education' element={<EditEducationForm />} />
          <Route path='/template1/edit-experience' element={<EditExperienceForm />} />
          <Route path='/template1/add-education' element={<AddEducationForm />} />
          <Route
            path='/template1'
            element={
              <ProtectedRoute>
                <Template1 />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </AuthContextProvider>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
