import { formatIsoDuration, parseIsoDuration } from ".";

describe("parseIsoDuration", () => {
  it("parses date and time components", () => {
    expect(parseIsoDuration("P1Y2M10DT2H30M15S")).toEqual({
      year: 1,
      month: 2,
      day: 10,
      hour: 2,
      minute: 30,
      second: 15,
    });
  });

  it("parses weeks", () => {
    expect(parseIsoDuration("P2W")).toEqual({ week: 2 });
  });

  it("parses a fraction on the smallest component", () => {
    expect(parseIsoDuration("PT1,5H")).toEqual({ hour: 1.5 });
    expect(parseIsoDuration("P1Y0.5M")).toEqual({ year: 1, month: 0.5 });
  });

  it.each(["", "P", "PT", "P1YT", "1Y", "P1H", "PT1D", "P1.5Y2M", "P-1Y", "p1y", "P1M1Y", "foo"])(
    "rejects invalid value %p",
    (value) => {
      expect(parseIsoDuration(value)).toBeUndefined();
    },
  );
});

describe("formatIsoDuration", () => {
  it("formats in nb", () => {
    expect(formatIsoDuration("P1Y6M", "nb")).toBe("1 år og 6 måneder");
    expect(formatIsoDuration("P3M", "nb")).toBe("3 måneder");
    expect(formatIsoDuration("P1Y2M3D", "nb")).toBe("1 år, 2 måneder og 3 døgn");
  });

  it("formats in nn", () => {
    expect(formatIsoDuration("P2M1W", "nn")).toBe("2 månadar og 1 veke");
  });

  it("formats in en", () => {
    expect(formatIsoDuration("P1Y2M3D", "en")).toBe("1 year, 2 months and 3 days");
    expect(formatIsoDuration("PT1H30M", "en")).toBe("1 hour and 30 minutes");
  });

  it("skips zero components", () => {
    expect(formatIsoDuration("P1Y0M", "en")).toBe("1 year");
  });

  it("shows the smallest unit for an all-zero duration", () => {
    expect(formatIsoDuration("P0D", "en")).toBe("0 days");
  });

  it("returns the original value when invalid", () => {
    expect(formatIsoDuration("6 months", "en")).toBe("6 months");
    expect(formatIsoDuration("P", "nb")).toBe("P");
  });

  it("returns an empty string for missing values", () => {
    expect(formatIsoDuration(undefined, "nb")).toBe("");
  });
});
