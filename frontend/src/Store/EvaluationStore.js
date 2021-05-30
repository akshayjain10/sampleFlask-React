import Reflux from "reflux";

export const Actions = Reflux.createActions([
  "getQuestions",
  "setAnswer",
  "clearData",
]);

export class Store extends Reflux.Store {
  constructor() {
    super();
    this.listenables = Actions;
    this.state = {
      error: "",
      questions: [],
      currentQuestionIndex: 0,
      finalResult: null,
    };
  }

  getQuestions = async (context) => {
    const { fetchData } = context;
    const response = await fetchData("api/questions", { method: "get" });
    const { error, questions = [] } = response;
    if (error) {
      this.setState({
        error: "Something went wrong and try again",
        questions: [],
      });
      return;
    }
    this.setState({ questions });
  };

  setAnswer = async (value, context) => {
    const { questions, currentQuestionIndex } = this.state;

    const updatedQuestions = questions.map((q, index) => {
      if (index === currentQuestionIndex) {
        return { ...q, answer: value };
      }
      return q;
    });

    if (currentQuestionIndex + 1 < questions.length) {
      this.setState({
        questions: updatedQuestions,
        currentQuestionIndex: currentQuestionIndex + 1,
      });
    } else {
      await this.getEvaluatedValue(updatedQuestions, context);
    }
  };

  getEvaluatedValue = async (questions, context) => {
    const { fetchData } = context;
    const evaluateData = questions.reduce((acc, cur) => {
      const { key, answer } = cur;
      return { ...acc, [key]: answer };
    }, {});

    const response = await fetchData("api/evaluate", {
      method: "post",
      body: JSON.stringify(evaluateData),
    });
    const { error, sum = 0 } = response;
    if (error) {
      this.setState({
        error: "Something went wrong and try again",
        questions: [],
      });
      return;
    }
    this.setState({ finalResult: sum });
  };

  clearData() {
    this.setState({
      error: "",
      questions: [],
      currentQuestionIndex: 0,
    });
  }
}
