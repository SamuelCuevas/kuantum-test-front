import React from 'react'

export const DeviceList = () => {
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
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                    <th><button id="delete_device" name="delete_device" className="btn"><i className='bx bxs-x-circle del'></i></button></th>
                                </tr>
                            </tbody>
                </table>
            </div>
        </>
    )
}
