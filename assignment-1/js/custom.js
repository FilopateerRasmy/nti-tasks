const addUser = document.querySelector("#addUser");
const showDiv = document.querySelector('.show');
const transactionForm = document.getElementById('transaction-form')
const userHeads = ["name", "age", "job", "country"]
const dataWrapper = document.querySelector("#dataWrapper")
const singleData = document.querySelector("#singleData")
// read from storage
const readFromStorage = (storageKey = "users") => {
    let data
    try {
        data = JSON.parse(localStorage.getItem(storageKey)) || []
        // if(!Array.isArray(data)) throw new Error("not an array")
    }
    catch (err) {
        data = []
    }
    return data
}
// write to storage
const writeToStorage = (data = [], storageKey = "users") => {
    localStorage.setItem(storageKey, JSON.stringify(data))
}
const createMyOwnElement = (parent, ele, text = null, classes = null, attributes = null) => {
    const myElement = document.createElement(ele)
    parent.appendChild(myElement)
    if (text) myElement.textContent = text
    if (classes) myElement.classList = classes
    if (attributes) {
        attributes.forEach(attr => {
            myElement.setAttribute(attr.attrName, attr.attrVal)
        })
    }
    return myElement
}
const createMyOwnElement1 = (myObj) => {
    const myElement = document.createElement(myObj.ele)
    myObj.parent.appendChild(myElement)
    if (myObj.text) myElement.textContent = myObj.text
    if (myObj.classes) myElement.classList = myObj.classes
    if (myObj.attributes) {
        myObj.attributes.forEach(attr => {
            myElement.setAttribute(attr.attrName, attr.attrVal)
        })
    }
    return myElement
}
const delUser = (allUsers, index) => {
    allUsers.splice(index, 1)
    writeToStorage(allUsers)
    drawData(allUsers)
}
const singleUserDraw = (user, index, allUsers, mainParent) => {
    singleData.textContent = ""
    const tr = createMyOwnElement(mainParent, "tr")
    createMyOwnElement(tr, "td", index + 1)
    createMyOwnElement(tr, "td", user.id)
    userHeads.forEach(head => createMyOwnElement(tr, "td", user[head]))
    const td = createMyOwnElement(tr, "td")
    const showBtn = createMyOwnElement(td, "button", "show", "btn btn-primary mx-2")
    showBtn.addEventListener("click", (e) => diplaySingleUser(user))
    const editBtn = createMyOwnElement(td, "button", "Edit", "btn btn-success mx-2")
    editBtn.addEventListener("click", () => {
        localStorage.setItem("editID", index)
        window.location.href = "edit.html"
    })
    const transaction = createMyOwnElement(td, "button", "Transaction", "btn btn-success mx-2")
    transaction.addEventListener("click", (e) => {
        localStorage.setItem("userData", JSON.stringify({ index, user }))
        window.location.href = "transaction.html"
    })
    const delBtn = createMyOwnElement(td, "button", "delete", "btn btn-danger mx-2")
    delBtn.addEventListener('click', (e) => delUser(allUsers, index));

}
const drawNoData = () => {
    const tr = createMyOwnElement(dataWrapper, "tr", null, "alert alert-danger")
    const attr = [{ attrName: "colspan", attrVal: 7 }]
    createMyOwnElement(tr, "td", "no users yet", null, attr)
}
const drawData = (allUsers) => {
    dataWrapper.innerHTML = ""
    if (allUsers.length == 0) drawNoData()
    else allUsers.forEach((user, index) => singleUserDraw(user, index, allUsers, dataWrapper))
}
// create 
if (addUser) {
    addUser.addEventListener("submit", function (e) {
        e.preventDefault()
        // console.log(this.elements.name.value)
        let user = { id: Date.now() }
        userHeads.forEach(head => user[head] = this.elements[head].value)
        const allUsers = readFromStorage()
        allUsers.push(user)
        writeToStorage(allUsers)
        this.reset()
        window.location.href = "index.html";
    })
}
// read 
if (dataWrapper) {
    const allUsers = readFromStorage()
    drawData(allUsers)
}

const editUser = document.querySelector("#editUser")
if (editUser) {
    const index = localStorage.getItem("editID")
    if (!index) window.location.href = "index.html"
    const allUsers = readFromStorage()
    userHeads.forEach(head => editUser.elements[head].value = allUsers[index][head])
    editUser.addEventListener("submit", (e) => {
        e.preventDefault()
        userHeads.forEach(head => allUsers[index][head] = editUser.elements[head].value)
        writeToStorage(allUsers)
        localStorage.removeItem("editID")
        window.location.href = "index.html"
    })
}

let transaction = ['transactionType', 'value'];

if (transactionForm) {
    transactionForm.addEventListener('submit', function (e) {

        e.preventDefault();
        const userInfo = readFromStorage('userData');
        const { user, index } = userInfo;
        const transactionType = this.elements['transactionType'].value;
        const transactionValue = +this.elements['value'].value;
        user.transactions.push({ transactionType, transactionValue });
        calculateTransactions(transactionType, user, transactionValue)
        const allUsers = readFromStorage();
        allUsers[index] = user;
        writeToStorage(allUsers)

        location.href = "index.html";
    })
}
const calculateTransactions = (type = "Add", user, value) => {
    const balance = +user.intialbalance;
    if (type === "Add") {
        user.intialbalance = value + balance
        return user
    } else {
        user.intialbalance = balance - value
        return user
    }
}

function diplaySingleUser(user){
showDiv.classList.toggle('d-none');
const {transactions}=user;
let str=``
transactions.forEach(el => {
str+= `
<tr >
<th>${el.transactionType}</th>
<th>${el.transactionValue}</th>       
</tr>

`
})
 transactionRow.innerHTML = str;

}



