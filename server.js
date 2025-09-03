import express from "express";
import bodyParser from "body-parser";
import { DID } from "dids";
import KeyDidResolver from "key-did-resolver";
import { Ed25519Provider } from "key-did-provider-ed25519";
import * as uint8arrays from "uint8arrays";

// Setup Express
const app = express();
app.use(bodyParser.json());

// Generate a key for the DID
const seed = uint8arrays.fromString("12345678901234567890123456789012", "utf-8"); // 32-byte seed
const provider = new Ed25519Provider(seed);
const did = new DID({
  provider,
  resolver: KeyDidResolver.getResolver(),
});

// Authenticate DID
await did.authenticate();

// Endpoint: Get your DID
app.get("/did", (req, res) => {
  res.json({ did: did.id });
});

// Endpoint: Issue a credential
app.post("/issue", async (req, res) => {
  const payload = { message: req.body.message || "Hello from my DID!" };
  const jws = await did.createJWS(payload);
  res.json({ credential: jws });
});

// Endpoint: Verify a credential
app.post("/verify", async (req, res) => {
  try {
    const { credential } = req.body;
    const verified = await did.verifyJWS(credential);
    res.json({ verified });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Start server
app.listen(3000, () => {
  console.log("DID server running at http://localhost:3000");
});
