import { request } from "http";

const getData = async () => {
  return new Promise<void>((resolve, reject) => {
    const req = request(
      {
        hostname: "localhost",
        port: 8080,
        path: "/",
        agent: false,
      },
      (res) => {
        res.on("data", (d) => {
          process.stdout.write(d);
        });
      }
    );

    req.on("error", (error) => {
      console.log(error);
    });
    req.end();
  });
};

getData();

export { getData };
