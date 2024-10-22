
import { RECORD_PATH } from "../../../../config";
import actions from "./actions";
export const fetchMessages = params => {
    const { data } = params || {};

    return {
        type: actions.FETCH_MESSAGES,
        api: {
            path: RECORD_PATH.messages,
            params: data
        }
    }
}