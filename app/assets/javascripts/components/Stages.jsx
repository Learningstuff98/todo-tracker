class Stages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stages: []
    }
  }

  componentDidMount() {
    this.getStages();
  }

  setRoot() {
    return 'http://localhost:3000';
    //return 'https://todo-tracker-andy-strube.herokuapp.com';
  }

  getStages() {
    axios.get(this.setRoot() + '/projects/' + this.props.project_id + '/stages')
    .then((res) => this.setStagesInState(res.data))
    .catch((err) => console.log(err.response.data));
  }

  setStagesInState(res) {
    this.setState({
      stages: this.buildStages(res)
    });
  }

  buildStages(res) {
    return res.map((stage) => {
      return(
        <Stage
          stageName={stage.name}
        />
      );
    });
  }

  renderStages() {
    return <span className="stages">
      {this.state.stages.map((stage) => {
        return stage;
      })}
    </span>
  }

  clearInputElement() {
    this.stageName.value = '';
  }

  onSubmit(e) {
    e.preventDefault();
    this.submitStage({
      name: this.stageName.value
    });
    this.clearInputElement();
  }

  submitStage(formData) {
    axios.post(this.setRoot() +  '/projects/' + this.props.project_id + '/stages', formData)
    .then(() => this.getStages())
    .catch((err) => console.log(err.response.data));
  }

  buildStageForm() {
    if(this.props.current_user) {
      return <form onSubmit={(e) => this.onSubmit(e)}>
        <input type='text' placeholder='Stage Name' ref={(input) => this.stageName = input}/>
        <input type="submit" value="Add stage" className="stage-button btn btn-primary make-it-green"/>
      </form>
    }
  }

  render() {
    return <div>
      {this.buildStageForm()}
      <br/><br/>
      {this.renderStages()}
    </div>
  }
}
