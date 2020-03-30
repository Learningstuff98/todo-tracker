class SelectedTicket extends React.Component {
  render() {
    if(this.props.selectedTicket) {
      return <h4 className="make-it-green">
        Selected Ticket:{" "} 
        {this.props.selectedTicket.name}
      </h4>
    } else {
      return <div></div>
    }
  }  
}
