import React, {Component} from 'react';
import './tabstyle.scss';
import Editor from "../editor/editor";

class Sparql2 extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Editor header="PLACEHOLDER 2" query="Your fancy query SECOND" showClear={false} queryEnabled={false} endpointEnabled={false}/>
      </div>
    );
  }
}

export default Sparql2;
