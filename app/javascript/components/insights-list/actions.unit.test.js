// Copyright (c) 2014 - 2023 UNICEF. All rights reserved.

import actions from "./actions";

describe("<Insights /> - Actions", () => {
  describe("properties", () => {
    const clone = { ...actions };

    after(() => {
      expect(clone).to.be.empty;
    });

    [
      "FETCH_INSIGHTS",
      "FETCH_INSIGHTS_STARTED",
      "FETCH_INSIGHTS_SUCCESS",
      "FETCH_INSIGHTS_FINISHED",
      "FETCH_INSIGHTS_FAILURE",
      "CLEAR_METADATA",
      "SET_INSIGHT_FILTERS",
      "CLEAR_INSIGHT_FILTERS"
    ].forEach(property => {
      it(`exports '${property}'`, () => {
        expect(actions).to.have.property(property);
        delete clone[property];
      });
    });
  });
});
