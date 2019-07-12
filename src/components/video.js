import React from "react"
import { withPrefix } from 'gatsby-link'

class VideoComponent extends React.Component {
  render() {
    return (
      <video key={this.props.name} width="320" height="240" controls controlsList="nodownload">
          <source src={withPrefix(this.props.name)} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    ); 
  }
}

export default VideoComponent;
