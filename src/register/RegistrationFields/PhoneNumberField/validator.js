import messages from '../../messages';

export const VALID_PHONE_REGEX = /^[0-9]{10,15}$/;
export const phoneRegex = new RegExp(VALID_PHONE_REGEX);

const validatePhone = (value, formatMessage) => {
  let fieldError = '';
  if (!value || value.length < 10 || value.length > 15) {
    fieldError = formatMessage(messages['phone.validation.message']);
  } else if (!phoneRegex.test(value)) {
    fieldError = formatMessage(messages['phone.format.validation.message']);
  }
  return fieldError;
};

export default validatePhone;