const mocha = require('mocha');
const should = require('should');
const supertest = require('supertest');
const apiHelper = require('../helper/api_helpers.js');
const apiEndPointHelper = require("../helper/api_endpoints");

let baseUrl = apiEndPointHelper.baseUrl;
let apiEndPoint = apiEndPointHelper.myEndPoint;

describe('Todoist application', function () {

    describe('GET Request', function () {
        it('Should be able to get an active task', async function () {
            let res = await apiHelper.sendGETRequest(baseUrl, apiEndPoint );

            res.status.should.equal(200);

            const randomItemFromResponse = res.body[Math.floor(Math.random() * res.body.length)];

            console.log(randomItemFromResponse);
            randomItemFromResponse.should.have.property('id').which.is.a.Number();    
            randomItemFromResponse.should.have.property('assigner').which.is.a.Number();
            randomItemFromResponse.should.have.property('project_id').which.is.a.Number();
            randomItemFromResponse.should.have.property('section_id').which.is.a.Number();
            randomItemFromResponse.should.have.property('order').which.is.a.Number();    
            randomItemFromResponse.should.have.property('content').which.is.a.String();    
            randomItemFromResponse.should.have.property('completed').which.is.a.Boolean();    
            randomItemFromResponse.should.have.property('label_ids').which.is.an.Array();    
            randomItemFromResponse.should.have.property('priority').which.is.a.Number();    
            randomItemFromResponse.should.have.property('comment_count').which.is.a.Number();    
            randomItemFromResponse.should.have.property('creator').which.is.a.Number();    
            randomItemFromResponse.should.have.property('created').which.is.a.String();    
            randomItemFromResponse.should.have.property('url').which.is.a.String();    

        });
    });

    describe('POST Request', function () {
        it('Should be able to create a new task', async function () {
            let taskContent = "This is the content of my created task";

            let res = await apiHelper.sendPOSTRequest(baseUrl, apiEndPoint, taskContent);
            console.log(res.body);

            //Assert status is correct
            res.status.should.equal(200);

            //Assert Squema is correct
            res.body.should.have.property('id').which.is.a.Number();    
            res.body.should.have.property('assigner').which.is.a.Number();
            res.body.should.have.property('project_id').which.is.a.Number();
            res.body.should.have.property('section_id').which.is.a.Number();
            res.body.should.have.property('order').which.is.a.Number();    
            res.body.should.have.property('content').which.is.a.String();    
            res.body.should.have.property('completed').which.is.a.Boolean();    
            res.body.should.have.property('label_ids').which.is.an.Array();    
            res.body.should.have.property('priority').which.is.a.Number();    
            res.body.should.have.property('comment_count').which.is.a.Number();    
            res.body.should.have.property('creator').which.is.a.Number();    
            res.body.should.have.property('created').which.is.a.String();    
            res.body.should.have.property('url').which.is.a.String();
            
            //Assert some content is correct
            res.body.content.should.equal(taskContent);
        });
    });

    describe('DELETE Request', function () {
        it('Should be able to delete a task', async function () {
            //Setting up a brand new taskId to delete.
            let newTaskResponse =  await apiHelper.sendPOSTRequest(baseUrl, apiEndPoint );
            let taskId = newTaskResponse.body.id;
            console.log('this task will be deleted: '+taskId);

            //delete the task id. 
            let res = await apiHelper.sendDELETERequest(baseUrl, apiEndPoint, taskId);
            console.log(res.body);

            //Assertions 
            res.status.should.equal(204);
        });
    });

    describe('UPDATE Request', function () {
        it('Should be able to update a task', async function () {
             //Setting up a brand new taskId to be updated.
             let newTaskResponse =  await apiHelper.sendPOSTRequest(baseUrl, apiEndPoint );
             let taskId = newTaskResponse.body.id;
             console.log('this task will be updated: '+taskId);
 
             //Update the task id. 
             let res = await apiHelper.sendUPDATERequest(baseUrl, apiEndPoint, taskId);
             console.log(res.body);
 
             //Assertions 
             res.status.should.equal(204);
        });
    });
});