import React from 'react';

import { getConfig } from '@edx/frontend-platform';
import { useIntl } from '@edx/frontend-platform/i18n';
import { Hyperlink, Image } from '@openedx/paragon';
import classNames from 'classnames';

import messages from './messages';

const LargeLayout = () => {
  const { formatMessage } = useIntl();

  return (
    <div className="w-full hidden xl:w-[45%] h-[90vh] md:min-h-[80%] xl:flex items-center">
      <img
        src="../asset/student.svg"
        alt="student illustration"
        className=""
      />
    </div>
  );
};

export default LargeLayout;
