const { API_VERSION } = require("../src/constants.js");
const request = require("supertest");
const { app } = require("../src/app.js");
const User = require("../src/models/user.models.js");

const { setupDatabase, userOne, userOneId } = require("./fixtures/db.js");

beforeEach(setupDatabase);

test("Should create a new user", async () => {
    const response = await request(app).post(`${API_VERSION}/users`).send({
        name: "akashdeep",
        email: "akashkataria@example.com",
        phone: "+91 2345654321",
        password: "mypasswd777"
    }).expect(201);

    const user = await User.findOne({ email: "akashkataria@example.com" });
    expect(user).not.toBeNull();

    expect(response.body.data).toMatchObject({
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        token: user.token
    });
    expect(user.password).not.toBe("mypassed777");
});

test("Should get a user by id", async () => {
    await request(app).get(`${API_VERSION}/users/${userOneId}`)
        .send()
        .expect(200);
});

test("Should get all users", async () => {
    await request(app).get(`${API_VERSION}/users/`)
        .send()
        .expect(200);
});

test("Should delete an authenticated user", async () => {
    await request(app).delete(`${API_VERSION}/users/${userOneId}`)
        .send()
        .set('Authorization', `Bearer ${userOne.token}`)
        .expect(200);

    const user = await User.findById(userOneId);
    expect(user).toBeNull();
});

test("Should not delete an unauthenticated user", async () => {
    await request(app).delete(`${API_VERSION}/users/${userOneId}`)
        .send()
        .expect(401);
});

test("Should update valid user fields", async () => {
    console.log(userOneId);
    await request(app).put(`${API_VERSION}/users/${userOneId}`)
        .set("Authorization", `Bearer ${userOne.token}`)
        .send({ name: "john" })
        .expect(200);

    const user = await User.findById(userOneId);
    expect(user.name).toEqual("john");
});

test("Should not update invalid user fields", async () => {
    await request(app).put(`${API_VERSION}/users/${userOneId}`)
        .set("Authorization", `Bearer ${userOne.token}`)
        .send({ location: "Patiala" })
        .expect(400);
});