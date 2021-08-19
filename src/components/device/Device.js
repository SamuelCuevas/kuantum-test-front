import React from 'react'
import { fetchDevice } from '../../helpers/fetch';
import { useForm } from '../../hooks/useForm'
import Swal from "sweetalert2";

const form = {
    uuid: '',
    name: '',
    description: '',
    alert_name: '',
    alert_type: '',
    value: 0,
    min: 0,
    max: 0

}

export const Device = () => {

    const [values, handleInputChange, reset] = useForm(form);

    const handleSubmit = async(e) => {
        e.preventDefault();
        const resp = await fetchDevice("new", {
            uuid: values.uuid,
            name: values.name,
            description: values.description,
            alerts_config: {
                name: values.alert_name,
                alert_type: values.alert_type,
                value: values.value,
                range: {
                    min: values.min,
                    max: values.max
                }
            }
        }, 'POST');
        const body = await resp.json();
        if(body.ok){
            Swal.fire('Success', body.msg, 'success');
        }else{
            Swal.fire('Error', 'An error occurred', 'error');
        }
        reset();
    }

    return (
        <>
            <div className="container">
                <div className="row">
                        <h1 className="title_form">Form Devices</h1>
                        <form>
                                <div className="input-group mb-3">
                                    <label className="input-group-text">Uuid</label>
                                    <input type="text" className="form-control" id="uuid" name="uuid" onChange= { handleInputChange } required />
                                    <label className="input-group-text">Name</label>
                                    <input type="text" className="form-control" id="name" name="name" onChange= { handleInputChange } required />
                                </div>
                                <div className="input-group mb-3">
                                    <label className="input-group-text">Description</label>
                                    <input type="text" className="form-control" id="description" name="description" onChange= { handleInputChange } required />
                                </div>
                                <div className="row">
                                    <h2 className="title_form">Alerts Config</h2>
                                        <div className="input-group mb-3">
                                            <label className="input-group-text">Name</label>
                                            <input type="text" className="form-control" name="alert_name" onChange= { handleInputChange } required />
                                            <label className="input-group-text">Alert Type</label>
                                            <input type="text" className="form-control" id="alert_type" name="alert_type" onChange= { handleInputChange } required />
                                        </div>
                                        <div className="input-group mb-3">
                                            <label className="input-group-text">Value</label>
                                            <input type="number" className="form-control" step="0.01" id="value" name="value" onChange= { handleInputChange } required />
                                            <span className="input-group-text">Range</span>
                                            <input type="number" className="form-control" placeholder="Min" step="0.01" id="min" name="min"  onChange= { handleInputChange } required />
                                            <input type="number" className="form-control" placeholder="Max" step="0.01" id="max" name="max"  onChange= { handleInputChange } required />
                                        </div>
                                </div>
                            <button type="submit" className="btn btn-primary form-control" onClick={ handleSubmit }>Submit</button>
                        </form>
                </div>
            </div>
        </>
    )
}
