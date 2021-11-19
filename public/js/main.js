let incomeList = document.querySelector('.incomeList')
let expanseList = document.querySelector('.expanseList')

let incomeData = JSON.parse(localStorage.getItem('income')) || []
let expanseData = JSON.parse(localStorage.getItem('expanse')) || []

incomeForm.onsubmit = (event) => {
    event.preventDefault()
    addInfo(purposeIncome.value, costIncome.value, 'income')
    purposeIncome.value = null
    costIncome.value = null
}

expanseForm.onsubmit = (event) => {
    event.preventDefault(+costExpense.value <= +total.value)
    if (+costExpense.value > +total.textContent) 
        alert('Sarflash uchun sizda buncha pul yo\'q');
    else 
        addInfo(purposeExpense.value, costExpense.value, 'expanse');
    purposeExpense.value = null
    costExpense.value = null
}

function addInfo(purpose, cost, type) {
    data = type== 'income' ? JSON.parse(localStorage.getItem('income')) || [] : JSON.parse(localStorage.getItem('expanse')) || []
    id = data[data.length - 1] ? data[data.length - 1].id + 1 : 1
    let info = { id, purpose, cost};
    data.push(info);
    localStorage.setItem(type, JSON.stringify(data));
    renderInfo(data, type);
}


function renderInfo(data, type) {
    let list = type == 'income' ? incomeList : expanseList;
    list.innerHTML = null
    for (let el of data) {
        let tr = document.createElement('tr')
        let purpose = document.createElement('td')
        let cost = document.createElement('td')
        let buttonBox = document.createElement('td')
        let button = document.createElement('button')

        purpose.textContent = el.purpose;
        cost.textContent = el.cost;
        
        button.classList.add('del')
        button.textContent = 'X';
        button.onclick = () => {
            data = data.filter( i => i.id != el.id)
            localStorage.setItem(type, JSON.stringify(data));
            renderInfo(data, type) 
        }

        buttonBox.append(button);


        tr.append(purpose)
        tr.append(cost)
        tr.append(buttonBox)
        list.append(tr)
    }
    totalInfo()
}

function totalInfo() {
    incomeData = JSON.parse(localStorage.getItem('income')) || []
    expanseData = JSON.parse(localStorage.getItem('expanse')) || []

    let incomeC = incomeData.reduce( (ac, el) => ac += +el.cost, 0)
    let expanseC = expanseData.reduce( (ac, el) => ac += +el.cost, 0)
    total.textContent = incomeC - expanseC 
}

renderInfo(incomeData, 'income')
renderInfo(expanseData, 'expanse')
