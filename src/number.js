function number() {
  var div = document.createElement("div");
  div.innerHTML = 9999;
  div.onclick = function () {
    div.innerHTML = parseInt(div.innerHTML) + 1;
  };
  document.body.appendChild(div);
}

export default number;
