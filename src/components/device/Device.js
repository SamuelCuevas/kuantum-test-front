import React, { useState } from 'react'
import { fetchDevice } from '../../helpers/fetch';
import { useForm } from '../../hooks/useForm'

export const Device = () => {

    const [values, handleInputChange] = useForm();
    const [data, setData] = useState();
    // const data = {
    //     "uuid": values.uuid,
    //     "name": values.name,
    //     "description": values.description,
    //     "alerts_config": {
    //         "name": values.alert_name,
    //         "alert_type": values.alert_type,
    //         "value": values.alert_value,
    //         "range": {
    //             "min": values.alert_min,
    //             "max": values.alert_max
    //         }
    //     }
    // }
    

    const handleSubmit = (e) => {
        e.preventDefault();
        setD();
        if(data){
            fetchDevice("new",data,"POST");
        }else{
            alert('intente nuevamente');
        }
    }

    const handleSearch = (e) => {
        e.preventDefault();
        setD();
        if(data){
            console.log(data);
        }else{
            alert('intente nuevamente');
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
                "value": values.alert_value,
                "range": {
                    "min": values.alert_min,
                    "max": values.alert_max
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
                                            <input type="text" className="form-control" id="alert_name" name="alert_name" onChange= { handleInputChange }/>
                                            <label className="input-group-text">Alert Type</label>
                                            <input type="text" className="form-control" id="alert_type" name="alert_type" onChange= { handleInputChange }/>
                                        </div>
                                        <div className="input-group mb-3">
                                            <label className="input-group-text">Value</label>
                                            <input type="number" className="form-control" step="0.01" id="alert_value" name="alert_value" onChange= { handleInputChange }/>
                                            <span className="input-group-text">Range</span>
                                            <input type="number" className="form-control" placeholder="Min" step="0.01" id="alert_min" name="alert_min" onChange= { handleInputChange }/>
                                            <input type="number" className="form-control" placeholder="Max" step="0.01" id="alert_max" name="alert_max" onChange= { handleInputChange }/>
                                        </div>
                                </div>
                            <button type="submit" className="btn btn-primary" onClick={ handleSubmit }>Submit</button>
                            <button className="btn btn-primary " onClick={ handleSearch }>Search</button>
                        </form>
                </div>
            </div>
        </>
    )
}
