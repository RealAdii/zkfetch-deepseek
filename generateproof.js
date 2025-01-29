const { ReclaimClient } = require("@reclaimprotocol/zk-fetch");
require('dotenv').config();

const client = new ReclaimClient(
  "0x4C197DB6b90959F901E16D42ACa81D0883A19CC4",
  "0x5275388c2148ad3faca43fbd771f3db28c205cc609c1e1f27495b48de00d544b"
);

const publicOptions = {
  method: "POST",
  body: JSON.stringify({
    model: "deepseek/deepseek-r1-distill-llama-70b",
    messages: [
      {
        role: "user",
        content: "What is the meaning of life?",
      },
    ],
  }),
};
const privateOptions = {
  headers: {
    "Authorization": `Bearer ${process.env.DEEPKSEEK}`,
    "Content-Type": "application/json",
  },
};

const fn = async () => {
  const proof = await client.zkFetch(
    "https://openrouter.ai/api/v1/chat/completions",
    publicOptions,
    privateOptions
  );
  return proof;
};

fn().then((data) => {
  require('fs').writeFileSync('output.txt', JSON.stringify(data, null, 2));
  process.exit(0);
});