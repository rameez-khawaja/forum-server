const request = require("supertest");
const app = require("../app")

describe ("Api server", () => {
    let api;

    beforeAll(() => {
        api = app.listen(5005, () => {
            console.log("Test server running on port 5005")
        })
    })
    afterAll((done) => {
        console.log("Gracefully stopping test server");
        api.close(done)
    })

    describe("Checking if pages load", () =>{
        test("responds with status of 200 at /data", (done) => {
            request(api).get("/data").expect(200, done)
        })
        test("responds with status of 200 at /data/1", (done) => {
            request(api).get("/data/1").expect(200, done)
        })
    })

    // describe("Checking values of pages", () =>{
    //     test("gets correct data at /data/1", (done) => {
    //         request(api).get("/data/1").expect({
    //             "text": "Mega Corp",
    //             "giphy" : "xT4uQulxzV39haRFjG",
    //             "emojis": "👍👍👍👍"
    //         }, done)
    //     })
    // })

    describe("Checking posts", () =>{
        test("new json file should be made for post", async () => {
            await request(api)
            .post("/newpost")
            .send({
                title: "Mega Corp",
                text: "Mega",
                giphy : "xT4uQulxzV39haRFjG",
                emojis: "👍👍👍👍"})
            .expect(201)
        })
        test("new json file should be made for comment", async () => {
            await request(api)
            .post("/newcomment")
            .send({
                comment: "Mega Corp",
                id: "1"})
            .expect(201)
        })
    })

    // describe("Checking failed posts", () =>{
    //     test("new json file should return fail error message for post", (done) => {
    //         request(api)
    //         .post("/newpost")
    //         .send({
    //             title: "Mega Corp",
    //             text: "Mega",
    //             giphy : "xT4uQulxzV39haRFjG",
    //             emojis: "👍👍👍👍"})
    //         .expect(404, done)
    //     })
        // test("new json file should return fail error message for comment", (done) => {
        //     request(api)
        //     .post("/newcomment")
        //     .send({
        //         comment: "Mega Corp",
        //         id: "false"})
        //     .expect(404, done)
        // })
    // })
})
