import axios from 'axios';
import  React, { useState, useEffect } from 'react';




function Usuarios() {
    const [usuario, setUsuario ] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/users/')
            .then(response => {
                setUsuario(response.data);
                console.log(response.data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className='mt-14'>
            <h1>Items</h1>
            <ul>
                {usuario.map(usuario => (
                    <li key={usuario.name}>{usuario.username} - {usuario.nombre} - {usuario.apellido} - {usuario.email}</li>
                ))}
            </ul>
        </div>
    );
}


export default Usuarios;
