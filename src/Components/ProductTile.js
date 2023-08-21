import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { InputNumber } from "antd";
import { removeItem, updateQuantity } from "../states/cartSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import {
  UpdateQuantityInOrder,
  deleteItemFromOrder,
  resetO,
} from "../states/orderSlice";

function ProductTile({
  ProductName,
  data,
  orderId,
  userId,
  insideOrder = false,
}) {
  const dispatch = useDispatch();
  const [subtotal, setsubtotal] = useState(data.subtotal);
  const price = data.price
    ? data.price
    : parseFloat(data.subtotal) / parseFloat(data.quantity);
  function remove_item() {
    if (insideOrder) {
      console.log("inside order dispatching");
      dispatch(
        deleteItemFromOrder({
          orderId: orderId,
          productId: data.id,
        })
      );
      console.log("inside order finished dispatch");
    } else
      dispatch(
        removeItem({
          userId: userId,
          productId: data.id ? data.id : data.productId,
        })
      );
  }
  const changeQuant = (value) => {
    setsubtotal(value * price);
    // if inside order  .... else
    if (insideOrder) {
      dispatch(
        UpdateQuantityInOrder({
          productId: data.id,
          quantity: value,
          orderId: orderId,
        })
      );
    } else {
      dispatch(
        updateQuantity({
          userId: userId,
          productId: data.id ? data.id : data.productId,
          quantity: value,
        })
      );
    }
    resetO();
  };
  return (
    <ol className="list-group ">
      <li className="list-group-item hover:shadow-md  border-info d-flex justify-content-between  mb-1 ">
        <Container>
          <Row>
            <Col sm={12} md={7} className="d-flex justify-content-start">
              <img src="/images/med.jpg" className=" w-20" alt={ProductName} />
              <div className="ml-2">
                <div className="fw-bold">{ProductName}</div>
                {price}
              </div>
            </Col>
            <Col
              sm={12}
              md={4}
              className="d-flex justify-content-between align-items-sm-center"
            >
              <div style={{ marginLeft: "5%" }}> {subtotal}</div>
              <InputNumber
                onChange={changeQuant}
                min={1}
                max={10}
                defaultValue={data.quantity}
              />
              <span>
                <i
                  className="far fa-trash-alt link-danger text-2xl"
                  onClick={() => {
                    remove_item();
                  }}
                ></i>
              </span>
            </Col>
          </Row>
        </Container>
      </li>
    </ol>
  );
}

export default ProductTile;
