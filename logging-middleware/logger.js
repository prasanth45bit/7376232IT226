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
      LOG_API,
      {
        stack,
        level,
        package: packageName,
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
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