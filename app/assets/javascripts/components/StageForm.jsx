class StageForm extends React.Component {

  submitStage(formData) {
    axios.post(this.props.setRoot() + '/projects/' + this.props.project_id + '/stages', formData)
    .catch((err) => console.log(err.response.data));
  }

  onSubmitForStage(e) {
    e.preventDefault();
    this.submitStage({
      name: this.stageName.value
    });
    this.clearStageInputElement();
  }

  clearStageInputElement() {
    this.stageName.value = '';
  }

  render() {
    if(this.props.is_contributor) {
      return <form onSubmit={(e) => this.onSubmitForStage(e)}>
        <input type='text' placeholder='Stage Name' ref={(input) => this.stageName = input}/>
        <input type="submit" value="Add stage" className="stage-button btn btn-primary make-it-green"/>
        <br/><br/>
      </form>
    } else {
      return <div></div>
    }
  }
}
