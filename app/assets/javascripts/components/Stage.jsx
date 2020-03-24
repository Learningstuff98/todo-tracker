class Stage extends React.Component {

  onSubmit(e) {
    e.preventDefault();
    this.submitStage(this.stageName.value);
  }

  submitStage(stageName) {
    const formData = {
      name: stageName
    };
    // axios.post('http://localhost:3000/projects/' + this.props.project_id + '/stages', formData)
    axios.post('https://todo-tracker-andy-strube.herokuapp.com/projects/' + this.props.project_id + '/stages', formData)
    .then((res) => console.log(res) )
    .catch((err) => console.log(err.response.data) );
  }

  render() {
    return(
      <form onSubmit={(e) => this.onSubmit(e)} >
        <input type='text' placeholder='Stage Name' ref={(input) => this.stageName = input} />
        <input type="submit" value="Create Project Stage" />
      </form>
    );
  }
}
