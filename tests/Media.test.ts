import * as request from "supertest";
import { mediaBody, app } from "./helpers";

test("should create a media successfully", async () => {
    const { body, status } = await request(app)
        .post("/")
        .send(mediaBody);

    expect(body).toHaveProperty("watched");
    expect(body).toHaveProperty("expired");
    expect(status).toBe(201);
});

test("should failt to create a media with existing ID", async () => {
    const { body, status } = await request(app)
        .post("/")
        .send(mediaBody);

    expect(status).toBe(400);
});

test("should failt to create a media with invalida data", async () => {
    const { status } = await request(app)
        .post("/")
        .send({
            ...mediaBody,
            title: null,
            id: ""
        });

    expect(status).toBe(400);
});

test("should get the media passing a valid ID", async () => {
    const { body, status } = await request(app).get(`/${mediaBody.id}`);

    expect(body.watched).toBe(false);
    expect(status).toBe(200);
});

test("should return not found when ID is invalid", async () => {
    const { status } = await request(app).get(`/2`);

    expect(status).toBe(404);
});

test("should return watched true the second time", async () => {
    const { body, status } = await request(app).get(`/${mediaBody.id}`);

    expect(body.watched).toBe(true);
    expect(status).toBe(200);
});

test("shoud update a media", async () => {
    const updatedTitle = "New Title";
    const { body, status } = await request(app)
        .put(`/${mediaBody.id}`)
        .send({
            ...mediaBody,
            title: updatedTitle
        });

    expect(body.id).toBe(mediaBody.id);
    expect(body.title).toMatch(updatedTitle);
    expect(body.watched).toBe(false);
    expect(status).toBe(200);
});

test("should delete a media", async () => {
    const { status: deleteStatus } = await request(app).delete(`/${mediaBody.id}`);
    const { status } = await request(app).get(`/${mediaBody.id}`);

    expect(deleteStatus).toBe(204);
    expect(status).toBe(404);
});