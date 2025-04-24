// import React, { useState } from 'react';

// import {
//   Form, TransitionReplace,
// } from '@openedx/paragon';
// import PropTypes from 'prop-types';

// const FormGroup = (props) => {
//   const [hasFocus, setHasFocus] = useState(false);

//   const handleFocus = (e) => {
//     setHasFocus(true);
//     if (props.handleFocus) { props.handleFocus(e); }
//   };
//   const handleClick = (e) => {
//     if (props.handleClick) { props.handleClick(e); }
//   };
//   const handleOnBlur = (e) => {
//     setHasFocus(false);
//     if (props.handleBlur) { props.handleBlur(e); }
//   };

//   return (
//     <Form.Group controlId={props.name} className={props.className} isInvalid={props.errorMessage !== ''}>
//       <Form.Control
//         as={props.as}
//         readOnly={props.readOnly}
//         type={props.type}
//         aria-invalid={props.errorMessage !== ''}
//         className="form-group__form-field"
//         autoComplete={props.autoComplete}
//         spellCheck={props.spellCheck}
//         name={props.name}
//         value={props.value}
//         onFocus={handleFocus}
//         onBlur={handleOnBlur}
//         onClick={handleClick}
//         onChange={props.handleChange}
//         controlClassName={props.borderClass}
//         trailingElement={props.trailingElement}
//         floatingLabel={props.floatingLabel}
//       >
//         {props.options ? props.options() : null}
//       </Form.Control>
//       <TransitionReplace>
//         {hasFocus && props.helpText ? (
//           <Form.Control.Feedback type="default" key="help-text" className="d-block form-text-size">
//             {props.helpText.map((message, index) => (
//               <span key={`help-text-${index.toString()}`}>
//                 {message}
//                 <br />
//               </span>
//             ))}
//           </Form.Control.Feedback>
//         ) : <div key="empty" />}
//       </TransitionReplace>
//       {props.errorMessage !== '' && (
//         <Form.Control.Feedback key="error" className="form-text-size" hasIcon={false} feedback-for={props.name} type="invalid">{props.errorMessage}</Form.Control.Feedback>
//       )}
//       {props.children}
//     </Form.Group>
//   );
// };

// FormGroup.defaultProps = {
//   as: 'input',
//   autoComplete: null,
//   borderClass: '',
//   children: null,
//   className: '',
//   errorMessage: '',
//   handleBlur: null,
//   handleChange: () => {},
//   handleClick: null,
//   handleFocus: null,
//   helpText: [],
//   options: null,
//   readOnly: false,
//   spellCheck: null,
//   trailingElement: null,
//   type: 'text',
// };

// FormGroup.propTypes = {
//   as: PropTypes.string,
//   autoComplete: PropTypes.string,
//   borderClass: PropTypes.string,
//   children: PropTypes.element,
//   className: PropTypes.string,
//   errorMessage: PropTypes.string,
//   floatingLabel: PropTypes.string.isRequired,
//   handleBlur: PropTypes.func,
//   handleChange: PropTypes.func,
//   handleClick: PropTypes.func,
//   handleFocus: PropTypes.func,
//   helpText: PropTypes.arrayOf(PropTypes.string),
//   name: PropTypes.string.isRequired,
//   options: PropTypes.func,
//   readOnly: PropTypes.bool,
//   spellCheck: PropTypes.string,
//   trailingElement: PropTypes.element,
//   type: PropTypes.string,
//   value: PropTypes.string.isRequired,
// };

// export default FormGroup;

import React, { useState } from 'react';
import PropTypes from 'prop-types';

const FormGroup = (props) => {
  const [hasFocus, setHasFocus] = useState(false);

  const handleFocus = (e) => {
    setHasFocus(true);
    if (props.handleFocus) props.handleFocus(e);
  };

  const handleClick = (e) => {
    if (props.handleClick) props.handleClick(e);
  };

  const handleOnBlur = (e) => {
    setHasFocus(false);
    if (props.handleBlur) props.handleBlur(e);
  };

  return (
    <div className={`w-full mb-4 relative ${props.className}`}>
      <input
        id={props.name}
        name={props.name}
        type={props.type}
        placeholder={props.floatingLabel}
        readOnly={props.readOnly}
        autoComplete={props.autoComplete}
        spellCheck={props.spellCheck}
        value={props.value}
        onChange={props.handleChange}
        onFocus={handleFocus}
        onBlur={handleOnBlur}
        onClick={handleClick}
        className={`w-full outline-none border ${
          props.errorMessage ? 'border-red-500' : 'border-dark-grey'
        } focus:border-cFF0 focus:ring-1 focus:ring-cFF0 px-4 py-1 rounded peer focus:placeholder-transparent ${props.borderClass}`}
        aria-invalid={props.errorMessage !== ''}
      />

      <label
        htmlFor={props.name}
        className="absolute left-3 px-2 top-2.5 duration-200 text-dark-grey transition-all hidden peer-focus:block peer-focus:bg-white peer-placeholder-shown:text-sm peer-focus:-top-4"
      >
        {props.floatingLabel}
      </label>

      {/* Help text */}
      {hasFocus && props.helpText.length > 0 && (
        <div className="text-sm text-gray-500 mt-1">
          {props.helpText.map((msg, idx) => (
            <span key={idx}>
              {msg}
              <br />
            </span>
          ))}
        </div>
      )}

      {/* Error text */}
      {props.errorMessage && (
        <div className="text-sm text-red-500 mt-1">
          {props.errorMessage}
        </div>
      )}

      {props.children}
    </div>
  );
};

FormGroup.defaultProps = {
  as: 'input',
  autoComplete: null,
  borderClass: '',
  children: null,
  className: '',
  errorMessage: '',
  handleBlur: null,
  handleChange: () => {},
  handleClick: null,
  handleFocus: null,
  helpText: [],
  options: null,
  readOnly: false,
  spellCheck: null,
  trailingElement: null,
  type: 'text',
};

FormGroup.propTypes = {
  as: PropTypes.string,
  autoComplete: PropTypes.string,
  borderClass: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  errorMessage: PropTypes.string,
  floatingLabel: PropTypes.string.isRequired,
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  handleClick: PropTypes.func,
  handleFocus: PropTypes.func,
  helpText: PropTypes.arrayOf(PropTypes.string),
  name: PropTypes.string.isRequired,
  options: PropTypes.func,
  readOnly: PropTypes.bool,
  spellCheck: PropTypes.string,
  trailingElement: PropTypes.element,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
};

export default FormGroup;
