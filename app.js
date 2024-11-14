import React, { useState, useEffect } from 'react';

const App = () => {
  // State management
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      // Fetch data from a backend API
      const productResponse = await fetch('/api/products');
      setProducts(await productResponse.json());

      const orderResponse = await fetch('/api/orders');
      setOrders(await orderResponse.json());

      const customerResponse = await fetch('/api/customers');
      setCustomers(await customerResponse.json());
    };
    fetchData();
  }, []);

  // Add new product
  const addProduct = async (product) => {
    const response = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    setProducts([...products, await response.json()]);
  };

  // Place new order
  const placeOrder = async (order) => {
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    });
    setOrders([...orders, await response.json()]);
  };

  // Add new customer
  const addCustomer = async (customer) => {
    const response = await fetch('/api/customers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customer),
    });
    setCustomers([...customers, await response.json()]);
  };

  return (
    <div>
      <header className="bg-gray-800 text-white p-4">
        <h1 className="font-bold text-lg">Pharmacy App</h1>
      </header>

      <nav className="bg-gray-200 p-4 mb-6">
        <ul className="flex space-x-4">
          <li><a href="#" className="font-medium text-blue-500 hover:text-blue-700">Dashboard</a></li>
          <li><a href="#" className="font-medium text-gray-700 hover:text-gray-900">Inventory</a></li>
          <li><a href="#" className="font-medium text-gray-700 hover:text-gray-900">Orders</a></li>
          <li><a href="#" className="font-medium text-gray-700 hover:text-gray-900">Customers</a></li>
        </ul>
      </nav>

      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
        <div>
          <p>Total Products: {products.length}</p>
          <p>Total Orders: {orders.length}</p>
          <p>Total Customers: {customers.length}</p>
        </div>

        <h2 className="text-2xl font-bold mb-4 mt-8">Inventory</h2>
        <div>
          <ul>
            {products.map((product) => (
              <li key={product.id}>{product.name}</li>
            ))}
          </ul>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => addProduct({ name: 'New Product' })}
          >
            Add Product
          </button>
        </div>

        <h2 className="text-2xl font-bold mb-4 mt-8">Orders</h2>
        <div>
          <ul>
            {orders.map((order) => (
              <li key={order.id}>Order #{order.id}</li>
            ))}
          </ul>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => placeOrder({ items: [{ name: 'Product A', quantity: 2 }] })}
          >
            Place Order
          </button>
        </div>

        <h2 className="text-2xl font-bold mb-4 mt-8">Customers</h2>
        <div>
          <ul>
            {customers.map((customer) => (
              <li key={customer.id}>{customer.name}</li>
            ))}
          </ul>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => addCustomer({ name: 'New Customer' })}
          >
            Add Customer
          </button>
        </div>
      </div>
    </div>
  );
};
