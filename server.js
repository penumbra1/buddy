import React from "react";
import express from "express";
import { renderToString } from "react-dom/server";
import { ServerLocation } from "@reach/router";
import fs from "fs";
import App from "./src/App";

const app = express();
const port = process.env.PORT || 3000;

fs.readFile("dist/index.html", "utf8", (err, html) => {
  const parts = html.split("Not rendered");

  // Middlewares
  app.use("/dist", express.static("dist"));
  app.use((req, res) => {
    const jsx = (
      <ServerLocation url={req.url}>
        <App />
      </ServerLocation>
    );
    res.send(`${parts[0]}${renderToString(jsx)}${parts[1]}`);
    res.end();
  });

  console.log(`Listening on ${port}`);
  app.listen(port);
});
