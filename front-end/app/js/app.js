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

	post: function(){
		// this.serverRequest = $ajax({
		// 	method: 'POST',
		// 	url: 'http://localhost:3000/continents'
		// 	data: {
		// 	}
		// }).done(function(data){
		// 	console.log('Here is data : ' + data);
		// });
		alert('post triggered!');
	},

	edit: function() {
		// this.serverRequest = $ajax({
		// 	method: 'PUT',
		// 	url: 'http://localhost:3000/continents/' + id
		// });
		alert('edit triggered!')
	},

	render: function(){
		return (
				<ul>
					<h3>Continents:</h3>
					<li>{this.state.country}</li>
					<li>{this.state.region}</li>
					<li>{this.state.mineral}</li>
					<button type="button" class="btn btn-success">GET</button>
					<button onClick={this.post} type="button" class="btn btn-primary">POST</button>
					<button onClick={this.edit} type="button" class="btn btn-warning">EDIT</button>
					<button type="button" class="btn btn-danger">DELETE</button>
				</ul>
		)
	}
});

ReactDOM.render(<ContinentsData />

	, document.getElementById('example'));
