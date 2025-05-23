import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { getConfig } from '@edx/frontend-platform';
import { sendPageEvent, sendTrackEvent } from '@edx/frontend-platform/analytics';
import { getAuthService } from '@edx/frontend-platform/auth';
import { useIntl } from '@edx/frontend-platform/i18n';
import {
  Icon,
  Tab,
  Tabs,
} from '@openedx/paragon';
import { ChevronLeft } from '@openedx/paragon/icons';
import PropTypes from 'prop-types';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import BaseContainer from '../base-container';
import { clearThirdPartyAuthContextErrorMessage } from '../common-components/data/actions';
import {
  tpaProvidersSelector,
} from '../common-components/data/selectors';
import messages from '../common-components/messages';
import { LOGIN_PAGE, REGISTER_PAGE } from '../data/constants';
import {
  getTpaHint, getTpaProvider, updatePathWithQueryParams,
} from '../data/utils';
import { LoginPage } from '../login';
import { backupLoginForm } from '../login/data/actions';
import { RegistrationPage } from '../register';
import { backupRegistrationForm } from '../register/data/actions';

const Logistration = (props) => {
  const { selectedPage, tpaProviders } = props;
  const tpaHint = getTpaHint();
  const {
    providers, secondaryProviders,
  } = tpaProviders;
  const { formatMessage } = useIntl();
  const [institutionLogin, setInstitutionLogin] = useState(false);
  const [key, setKey] = useState('');
  const navigate = useNavigate();
  const disablePublicAccountCreation = getConfig().ALLOW_PUBLIC_ACCOUNT_CREATION === false;
  const hideRegistrationLink = getConfig().SHOW_REGISTRATION_LINKS === false;

  useEffect(() => {
    const authService = getAuthService();
    if (authService) {
      authService.getCsrfTokenService().getCsrfToken(getConfig().LMS_BASE_URL);
    }
  });

  useEffect(() => {
    if (disablePublicAccountCreation) {
      navigate(updatePathWithQueryParams(LOGIN_PAGE));
    }
  }, [navigate, disablePublicAccountCreation]);

  const handleInstitutionLogin = (e) => {
    sendTrackEvent('edx.bi.institution_login_form.toggled', { category: 'user-engagement' });
    if (typeof e === 'string') {
      sendPageEvent('login_and_registration', e === '/login' ? 'login' : 'register');
    } else {
      sendPageEvent('login_and_registration', e.target.dataset.eventName);
    }

    setInstitutionLogin(!institutionLogin);
  };

  const handleOnSelect = (tabKey, currentTab) => {
    if (tabKey === currentTab) {
      return;
    }
    sendTrackEvent(`edx.bi.${tabKey.replace('/', '')}_form.toggled`, { category: 'user-engagement' });
    props.clearThirdPartyAuthContextErrorMessage();
    if (tabKey === LOGIN_PAGE) {
      props.backupRegistrationForm();
    } else if (tabKey === REGISTER_PAGE) {
      props.backupLoginForm();
    }
    setKey(tabKey);
  };

  const tabTitle = (
    <div className="d-flex">
      <Icon src={ChevronLeft} className="left-icon" />
      <span className="ml-10 text-cFF0">
        {selectedPage === LOGIN_PAGE
          ? formatMessage(messages['logistration.sign.in'])
          : formatMessage(messages['logistration.register'])}
      </span>
    </div>
  );

  const isValidTpaHint = () => {
    const { provider } = getTpaProvider(tpaHint, providers, secondaryProviders);
    return !!provider;
  };

  return (
    <BaseContainer>
      <div>
        {disablePublicAccountCreation
          ? (
            <>
              {institutionLogin && (
                <Tabs defaultActiveKey="" id="controlled-tab" className='border border-green-500' onSelect={handleInstitutionLogin}>
                  <Tab title={tabTitle} eventKey={LOGIN_PAGE} className='border border-green-500'/>
                </Tabs>
              )}
              <div id="main-content" className="main-content">
                {!institutionLogin && (
                  <h3 className="mb-4.5">{formatMessage(messages['logistration.sign.in'])}</h3>
                )}
                <LoginPage institutionLogin={institutionLogin} handleInstitutionLogin={handleInstitutionLogin} />
              </div>
            </>
          )
          : (
            <div>
              {institutionLogin
                ? (
                  <div>
                    {/* <Tabs defaultActiveKey="" id="controlled-tab" onSelect={handleInstitutionLogin}>
                      <Tab title={tabTitle} eventKey={selectedPage === LOGIN_PAGE ? LOGIN_PAGE : REGISTER_PAGE} />
                    </Tabs> */}
                    <div className='relative'>
                    {/* <Tabs defaultActiveKey={selectedPage} id="controlled-tab" className='border-none' onSelect={(tabKey) => handleOnSelect(tabKey, selectedPage)}>
                      <Tab title={formatMessage(messages['logistration.register'])} className='border-none bg-transparent text-cFF0' eventKey={REGISTER_PAGE} />
                      <Tab title={formatMessage(messages['logistration.sign.in'])} className='border-none bg-transparent text-cFF0' eventKey={LOGIN_PAGE} />
                    </Tabs> */}
                    <div className='md:flex w-[300px] items-center text-cFF0 hidden font-roboto'>
                      {selectedPage === REGISTER_PAGE ? (
                        <Link to={'/register'} className='w-1/2 px-4 py-0.5 hover:text-black'>
                          {formatMessage(messages['logistration.register'])}
                          </Link>
                          ):(
                          <Link to={'/login'} className='w-1/2 px-4 py-0.5 hover:text-black'>
                            {formatMessage(messages['logistration.sign.in'])}
                          </Link>
                        )
                      }
                    </div>
                    <div className="hidden md:flex w-[300px] h-[13px] bg-main mt-1">
                      <div className={`h-full w-1/2 ${selectedPage === REGISTER_PAGE ? 'bg-cFF0' : ''}`}></div>
                      <div className={`h-full w-1/2 ${selectedPage === LOGIN_PAGE ? 'bg-cFF0' : ''}`}></div>
                    </div>
                  </div>
                  </div>
                )
                : (!isValidTpaHint() && !hideRegistrationLink && (
                  <div className='relative'>
                    {/* <Tabs defaultActiveKey={selectedPage} id="controlled-tab" className='border-none' onSelect={(tabKey) => handleOnSelect(tabKey, selectedPage)}>
                      <Tab title={formatMessage(messages['logistration.register'])} className='border-none bg-transparent text-cFF0' eventKey={REGISTER_PAGE} />
                      <Tab title={formatMessage(messages['logistration.sign.in'])} className='border-none bg-transparent text-cFF0' eventKey={LOGIN_PAGE} />
                    </Tabs> */}
                    <div className='md:flex w-[300px] items-center text-cFF0 hidden font-roboto'>
                      <Link to={'/register'} className='w-1/2 px-4 py-0.5 hover:text-black'>
                        {formatMessage(messages['logistration.register'])}
                      </Link>
                      <Link to={'/login'} className='w-1/2 px-4 py-0.5 hover:text-black'>
                        {formatMessage(messages['logistration.sign.in'])}
                      </Link>
                    </div>
                    <div className="hidden md:flex w-[300px] h-[13px] bg-main mt-1">
                      <div className={`h-full w-1/2 ${selectedPage === REGISTER_PAGE ? 'bg-cFF0' : ''}`}></div>
                      <div className={`h-full w-1/2 ${selectedPage === LOGIN_PAGE ? 'bg-cFF0' : ''}`}></div>
                    </div>
                  </div>
                ))}
              { key && (
                <Navigate to={updatePathWithQueryParams(key)} replace />
              )}
              <div id="main-content" className="main-content">
                {!institutionLogin && !isValidTpaHint() && hideRegistrationLink && (
                  <h3 className="mb-4.5">
                    {formatMessage(messages[selectedPage === LOGIN_PAGE ? 'logistration.sign.in' : 'logistration.register'])}
                  </h3>
                )}
                {selectedPage === LOGIN_PAGE
                  ? <LoginPage institutionLogin={institutionLogin} handleInstitutionLogin={handleInstitutionLogin} />
                  : (
                    <RegistrationPage
                      institutionLogin={institutionLogin}
                      handleInstitutionLogin={handleInstitutionLogin}
                    />
                  )}
              </div>
            </div>
          )}
      </div>
    </BaseContainer>
  );
};

Logistration.propTypes = {
  selectedPage: PropTypes.string,
  backupLoginForm: PropTypes.func.isRequired,
  backupRegistrationForm: PropTypes.func.isRequired,
  clearThirdPartyAuthContextErrorMessage: PropTypes.func.isRequired,
  tpaProviders: PropTypes.shape({
    providers: PropTypes.arrayOf(PropTypes.shape({})),
    secondaryProviders: PropTypes.arrayOf(PropTypes.shape({})),
  }),
};

Logistration.defaultProps = {
  tpaProviders: {
    providers: [],
    secondaryProviders: [],
  },
};

Logistration.defaultProps = {
  selectedPage: REGISTER_PAGE,
};

const mapStateToProps = state => ({
  tpaProviders: tpaProvidersSelector(state),
});

export default connect(
  mapStateToProps,
  {
    backupLoginForm,
    backupRegistrationForm,
    clearThirdPartyAuthContextErrorMessage,
  },
)(Logistration);
