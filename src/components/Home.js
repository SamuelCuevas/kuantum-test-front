import React, { useEffect, useState } from 'react'
import { fetchDevice, fetchAlert } from '../helpers/fetch';
import { useForm } from '../hooks/useForm';
import Swal from "sweetalert2";

const init = {
    uuid: '',
    value: 0
}

export const Home = () => {

    const [devices, setDevices] = useState([]);
    const [values, handleInputChange] = useForm(init);

    const getDevices = async() => {
        const body = await fetchDevice("");
        const resp = await body.json();
        if(resp.ok){
            setDevices(resp.devices);
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        const resp = await fetchAlert("new", values, "POST");
        const body = await resp.json();
        if(body.ok) {
            Swal.fire('Success', body.msg, 'success');
        } else {
            Swal.fire('Error', 'An error occurred', 'error');
        }
    }

    useEffect(() => {
        getDevices();
    }, []);

    return (
        <>
            <div className="container">
                    <h1 className="title">Simulated Alerts</h1>
                    <br/>
                <div className="row">

                    <form onSubmit={ handleSubmit }>
                        <div className="mb-3">
                            <label className="form-label">Device</label>
                            <select name="uuid" className="form-select" onChange={ handleInputChange }>
                                <option value={ 0 }>Select Device</option>
                                {
                                devices.map((dev, i) => (
                                    <option key={ i } id={ dev.uuid } value={ dev.uuid } >{dev.name}</option>
                                ))
                                }
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Value</label>
                            <input type="number" className="form-control" name="value" onChange={ handleInputChange } />
                        </div>
                        <button type="submit" className="btn btn-primary form-control">Simulate</button>
                    </form>
                </div>
            </div>
        </>
    )
}
