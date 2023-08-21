import * as React from "react";
import { message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { forgetPassword, resetA } from "../states/authSalice";
import Loading from "../Components/loading";
import Form from "react-bootstrap/Form";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function ForgotPassword() {
  const { errorA, successA, loadingA } = useSelector(
    (state) => state.authSlice
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (successA !== null) {
      msg("sucesss", successA);
      dispatch(resetA());
    } else {
      if (errorA !== null) {
        msg("error", errorA);
      }
    }
  }, [successA, errorA, navigate, dispatch]);

  const msg = (type, msg) => {
    switch (type) {
      case "sucesss":
        message.success(msg);
        break;
      case "error":
        message.error(msg);
        break;
      default:
        return "";
    }
  };
  const SignupSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: SignupSchema,
    onSubmit: async () => {
      dispatch(forgetPassword({ email: formik.values.email }));
    },
  });
  
  return (
    <React.Fragment>
      <div className="flex justify-between">
        <div className="Fpass">
          <div className="mt-20 text-lg text-center ">
            Send password reset link to :
            <div className="text-SWord mt-10">
              {localStorage.getItem("email")}
            </div>
            <div className="d-grid gap-2 ">
              <Form onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control
                    name="email"
                    type="email"
                    placeholder="Enter email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    isInvalid={formik.touched.email && !!formik.errors.email}
                    isValid={formik.touched.email && !formik.errors.email}
                    onBlur={formik.handleBlur}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.email}
                  </Form.Control.Feedback>
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <div className="d-grid gap-2 ">
                  <Loading
                    error={errorA}
                    loading={loadingA}
                    clss={"p-1  border-SReg border-2 text-SReg rounded-md"}
                  >
                    <button
                      type="submit"
                      className="p-1  border-SReg border-2 text-SReg rounded-md hover:text-white hover:bg-SReg hover:border-SReg duration-.3s"
                    >
                      Send
                    </button>
                  </Loading>
                </div>
              </Form>
            </div>
            <span className=" block mt-8 text-center text-SReg">
              back to{" "}
              <span>
                <Link
                  className="hover:text-SReg text-gray-400  transition no-underline"
                  to={"/ph-login"}
                >
                  login
                </Link>
              </span>
            </span>
          </div>
        </div>
        <div className="h-full">
          <img
            src="/images/pharmacist_1.jpg"
            alt=""
            className="h-photo hidden xl:block "
          />
        </div>
      </div>
    </React.Fragment>
  );
}
