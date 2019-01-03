import React from "react";
import express from "express";
import { renderToString } from "react-dom/server";
import { ServerLocation } from "@reach/router";
import fs from "fs";
import path from "path";
import App from "../src/App";

const app = express();
const port = process.env.PORT || 3000;

fs.readFile(
  path.join(__dirname, "../client/index.html"),
  "utf8",
  (err, html) => {
    const parts = html.split("Not rendered");

    // Middlewares
    app.use("/dist", express.static(path.join(__dirname, "../client")));
    app.use((req, res) => {
      const jsx = (
        <ServerLocation url={req.url}>
          <App />
        </ServerLocation>
      );
      const html = renderToString(jsx);
      res.send(`${parts[0]}${html}${parts[1]}`);
      res.end();
    });

    console.log(`Listening on ${port}`);
    app.listen(port);
  }
);
