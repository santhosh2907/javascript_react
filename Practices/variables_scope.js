var a = 10;
function test() {
  console.log("P1" + " " + a);
  var a = 20;
  console.log("P2" + " " + a);
}
console.log("P3" + " " + a)
test()


let x = 5;
{
  let x = 10;
}
console.log(x);

for (var i = 0; i < 3; i++) {}
console.log(i);



for (let i = 0; i < 3; i++) {}
console.log(i);


let arr = [1, 2, 3];
arr.length = 0;
console.log(arr);
