const cheerio = require("cheerio");

const parser = html => {
  const $ = cheerio.load(html);

  const holiday = (name, year) => {
    if (!name || !year) {
      throw new Error("You must provide a holiday name and a year");
    }
    return holidays(year).find(h => h.name === name.trim()) || {};
  };

  const nextDay = currentDate => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() + 1);
    const date = d.getDate();
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    return `${date} ${month} ${year}`;
  };

  const holidays = year => {
    const listOfHolidays = $(`#Year-${year} tr td.cell-holiday-name`)
      .map((_, element) => {
        const text = $(element).text();
        const nameMatcher = new RegExp("[^0-9]+");
        const name = nameMatcher.exec(text)[0].trim();

        const [date, day] = $(element)
          .children("span")
          .text()
          .split(", ");

        const notes = $(element)
          .children("em")
          .text();

        return {
          day,
          date,
          year: new Date(date).getFullYear(),
          name,
          notes
        };
      })
      .toArray();

    listOfHolidays.forEach((h, index, holidays) => {
      if (
        h.name === "Chinese New Year" &&
        new Date(h.date).toString() === "Invalid Date"
      ) {
        const [firstDay, secondDay] = h.day.split(" - ");
        const [firstDate, secondDate] = h.date.split(" - ");

        const firstDayOfChineseNewYear = {
          day: firstDay,
          date: firstDate,
          year: new Date(firstDate).getFullYear(),
          name: h.name,
          notes: h.notes
        };

        const secondDayOfChineseNewYear = {
          day: secondDay,
          date: secondDate,
          year: new Date(secondDate).getFullYear(),
          name: h.name,
          notes: h.notes
        };

        holidays.splice(
          index,
          1,
          firstDayOfChineseNewYear,
          secondDayOfChineseNewYear
        );
      }
    });

    listOfHolidays.forEach((h, i, holidays) => {
      if (h.day === "Sunday") {
        const observedHoliday = {
          day: "Monday",
          date: nextDay(h.date),
          year: new Date(h.date).getFullYear(),
          name: `${h.name} (Observed)`,
          notes: h.notes
        };

        return holidays.splice(i + 1, 0, observedHoliday);
      }
    });

    return listOfHolidays;
  };

  return {
    holiday,
    holidays
  };
};

module.exports = parser;
