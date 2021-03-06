import React, { Component } from 'react'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    // the state object holds information that can be displayed to the user and updated throughout the program
    this.state = {
      // 'phrase' is the text entered by the user - right now there are some test words hard coded to make the process of testing your code a bit faster and easier
      // ACTION ITEM: when you are ready for your full user experience, delete the test words so phrase is assigned an empty string
      phrase: '',
      // 'phraseTranslated' is what the user will see appear on the page as Pig Latin, it starts as the preset message and updates when your user clicks the 'submit' button
      phraseTranslated: 'This is where your translated sentence will appear.'
    }
  }

  // The 'myPigLatinCodeHere' function is where you will put your logic to convert the sentence entered by the user to Pig Latin

  myPigLatinCodeHere = () => {
    // the variable 'userInput' will contain the text input from the user
    // no need to change this variable
    let userInput = this.state.phrase

    // as you modify and create Pig Latin-ified words, push them into 'translatedWordsArray'
    // no need to change this variable
    let translatedWordsArray = []

    // taking the user input and spliting the text into an array of words
    let splitUserInput = userInput.toLowerCase().split(" ")
    //console.log(splitUserInput);
    // now that we have an array of words, we can map over the array and access each word

    splitUserInput.map(currentWord => {
      // ACTION ITEM: use 'currentWord' as a starting point for your code
      // your code here!
      
      // Split all words into arrays of letters
      let arrLetters = currentWord.split("")
  
      // Initialize empty variables
      var slicedArr = []
      var vowelArr = []
      var pigLatin = ""
      
      // If first letter is a vowel (excluding "y"), add "way" to the end.
      if (arrLetters[0] === "a" || arrLetters[0] === "e" || arrLetters[0] === "i" || arrLetters[0] === "o" || arrLetters[0] === "u") {
        pigLatin = currentWord + "way"
      } else {
        //Else, push index of all vowels in word to vowelArr
        arrLetters.map((letters, index) => {
          if (arrLetters[index] === "a" || arrLetters[index] === "e" || arrLetters[index] === "i" || arrLetters[index] === "o" || arrLetters[index] === "u" || arrLetters[index] === "y") {
            vowelArr.push(arrLetters[index])
          }

          // firstVowelIndex is equal to the first value in the vowelArray
          let firstVowelIndex = currentWord.indexOf(vowelArr[0])
          // slicedArr is equal to the first vowel plus the rest of the word
          slicedArr = arrLetters.slice(firstVowelIndex)
          // consonants is equal to everything before the first vowel in the word
          let consonants = arrLetters.slice(0, firstVowelIndex)
          // Turn the two arrays back into strings
          let finalString = slicedArr.join("")
          let consString = consonants.join("")
          // Add our vowel string + our consonant string + "ay" 
          pigLatin = finalString + consString + "ay"
          //Special Case: if consonant array includes "q" and the first vowel is "u", remove "u" from vowel string and add to consonant string
          if (consonants.includes("q") === true && vowelArr[0] === "u"){
            pigLatin = finalString.slice(1) + consString + vowelArr[0] + "ay"
          }
        })
      }
      // Remember: console.log is your friend :)

      // ACTION ITEM: change the value of currentWord in the push method to the name of whatever variable you made containing your Pig Latin'd word
      return translatedWordsArray.push(pigLatin)
    })




    // joining the array back to a string of translated words
    // no need to change this variable
    let translatedWords = translatedWordsArray.join(" ")

    // the setState method will take your information from 'translatedWords' and update the state object that is displayed to the user
    // no need to change this method
    this.setState({ phraseTranslated: translatedWords })
    // done!
  }

  setUpPreventDefault = (e) => {
    // this method prevents React from refreshing the page unnecessarily
    // no need to modify this method
    e.preventDefault()
    this.myPigLatinCodeHere()
  }

  handleChange = (e) => {
    // this method takes the input and saves the value in this.state.phrase so we can use the input in our program
    // no need to modify this method
    this.setState({ phrase: e.target.value })
  }

  restartGame = () => {
    // this method restarts the game by setting the original state
    // ACTION ITEM: when you are ready for your full user experience, delete the test words in phrase so that is assigned an empty string
    this.setState({
      phrase: '',
      phraseTranslated: 'This is where your translated sentence will appear.'
    })
  }

  render() {
    // the render method is where we put information on the page
    // inside the return is all our JSX tags
    return (
      <React.Fragment >
        <h1>Pig Latin Translator</h1>
        <div id="pigImage">
          <img
            src="/pepa pig logo.png"
            alt="pig with butcher cut names in pig latin"
            id="butcherPig"
          />
        </div>
        <div className="box">
          <h4>Enter phrase to be translated:</h4>
          <div className="info">
            {/* user input field - every DOM event that happens in the input will call the handleChange method and update state */}
            <input
              type="text"
              id="inputPhrase"
              onChange={this.handleChange}
              value={this.state.phrase}
              placeholder="ytray emay outway!"
            />
            <br />
            {/* button that called the setUpPreventDefault method */}
            <button onClick={this.setUpPreventDefault}>Submit</button>
            {/* button that resets the game */}
            <button id="clear" onClick={this.restartGame}>Clear</button>
          </div>
          {/* where the translated phrase will display */}
          <p id="answer">{this.state.phraseTranslated}</p>
        </div>
        <footer>Coded by ~David, Drew & Ryan~</footer>
      </React.Fragment >
    )
  }
}

export default App
