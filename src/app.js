const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.status(200).json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  console.log(request.body);
  const respository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };
  repositories.push(respository);
  return response.status(200).json(respository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;
  const repoIndex = repositories.findIndex(repo => repo.id == id);
  if (repoIndex < 0) {
    return response.status(400).json({ erro: "Repository not found!" });
  }
  const repository = {
    id: request.params.id,
    title,
    url,
    techs,
    likes: repositories[repoIndex].likes
  };
  repositories[repoIndex] = repository;
  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repoIndex = repositories.findIndex(repo => repo.id == id);

  if (repoIndex < 0) {
    return response.status(400).json({ erro: "Repository not found!" });
  }
  repositories.splice(repoIndex, 1);

  return response.status(204).send("ok");
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const repoIndex = repositories.findIndex(repo => repo.id == id);
  if (repoIndex < 0) {
    return response.status(400).json({ error: "Repository not found!" });
  }
  repositories[repoIndex].likes += 1;
  const repository = repositories[repoIndex];
  return response.json(repository);
});

module.exports = app;
