import React, {Component} from 'react';
import Navigation from './components/Navigation';
import AddPostForm from './components/AddPostForm';
import PostList from './components/PostList';
import './css/dashboard.css';

class Dashboard extends Component {
  render() {
    return (
      <div className="row" id="container">
        <div className="col-md-4" id="sidebar">
          <div id="sidebarinner">
            <div id="profpiccontainer">
              <div id="profpic">
                <img src="https://scontent.flhr2-2.fna.fbcdn.net/v/t1.0-9/14721560_1191601734241182_1338236778558119818_n.jpg?_nc_cat=104&_nc_ht=scontent.flhr2-2.fna&oh=5b0a6f3f20b223e9f1c87ffb29949c22&oe=5D4067C9" />
              </div>
              <div id="nameandusername">
                <h2>Cian Collier</h2>
                <h3>@ciancollier</h3>
              </div>
            </div>
            <hr />
            Hello this is a test of an 140 character bio. I hope it works and looks ok. If not I will have to make another one. I think this is about right.
          </div>
        </div>
        <div className="col-md-8" id="content">
          <div id="contentinner">
            <AddPostForm /><br />
            <PostList />
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
