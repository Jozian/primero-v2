import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Radio,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  List,
  ListSubheader,
  Divider,
  makeStyles
} from "@material-ui/core";
import { useDispatch, useSelector, batch } from "react-redux";
import clsx from "clsx";

import ActionDialog from "../../../../../action-dialog";
import {
  TEXT_FIELD,
  TEXT_AREA,
  TICK_FIELD,
  DATE_FIELD,
  SEPARATOR,
  NUMERIC_FIELD,
  RADIO_FIELD,
  SELECT_FIELD,
  SUBFORM_SECTION
} from "../../../../../form";
import { setDialog } from "../../../../../record-actions/action-creators";
import { ADMIN_FIELDS_DIALOG } from "../field-dialog/constants";
import { useI18n } from "../../../../../i18n";
import { NEW_FIELD } from "../../constants";
import { setNewField, setTemporarySubform } from "../../action-creators";
import { selectDialog } from "../../../../../record-actions/selectors";
import { CUSTOM_FIELD_DIALOG } from "../custom-field-dialog/constants";
import {
  DateInput,
  Seperator,
  TickBoxInput,
  TextAreaInput,
  TextInput,
  NumericInput,
  RadioInput,
  SelectInput,
  MultiSelectInput,
  DateAndTimeInput,
  SubformField
} from "../../../../../../images/primero-icons";

import styles from "./styles.css";
import {
  CUSTOM_FIELD_SELECTOR_DIALOG,
  DATE_TIME_FIELD,
  NAME,
  MULTI_SELECT_FIELD
} from "./constants";

const fields = [
  [TEXT_FIELD, TextInput],
  [TEXT_AREA, TextAreaInput],
  [TICK_FIELD, TickBoxInput],
  [SELECT_FIELD, SelectInput],
  [RADIO_FIELD, RadioInput],
  [MULTI_SELECT_FIELD, MultiSelectInput],
  [NUMERIC_FIELD, NumericInput],
  [DATE_FIELD, DateInput],
  [DATE_TIME_FIELD, DateAndTimeInput],
  // [DATE_FIELD, DateRangeInput],
  [SEPARATOR, Seperator],
  [SUBFORM_SECTION, SubformField]
];

const Component = ({ isSubform }) => {
  const [selectedItem, setSelectedItem] = useState("");
  const dispatch = useDispatch();
  const i18n = useI18n();
  const css = makeStyles(styles)();
  const openFieldSelectorDialog = useSelector(state =>
    selectDialog(state, CUSTOM_FIELD_SELECTOR_DIALOG)
  );

  useEffect(() => {
    setSelectedItem("");
  }, [openFieldSelectorDialog]);

  const handleListItem = item => {
    setSelectedItem(item);
  };

  const isItemSelected = item => selectedItem === item;

  const handleSelected = () => {
    const newFieldAttributtes = {
      name: NEW_FIELD,
      type: selectedItem,
      visible: true,
      mobile_visible: true,
      hide_on_view_page: false,
      disabled: false
    };
    const multiSelectAttributtes = selectedItem === MULTI_SELECT_FIELD && {
      type: SELECT_FIELD,
      multi_select: true
    };
    const dateTimeAttributtes = selectedItem === DATE_TIME_FIELD && {
      type: DATE_FIELD,
      date_include_time: true
    };

    batch(() => {
      dispatch(
        setDialog({
          dialog: CUSTOM_FIELD_SELECTOR_DIALOG,
          open: false
        })
      );
      dispatch(
        setDialog({
          dialog: ADMIN_FIELDS_DIALOG,
          open: true
        })
      );
      dispatch(
        setNewField(
          {
            ...newFieldAttributtes,
            ...multiSelectAttributtes,
            ...dateTimeAttributtes
          },
          isSubform
        )
      );

      if (selectedItem === SUBFORM_SECTION) {
        const selectedSubformParams = {
          temp_id: Math.floor(Math.random() * 1000),
          isSubformNew: true
        };

        dispatch(
          setTemporarySubform({
            ...newFieldAttributtes,
            ...selectedSubformParams
          })
        );
      }
    });
  };

  const handleClose = () => {
    batch(() => {
      dispatch(
        setDialog({ dialog: CUSTOM_FIELD_SELECTOR_DIALOG, open: false })
      );
      if (selectedItem === "") {
        dispatch(setDialog({ dialog: CUSTOM_FIELD_DIALOG, open: true }));
      }
    });
  };

  return (
    <>
      <ActionDialog
        dialogTitle={i18n.t("fields.create_field")}
        open={openFieldSelectorDialog}
        enabledSuccessButton={selectedItem !== ""}
        confirmButtonLabel={i18n.t("buttons.select")}
        successHandler={handleSelected}
        cancelHandler={handleClose}
      >
        <List>
          <ListSubheader>
            <ListItemText className={css.listHeader}>
              {i18n.t("forms.type_label")}
            </ListItemText>
            <ListItemSecondaryAction className={css.listHeader}>
              {i18n.t("forms.select_label")}
            </ListItemSecondaryAction>
          </ListSubheader>
          <Divider />
          {fields.map(field => {
            const [name, Icon] = field;

            if (name === SUBFORM_SECTION && isSubform) {
              return null;
            }

            return (
              <React.Fragment key={field}>
                <ListItem
                  selected={isItemSelected(name)}
                  onClick={() => handleListItem(name)}
                >
                  <ListItemText className={css.label}>
                    <div>{i18n.t(`fields.${name}`)}</div>
                    <div className={css.inputPreviewContainer}>
                      <Icon
                        className={clsx(css.inputIcon, {
                          [css.inputIconTickBox]: [
                            RADIO_FIELD,
                            TICK_FIELD
                          ].includes(name)
                        })}
                      />
                    </div>
                  </ListItemText>
                  <ListItemSecondaryAction>
                    <Radio
                      value={name}
                      checked={isItemSelected(name)}
                      onChange={() => handleListItem(name)}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
              </React.Fragment>
            );
          })}
        </List>
      </ActionDialog>
    </>
  );
};

Component.displayName = NAME;

Component.propTypes = {
  isSubform: PropTypes.bool
};

export default Component;
