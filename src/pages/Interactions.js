import { Spin } from "antd";
import debounce from "lodash.debounce";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Card, Col, Container, Form, Row } from "react-bootstrap";
import AllProducts from "../Components/AllProducts";

function Interactions() {
  const [few, setFew] = useState(true);
  const [description, setDescription] = useState("");
  const [related, setRelated] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [LoadingRE, setLoadingRE] = useState(false);
  const [match, setMatch] = useState(true);
  const [drugs, setDrugs] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const addDrug = async (e) => {
    if (!drugs.includes(e) && drugs.length < 2) {
      if (drugs.length === 0) {
        setDrugs([e]);
      } else {
        setDrugs([...drugs, e]);
        document.getElementById("card-body").style.display = "none";
        document.getElementById("description-card").style.display = "block";
        const first = drugs[0].drug_id;
        const second = e.drug_id;
        try {
          const response = await fetch(
            `http://localhost:8000/api/drugs/interaction/check/?id=${first}&interactingId=${second}`
          );
          const data = await response.json();
          setDescription(data.message);
          setLoadingRE(true);
        } catch (error) {
          setDescription("No Interactions found ");
          setLoadingRE(true);
        }
        try {
          const response = await fetch(
            `http://localhost:8000/api/drugs/get/${first}/${second}`
          );
          const data = await response.json();
          setRelated(data.data);
          setLoadingRE(false);
        } catch (error) {
          setLoadingRE(false);
          setRelated([]);
        }
      }
    }
  };

  const deleteDrug = (drugdel) => {
    const updatedDrugs = drugs.filter((drug) => drug !== drugdel);
    setDrugs(updatedDrugs);
    document.getElementById("card-body").style.display = "block";
    setDescription("");
    setRelated([]);
  };

  useEffect(() => {
    if (suggestions.length > 0) {
      setLoading(false);
      setMatch(true);
    }
  }, [suggestions]);

  const handleSearch = async (searchQuery) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8000/api/drugs/interaction/?string=${searchQuery}`
      );
      const data = await response.json();
      console.log(data);
      if (data.data === null) {
        setMatch(false);
        return;
      }
      setLoading(false);
      setSuggestions(data.data);
    } catch (error) {
      console.error(error);
      setMatch(false);
      setLoading(false);
      setSuggestions([]);
    }
  };

  const debouncedHandleSearch = debounce(handleSearch, 500);

  const handleChange = (event) => {
    setMatch(true);
    const { value } = event.target;
    // Check if the query is at least 3 characters before making the API call
    if (value.length >= 3) {
      setFew(false);
      debouncedHandleSearch(value);
    } else {
      setFew(true);
      setLoading(false);
      setSuggestions([]);
    }
  };
  return (
    <div className="page">
      <Container className="w-75 text-center">
        <h3>Enter two drugs to get the description of their interaction</h3>
        <Card className="border-white mb-3 p-0">
          <Card.Header className="text-white rounded-bottom p-0 text-center ">
            <Form.Control
              onChange={handleChange}
              placeholder="Search"
              id="search-bar"
              style={{
                boxShadow: "none",
                border: "1px solid #1390e3",
              }}
            />
          </Card.Header>
          <Card.Body
            style={{
              maxHeight: "150px",
              border: "1px solid #52b0ed",
            }}
            id="card-body"
            className={`overflow-auto p-0 rounded ${
              suggestions.length === 0 && "d-none"
            } `}
          >
            {!match ? (
              "Could not find any match"
            ) : Loading ? (
              <Spin></Spin>
            ) : (
              <ol className="list-group m-0 p-0">
                {suggestions.map((suggestion) => (
                  <li
                    onClick={() => addDrug(suggestion)}
                    key={suggestion.name}
                    className="list-group-item hover:border-2 cursor-pointer hover:border-SReg hover:shadow-lg d-flex justify-content-between  mb-1 "
                  >
                    {suggestion.name}
                  </li>
                ))}
              </ol>
            )}
          </Card.Body>
        </Card>
        {few ? "Enter at least three letters" : ""}
        {
          <ol className=" d-flex  justify-content-between p-1">
            {drugs.map((drug) => {
              return (
                <li className="bg-secondry rounded mr-2 p-2 fw-bold">
                  {drug.name}
                  <i
                    className=" ml-2 fa fa-times-circle fs-0  link-primary "
                    onClick={() => deleteDrug(drug)}
                  ></i>
                </li>
              );
            })}
          </ol>
        }
        <Card
          id="description-card"
          className={`border-danger text-center ${
            description === "" ? "p-0 d-none" : "p-3"
          }`}
        >
          <Card.Body className={`${description === "" ? "p-0" : "p-3"}`}>
            {description}
          </Card.Body>
        </Card>
      </Container>
      <center>
      {related && related.length > 0 && <h4>Related Product</h4>}
      <div className="d-flex justify-content-center mt-2">
        {/* Check if LoadingRE is true, show the loading indicator */}
        {LoadingRE ? (
          <Spin tip="Loading Related Products" size="large"></Spin>
        ) : (
          // Check if related is an array with items, then render AllProducts
          Array.isArray(related) && related.length > 0 ? (
            <AllProducts data={related} img="/images/med.jpg" />
          ) : (
           ''
          )
        )}
      </div>
     </center>
    </div>
  );
}

export default Interactions;
