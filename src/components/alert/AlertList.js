import React, { useEffect, useState } from 'react';
import { fetchAlert } from '../../helpers/fetch';
import moment from 'moment';
import Swal from "sweetalert2";
moment.locale('es');


export const AlertList = () => {

    const [alerts, setAlerts] = useState([]);

    const getAlerts =async() => {
        const resp = await fetchAlert("");
        const body = await resp.json();
        if(body.ok) {
            setAlerts(body.alerts);
        }
    }

    useEffect(() => {
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

    return (
        <>
            <div className="container">
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
                        {
                            alerts.map((al, i) => (
                                <tr key={ i }>
                                    <td>{ al.uuid }</td>
                                    <td>{ al.deviceUuid }</td>
                                    <td>{ al.registered_value }</td>
                                    <td>{ al.alert_data.alert_type }</td>
                                    <td>{ moment(al.createdAt).format('hh:mm:ss DD/MM/YY') }</td>
                                    <th><button className="btn btn-danger" name="btnDelete" id={ al.uuid } value={ al.uuid } onClick={ handleDelete }>X</button></th>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}
