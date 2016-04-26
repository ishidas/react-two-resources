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
				<p key={cont.country}>Country : {cont.country}</p>
				<p key={cont.region}>Region: {cont.region}</p>
				<p key={cont.mineral}>Mineral: {cont.mineral}</p>
			</li>
		});
			return <div>{stationComponents}
							<ContinentsDataPost />
							<ContinentsDelete />
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

var ContinentsDelete = React.createClass({

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
					<button onClick={this.delete} type="button" class="btn btn-warning">DELETE</button>
				</form>
				)
	}
});

var ContinentsPut = React.createClass({
	getInitialState: function(){
		return {
				data:[]
			}
	},
	getById: function(e){
		var self = this;
		e.preventDefault();
		var idRef = this.refs.newIdEdit.value;
		this.serverRequest = $.ajax({
			type: 'GET',
			url: 'http://localhost:3000/continents/' + idRef,
			cache: false,
			dataType: 'json',
			data: {_id: idRef}
		}).then(function(result){
			console.dir('Here is result of getbyid : ' + JSON.stringify(result));
			this.replaceState({data: result});
		}.bind(this));
	},

	save: function(e){
		e.preventDefault()
		this.setState({
			country: this.refs.newCountry.value,
			region: this.refs.newRegion.value,
			mineral: this.refs.newMineral
		})
		console.log('Brand New : ' + this.state);
	},
	put: function(e){
		e.preventDefault();

		this.setState({
			country: this.refs.newCountry.value,
			region: this.refs.newRegion.value,
			mineral: this.refs.newMineral
		})
		// console.log('Brand New : ' + this.state);
		var idToPut = this.state.data._id;
		console.log('New State?? ' + JSON.stringify(this.state));
		this.serverRequest = $.ajax({
			type: 'PUT',
			url: 'http://localhost:3000/continents/' + idToPut,
			dataType: 'json',
			data: {_id: idToPut},
			success: function(xmlRequestObj, successString){
				console.dir('Here is successString : ' + JSON.stringify(successString));
				console.dir('Here is xmlRequestObj : ' + JSON.stringify(xmlRequestObj));
			},
			error: function(xhr, textStatus, error){
				console.log('Delete Request error : ' + error);
			}.bind(this)
		});

	},

	render: function(){
		console.log('Current State : ' + JSON.stringify(this.state))
		return (
			<form className="ContinentsPut">
			<textarea placeholder="id to edit" ref="newIdEdit"></textarea>
			<input value={this.state.data._id} ></input>
			<input onChange={this.forceUpdate} value={this.state.data.country} ref="newCountry"></input>
			<input onChange={this.forceUpdate} value={this.state.data.region} ref="newRegion"></input>
			<input onChange={this.forceUpdate} value={this.state.data.mineral} ref="newMineral"></input>
			<button onClick={this.getById} type="button" class="btn btn-primary">GET By ID</button>
			<button onClick={this.put} type="button" class="btn btn-warning">EDIT</button>
			</form>
		)
	}
});

ReactDOM.render(
							<section>
								<ContinentsData url='http://localhost:3000/continents' pollInterval={2000}/>
							</section>

	, document.getElementById('example'));

module.exports = ContinentsData;
module.exports = ContinentsDataPost;
module.exports = ContinentsPut;
module.exports = ContinentsDelete;
