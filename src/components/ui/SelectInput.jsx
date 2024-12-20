/* eslint-disable react/prop-types */

const SelectInput = ({
  labelName,
  optional,
  required,
  value,
  options,
  clsName,
  onChange,
  disabled,
  defaultValue,
  error
}) => {
  return (
    <div className={`SelectInput inputFieldBox ${clsName ? clsName : ""}`}>
      <label className="inputLabel" htmlFor="">
        {labelName} <p>{optional}</p>
        <span>{required}</span>
      </label>
      <select
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        disabled={disabled}
        className={error ? "errorBgBorder" : ""}
      >
        {options?.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default SelectInput;
