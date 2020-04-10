class Stages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stages: [],
      tickets: [],
      firstStageId: null,
      selectedTicket: null
    }
    this.getStages = this.getStages.bind(this);
    this.getTickets = this.getTickets.bind(this);
    this.selectTicket = this.selectTicket.bind(this);
  }

  componentDidMount() {
    this.getTickets();
    this.getStages();
    this.handleWebsocketUpdates(this);
  }

  handleWebsocketUpdates(component) {
    App.projects = App.cable.subscriptions.create('ProjectsChannel', {
      received(data) {
        if(data.project_id === component.props.project_id) {
          if(data.update_is_needed === 'for_stages') {
            component.getStages();
          }
          if(data.update_is_needed === 'for_tickets') {
            component.getTickets();
          }
        }
      }
    });
  }

  setRoot() {
    return 'http://localhost:3000';
    //return 'https://todo-tracker-andy-strube.herokuapp.com';
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
      .then(() => this.setState({ selectedTicket: null }))
      .catch((err) => console.log(err.response.data));
    }
  }

  renderStages(stages, tickets, ticket) {
    const stagesId = 'stages' + this.props.project_id;
    return <span className="stages" id={stagesId}>
      {stages.map((stage) => {
        return <div key={stage.id} onClick={() => this.moveTicket(stage.id)}>
          <Stage
            stage={stage}
            tickets={tickets}
            selectTicket={this.selectTicket}
            selectedTicket={ticket}
          />
        </div>
      })}
    </span>
  }

  renderStageForm() {
    return <StageForm
      current_user={this.props.current_user}
      setRoot={this.setRoot}
      project_id={this.props.project_id}
      getStages={this.getStages}
    />
  }

  renderTicketForm(firstStageId) {
    return <TicketForm
      current_user={this.props.current_user}
      setRoot={this.setRoot}
      project_id={this.props.project_id}
      firstStageId={firstStageId}
      getTickets={this.getTickets}
    />
  }

  render() {
    return <div>
      {this.renderStageForm()}
      {this.renderTicketForm(this.state.firstStageId)}
      <br/>
      <br/><br/>
      {this.renderStages(
        this.state.stages, 
        this.state.tickets,
        this.state.selectedTicket
      )}
    </div>
  }
}
