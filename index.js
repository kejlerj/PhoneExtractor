const app = require("express")();
const axios = require("axios");
require("dotenv").config();

const getPhoneNumber = async (company, address, siren) => {
  const googleSearch ="https://www.google.com/search?q=";
  const re = /(?:(?:\+|00)33|\(\+33\)|0)\s*[1-9](?:\s*\d{2}){4}/m;

  return await axios
    .get(`${googleSearch} ${company} ${address} ${siren}`)
    .then((res) => {
      const phone = res.data.match(re);
      return phone?.length ? phone[0] : undefined;
    })
    .catch((err) => console.log(err));
};

app.get("/", async (req, res) => {
  const company = req.query.company;
  const address = req.query.address ?? "";
  const siren = req.query.siren ?? "";

  if (!company) return res.status(400).send("You should specify a company");

  let phone = await getPhoneNumber(company, address, siren);
  phone = phone?.replaceAll(" ", "");
  res.json({ phone }).send();
});

// Error handling
app.use((err, req, res) => {
  console.error("Error", err);
  res.status(500).send();
});

if (process.env.NODE_ENV !== "test") {
  // Launch the server
  app.listen(process.env.PORT ?? 3000, () =>
    console.log(`App listening at http://localhost:${process.env.PORT ?? 3000}`)
  );
}

module.exports = app;
