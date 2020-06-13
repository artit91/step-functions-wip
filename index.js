import worker from "./macros/worker.macro";
import defaultArgs from "./macros/defaultArgs.macro";
import step from "./macros/step.macro";
import final from "./macros/final.macro";
import work from "./macros/work.macro";

async function main(state) {
  async function wait(ms) {
    await new Promise((resolve) => setTimeout(resolve, ms));
  }

  const pipeline = worker(async () => {
    defaultArgs(async () => {
      return { baseUrl: "https://picsum.photos" };
    });

    step(async (args) => {
      console.error("I'm doing some calculations...");
      await wait(1000);
      return {
        message: "Could you request an image for me, please?",
        imgUrl: `${args.baseUrl}/200/300`,
      };
    });

    step(async (args) => {
      console.error(`Thank you, I got the image: ${args.image}`);
      console.error("I'm going to resize this image...");
      await wait(1000);
      console.error("Resize done.");
      return {
        message: "Could you distribute the image, please?",
        imgBase64: "IMAGE_IN_BASE64",
      };
    });

    step(async () => {
      console.error("Cheers! Image distributed!");
      return {
        message: "Could you update the user's profile picture, please?",
      };
    });

    final(async () => {
      console.error("I'm doing some cleanup..");
      await wait(1000);
      return { message: "Goodbye!" };
    });
  });
  console.log(
    Buffer.from(JSON.stringify(await work(pipeline, state))).toString("base64")
  );
}

let state = null;

if (process.argv[2]) {
  state = JSON.parse(Buffer.from(process.argv[2], "base64").toString());
}

main(state);
