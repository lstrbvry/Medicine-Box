import { Diseases, getFromLocalStorage } from "./diseases.js";
import { Medicines } from "./medicines.js";
const display = document.querySelector('.display')

const Result = {
  getSurveyResult(){
    let surveyResult = []
    // Diseases.forEach(array=>{
    // array.forEach((element, index)=>{
    //   if (element){
    //     codeResult.push(index)
    //   }
    //   })
    // })

    Diseases.forEach(major=>{
      let createArray=[]
      major.forEach((minor, index)=>{
        if(minor){
          createArray.push(index)
        }
      })
      surveyResult.push(createArray)
    })
    return surveyResult //These are nested arrays, the index indicating the major, and the array of values indicating appropriate medicines
  },


  findMedMatch(surveyResult, majorsArray){
    let matchedMeds = []
    // Medicines.forEach(object =>{
    //   object.minor.forEach(medValue=>{
    //     object.major.forEach(index=>{
    //        if(surveyResult[object.major].includes(medValue)){ //This checks if medValue (element) is inside codeReslut(array)
    //       matchedMeds.push(object.medicineName)
    //     }
    //     })
    //   })
    // })

    Medicines.forEach(object =>{ //Loop through the objects
      object.major.forEach((element, majorIndex) =>{
        if(majorsArray.includes(element)){ //matched the values inside the Medicine[].major with values inside the majors array. IF true, use the index of the matched major to find the appropriate minor to match with the survey result
          object.minor[majorIndex].forEach(medCode=>{
            surveyResult.forEach(array=>{//break the nested array down into a simple array
              if(array.includes(medCode)){
                matchedMeds.push(object.medicineName)
              }
            })
          })
        }
      })
    })
    return matchedMeds
  },

  getMajorsArray(surveyResult){
    let majorsArray =[]
    surveyResult.forEach((array, index)=>{
      if(array.length > 0){
        majorsArray.push(index)
      }
    })
    return majorsArray //Get the qualified majors from the index of surveyResults and store them in array
  },

  // getMedsMatchedMajor(surveyIndex){ //match a major and return an array of minor array
  //   let matchedMinor = []
  //   Medicines.forEach(object=>{
  //     object.major.forEach(majorIndex=>{
  //       if(surveyIndex.includes(majorIndex)){
  //         matchedMinor.push(majorIndex)
  //         console.log(object.medicineName)
  //       }
  //     })
  //   })
  //   return matchedMinor
  // },

  removeDuplicates(array){
    let hash = {}
    let newUniqueArray = []
    array.forEach(element=>{
      if (!hash[element]) {//if element is not inside the hash table, return true
        hash[element] = true; // This adds a property to the hash table
        newUniqueArray.push(element); // Add it to the unique array
    }
    })
    return newUniqueArray
  },


  renderHtml(array){
    let html =``
    array.forEach(element =>{
      html += `<div class = "meds">${element}</div>`
    })
    return html
  }  
}
const surveyResult = Result.getSurveyResult()
console.log(`Survey:`)
console.log(surveyResult)
const majorsArray= Result.getMajorsArray(surveyResult)
console.log(`Index`)
console.log(majorsArray)
// const matchedMinor = Result.getMedsMatchedMajor(surveyIndex)
// console.log(matchedMinor)
let matchedMeds = Result.findMedMatch(surveyResult, majorsArray)
// console.log(`Result`)
// console.log(matchedMeds)
// let matchedMeds  = Result.findMedMatch(surveyResult)
matchedMeds = Result.removeDuplicates(matchedMeds)
// console.log(matchedMeds)
display.innerHTML = Result.renderHtml(matchedMeds) || `<div class ="no-display">There's nothing here... tick a checkbox</div>`