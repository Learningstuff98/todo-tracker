class Stage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tickets: [],
      newTicketFormIsToBeShown: false
    };
  }

  componentDidMount() {
    this.getTickets();
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

  submitTicketToAPI(formData) {
    //axios.post('http://localhost:3000/projects/' + this.props.project_id + '/stages/' + this.props.stage_id + '/tickets', formData)
    axios.post('https://todo-tracker-andy-strube.herokuapp.com/projects/' + this.props.project_id + '/stages/' + this.props.stage_id + '/tickets', formData)
    .then(() => this.getTickets())
    .catch((err) => console.log(err.response.data));
  }

  getTickets() {
    //axios.get('http://localhost:3000/projects/' + this.props.project_id + '/stages/' + this.props.stage_id + '/tickets')
    axios.get('https://todo-tracker-andy-strube.herokuapp.com/projects/' + this.props.project_id + '/stages/' + this.props.stage_id + '/tickets')
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
      return(
        <div>
          {ticket.name}
        </div>
      );
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

  invertNewTicketFormStatus() {
    this.setState({
      newTicketFormIsToBeShown: !this.state.newTicketFormIsToBeShown
    });
  }

  setNewTicketFormStatusButtonIcon() {
    if(this.state.newTicketFormIsToBeShown) {
      return " - ";
    }
    return " + ";
  }

  render() {
    return <span>
      <div className="stage-info">
        <h3 className="make-it-green">
          {this.props.stageName}{" "}
          <span onClick={() => this.invertNewTicketFormStatus()}>
            <span className="make-it-green ticket-form-status-button">
              {this.setNewTicketFormStatusButtonIcon()}
            </span>
          </span>
        </h3>
        {this.handleTicketForm()}
      </div>
      <span className="stage-box">
        <br/>
        <div>
          {this.state.tickets.map((ticket) => {
            return <div>{ticket}</div>
          })}
        </div>
      </span>
    </span>
  }
}
