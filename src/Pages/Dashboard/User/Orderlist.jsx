import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Orderlist = () => {
    const  [ order,setOrder] = useState([]);
    useEffect(()=>{
       axios.get("https://shopty-server.onrender.com/orders")
       .then((res)=>{
        console.log(res);
        setOrder(res.data);
       })
    },[])
    return (
        <div>
            <h2>My Orders</h2>
            {order.map((item) => (
                <div key={item._id}>
                    <p>{item.productName}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: {item.price}</p>
                </div>
            ))}
        </div>
    );
};

export default Orderlist;