import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { message } from "antd";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { Menu } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { applyJob, resetJ } from "../states/jobSlice";
import Loading from "../Components/loading";
import { FormGroup } from "react-bootstrap";

function ApplyJob() {
  const { errorJ, successJ, loading } = useSelector((state) => state.jobSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [file, setFile] = useState("");
  const [Jtitle, setJTitle] = useState("");

  React.useEffect(() => {
    if (successJ !== null) {
      msg("success", successJ);
      dispatch(resetJ());
      navigate("/");
    }
    if (errorJ === "Call to a member function value() on null") {
      msg("error", `There is no ${Jtitle} vacancy`);
    } else {
      if (errorJ !== null) {
        msg("error", errorJ);
      }
    }
  }, [Jtitle, errorJ, successJ, navigate, dispatch]);

  const title = [
    getItem("Job title", "sub1", [
      getItem("administrator", "administrator"),
      getItem("pharmacist", "pharmacist"),
    ]),
  ];

  const SignupSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    fName: Yup.string().required("Required").min(2, "Too Short!"),
    lName: Yup.string().required("Required").min(2, "Too Short!"),
    phone: Yup.number().required("Required").min(3, "Too Short!"),
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
    enableReinitialize: true,
    initialValues: {
      fName: "",
      lName: "",
      email: "",
      phone: "",
      address: "",
      birthdate: "",
      gender: "",
    },
    validationSchema: SignupSchema,
    onSubmit: async () => {
      if (Jtitle !== "" && file !== "") {
        console.log(formik.values.fName);
        console.log(formik.values.lName);
        console.log(formik.values.email);
        console.log(formik.values.phone);
        console.log(formik.values.address);
        console.log(Jtitle);
        console.log(file);
        dispatch(
          applyJob({
            fName: formik.values.fName,
            lName: formik.values.lName,
            email: formik.values.email,
            date: formik.values.birthdate,
            gender: formik.values.gender,
            mobile: formik.values.phone,
            type: Jtitle,
            address: formik.values.address,
            resume: file,
          })
        );
      } else {
        msg("error", "Please fill the rest field");
      }
    },
  });

  function getItem(label, key, children, type) {
    return {
      key,
      children,
      label,
      type,
    };
  }

  const jobTitle = (item, key) => {
    setJTitle(item.key);
  };

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="page">
      <div className="bg-white rounded-md p-4 shadow-lg  ">
        <Form onSubmit={formik.handleSubmit}>
          <div className="flex gap-4">
            <div className="rounded-md bg-white shadow-md  w-72 h-form    ">
              <div className=" text-center p-1">
                <img
                  src={"/images/user.jpg"}
                  alt=""
                  className="rounded-full w-64 h-64"
                />
              </div>
              <span className="p-2 block text-center text-font2">
                Jop title:
              </span>
              <span className="p-2 block text-center text-SReg text-lg">
                <Menu
                  onSelect={(item, key) => jobTitle(item, key)}
                  style={{
                    width: 256,
                  }}
                  mode="inline"
                  items={title}
                />{" "}
              </span>
            </div>
            <div
              className="rounded-md bg-white  shadow-md p-2  h-form flex justify-between  "
              style={{ width: "1000px" }}
            >
              <div className="w-job  ml-8">
                <div className="xl:flex xl:gap-3 border-b-2 border-slate-100">
                  <Form.Group
                    className="mb-3 xl:col-md-6 text-font1 "
                    controlId="Fname"
                  >
                    <Form.Label>First name</Form.Label>
                    <Form.Control
                      name="fName"
                      type="text"
                      value={formik.values.fName}
                      onChange={formik.handleChange}
                      isInvalid={formik.touched.fName && !!formik.errors.fName}
                      isValid={formik.touched.fName && !formik.errors.fName}
                      onBlur={formik.handleBlur}
                      style={{
                        color: "#757575",
                      }}
                    />
                  </Form.Group>

                  <Form.Group
                    className="mb-3 xl:col-md-6 text-font1 "
                    controlId="Lname"
                  >
                    <Form.Label>Last name</Form.Label>
                    <Form.Control
                      name="lName"
                      type="text"
                      value={formik.values.lName}
                      onChange={formik.handleChange}
                      isInvalid={formik.touched.lName && !!formik.errors.lName}
                      isValid={formik.touched.lName && !formik.errors.lName}
                      onBlur={formik.handleBlur}
                      style={{
                        color: "#757575",
                      }}
                    />
                  </Form.Group>
                </div>
                <div className="xl:flex xl:gap-3 border-b-2 p-3 border-slate-100">
                  <Form.Group
                    className="mb-3 xl:col-md-6 text-font1 "
                    controlId="Birthdate"
                  >
                    <Form.Label>Birth date</Form.Label>
                    <Form.Control
                      name="birthdate"
                      type="date"
                      vlaue={formik.values.birthdate}
                      onChange={formik.handleChange}
                      isInvalid={
                        formik.touched.birthdate && !!formik.errors.birthdate
                      }
                      isValid={
                        formik.touched.birthdate && !formik.errors.birthdate
                      }
                      placeholder="Birth date"
                      onBlur={formik.handleBlur}
                      style={{
                        width: "190px",
                      }}
                    />
                  </Form.Group>
                  <FormGroup className="mb-3 xl:col-md-6 text-font1 ">
                    <Form.Label>Gender</Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      isInvalid={
                        formik.touched.gender && !!formik.errors.gender
                      }
                      isValid={formik.touched.gender && !formik.errors.gender}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      name="gender"
                      type="gender"
                      value={formik.values.gender}
                      style={{
                        width: "190px",
                      }}
                    >
                      <option></option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>I prefer not to say</option>
                    </Form.Select>
                  </FormGroup>
                </div>
                <Form.Group>
                  <div className="flex justify-between mb-3 border-b-2 border-slate-100 p-3 text-font1">
                    <span className="flex item-center"> Email</span>
                    <Form.Control
                      name="email"
                      type="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      isInvalid={formik.touched.email && !!formik.errors.email}
                      isValid={formik.touched.email && !formik.errors.email}
                      onBlur={formik.handleBlur}
                      style={{
                        width: "300px",
                        color: "#757575",
                      }}
                    />
                  </div>
                </Form.Group>
                <Form.Group>
                  <div className="flex justify-between mb-3 border-b-2 border-slate-100 p-3 text-font1">
                    <span className="flex item-center"> Phone</span>
                    <Form.Control
                      name="phone"
                      type="text"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      isInvalid={formik.touched.phone && !!formik.errors.phone}
                      isValid={formik.touched.phone && !formik.errors.phone}
                      onBlur={formik.handleBlur}
                      style={{
                        width: "300px",
                        color: "#757575",
                      }}
                    />
                  </div>
                </Form.Group>
                <Form.Group>
                  <div className="flex justify-between  p-3 text-font1">
                    <span className="flex item-center"> Address</span>
                    <Form.Control
                      name="address"
                      type="text"
                      value={formik.values.address}
                      onChange={formik.handleChange}
                      isInvalid={
                        formik.touched.address && !!formik.errors.address
                      }
                      isValid={formik.touched.address && !formik.errors.address}
                      onBlur={formik.handleBlur}
                      style={{
                        width: "300px",
                        color: "#757575",
                      }}
                    />
                  </div>
                </Form.Group>
              </div>
              <div className="text-font1 w-job text-center ">
                <img
                  src={"/images/resume.jpg"}
                  alt=""
                  className="mr-auto ml-auto rounded-md w-64 h-64"
                />
                <div>
                  <label
                    htmlFor="file"
                    className="  w-64 cursor-pointer p-1 border-SReg border-2 text-SReg rounded-md hover:text-white hover:bg-SReg hover:border-SReg duration-.3s  text-center"
                  >
                    Upload your cv{" "}
                  </label>
                  <input
                    type="file"
                    id="file"
                    onChange={handleFile}
                    className="hidden"
                  />
                </div>
                <div className="mt-1">
                  {file && `${file.name} - ${file.type}`}
                </div>
              </div>
            </div>
          </div>
          <div className="flex mt-4 gap-2 ">
            <div className="d-grid  ">
              <Loading
                loading={loading}
                error={errorJ}
                clss={
                  "w-64 p-1  border-SReg  border-2 text-SReg rounded-md  duration-.3s"
                }
              >
                <button
                  type="submit"
                  className="  w-64 p-1 border-SReg border-2 text-SReg rounded-md hover:text-white hover:bg-SReg hover:border-SReg duration-.3s  text-center"
                >
                  Send{" "}
                </button>
              </Loading>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default ApplyJob;
