var ContinentsData = React.createClass({
	getInitialState: function(){
		return {
			data: []
			}
	},
	componentDidMount: function(){
		this.serverRequest = $.ajax({
			method: 'GET',
			url: this.props.url,
			cache: false
		}).then(function(result){
			console.dir('here is result ' + JSON.stringify(result));
			this.setState({data: result});
		}.bind(this));
	},

	// componentWillUnmount: function(){
	// 	this.serverRequest.abort();
	// },

	render: function(){
		console.log('State Array ' + JSON.stringify(this.props.data));

		 var stationComponents = this.state.data.map(function(cont){
			return <li className='ContinentsData' key={cont._id}>{cont._id}
				<p key={cont.country}>{cont.country}</p>
				<p key={cont.region}>{cont.region}</p>
				<p key={cont.mineral}>{cont.mineral}</p>
			</li>
		});
			return <div>{stationComponents}</div>

	}

});//end of continents data get all class

var ContinentsDataSecond = React.createClass({
	getFormState: function(e){
		var self = this;
		e.preventDefault();
		debugger;
		var valId = e.target.value;
		var valCountry = e.target.value;
		var valRegion = e.target.value;
		var valMineral = e.target.value;
		console.log('ID : ' + valId);
		console.log('COUNTRY : ' + valCountry);
		console.log('REGION : ' + valRegion);
		console.log('MINERAL : ' + valMineral);
		this.setState({
				country: e.target.country.value,
				region: e.target.region.value,
				mineral: e.target.mineral.value
		});
		console.dir('State : ' + this.state.country);
	},

	post: function(e){
		var self = this;
		e.preventDefault();



			dispatch
			this.serverRequest = $.ajax({
				method: 'POST',
				url: 'http://localhost:3000/continents',
				data: {
					'country': JSON.stringify(this.refs.newCountry.value),
					'region': JSON.stringify(this.refs.newRegion.value),
					'mineral': JSON.stringify(this.refs.newMineral.value)
				},
				cache: false,
				dataType: 'json',
				success: function(xmlRequestObj, successString){
					console.dir('Here is successString : ' + JSON.stringify(successString));
					console.dir('Here is xmlRequestObj : ' + JSON.stringify(xmlRequestObj));
				}.bind(this)
			});

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
			<form className="ContinentsData" onSubmit={this.getFormState}>
				<ul>
					<h3>Continents:</h3>
					<li>ID: {this.state.id}</li>
					<textarea  value={this.state.id} ref="newId"></textarea>
					<li>Country: {this.state.country}</li>
					<textarea value={this.state.country} ref="newCountry"></textarea>
					<li>Region: {this.state.region}</li>
					<textarea value={this.state.region} ref="newRegion"></textarea>
					<li>Mineral: {this.state.mineral}</li>
					<textarea value={this.state.mineral} ref="newMineral"></textarea>
					<button type="button" class="btn btn-success">GET</button>
					<button type="submit" class="btn btn-primary">POST</button>
					<button onClick={this.edit} type="button" class="btn btn-warning">EDIT</button>
					<button type="button" class="btn btn-danger">DELETE</button>
				</ul>
			</form>
		)
	}
});
ReactDOM.render(
							<section>
								<ContinentsData url='http://localhost:3000/continents' pollInterval={2000}/>

							</section>

	, document.getElementById('example'));
