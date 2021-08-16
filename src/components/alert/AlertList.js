import React from 'react'

export const AlertList = () => {
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
                                    <th><i className='bx bxs-x-circle del'></i></th>
                                </tr>
                            </tbody>
                </table>
            </div>
        </>
    )
}
