var ContinentsData = React.createClass({
	getInitialState: function(){
		return {
			country: '',
			region: '',
			mineral: ''
		};
	},

	componentDidMount: function(){
		this.serverRequest = $.get("http://localhost:3000/continents", function(result){
			debugger;
			console.dir('here is result ' + result);
			this.setState({
				country: result.country,
				region: result.region,
				mineral: result.mineral
			});
		}.bind(this));
	},

	componentWillUnmount: function(){
		this.serverRequest.abort();
	},


	render: function(){
		return (
				<ul>
					<h3>Continents:</h3>
					<li>{this.state.country}</li>
					<li>{this.state.region}</li>
					<li>{this.state.mineral}</li>
				</ul>
		)
	}
});

ReactDOM.render(<ContinentsData />, document.getElementById('example'));
