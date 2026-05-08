const axios = require("axios");
require("dotenv").config();


const LOG_API = process.env.LOG_API;
const TOKEN = process.env.TOKEN;

const validStacks = ["backend", "frontend"];

const validLevels = [
  "debug",
  "info",
  "warn",
  "error",
  "fatal",
];

const validPackages = [
  "cache",
  "controller",
  "cron_job",
  "db",
  "domain",
  "handler",
  "repository",
  "route",
  "service",
  "api",
  "component",
  "hook",
  "page",
  "state",
  "style",
  "auth",
  "config",
  "middleware",
  "utils",
];

async function Log(stack, level, packageName, message) {
  try {

    if (!validStacks.includes(stack)) {
      throw new Error("Invalid stack value");
    }


    if (!validLevels.includes(level)) {
      throw new Error("Invalid level value");
    }

    if (!validPackages.includes(packageName)) {
      throw new Error("Invalid package value");
    }

    const response = await axios.post(
      "http://4.224.186.213/evaluation-service/logs",
      {
        stack,
        level,
        package: packageName,
        message,
      },
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJwcmFzYW50aC5pdDIzQGJpdHNhdGh5LmFjLmluIiwiZXhwIjoxNzc4MjMxODY5LCJpYXQiOjE3NzgyMzA5NjksImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiIxMjNlZmFkYS1lNjdmLTRiMjgtYWE0ZS00M2U0OTkwNTQyZDMiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJwcmFzYW50aCBwIiwic3ViIjoiM2NmOWZkNjYtODY1Mi00ZDg5LTg2YmUtMjJiZTFlNmNjZDE0In0sImVtYWlsIjoicHJhc2FudGguaXQyM0BiaXRzYXRoeS5hYy5pbiIsIm5hbWUiOiJwcmFzYW50aCBwIiwicm9sbE5vIjoiNzM3NjIzMml0MjI2IiwiYWNjZXNzQ29kZSI6InVLYUpmbSIsImNsaWVudElEIjoiM2NmOWZkNjYtODY1Mi00ZDg5LTg2YmUtMjJiZTFlNmNjZDE0IiwiY2xpZW50U2VjcmV0IjoiQkJkSlV5UGVaVVFLZWhWeSJ9.lZDO56IHFn9LzYTr1XLwmTMyjRc2-HCjFsPLPAsamp8`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Log Created:", response.data);

    return response.data;

  } catch (error) {

    console.error("Logging Failed");

    if (error.response) {
      console.error(error.response.data);
    } else {
      console.error(error.message);
    }
  }
}

module.exports = Log;