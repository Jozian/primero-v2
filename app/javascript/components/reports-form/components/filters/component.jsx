import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { IconButton, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import isEmpty from "lodash/isEmpty";

import { useI18n } from "../../../i18n";
import { DATE_FIELD } from "../../../form";
import FiltersDialog from "../filters-dialog";
import FiltersList from "../filters-list";
import { DEFAULT_FILTERS, NOT_NULL, SHARED_FILTERS } from "../../constants";
import { formattedFields } from "../../utils";
import { NUMERIC_FIELD, RADIO_FIELD, SELECT_FIELD } from "../../../form/constants";
import ActionDialog from "../../../action-dialog";
import { getVisibleFieldsWithNames } from "../../../record-form/selectors";
import { useMemoizedSelector } from "../../../../libs";

import { NAME } from "./constants";
import css from "./styles.css";
import { formatValue, registerValues } from "./utils";

const Container = ({
  indexes,
  setIndexes,
  allRecordForms,
  parentFormMethods,
  reportingLocationConfig,
  formattedMinimumReportableFields,
  formMode,
  selectedRecordType,
  selectedModule
}) => {
  const i18n = useI18n();
  const sharedFilterNames = SHARED_FILTERS.map(filter => filter.attribute);

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [open, setOpen] = useState(false);
  const visibleSharedFields = useMemoizedSelector(state => getVisibleFieldsWithNames(state, sharedFilterNames));

  const onSuccess = (index, currentReportFilter, currentField) => {
    const data =
      currentField.type === DATE_FIELD && Array.isArray(currentReportFilter.value) && isEmpty(currentReportFilter.value)
        ? { ...currentReportFilter, value: formatValue(new Date(), i18n, {}) }
        : currentReportFilter;

    if ([DATE_FIELD, NUMERIC_FIELD].includes(currentField.type) && currentReportFilter.constraint === NOT_NULL) {
      data.value = "";
    }

    if (
      [SELECT_FIELD, RADIO_FIELD].includes(currentField.type) &&
      typeof currentReportFilter.constraint === "boolean" &&
      currentReportFilter.constraint
    ) {
      data.constraint = false;
      data.value = [NOT_NULL];
    }

    if (Object.is(index, null)) {
      setIndexes([...indexes, { index: indexes.length, data }]);
      registerValues(indexes.length, data, indexes, parentFormMethods);
    } else {
      const indexesCopy = [...indexes].slice();

      indexesCopy[index] = { ...indexesCopy[index], data };

      setIndexes(indexesCopy);
      registerValues(index, data, indexes, parentFormMethods);
    }
  };

  const fields = formattedFields(
    allRecordForms,
    selectedModule,
    selectedRecordType,
    i18n,
    reportingLocationConfig,
    formattedMinimumReportableFields
  );

  useEffect(() => {
    if (selectedRecordType && formMode.isNew) {
      const visibleSharedFieldNames = visibleSharedFields.map(field => field.name);
      const fieldNames = fields.map(field => field.id);

      setIndexes(
        DEFAULT_FILTERS[selectedRecordType]
          .filter(
            defaultFilter =>
              (sharedFilterNames.includes(defaultFilter.attribute) &&
                visibleSharedFieldNames.includes(defaultFilter.attribute)) ||
              (fieldNames.includes(defaultFilter.attribute) && !sharedFilterNames.includes(defaultFilter.attribute))
          )
          .map((data, index) => ({ index, data }))
      );
    }
  }, [selectedRecordType, visibleSharedFields]);

  if (!fields.length) {
    return null;
  }

  const handleNew = () => {
    setOpen(true);
  };

  const handleEdit = index => {
    setSelectedIndex(index.toString());
    setOpen(true);
  };

  const handleDelete = () => {
    const index = selectedIndex;

    setIndexes([...indexes.slice(0, parseInt(index, 10)), ...indexes.slice(parseInt(index, 10) + 1, indexes.length)]);
  };

  const handleOpenModal = index => {
    setSelectedIndex(index);
    setDeleteModal(true);
  };

  const cancelHandler = () => {
    setDeleteModal(false);
    setSelectedIndex(null);
  };

  return (
    <>
      <Typography className={css.filtersHeading}>
        {i18n.t("report.filters.label")}
        <IconButton size="small" onClick={handleNew} className={css.addFilter}>
          <AddIcon />
          {i18n.t("buttons.new")}
        </IconButton>
      </Typography>

      <FiltersList fields={fields} handleOpenModal={handleOpenModal} handleEdit={handleEdit} indexes={indexes} />

      <ActionDialog
        open={deleteModal}
        successHandler={handleDelete}
        cancelHandler={cancelHandler}
        dialogTitle={i18n.t("fields.remove")}
        dialogText={i18n.t("report.filters.delete_filter_message")}
        confirmButtonLabel={i18n.t("buttons.ok")}
      />

      <FiltersDialog
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        open={open}
        setOpen={setOpen}
        indexes={indexes}
        fields={fields}
        onSuccess={onSuccess}
      />
    </>
  );
};

Container.displayName = NAME;

Container.propTypes = {
  allRecordForms: PropTypes.object.isRequired,
  formattedMinimumReportableFields: PropTypes.object,
  formMode: PropTypes.object,
  indexes: PropTypes.array,
  parentFormMethods: PropTypes.object.isRequired,
  reportingLocationConfig: PropTypes.object,
  selectedModule: PropTypes.string,
  selectedRecordType: PropTypes.string,
  setIndexes: PropTypes.func
};

export default Container;
