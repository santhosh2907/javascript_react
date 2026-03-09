const items = [
  { name: "Edward", value: 21 },
  { name: "Sharpe", value: 37 },
  { name: "And", value: 45 },
  { name: "The", value: -12 },
  { name: "Magnetic", value: 13 },
  { name: "Zeros", value: 37 },
];

const arraySort = items.sort((a, b) => a.value - b.value);
console.log(arraySort);

const arraySort1 = items.sort((a, b) => {
  const nameA = a.name.toUpperCase()
  const nameB = b.name.toUpperCase()
  if(nameA < nameB){
    return -1
  }else if(nameA > nameB){
    return 1
  }else{
    return 0
  }
})


console.log(arraySort1)