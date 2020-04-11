class TicketForm extends React.Component {

  submitTicket(formData) {
    axios.post(this.props.setRoot() + '/projects/' + this.props.project_id + '/stages/' + this.props.firstStageId + '/tickets', formData)
    .catch((err) => console.log(err.response.data));
  }

  onSubmitForTicket(e) {
    e.preventDefault();
    this.submitTicket({
      description: this.ticketDescription.value,
      project_id: this.props.project_id,
      stage_id: this.props.firstStageId
    });
    this.clearTicketInputElement();
  }

  clearTicketInputElement() {
    this.ticketDescription.value = '';
  }

  render() {
    if(this.props.is_contributor) {
      return <form onSubmit={(e) => this.onSubmitForTicket(e)}>
        <input type='text' placeholder='Ticket Name' ref={(input) => this.ticketDescription = input}/>
        <input type="submit" value="Add ticket" className="stage-button btn btn-primary make-it-green"/>
      </form>
    } else {
      return <div></div>
    }
  }
}
