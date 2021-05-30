import React from "react";

export default function Label(props) {
  const { required, label, className = "" } = props;

  return (
    <div className={`pe-3 text-capitalize ${className}`}>
      <span>{label}</span>
      {required && <span className="ps-1">*</span>}
    </div>
  );
}
