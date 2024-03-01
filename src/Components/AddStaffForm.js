// import React, { useState } from 'react';
// import { ASForm } from './ASForm';
// import Navbar from './Navbar';

// const AddStaffForm = () => {
//     return (
//       <div>
//         {/* <Navbar></Navbar> */}
//         <div className='flex flex-wrap justify-center items-center'>
//           <div className='flex justify-center items-center mt-10 ml-20 pl-10 pt-20' >
//              <h1 className='font-bold text-6xl'>ADD NEW<br></br>STAFF</h1>
//           </div>
//           <div className='flex justify-center items-center mt-20 pt-10' >
//             <ASForm/>
//           </div>
//         </div>
//       </div>
        
//       );
// };

// export default AddStaffForm;




import React, { useState } from 'react';
import { ASForm } from './ASForm';
import AddLoginCredRec from './AddLoginCredRec';
import Navbar from './Navbar';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AddStaffForm = () => {
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [email, setEmail] = useState('');
    let navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/");
        }
      }, []);

    const handleLoginSuccess = (email) => {
      setEmail(email);
      setLoginSuccess(true);
    };

    return (
        <div>
            {/* <Navbar></Navbar> */}
            <div className='flex flex-wrap justify-center items-center'>
                <div className='flex justify-center items-center mt-10 ml-20 pl-10 pt-20' >
                    <h1 className='font-bold text-6xl'>ADD NEW<br></br>RECEPTIONIST</h1>
                </div>
                <div className='flex justify-center items-center mt-20 pt-10' >
                    {!loginSuccess && <AddLoginCredRec onSuccess={handleLoginSuccess}  />}
                    {loginSuccess && <ASForm email={email}/>}
                </div>
            </div>
        </div>
    );
};

export default AddStaffForm;

