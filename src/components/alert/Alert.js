import React, { useEffect, useState } from 'react';
import { fetchAlert, fetchDevice } from '../../helpers/fetch';
import moment from 'moment';
import Swal from "sweetalert2";
import { AlertFilter } from './AlertFilter';
moment.locale('es');


export const Alert = () => {

    const [alerts, setAlerts] = useState([]);
    const [devices, setDevices] = useState([]);
    const [val, setVal] = useState(0);

    const getDevices = async() => {
        const body = await fetchDevice("");
        const resp = await body.json();
        if(resp.ok){
            setDevices(resp.devices);
        }
    }

    const getAlerts =async() => {
        const resp = await fetchAlert("");
        const body = await resp.json();
        if(body.ok) {
            setAlerts(body.alerts);
        }
    }

    useEffect(() => {
        getDevices();
        getAlerts();
    }, []);

    const handleDelete = async(e) => {
        e.preventDefault();
        const resp = await fetchAlert(e.target.value, {}, 'DELETE');
        const body = await resp.json();
        if(body.ok) {
            Swal.fire('Success', body.msg, 'success');
            getAlerts();
        }
    }

    const handleFieldChange = ({ target }) => {

        const { value } = target;
        setVal(value);
    }

    return (
        <>
            <div className="container">

            <select className="form-select" onChange={ handleFieldChange }>
                    <option value={ 0 }>Select Device</option>
                {
                    devices.map((dev, i) => (
                        <option key={ i } id={ dev.uuid } value={ dev.uuid } >{dev.name}</option>
                    ))
                }
            </select>
                <br></br>
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">UUID</th>
                        <th scope="col">Device UUID</th>
                        <th scope="col">Registered Value</th>
                        <th scope="col">Alert Type</th>
                        <th scope="col">Created</th>
                        <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        <AlertFilter value={ val } alerts={ alerts } handleDelete={ handleDelete }/>
                                
                    </tbody>
                </table>
            </div>
        </>
    )
}
