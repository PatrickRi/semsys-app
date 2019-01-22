import React, {Component} from 'react';
import './tabstyle.scss';
import Editor from "../editor/editor";

class Sparql1 extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Editor header="PLACEHOLDER 1"
                query="Your fancy query" showClear={false} queryEnabled={false} endpointEnabled={false}/>
      </div>
    );
  }
}

export default Sparql1;
