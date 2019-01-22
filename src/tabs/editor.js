import React, {Component} from 'react';
import {Button, ButtonToolbar, Form} from 'react-bootstrap';
import './editor.scss';
import query from '../sparql/sparql_service';
import * as constants from '../sparql/sparql_utils';

class Editor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      query: '',
      result: '',
      endpoint: undefined,
      hasError: false,
      error: undefined
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.resize = this.resize.bind(this);
    this.outputArea = React.createRef();
  }

  handleSubmit(e) {
    e.preventDefault();
    const sparqlEndpoint = this.state.endpoint ? this.state.endpoint : constants.SPARQL_ENDPOINT;
    query(this.state.query, sparqlEndpoint)
      .then(result => {
        this.setState({
          result: result.data
        });
      }).catch(err => {
      this.setState({
        hasError: true,
        error: err.message,
        result: ''
      });
    });
  }

  handleChange(event) {
    this.setState({
      query: event.target.value
    });
  }

  handleEndpointChange(event) {
    this.setState({
      endpoint: event.target.value
    });
  }

  resize() {
    this.outputArea.current.style.height = 'auto';
    this.outputArea.current.style.height = (this.outputArea.current.scrollHeight + 10) + 'px';
  }

  render() {
    return (
      <div className="editor-container">
        <h2>SPARQL Query Editor</h2>
        <div className="instructions">Just enter your query, maybe change the endpoint and hit Submit!</div>
        {this.state.hasError &&
        <div className="error" onClick={() => this.setState({hasError: false, error: undefined,})}>
          {this.state.error}
        </div>}
        <Form>
          <Form.Group controlId="sparqlEndpoint">
            <Form.Label>SPARQL Endpoint</Form.Label>
            <Form.Control type="text" placeholder={constants.SPARQL_ENDPOINT} onChange={this.handleEndpointChange}/>
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Query</Form.Label>
            <Form.Control className="textarea expandable" as="textarea" rows="5" value={this.state.query}
                          onChange={this.handleChange}/>
          </Form.Group>
          <ButtonToolbar>
            <Button variant="secondary" type="submit" onClick={this.handleSubmit} disabled={!this.state.query}>
              Submit
            </Button>
            <Button variant="secondary" type="button" onClick={() => {
              this.setState({query: ''})
            }}>
              Clear
            </Button>
          </ButtonToolbar>
        </Form>
        <Form.Label>Output</Form.Label>
        <Form.Control className="textarea" as="textarea" rows="5" value={this.state.result} disabled
                      ref={this.outputArea}/>
      </div>
    );
  }
}

export default Editor;
