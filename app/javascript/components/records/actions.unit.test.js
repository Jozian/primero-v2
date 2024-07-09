// Copyright (c) 2014 - 2023 UNICEF. All rights reserved.

import * as actions from "./actions";

describe("records - Actions", () => {
  it("should have known actions", () => {
    const cloneActions = { ...actions };

    [
      "CASES_RECORDS",
      "CLEAR_CASE_FROM_INCIDENT",
      "CLEAR_METADATA",
      "CLEAR_RECORD_ATTACHMENTS",
      "CLEAR_SELECTED_RECORD",
      "DELETE_ATTACHMENT_SUCCESS",
      "EXTERNAL_SYNC",
      "EXTERNAL_SYNC_FAILURE",
      "EXTERNAL_SYNC_FINISHED",
      "EXTERNAL_SYNC_STARTED",
      "EXTERNAL_SYNC_SUCCESS",
      "FETCH_CASES_POTENTIAL_MATCHES",
      "FETCH_CASES_POTENTIAL_MATCHES_FAILURE",
      "FETCH_CASES_POTENTIAL_MATCHES_FINISHED",
      "FETCH_CASES_POTENTIAL_MATCHES_STARTED",
      "FETCH_CASES_POTENTIAL_MATCHES_SUCCESS",
      "FETCH_INCIDENT_FROM_CASE",
      "FETCH_INCIDENT_FROM_CASE_FAILURE",
      "FETCH_INCIDENT_FROM_CASE_FINISHED",
      "FETCH_INCIDENT_FROM_CASE_SUCCESS",
      "FETCH_RECORD_ALERTS",
      "FETCH_RECORD_ALERTS_FAILURE",
      "FETCH_RECORD_ALERTS_FINISHED",
      "FETCH_RECORD_ALERTS_STARTED",
      "FETCH_RECORD_ALERTS_SUCCESS",
      "FETCH_TRACING_REQUEST_TRACES",
      "FETCH_TRACING_REQUEST_TRACES_FAILURE",
      "FETCH_TRACING_REQUEST_TRACES_FINISHED",
      "FETCH_TRACING_REQUEST_TRACES_STARTED",
      "FETCH_TRACING_REQUEST_TRACES_SUCCESS",
      "FETCH_TRACE_POTENTIAL_MATCHES",
      "FETCH_TRACE_POTENTIAL_MATCHES_FAILURE",
      "FETCH_TRACE_POTENTIAL_MATCHES_FINISHED",
      "FETCH_TRACE_POTENTIAL_MATCHES_STARTED",
      "FETCH_TRACE_POTENTIAL_MATCHES_SUCCESS",
      "INCIDENTS_RECORDS",
      "RECORD",
      "RECORDS",
      "RECORDS_FAILURE",
      "RECORDS_FINISHED",
      "RECORDS_STARTED",
      "RECORDS_SUCCESS",
      "RECORD_FAILURE",
      "RECORD_FINISHED",
      "RECORD_STARTED",
      "RECORD_SUCCESS",
      "SAVE_ATTACHMENT_SUCCESS",
      "SAVE_RECORD",
      "SAVE_RECORD_FAILURE",
      "SAVE_RECORD_FINISHED",
      "SAVE_RECORD_STARTED",
      "SAVE_RECORD_SUCCESS",
      "SERVICE_REFERRED_SAVE",
      "SET_ATTACHMENT_STATUS",
      "SET_CASE_ID_FOR_INCIDENT",
      "SET_CASE_ID_REDIRECT",
      "SET_MACHED_CASE_FOR_TRACE",
      "SET_MACHED_CASE_FOR_TRACE_FAILURE",
      "SET_MACHED_CASE_FOR_TRACE_FINISHED",
      "SET_MACHED_CASE_FOR_TRACE_STARTED",
      "SET_MACHED_CASE_FOR_TRACE_SUCCESS",
      "SET_SELECTED_POTENTIAL_MATCH",
      "SET_SELECTED_RECORD",
      "TRACING_REQUESTS_RECORDS",
      "UPDATE_ATTACHMENTS",
      "SET_CASE_POTENTIAL_MATCH",
      "CLEAR_CASE_POTENTIAL_MATCH",
      "FETCH_CASE_MATCHED_TRACES",
      "FETCH_CASE_MATCHED_TRACES_FAILURE",
      "FETCH_CASE_MATCHED_TRACES_FINISHED",
      "FETCH_CASE_MATCHED_TRACES_STARTED",
      "FETCH_CASE_MATCHED_TRACES_SUCCESS",
      "CLEAR_MATCHED_TRACES",
      "UNMATCH_CASE_FOR_TRACE",
      "UNMATCH_CASE_FOR_TRACE_FAILURE",
      "UNMATCH_CASE_FOR_TRACE_FINISHED",
      "UNMATCH_CASE_FOR_TRACE_STARTED",
      "UNMATCH_CASE_FOR_TRACE_SUCCESS",
      "CLEAR_POTENTIAL_MATCHES",
      "OFFLINE_INCIDENT_FROM_CASE",
      "MARK_FOR_OFFLINE_FAILURE",
      "MARK_FOR_OFFLINE_SUCCESS",
      "MARK_FOR_OFFLINE_FINISHED",
      "MARK_FOR_OFFLINE_STARTED",
      "CREATE_CASE_FROM_FAMILY_MEMBER",
      "CREATE_CASE_FROM_FAMILY_MEMBER_SUCCESS",
      "CREATE_CASE_FROM_FAMILY_MEMBER_STARTED",
      "CREATE_CASE_FROM_FAMILY_MEMBER_FAILURE",
      "CREATE_CASE_FROM_FAMILY_MEMBER_FINISHED",
      "CREATE_CASE_FROM_FAMILY_DETAIL",
      "CREATE_CASE_FROM_FAMILY_DETAIL_SUCCESS",
      "CREATE_CASE_FROM_FAMILY_DETAIL_STARTED",
      "CREATE_CASE_FROM_FAMILY_DETAIL_FAILURE",
      "CREATE_CASE_FROM_FAMILY_DETAIL_FINISHED",
      "DELETE_ALERT_FROM_RECORD",
      "DELETE_ALERT_FROM_RECORD_FAILURE",
      "DELETE_ALERT_FROM_RECORD_FINISHED",
      "DELETE_ALERT_FROM_RECORD_STARTED",
      "DELETE_ALERT_FROM_RECORD_SUCCESS",
      "FETCH_LINK_INCIDENT_TO_CASE_DATA",
      "FETCH_LINK_INCIDENT_TO_CASE_DATA_SUCCESS",
      "FETCH_LINK_INCIDENT_TO_CASE_DATA_FINISHED"
    ].forEach(property => {
      expect(cloneActions).to.have.property(property);
      expect(cloneActions[property]).to.be.a("string");
      delete cloneActions[property];
    });

    expect(cloneActions).to.be.empty;
  });
});
