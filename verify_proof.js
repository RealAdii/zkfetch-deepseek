const { verifyProof } = require("@reclaimprotocol/js-sdk");

const proof = require("fs").readFileSync("./output.txt", "utf8");

const fn = async () => {
  const isValidProof = await verifyProof(JSON.parse(proof));
  console.log(isValidProof);
};

fn();