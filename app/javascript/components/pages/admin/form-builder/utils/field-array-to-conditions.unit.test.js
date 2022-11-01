import fieldArrayToConditions from "./field-array-to-conditions";

describe("fieldArrayToConditions", () => {
  it("should return a conditions object", () => {
    const conditionArray = [
      { attribute: "field_1", value: "value1", constraint: "eq" },
      { attribute: "field_2", value: "value2", constraint: "gt" }
    ];

    const expected = { and: [{ eq: { field_1: "value1" } }, { gt: { field_2: "value2" } }] };

    expect(fieldArrayToConditions(conditionArray)).to.deep.equal(expected);
  });

  it("should return an IN condition for an array value", () => {
    const conditionArray = [{ attribute: "field_1", value: ["value1", "value2"] }];

    const expected = { and: [{ in: { field_1: ["value1", "value2"] } }] };

    expect(fieldArrayToConditions(conditionArray)).to.deep.equal(expected);
  });
});
