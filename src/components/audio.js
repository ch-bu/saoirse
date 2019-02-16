import React from "react"
import { withPrefix } from 'gatsby-link'


class AudioComponent extends React.Component {
  render() {

    const type = "audio/" + this.props.type;

    return (
      <audio key={this.props.name} width="320" height="240" controls controlsList="nodownload">
          <source src={withPrefix(this.props.name)} type={type} />
        Your browser does not support the video tag.
      </audio>
    ); 
  }
}

export default AudioComponent;
