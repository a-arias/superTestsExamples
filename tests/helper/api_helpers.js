const supertest = require('supertest');


exports.sendGETRequest = async (baseUrl, apiEndPoint) => {
    try {
        let res = await supertest(baseUrl).get(apiEndPoint).retry(2)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer d1d4e01a37ba65d534d660d5686655280e6cda65');
        return res;
    } catch (err) {
        console.log('Error in sending GET Request: ', err);
    }
};

exports.sendPOSTRequest = async (baseUrl, apiEndPoint, content = 'Abraham is great!!!') => {
    try {
        let res = await supertest(baseUrl).post(apiEndPoint).retry(2)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer d1d4e01a37ba65d534d660d5686655280e6cda65')
            .send({"content": `${content}`});
        return res;
    } catch (err) {
        console.log('Error in sending POST Request: ', err);
    }
};

exports.sendDELETERequest = async (baseUrl, apiEndPoint, taskId) => {
    try {
        let res = await supertest(baseUrl).delete(apiEndPoint+`/${taskId}`).retry(3)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer d1d4e01a37ba65d534d660d5686655280e6cda65');
        return res;
    } catch (err) {
        console.log('Error in sending DELETE Request: ', err);
    }
};

exports.sendUPDATERequest = async (baseUrl, apiEndPoint,taskId) => {
    try {
        let res = await supertest(baseUrl).delete(apiEndPoint+`/${taskId}`).retry(3)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer d1d4e01a37ba65d534d660d5686655280e6cda65');
        return res;
    } catch (err) {
        console.log('Error in sending UPDATE Request: ', err);
    }
};