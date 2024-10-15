import React from 'react';
import './App.css'
function DataTable({ data }) {
  // Assuming data is an object of objects
  const columnHeaders = Object.keys(data);
  const indexes = Object.keys(data[columnHeaders[0]]); // Get row indexes from the first column

  return (
    <div className="table-container">
    <table>
      <thead>
        <tr>
          {columnHeaders.map(header => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {indexes.map(index => (
          <tr key={index}>
            {columnHeaders.map(header => (
              <td key={header + index}>{data[header][index]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}


export default DataTable;