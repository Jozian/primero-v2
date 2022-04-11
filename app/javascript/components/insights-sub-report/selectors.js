/* eslint-disable import/prefer-default-export */

import { fromJS } from "immutable";

import NAMESPACE from "./namespace";

export const getInsight = state => {
  return state.getIn(["records", NAMESPACE, "selectedReport"], fromJS({}));
};

export const getInsightFilter = (state, filter) => {
  return state.getIn(["records", NAMESPACE, "filters", filter]);
};

export const getIsGroupedInsight = (state, subReport) =>
  state
    .getIn(["records", NAMESPACE, "selectedReport", "report_data", subReport], fromJS({}))
    .filterNot((_value, key) => ["lookups"].includes(key))
    .valueSeq()
    .some(elems => elems.some(elem => elem.get("group_id")));
