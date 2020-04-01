class Stage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tickets: [],
      newTicketFormIsToBeShown: false,
      ticketUpdates: 0
    };
  }

  componentDidMount() {
    this.getTickets();
    this.interval = setInterval(() => {
      if(this.state.ticketUpdates < this.props.ticketUpdates) {
        this.setState({
          ticketUpdates: this.state.ticketUpdates + 1
        });
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onSubmit(e) {
    e.preventDefault();
    this.submitTicket(this.ticketName.value);
    this.clearInputElement();
  }

  clearInputElement() {
    this.ticketName.value = '';
  }
  
  submitTicket(ticketName) {
    const formData = {
      name: ticketName
    };
    this.submitTicketToAPI(formData);
  }

  buildURL() {
    //const root = 'http://localhost:3000';
    const root = 'https://todo-tracker-andy-strube.herokuapp.com';
    return root + '/projects/' + this.props.project_id + '/stages/' + this.props.stage_id + '/tickets';
  }

  submitTicketToAPI(formData) {
    axios.post(this.buildURL(), formData)
    .then(() => this.getTickets())
    .catch((err) => console.log(err.response.data));
  }

  getTickets() {
    axios.get(this.buildURL())
    .then((res) => this.setTicketsInState(res.data))
    .catch((err) => console.log(err.response.data));
  }

  setTicketsInState(res) {
    this.setState({
      tickets: this.buildTickets(res)
    });
  }

  buildTickets(res) {
    return res.map((ticket) => {
      return <div onClick={() => this.props.selectTicket(ticket)}>
        {ticket.name}
      </div>;
    });
  }

  buildTicketForm() {
    return <form onSubmit={(e) => this.onSubmit(e)}>
      <input type='text' placeholder='Ticket Name' ref={(input) => this.ticketName = input}/>
      <input type="submit" value="Add ticket" className="stage-button btn btn-primary make-it-green"/>
    </form>
  }

  handleTicketForm() {
    if(this.state.newTicketFormIsToBeShown) {
      return this.buildTicketForm();
    }
  }

  invertNewTicketFormShowStatus() {
    this.setState({
      newTicketFormIsToBeShown: !this.state.newTicketFormIsToBeShown
    });
  }

  setShowOrHideButtonCharacterForNewTicketForm() {
    if(this.state.newTicketFormIsToBeShown) {
      return "−";
    }
    return "+";
  }

  handleTicketFormShowOrHideButton() {
    if(this.props.current_user) {
      return <span onClick={() => this.invertNewTicketFormShowStatus()}>
        <span className="make-it-green ticket-form-status-button">
          {this.setShowOrHideButtonCharacterForNewTicketForm()}
        </span>
      </span>
    }
  }

  addTicketToState(selectedTicket) {
    this.state.tickets.push(
      <div onClick={() => this.props.selectTicket(selectedTicket)}>
        {selectedTicket.name}
      </div>
    );
  }

  handleTicketTransfer(selectedTicket) {
    if(selectedTicket) {
      this.addTicketToState(selectedTicket);
      this.submitTicketToAPI(
        {name: selectedTicket.name}
      );
      this.props.unselectTicket();
    }
  }

  buildStageWithTickets() {
    return(
      <span className="stage-box" onClick={() => this.handleTicketTransfer(this.props.selectedTicket)}>
        <br/>
        <div>
          {this.state.tickets.map((ticket) => {
            return ticket;
          })}
        </div>
      </span>
    );
  }

  handleTicketListRefresh() {
    if(this.props.ticketUpdates > this.state.ticketUpdates) {
      this.getTickets();
    }
  }

  render() {
    return <span>
      <div className="stage-info">
        <h3 className="make-it-green">
          {this.props.stageName}{" "}
          {this.handleTicketFormShowOrHideButton()}
        </h3>
        {this.handleTicketForm()}
      </div>
      {this.buildStageWithTickets()}
      {this.handleTicketListRefresh()}
      <br/>
    </span>
  }
}
