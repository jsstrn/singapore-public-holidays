const parser = require("../lib/parser");
const html = require("./fixture");

describe("Parse public holidays data from HTML to JSON", () => {
  describe("holiday(name, year)", () => {
    it("returns data for Deepavali in 2020 as string", () => {
      expect(parser(html).holiday("Deepavali", "2020")).toEqual({
        day: "Saturday",
        date: "14 November 2020",
        year: 2020,
        name: "Deepavali",
        notes: ""
      });
    });

    it("returns data for Deepavali in 2019 as number", () => {
      expect(parser(html).holiday("Deepavali", 2019)).toEqual({
        day: "Sunday",
        date: "27 October 2019",
        year: 2019,
        name: "Deepavali",
        notes:
          "Monday, 28 October 2019, will be a public holiday if your rest day falls on 27 October 2019."
      });
    });

    it("returns data for Good Friday in 2018", () => {
      expect(parser(html).holiday(" Good Friday", 2018)).toEqual({
        day: "Friday",
        date: "30 March 2018",
        year: 2018,
        name: "Good Friday",
        notes: ""
      });
    });

    it("returns data for Chinese New Year in 2020", () => {
      expect(parser(html).holiday(" Chinese New Year", 2020)).toEqual({
        day: "Saturday",
        date: "25 January 2020",
        year: 2020,
        name: "Chinese New Year",
        notes:
          "Monday, 27 January 2020, will be a public holiday if your rest day falls on 26 January 2020."
      });
    });

    describe("handle edge cases", () => {
      it("throws when no holiday name is provided", () => {
        expect(() => parser(html).holiday(null, 2020)).toThrow(
          "You must provide a holiday name and a year"
        );
      });

      it("throws when no year is provided", () => {
        expect(() => parser(html).holiday()).toThrow(
          "You must provide a holiday name and a year"
        );
      });

      it("returns {} when no matches found", () => {
        expect(parser(html).holiday("Unknown Holiday", "2020")).toEqual({});
      });

      it("returns {} when the year is out of range", () => {
        expect(parser(html).holiday("Chinese New Year", "1960")).toEqual({});
      });
    });
  });

  describe("holidays(year)", () => {
    it("returns all holidays in 2020", () => {
      const year = "2020";
      expect(parser(html).holidays(year)).toEqual([
        {
          date: "1 January 2020",
          day: "Wednesday",
          name: "New Year's Day",
          notes: "",
          year: 2020
        },
        {
          date: "25 January 2020",
          day: "Saturday",
          name: "Chinese New Year",
          notes:
            "Monday, 27 January 2020, will be a public holiday if your rest day falls on 26 January 2020.",
          year: 2020
        },
        {
          date: "26 January 2020",
          day: "Sunday",
          name: "Chinese New Year",
          notes:
            "Monday, 27 January 2020, will be a public holiday if your rest day falls on 26 January 2020.",
          year: 2020
        },
        {
          date: "27 January 2020",
          day: "Monday",
          name: "Chinese New Year (Observed)",
          notes:
            "Monday, 27 January 2020, will be a public holiday if your rest day falls on 26 January 2020.",
          year: 2020
        },
        {
          date: "10 April 2020",
          day: "Friday",
          name: "Good Friday",
          notes: "",
          year: 2020
        },
        {
          date: "1 May 2020",
          day: "Friday",
          name: "Labour Day",
          notes: "",
          year: 2020
        },
        {
          date: "7 May 2020",
          day: "Thursday",
          name: "Vesak Day",
          notes: "",
          year: 2020
        },
        {
          date: "24 May 2020",
          day: "Sunday",
          name: "Hari Raya Puasa",
          notes:
            "Monday, 25 May 2020, will be a public holiday if your rest day falls on 24 May 2020.",
          year: 2020
        },
        {
          date: "25 May 2020",
          day: "Monday",
          name: "Hari Raya Puasa (Observed)",
          notes:
            "Monday, 25 May 2020, will be a public holiday if your rest day falls on 24 May 2020.",
          year: 2020
        },
        {
          date: "31 July 2020",
          day: "Friday",
          name: "Hari Raya Haji",
          notes: "",
          year: 2020
        },
        {
          date: "9 August 2020",
          day: "Sunday",
          name: "National Day",
          notes:
            "Monday, 10 August 2020, will be a public holiday if your rest day falls on 9 August 2020.",
          year: 2020
        },
        {
          date: "10 August 2020",
          day: "Monday",
          name: "National Day (Observed)",
          notes:
            "Monday, 10 August 2020, will be a public holiday if your rest day falls on 9 August 2020.",
          year: 2020
        },
        {
          date: "14 November 2020",
          day: "Saturday",
          name: "Deepavali",
          notes: "",
          year: 2020
        },
        {
          date: "25 December 2020",
          day: "Friday",
          name: "Christmas Day",
          notes: "",
          year: 2020
        }
      ]);
    });
  });
});
