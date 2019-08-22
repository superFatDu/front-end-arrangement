function scoped() {
  let num  = 1;
  function add() {
    num ++;
  }
  function log() {
    console.log(num);
  }
  return { add, log };
}
console.log(scoped()); //  return { add, log } => { [add: [Function: add]], [log: [Function: log]] }
const { add, log } = scoped();
console.log(add); // [Function: add]
log(); // 1
add();
log(); // 2