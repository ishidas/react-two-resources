var ContinentsData = React.createClass({
	getInitialState: function(){
		return {
			country: '',
			region: '',
			mineral: ''
		};
	},

	componentDidMount: function(){
		this.serverRequest = $.ajax({
			method: 'GET',
			url: 'http://localhost:3000/continents',
			cache: false
		}).then(function(result){
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

	post: function(e){
		e.preventDefault();
		debugger;
		var valId = this.refs.newId.value;
		var valCountry = this.refs.newCountry.value;
		var valRegion = this.refs.newRegion.value;
		var valMineral = this.refs.newMineral.value;
		// this.serverRequest = $ajax({
		// 	method: 'POST',
		// 	url: 'http://localhost:3000/continents'
		// 	data: {
		// 	}
		// }).done(function(data){
		// 	console.log('Here is data : ' + data);
		// });
		console.log('ID : ' + valId);
		console.log('COUNTRY : ' + valCountry);
		console.log('REGION : ' + valRegion);
		console.log('MINERAL : ' + valMineral);
		return;
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
					<li>ID: {this.state.id}</li>
					<textarea type="text" ref="newId" class="form-control"></textarea>
					<li>Country: {this.state.country}</li>
					<textarea type="text" ref="newCountry" class="form-control"></textarea>
					<li>Region: {this.state.region}</li>
					<textarea type="text" ref="newRegion" class="form-control"></textarea>
					<li>Mineral: {this.state.mineral}</li>
					<textarea type="text" ref="newMineral" class="form-control"></textarea>
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
