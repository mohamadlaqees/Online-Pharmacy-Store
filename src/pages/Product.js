/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { InputNumber, Spin } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
import { Rate } from "antd";
import {
  addAllergyMedicin,
  addRate,
  addWishMedicins,
  checkAllergy,
  checkWishMedicins,
  getProdcutDetails,
  getRate,
  reset,
} from "../states/productSlice";
import { message } from "antd";
import {
  resetC,
  removeItem,
  addItem,
  cartSuccess,
  cartError,
  updateQuantity,
} from "../states/cartSlice";
import { addIdLocal, idInLocal, removeIdLocal } from "../utils/IdLocalStrage";
import {
  addProductToOrder,
  deleteProductFromCurrentOrder,
  inCurrentOrder,
} from "../utils/Orderutil";
import {
  addItemToCurrentOrder,
  deleteItemFromOrder,
} from "../states/orderSlice";

function Product() {
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
        color: "#5fb9f7",
      }}
      spin
    />
  );
  const { orderLoading } = useSelector((state) => state.orderReducer);
  const { id } = useParams();
  let available;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    loading,
    details,
    success,
    error,
    allergyMessage,
    wishMessage,
    numOfRate,
  } = useSelector((state) => state.productSlice);

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
  React.useEffect(() => {
    if (success !== null) {
      msg("success", `${success}`);
    }
    if (error !== null) {
      msg("error", `${error}`);
    }
  }, [error, success]);
  // cart
  const { userData } = useSelector((state) => state.authSlice);
  const { selectedIds, cartSuccess, cartError, cartLoading } = useSelector(
    (state) => state.cartSlice
  );
  const [quantitiy, setquantitiy] = useState(1);
  const add_item = () => {
    localStorage.getItem("email")
      ? dispatch(
          addItem({ productId: details.id, quantity: parseInt(quantitiy) })
        )
      : navigate("/ph-login");
  };
  const remove_item = () => {
    dispatch(removeItem({ userId: userData.id, productId: id }));
  };
  React.useEffect(() => {
    if (cartSuccess !== null) {
      msg("success", `${cartSuccess}`);
      dispatch(resetC());
    }
  }, [cartSuccess, dispatch]);
  React.useEffect(() => {
    if (cartError !== null) {
      msg("error", `${cartError}`);
      dispatch(resetC());
    }
  }, [cartError, dispatch]);

  const changeQuant = (value) => {
    setquantitiy(value);
    if (idInLocal(id)) {
      dispatch(
        updateQuantity({ userId: userData.id, productId: id, quantity: value })
      );
    }
  };

  //end of cart
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);
  const green = "GREEN: User is not allergic to this product";
  const yellow = "YELLO: User might be allergic to this product";
  const red = "RED: User is allergic to this product";

  useEffect(() => {
    dispatch(getProdcutDetails(+id));
    if (localStorage.getItem("email")) {
      dispatch(checkAllergy(+id));
      dispatch(checkWishMedicins(+id));
      dispatch(getRate(+id));
    }
  }, [dispatch, id]);
  if (details.availability) {
    available = details.availability;
  }
  const allergyHandler = (id) => {
    if (localStorage.getItem("email")) {
      dispatch(addAllergyMedicin(id));
      dispatch(checkAllergy(id));
    } else {
      navigate("/ph-login");
    }
  };
  const wishHandler = (id) => {
    if (localStorage.getItem("email")) {
      dispatch(addWishMedicins(id));
      dispatch(checkWishMedicins(+id));
      dispatch(reset());
    } else {
      navigate("/ph-login");
    }
  };
  const rateHandler = (e, id) => {
    dispatch(addRate({ id, num: e }));
    dispatch(getRate(id));
  };
  return (
    <div className="page2">
      <div className="flex flex-wrap gap-5 justify-center items-center max-h-mCont">
        <div className=" w-64 h-64 sm:w-form sm:h-form rounded-md p-4 ">
          <img src="/images/med.jpg" alt="" />
        </div>
        <div>
          <div className="p-4 w-details   sm:w-form sm:max-h-mInfo">
            <div className="flex justify-between">
              <div>
                <span className=" block text-sm text-font2">
                  {details.labeller}
                </span>
                <span className=" text-font2">
                  <span className="text-3xl">{details.name}</span>
                </span>
              </div>
              <Rate onChange={(e) => rateHandler(e, +id)} value={numOfRate} />
            </div>
            <span className=" mb-1 block mt-4 text-SReg text-xl">
              {`${available ? `${details.price} $` : ""}`}
            </span>
            <div
              className={`h-fit max-h-80 cursor-pointer ${
                !show3 ? "line-clamp-5" : "overflow-scroll"
              } `}
              onClick={() => setShow3(!show3)}
            >
              {details?.drug?.description}
            </div>

            <div className="flex gap-3 mt-3">
              {available && !localStorage.getItem("currentOrderId") ? (
                <InputNumber
                  min={1}
                  max={10}
                  defaultValue={1}
                  onChange={changeQuant}
                  disabled={available ? false : true}
                />
              ) : null}
              {available ? (
                <>
                  <Spin spinning={cartLoading} indicator={antIcon}>
                    <div className="flex">
                      {
                        //check if current order value equal the
                        localStorage.getItem("currentOrderId") ? (
                          inCurrentOrder(details.id) ? ( // to check if the order is added to the curretn order
                            <Spin indicator={antIcon} spinning={orderLoading}>
                              <button
                                onClick={() => {
                                  dispatch(
                                    deleteItemFromOrder({
                                      orderId:
                                        localStorage.getItem("currentOrderId"),
                                      productId: details.id,
                                      method: "",
                                    })
                                  );
                                }}
                                className="border-2 border-danger px-3 p-1 text-danger hover:text-white hover:bg-danger  rounded-2 p-1"
                              >
                                Remove from order number{" "}
                                {localStorage.getItem("currentOrderId")}
                              </button>
                            </Spin>
                          ) : (
                            <Spin indicator={antIcon} spinning={orderLoading}>
                              {console.log("order Loadign", orderLoading)}
                              <button
                                className="border-SReg   border-2  px-3 p-1 rounded
                                    duration-.25s  mx-sm-1 hover:bg-SReg hover:text-white"
                                onClick={() => {
                                  dispatch(
                                    addItemToCurrentOrder({
                                      orderId:
                                        localStorage.getItem("currentOrderId"),
                                      productId: details.id,
                                    })
                                  );
                                }}
                              >
                                Add to order number{" "}
                                {localStorage.getItem("currentOrderId")}
                              </button>
                            </Spin>
                          )
                        ) : selectedIds.includes(parseInt(id)) ||
                          idInLocal(id) ? (
                          <button
                            onClick={() => {
                              remove_item();
                            }}
                            type="submit"
                            className="  w-64 p-1 border-danger border-2 text-danger rounded-md hover:text-white hover:bg-secondry hover:border-SReg duration-.3s  text-center"
                          >
                            Remove from cart
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              add_item();
                            }}
                            type="submit"
                            className="  w-64 p-1 border-SReg border-2 text-SReg rounded-md hover:text-white hover:bg-SReg hover:border-SReg duration-.3s  text-center"
                          >
                            Add To cart
                          </button>
                        )
                      }
                    </div>
                  </Spin>
                  <div className="flex gap-3">
                    <div
                      className={` ${
                        allergyMessage === green
                          ? "block"
                          : allergyMessage === yellow
                          ? "block"
                          : allergyMessage === red
                          ? "hidden"
                          : ""
                      }`}
                    >
                      <button
                        type="submit"
                        className="text-gray-400  hover:text-orange-400 text-3xl duration-.3s  text-center "
                        title="Add to my allergy list"
                        onClick={() => allergyHandler(+id)}
                      >
                        <i class="fa-solid fa-hand-dots"></i>
                      </button>
                    </div>
                    <div>
                      <button
                        type="submit"
                        className={`${
                          wishMessage === "product is wishlisted"
                            ? "text-red-400"
                            : "text-gray-400"
                        }  hover:text-red-400 text-3xl duration-.3s  text-center `}
                        title="Add to my wishList"
                        onClick={() => wishHandler(+id)}
                      >
                        <i class="fa-solid fa-heart"></i>{" "}
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex gap-3">
                  <span className="block text-center   w-64  p-1 bg-red-500 text-white rounded-md">
                    Not available
                  </span>
                </div>
              )}
            </div>
            <div className="mt-5">
              <div className="menu" onClick={() => setShow1(!show1)}>
                <div className="flex justify-between">
                  Product Details
                  <i className="fa-solid fa-arrow-right"></i>
                </div>
              </div>
              <div className={` ${show1 ? "drop active" : "drop bg-all"}`}>
                <div className="p-1">
                  <span className="text-SReg font-bold">Categories : </span>{" "}
                  {details.categories ? details.categories[0] : ""}
                </div>
                <div className="p-1">
                  <span className="text-SReg font-bold"> Dosage form : </span>
                  {details.dosage_form}{" "}
                </div>
                <div className="p-1">
                  <span className="text-SReg font-bold">Strength :</span>{" "}
                  {details.strength}{" "}
                </div>
                <div className="p-1">
                  <span className="text-SReg font-bold">Route :</span>{" "}
                  {details.route}{" "}
                </div>
                <div className="p-1">
                  <span className="text-SReg font-bold">Otc :</span>{" "}
                  {details.otc}{" "}
                </div>
                <div className="p-1">
                  <span className="text-SReg font-bold">Synonyms :</span>{" "}
                  {` ${details.synonyms ? details.synonyms[1] : ""} , ${
                    details.synonyms ? details.synonyms[2] : ""
                  }`}
                </div>
              </div>
              <div className="menu" onClick={() => setShow2(!show2)}>
                <div className="flex justify-between">
                  Delivery Info
                  <i className="fa-solid fa-arrow-right"></i>
                </div>
              </div>
              <div
                className={`${
                  show2 ? "drop active overflow-auto" : "drop bg-all"
                }`}
              >
                Delivery is{" "}
                <span className="font-bold">
                  {available ? "Available" : "Not available"}
                </span>
              </div>
              <div className="menu" onClick={() => setShow4(!show4)}>
                <div className="flex justify-between">
                  Allergy Info
                  <i className="fa-solid fa-arrow-right"></i>
                </div>
              </div>
              <div
                className={`
                ${
                  allergyMessage === green
                    ? "bg-green-600 text-white"
                    : allergyMessage === yellow
                    ? "bg-yellow-600 text-white"
                    : allergyMessage === red
                    ? "bg-red-600 text-white"
                    : "bg-slate-400 text-white"
                } 
                ${show4 ? "drop active overflow-auto" : "drop bg-all"} `}
              >
                {allergyMessage === green ? (
                  <span>User is not allergic to this product</span>
                ) : allergyMessage === yellow ? (
                  <span>User might be allergic to this product</span>
                ) : allergyMessage === red ? (
                  <span>User is allergic to this product</span>
                ) : (
                  <span>You're not logged in !!</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
