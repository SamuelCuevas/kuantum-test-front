import React, { useState } from 'react'
import { fetchDevice } from '../../helpers/fetch';
import { useForm } from '../../hooks/useForm'
import Swal from "sweetalert2";

export const Device = () => {

    const [values, handleInputChange] = useForm();
    const [data, setData] = useState(values);

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(!values.uuid || !values.name || !values.description || !values.alert_name || !values.alert_type || !values.value || !values.min || !values.max){
            Swal.fire( 'Error', 'Try again', 'error' );
        }else{

            // ARREGLAR ESTO CON RESPUESTA DEL BACKEND
            await setD();
            if(data === {}){
                Swal.fire( 'Error', 'Try again', 'error' );
                
            } else {
                await fetchDevice("new",data,"POST").then(res => {
                    Swal.fire('Success', res.msg, 'success');
                });
            }
        }
    }

    const setD = () => {
        setData({
            "uuid": values.uuid,
            "name": values.name,
            "description": values.description,
            "alerts_config": {
                "name": values.alert_name,
                "alert_type": values.alert_type,
                value: values.value,
                "range": {
                    min: values.min,
                    max: values.max
                }
            }
        });
    }

    return (
        <>
            <div className="container">
                <div className="row">
                        <h1 className="title_form">Form Devices</h1>
                        <form>
                                <div className="input-group mb-3">
                                    <label className="input-group-text">Uuid</label>
                                    <input type="text" className="form-control" id="uuid" name="uuid" onChange= { handleInputChange }/>
                                    <label className="input-group-text">Name</label>
                                    <input type="text" className="form-control" id="name" name="name" onChange= { handleInputChange }/>
                                </div>
                                <div className="input-group mb-3">
                                    <label className="input-group-text">Description</label>
                                    <input type="text" className="form-control" id="description" name="description" onChange= { handleInputChange }/>
                                </div>
                                <div className="row">
                                    <h2 className="title_form">Alerts Config</h2>
                                        <div className="input-group mb-3">
                                            <label className="input-group-text">Name</label>
                                            <input type="text" className="form-control" name="alert_name" onChange= { handleInputChange }/>
                                            <label className="input-group-text">Alert Type</label>
                                            <input type="text" className="form-control" id="alert_type" name="alert_type" onChange= { handleInputChange }/>
                                        </div>
                                        <div className="input-group mb-3">
                                            <label className="input-group-text">Value</label>
                                            <input type="number" className="form-control" step="0.01" id="value" name="value" onChange= { handleInputChange }/>
                                            <span className="input-group-text">Range</span>
                                            <input type="number" className="form-control" placeholder="Min" step="0.01" id="min" name="min"  onChange= { handleInputChange }/>
                                            <input type="number" className="form-control" placeholder="Max" step="0.01" id="max" name="max"  onChange= { handleInputChange }/>
                                        </div>
                                </div>
                            <button type="submit" className="btn btn-primary form-control" onClick={ handleSubmit }>Submit</button>
                        </form>
                </div>
            </div>
        </>
    )
}
