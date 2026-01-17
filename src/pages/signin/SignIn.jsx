import React, { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../../services/api';
import '../../styles/index.scss';

const INITIAL_FORM_STATE = {
  email: '',
  password: '',
};

const SignIn = () => {
  const [form, setForm] = useState(INITIAL_FORM_STATE);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const { email, password } = form;

  const handleChange = useCallback((e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  }, []);

  const validateForm = () => {
    if (!email.trim() || !password.trim()) {
      setError('Please enter email and password');
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setError('');

    try {
      const response = await apiService.login(email, password);

      if (!response?.token) {
        throw new Error('Invalid Credentials');
      }

      localStorage.setItem('authToken', response.token);
      localStorage.setItem('userData', JSON.stringify(response));

      navigate('/services');
    } catch (err) {
      setError(
        err?.message === 'Invalid Credentials'
          ? '* Invalid Credentials'
          : 'Login failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = loading || !email.trim() || !password.trim();

  return (
    <>
      <Helmet>
        <title>Sign In - ORO Developments</title>
        <meta
          name="description"
          content="Sign in to access ORO24 premium home and facility management services."
        />
      </Helmet>

      <div className="signin">
        <div className="signin__background" />
        <div className="signin__overlay" />

        <div className="signin__content">
          <div className="signin__logo">
            <img src="/images/Logo.png" alt="ORO Developments Logo" />
          </div>

          <div className="signin__form">
            <h1 className="signin__title">Sign In</h1>

            {error && <p className="signin__error">{error}</p>}

            <form onSubmit={handleLogin} noValidate>
              <div className="signin__field">
                <label htmlFor="email">Email Id</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="edit-text"
                  autoComplete="email"
                  autoFocus
                />
              </div>

              <div className="signin__field">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="edit-text"
                  autoComplete="current-password"
                />
              </div>

              <button
                type="submit"
                disabled={isDisabled}
                className="button button--primary button--lg button--full"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
