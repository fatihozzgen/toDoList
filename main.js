function newElement() {
  let newTask = document.querySelector("#task");
  let newSpan = document.createElement("span")
  let spanText = document.createTextNode("X")
  let newLi = document.createElement("li")

  if (newTask.value.trim().length > 0) {
    newSpan.appendChild(spanText)
    newSpan.className = "xIcons"
    newLi.innerHTML = newTask.value
    newLi.appendChild(newSpan)
    newSpan.setAttribute('keys', newTask.value)
    document.querySelector("#list").append(newLi)

    const getLocalStorageData = localStorage.getItem("todoSaveTask")
    if (typeof getLocalStorageData === 'string') {
      const localStorageData = JSON.parse(getLocalStorageData)
      localStorageData.push(newTask.value)
      localStorage.setItem('todoSaveTask', JSON.stringify(localStorageData))
    } else {
      localStorage.setItem('todoSaveTask', JSON.stringify([newTask.value]))
    }
    document.querySelector("#task").value = "";

    
    $('#eklendi').toast('show')
  } else {
    
    $('#ekle').toast('show')
  }
  deleteTodoData(newSpan, newLi)

  
  newLi.addEventListener("click", function (e) {
    if (e.target.tagName = "li") {
      newLi.classList.toggle("checked")
    }
  })
}

function deleteTodoData(newSpan, newLi) {
  newSpan.addEventListener("click", function (e) {
    const locastorage = JSON.parse(localStorage.getItem('todoSaveTask'))
    const filteredData = locastorage.filter(item2 => item2 !== e.target.getAttribute('keys'))
    localStorage.setItem("todoSaveTask", JSON.stringify(filteredData));
    if (e.target.tagName = "span") {
      newLi.classList.toggle("dNone")
    }
  })
}

document.addEventListener("DOMContentLoaded", function () {
  const getLocalStorageData = localStorage.getItem("todoSaveTask")
  if (typeof getLocalStorageData !== 'string') {
    return
  } else if (Array.isArray(JSON.parse(getLocalStorageData))) {
    for (const item of JSON.parse(getLocalStorageData)) {
      let newSpan = document.createElement("span")
      let spanText = document.createTextNode("X")
      let newLi = document.createElement("li")
      newSpan.appendChild(spanText)
      newSpan.className = "xIcons"
      newSpan.setAttribute('keys', item)
      newLi.innerHTML = item
      newLi.appendChild(newSpan)
      document.querySelector("#list").append(newLi)
      deleteTodoData(newSpan, newLi)
    }
  }
});




