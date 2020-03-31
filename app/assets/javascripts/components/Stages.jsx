class Stages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stages: [],
      selectedTicket: null
    }
    this.selectTicket = this.selectTicket.bind(this);
    this.unselectTicket = this.unselectTicket.bind(this);
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
    //const root = 'http://localhost:3000';
    const root = 'https://todo-tracker-andy-strube.herokuapp.com';
    return root + '/projects/' + this.props.project_id + '/stages';
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

  removeOldTicket(ticket) {
    //axios.delete('http://localhost:3000/tickets/' + ticket.id)
    axios.delete('https://todo-tracker-andy-strube.herokuapp.com/tickets/' + ticket.id)
    .catch((err) => console.log(err.response.data));
  }

  lookForOldTicket(tickets, selectedTicket) {
    tickets.forEach((ticket) => {
      if(ticket.name === selectedTicket.name) {
        if(ticket.id === selectedTicket.id) {
          this.removeOldTicket(ticket);
        }
      }
    });
  }

  handleOldTicket(selectedTicket) {
    //axios.get('http://localhost:3000/projects/' + this.props.project_id + '/edit')
    axios.get('https://todo-tracker-andy-strube.herokuapp.com/projects/' + this.props.project_id + '/edit')
    .then((res) => this.lookForOldTicket(res.data, selectedTicket))
    .catch((err) => console.log(err.response.data));
  }

  unselectTicket() {
    this.handleOldTicket(this.state.selectedTicket);
    this.setState({
      selectedTicket: null
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
          unselectTicket={this.unselectTicket}
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
