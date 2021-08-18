import React from 'react'
import { useParams } from 'react-router-dom';

export const EditDevice = () => {
    const { uuid } = useParams();
    return (
        <div className="content">
            <h1>{ uuid }</h1>
        </div>
    )
}
