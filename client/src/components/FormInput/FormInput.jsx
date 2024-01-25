import styles from "./FormInput.module.css";

const FormInput = ({
  label,
  type,
  name,
  placeholder,
  onBlur,
  onChange,
  value,
  options,
  min,
  max,
  className,
}) => {
  return (
    <>
      <label htmlFor={name} className={styles.labelInput}>
        {label}
      </label>
      {type === "select" ? (
        <select
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          className={className ? className : styles.inputsInput}
        >
          <option>{name}</option>
          {options.map((option, index) => (
            <option key={index} value={option.name ? option.name : option}>
              {option.name ? option.name : option}
            </option>
          ))}
        </select>
      ) : (
        <input
          autoComplete="off"
          type={type}
          name={name}
          placeholder={placeholder}
          onBlur={onBlur}
          onChange={onChange}
          value={value}
          min={min && min}
          max={max && max}
          className={className ? className : styles.inputsInput}
        />
      )}
    </>
  );
};

export default FormInput;
