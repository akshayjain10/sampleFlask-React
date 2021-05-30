import React from "react";
import Reflux from "reflux";
import UIC from "../UI_Components/UIC";
import { MyContext } from "../Context/MyContext";
import { Store, Actions } from "../Store/EvaluationStore";

export default class Home extends Reflux.Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.store = Store;
  }

  componentDidMount() {
    Actions.getQuestions(this.context);
  }

  onButtonClick = (value) => {
    Actions.setAnswer(value, this.context);
  };

  render() {
    const {
      error: errorMessage = "",
      questions = [],
      currentQuestionIndex = 0,
      finalResult,
    } = this.state;

    const question = questions[currentQuestionIndex];

    if (errorMessage) {
      return (
        <React.Fragment>
          <div className="d-flex" style={{ placeContent: "center" }}>
            <div
              className="content-section"
              style={{ width: "700px", height: "300px" }}
            >
              <div
                className="pb-5 pt-5 font-30"
                style={{ color: "red", textAlign: "center" }}
              >
                {errorMessage}
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    }

    if (finalResult || finalResult === 0) {
      return (
        <React.Fragment>
          <div className="d-flex" style={{ placeContent: "center" }}>
            <div
              className="content-section"
              style={{ width: "700px", height: "300px" }}
            >
              <div
                className="pt-xl-5 pb-xl-4 font-30"
                style={{ textAlign: "center" }}
              >
                Your Score is {finalResult}
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    }

    if (questions.length === 0) {
      return (
        <React.Fragment>
          <div className="d-flex" style={{ placeContent: "center" }}>
            <div
              className="content-section"
              style={{ width: "700px", height: "300px" }}
            >
              <legend
                className="pt-xl-5 pb-xl-4"
                style={{ textAlign: "center" }}
              >
                Please Wait...
              </legend>

              <div style={{ textAlign: "-webkit-center" }}>
                <div className="loader" />
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <div className="d-flex" style={{ placeContent: "center" }}>
          <div
            className="content-section"
            style={{ width: "700px", height: "300px" }}
          >
            <legend className="pt-xl-5 pb-xl-4" style={{ textAlign: "center" }}>
              Please answer the following questions
            </legend>

            {errorMessage && (
              <div className="alert alert-danger" role="alert">
                <span>{errorMessage}</span>
              </div>
            )}

            {question.question && (
              <div style={{ textAlign: "center" }}>
                <span className="font-18">{question.question}</span>
                <div className="pt-3">
                  <span className="pe-5">
                    <UIC.Button onClick={() => this.onButtonClick("Yes")}>
                      Yes
                    </UIC.Button>
                  </span>
                  <span>
                    <UIC.Button onClick={() => this.onButtonClick("No")}>
                      No
                    </UIC.Button>
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
