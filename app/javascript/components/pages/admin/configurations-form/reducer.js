import { fromJS } from "immutable";

import { SAVING } from "../../../../config";

import actions from "./actions";

const DEFAULT_STATE = fromJS({});

export default (state = DEFAULT_STATE, { type, payload }) => {
  switch (type) {
    case actions.FETCH_CONFIGURATION_STARTED:
      return state.set("loading", fromJS(payload)).set("errors", false).set("serverErrors", fromJS([]));
    case actions.FETCH_CONFIGURATION_SUCCESS:
      return state
        .set("selectedConfiguration", fromJS(payload.data))
        .set("errors", false)
        .set("serverErrors", fromJS([]));
    case actions.FETCH_CONFIGURATION_FINISHED:
      return state.set("loading", fromJS(payload));
    case actions.FETCH_CONFIGURATION_FAILURE:
    case actions.SAVE_CONFIGURATION_FAILURE:
      return state.set("errors", true).set("serverErrors", fromJS(payload.errors));
    case actions.CLEAR_SELECTED_CONFIGURATION:
      return state.set("selectedConfiguration", fromJS({})).set("errors", false).set("serverErrors", fromJS([]));
    case actions.SAVE_CONFIGURATION_STARTED:
      return state.set(SAVING, true);
    case actions.SAVE_CONFIGURATION_FINISHED:
      return state.set(SAVING, false);
    default:
      return state;
  }
};