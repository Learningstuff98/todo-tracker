class Stage extends React.Component {
  render() {
    return <span>
      <div className="stage-box">
        {this.props.stageName}
      </div>
      <span className="spacer-box"></span>
    </span>
  }
}
