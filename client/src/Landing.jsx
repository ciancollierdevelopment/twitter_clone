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

class Landing extends Component {
  render() {
    if (this.props.username) {
      return <Redirect to='/dashboard' />;
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
              <Input type="text" placeholder="First Name" name="firstname" />
            </FormGroup>
            <FormGroup>
              <Input type="text" placeholder="Last Name" name="lastname" />
            </FormGroup>
            <FormGroup>
              <Input type="text" placeholder="Username" name="username" />
            </FormGroup>
            <FormGroup>
              <Input type="text" placeholder="Email" name="email" />
            </FormGroup>
            <FormGroup>
              <Input type="password" placeholder="Password" name="password" />
            </FormGroup>
            <FormGroup>
              <Input type="password" placeholder="Confirm Password" name="confirm_password" />
            </FormGroup>
            <Button color="danger">Signup</Button>
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
