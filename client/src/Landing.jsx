import React, {Component} from 'react';
import Navigation from './components/Navigation';
import {
  Card,
  Form,
  FormGroup,
  Input,
  Button
} from 'reactstrap';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

class Landing extends Component {
  state = {
    first_name: '',
    last_name: '',
    username: '',
    password: '',
    confirm_password: '',
    email: '',
    redirectToEmailVerification: false
  }

  signup = async (e) => {
    e.preventDefault();
    const {first_name, last_name, email, username, password, confirm_password} = this.state;

    const response = await axios.post('/auth/signup', {first_name: first_name, last_name: last_name, email: email, username: username, password: password, confirm_password: confirm_password});

    if (response.data.errors.length == 0) {
      this.setState({redirectToEmailVerification: true});
    } else {
      alert("Signup failed");
    }
  }

  formChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    if (this.props.username) {
      return <Redirect to='/dashboard' />;
    } else if (this.state.redirectToEmailVerification) {
      return <Redirect to='/emailverification' />;
    } else {
      return (
        <div>
          <div className="row" style={{padding: '1rem'}}>
          <div className="col-md-9">
            <h1>Landing Page</h1>
            <h2>{this.props.username}</h2>
          </div>
          <Form className="col-md-3" style={{backgroundColor: '#dddddd', paddingTop: '1rem', paddingBottom: '1rem'}}>
            <FormGroup>
              <Input type="text" onChange={this.formChangeHandler} placeholder="First Name" name="first_name" />
            </FormGroup>
            <FormGroup>
              <Input type="text" onChange={this.formChangeHandler} placeholder="Last Name" name="last_name" />
            </FormGroup>
            <FormGroup>
              <Input type="text" onChange={this.formChangeHandler} placeholder="Username" name="username" />
            </FormGroup>
            <FormGroup>
              <Input type="text" onChange={this.formChangeHandler} placeholder="Email" name="email" />
            </FormGroup>
            <FormGroup>
              <Input type="password" onChange={this.formChangeHandler} placeholder="Password" name="password" />
            </FormGroup>
            <FormGroup>
              <Input type="password" onChange={this.formChangeHandler} placeholder="Confirm Password" name="confirm_password" />
            </FormGroup>
            <Button color="danger" onClick={this.signup}>Signup</Button>
          </Form>
        </div>
      </div>
    );
  }
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.auth.username
  }
}

export default connect(mapStateToProps)(Landing);
