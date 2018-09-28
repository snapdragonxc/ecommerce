import React from 'react';
import Signin from './Signin';


class SigninContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { name, password } = this.state;
    this.props.login(name, password);
    this.setState({ name: '', password: '' });
  }

  render() {
    const { name, password } = this.state;
    return (
      <Signin
        name={name}
        password={password}
        handleInputChange={this.handleInputChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

export default SigninContainer;
