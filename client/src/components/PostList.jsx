import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

class PostList extends Component {
  state = {
    posts_loaded: 25,
    posts: [{content: 'This is a fake post'}]
  }

  updatePosts = async () => {
    const response = await axios.post('/post/getpostsusername', {
      usernames: [this.props.username],
      number_to_return: this.state.posts_loaded
    });

    this.setState({posts: response.data.posts});
  }

  componentDidMount() {
    this.updatePosts();
  }

  componentDidUpdate() {
    this.updatePosts();
  }

  render() {
    const rendered_posts = this.state.posts.map(post => {
      return (
        <div>
          <p><strong>{this.props.first_name + ' ' + this.props.last_name + ': '}</strong>
          {post.content}</p>
        </div>
      );
    });

    return (<div>{rendered_posts}</div>);
  }
}

const mapStateToProps = state => {
  return {
    username: state.auth.username,
    first_name: state.auth.first_name,
    last_name: state.auth.last_name
  };
}

export default connect(mapStateToProps)(PostList);
