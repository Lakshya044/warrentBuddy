'use client';

import { useState } from 'react';

export default function RegisterClient() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [pincode, setPincode] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    country,
                    address,
                    city,
                    pincode,
                    phonenumber,
                }),
            });

            // Check if the response is in JSON format
            const contentType = response.headers.get('content-type');
            let data;
            if (contentType && contentType.includes('application/json')) {
                data = await response.json();
            } else {
                data = await response.text();
            }

            if (response.ok) {
                setMessage(typeof data === 'string' ? data : data.message);
                setError('');
            } else {
                setError(typeof data === 'string' ? data : data.message || 'Registration failed');
                setMessage('');
                console.log(response);
            }
        } catch (err) {
            setError('Registration failed');
            setMessage('');
            console.log(err);
        }
    };

    return (
        <div className="register-form">
            <h2>Client Registration</h2>
            <form onSubmit={handleRegister}>
                {/* Form Fields */}
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="country">Country:</label>
                    <input
                        type="text"
                        id="country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="address">Address:</label>
                    <input
                        type="text"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="city">City:</label>
                    <input
                        type="text"
                        id="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="pincode">Pincode:</label>
                    <input
                        type="text"
                        id="pincode"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="phonenumber">Phone Number:</label>
                    <input
                        type="text"
                        id="phonenumber"
                        value={phonenumber}
                        onChange={(e) => setPhonenumber(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="error">{error}</p>}
                {message && <p className="message">{message}</p>}
                <button type="submit">Register</button>
            </form>
            <style jsx>{`
                .register-form {
                    max-width: 500px;
                    margin: 0 auto;
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                }
                form div {
                    margin-bottom: 15px;
                }
                label {
                    display: block;
                    margin-bottom: 5px;
                    color: #377; /* Change this to your preferred color */
                }
                input {
                    width: 100%;
                    padding: 8px;
                    box-sizing: border-box;
                    color: #377;
                }
                .error {
                    color: red;
                }
                .message {
                    color: green;
                }
                button {
                    padding: 10px 20px;
                    background-color: black;
                    color: blue;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                }
            `}</style>
        </div>
    );
}
