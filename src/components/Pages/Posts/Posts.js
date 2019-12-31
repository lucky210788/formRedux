import React, {Component} from 'react';
import Header from '../../Header/Header';
import PostsService from '../../../services/postsService';
import Loader from '../../UI/Loader/Loader';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {loadPosts} from '../../../actions/actionCreator';

import './Posts.scss';

class Posts extends Component {
  postsService = new PostsService();

  componentDidMount() {
    this.postsService.getPosts()
      .then((res) => this.updateState(res))
      .catch((error) => console.log(error));
  };

  updateState = (data) => {
    const {loadPosts} = this.props;
    window.setTimeout(() => {
      loadPosts(data)
    }, 2000);
  };

  render() {
    const {postsList, isLoading, onLogOut} = this.props;

    const posts = postsList.map((item) => {
      const {id, title, body} = item;

      return (
        <li key={id} className="post">
          <p className="post-title">{title}</p>
          <p className="post-text">{body}</p>
        </li>
      )
    });

    return (
      <section>
        <Header onLogOut={onLogOut}/>
        <div className="container">
          {isLoading ? <Loader/> : <ul> {posts} </ul>}
        </div>
      </section>
    );
  }
}

function mapStateToProps({postsList: {tasks, isLoading}}) {
  return {
    postsList: tasks,
    isLoading
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    loadPosts
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);