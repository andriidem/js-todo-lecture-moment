const myArray = fetchTODOLocalStorage()


const filters = {
    searchText: '',
    hideCompleted: checkboxFilter
    }

renderData(myArray, filters)

document.querySelector('#search-todo').addEventListener('input', function(e){
    filters.searchText = e.target.value
    renderData(myArray, filters)
})

document.querySelector('#add-todos').addEventListener('submit', function(e){
    e.preventDefault()
    myArray.push(
    {   
        id: uuidv4(),
        title: e.target.elements.inputAddTodo.value,
        completed: false
    }      
    )
    //localStorage.setItem('todo', JSON.stringify(myArray))
    saveToDoTOLocalStorage(myArray)
    renderData(myArray, filters)
    e.target.elements.inputAddTodo.value = ''
})

document.querySelector('#inputCompletedHide').addEventListener('change', function(e){
    let hideBooleanVariable = e.target.checked
    filters.hideCompleted(hideBooleanVariable)
})

