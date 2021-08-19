import React, { useEffect, useState } from 'react'
import { fetchDevice } from '../../helpers/fetch';
import moment from 'moment';
import Swal from "sweetalert2";
import Modal from 'react-modal';
moment.locale('es');


const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

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

export const DeviceList = () => {

    const [devices, setDevices] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [formValues, setFormValues] = useState(form);
    const {uuid, name, description, alert_name, alert_type, value, min, max} = formValues;

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

    const handleInputChange = async({ target }) => {
        await setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }
    
    const handleDelete = async(e) => {
        e.preventDefault();
        const resp = await fetchDevice(e.target.value, {}, 'DELETE');
        const body = await resp.json();
        if(body.ok) {
            Swal.fire('Success', body.msg, 'success');
            getDevices();
        }
    }

    const handleUpdate = (dev) => {
        setFormValues({
            uuid: dev.uuid,
            name: dev.name,
            description: dev.description,
            alert_name: dev.alerts_config.name,
            alert_type: dev.alerts_config.alert_type,
            value: dev.alerts_config.value,
            min: dev.alerts_config.range.min,
            max: dev.alerts_config.range.max
        });
        openModal();
    }

    const handleSubmitForm = async(e) => {
        e.preventDefault();
        const resp = await fetchDevice(uuid, {
            uuid: uuid,
            name: name,
            description: description,
            alerts_config: {
                name: formValues.alert_name,
                alert_type:alert_type,
                value: value,
                range: {
                    min: min,
                    max: max
                }
            }
        }, 'PUT');
        const body = await resp.json();
        if(body.ok){
            Swal.fire('Success', body.msg, 'success');
        }else{
            Swal.fire('Error', 'An error occurred', 'error');
        }
        getDevices();
        closeModal();
    }

    function openModal() {
        setIsOpen(true);
      }
    
    function closeModal() {
        setIsOpen(false);
    }

    

    return (
        <>
            <div className="container">
                <table className="table">
                            <thead>
                                <tr>
                                <th scope="col">UUID</th>
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
                                            <td>{ moment(dev.createdAt).format('hh:mm:ss DD/MM/YY') }</td>
                                            <td>
                                                <button className="btn btn-primary" onClick={ ()=>handleUpdate(dev) }><i className='bx bxs-pencil bti'></i></button>
                                                <button className="btn btn-danger" name="btnDelete" id={ dev.uuid } value={ dev.uuid } onClick={ handleDelete }>X</button>
                                            </td>

                                        </tr>                                            
                                    ))
                                    
                                }
                                   
                            </tbody>
                </table>
            </div>

                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        style={customStyles}
                        contentLabel="Edit Modal"
                        className="modal"
                        overlayClassName="modal-fondo"
                        ariaHideApp={false}
                    >
                        <h2>Edit Device</h2>
                        <hr />
                        <form 
                            className="container"
                            onSubmit={ handleSubmitForm }
                        >
                                <div className="input-group mb-3">
                                    <label className="input-group-text">Uuid</label>
                                    <input type="text" className="form-control" readOnly id="uuid" name="uuid" value={ uuid } onChange= { handleInputChange }/>
                                    <label className="input-group-text">Name</label>
                                    <input type="text" className="form-control" id="name" name="name" value={ name } onChange= { handleInputChange }/>
                                </div>
                                <div className="input-group mb-3">
                                    <label className="input-group-text">Description</label>
                                    <input type="text" className="form-control" id="description" name="description" value={ description } onChange= { handleInputChange }/>
                                </div>
                                <div className="row">
                                    <h2 className="title_form">Alerts Config</h2>
                                        <div className="input-group mb-3">
                                            <label className="input-group-text">Name</label>
                                            <input type="text" className="form-control" name="alert_name" value={ alert_name } onChange= { handleInputChange }/>
                                            <label className="input-group-text">Alert Type</label>
                                            <input type="text" className="form-control" id="alert_type" name="alert_type" value={ alert_type }  onChange= { handleInputChange }/>
                                        </div>
                                        <div className="input-group mb-3">
                                            <label className="input-group-text">Value</label>
                                            <input type="number" className="form-control" step="0.01" id="value" name="value" value={ value }  onChange= { handleInputChange }/>
                                            <span className="input-group-text">Range</span>
                                            <input type="number" className="form-control" placeholder="Min" step="0.01" id="min" name="min" value={ min }  onChange= { handleInputChange }/>
                                            <input type="number" className="form-control" placeholder="Max" step="0.01" id="max" name="max" value={ max }  onChange= { handleInputChange }/>
                                        </div>
                                </div>
                                <button type="submit" className="btn btn-primary form-control">Submit</button>
                        </form>
                    </Modal>
        </>
    )
}
