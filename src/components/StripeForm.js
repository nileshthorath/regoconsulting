import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import "../components/StripeForm.css";

const StripeForm = () => {
  const stripe = useStripe(); // Stripe instance
  const elements = useElements(); // Elements instance

  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [focus, setFocus] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "number":
        // setNumber(value);
        const re = /^[0-9\b]+$/;
        if (value === '' || re.test(value) && value.length < 17 ) {
           setNumber(value);
        }
        break;
      case "name":
        const resn = /^[a-z \b]+$/;
        if (value === '' || resn.test(e.target.value) ) {
          setName(value);
        }
        break;
      case "expiry":
        const res = /^[0-9\b]+$/;
        if (e.target.value === '' || res.test(e.target.value) && value.length < 5 ) {
          setDate(value);
        }
        break;
      case "cvc":
        const reg = /^[0-9\b]+$/;
        if (e.target.value === '' || reg.test(e.target.value) && value.length < 4 ) {
          setCvc(value);
        }
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable form submission.
      return;
    }

    const cardElement = elements.getElement(CardElement);

    // Check if cardElement is available
    if (!cardElement) {
      console.error("card is not available");
      return;
    }

    try {
      // Use the Stripe API to create a payment method or perform other actions
      const result = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (result.error) {
        console.log("Error:", result.error.message);
      } else {
        console.log("Success:", result.paymentMethod);
        // Handle successful payment, e.g., send paymentMethod to your server
        // You can add your redirection logic here
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    // Code inside useEffect, if needed
  }, []);


  return (
    <>
      

      <br />
      <form onSubmit={handleSubmit}>

      <div className={`rccs__card ${focus === "cvc" ? "back1" : "front1"}`}>
        <Cards
          number={number}
          name={name}
          expiry={date}
          cvc={cvc}
          focused={focus}
        />
      </div>

        <div className="row">
          <div className="col-sm-11">
            <label htmlFor="number">Card Number</label>
            <input
              type="text"
              className="form-control"
              value={number}
              name="number"
              onChange={handleInputChange}
              onFocus={() => setFocus("number")}
            />
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-sm-11">
            <label htmlFor="name">Card Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              name="name"
              onChange={handleInputChange}
              onFocus={() => setFocus("name")}
            />
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-sm-6">
            <label htmlFor="expiry">Expiration Date</label>
            <input
              type="text"
              name="expiry"
              className="form-control"
              value={date}
              onChange={handleInputChange}
              onFocus={() => setFocus("expiry")}
            />
          </div>
          <div className="col-sm-5">
            <label htmlFor="cvc">CVV</label>
            <input
              type="tel"
              name="cvc"
              className="card"
              value={cvc}
              onChange={handleInputChange}
              onFocus={() => setFocus("cvc")}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-11">
            <button type="submit" className="btn btn-primary">
              Submit Payment
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default StripeForm;
