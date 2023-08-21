/* eslint-disable react/jsx-no-comment-textnodes */
import React from "react";
import { Alert, Col, Row } from "react-bootstrap";
import OrderCard from "../Components/OrderCard";
import { useState } from "react";
import { Pagination } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchOrderPage, resetO } from "../states/orderSlice";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import { Button } from "antd";
import { DatePicker } from "antd";
import { message } from "antd";
function MyOrders() {
  const [date, setDate] = useState("");
  const [status, SetStatus] = useState("ALL");
  const [PageNumber, setPageNumber] = useState(1);
  const { userData } = useSelector((state) => state.authSlice);
  const { total, orders, orderLoading,checkout } = useSelector(
    (state) => state.orderReducer
  );
  const userId = userData.id;
  const items = ["ALL", "Review", "Paid", "Dispatched", "Rejected"].map(
    (status) => {
      return {
        key: status,
        label: (
          <li
            key={status}
            onClick={() => {
              SetStatus(status);
            }}
          >
            {status.toUpperCase()}
          </li>
        ),
      };
    }
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId !== undefined) {
      dispatch(fetchOrderPage({ PageNumber: PageNumber,status:status,date:date ,userID:userId}));
    }
    resetO();
  }, [PageNumber, dispatch, userId, total,status,date]);
  useEffect(()=>{
if(checkout!==null){
  if(checkout){
    message.success("ccheckout successfull")
  }else{
    message.error("your order contains prescription drugs  please upload prescription first ")
  }
}
  },[checkout])
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
      }}
      spin
    />
  );
  if (orderLoading) {
    return (
      <center className="d-flex justify-content-center  page align-items-center">
        <Spin indicator={antIcon} spinning={orderLoading} />
      </center>
    );
  }
  if (orders.length === 0&&status==="ALL"&&date==="") {
    console.log("orders are empty");
    return (
      <center className="d-flex justify-content-center page   align-items-center">
        <h3>You have no orders made yet </h3>
      </center>
    );
  }

  return (
    <div className="page">
      <Row>
        <Col md={1}></Col>

        <Col xs={1} md={4} className="p-20px">
          <DatePicker
            size="large"
            style={{ width: "100%" }}
            onChange={(date, dateString) => {
              setDate(dateString)
            }}
          />
        </Col>
        <Col xs={4}>
          <Dropdown
            menu={{
              items,
            }}
            placement="bottom"
            arrow
          >
            <Button size="large" className="bg-SReg text-white">
              Status
            </Button>
          </Dropdown>
        </Col>
      </Row>

      {
        //  <OrderCard products={5}  />
        //map orders from slice
        orders.map((data) => {
          return (
            <OrderCard
              total={data.total}
              status={data.status}
              date={data.date}
              time={data.time}
              shipping_address={data.shipping_address}
              orderId={data.order_id}
              shipping_fees={data.shipping_fees}
              products={data.products}
              userId={data.cutormer_id}
              imgs={data.prescriptions}
            />
          );
        })
      }

      <div className="d-flex justify-center mt-10">
        <Pagination
          current={PageNumber}
          pageSize={10}
          total={total}
          onChange={(PN, _) => {
            setPageNumber(PN);
          }}
        />
      </div>
    </div>
  );
}

export default MyOrders;
