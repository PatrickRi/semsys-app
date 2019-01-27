import React, {Component} from 'react';
import {Form} from 'react-bootstrap';
import './tabstyle.scss';
import Editor from "../editor/editor";
import * as constants from '../sparql/sparql_utils';

class QueryEditor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      query_label: constants.queries[Object.keys(constants.queries)[0]].label,
      query_string: constants.queries[Object.keys(constants.queries)[0]].query,
    };
  }

  handleSelect(event) {
    this.setState({
      query_label: constants.queries[event.target.value].label,
      query_string: constants.queries[event.target.value].query,
    });
  }

  render() {
    return (
      <div>
        <div className="query-container">
          <Form>
            <Form.Group controlId="form.queries">
              <Form.Label>Select a Query</Form.Label>
              <Form.Control as="select" onChange={this.handleSelect.bind(this)}>
                {Object.keys(constants.queries).map(key => <option key={key}
                                                                   value={key}>{constants.queries[key].label}</option>)}
              </Form.Control>
            </Form.Group>
          </Form>
        </div>
        <Editor header={this.state.query_label}
                query={this.state.query_string} showClear={false} queryEnabled={false} endpointEnabled={false}/>
      </div>
    );
  }
}

export default QueryEditor;
