const form = document.querySelector('#addUser');
const inputsName = ['name','intialbalance'];

const readFromStorage = (storageKey="users") =>{
    let data
    try{
        data = JSON.parse(localStorage.getItem(storageKey)) || []
        if(!Array.isArray(data)) throw new Error("not an array")
    }
    catch(err){
        data = []
    }
    return data
}
// write to storage
const writeToStorage = (data=[], storageKey="users")=>{
    localStorage.setItem(storageKey, JSON.stringify(data))
}

form.addEventListener("submit", function(e){
e.preventDefault();
let user = {
    id:Date.now(),
    accountNum: Math.round(Math.random() * 90000),
    transactions: []
}
console.log(this)

inputsName.forEach(input => user[input]=this.elements[input].value);
const storage  = readFromStorage()
storage.push(user);
writeToStorage(storage)

})
