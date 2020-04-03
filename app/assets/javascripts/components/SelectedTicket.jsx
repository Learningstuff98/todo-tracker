class SelectedTicket extends React.Component {
  render() {
    if(this.props.ticketName) {
      return <h3 className='make-it-green'>
        Selected Ticket:{" "}{this.props.ticketName}
      </h3>
    } else {
      return <h3 className="make-it-green">
        No Selected Tickets
      </h3>
    }
  }
}
