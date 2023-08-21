import PhStore from "./layout/Ph-store";
import React from "react";
import { Route, Routes } from "react-router-dom";
import PhLogin from "./pages/Ph-login";
import PhRegister from "./pages/Ph-register";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import UploadPrescription from "./pages/UploadPrescription";
import MyOrders from "./pages/MyOrders";
import Product from "./pages/Product";
import Interactions from "./pages/Interactions";
import SentEmail from "./pages/SentEmail";
import AuthLogin from "./Components/authLogin";
import PhContent from "./pages/Ph-content";
import Allergies from "./pages/Allergies";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassworf";
import EditProfile from "./pages/EditProfile";
import WishList from "./pages/WishList";
import ApplyJob from "./pages/ApplyJob";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<PhStore />}>
          <Route path="/" element={<PhContent />} />
          <Route path="cart" element={<Cart />} />
          <Route path="profile" element={<Profile />} />
          <Route path="editprofile" element={<EditProfile />} />
          <Route path="upload-prescription" element={<UploadPrescription />} />
          <Route path="my-orders" element={<MyOrders />} />
          <Route path="interaction" element={<Interactions />} />
          <Route path="product/:id" element={<Product />} />
          <Route path="allergies" element={<Allergies />} />
          <Route path="wishList" element={<WishList />} />
          <Route path="applyJob" element={<ApplyJob />} />
        </Route>
        <Route
          path="ph-login"
          element={
            <AuthLogin>
              <PhLogin />
            </AuthLogin>
          }
        />
        <Route path="ph-sentEmail" element={<SentEmail />} />
        <Route path="ph-register" element={<PhRegister />} />
        <Route path="ph-forgot-password" element={<ForgotPassword />} />
        <Route path="password-reset/:token" element={<ResetPassword />} />
      </Routes>
    </div>
  );
}

export default App;
