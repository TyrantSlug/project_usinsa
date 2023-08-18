const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://usinsa-apigateway-service:8000",

      changeOrigin: true,
    })
  );
};
