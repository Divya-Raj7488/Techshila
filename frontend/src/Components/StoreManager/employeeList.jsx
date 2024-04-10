import React from 'react';

function EmployeeList() {
  // Placeholder employee data
  const employees = [
    { id: 1, name: 'John Doe', position: 'Manager' },
    { id: 2, name: 'Jane Smith', position: 'Cashier' },
    { id: 3, name: 'Bob Johnson', position: 'Stock Clerk' },
  ];

  return (
    <div>
      <h3>Employee List</h3>
      <ul>
        {employees.map(employee => (
          <li key={employee.id}>
            {employee.name} - {employee.position}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EmployeeList;