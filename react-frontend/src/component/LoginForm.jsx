import { useEffect, useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        console.log("herereee");
    }, []);

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:3001/login', { username, password }, { withCredentials: true });
            const { token } = response.data;
            localStorage.setItem('token', token);
            setMessage('Login successful');
            console.log('Login successful! Token:', token);
        } catch (error) {
            setMessage('Invalid username or password.');
            console.error('Login failed:', error);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Login</h2>
            <div style={styles.formGroup}>
                <label style={styles.label}>Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={styles.input}
                />
            </div>
            <div style={styles.formGroup}>
                <label style={styles.label}>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                />
            </div>
            <button onClick={handleLogin} style={styles.button}>
                Login
            </button>
            {message && <p style={styles.result}>{message}</p>}
        </div>
    );
};


const styles = {
    appContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    },
    container: {
        width: '300px',
        padding: '20px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '5px',
    },
    header: {
        textAlign: 'center',
        marginBottom: '20px',
        color: '#333',
    },
    formGroup: {
        marginBottom: '15px',
    },
    label: {
        display: 'block',
        marginBottom: '5px',
        color: '#555',
    },
    input: {
        width: '90%',
        padding: '8px',
        fontSize: '14px',
    },
    button: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#4CAF50',
        color: '#fff',
        border: 'none',
        borderRadius: '3px',
        cursor: 'pointer',
    },
    result: {
        color: 'blue',
        marginTop: '10px',
        textAlign: 'center',
    },
};

export default LoginForm;