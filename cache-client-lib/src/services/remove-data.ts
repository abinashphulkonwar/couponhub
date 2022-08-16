import { request } from "http";

function removeData(id: string) {
  const postData = JSON.stringify({
    id: id,
  });

  return new Promise<void>((resolve, reject): any => {
    const req = request(
      {
        hostname: "localhost",
        port: 8080,
        path: "/",
        agent: false,
        method: "DELETE",
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

export { removeData };
