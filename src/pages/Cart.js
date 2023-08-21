/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import ProductTile from "../Components/ProductTile";
import { Col, Container, Row } from "react-bootstrap";
import ImageUploader from "../Components/ImageUploader";
import { useEffect } from "react";
import axios from "../Components/axios";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Input, Spin, message } from "antd/lib";
import { LoadingOutlined } from "@ant-design/icons";
import { checkOut, resetC } from "../states/cartSlice";
import { idInLocal } from "../utils/IdLocalStrage";
function Cart() {
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
        color: "#5fb9f7",
      }}
      spin
    />
  );
  const { userData } = useSelector((state) => state.authSlice);
  const [cartEmpty, setCartEmpty] = useState(false);
  const [loading, setLoadding] = useState(true);
  const [items, setItems] = useState(null);
  const [Total, setTotal] = useState(0);
  const [OTC, setOTC] = useState(true);
  const [address, setaddress] = useState({ data: "", status: "" });
  const dispatch = useDispatch();
  const { selectedIds, cartSuccess, cartError, cartLoading } = useSelector(
    (state) => state.cartSlice
  );
  const fetchCart = async () => {
    try {
      const response = await axios.get(`/orders/cart/${userData.id}/show`);
      setItems(response.data.data.items);
      setTotal(response.data.data.Total);
      if (
        Object.values(response.data.data.items).some((item) => item.otc === 0)
      ) {
        setOTC(false);
      }
      setLoadding(false);
    } catch (error) {
      console.log(error.response.status);
      if (
        error.response.status === 404 &&
        error.message === "Request failed with status code 404"
      ) {
        console.log(error.message);
        setCartEmpty(true);
        setLoadding(false);
      }
    }
  };

  useEffect(() => {
    if (userData.id !== undefined) {
      setaddress({...address,data:userData.address}) 
      fetchCart();
    }
  }, [userData, cartSuccess, cartError]);
  const handleCheckOut = () => {
    if (address.data === "") {
      console.log("fill address data first")
      setaddress({ ...address, status: "error" });
      return;
    }
    dispatch(checkOut({ userId: userData.id ,address:address.data}));
  };

  const handleAddress = (event) => {
    const addData = event.target.value;
    console.log(addData);
    if (addData === "") {
      setaddress({ data: addData, status: "error" });
      return;
    }
    setaddress({ data: addData, status: "" });
  };

  useEffect(() => {
    if (cartError !== null) {
      message.error(cartError);
      dispatch(resetC());
    }
    if (cartSuccess !== null) {
      message.success(cartSuccess);
      dispatch(resetC());
    }
  }, [cartError, cartSuccess]);

  return (
    <div className="page">
      {loading ? (
        <center  className="h-100 d-flex align-items-center justify-center text-3xl">
          <Spin spinning={loading} indicator={antIcon} size="large"></Spin>
        </center>
      ) : cartEmpty ? (
        <center className="h-100 d-flex align-items-center justify-center text-3xl">cart is empty</center>
      ) : (
        <Container className="mt-1">
          {
            // address Input
            <Input
              onChange={handleAddress}
              status={address.status}
              size="large"
              className="my-3"
              addonBefore="Shipping Address"
              defaultValue={address.data}
            />
          }
          {Object.entries(items).map(([name, data]) => {
           
              return (
                <ProductTile
                  ProductName={name}
                  data={data}
                  userId={userData.id}
                />
              );
            
            
          })}

          <ImageUploader userId={userData.id} />
          <Row>
            <Col md={6}>
              <h2 className="bg-secondry text-center ">Total : {Total} </h2>
            </Col>
            <Col md={6}>
              <Spin spinning={cartLoading} indicator={antIcon}>
                <button
                  onClick={() => {
                    handleCheckOut();
                  }}
                  type="submit"
                  className={`w-100 p-1 rounded-md  border-2 text-SReg border-SReg duration-.3s text-center
            hover:text-white hover:bg-SReg hover:border-SReg`}
                >
                  Check Out
                </button>
              </Spin>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
}

export default Cart;
