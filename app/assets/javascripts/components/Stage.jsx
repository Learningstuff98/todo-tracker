class Stage extends React.Component {

  renderTickets() {
    return <div className="stage-box">
      {this.props.tickets.map((ticket) => {
        return <div>
          {ticket.name}{" "}{ticket.stage_id}
          <br/>
        </div>
      })}
    </div>
  }

  render() {
    return <div>
      <h3 className="make-it-green">
        <div className="stage-title">
          {this.props.stageName}{" "}{this.props.stageId}
        </div>
        {this.renderTickets()}
      </h3>
    </div>
  }
}
