import React, {Component} from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Spinner
} from 'reactstrap';
import axios from 'axios';
import {connect} from 'react-redux';
import {auth} from '../actions/index';
import getUser from '../helpers/getUser';

class Navigation extends Component {
  state = {
    login_username: '',
    login_password: '',
    login_loading: false
  }

  isLoggedIn = () => {
    getUser().then(res => {
      if (res.logged_in) {
        this.props.setUser(res.user, res.first_name, res.last_name, res.email);
      }

      console.log("User: " + res.logged_in);
    });
  }

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };

    this.isLoggedIn();
  }

  login = () => {
    // Dispatch Login action
    this.setState({
      login_loading: true
    });

    axios.post('/auth/login', {
      username: this.state.login_username,
      password: this.state.login_password
    }).then(res => {
      this.setState({
        login_loading: false
      });

      if(res.data.errors.length == 0) {
        this.props.setUser(res.data.user, res.data.first_name, res.data.last_name, res.data.email);
      } else {
        alert(res.data.errors);
      }
    });
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  formChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  renderSpinnerOrForm = () => {
    if (this.state.login_loading) {
      return <Spinner color="light" />;
    } else if (!this.props.username){
      return (
        <React.Fragment>
        <Input type="text" name="login_username" placeholder="Username" onChange={this.formChangeHandler} />
        <Input type="password" name="login_password" placeholder="Password" onChange={this.formChangeHandler} style={{marginLeft: '0.5rem'}} />
        <Button color="primary" onClick={this.login} style={{marginLeft: '0.5rem'}}>Login</Button>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
        <a href='/dashboard' style={{color: '#ffffff', marginRight: '1rem'}}>{this.props.first_name + ' ' + this.props.last_name + ' (' + this.props.username + ')'}</a>
        <a href='/auth/logout'><Button color='danger'>Logout</Button></a>
        </React.Fragment>
      );
    }
  }

  render() {
    this.isLoggedIn();
    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/">Twitter Clone</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {this.renderSpinnerOrForm()}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    logged_in: state.auth.logged_in,
    login_loading: state.auth.login_loading,
    username: state.auth.username,
    first_name: state.auth.first_name,
    last_name: state.auth.last_name,
    email: state.auth.email
  };
}

const mapDispatchToProps = dispatch => {
  return {
    login: () => dispatch({type: auth.LOGIN_LOADING}),
    setUser: (username, first_name, last_name, email) => dispatch({type: auth.LOGGED_IN, payload: {user: username, first_name: first_name, last_name: last_name, email: email}})
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
