class Ticket extends React.Component {

  buildUnselectedTicket() {
    return <div onClick={() => this.props.selectTicket(this.props.ticket)}>
      <div className="ticket-username cursor">
        {this.props.ticket.username}
      </div>
      <div className="ticket cursor">
        <div>
          {this.props.ticket.description}
        </div>
      </div>
    </div>
  }

  buildSelectedTicket() {
    return <div>
      <div className="ticket-username cursor make-it-green">
        This ticket is selected
      </div>
      <div className="ticket cursor make-it-green">
        <div>
          {this.props.ticket.description}
        </div>
      </div>
    </div>
  }

  render() {
    if(this.props.selectedTicket) {
      if(this.props.ticket.description === this.props.selectedTicket.description) {
        return <div>
          {this.buildSelectedTicket()}
        </div>
      } else {
        return <div>
          {this.buildUnselectedTicket()}
        </div>
      }
    } else {
      return <div>
        {this.buildUnselectedTicket()}
      </div>
    }
  }
}
