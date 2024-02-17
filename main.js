// 유저가 값을 입력한다✅
// 추가하기 버튼을 누르면 할일이 taskBox에 추가된다✅
// Check 버튼을 클릭하면 할일이 끝난 것으로 간주하고 가로줄을 친다✅
// 되돌리기 버튼을 클릭하면 다시 Ongoing 상태로 되돌릴 수 있다.✅
// Delete 버튼을 클릭하면 할일이 리스트에서 삭제된다.✅
// All, Ongoing, Done 탭을 누르면 underLine이 해당 탭으로 이동하며 목록이 보여진다✅
// Done 탭은 할일이 끝난 아이템만✅
// Ongoing 탭은 진행중인 아이템만✅
// All 탭은 모든 아이템을 상태에 상관없이 보여준다✅
// 모바일 버전에서도 확인할 수 있는 반응형 웹이다.✅


let taskInput = document.getElementById("userInput")
let taskAddButton = document.getElementById("addBtn")
let taskTabs = document.querySelectorAll(".taskTab div")
let taskList = []
taskAddButton.addEventListener("click", addTodo)
let underLine = document.getElementById("underLine")
taskAddButton.disabled = true

taskTabs.forEach(taskTab => taskTab.addEventListener("click", (e) => underLineIndicator(e)))

function underLineIndicator(e) {
    underLine.style.left = e.currentTarget.offsetLeft + "px"
    underLine.style.width = e.currentTarget.offsetWidth + "px"
}

for (let i = 1; i < taskTabs.length; i++) {
    taskTabs[i].addEventListener("click", function (event) { onclickTab(event) })
}

let currentTabId = "allTab"
function onclickTab(event) {
    // 내가 무슨 탭을 클릭했는지 알아야해(event.target.id)
    currentTabId = event.target.id
    render(taskList, currentTabId)

}

// 입력값의 길이가 0이면 추가하기 버튼을 비활성화 시킨다
taskInput.addEventListener("input", disabledAddButton)
function disabledAddButton() {
    taskAddButton.disabled = taskInput.value.length == 0
};


// 할일을 입력하고 추가하기 버튼을 누르면 실행되는 함수
function addTodo() {

    let taskObject = {
        taskContent: taskInput.value,
        isDone: false,
        id: randomId()
    }

    taskList.push(taskObject)
    taskInput.value = ''
    taskAddButton.disabled = true
    taskInput.focus()
    render(taskList, currentTabId)
}

// taskBoard에 input으로 들어온 값을 보여주기 위한 함수
// 이 함수로 taskBoard에 있는 ui를 다 그려줄거야
// check버튼이 눌렸을 때(isDone의 값이 true라는건 task를 끝냈다는 의미)

// todo배열을 인자로 받아서 그 배열을 화면에 뿌려주는 함수
function render(todoList, currentTab) {
    let newList = []
    if (currentTab == "onGoingTab") {
        // 만약 ongoing인 걸 알아냈을 때 -> 전체 배열에서 isDone이 false인 애들만 filtering한 후
        // 화면에 보여주기!
        for (let i = 0; i < todoList.length; i++) {
            let currentTodo = todoList[i]
            if (currentTodo.isDone == false) {
                newList.push(currentTodo)
            }
        }

        // 만약에 Done인 걸 알아냈어! 그러면 전체 배열에서 isDone이 True인 애들만 필터링하고 화면에 보여주기
    } else if (currentTab == "doneTab") {
        for (let i = 0; i < todoList.length; i++) {
            let currentTodo = todoList[i]
            if (currentTodo.isDone == true) {
                newList.push(currentTodo)
            }
        }

    } else {
        newList = todoList
    }
    let resultHTML = " "
    for (let i = 0; i < newList.length; i++) {

        if (newList[i].isDone == true) {
            resultHTML += `<div class="listBox" id="tasklist">
            <div class="taskValue">${newList[i].taskContent}</div>
            <div>
            <button class="checkBtn" onClick="taskDone('${newList[i].id}')"></button>
            <button class="deleteBtn" onClick="taskDelete('${newList[i].id}')"></button>
            </div >
            </div > `
        } else {
            resultHTML += `<div class="listBox" id="tasklist">
        <div class="taskValue2">${newList[i].taskContent}</div>
        <div>
        <button class="checkBox" onClick="taskDone('${newList[i].id}')"></button>
        <button class="deleteBtn" onClick="taskDelete('${newList[i].id}')"></button>
        </div >
    
        </div > `
        }
    }

    document.getElementById("taskBoard").innerHTML = resultHTML
}
// task가 끝나면 check 버튼을 누른다
// check 버튼을 누르는 순간 isDone : false -> true
// id값을 파라미터로 받아왔으니 해당 id가 있는 아이템의 isDone 값을 true로 바꿔줘야한다
// 끝난 줄 알았던 task가 아직 끝나지 않았다면 상태를 되돌릴 수도 있어야한다
// id 받아왔고, 그 아이디가 어떤 객체의 id인지 for문을 통해 배열에서 찾는다
function taskDone(id) {
    for (let i = 0; i < taskList.length; i++) {
        if (id == taskList[i].id) {
            // true값만 주면 죽을때까지 true임.. 그래서 부정형을 취해준다
            taskList[i].isDone = !taskList[i].isDone
            break
        }
    }
    // check버튼이 눌리면 눌렸을 때의 mid-line이 그어진 ui도 그려줘야지!
    render(taskList, currentTabId)
}

// task를 삭제하고 싶어요
function taskDelete(id) {
    // 삭제하고 싶은 아이템을 제외한 '나머지 아이템들을 새로운 리스트에 push해준다'
    let newTaskList = []
    for (let i = 0; i < taskList.length; i++) {
        let currentTask = taskList[i]
        // 기존에 있어야하는 아이템의 id와 내가 찾는 id가 같지 않으면
        // newTaskList에 push해줘라
        if (id != currentTask.id) {
            newTaskList.push(currentTask)
        }
    }
    // 그렇게 되면 삭제해야하는 item만 빼고! 나머지 아이템들이 새로운 배열에 저장됨
    taskList = newTaskList
    render(taskList, currentTabId)
}


// 배열에 추가되는 item에 고유한 id를 만들어줍시다
function randomId() {
    return '-' + Math.random().toString(36).substr(2, 9)
}


