import React from 'react';
// import PropTypes from 'prop-types';
// import { Formik } from 'formik';
import { Formik } from 'formik';

import './styles.css';
class LoginPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
  }

  login(email, pass) {
    const emailDefault = 'a@gmail.com';
    const passDefault = 'abc';
    if (email === emailDefault && pass === passDefault) {
      setTimeout(() => {
        alert(JSON.stringify(pass, null, 1));
      }, 200);
    }
  }

  render() {
    return (
      <div>
        <h1>Login form</h1>
        <Formik
          initialValues={{ email: '', password: '' }}
          validate={values => {
            const errors = {};
            if (!values.email) {
              errors.email = 'Required';
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            this.login(values.email, values.password);
            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit} className="form-container">
              <input
                type="email"
                name="email"
                className="email"
                placeholder="Email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              <p>{errors.email && touched.email && errors.email}</p>
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              <p>{errors.password && touched.password && errors.password}</p>
              <button
                type="submit"
                className="btn-login"
                disabled={isSubmitting}
              >
                Log in
              </button>
            </form>
          )}
        </Formik>
      </div>
    );
  }
}
export default LoginPage;
