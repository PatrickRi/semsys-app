import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, ButtonToolbar, Form} from 'react-bootstrap';
import './editor.scss';
import query from '../sparql/sparql_service';
import * as constants from '../sparql/sparql_utils';
import OutputTable from "./OutputTable";

class Editor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      query: this.props.query,
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

  componentWillReceiveProps(nextProps) {
    this.setState({query: nextProps.query});
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
        <h2>{this.props.header}</h2>
        <div className="instructions" style={{
          visibility: this.props.instructions ? 'visible' : 'hidden'
        }}>{this.props.instructions ? this.props.instructions : 'placeholder'}</div>
        {this.state.hasError &&
        <div className="error" onClick={() => this.setState({hasError: false, error: undefined,})}>
          {this.state.error}
        </div>}
        <Form>
          <Form.Group controlId="sparqlEndpoint">
            <Form.Label>SPARQL Endpoint</Form.Label>
            <Form.Control type="text" placeholder={constants.SPARQL_ENDPOINT} onChange={this.handleEndpointChange}
                          disabled={!this.props.endpointEnabled}/>
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Query</Form.Label>
            <Form.Control className="textarea expandable" as="textarea" rows="4" spellCheck="false" value={this.state.query}
                          onChange={this.handleChange} disabled={!this.props.queryEnabled}/>
          </Form.Group>

          <ButtonToolbar>
            <Button variant="secondary" type="submit" onClick={this.handleSubmit} disabled={!this.state.query}>
              Submit
            </Button>
            {this.props.showClear &&
            <Button variant="secondary" type="button" onClick={() => {
              this.setState({query: ''})
            }}>
              Clear
            </Button>
            }
          </ButtonToolbar>

        </Form>
        {this.state.result && <OutputTable payload={this.state.result}/>}
      </div>
    );
  }
}

Editor.defaultProps = {
  showClear: true,
  endpointEnabled: true,
  queryEnabled: true,
  query: '',
  header: '',
  instructions: '',
};

Editor.propTypes = {
  showClear: PropTypes.bool,
  endpointEnabled: PropTypes.bool,
  queryEnabled: PropTypes.bool,
  query: PropTypes.string,
  header: PropTypes.string,
  instructions: PropTypes.string,
};

export default Editor;
