/**
 *
 * RegisterPage
 *
 */

import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

// Import Components
import Header from 'components/Header';
import Subheader from 'components/Subheader';
import Information from 'components/Information';
import RegisterForm from 'components/RegisterForm';
import Footer from 'components/Footer';
import Notifier from 'components/Notifier';
import messages from './messages';

import reducer from './reducer';
import saga from './saga';
import { loadCurrencyAction, isLoggedAction } from './actions';

export function RegisterPage({ isLogged, getCurrency }) {
  useInjectReducer({ key: 'registerPage', reducer });
  useInjectSaga({ key: 'registerPage', saga });
  useEffect(() => {
    isLogged();
    getCurrency();
  }, []);

  return (
    <Fragment>
      <FormattedMessage {...messages.helmetRegisterTitle}>
        {title => <Helmet title={title} />}
      </FormattedMessage>

      <Header />
      <FormattedMessage {...messages.registerText}>
        {title => <Subheader title={title} />}
      </FormattedMessage>

      <Information />
      <RegisterForm />
      <Footer />
      <Notifier />
    </Fragment>
  );
}

RegisterPage.propTypes = {
  isLogged: PropTypes.func,
  getCurrency: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    isLogged: () => dispatch(isLoggedAction()),
    getCurrency: () => dispatch(loadCurrencyAction()),
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(RegisterPage);