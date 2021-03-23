// const pic = require("./1.jpg");
// import "./index.css";
import React from "react";
import ReactDOM from "react-dom";

// var btn = document.createElement("button");
// btn.innerHTML = "dianji";
// document.body.appendChild(btn);

// import add from "./add";
// import number from "./number";
// // import _ from "lodash";
// // console.log(_.join(["a", "b", "c"], "**"));
// add();
// number();

// new Promise();

// if (module.hot) {
//   module.hot.accept("./number", () => {
//     number();
//   });
// }

// document.addEventListener("click", () => {
//   import(/*webpackPrefetch:true*/ "./click.js").then((res) => {
//     console.log(res.default);
//   });
// });

// export default class App extends React.Component {
//   constructor(...props) {
//     super(...props);
//     this.state = {
//       count: 1,
//     };
//   }
//   onClick() {
//     this.setState({
//       count: this.state.count + 1,
//     });
//   }
//   render() {
//     const { count } = this.state;
//     return (
//       <ul>
//         <button onClick={() => this.onClick()}>乘以{this.state.count}</button>
//         <li>{1 * count}</li>
//         <li>{2 * count}</li>
//         <li>{3 * count}</li>
//       </ul>
//     );
//   }
// }

// ReactDOM.render(<App />, document.getElementById("root"));

// import * as add from "./add";
// import * as minus from "./minus";
// export default { add, minus };

import axios from "axios";
import { extend } from "lodash";

class App extends React.Component {
  componentDidMount() {
    // axios
    //   .get(
    //     // "/seckillnew/orderService/init.action"
    //     "react/api/header.json"
    //   )
    //   .then((res) => {
    //     console.log(res, "res");
    //   });
  }
  render() {
    return <>ceshi</>;
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
