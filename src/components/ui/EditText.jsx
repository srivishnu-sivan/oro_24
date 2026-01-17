import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/index.scss';

const EditText = ({
  type = 'text',
  placeholder = '',
  value,
  onChange,
  disabled = false,
  className = '',
  ...props
}) => {
  const inputClass = `edit-text ${className}`;
  return (
    <input
      type={type}
      className={inputClass}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      {...props}
    />
  );
};

EditText.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default EditText;