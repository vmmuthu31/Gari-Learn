import { useState } from "react";
import Header from "./components/Header";

function EnrollmentPage() {
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);

  const handlePayment = () => {
    // Handle GARI coin payment here
    setIsPaymentComplete(true);
  };

  return (
    <>
    <Header />
    <div className=" min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-8">Enroll in Course Name Here</h1>
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="payment-amount">
            Payment Amount (in GARI coins)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="payment-amount"
            type="number"
            placeholder="Enter payment amount"
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(e.target.value)}
          />
        </div>
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handlePayment}
        >
          {isPaymentComplete ? "Payment Complete!" : "Pay with GARI coins"}
        </button>
      </div>
    </div>
    </>
  );
}

export default EnrollmentPage;
