import React from "react";
import Formsy, { addValidationRule } from "formsy-react";
import UIC from "../UI_Components/UIC";
import { MyContext } from "../Context/MyContext";

addValidationRule("isValidNameOrLocation", function (values, value = "") {
  const len = value.length;
  return (len >= 3 && len <= 50) || len === 0;
});

addValidationRule("isValueAddress", function (values, value = "") {
  const len = value.length;
  return (len >= 3 && len <= 150) || len === 0;
});

addValidationRule("isValuePinCode", function (values, value = "") {
  const len = value.length;
  return (len >= 4 && len <= 12) || len === 0;
});

export default class Register extends React.Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = { canSubmit: false, errorMessage: "" };
    this.disableButton = this.disableButton.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.submit = this.submit.bind(this);
  }

  disableButton() {
    this.setState({ canSubmit: false });
  }

  enableButton() {
    this.setState({ canSubmit: true });
  }

  async submit(model) {
    const { fetchData } = this.context;
    const response = await fetchData("api/register", {
      method: "post",
      body: JSON.stringify(model),
    });

    if (response.error) {
      this.setState({ errorMessage: "Please check your input and try again" });
      return;
    }

    this.props.history.push("/evaluate");
  }

  render() {
    const { errorMessage, canSubmit } = this.state;

    return (
      <React.Fragment>
        <div className="d-flex" style={{ placeContent: "center" }}>
          <div className="content-section">
            <legend className="pb-xl-4">Register</legend>

            {errorMessage && (
              <div className="alert alert-danger" role="alert">
                <span>{errorMessage}</span>
              </div>
            )}

            <Formsy
              onValidSubmit={this.submit}
              onValid={this.enableButton}
              onInvalid={this.disableButton}
            >
              <UIC.Label label="Name" required />
              <div className="d-flex">
                <UIC.Input
                  name="first_name"
                  required
                  validations="isValidNameOrLocation"
                  validationError="This is not a valid name. Characters should be between: 3 - 50"
                  placeholder="First Name"
                  parentClassName="pe-5"
                />

                <UIC.Input
                  name="last_name"
                  validations="isValidNameOrLocation"
                  validationError="This is not a valid name. Characters should be between: 3 - 50"
                  placeholder="Last Name (optional)"
                />
              </div>

              <UIC.Label label="Date Of Birth" required />
              <UIC.Input
                name="date_of_birth"
                required
                type="date"
                validations="isLength:10"
                validationError="This is not a valid Date"
                min="1901-01-01"
                max="2021-11-20"
              />

              <UIC.Label label="Address" horizontal required />

              <div className="d-flex">
                <UIC.Input
                  name="address_line_1"
                  required
                  validations="isValueAddress"
                  validationError="Characters should be between: 3 - 150"
                  placeholder="Address Line 1"
                  parentClassName="pe-5"
                />
                <UIC.Input
                  name="address_line_2"
                  validations="isValueAddress"
                  validationError="Characters should be between: 3 - 150"
                  placeholder="Address Line 2 (optional)"
                />
              </div>
              <div className="d-flex">
                <UIC.Input
                  name="city"
                  placeholder="City (optional)"
                  parentClassName="pe-5"
                  validations="isValidNameOrLocation"
                  validationError="Characters should be between: 3 - 50"
                />
                <UIC.Input
                  name="state"
                  placeholder="State (optional)"
                  validations="isValidNameOrLocation"
                  validationError="Characters should be between: 3 - 50"
                />
              </div>
              <div className="d-flex">
                <UIC.Input
                  name="country"
                  placeholder="Country (optional)"
                  parentClassName="pe-5"
                  validations="isValidNameOrLocation"
                  validationError="Characters should be between: 3 - 50"
                />
                <UIC.Input
                  name="pincode"
                  type="number"
                  validations="isValuePinCode"
                  validationError="Only Numbers allowed between 4 - 12 "
                  required
                  placeholder="Pin-code"
                />
              </div>

              <div className="d-flex pt-xl-3">
                <UIC.Button
                  type="submit"
                  className={!canSubmit ? "cursor-disable" : ""}
                  disabled={!canSubmit}
                >
                  Register
                </UIC.Button>
              </div>
            </Formsy>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
