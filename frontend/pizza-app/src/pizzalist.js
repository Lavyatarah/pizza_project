import React, { useEffect, useState } from 'react';

const PizzaList = () => {
 const [pizzas, setPizzas] = useState([]);

 useEffect(() => {
    fetchPizzas();
 }, []);

 const fetchPizzas = async () => {
    try {
      const response = await fetch('http://localhost:5000/pizzas');
      const data = await response.json();
      setPizzas(data);
    } catch (error) {
      console.error('Error fetching pizzas:', error);
    }
 };

 return (
    <div>
      <h2>Pizza List</h2>
      <ul>
        {pizzas.map((pizza) => (
          <li key={pizza._id}>
            <h3>{pizza.name}</h3>
            <p>{pizza.price}</p>
            <img src={pizza.image} alt={pizza.name} />
          </li>
        ))}
      </ul>
    </div>
 );
};

export default PizzaList;
