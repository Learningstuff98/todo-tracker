class TicketForm extends React.Component {

  submitTicket(formData) {
    axios.post(this.props.setRoot() + '/projects/' + this.props.project_id + '/stages/' + this.props.firstStageId + '/tickets', formData)
    .then(() => this.props.getTickets())
    .catch((err) => console.log(err.response.data));
  }

  onSubmitForTicket(e) {
    e.preventDefault();
    this.submitTicket({
      name: this.ticketName.value,
      project_id: this.props.project_id,
      stage_id: this.props.firstStageId
    });
    this.clearTicketInputElement();
  }

  clearTicketInputElement() {
    this.ticketName.value = '';
  }

  buildTicketForm() {
    if(this.props.current_user) {
      return <form onSubmit={(e) => this.onSubmitForTicket(e)}>
        <input type='text' placeholder='Ticket Name' ref={(input) => this.ticketName = input}/>
        <input type="submit" value="Add ticket" className="stage-button btn btn-primary make-it-green"/>
      </form>
    }
  }
  
  render() {
    return(
      <div>
        {this.buildTicketForm()}
      </div>
    );
  }
}
