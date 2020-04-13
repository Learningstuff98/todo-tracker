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

  buildTicket(selectedTicket) {
    return <div className={this.setColor(selectedTicket)}>
      <div className="ticket-username cursor">
        {this.setHeader(selectedTicket)}
      </div>
      <div className="ticket cursor">
        {this.props.ticket.description}
      </div>
    </div>
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
