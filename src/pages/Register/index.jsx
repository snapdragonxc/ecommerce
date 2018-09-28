import React from 'react';

const Register = () => (
  <div>
    <form className="form" action="/api/users/login" method="post">
      Name: <input type="text" name="name" /><br/>
      Password: <input type="password" name="password" /><br/>
      Confirm Password: <input type="password" name="password" /><br/>
      <button type="submit">Submit</button>
    </form>
  </div>
);
export default Register;
