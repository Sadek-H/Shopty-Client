import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
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

    const handleapprove = (id,status) => {
          axios.patch(`http://localhost:3000/approvevendor/${id}`, { status })
          .then(res => {
            console.log(res.data);
            toast.success("Vendor approved successfully");
            setVendors(prevVendors => prevVendors.map(vendor => vendor._id === id ? {...vendor, status}: vendor));
         
        })
          .catch(err => {
            console.error("Error approving vendor:", err);
          });


    }

    const handlereject = (id)=>{

    }
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
                                   {
                                    vendor.status === "pending" ? <button onClick={() => handleapprove(vendor._id,"approved")} className="btn btn-success">Approve</button>: <button disabled className="btn btn-success">Approved</button>   
                                   }
                                   {
                                    vendor.status === "pending" ? <button onClick={() => handlereject(vendor._id,"rejected")} className="btn btn-error">Reject</button>: <button  className="hidden btn btn-error">Rejected</button>
                                   }
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