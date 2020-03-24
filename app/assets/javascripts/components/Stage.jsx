class Stage extends React.Component {
  render() {
    return <span>
      <span className="stage-box">
        {this.props.stageName}
      </span>
      <span className="spacer-box"></span>
    </span>
  }
}
