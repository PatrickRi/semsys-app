import React from 'react';
import {Table} from "react-bootstrap";
import './OutputTable.scss';
import PropTypes from 'prop-types';

const OutputTable = (props) => {
  const {payload} = props;
  const vars = payload.head.vars;
  const bindings = payload.results.bindings;
  return (
    <div>
      <Table hover responsive="lg">
        <thead>
        <tr>
          {vars.map(key =>
            <th key={key}>{key}</th>
          )}
        </tr>
        </thead>
        <tbody>
        {bindings.map((binding, idx) =>
          <tr key={idx}>
            {vars.map((v, vi) => <td key={vi}>{binding[v].value}</td>)}
          </tr>
        )}
        </tbody>
      </Table>
    </div>
  );
};


OutputTable.propTypes = {
  payload: PropTypes.shape({
    head: PropTypes.shape({
      vars: PropTypes.array,
    }).isRequired,
    results: PropTypes.shape({
      bindings: PropTypes.array,
    }).isRequired,
  }).isRequired
};

export default OutputTable;
