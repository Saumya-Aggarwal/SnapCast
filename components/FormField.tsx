import React from "react";

const FormField = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  as = "input",
  options = [],
}: FormFieldProps) => {

  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>
  {as === "textarea" ? (
    <textarea
      name={id}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    ></textarea>
  ) : as === "select" ? (
    <select name={id} id={id} value={value} onChange={onChange}>
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  ) : (
    <input
      name={id}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    ></input>
  )}
    </div>
  );
};

export default FormField;
