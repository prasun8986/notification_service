const app = require("./app");
const startConsumer = require("./queues/consumer");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  startConsumer(); // Start worker
});
