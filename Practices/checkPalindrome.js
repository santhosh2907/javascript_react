const palindrome = ["No 'x' in Nixon", "Was it a car or a cat I saw?", "tab a cat"]


function checkPalindrome(strings) {
    let result = []
    for (let i = 0; i < strings.length; i++) {
        const cleanText = strings[i].toLowerCase().replace(/[^a-z0-9]/g, "")
        const revseString = cleanText.split("").reverse().join("")
        if (cleanText === revseString) {
            result.push(true)
        } else {
            result.push(false)
        }
    }
    return result;
}

console.log(checkPalindrome(palindrome))