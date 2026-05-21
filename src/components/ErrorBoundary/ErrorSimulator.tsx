import { useState } from "react";

const ErrorSimulator = () => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    throw new Error("Test error triggered");
  }

  return (
    <button
      onClick={() => setHasError(true)}
      className="bg-red-500 text-white px-4 py-2 mt-4"
    >
      Test Error
    </button>
  );
};

export default ErrorSimulator;