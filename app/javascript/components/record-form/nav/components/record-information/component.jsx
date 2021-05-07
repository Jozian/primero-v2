import { fromJS } from "immutable";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import { withRouter } from "react-router-dom";

import { checkPermissions } from "../../../../../libs/permissions";
import NavGroup from "../nav-group";
import { useI18n } from "../../../../i18n";
import { RECORD_TYPES } from "../../../../../config";
import { getPermissionsByRecord } from "../../../../user/selectors";
import { useMemoizedSelector } from "../../../../../libs";
import { getRecordInformationNav } from "../../../selectors";

import { NAME } from "./constants";

const Component = ({ open, handleClick, primeroModule, selectedForm, formGroupLookup, match, recordAlerts }) => {
  const { params } = match;
  const { recordType } = params;
  const i18n = useI18n();

  const recordInformationNav = useMemoizedSelector(state =>
    getRecordInformationNav(state, {
      checkVisible: true,
      i18n,
      recordType: RECORD_TYPES[recordType],
      primeroModule
    })
  );
  const userPermissions = useMemoizedSelector(state => getPermissionsByRecord(state, recordType));

  const forms = recordInformationNav
    .valueSeq()
    .flatMap(form => form.valueSeq())
    .reduce((acum, form) => {
      if (isEmpty(form.permission_actions) || checkPermissions(userPermissions, form.permission_actions)) {
        return acum.push(form);
      }

      return acum;
    }, fromJS([]));

  return (
    <>
      <NavGroup
        group={forms}
        handleClick={handleClick}
        open={open}
        selectedForm={selectedForm}
        formGroupLookup={formGroupLookup}
        recordAlerts={recordAlerts}
      />
    </>
  );
};

Component.displayName = NAME;

Component.propTypes = {
  formGroupLookup: PropTypes.array,
  handleClick: PropTypes.func,
  match: PropTypes.object.isRequired,
  open: PropTypes.string,
  primeroModule: PropTypes.string,
  recordAlerts: PropTypes.object,
  selectedForm: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default withRouter(Component);
