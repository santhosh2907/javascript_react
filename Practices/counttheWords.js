function countWords(sentence) {
  let count = 0;
  let inWord = false;

  for (let i = 0; i < sentence.length; i++) {
    if (sentence[i] !== " " && !inWord) {
      count++;
      inWord = true;
    } else if (sentence[i] === " ") {
      inWord = false;
    }
  }

  return count;
}

console.log(countWords("JavaScript is very powerful"));