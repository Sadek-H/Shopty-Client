
import axios from 'axios';
import { useLoaderData } from 'react-router';
import { toast } from 'react-toastify';

const Manageusers = () => {
    const users = useLoaderData();
    console.log(users);
    const handleuser = (event,id) => {
        const role = event.target.value;
        console.log(role);
        axios.patch(`http://localhost:3000/users/${id}`, { role })
            .then((res) => {
                console.log(res.data);
                toast.success("User role updated successfully");
            })
            .catch((err) => {
                console.error("Error updating user role:", err);
                toast.error("Failed to update user role");
            });
    }
    return (
        <div>

                    <div  className='border-2 border-gray-300 p-4 m-4 rounded-lg'>
                        
                       <table className='table table-zebra'>
                        <thead>
                             <tr>
                        <th> Name: </th>
                        <th> Email: </th>
                        <th> Users</th>
                        </tr>
                        </thead>

                        <tbody>
            {
                users.map(user => (
                        <tr>
                        <td >{user?.name}</td>
                        <td >{user?.email}</td>
                        <select defaultValue={user.role} onChange={(e) => handleuser(e, user?._id)} className='select select-bordered w-full max-w-xs'>
                         <option disabled value="">Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="vendor">Vendor</option>
                    <option value="user">User</option>
                        </select>
</tr>
                ))}
                        </tbody>
                       </table>
                    </div>


                
            
        </div>
    );
};

export default Manageusers;