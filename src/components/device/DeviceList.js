import React, { useEffect, useState } from 'react'
import { fetchDevice } from '../../helpers/fetch';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Swal from "sweetalert2";

moment.locale('es');


export const DeviceList = () => {

    const [devices, setDevices] = useState([]);
    const getDevices = async() => {
        const body = await fetchDevice("");
        const resp = await body.json();
        if(resp.ok){
            setDevices(resp.devices);
        }
    }

    useEffect(() => {
        getDevices();
        
    }, []);
    
    const handleDelete = async(e) => {
        e.preventDefault();
        const resp = await fetchDevice(e.target.value, {}, 'DELETE');
        const body = await resp.json();
        if(body.ok) {
            Swal.fire('Success', body.msg, 'success');
        }
    }

    return (
        <>
            <div className="container">
                <table className="table">
                            <thead>
                                <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Description</th>
                                <th scope="col">Created</th>
                                <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    devices.map((dev, i) => (
                                        <tr key={ i }>
                                            <td>{ dev.uuid }</td>
                                            <td>{ dev.name }</td>
                                            <td>{ dev.description }</td>
                                            <td>{ moment(dev.createdAt).format('hh:mm:ss-DD/MM/YY') }</td>
                                            <td><button className="btn btn-danger bt" name="btnDelete" id={ dev.uuid } value={ dev.uuid } onClick={ handleDelete }>X</button>
                                                <Link to={ `./device/${dev.uuid}` }>
                                                <i className='bx bxs-pencil bti'></i>
                                                </Link>
                                            </td>

                                        </tr>                                            
                                    ))
                                    
                                }
                                   
                            </tbody>
                </table>
            </div>
        </>
    )
}
