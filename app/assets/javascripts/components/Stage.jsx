class Stage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tickets: []
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

  render() {
    return <span>
      <span className="stage-box">
        {this.props.stageName}
        {this.buildTicketForm()}
        <br/>
        {this.state.tickets.map((ticket) => {
          return <div>
            <br/><br/><br/><br/>
            {ticket}
          </div>
        })}
      </span>
    </span>
  }
}
