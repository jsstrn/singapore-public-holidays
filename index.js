const fetch = require("node-fetch");
const parser = require("./lib/parser");

const url = "https://www.mom.gov.sg/employment-practices/public-holidays";

fetch(url)
  .then(res => res.text())
  .then(html => {
    const year = new Date().getFullYear();
    const holidays = parser(html).holidays(year);
    console.log(holidays);
  });
