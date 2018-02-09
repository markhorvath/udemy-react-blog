import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../actions';


class PostsIndex extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  renderPosts() {
    return _.map(this.props.posts, post => {
      return (
        <li className="list-group-item" key={post.id}>
          {post.title}
        </li>
      )
    });
  }

  render() {
    return (
      // When you click on a Link tag it has a couple of event handers on it that prevent
      // the browser from doing what it normally does, which is to navigate or issue another
      // http request to fetch another html document from the server
      <div>
        <div className="text-xs-right">
          <Link className="btn btn-primary" to="/posts/new">
            Add a Post
          </Link>
        </div>
        <h3>Posts</h3>
        <ul className="list-group">
          {this.renderPosts()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { posts: state.posts };
}

// Would be { fetchPosts: fetchPosts } in old JS but ES6 allows for the below way
export default connect(mapStateToProps, { fetchPosts })(PostsIndex);