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

	componentWillUnmount: function(){
		this.serverRequest.abort();
	},

	render: function(){
		console.log('State Array ' + JSON.stringify(this.props.data));
		 var stationComponents = this.state.data.map(function(cont){
			return <li className='ContinentsData' key={cont._id}>{cont._id}
				<p key={cont.country}>Country : {cont.country}</p>
				<p key={cont.region}>Region: {cont.region}</p>
				<p key={cont.mineral}>Mineral: {cont.mineral}</p>
			</li>
		});
			return <div>{stationComponents}
							<ContinentsDataPost />
							<ContinentsPut />
							</div>
	}
});//end of continents data get all class

var ContinentsDataPost = React.createClass({
	getCountryForm: function(e){
		this.setState({country: e.target.value})
	},
	getRegionForm: function(e){
		this.setState({region: e.target.value})
	},
	getMineralForm: function(e){
		this.setState({mineral: e.target.value})
	},
	post: function(e){
		var self = this;
		e.preventDefault();
		var valCountry = this.state.country;
		var valRegion = this.state.region;
		var valMineral = this.state.mineral;
		console.log('COUNTRY : ' + valCountry);
		console.log('REGION : ' + valRegion);
		console.log('MINERAL : ' + valMineral);
		var test = this.state
		console.dir('State : ' + JSON.stringify(this.state));

		this.serverRequest = $.ajax({
			type: 'POST',
			url: 'http://localhost:3000/continents',
			cache: false,
			dataType: 'json',
			data: test,
			success: function(xmlRequestObj, successString){
				console.dir('Here is successString : ' + JSON.stringify(successString));
				console.dir('Here is xmlRequestObj : ' + JSON.stringify(xmlRequestObj));
			},
			error: function(xhr, textStatus, error){

			}.bind(this)
		});
	},

	render: function(){
		console.log('State2 : ' +JSON.stringify(this.state));
		return (
			<form className="ContinentsData">
					<h3>Continents:</h3>
					<textarea placeholder="country" onChange={this.getCountryForm} ref="newCountry"></textarea>
					<textarea placeholder="region" onChange={this.getRegionForm} ref="newRegion"></textarea>
					<textarea placeholder="mineral" onChange={this.getMineralForm} ref="newMineral"></textarea>
					<button onClick={this.post} type="submit" class="btn btn-primary">POST</button>
			</form>
		)
	}
});

var ContinentsPut = React.createClass({
	getIdToDelete: function(e){
		this.setState({id: e.target.value})
	},

	delete: function(e) {
		var self = this;
		e.preventDefault();
		var deleteid = this.refs.newId.value;
		console.log('ID : ' + deleteid);

		this.serverRequest = $.ajax({
			type: 'DELETE',
			url: 'http://localhost:3000/continents/' + deleteid,
			cache: false,
			dataType: 'json',
			data: {_id: deleteid },
			success: function(xmlRequestObj, successString){
				console.dir('Here is successString : ' + JSON.stringify(successString));
				console.dir('Here is xmlRequestObj : ' + JSON.stringify(xmlRequestObj));
			},
			error: function(xhr, textStatus, error){
				console.log('Delete Request error : ' + err);
			}.bind(this)
		});
	},

	render: function(){
		console.log('State2 : ' +JSON.stringify(this.state));
		return (
				<form className="ContinentsPut">
					<textarea placeholder="id" ref="newId"></textarea>
					<button onClick={this.delete} type="button" class="btn btn-warning">EDIT</button>
				</form>
				)
	}
});

ReactDOM.render(
							<section>
								<ContinentsData url='http://localhost:3000/continents' pollInterval={2000}/>
							</section>

	, document.getElementById('example'));
