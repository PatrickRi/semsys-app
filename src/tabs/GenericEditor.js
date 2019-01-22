import React, {PureComponent} from 'react';
import Editor from "../editor/editor";

class GenericEditor extends PureComponent {
  render() {
    return (
      <div>
        <Editor header="SPARQL Query Editor" instructions="Just enter your query, maybe change the endpoint and hit Submit!"/>
      </div>
    );
  }
}

export default GenericEditor;
