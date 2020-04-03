class Ticket extends React.Component {
  render() {
    return <div onClick={() => this.props.selectTicket(this.props.ticket)}>
      {this.props.ticket.description}
    </div>
  }
}
