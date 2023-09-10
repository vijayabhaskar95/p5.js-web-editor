import React from 'react';
import { Helmet } from 'react-helmet';
import browserHistory from '../../../browserHistory';
import RootPage from '../../../components/RootPage';
import Nav from '../../IDE/components/Header/Nav';
import React, { useEffect } from 'react';

function EmailVerificationView({ emailVerificationTokenState, verifyEmailConfirmation, t, location }) {
  useEffect(() => {
    const verificationToken = verificationToken();
    if (verificationToken != null) {
      verifyEmailConfirmation(verificationToken);
    }
  }, []);

  const verificationToken = () => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get('t');
  };

  let status = null;

  if (verificationToken() == null) {
    status = <p>{t('EmailVerificationView.InvalidTokenNull')}</p>;
  } else if (emailVerificationTokenState === 'checking') {
    status = <p>{t('EmailVerificationView.Checking')}</p>;
  } else if (emailVerificationTokenState === 'verified') {
    status = <p>{t('EmailVerificationView.Verified')}</p>;
    setTimeout(() => browserHistory.push('/'), 1000);
  } else if (emailVerificationTokenState === 'invalid') {
    status = <p>{t('EmailVerificationView.InvalidState')}</p>;
  }

  return (
    <RootPage>
      <Nav layout="dashboard" />
      <div className="form-container">
        <Helmet>
          <title>{t('EmailVerificationView.Title')}</title>
        </Helmet>
        <div className="form-container__content">
          <h2 className="form-container__title">
            {t('EmailVerificationView.Verify')}
          </h2>
          {status}
        </div>
      </div>
    </RootPage>
  );
}

export default EmailVerificationView;
