import React from 'react';
import moment from 'moment';

export const AlertFilter = ({value, alerts, handleDelete}) => {

    const filtered = alerts.filter((a) => a.deviceUuid === value);

    return (
        <>
                {
                    filtered.map((al, i) => (
                        <tr key={ i }>
                            <td>{ al.uuid }</td>
                            <td>{ al.deviceUuid }</td>
                            <td>{ al.registered_value }</td>
                            <td>{ moment(al.createdAt).format('hh:mm:ss DD/MM/YY') }</td>
                            <th><button className="btn btn-danger" name="btnDelete" id={ al.uuid } value={ al.uuid } onClick={ handleDelete }>X</button></th>
                        </tr>
                    ))
                }
        </>
    )
}
