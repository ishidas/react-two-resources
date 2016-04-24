var UserInfo = React.createClass({
	getInitialState: function(){
		return {
			login: '',
			avatart_url: '',
			comments: ''
		};
	},

	componentDidMount: function(){
		this.serverRequest = $.get("https://api.github.com/users/ishidas", function(result){
			debugger;
			console.dir('here is result ' + result);
			this.setState({
				login: result.login,
				avatart_url: result.avatar_url
			});
		}.bind(this));
	},

	componentWillUnmount: function(){
		this.serverRequest.abort();
	},

	render: function(){
		return (
			<div>
				{this.state.login} is my login name.
				
				Here is my image: 
				<img src={' this.state.avatar_url '} width="100px" height="100px"/>
			</div>
		);
	}
});

ReactDOM.render(<UserInfo />, document.getElementById('example'));
