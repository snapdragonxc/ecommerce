import {
  BrowserRouter,
  Route,
  withRouter,
} from 'react-router-dom';
import React from 'react';
import { connect } from 'react-redux';
import About from './pages/About';
import Cart from './pages/Cart';
import Contact from './pages/Contact';
import CategoriesMng from './pages/CategoriesMng';
import Signin from './pages/Signin'; // this is the login page
import Detail from './pages/Detail';
import Home from './pages/Home';
import ProductsMng from './pages/ProductsMng';
import Faq from './pages/Faq';
import Shop from './pages/Shop';
import Edit from './pages/Edit';
import Header from './layout/Header';
import Footer from './layout/Footer';
import RedirectRoute from './users/redirectRoute';
import AuthRoute from './users/authRoute';
import { loginUser, logoutUser } from './actions/authActions';

const HeaderWithRouter = withRouter(Header);

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
  }

  login(name, password) {
    this.props.loginUser(name, password);
  }

  render() {
    const { username } = this.props;
    return (
      <BrowserRouter>
        <div>
          <HeaderWithRouter username={username} logout={this.logout}/>
          <Route exact path="/" component={Home}/>
          <Route path="/about" component={About}/>
          <Route path="/contact" component={Contact}/>
          <Route path="/detail/:name" component={Detail}/>
          <Route path="/faq" component={Faq}/>
          <Route exact path="/shop" component={Shop}/>
          <Route path="/shop/:category/:page" component={Shop}/>
          <Route path="/cart" component={Cart} />
          <Route path="/dashboard/add" component={Edit} username={username}/>
          <Route path="/dashboard/edit/:id" component={Edit} username={username}/>
          <Route exact path="/dashboard/products" component={ProductsMng} username={username}/>
          <Route path="/dashboard/products/:page" component={ProductsMng} username={username}/>
          <Route path="/dashboard/categories" component={CategoriesMng} username={username}/>
          <Route path="/signin" component={Signin} login={this.login} username={username} />
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  loginUser: (name, password) => dispatch(loginUser(name, password)),
  logoutUser: () => dispatch(logoutUser()),
});

const mapStateToProps = state => ({
  username: state.auth.username,
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);



/*
<AuthRoute path="/dashboard/add" component={Edit} username={username}/>
<AuthRoute path="/dashboard/edit/:id" component={Edit} username={username}/>
<AuthRoute exact path="/dashboard/products" component={ProductsMng} username={username}/>
<AuthRoute path="/dashboard/products/:page" component={ProductsMng} username={username}/>
<AuthRoute path="/dashboard/categories" component={CategoriesMng} username={username}/>
<RedirectRoute path="/signin" component={Signin} login={this.login} username={username} />
*/
