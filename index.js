// const apis = require("./config/api-config");
// const PORT = 4646;

// apis.app.listen(process.env.PORT || PORT, function() {
//     console.log("server connected to port: " + PORT);
// });

const cluster = require("cluster");
const http = require("http");
const os = require("os");

const numCPUs = os.cpus().length;
console.log("numCPUs ", numCPUs);

if (cluster.isMaster) {
  console.log(`Master process ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => {
    console.log(`Worker ${worker.process.pid} died. Forking a new one.`);
    cluster.fork();
  });
} else {
  http
    .createServer((req, res) => {
      res.writeHead(200);
      res.end(`Handled by worker ${process.pid}`);
    })
    .listen(3000);

  console.log(`Worker ${process.pid} started`);
}
