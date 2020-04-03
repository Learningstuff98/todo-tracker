class Stage extends React.Component {

  renderTickets(tickets, stage) {
    return <div>
      {tickets.map((ticket) => {
          if(ticket.stage_id === stage.id) {
            return <div key={ticket.id} onClick={() => this.props.selectTicket(ticket)}>
              <Ticket
                ticket={ticket}
              />
            </div>
          }
      })}
    </div>
  }

  render() {
    return <div>
      <h3 className="make-it-green">
        <div className="stage-name">
          {this.props.stage.name}
        </div>
      </h3>
      <div className="stage-box">
        {this.renderTickets(this.props.tickets, this.props.stage)}
      </div>
    </div>
  }
}
