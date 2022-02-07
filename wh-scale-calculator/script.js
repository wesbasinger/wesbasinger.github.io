const button = document.querySelector("button");
const result = document.querySelector("#result");

const convert = () => {
  const val = document.querySelector("#mm-input").value;
  console.log(val);
  const inches = val/25.4;
  const sixtyFourScale = inches * 64;
  return sixtyFourScale / 12;
}

button.addEventListener("click", () => {
  _result = convert();
  result.innerHTML = _result + " feet";
})