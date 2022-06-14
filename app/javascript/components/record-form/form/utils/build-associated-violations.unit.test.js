import buildAssociatedViolations from "./build-associated-violations";

describe("buildCollapsedFields", () => {
  context("when field is not individual_victims", () => {
    it("should return null", () => {
      const result = buildAssociatedViolations("test", {});

      expect(result).to.be.null;
    });
  });

  context("when field is individual_victims", () => {
    it("should return the values for subform", () => {
      const result = buildAssociatedViolations("individual_victims", {
        violation_category: ["killing", "maiming"],
        killing: [{ unique_id: 1, another_key: "a" }],
        maiming: [
          { unique_id: 2, another_key: "b" },
          { unique_id: 3, another_key: "c" }
        ],
        attack_on_hospitals: [{ unique_id: 4, another_key: "d" }]
      });

      expect(result).to.deep.equal({
        killing: [1],
        maiming: [2, 3]
      });
    });
  });
});