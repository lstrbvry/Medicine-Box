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

  finalResult(matchedMeds, surveyResult){
    const finalResult = []
    matchedMeds.forEach(object=>{
      // console.log(object.medicineName.toUpperCase())
      object.major.forEach((objectMajor, objectMajorIndex)=>{
        // console.log(`object major: ${objectMajor} and objectIndex ${objectMajorIndex}:`)
        if(surveyResult[objectMajor].length> 0){
          // console.log(surveyResult[objectMajor])
          
          // console.log(`To compare minor: `)
          // console.log(object.minor[objectMajorIndex])
          object.minor[objectMajorIndex].forEach(selectedMinor=>{
            if(surveyResult[objectMajor].includes(selectedMinor)){
              finalResult.push(object.medicineName)
            }
          }
          )
        }
       
      })
    })
    return(finalResult)
  },

  findMedMatch(surveyResult, majorsArray){
    let matchedMeds = []
    Medicines.forEach(object=>{
      object.major.forEach(objectElement=>{
        majorsArray.forEach(majorElement=>{
          if(objectElement === majorElement){
            matchedMeds.push(object)
          }
        })
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
// console.log(`Survey:`)
// console.log(surveyResult)
const majorsArray= Result.getMajorsArray(surveyResult)
// console.log(`Index`)
// console.log(majorsArray)
let matchedMeds = Result.findMedMatch(surveyResult, majorsArray)
// console.log('Meds qualified')
// console.log(matchedMeds)
const finalResult = Result.removeDuplicates(Result.finalResult(matchedMeds, surveyResult))
console.log(finalResult)

display.innerHTML = Result.renderHtml(finalResult) || `<div class ="no-display">There's nothing here... tick a checkbox</div>`