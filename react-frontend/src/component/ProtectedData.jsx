import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProtectedData = () => {

  const [data, setData] = useState('');

  const handleSignup = async () => {
    try {
      const response = await axios.get('http://localhost:3001/protected', { withCredentials: true });
      setData(response.data.message);
      console.log('Data Fetched successfully:', response.data.message);
    } catch (error) {
      setData("You are not authenticated");
      console.error('Unable to fetch data ', error);
    }
  };

  useEffect(()=>{
    handleSignup();
  },[])

  return (
    <div style={styles.container}>
      {data && <p style={styles.result}>{data}</p>}
    </div>
  );
};

const styles = {
  container: {
    width: '300px',
    padding: '20px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '5px',
  },
  result: {
    color: 'green',
    marginTop: '10px',
    textAlign: 'center',
  },
};

export default ProtectedData;
