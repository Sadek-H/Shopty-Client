
import { useLoaderData } from 'react-router';

const Manageusers = () => {
    const users = useLoaderData();
    console.log(users);
    return (
        <div>
            {
                users.map(user => (

                    <div key={user.id} className='border-2 border-gray-300 p-4 m-4 rounded-lg'>
                        
                       <table className='table table-zebra'>
                        <thead>
                             <tr>
                        <th> Name: </th>
                        <th> Email: </th>
                        </tr>
                        </thead>

                        <tbody>
                        <tr>
                        <td >{user?.name}</td>
                        <td >{user?.email}</td>
</tr>
                        </tbody>
                       </table>
                    </div>


                ))
            }
        </div>
    );
};

export default Manageusers;