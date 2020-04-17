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
    this.unselectTicket = this.unselectTicket.bind(this);
  }

  componentDidMount() {
    this.getTickets();
    this.getStages();
    this.handleWebsocketUpdates(this);
  }

  handleWebsocketUpdates(stagesComponent) {
    App.projects = App.cable.subscriptions.create('ProjectsChannel', {
      received(data) {
        if(data.project_id === stagesComponent.props.project_id) {
          if(data.update_is_needed === 'for_stages') {
            stagesComponent.getStages();
          }
          if(data.update_is_needed === 'for_tickets') {
            stagesComponent.getTickets();
          }
        }
      }
    });
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
    .then((res) => this.handleIncomingStages(res.data))
    .catch((err) => console.log(err.response.data));
  }

  handleIncomingStages(stages) {
    if(stages.length > 0) {
      this.setState({ stages, firstStageId: stages[0].id })
    } else {
      this.setState({
        stages: []
      });
    }
  }

  selectTicket(ticket) {
    if(this.props.is_contributor) {
      this.setState({ selectedTicket: ticket });
    }
  }

  unselectTicket() {
    this.setState({ selectedTicket: null });
  }

  moveTicket(stageId) {
    if(stageId && this.state.selectedTicket) {
      axios.patch(this.setRoot() + '/projects/' + this.props.project_id + '/tickets/' + this.state.selectedTicket.id, {
        stage_id: stageId
      })
      .then(() => this.unselectTicket())
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
            setRoot={this.setRoot}
            project_id={this.props.project_id}
            unselectTicket={this.unselectTicket}
            is_contributor={this.props.is_contributor}
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
      is_contributor={this.props.is_contributor}
    />
  }

  renderTicketForm(firstStageId) {
    return <TicketForm
      current_user={this.props.current_user}
      setRoot={this.setRoot}
      project_id={this.props.project_id}
      firstStageId={firstStageId}
      getTickets={this.getTickets}
      is_contributor={this.props.is_contributor}
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
