import React from 'react';
import '../css//classprogress.css';

const tableData = {
  assessment_name : 'Functions',
  submitted: 20,
  notSubmitted: 3,
  marked: 18,
  notMarked: 2,
  top5Average: 85,
  low5Average: 33,
  average: 78
};


const TableComponent = ({ data }) => {
  return (
    <div className="table-container">
    <h1>{data.assessment_name}</h1>
      <table className="dynamic-table">
        <thead>
          <tr>
            <th colSpan="2">SUBMISSION</th>
            <th colSpan="2">MARKING</th>
            <th colSpan="3">AVERAGE</th>
          </tr>
          <tr>
            <th>Submitted</th>
            <th>Not Submitted</th>
            <th>Marked</th>
            <th>Not Marked</th>
            <th>Top 5 Average</th>
            <th>Low 5 Average</th>
            <th>Average</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{data.submitted}</td>
            <td>{data.notSubmitted}</td>
            <td>{data.marked}</td>
            <td>{data.notMarked}</td>
            <td>{data.top5Average}</td>
            <td>{data.low5Average}</td>
            <td>{data.average}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};


const AssessmentsTable = () => {
  return (
    <div>
      <TableComponent data={tableData} />
    </div>
  );
};

export default AssessmentsTable ;
