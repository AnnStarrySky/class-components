import { Component } from "react";

type State = {
  hasError: boolean;
};

class ErrorSimulator extends Component<Record<string, never>, State> {
  state: State = {
    hasError: false,
  };

  triggerError = () => {
    this.setState({ hasError: true });
  };

  render() {
    if (this.state.hasError) {
      throw new Error("Test error triggered");
    }

    return (
      <button
        onClick={this.triggerError}
        className="bg-red-500 text-white px-4 py-2 mt-4"
      >
        Test Error
      </button>
    );
  }
}

export default ErrorSimulator;