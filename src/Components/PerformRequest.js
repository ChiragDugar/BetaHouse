import axios from 'axios'

let url = "https://backend.betahouse.co.in"
// let url = "http://localhost:3000"

let performRequest = (path, method, body, token) => {

    path = url + path
    return new Promise((resolve, reject) => {
        const headers = {
            'content-type': 'application/json',
        };
        if (token) {
            headers['Authorization'] = 'Bearer ' + token;
        }
        axios({ method: method, url: path, data: body, headers: headers })
            .then((res) => {
                resolve(res.data)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export default performRequest