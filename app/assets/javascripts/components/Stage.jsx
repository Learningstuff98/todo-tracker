class Stage extends React.Component {

  renderTickets(tickets, stage) {
    return <div>
      {tickets.map((ticket) => {
          if(ticket.stage_id === stage.id) {
            return <div key={ticket.id}>
              <Ticket
                ticket={ticket}
                selectTicket={this.props.selectTicket}
                selectedTicket={this.props.selectedTicket}
                setRoot={this.props.setRoot}
                project_id={this.props.project_id}
                unselectTicket={this.props.unselectTicket}
              />
            </div>
          }
      })}
    </div>
  }

  deleteStage() {
    axios.delete(this.props.setRoot() + '/projects/' + this.props.project_id + '/stages/' + this.props.stage.id)
    .catch((err) => console.log(err.response.data));
  }

  renderDeleteButton() {
    return <h5 className="make-it-green stage-delete cursor" onClick={() => this.deleteStage()}>
      Delete
    </h5>
  }

  renderStageName() {
    return <div className="stage-name">
      {this.props.stage.name}
    </div>
  }

  render() {
    return <div>
      <h3 className="make-it-green">
        <div>
          {this.renderStageName()}
        </div>
        <div>
          {this.renderDeleteButton()}
        </div>
      </h3>
      <div className="stage-box">
        {this.renderTickets(this.props.tickets, this.props.stage)}
      </div>
    </div>
  }
}
