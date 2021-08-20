
const baseUrl = "http://localhost:4000/api/device";
const baseUrlAlert = "http://localhost:4000/api/alert";

const fetchDevice = ( endpoint, data, method = 'GET' ) => {

    const url = `${ baseUrl }/${ endpoint }`;

    if( method === 'GET') {
        return fetch( url );
    } else {
        return fetch( url, {
            method,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify( data )
        });
    }

}

const fetchAlert = ( endpoint, data, method = 'GET' ) => {

    const url = `${ baseUrlAlert }/${ endpoint }`;

    if( method === 'GET') {
        return fetch( url );
    } else {
        return fetch( url, {
            method,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify( data )
        });
    }

}

export {
    fetchDevice,
    fetchAlert
}