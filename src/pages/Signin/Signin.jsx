import React from 'react';

const Signin = ({
  handleInputChange,
  handleSubmit,
  name,
  password,
}) => (
  <div>
    <form className="form" onSubmit={handleSubmit}>
      <label>Name:</label>
      <input
        type="text"
        value={name}
        placeholder="Username"
        onChange={handleInputChange}
        name="name"
      />
      <br />
      <label>Password:</label>
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={handleInputChange}
          name="password"
        />
      <br />
      <button>Login</button>
    </form>
  </div>
);
export default Signin;
