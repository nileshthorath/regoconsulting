import React from 'react';
import './App.css';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import StripeForm from './components/StripeForm';

const stripePromise = loadStripe('pk_test_51Nen7hFpqCcVujOt8ln3Ot2iQjvuAjN8Uqega6SC8YnQOqeDdnTcoquE8MHMACYLUpcvW52QtE80CJyYBeMoF5po0033VmtL9z'); // Replace with your actual Publishable Key

function App() {
  return (
    <div className="App">
      <Elements stripe={stripePromise}>
        <StripeForm />
      </Elements>
    </div>
  );
}

export default App;
