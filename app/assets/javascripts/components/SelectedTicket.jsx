class SelectedTicket extends React.Component {
  render() {
    if(this.props.current_user) {
      if(this.props.ticket) {
        return <h3 className='make-it-green'>
          Selected Ticket:{" "}{this.props.ticket.name}
        </h3>
      } else {
        return <h3 className="make-it-green">
          No Selected Tickets
        </h3>
      }
    } else {
      return <div></div>
    }
  }
}
