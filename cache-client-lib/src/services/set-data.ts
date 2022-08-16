import { request } from "http";

interface cacheDataPostInterface {
  id: string;
  data: any;
}

function setData(data: cacheDataPostInterface) {
  const postData = JSON.stringify(data);

  return new Promise<void>((resolve, reject): any => {
    const req = request(
      {
        hostname: "localhost",
        port: 8080,
        path: "/",
        agent: false,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(postData),
        },
      },

      (res) => {
        let data = "";
        res.on("data", (chunk: Buffer) => {
          data += chunk;
        });
        res.on("end", () => {
          resolve(JSON.parse(data));
          console.log(data);
        });
      }
    );

    req.on("error", (error) => {
      console.log(error);
      reject(error);
    });
    req.write(postData);
    req.end();
  });
}

export { setData };
