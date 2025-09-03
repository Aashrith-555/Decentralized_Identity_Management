import express from "express";
import { createJWT, verifyJWT, EdDSASigner } from "did-jwt";
import { generateKeyPair } from "@stablelib/ed25519";
import { toString } from "uint8arrays";

const app = express();
app.use(express.json());

// Generate key pair once
const keyPair = generateKeyPair();
const privateKey32 = keyPair.secretKey.slice(0, 32);
const did = `did:key:z${toString(keyPair.publicKey, "base58btc")}`;
console.log("Your DID:", did);

// ---------------- GET /did ----------------
app.get("/did", (req, res) => {
  res.json({ did });
});

// ---------------- POST /issue ----------------
app.post("/issue", async (req, res) => {
  try {
    const payload = req.body;
    const signer = EdDSASigner(privateKey32); // Use EdDSA
    const jwt = await createJWT(payload, { issuer: did, signer });
    res.json({ credential: jwt });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------- POST /verify ----------------
app.post("/verify", async (req, res) => {
  try {
    const { credential } = req.body;
    if (!credential) return res.status(400).json({ error: "No credential provided" });

    const verified = await verifyJWT(credential, {
      resolver: {
        resolve: async () => ({
          didDocument: {
            id: did,
            verificationMethod: [
              {
                id: `${did}#keys-1`,
                type: "Ed25519VerificationKey2018",
                controller: did,
                publicKeyBase58: toString(keyPair.publicKey, "base58btc"),
              },
            ],
          },
        }),
      },
    });

    res.json({
      valid: true,
      payload: verified.payload,
      issuer: verified.issuer,
    });
  } catch (err) {
    res.json({ valid: false, error: err.message });
  }
});

app.listen(3000, () => console.log("DID server running at http://localhost:3000"));
