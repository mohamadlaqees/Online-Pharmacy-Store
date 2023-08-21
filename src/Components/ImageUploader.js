import React, { useEffect } from "react";
import { Alert, Col, Container, Row } from "react-bootstrap";
import { useRef, useState } from "react";
import axios from "./axios";
import { Progress, message } from "antd";
import { resetO } from "../states/orderSlice";
function ImageUploader({ userId,insideOrder=false,orderId }) {
  const inputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [msg, setMsg] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleInputChange = (e) => {
    e.preventDefault();
    const Listfiles = e.dataTransfer ? e.dataTransfer.files : e.target.files;
    setFiles([...files, ...Listfiles]);
  };
  function handleUpload() {
    if (files.length === 0) {
      message.warning("no file was selected")
      console.log("no file selected");
      return;
    }
    const fd = new FormData();
    files.forEach((file) => {
      fd.append("files[]", file);
    });
    setMsg("Upload started");
    if(insideOrder){
      axios
      .post(`/orders/online-orders/prescriptions/store/${orderId}`, fd, {
        onUploadProgress: (progressEvent) => {
          setProgress(progressEvent.progress * 100);
        },
        headers: {
          "Content-Type":
            "multipart/form-data; boundary=<calculated when request is sent>",
        },
      })
      .then((res) => {
        console.log(res.data);
        setMsg("Uploaded Succefully");
      })
      .catch((err) => {
        console.log(err);
        setMsg("Upload Failed");
      });
      return
    }
    axios
      .post(`/orders/cart/${userId}/prescriptions/store`, fd, {
        onUploadProgress: (progressEvent) => {
          setProgress(progressEvent.progress * 100);
        },
        headers: {
          "Content-Type":
            "multipart/form-data; boundary=<calculated when request is sent>",
        },
      })
      .then((res) => {
        console.log(res.data);
        setMsg("Uploaded Succefully");
      })
      .catch((err) => {
        console.log(err);
        setMsg("Upload Failed");
      });
  }
  useEffect((
    ()=>{
      if(msg==="Uploaded Succefully"||msg==="Upload Failed"){
        message.info(msg);
        setFiles([])
      }
      resetO();
    }
  ),[msg])

  return (
    <>
      <Row className="mt-3 d-flex w-100  justify-content-center align-items-center">
        <Col md={10}>
          <Container
            className="w-100  cursor-pointer text-2xl "
            onDrop={handleInputChange}
            onDragOver={(e) => e.preventDefault()}
          >
            <div
              className=" d-flex w-100 border-SReg border-2 justify-content-center align-items-center h-100  text-center text-SSReg bg-secondry rounded "
              onClick={() => inputRef.current.click()}
            >
              <div>
                <p>Drag and drop files here or click to load </p>
                <i className="	fas fa-file-image text-large"></i>
                <input
                  type="file"
                  multiple
                  ref={inputRef}
                  onChange={handleInputChange}
                  className="d-none"
                />
              </div>
            </div>
          </Container>
        </Col>
        <Col>
          <button
            className=" hover:text-white hover:bg-SReg hover:border-SReg w-100 p-1 rounded-md  border-2 text-SReg border-SReg duration-.3s text-center"
            onClick={() => {
              handleUpload();
            }}
          >
            {" "}
            Upload{" "}
          </button>
        </Col>
      </Row>
      {msg !==null  && <Progress percent={progress}>progress</Progress>}
      {msg && <div>{msg}</div>}
      <Row>
        <Col>
          <ul>
            {files.map((file) => {
              return <li key={file.name}>{file.name}</li>;
            })}
          </ul>
        </Col>
      </Row>
    </>
  );
}

export default ImageUploader;
