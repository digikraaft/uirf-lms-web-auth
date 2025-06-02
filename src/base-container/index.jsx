import React from 'react';

import { getConfig } from '@edx/frontend-platform';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { DefaultLargeLayout, } from './components/default-layout';
import { ImageLargeLayout, 
} from './components/image-layout';
import { AuthLargeLayout, } from './components/welcome-page-layout';
import { arc } from '../asset/index';

const BaseContainer = ({ children, showWelcomeBanner, fullName }) => {
  const enableImageLayout = getConfig().ENABLE_IMAGE_LAYOUT;

  if (enableImageLayout) {
    return (
      <div className="layout !bg-main flex items-end md:block w-full h-screen relative">
        <img
          src={arc}
          loading="lazy"
          alt=""
          className="absolute right-0 z-0 hidden md:inline"
        />
        <div className='flex w-full md:h-full md:justify-center xl:justify-end items-center md:relative md:z-20 xl:py-16 xl:px-20'>
          <div>
            {showWelcomeBanner ? <AuthLargeLayout fullName={fullName} /> : <ImageLargeLayout />}
          </div>        
          <div className={`content bg-white w-full xl:w-[45%] h-auto min-h-[90vh] md:min-h-[80%] rounded-t-3xl md:rounded-t-none px-4 md:rounded-br-[136px] md:rounded-tl-[136px] py-4 md:py-16 md:px-[6%] xl:pt-[146px]`}>
            {children}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="layout bg-main flex items-end md:block w-full min-h-screen relative">
        <img
          src="../asset/arc.svg"
          loading="lazy"
          alt=""
          className="absolute right-0 z-0 hidden md:inline"
        />
        <div className='flex w-full md:h-full md:justify-center xl:justify-end items-center md:relative md:z-20 xl:py-16 xl:px-20'>
          <div className=''>
            {showWelcomeBanner ? <AuthLargeLayout fullName={fullName} /> : <DefaultLargeLayout />}
          </div>        
          <div className={`content bg-white w-full xl:w-[45%] h-auto min-h-[90vh] md:min-h-[80%] rounded-t-3xl md:rounded-t-none px-4 md:rounded-br-[136px] md:rounded-tl-[136px] py-4 md:py-16 md:px-[6%] xl:pt-[146px]`}>
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

BaseContainer.defaultProps = {
  showWelcomeBanner: false,
  fullName: null,
};

BaseContainer.propTypes = {
  children: PropTypes.node.isRequired,
  showWelcomeBanner: PropTypes.bool,
  fullName: PropTypes.string,
};

export default BaseContainer;
