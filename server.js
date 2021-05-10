const express = require("express");
const next = require("next");
// const dotEnvResult = require('dotenv').config()

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();
    server.get("/index.html.var", (req, res) => {
      const actualPage = "/index";
      const queryParams = {code:req.query.code};
      app.render(req, res, actualPage, queryParams);
    });

    server.get("/customizations/:itemid", (req, res) => {
      const actualPage = "/customizations";
      const queryParams = { itemid: req.params.itemid,code:req.query.code };
      app.render(req, res, actualPage, queryParams);
    });

    server.get("/products-list/:slug", (req, res) => {
      const actualPage = "/products-list";
      const queryParams = { slug: req.params.slug,code:req.query.code };
      app.render(req, res, actualPage, queryParams);
    });

    server.get("/product-details/:slug", (req, res) => {
      const actualPage = "/product-details";
      const queryParams = { slug: req.params.slug ,code:req.query.code};
      app.render(req, res, actualPage, queryParams);
    });

    server.get("/my-cart", (req, res) => {
      const actualPage = "/my-cart";
      const queryParams = { code:req.query.code };
      app.render(req, res, actualPage,queryParams);
    });

    server.get("/my-measurements", (req, res) => {
      const actualPage = "/my-measurments";
      const queryParams = { code:req.query.code };
      app.render(req, res, actualPage,queryParams);
    });

    // server.get("/add-measurement", (req, res) => {
    //   const actualPage = "/addMeasurement";

    //   app.render(req, res, actualPage);
    // });
    server.get("/add-measurement/:slug", (req, res) => {
      const actualPage = "/add-measurement";
      const queryParams = { slug: req.params.slug ,code:req.query.code };
      app.render(req, res, actualPage, queryParams);
    });

    server.get("*", (req, res) => {
       return handle(req, res);
    });

    server.listen(3000, err => {
      if (err) throw err;
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
