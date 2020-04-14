class Ticket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      yesNoMessageIsToBeShown: false
    };
  }
  
  setColor(selectedTicket) {
    if(selectedTicket) {
      return 'make-it-green';
    }
    return '';
  }

  setHeader(selectedTicket) {
    if(selectedTicket) {
      return "This ticket is selected";
    }
    return this.props.ticket.username;
  }

  renderDeleteButton() {
    return <div>
      Delete
    </div>
  }

  invertDeleteYesNoMessageStatus() {
    this.setState({
      yesNoMessageIsToBeShown: !this.state.yesNoMessageIsToBeShown
    });
  }

  buildTicket(selectedTicket) {
    return <div className={this.setColor(selectedTicket)}>
      <div className="ticket-info cursor">
        {this.setHeader(selectedTicket)}
      </div>
      <div onClick={() => this.invertDeleteYesNoMessageStatus()} className="ticket-info cursor">
        {this.renderDeleteButton()}
      </div>
      {this.handleTicketBody()}
    </div>
  }

  deleteTicket() {
    axios.delete(this.props.setRoot() + '/projects/' + this.props.project_id + '/tickets/' + this.props.ticket.id)
    .catch((err) => console.log(err.response.data));
  }

  handleTicketBody() {
    if(this.state.yesNoMessageIsToBeShown) {
      return <div className="ticket cursor">
        <span className="btn btn-primary delete-yes-no-buttons" onClick={() => this.deleteTicket()}>YES{" "}?</span>{" "}
        <span className="btn btn-primary delete-yes-no-buttons" onClick={() => this.invertDeleteYesNoMessageStatus()}>NO</span>
      </div>
    } else {
      return <div className="ticket cursor">
        {this.props.ticket.description}
      </div>
    }
  }

  render() {
    if(this.props.selectedTicket) {
      if(this.props.ticket.description === this.props.selectedTicket.description) {
        return <div>
          {this.buildTicket(this.props.selectedTicket)}
        </div>
      } else {
        return <div>
          {this.buildTicket()}
        </div>
      }
    } else {
      return <div onClick={() => this.props.selectTicket(this.props.ticket)}>
        {this.buildTicket()}
      </div>
    }
  }
}
