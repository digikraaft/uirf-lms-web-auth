// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';

// import { useIntl } from '@edx/frontend-platform/i18n';
// import {
//   Form, Icon, IconButton, OverlayTrigger, Tooltip, useToggle,
// } from '@openedx/paragon';
// import {
//   Check, Remove, Visibility, VisibilityOff,
// } from '@openedx/paragon/icons';
// import PropTypes from 'prop-types';

// import messages from './messages';
// import { LETTER_REGEX, NUMBER_REGEX } from '../data/constants';
// import { clearRegistrationBackendError, fetchRealtimeValidations } from '../register/data/actions';
// import { validatePasswordField } from '../register/data/utils';

// const PasswordField = (props) => {
//   const { formatMessage } = useIntl();
//   const dispatch = useDispatch();

//   const validationApiRateLimited = useSelector(state => state.register.validationApiRateLimited);
//   const [isPasswordHidden, setHiddenTrue, setHiddenFalse] = useToggle(true);
//   const [showTooltip, setShowTooltip] = useState(false);

//   const handleBlur = (e) => {
//     const { name, value } = e.target;
//     if (name === props.name && e.relatedTarget?.name === 'passwordIcon') {
//       return; // Do not run validations on password icon click
//     }

//     let passwordValue = value;
//     if (name === 'passwordIcon') {
//       // To validate actual password value when onBlur is triggered by focusing out the password icon
//       passwordValue = props.value;
//     }

//     if (props.handleBlur) {
//       props.handleBlur({
//         target: {
//           name: props.name,
//           value: passwordValue,
//         },
//       });
//     }

//     setShowTooltip(props.showRequirements && false);
//     if (props.handleErrorChange) { // If rendering from register page
//       const fieldError = validatePasswordField(passwordValue, formatMessage);
//       if (fieldError) {
//         props.handleErrorChange('password', fieldError);
//       } else if (!validationApiRateLimited) {
//         dispatch(fetchRealtimeValidations({ password: passwordValue }));
//       }
//     }
//   };

//   const handleFocus = (e) => {
//     if (e.target?.name === 'passwordIcon') {
//       return; // Do not clear error on password icon focus
//     }

//     if (props.handleFocus) {
//       props.handleFocus(e);
//     }
//     if (props.handleErrorChange) {
//       props.handleErrorChange('password', '');
//       dispatch(clearRegistrationBackendError('password'));
//     }
//     setTimeout(() => setShowTooltip(props.showRequirements && true), 150);
//   };

//   const HideButton = (
//     <IconButton
//       onFocus={handleFocus}
//       onBlur={handleBlur}
//       name="passwordIcon"
//       src={VisibilityOff}
//       iconAs={Icon}
//       onClick={setHiddenTrue}
//       size="sm"
//       variant="secondary"
//       alt={formatMessage(messages['hide.password'])}
//     />
//   );

//   const ShowButton = (
//     <IconButton
//       onFocus={handleFocus}
//       onBlur={handleBlur}
//       name="passwordIcon"
//       src={Visibility}
//       iconAs={Icon}
//       onClick={setHiddenFalse}
//       size="sm"
//       variant="secondary"
//       alt={formatMessage(messages['show.password'])}
//     />
//   );

//   const placement = window.innerWidth < 768 ? 'top' : 'left';
//   const tooltip = (
//     <Tooltip id={`password-requirement-${placement}`}>
//       <span id="letter-check" className="d-flex align-items-center">
//         {LETTER_REGEX.test(props.value) ? <Icon className="text-success mr-1" src={Check} /> : <Icon className="mr-1 text-light-700" src={Remove} />}
//         {formatMessage(messages['one.letter'])}
//       </span>
//       <span id="number-check" className="d-flex align-items-center">
//         {NUMBER_REGEX.test(props.value) ? <Icon className="text-success mr-1" src={Check} /> : <Icon className="mr-1 text-light-700" src={Remove} />}
//         {formatMessage(messages['one.number'])}
//       </span>
//       <span id="characters-check" className="d-flex align-items-center">
//         {props.value.length >= 8 ? <Icon className="text-success mr-1" src={Check} /> : <Icon className="mr-1 text-light-700" src={Remove} />}
//         {formatMessage(messages['eight.characters'])}
//       </span>
//     </Tooltip>
//   );

//   return (
//     <Form.Group controlId={props.name} isInvalid={props.errorMessage !== ''}>
//       <OverlayTrigger key="tooltip" placement={placement} overlay={tooltip} show={showTooltip}>
//         <Form.Control
//           as="input"
//           className="form-group__form-field"
//           type={isPasswordHidden ? 'password' : 'text'}
//           name={props.name}
//           value={props.value}
//           autoComplete={props.autoComplete}
//           aria-invalid={props.errorMessage !== ''}
//           onFocus={handleFocus}
//           onBlur={handleBlur}
//           onChange={props.handleChange}
//           controlClassName={props.borderClass}
//           trailingElement={isPasswordHidden ? ShowButton : HideButton}
//           floatingLabel={props.floatingLabel}
//         />
//       </OverlayTrigger>
//       {props.errorMessage !== '' && (
//         <Form.Control.Feedback key="error" className="form-text-size" hasIcon={false} feedback-for={props.name} type="invalid">
//           {props.errorMessage}
//           {props.showScreenReaderText && <span className="sr-only">{formatMessage(messages['password.sr.only.helping.text'])}</span>}
//         </Form.Control.Feedback>
//       )}
//     </Form.Group>
//   );
// };

// PasswordField.defaultProps = {
//   borderClass: '',
//   errorMessage: '',
//   handleBlur: null,
//   handleFocus: null,
//   handleChange: () => {},
//   handleErrorChange: null,
//   showRequirements: true,
//   showScreenReaderText: true,
//   autoComplete: null,
// };

// PasswordField.propTypes = {
//   borderClass: PropTypes.string,
//   errorMessage: PropTypes.string,
//   floatingLabel: PropTypes.string.isRequired,
//   handleBlur: PropTypes.func,
//   handleFocus: PropTypes.func,
//   handleChange: PropTypes.func,
//   handleErrorChange: PropTypes.func,
//   name: PropTypes.string.isRequired,
//   showRequirements: PropTypes.bool,
//   value: PropTypes.string.isRequired,
//   autoComplete: PropTypes.string,
//   showScreenReaderText: PropTypes.bool,
// };

// export default PasswordField;

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from '@edx/frontend-platform/i18n';
import { Check, Remove } from '@openedx/paragon/icons';

import messages from './messages';
import { LETTER_REGEX, NUMBER_REGEX } from '../data/constants';
import { validatePasswordField } from '../register/data/utils';
import { fetchRealtimeValidations, clearRegistrationBackendError } from '../register/data/actions';

const PasswordField = ({
  id,
  name,
  value,
  floatingLabel,
  errorMessage,
  borderClass,
  handleChange,
  handleBlur,
  handleFocus,
  handleErrorChange,
  showRequirements,
  showScreenReaderText,
  autoComplete,
}) => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);
  const validationApiRateLimited = useSelector(state => state.register.validationApiRateLimited);

  const _handleBlur = (e) => {
    const { name: targetName, value: targetValue } = e.target;
    if (targetName === name && e.relatedTarget?.name === 'passwordIcon') return;

    const finalValue = targetName === 'passwordIcon' ? value : targetValue;

    handleBlur?.({ target: { name, value: finalValue } });
    setShowTooltip(showRequirements && false);

    if (handleErrorChange) {
      const fieldError = validatePasswordField(finalValue, formatMessage);
      if (fieldError) {
        handleErrorChange('password', fieldError);
      } else if (!validationApiRateLimited) {
        dispatch(fetchRealtimeValidations({ password: finalValue }));
      }
    }
  };

  const _handleFocus = (e) => {
    if (e.target?.name === 'passwordIcon') return;

    handleFocus?.(e);
    handleErrorChange?.('password', '');
    dispatch(clearRegistrationBackendError('password'));
    setTimeout(() => setShowTooltip(showRequirements && true), 150);
  };

  const TooltipItem = ({ isValid, message }) => (
    <div className="flex items-center gap-2">
      <span className={`material-symbols-outlined text-sm ${isValid ? 'text-green-500' : 'text-gray-400'}`}>
        {isValid ? 'check' : 'close'}
      </span>
      <span>{message}</span>
    </div>
  );

  return (
    <div className="w-full relative mb-4">
      <input
        type={isPasswordHidden ? 'password' : 'text'}
        id={id}
        name={name}
        placeholder={floatingLabel}
        autoComplete={autoComplete}
        value={value}
        onChange={handleChange}
        onBlur={_handleBlur}
        onFocus={_handleFocus}
        aria-invalid={errorMessage !== ''}
        className={`w-full outline-none border ${errorMessage ? 'border-red-500' : 'border-dark-grey'} ${borderClass} focus:border-cff) focus:ring-1 focus:ring-cFF0 px-4 py-1 rounded peer focus:placeholder-transparent`}
      />

      <label
        htmlFor={`${name}-field`}
        className="absolute left-3 px-2 top-2.5 duration-200 text-dark-grey transition-all hidden peer-focus:block peer-focus:bg-white peer-placeholder-shown:text-sm peer-focus:-top-4"
      >
        {floatingLabel}
      </label>

      <div className="absolute right-4 top-1.5">
        <button
          type="button"
          name="passwordIcon"
          onClick={() => setIsPasswordHidden(prev => !prev)}
          onBlur={_handleBlur}
          onFocus={_handleFocus}
        >
         
            {isPasswordHidden ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512"><circle cx="256" cy="256" r="64" fill="currentColor"/><path fill="currentColor" d="M394.82 141.18C351.1 111.2 304.31 96 255.76 96c-43.69 0-86.28 13-126.59 38.48C88.52 160.23 48.67 207 16 256c26.42 44 62.56 89.24 100.2 115.18C159.38 400.92 206.33 416 255.76 416c49 0 95.85-15.07 139.3-44.79C433.31 345 469.71 299.82 496 256c-26.38-43.43-62.9-88.56-101.18-114.82M256 352a96 96 0 1 1 96-96a96.11 96.11 0 0 1-96 96"/></svg>
            ) : (

              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 12 12"><path fill="currentColor" d="M3.81 9.606A6.2 6.2 0 0 0 6 10c2.51 0 4.48-1.453 5.79-3.341c.282-.394.28-.923.001-1.325a8.9 8.9 0 0 0-1.793-1.917l-.717.717a7.8 7.8 0 0 1 1.69 1.773a.15.15 0 0 1-.001.178C9.83 7.733 8.112 9 6 9a5.2 5.2 0 0 1-1.394-.19l-.797.796ZM7.396 3.19A5.2 5.2 0 0 0 6.001 3C3.89 3 2.173 4.267 1.025 5.924a.15.15 0 0 0 .005.17a7.8 7.8 0 0 0 1.69 1.772l-.717.717A8.9 8.9 0 0 1 .21 6.666a1.14 1.14 0 0 1 0-1.32C1.518 3.455 3.49 2 6 2a6.2 6.2 0 0 1 2.193.394l-.797.797ZM5.483 7.932a2.003 2.003 0 0 0 2.45-2.45L6.708 6.707zm-.189-2.639l1.225-1.225a2.003 2.003 0 0 0-2.45 2.45zm5.574-3.517a.454.454 0 0 0-.58-.695l-.063.052l-9.09 9.091a.455.455 0 0 0 .579.695l.063-.052l9.09-9.091Z"/></svg>
            )}
          <span className="sr-only">
            {formatMessage(messages[isPasswordHidden ? 'show.password' : 'hide.password'])}
          </span>
        </button>
      </div>

      {showTooltip && (
        <div className="absolute -left-1/3 top-1/2 -translate-y-1/2  z-10 mt-2 py-1.5 px-3 bg-white border border-gray-300 rounded shadow-lg text-sm w-max">
          <TooltipItem isValid={LETTER_REGEX.test(value)} message={formatMessage(messages['one.letter'])} />
          <TooltipItem isValid={NUMBER_REGEX.test(value)} message={formatMessage(messages['one.number'])} />
          <TooltipItem isValid={value.length >= 8} message={formatMessage(messages['eight.characters'])} />
        </div>
      )}

      {errorMessage && (
        <p className="mt-1 text-sm text-red-500">
          {errorMessage}
          {showScreenReaderText && (
            <span className="sr-only">{formatMessage(messages['password.sr.only.helping.text'])}</span>
          )}
        </p>
      )}
    </div>
  );
};

PasswordField.defaultProps = {
  borderClass: '',
  errorMessage: '',
  handleBlur: null,
  handleFocus: null,
  handleChange: () => {},
  handleErrorChange: null,
  showRequirements: true,
  showScreenReaderText: true,
  autoComplete: null,
};

PasswordField.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  floatingLabel: PropTypes.string.isRequired,
  borderClass: PropTypes.string,
  errorMessage: PropTypes.string,
  handleBlur: PropTypes.func,
  handleFocus: PropTypes.func,
  handleChange: PropTypes.func,
  handleErrorChange: PropTypes.func,
  showRequirements: PropTypes.bool,
  showScreenReaderText: PropTypes.bool,
  autoComplete: PropTypes.string,
};

export default PasswordField;

