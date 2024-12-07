import React from "react";

function FormInput({ name, label, type, placeholder }) {
  return (
    <label className="form-control w-full ">
      <div className="label">
        <span className="label-text capitalize">{label}</span>
      </div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="input input-bordered w-full "
      />
    </label>
  );
}

export default FormInput;
