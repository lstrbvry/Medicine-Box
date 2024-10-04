export let Diseases = getFromLocalStorage('Diseases')||[]

export function saveToLocalStorage(itemTosave, keyStr){
  localStorage.setItem(`${keyStr}`, JSON.stringify(itemTosave))
}

export function getFromLocalStorage(keyStr){
  return JSON.parse(localStorage.getItem(`${keyStr}`))
}

export function clearDiseases() {
  Diseases.length = 0; // Clear the array
  saveToLocalStorage(Diseases, 'Diseases');
}