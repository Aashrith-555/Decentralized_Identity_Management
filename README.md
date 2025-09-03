# Decentralized_Identity_Management

This project is a **small demo of Decentralized Identity (DID) and Verifiable Credentials (VCs)**.  
It showcases how to **generate a DID**, **issue a credential**, and **verify a credential** using Node.js and `did-jwt`.

---

## 📌 What this project does
- Generates a DID (`did:key`) on startup  
- Exposes REST API endpoints:
  - `GET /did` → Returns the DID
  - `POST /issue` → Issues (signs) a credential with a private key
  - `POST /verify` → Verifies a signed credential  
- Demonstrates the basic lifecycle of a DID system:  
  **Create → Issue → Verify**

---

## ⚙️ How it works
1. A DID (Decentralized Identifier) is created using an Ed25519 key pair.  
2. When you send a message to `/issue`, the server signs it and returns a **Verifiable Credential**.  
3. The `/verify` endpoint checks the credential’s signature and ensures it matches the DID document.  

---

## 🖥️ Prerequisites

Before running, make sure you have:
- **Node.js** (>= 18 recommended) → [Download](https://nodejs.org/)  
- **npm** (comes with Node.js)  
- **Visual Studio Code** (for editing/running the project)  
- **cURL** or **PowerShell** (to test endpoints)

---

## 🚀 Installation & Setup

Clone the repository and install dependencies:

```bash
git clone https://github.com/<your-username>/decentralized-identity.git
cd decentralized-identity
npm install
```

---

## API End Points
- **Get DID:** curl http://localhost:3000/did
- **Issue Credential:** 
Invoke-RestMethod -Method Post -Uri http://localhost:3000/issue `
-ContentType "application/json" `
-Body '{"message":"Hello from Aashrith"}'
- **Verify Credential:** 
Invoke-RestMethod -Method Post -Uri http://localhost:3000/verify `
-ContentType "application/json" `
-Body (@{credential=$cred.credential} | ConvertTo-Json)

---

## Dependencies Used
- express:REST API framework
- body-parser:JSON parsing
- did-jwt:Signing and Verifying credentials
- @stablelib/ed25519:Key generation
- did-resolver:DID resolution
- key-did-resolver:`did:key` support

---

## 🌍 Applications
This demo project demonstrates the basics of **Decentralized Identity**, which has applications in:
- Digital ID and secure logins
- Education (digital certificates, transcripts)
- Healthcare (verifiable medical records)
- Banking & Finance (KYC credentials)
- Government IDs and licenses
- IoT device authentication
- Enterprise access management
- Web3 and decentralized apps
