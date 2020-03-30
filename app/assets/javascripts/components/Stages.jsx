class Stages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stages: [],
      selectedTicket: null
    }
    this.selectTicket = this.selectTicket.bind(this);
  }

  componentDidMount() {
    this.getStages();
  }

  onSubmit(e) {
    e.preventDefault();
    this.submitStage(this.stageName.value);
    this.clearInputElement();
  }

  clearInputElement() {
    this.stageName.value = '';
  }

  submitStage(stageName) {
    const formData = {
      name: stageName
    };
    this.submitStageToAPI(formData);
  }

  buildURL() {
    //const rootURL = 'http://localhost:3000';
    const rootURL = 'https://todo-tracker-andy-strube.herokuapp.com';
    return rootURL + '/projects/' + this.props.project_id + '/stages';
  }

  submitStageToAPI(formData) {
    axios.post(this.buildURL(), formData)
    .then(() => this.getStages())
    .catch((err) => console.log(err.response.data));
  }

  getStages() {
    axios.get(this.buildURL())
    .then((res) => this.setStagesInState(res.data))
    .catch((err) => console.log(err.response.data));
  }

  setStagesInState(res) {
    this.setState({
      stages: this.buildStages(res)
    });
  }

  selectTicket(ticket) {
    this.setState({
      selectedTicket: ticket
    });
    this.getStages();
  }

  buildStages(res) {
    return res.map((stage) => {
      return(
        <Stage
          stageName={stage.name}
          project_id={this.props.project_id}
          stage_id={stage.id}
          current_user={this.props.current_user}
          selectTicket={this.selectTicket}
          selectedTicket={this.state.selectedTicket}
        />
      );
    });
  }

  buildStageForm() {
    if(this.props.current_user) {
      return <form onSubmit={(e) => this.onSubmit(e)}>
        <input type='text' placeholder='Stage Name' ref={(input) => this.stageName = input}/>
        <input type="submit" value="Add stage" className="stage-button btn btn-primary make-it-green"/>
      </form>
    }
  }

  renderStages() {
    return(
      <span className="stages">
        {this.state.stages.map((stage) => {
          return stage;
        })}
      </span>
    );
  }

  renderSelectedTicket(selectedTicket) {
    return(
      <SelectedTicket
        selectedTicket={selectedTicket}
      />
    );
  }

  render() {
    return(
      <div>
        <br/>
        {this.buildStageForm()}
        <br/>
        {this.renderStages()}
        <br/>
        {this.renderSelectedTicket(this.state.selectedTicket)}
      </div>
    );
  }
}
