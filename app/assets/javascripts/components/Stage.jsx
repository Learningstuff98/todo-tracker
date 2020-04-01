class Stage extends React.Component {

  render() {
    return <span>
      <h3 className="make-it-green">
        <div className="stage-title">
          {this.props.stageName}
        </div>
        <div className="stage-box"></div>
      </h3>
    </span>
  }
}
