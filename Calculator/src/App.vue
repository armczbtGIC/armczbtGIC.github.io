<template>
  <div id="app">
    <div class="container">
      <table>
        <tr>
          <td colspan="5">
            <div id="screen">
              <span id="screen_top">M={{memory}}</span>
              <div id="screen_bottom">
                <!-- v-text is a directive that is used to replace the content of HTML tag with private data -->
                <!-- It will update the content automatically when data is changed. It is called data reactive -->
                <span v-text="inputNumber" id="operand1">0</span>
                <span id="operator"></span>
                <span id="operand2"></span>
              </div>
              <!-- <span id="screen_bottom">0</span> -->
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <button v-on:click="memoryClear()" type="button" class="btn btn-warning">MC</button>
          </td>
          <td>
            <button v-on:click="memoryRecall()" type="button" class="btn btn-warning">MR</button>
          </td>
          <td>
            <button v-on:click="memorySubstract()" type="button" class="btn btn-warning">M-</button>
          </td>
          <td>
            <button v-on:click="memoryAdd()" type="button" class="btn btn-warning">M+</button>
          </td>
          <td>
            <button type="button" class="btn btn-light">
              <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
            </button>
          </td>
        </tr>
        <tr>
          <td>
            <button v-on:click="showNumber(7)" type="button" class="btn btn-light">7</button>
          </td>
          <td>
            <button v-on:click="showNumber(8)" type="button" class="btn btn-light">8</button>
          </td>
          <td>
            <button v-on:click="showNumber(9)" type="button" class="btn btn-light">9</button>
          </td>
          <td>
            <button v-on:click="performOperation('/')" type="button" class="btn btn-secondary">÷</button>
          </td>
          <td>
            <button v-on:click="changeSign()" type="button" class="btn btn-light">+/-</button>
          </td>
        </tr>
        <tr>
          <td>
            <button v-on:click="showNumber(4)" type="button" class="btn btn-light">4</button>
          </td>
          <td>
            <button v-on:click="showNumber(5)" type="button" class="btn btn-light">5</button>
          </td>
          <td>
            <button v-on:click="showNumber(6)" type="button" class="btn btn-light">6</button>
          </td>
          <td>
            <button v-on:click="performOperation('*')" type="button" class="btn btn-secondary">x</button>
          </td>
          <td>
            <button v-on:click="performOperation('-')" type="button" class="btn btn-secondary">-</button>
          </td>
        </tr>
        <tr>
          <td>
            <button
              v-on:click="showNumber(1)"
              type="button"
              class="btn btn-light"
            >
              1
            </button>
          </td>
          <td>
            <button v-on:click="showNumber(2)" type="button" class="btn btn-light">2</button>
          </td>
          <td>
            <button v-on:click="showNumber(3)" type="button" class="btn btn-light">3</button>
          </td>
          <td rowspan="2">
            <button v-on:click="performOperation('+')" type="button" class="btn btn-secondary long-btn">+</button>
          </td>
          <td rowspan="2">
            <button v-on:click="calculateResult()" type="button" class="btn btn-primary long-btn">=</button>
          </td>
        </tr>
        <tr>
          <td>
            <button v-on:click="clearDisplay()" type="button" class="btn btn-danger">C</button>
          </td>
          <td>
            <button v-on:click="showNumber(0)" type="button" class="btn btn-light">0</button>
          </td>
          <td>
            <button v-on:click="showNumber('.')" type="button" class="btn btn-light">.</button>
          </td>
        </tr>
      </table>
    </div>
    <div class="alert alert-danger" id="message_panel" role="alert">
      something wrong here
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {},
  data() {
    return {
      // This is the private data section which can be used inside this component
      inputNumber: "",
      operator: null,
      previousValue: null,
      history: [],
      memory: 0,
    };
  },
  methods: {
    showNumber(number) {
      // Assign number when user click to the inputNumber data
      // To access private data from methods, use (this.)
      if (number === "." && this.inputNumber.includes(".")) {
        // prevent adding more than one decimal point
        return;
      }
      this.inputNumber += number;
    },
    changeSign(){
      const save = Number(this.inputNumber);
      const res = save*-1;
      this.inputNumber = res;
    },
    clearDisplay() {
      this.inputNumber = "";
      this.operator = null;
      this.previousValue = null;
      this.history = [];
    },
    performOperation(operator) {
      if (this.operator && this.inputNumber) {
        this.calculateResult();
      }
      this.operator = operator;
      this.previousValue = Number(this.inputNumber);
      this.inputNumber = "";
      this.history.push(operator);
    },
    calculateResult() {
      const currentValue = Number(this.inputNumber);
      let result;
      switch (this.operator) {
        case "+":
          result = this.previousValue + currentValue;
          break;
        case "-":
          result = this.previousValue - currentValue;
          break;
        case "*":
          result = this.previousValue * currentValue;
          break;
        case "/":
          result = this.previousValue / currentValue;
          break;
        default:
          return;
      }
      this.history.push(currentValue);
      this.inputNumber = result.toString();
      this.operator = null;
      this.previousValue = null;
    },
    memoryClear() {
      this.memory = 0;
    },
    memoryRecall() {
      this.inputNumber = this.memory.toString();
    },
    memoryAdd() {
      const currentValue = Number(this.inputNumber);
      this.memory += currentValue;
    },
    memorySubtract() {
      const currentValue = Number(this.inputNumber);
      this.memory -= currentValue;
    }
  },
};
</script>







<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.container {
  margin-top: 10em;
  width: 300px;
  border: 1px solid black;
  padding-top: 20px;
  padding-bottom: 20px;
}
table {
  border-spacing: 7px;
  border-collapse: separate;
}
#screen {
  border: 1px solid black;
  padding: 7px;
  width: 100%;
  height: 4em;
}
#screen_top {
  display: block;
  font-size: 0.8rem;
}
#screen_bottom {
  font-size: 1.8rem;
  display: block;
  text-align: right;
}
#operand2 {
  background-color: skyblue;
}
#operator {
  background-color: rosybrown;
}
.button-row {
  display: flex;
  justify-content: space-between;
}
button {
  width: 45px;
}
.long-btn {
  display: inline-block;
  height: 80px;
}

/* Message panel */
#message_panel {
  width: 300px;
  margin-top: 1em;
  display: none;
  margin-left: auto;
  margin-right: auto;
}
</style>
