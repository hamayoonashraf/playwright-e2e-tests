import {test, expect, request} from '@playwright/test';
import constants from "../../data/constants.json";
import {log} from "../helpers/logger";
import TestData from "../../data/test-data";

test.describe("REST API demo", () => {
    let envConfig = undefined;
    test.beforeEach("Get the ENv Config", async ({request}, testInfo) =>{
        envConfig = testInfo.project.use as any;


    })

   // GET request to fetch list of users
    test("Should GET list of users", async ({request}) => {
        // Make a GET request to the API endpoint
        await log("info", `Making a GET call using: ${envConfig.apiURL}`);
        const res = await request.get(`${envConfig.apiURL}${constants.REQ_RES_ENDPOINTS.GET_USERS_LIST}`, {

            headers:{
                "x-api-key": process.env.RES_RES_API_KEY,
            },
        });

        // Assert the response status code

        expect(res.status()).toBe(200);

        await log("info", `The GET call was successful with status code: ${res.status()}`);

        // GET the list of users from the response body
        const userData = await res.json();
        log("info", `List of users data : ${JSON.stringify(userData)}`);
    })

    // Post request to create a user
     test("Should CREATe a users", async ({request}) => {
        // Make a GET request to the API endpoint
        await log("info", `Making a POST call using: ${envConfig.apiURL}`);


        const payload = TestData.apiUserCreation()[0]

        const res = await request.post(`${envConfig.apiURL}${constants.REQ_RES_ENDPOINTS.POST_USERS}`, {

            headers:{
                "x-api-key": process.env.RES_RES_API_KEY,
                "Content-Type": "application/json",
            },
            data: payload
        });

        // Assert the response status code

        expect(res.status()).toBe(201);

        await log("info", `The POST call was successful with status code: ${res.status()}`);

        // GET the list of users from the response body
        const respData = await res.json();
        log("info", `Response data from POST call : ${JSON.stringify(respData)}`);
    })

});







        // var request = require('request');
        // var options = {
        // 'method': 'GET',
        // 'url': 'https://reqres.in/api/users?page=2',
        // 'headers': {
        //     'x-api-key': 'reqres_95b1e378c1974780a9a54876e7c4e950'
        // }
        // };
        // request(options, function (error, response) {
        // if (error) throw new Error(error);
        // console.log(response.body);
        // });