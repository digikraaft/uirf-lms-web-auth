import React from 'react';

import { getConfig } from '@edx/frontend-platform';
import { useIntl } from '@edx/frontend-platform/i18n';
import { Hyperlink, Image } from '@openedx/paragon';
import classNames from 'classnames';

import messages from './messages';

import { student } from '../../../asset/index';

const LargeLayout = () => {
  const { formatMessage } = useIntl();

  return (
    <div className="w-full hidden xl:w-[75%] h-[90vh] md:min-h-[80%] xl:flex items-center">
      <img
        src={student}
        alt="Log into ASK4BG illustration"
        className=""
      />
    </div>
  );
};

export default LargeLayout;
