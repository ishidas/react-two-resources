const React = require('react');
const reactDOM = require('react-dom');

let myUserInfo = React.createClass({
  getInitialState: function () {
    return {
      login: '',
      avatar_url: ''
    };
  },

  componentDidMount: function () {
    this.serverRequest = $.get(this.props.source, function (result) {
      var userInfo = result.data;
      this.setState({
        login: userInfo.login,
        avatar_url: userInfo.owner.avatar_url
      });
    }.bind(this));
  },

  componentWillUnmount: function () {
    this.serverRequest.abort();
  },

  render: function () {
    return (
      <div>
        {this.state.login} is my login,
        {this.state.avatar_url} is avatar_url
      </div>
    );
  }
});

reactDOM.render(
  <myUserInfo source='https://api.github.com/users/ishidas' />,
  mountNode
);
