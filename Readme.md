# function-contract

> Runtime contract validation for API responses and function outputs.  
Catch backend ↔ frontend data mismatches before they break your app.

---

## 🚀 Why function-contract?

In real projects, frontend and backend often go out of sync.

Frontend expects:

```json
{ "id": 1, "name": "Sourav" }
```
###No crash… but the UI breaks silently 😓
function-contract detects these issues immediately at runtime.

---

## 📦 Installation
```
npm install function-contract
```
---

🔧 Basic Usage (API Response Validation)

```
import contract from "function-contract"

const userContract = contract("GET /api/user", {
  id: "number",
  name: "string",
  email: "string",
  profile: {
    age: "number",
    isActive: "boolean"
  }
})

fetch("http://localhost:3000/api/user")
  .then(res => res.json())
  .then(userContract) // 👈 Validation happens here
  .then(data => console.log("✅ Valid user:", data))
  .catch(err => console.error("❌ Error:", err.message))
```
---
 ### Example Contract Violation

If backend returns:
```
{
  "userId": 1,
  "name": "Sourav",
  "profile": { "age": "22" }
}
```

## You’ll see:
```
❌ CONTRACT VIOLATION in "GET /api/user"
 - Missing field: id
 - Missing field: email
 - Type mismatch at profile.age: expected number, got string
```
## Usage for Function Output Validation

You can validate any function’s return value.

```
const calculateTotal = () => ({ total: "500" })

const totalContract = contract("calculateTotal()", {
  total: "number"
})

totalContract(calculateTotal()) // ❌ Throws or logs error
```
## ⚙️ Options

```
contract("API_NAME", schema, {
  log: true,        // Log errors to console (default: true)
  throwError: false // Throw error instead of just logging (default: false)
})
```
### Example with strict mode:

```
const strictContract = contract("User API", schema, {
  throwError: true
})
```
## 💡 When to Use

✔ API response validation
✔ Microservice communication
✔ Function output validation
✔ Debugging frontend-backend integration
✔ Preventing silent UI failures

## ⚠️ Important Notes

This is a runtime validation tool, not a replacement for TypeScript.

Works in Node.js and modern browsers.

Uses typeof checks, so custom class validation is not included (yet).

🔮 Roadmap

 Optional fields support

 Array item validation

 Express middleware integration

 TypeScript type inference

 Custom validators (email, uuid, etc.)

## 🤝 Contributing

Pull requests are welcome!
If you find a bug or want a feature, open an issue on GitHub.

## 🐛 Issues & Support

Report bugs here:
## 👨‍💻 Author

**Sourav Kumar**  
GitHub: https://github.com/sourav842741

---
### 📜 License

MIT © Sourav Kumar
```

---


After saving:

```bash
npm version patch
npm publish
```
