import React from 'react';

function OrderList() {
  // Placeholder order data
  const orders = [
    { id: 1, customer: 'John Doe', total: 50.99 },
    { id: 2, customer: 'Jane Smith', total: 75.99 },
    { id: 3, customer: 'Bob Johnson', total: 30.99 },
  ];

  return (
    <div>
      <h3>Order List</h3>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            {order.customer} - ${order.total}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrderList;