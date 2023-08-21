import React, { useEffect, useRef } from "react";
import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { message } from "antd";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAccount,
  getUserData,
  setAddress,
  setBirthDate,
  setFirstName,
  setGender,
  setImage,
  setLastName,
  setMobile,
} from "../states/authSalice";
import { logout } from "../states/loginSlice";

function EditProfile() {
  const { userData, successA, errorA, image } = useSelector(
    (state) => state.authSlice
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userImage, setUserImage] = useState({ preview: image, raw: "" });
  const fName = useRef(userData.first_name);
  const lName = useRef(userData.last_name);
  const gender = useRef(userData.gender);
  const address = useRef(userData.address);
  const birthDate = useRef(userData.date_of_birth);
  const mobile = useRef(userData.mobile);
  const photo = useRef(image);

  useEffect(() => {
    dispatch(getUserData());
    if (successA !== null) {
      msg("success", successA);
    }
    if (errorA !== null) {
      msg("error", errorA);
    }
  }, [errorA, successA, dispatch]);

  const SignupSchema = Yup.object().shape({
    gender: Yup.string().required("Required"),
    firstName: Yup.string().required("Required").min(2, "Too Short!"),
    lastName: Yup.string().required("Required").min(2, "Too Short!"),
    budget: Yup.number().required("Required"),
    mobile: Yup.number().notRequired(),
    address: Yup.string().required("Required"),
    date: Yup.date().required("Required"),
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
      firstName: userData.first_name,
      lastName: userData.last_name,
      gender: userData.gender,
      budget: userData.money,
      mobile: userData.mobile,
      address: userData.address,
      date: userData.date_of_birth,
    },
    validationSchema: SignupSchema,
    onSubmit: async () => {
      if (formik.values.firstName !== fName.current) {
        dispatch(
          setFirstName({
            firstName: formik.values.firstName,
          })
        );
      }
      if (formik.values.lastName !== lName.current) {
        dispatch(
          setLastName({
            lastName: formik.values.lastName,
          })
        );
      }
      if (formik.values.gender !== gender.current) {
        dispatch(
          setGender({
            gender: formik.values.gender,
          })
        );
      }
      if (formik.values.address !== address.current) {
        dispatch(
          setAddress({
            address: formik.values.address,
          })
        );
      }
      if (
        mobile.current === undefined ||
        formik.values.mobile !== mobile.current
      ) {
        dispatch(
          setMobile({
            mobile: +formik.values.mobile,
          })
        );
      }
      if (formik.values.date !== birthDate.current) {
        dispatch(
          setBirthDate({
            birthDate: formik.values.date,
          })
        );
      }
      if (photo.current !== userImage.preview) {
        const formData = new FormData();
        const file = userImage.raw;
        formData.append("image", file);
        dispatch(setImage({ image: userImage.raw }));
      }
    },
  });

  const handleChange = (e) => {
    if (e.target.files.length) {
      setUserImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  const deleteHandler = () => {
    dispatch(deleteAccount());
    dispatch(logout());
    localStorage.removeItem("email");
    navigate("/ph-login");
    msg(
      "success",
      "We are sorry to hear that you want to leave us. On the bright side,check your mail in case you want to restore your account."
    );
  };

  return (
    <div className="page2">
      <Form onSubmit={formik.handleSubmit}>
        <div className="md:flex md:justify-center md:gap-4">
          <div className="rounded-md bg-white sm:w-80 shadow-md p-3 w-64 md:h-form  ml-auto  mr-auto  md:w-72 mb-4  md:mt-24 md:ml-0 md:mr-0 md:mb-0 ">
            <div className="p-1">
              <div className=" text-center ">
                <label htmlFor="upload-button">
                  {userImage.preview || image ? (
                    <img
                      src={
                        userImage.preview
                          ? userImage.preview
                          : image
                          ? image
                          : ""
                      }
                      alt="dummy"
                      className="rounded-full w-64 h-64"
                    />
                  ) : (
                    <>
                      <span className="fa-stack fa-2x mt-3 mb-2 ">
                        <i className="fas fa-circle fa-stack-2x text-SReg" />
                        <i className="fa fa-camera fa-stack-1x fa-inverse " />
                      </span>
                      <h5 className="text-center">Upload your photo</h5>
                    </>
                  )}
                </label>
                <div className="hidden">
                  <input
                    type="file"
                    id="upload-button"
                    onChange={handleChange}
                  />{" "}
                </div>
              </div>{" "}
            </div>
            <span className="p-2 block text-center font-bold">
              {formik.values.firstName} {formik.values.lastName}
            </span>
            <span className="p-2 block text-center text-font2">
              {userData.type}
            </span>
            <span className=" block text-center text-green-400">{`${userData.account_status}`}</span>
            <div className="d-grid gap-2">
              <button
                type="submit"
                className=" mt-2 p-1 border-SReg border-2 text-SReg rounded-md hover:text-white hover:bg-SReg hover:border-SReg duration-.3s  text-center"
              >
                Save
              </button>
            </div>
            <div className="d-grid gap-2">
              <button
                className=" mt-2 p-1 border-red-500 border-2 text-red-500 rounded-md hover:text-white hover:bg-red-500 hover:border-red-500 duration-.3s  text-center"
                onClick={() => deleteHandler()}
              >
                Delete account
              </button>
            </div>
          </div>
          <div className=" md:mt-24  ml-auto mr-auto md:ml-0 md:mr-0 rounded-md   bg-white shadow-md p-3 w-96 md:w-form h-small md:h-form     ">
            <Form.Group>
              <div className="md:flex md:justify-between md:gap-3  text-font1">
                <Form.Group
                  className="mb-2 border-b-2 border-slate-100 p-3 xl:col-md-6 "
                  controlId="Fname"
                >
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                    name="firstName"
                    type="text"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    isInvalid={
                      formik.touched.firstName && !!formik.errors.firstName
                    }
                    isValid={
                      formik.touched.firstName && !formik.errors.firstName
                    }
                    onBlur={formik.handleBlur}
                    style={{
                      color: "#757575",
                    }}
                  />
                </Form.Group>

                <Form.Group
                  className="mb-2 border-b-2 border-slate-100 p-3 xl:col-md-6 "
                  controlId="Lname"
                >
                  <Form.Label>Last name</Form.Label>
                  <Form.Control
                    name="lastName"
                    type="text"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    isInvalid={
                      formik.touched.lastName && !!formik.errors.lastName
                    }
                    isValid={formik.touched.lastName && !formik.errors.lastName}
                    onBlur={formik.handleBlur}
                    style={{
                      color: "#757575",
                    }}
                  />
                </Form.Group>
              </div>
            </Form.Group>
            <Form.Group>
              <div className="md:flex md:justify-between  border-b-2 border-slate-100 p-3 text-font1">
                <Form.Label>Gender</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  isInvalid={formik.touched.gender && !!formik.errors.gender}
                  isValid={formik.touched.gender && !formik.errors.gender}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  name="gender"
                  type="gender"
                  value={formik.values.gender}
                  style={{
                    width: "300px",
                    color: "#757575",
                  }}
                >
                  <option></option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>I prefer not to say</option>
                </Form.Select>
              </div>
            </Form.Group>
            <Form.Group>
              <div className="md:flex md:justify-between   border-b-2 border-slate-100 p-3 text-font1">
                <span className="flex item-center">Budget</span>
                <Form.Control
                  name="budget"
                  type="text"
                  value={formik.values.budget}
                  onChange={formik.handleChange}
                  isInvalid={formik.touched.budget && !!formik.errors.budget}
                  isValid={formik.touched.budget && !formik.errors.budget}
                  onBlur={formik.handleBlur}
                  style={{
                    width: "300px",
                    color: "#757575",
                  }}
                />
              </div>
            </Form.Group>
            <Form.Group>
              <div className="md:flex md:justify-between   border-b-2 border-slate-100 p-3 text-font1">
                <span className="flex item-center">Mobile</span>
                <Form.Control
                  name="mobile"
                  type="text"
                  value={formik.values.mobile}
                  onChange={formik.handleChange}
                  isInvalid={formik.touched.mobile && !!formik.errors.mobile}
                  isValid={formik.touched.mobile && !formik.errors.mobile}
                  onBlur={formik.handleBlur}
                  style={{
                    width: "300px",
                    color: "#757575",
                  }}
                />
              </div>
            </Form.Group>
            <Form.Group>
              <div className="md:flex md:justify-between  border-b-2 border-slate-100 p-3 text-font1">
                <span className="flex item-center"> Address</span>
                <Form.Control
                  name="address"
                  type="text"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  isInvalid={formik.touched.address && !!formik.errors.address}
                  isValid={formik.touched.address && !formik.errors.address}
                  onBlur={formik.handleBlur}
                  style={{
                    width: "300px",
                    color: "#757575",
                  }}
                />
              </div>
            </Form.Group>
            <Form.Group>
              <div className="md:flex md:justify-between   p-3 text-font1">
                <span className="flex item-center">Birthdate</span>
                <Form.Control
                  name="date"
                  type="date"
                  value={formik.values.date}
                  onChange={formik.handleChange}
                  isInvalid={formik.touched.date && !!formik.errors.date}
                  isValid={formik.touched.date && !formik.errors.date}
                  onBlur={formik.handleBlur}
                  style={{
                    width: "300px",
                    color: "#757575",
                  }}
                />
              </div>
            </Form.Group>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default EditProfile;
