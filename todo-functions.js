//Fetch ToDOs from LocalStorage

const fetchTODOLocalStorage = function () {
    const myArrayJSON = localStorage.getItem('todo')

    if(myArrayJSON !== null) {
        return JSON.parse(myArrayJSON)
}
    else {
        return[]
    }
}

// Add Checkbox filter - refactoring
const checkboxFilter = function(hideTrueOrFalse){
        if(hideTrueOrFalse){
            const removeCompleted = myArray.filter(function(note){
                return !note.completed
            })
            renderData(removeCompleted, filters)
        }
        else{
            renderData(myArray, filters)
        
    }
}
//Save Todos to localStorage
const saveToDoTOLocalStorage = function (myArray){
    localStorage.setItem('todo', JSON.stringify(myArray))
}

//Render application todos based on filters

const renderToDoOnFilters = function (){

}

const renderData = function (myArray, filters){
    const containedToDos = myArray.filter(function(note){
       return note.title.toLowerCase().includes(filters.searchText.toLowerCase())
    })

    const incompleteMyArray = containedToDos.filter(function(myArray){
        return !myArray.completed
    })
    
    document.querySelector('#todos').innerHTML = ''

    getDomElementsListSUmmary(incompleteMyArray)
    
    containedToDos.forEach(function(todo){
        document.querySelector('#todos').appendChild(getDOMelementsNote(todo))
    })   

}

//Get the DOM elements for an individual note
const getDOMelementsNote = function (todo){
    const pElement = document.createElement('div')
    const checkBoxVariable = document.createElement('input')
    const textElement = document.createElement('span')
    const deleteButton = document.createElement('button')

    //Set checkbox
    checkBoxVariable.setAttribute('type', 'checkbox')
    pElement.appendChild(checkBoxVariable)
    checkBoxVariable.checked = todo.completed
    checkBoxVariable.addEventListener('change', function(e){
        const checkBoxVariableTicked = e.target.checked
        markToDoCompleted(todo, checkBoxVariableTicked)
        saveToDoTOLocalStorage(myArray)
        renderData(myArray, filters)
        
        
    } )

    //Mark ToDo as Complete

    const markToDoCompleted = function (todo, checkBoxVariableTicked){
        const findMarkToDOCompleted = myArray.findIndex(function(element){
            return todo.id == element.id
        })
        if (findMarkToDOCompleted > -1 && checkBoxVariableTicked){
            return todo.completed = true
        }
        else{
            return todo.completed = false
        }
    }

    //Save Todo Text
    textElement.textContent = todo.title
    pElement.appendChild(textElement)

    //Create  Removal Button
    deleteButton.textContent = 'x'
    pElement.appendChild(deleteButton)
    deleteButton.addEventListener('click', function(e){
        removeNote(todo)
        saveToDoTOLocalStorage(myArray)
        renderData(myArray, filters)
    })
    return pElement
}

//Remove Note after clicking button

const removeNote = function(todo){
    const indexOfDeletedNote = myArray.findIndex(function(myArrayElement){
        return todo.id === myArrayElement.id
    })
    if (indexOfDeletedNote > -1){
        myArray.splice(indexOfDeletedNote, 1)
    }
}

//Get the DOM elements for list summary

const getDomElementsListSUmmary = function (incompleteMyArray){
    const howManyUnfinished = document.createElement('h2')
    howManyUnfinished.textContent = `You have ${incompleteMyArray.length} unfinished elements`
    document.querySelector('#todos').appendChild(howManyUnfinished)
}