import { withFormsy } from "formsy-react";
import React from "react";
import "./style/Input.css";

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.changeValue = this.changeValue.bind(this);
  }

  changeValue(event) {
    this.props.setValue(event.currentTarget.value);
  }

  render() {
    const {
      type = "text",
      className = "",
      parentClassName = "",
      value,
      errorMessage,
      showError = true,
      ...restProps
    } = this.props;

    return (
      <div className={`pb-2 ${parentClassName}`}>
        <div className="flex-4 w-100">
          <input
            onChange={this.changeValue}
            type={type}
            value={value || ""}
            style={{ width: "300px" }}
            className={`rounded-3 ${
              errorMessage && "custom-input-error"
            } ${className}`}
            {...restProps}
          />

          {showError && errorMessage ? (
            <div
              className="ps-3 font-italic font-10"
              style={{ color: "#cb3f3f" }}
            >
              *{errorMessage}
            </div>
          ) : (
            <div style={{ height: "15px", width: "100%", clear: "both" }} />
          )}
        </div>
      </div>
    );
  }
}

export default withFormsy(Input);
