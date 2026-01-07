const text = `
Hello world. How are you?
Hello world! I am fine.
How are you? JavaScript is fun.
`;

function checkrepeaterValues(values){
    let totalSentences = []
    let currentWord = ""
    for (let i = 0; i < values.length; i++){
        if(values[i] == "." || values[i] == "?" || values[i] == "!"){
            totalSentences.push(currentWord.trim())
            currentWord = ""
        } else {
            currentWord += values[i]
        }
    }
    let frequency = {}
    
    for(let i = 0; i < totalSentences.length; i++){
        frequency[totalSentences[i]] = (frequency[totalSentences[i]] || 0) + 1
    }
    
    let uniqueWords = []
    let repeatedValues = []
    for (let s in frequency){
        if(frequency[s] > 1){
            repeatedValues.push(s)
        }else{
            uniqueWords.push(s)
        }
    }
    
    
    return {frequency, uniqueWords, repeatedValues}
}
console.log(checkrepeaterValues(text))




//Method 2

const value = "aabbcdd"

function checkUniqueValue(value){
    const total = value.split("")
    let frequency = {}
    for(let i = 0; i < total.length; i++){
        frequency[total[i]] = ( frequency[total[i]] || 0 ) + 1
    }
    let result = null
    for (let s in frequency){
        if(frequency[s] == 1){
            result = s
        }
    }
    return result
}

console.log(checkUniqueValue(value))