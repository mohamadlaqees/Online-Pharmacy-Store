import * as React from "react";
import Form from "react-bootstrap/Form";
import * as Yup from "yup";
import { message } from "antd";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../states/registerSlice";
import { resetR } from "../states/registerSlice";
import { getCSRF, setEmail } from "../states/authSalice";
export default function Register() {
  const { errorR, successR } = useSelector((state) => state.registerSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (successR !== null) {
      navigate("/ph-sentEmail");
      dispatch(resetR());
      msg("success", `${successR}`);
    }
    if (errorR !== null) {
      msg("error", "This user is already exist !");
    }
  }, [errorR, successR, dispatch, navigate]);

  const SignupSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required").min(8, "Too Short!"),
    Fname: Yup.string().required("Required").min(2, "Too Short!"),
    Lname: Yup.string().required("Required").min(2, "Too Short!"),
    address: Yup.string().required("Required"),
    birthdate: Yup.date().required("Required"),
    gender: Yup.string().required("Required"),
  });
  const msg = (type, msg) => {
    switch (type) {
      case "success":
        message.success(msg);
        break;
      case "error":
        message.error(msg);
        break;
      default:
        return "";
    }
  };
  const formik = useFormik({
    initialValues: {
      Fname: "",
      Lname: "",
      email: "",
      password: "",
      address: "",
      birthdate: "",
      gender: "",
    },
    validationSchema: SignupSchema,
    onSubmit: async () => {
      dispatch(getCSRF());
      dispatch(setEmail(formik.values.email));
      dispatch(
        register({
          email: formik.values.email,
          password: formik.values.password,
          first_name: formik.values.Fname,
          last_name: formik.values.Lname,
          gender: formik.values.gender,
          address: formik.values.address,
          birthdate: formik.values.birthdate,
        })
      );
    },
  });

  return (
    <React.Fragment>
      <div className=" xl:flex xl:justify-between">
        <div className="w-96 mt-20 ml-auto mr-auto   xl:w-form h-fit relative xl:m-auto shadow-xl p-5 rounded-md bg-secondry  ">
          <Form onSubmit={formik.handleSubmit}>
            <div className="xl:flex xl:gap-3">
              <Form.Group className="mb-3 xl:col-md-6 " controlId="Fname">
                <Form.Label className="text-SWord">First name</Form.Label>
                <Form.Control
                  name="Fname"
                  type="text"
                  placeholder="First name"
                  value={formik.values.Fname}
                  onChange={formik.handleChange}
                  isInvalid={formik.touched.Fname && !!formik.errors.Fname}
                  isValid={formik.touched.Fname && !formik.errors.Fname}
                  onBlur={formik.handleBlur}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.Fname}
                </Form.Control.Feedback>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3 xl:col-md-6 " controlId="Lname">
                <Form.Label className="text-SWord">Last name</Form.Label>
                <Form.Control
                  name="Lname"
                  type="text"
                  placeholder="Last name"
                  value={formik.values.Lname}
                  onChange={formik.handleChange}
                  isInvalid={formik.touched.Lname && !!formik.errors.Lname}
                  isValid={formik.touched.Lname && !formik.errors.Lname}
                  onBlur={formik.handleBlur}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.Lname}
                </Form.Control.Feedback>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </div>

            <div className="xl:flex xl:gap-3">
              <Form.Group className="mb-3 xl:col-md-6" controlId="Email">
                <Form.Label className="text-SWord">Email</Form.Label>
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

              <Form.Group className="mb-3 xl:col-md-6" controlId="Password">
                <Form.Label className="text-SWord">Password</Form.Label>
                <Form.Control
                  name="password"
                  type="password"
                  vlaue={formik.values.password}
                  onChange={formik.handleChange}
                  isInvalid={
                    formik.touched.password && !!formik.errors.password
                  }
                  isValid={formik.touched.password && !formik.errors.password}
                  placeholder="Password"
                  onBlur={formik.handleBlur}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.password}
                </Form.Control.Feedback>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </div>
            <div className="mb-4">
              <Form.Label className="text-SWord">Gender</Form.Label>
              <Form.Select
                aria-label="Default select example"
                isInvalid={formik.touched.gender && !!formik.errors.gender}
                isValid={formik.touched.gender && !formik.errors.gender}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                name="gender"
                type="gender"
                value={formik.values.gender}
              >
                <option></option>
                <option>Male</option>
                <option>Female</option>
                <option>I prefer not to say</option>
              </Form.Select>
            </div>
            <div className="xl:flex xl:gap-3">
              <Form.Group className="mb-3 xl:col-md-6" controlId="Address">
                <Form.Label className="text-SWord">Address</Form.Label>
                <Form.Control
                  name="address"
                  type="address"
                  vlaue={formik.values.address}
                  onChange={formik.handleChange}
                  isInvalid={formik.touched.address && !!formik.errors.address}
                  isValid={formik.touched.address && !formik.errors.address}
                  placeholder="Address"
                  onBlur={formik.handleBlur}
                />
              </Form.Group>

              <Form.Group className="mb-3 xl:col-md-6" controlId="Birthdate">
                <Form.Label className="text-SWord">Birth date</Form.Label>
                <Form.Control
                  name="birthdate"
                  type="date"
                  vlaue={formik.values.birthdate}
                  onChange={formik.handleChange}
                  isInvalid={
                    formik.touched.birthdate && !!formik.errors.birthdate
                  }
                  isValid={formik.touched.birthdate && !formik.errors.birthdate}
                  placeholder="Birth date"
                  onBlur={formik.handleBlur}
                />
              </Form.Group>
            </div>

            <div className="d-grid gap-2 mb-8 mt-4">
              <button
                type="submit"
                className="p-1 border-SReg border-2 text-SReg rounded-md hover:text-white hover:bg-SReg hover:border-SReg duration-.3s"
              >
                Register
              </button>
            </div>
            <span className=" block text-center text-SReg">
              Already have an account{" ? "}
              <span>
                <Link
                  className="hover:hover:text-SReg text-gray-400  transition no-underline"
                  to={"/ph-login"}
                >
                  Login
                </Link>
              </span>
            </span>
          </Form>
        </div>
        <div className="h-full w-photo">
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
