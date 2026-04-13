import axios from 'axios';
import React, { useEffect, useState } from 'react';

const VendorRequest = () => {
    const [vendors, setVendors] = useState([]);
    useEffect(()=>{
                axios.get("http://localhost:3000/getvendors")
                .then(res => {
                    console.log(res.data);
                    setVendors(res.data.vendors);
                })
                .catch(err => {
                    console.error("Error fetching vendor requests:", err);
                });
    },[])
    return (
        <div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                     {
                        vendors.map((vendor)=>(
                            <tr>
                                <td>{vendor.fullName}</td>
                                <td>{vendor.email}</td>
                                <td>{vendor.phone}</td>
                                <td>{vendor.status}</td>
                                <td className='flex gap-4'>
                                    <button className="btn btn-success">Approve</button>
                                    <button className="btn btn-danger">Reject</button>
                                </td>
                            </tr>
                        )
                        )
                     }
                    </tbody>

                </table>
        </div>
    );
};

export default VendorRequest;