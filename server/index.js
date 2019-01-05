import React from "react";
import express from "express";
import { renderToNodeStream } from "react-dom/server";
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
    // Middlewares
    app.use("/dist", express.static(path.join(__dirname, "../client")));
    app.use((req, res) => {
      const [htmlStart, htmlEnd] = html.split('<div id="root"></div>');
      const jsx = (
        <div id="root">
          <ServerLocation url={req.url}>
            <App />
          </ServerLocation>
        </div>
      );
      const appStream = renderToNodeStream(jsx);

      res.write(htmlStart);

      appStream.pipe(
        res,
        { end: false }
      );
      appStream.on("end", () => {
        res.write(htmlEnd);
        res.end();
      });
    });

    console.log(`Listening on ${port}`);
    app.listen(port);
  }
);
