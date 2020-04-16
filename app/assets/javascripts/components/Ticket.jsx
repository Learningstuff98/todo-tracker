class Ticket extends React.Component {
  
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

  deleteTicket() {
    axios.delete(this.props.setRoot() + '/projects/' + this.props.project_id + '/tickets/' + this.props.ticket.id)
    .then(() => this.props.unselectTicket())
    .catch((err) => console.log(err.response.data));
  }

  renderDeleteButton() {
    if(this.props.is_contributor) {
      return <div onClick={() => this.deleteTicket()} className="make-it-green">
        Delete
      </div>
    }
  }

  renderTicketBody(ticketDescription) {
    return <div className="ticket cursor">
      {ticketDescription}
    </div>
  }

  buildTicket(selectedTicket) {
    return <div className={this.setColor(selectedTicket)}>
      <div className="ticket-info cursor">
        {this.setHeader(selectedTicket)}
      </div>
      <div className="ticket-info cursor">
        {this.renderDeleteButton()}
      </div>
      <div>
        {this.renderTicketBody(this.props.ticket.description)}
      </div>
    </div>
  }

  render() {
    if(this.props.selectedTicket) {
      if(this.props.ticket.id === this.props.selectedTicket.id) {
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
