class Stages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stages: [],
      tickets: [],
      firstStageId: null,
      selectedTicket: null
    }
  }

  componentDidMount() {
    this.getTickets();
    this.getStages();
  }

  setRoot() {
    //return 'http://localhost:3000';
    return 'https://todo-tracker-andy-strube.herokuapp.com';
  }

  getTickets() {
    axios.get(this.setRoot() + '/projects/' + this.props.project_id + '/tickets')
    .then((res) => this.setState({ tickets: res.data }))
    .catch((err) => console.log(err.response.data));
  }

  getStages() {
    axios.get(this.setRoot() + '/projects/' + this.props.project_id + '/stages')
    .then((res) => this.setState({ 
      stages: res.data,
      firstStageId: res.data[0].id
    }))
    .catch((err) => console.log(err.response.data));
  }

  selectTicket(ticket) {
    if(this.props.current_user) {
      this.setState({
        selectedTicket: ticket
      });
    }
  }

  moveTicket(stageId) {
    if(stageId && this.state.selectedTicket) {
      axios.patch(this.setRoot() + '/projects/' + this.props.project_id + '/stages/' + this.state.selectedTicket.stage_id + '/tickets/' + this.state.selectedTicket.id, {
        stage_id: stageId
      })
      .then(() => this.handleMoveTicketResults())
      .catch((err) => console.log(err.response.data));
    }
  }

  handleMoveTicketResults() {
    this.setState({
      selectedTicket: null
    });
    this.getTickets();
  }

  renderTickets(tickets, stage) {
    return <div>
      {tickets.map((ticket) => {
        if(ticket.stage_id === stage.id) {
          return <div key={ticket.id} onClick={() => this.selectTicket(ticket)}>
            {ticket.name}
          </div>
        }
      })}
    </div>
  }

  renderStages(stages, tickets) {
    return <span className="stages">
      {stages.map((stage) => {
        return <div key={stage.id}>
          <h3 className="make-it-green">
            <div className="stage-name">
              {stage.name}
            </div>
          </h3>
          <div className="stage-box" onClick={() => this.moveTicket(stage.id)}>
            {this.renderTickets(tickets, stage)}
          </div>
        </div>
      })}
    </span>
  }

  clearStageInputElement() {
    this.stageName.value = '';
  }

  onSubmitForStage(e) {
    e.preventDefault();
    this.submitStage({
      name: this.stageName.value
    });
    this.clearStageInputElement();
  }

  submitStage(formData) {
    axios.post(this.setRoot() + '/projects/' + this.props.project_id + '/stages', formData)
    .then(() => this.getStages())
    .catch((err) => console.log(err.response.data));
  }

  buildStageForm() {
    if(this.props.current_user) {
      return <form onSubmit={(e) => this.onSubmitForStage(e)}>
        <input type='text' placeholder='Stage Name' ref={(input) => this.stageName = input}/>
        <input type="submit" value="Add stage" className="stage-button btn btn-primary make-it-green"/>
        <br/><br/>
      </form>
    }
  }

  onSubmitForTicket(e) {
    e.preventDefault();
    this.submitTicket({
      name: this.ticketName.value,
      project_id: this.props.project_id,
      stage_id: this.state.firstStageId
    });
    this.clearTicketInputElement();
  }

  submitTicket(formData) {
    axios.post(this.setRoot() + '/projects/' + this.props.project_id + '/stages/' + this.state.firstStageId + '/tickets', formData)
    .then(() => this.getTickets())
    .catch((err) => console.log(err.response.data));
  }

  clearTicketInputElement() {
    this.ticketName.value = '';
  }

  buildTicketForm() {
    if(this.props.current_user) {
      return <form onSubmit={(e) => this.onSubmitForTicket(e)}>
        <input type='text' placeholder='Ticket Name' ref={(input) => this.ticketName = input}/>
        <input type="submit" value="Add ticket" className="stage-button btn btn-primary make-it-green"/>
      </form>
    }
  }

  renderSelectedTicket(ticket) {
    return <SelectedTicket
      ticket={ticket}
      current_user={this.props.current_user}
    />
  }

  render() {
    return <div>
      {this.buildStageForm()}
      {this.buildTicketForm()}
      <br/>
      {this.renderSelectedTicket(this.state.selectedTicket)}
      <br/><br/>
      {this.renderStages(
        this.state.stages, 
        this.state.tickets
      )}
    </div>
  }
}
