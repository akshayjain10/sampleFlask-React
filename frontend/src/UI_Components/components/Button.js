import React from "react";
import "./style/Button.css";

class Button extends React.Component {
  render() {
    const { children, className = "", ...restProps } = this.props;

    return (
      <button
        type="button"
        className={`button-simple ${className}`}
        {...restProps}
      >
        {children}
      </button>
    );
  }
}

export default Button;
