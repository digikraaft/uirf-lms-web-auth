import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from '@edx/frontend-platform/i18n';
import PhoneField from '../../../common-components/PhoneField.jsx'; // adjust path based on your project
import { clearRegistrationBackendError, fetchRealtimeValidations } from '../../data/actions.js';
import validatePhone from './validator.js'; // You’ll need a phone validation util similar to validateEmail
import { Phone } from '@openedx/paragon/icons';

/**
 * PhoneField component is responsible for:
 * - Validating phone numbers
 * - Dispatching realtime validation
 * - Clearing backend errors on focus
 * - Reporting errors via handleErrorChange
 */
const PhoneNumberField = ({ value, handleChange, handleErrorChange, id, name }) => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();

  const validationApiRateLimited = useSelector(state => state.register.validationApiRateLimited);

  const [localError, setLocalError] = useState('');

  useEffect(() => {
    setLocalError(''); // Clear local error when value changes
  }, [value]);

  const handleOnBlur = (e) => {
    const { value: phoneValue } = e.target;
    const error = validatePhone(phoneValue, formatMessage);

    if (error) {
      setLocalError(error);
      handleErrorChange('phone', error);
    } else {
      handleErrorChange('phone', '');
      if (!validationApiRateLimited) {
        dispatch(fetchRealtimeValidations({ phone_number: phoneValue }));
      }
    }
  };

  const handleOnFocus = () => {
    setLocalError('');
    handleErrorChange('phone', '');
    dispatch(clearRegistrationBackendError('phone'));
  };

  return (
    <PhoneField
      id={id}
      className="form-field--phone"
      name={name}
      label={formatMessage({ id: 'registration.phone.label', defaultMessage: 'Phone Number' })}
      value={value}
      onChange={handleChange}
      onBlur={handleOnBlur}
      onFocus={handleOnFocus}
      error={localError}
      maxLength={20}
    />
  );
};

PhoneField.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleErrorChange: PropTypes.func.isRequired,
};

export default PhoneNumberField;
