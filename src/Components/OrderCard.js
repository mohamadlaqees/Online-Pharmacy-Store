import React, { useState, useRef, useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import ProductTile from "./ProductTile";
import { Input } from "antd/lib";
import { deleteOnlineOrder, updateAddress, resetO } from "../states/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import ImageUploader from "./ImageUploader";
import axios from "./axios";

function OrderCard({
  products = [],
  imgs = [],
  status,
  date,
  time,
  orderId,
  total,
  shipping_fees,
  shipping_address,
  userId,
}) {
  const [expanded, setExpanded] = useState(false);
  const bodyRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [prescriptionsremoved, setprescriptionsremoved] = useState(false);
  const { orderLoading, orderError, orderSuccess } = useSelector(
    (state) => state.orderReducer
  );
  const [address, setaddress] = useState(shipping_address);
  const [checkout, setCheckout] = useState(
    parseInt(localStorage.getItem("currentOrderId")) === orderId
  );
  useEffect(() => {}, [orderLoading]);

  useEffect(() => {
    const cardBody = bodyRef.current;
    const height = cardBody.scrollHeight + "px";
    if (expanded) {
      cardBody.style.height = height;
    } else {
      cardBody.style.height = "150px";
    }
  }, [expanded]);
  async function handleCheckOut() {
    try {
      await axios
        .post(`/orders/online-orders/checkout/${orderId}?address=${address}`)
        .then(() => {
          message.success("successfull");
        })
        .catch((errorr) => {
          console.log(errorr.message);
          message.error(errorr.status);
        });
    } catch (error) {
      message.error(error.status);
    }
  }

  const handleExpand = () => {
    setExpanded(!expanded);
  };
  // function to show  message for address update
  useEffect(() => {
    if (orderSuccess !== null) {
      message.success(orderSuccess);
    }
    if (orderError !== null) {
      message.error(orderError);
    }
    resetO();
  }, [orderSuccess, orderError]);
  async function removePrescriptions() {
    await axios
      .delete(`/orders/online-orders/prescriptions/delete/${orderId}`)
      .then(() => {
        message.success("prescriptions remove succefully");
        setprescriptionsremoved(true);
      })
      .catch(() => {
        message.error("Unable to remove prescriptions ");
        setprescriptionsremoved(false);
      });
  }
  return (
    <Container className="rounded p-2 ">
      <Card className="border-primary bg-light">
        <Card.Header className="text-center bg-light border-info">
          <Row>
            <Col md={4}>{`${date}@${time}`}</Col>
            <Col>Total: {total}</Col>
            <Col>{status}</Col>
            <Col>Fees: {shipping_fees}</Col>
            <Col md={1}>
              <span>
                <i
                  className={`far fa-trash-alt ${
                    status === "Review" || status === "Progressing"
                      ? "link-danger"
                      : "disabled"
                  } text-2xl `}
                  onClick={() => {
                    if (status === "Review" || status === "Progressing") {
                      dispatch(deleteOnlineOrder(orderId));
                    }
                  }}
                ></i>
              </span>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body
          ref={bodyRef}
          style={{
            height: "150px",
            transition: "height .5s cubic-bezier(0, 1.33, 0.09, 0.99) 0s ",
            overflow: "hidden",
          }}
        >
          <div className="d-flex justify-conten-center align-content-center">
            <Input
              onChange={(value) => {
                setaddress(value.target.value);
              }}
              disabled={status === "Review" ? false : true}
              size="large"
              className="my-1 ms-5 w-75"
              addonBefore="Shipping Address"
              defaultValue={shipping_address}
            />
            <button
              onClick={() => {
                dispatch(updateAddress({ address: address, orderId: orderId }));
              }}
              className="p-1 bg-SReg text-white my-1 ms-5 h-50 rounded-2"
            >
              Edit Address
            </button>
          </div>
          {products.map((product) => {
            const data = {
              subtotal: product.subtotal,
              price:
                parseFloat(product.subtotal) / parseFloat(product.quantity),
              quantity: product.quantity,
              id: product.productId,
              orderId: orderId,
            };
            return (
              <ProductTile
                ProductName={product.name}
                data={data}
                userId={userId}
                insideOrder={true}
                orderId={orderId}
              />
            );
          })}

          <div
            className={`${
              imgs.length === 0 || prescriptionsremoved
                ? "d-none"
                : "d-flex w-100 relative border-SReg border-2 justify-content-around align-items-center  rounded mt-2"
            }`}
          >
            <button
              onClick={() => {
                removePrescriptions();
              }}
              className={`${
                status !== "Review"
                  ? "d-none"
                  : "absolute -top-3 right-0  text-danger text-lg"
              }`}
            >
              <i class="fas fa-minus-circle"></i>
            </button>
            {imgs.length > 0
              ? imgs.map((image) => {
                  return (
                    <img
                      style={{
                        width: "150px",
                        height: "150px",
                      }}
                      src={image}
                      alt="prescription"
                    />
                  );
                })
              : null}
          </div>
          {status === "Review" ? (
            <ImageUploader insideOrder={true} orderId={orderId} />
          ) : null}
        </Card.Body>
        <Card.Footer
          className={`d-flex
        shadow-sm bg-light  align-items-center ${
          status === "Review" || status === "Progressing"
            ? " justify-content-between "
            : "justify-content-end"
        }`}
        >
          <button
            onClick={() => {
              if (checkout) {
                setCheckout(false);
                localStorage.removeItem("currentOrderId");
                handleCheckOut();
              } else {
                localStorage.setItem("currentOrderId", orderId);
                navigate("/");
              }
            }}
            className={`${
              status === "Review" || status === "Progressing"
                ? "p-1 border-2 border-SReg bg-SReg text-white rounded-2 "
                : "d-none"
            }`}
          >
            {`${checkout ? "Check out" : "Add products to this order"} `}
          </button>
          {expanded ? (
            <i
              className="fa fa-chevron-circle-up link-primary text-l"
              onClick={handleExpand}
            />
          ) : (
            <i
              className="fa fa-chevron-circle-down link-primary text-lg-center"
              onClick={handleExpand}
            />
          )}
        </Card.Footer>
      </Card>
    </Container>
  );
}

export default OrderCard;
