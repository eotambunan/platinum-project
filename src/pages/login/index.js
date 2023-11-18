import React, { useState } from 'react';
import { useRouter } from 'next/router'; // Import useRouter
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const router = useRouter(); // Use useRouter hook

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLoginSuccess = (token) => {
    // Store token in localStorage or state
    localStorage.setItem('token', token);

    // Redirect to the desired page (replace '/dashboard' with your target route)
    router.push('/expanses'); // Use push method from useRouter
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("https://moneytracker.cyclic.app/api/users/v1/login", {
        email: email,
        password: password,
      });

      // Handle successful login
      console.log('Login successful:', response.data);

      // Call the success handler with the token
      handleLoginSuccess(response.data.token);

      // Reset form fields and error
      setEmail('');
      setPassword('');
      setError('');
    } catch (error) {
      // Handle login error
      console.error('Login error:', error.response ? error.response.data : error.message);
      setError('Invalid email or password.');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form onSubmit={handleSubmit} style={{ width: '300px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={email} onChange={handleEmailChange} required />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={password} onChange={handlePasswordChange} required />

        <button type="submit" style={{ backgroundColor: '#4caf50', color: 'white', padding: '10px 15px', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Login</button>

        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default LoginPage;