import { Diseases, saveToLocalStorage, clearDiseases } from "./diseases.js";
// const Medicines = [
//   {
//     medicineName : "Vitamin C",
//     code : undefined
//   },
// ]

// const Cough = [
//   {

//   }
// ]

const htmlMajor = document.querySelectorAll('.major')
const button = document.querySelector('.link-medicine-page')
const uncheckButton = document.querySelector('#uncheck-button')
const allCheckboxes = document.querySelectorAll(`input[type="checkbox"]`)
const Checkbox = {
  // get all the input inside a major
  getCheckbox(major){
    const checkboxes = major.querySelectorAll(`input[type="checkbox"]`);
    let result = []

    checkboxes.forEach((element)=>{
      result.push(element.checked)
    })

    return result
  }
}

button.addEventListener('click', ()=>{
  // Clear array
  clearDiseases()
  // Diseases.push(Checkbox.getCheckbox(htmlMajor[0]))
  htmlMajor.forEach(major=>{
    Diseases.push(Checkbox.getCheckbox(major))
  })
  console.log(Diseases)
  saveToLocalStorage(Diseases, 'Diseases')
})

uncheckButton.addEventListener('click', ()=>{
  allCheckboxes.forEach(checkbox =>{
    checkbox.checked = false
  })
})

