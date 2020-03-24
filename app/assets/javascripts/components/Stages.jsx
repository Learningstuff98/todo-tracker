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

  onSubmit(e) {
    e.preventDefault();
    this.submitStage(this.stageName.value);
    this.clearInputElement();
  }

  clearInputElement() {
    this.stageName.value = '';
  }

  submitStage(stageName) {
    const formData = {
      name: stageName
    };
    this.submitStageToAPI(formData);
  }

  submitStageToAPI(formData) {
    axios.post('http://localhost:3000/projects/' + this.props.project_id + '/stages', formData)
    //axios.post('https://todo-tracker-andy-strube.herokuapp.com/projects/' + this.props.project_id + '/stages', formData)
    .then(() => this.getStages())
    .catch((err) => console.log(err.response.data));
  }

  getStages() {
    axios.get('http://localhost:3000/projects/' + this.props.project_id + '/stages')
    //axios.get('https://todo-tracker-andy-strube.herokuapp.com/projects/' + this.props.project_id + '/stages')
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

  render() {
    return(
      <div>
        <br/>
        <form onSubmit={(e) => this.onSubmit(e)}>
          <input type='text' placeholder='Stage Name' ref={(input) => this.stageName = input}/>
          <input type="submit" value="Create Project Stage" className="stage-button btn btn-primary make-it-green"/>
        </form>
        <br/>
        {this.state.stages.map((stage) => {
          return stage;
        })}
      </div>
    );
  }
}
