import React, {Component} from 'react';
import {Button, Spinner} from 'reactstrap';
import axios from 'axios';

class AddPostForm extends Component {
  state = {
    content: '',
    loading_post: false
  }

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  submitPost = async (e) => {
    const posted = await axios.post('/post/newpost', {
      content: this.state.content
    });

    this.setState({loading_post: true});

    if (posted) {
      this.setState({loading_post: false});
    }
  }

  render() {
    if (this.state.loading_post) {
      return <Spinner color="primary" />;
    } else {
      return (
        <React.Fragment>
          <form name="addpostform">
            <textarea name="content" placeholder="What's On Your Mind?" onChange={this.changeHandler}></textarea><br />
            <Button color="primary" onClick={this.submitPost}>Post</Button>
          </form>
        </React.Fragment>
      );
    }
  }
}

export default AddPostForm;
