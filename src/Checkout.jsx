import React, { useState } from 'react';

const validateCreditCard = (cardNumber) => {
  const regex = /^[0-9]{16}$/; 
  return regex.test(cardNumber);
};

const validateAddress = (address) => {
  const regex = /^[a-zA-Z0-9\s,.'-]{3,}$/;
  return regex.test(address);
};

const Checkout = () => {
  const [billingAddress, setBillingAddress] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [creditCard, setCreditCard] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    let validationErrors = {};
    let isValid = true;

    if (!validateAddress(billingAddress)) {
      validationErrors.billingAddress = "Invalid billing address format.";
      isValid = false;
    }

    if (!validateAddress(shippingAddress)) {
      validationErrors.shippingAddress = "Invalid shipping address format.";
      isValid = false;
    }

    if (!validateCreditCard(creditCard)) {
      validationErrors.creditCard = "Invalid credit card number.";
      isValid = false;
    }

    if (!expiry) {
      validationErrors.expiry = "Expiry date is required.";
      isValid = false;
    }

    if (cvv.length !== 3) {
      validationErrors.cvv = "CVV must be 3 digits.";
      isValid = false;
    }

    if (isValid) {
      alert("Form submitted successfully!");
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Billing Address</h2>
      <input
        type="text"
        value={billingAddress}
        onChange={(e) => setBillingAddress(e.target.value)}
        placeholder="Billing Address"
      />
      {errors.billingAddress && <p style={{ color: "red" }}>{errors.billingAddress}</p>}

      <h2>Shipping Address</h2>
      <input
        type="text"
        value={shippingAddress}
        onChange={(e) => setShippingAddress(e.target.value)}
        placeholder="Shipping Address"
      />
      {errors.shippingAddress && <p style={{ color: "red" }}>{errors.shippingAddress}</p>}

      <h2>Payment Information</h2>
      <input
        type="text"
        value={creditCard}
        onChange={(e) => setCreditCard(e.target.value)}
        placeholder="Credit Card Number"
      />
      {errors.creditCard && <p style={{ color: "red" }}>{errors.creditCard}</p>}

      <input
        type="text"
        value={expiry}
        onChange={(e) => setExpiry(e.target.value)}
        placeholder="Expiry Date (MM/YY)"
      />
      {errors.expiry && <p style={{ color: "red" }}>{errors.expiry}</p>}

      <input
        type="text"
        value={cvv}
        onChange={(e) => setCvv(e.target.value)}
        placeholder="CVV"
        maxLength="3"
      /><br/><br/>
      {errors.cvv && <p style={{ color: "red" }}>{errors.cvv}</p>}

      <button type="submit">Submit Order</button>
    </form>
  );
};

export default Checkout;
