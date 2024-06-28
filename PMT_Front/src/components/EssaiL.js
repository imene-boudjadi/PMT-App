import React, { useState, useEffect } from 'react';






const EssaiL = ({ data }) => {

 

    const [selectedValue, setSelectedValue] = useState('');
  
    const handleSelectChange = (event) => {
      setSelectedValue(event.target.value);
    };
  
  
  
    return (
      <div>
        <table>
        <thead>
          <tr>
            <th>Column 1</th>
            <th>Column 2</th>
            <th>Column 3</th>
            {/* Add more column headings as needed */}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.column1Data}</td>
              <td>{row.column2Data}</td>
              <td>{row.column3Data}</td>
              {/* Add more cells as needed */}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    );
  };

export default EssaiL;
