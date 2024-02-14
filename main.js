// 유저가 값을 입력한다✅
// 추가하기 버튼을 누르면 할일이 taskBox에 추가된다✅
// Check 버튼을 클릭하면 할일이 끝난 것으로 간주하고 가로줄을 친다✅
// 되돌리기 버튼을 클릭하면 다시 Ongoing 상태로 되돌릴 수 있다.🤯
// Delete 버튼을 클릭하면 할일이 리스트에서 삭제된다.
// All, Ongoing, Done 탭을 누르면 underLine이 해당 탭으로 이동하며 목록이 보여진다
// Done 탭은 할일이 끝난 아이템만
// Ongoing 탭은 진행중인 아이템만
// All 탭은 모든 아이템을 상태에 상관없이 보여준다
// 모바일 버전에서도 확인할 수 있는 반응형 웹이다.


let taskInput = document.getElementById("userInput")
let taskAddButton = document.getElementById("addBtn")
let taskList = []
taskAddButton.addEventListener("click", addTodo)


// 할일을 입력하고 추가하기 버튼을 누르면 실행되는 함수
function addTodo() {
    let taskObject = {
        taskContent: taskInput.value,
        isDone: false,
        id: randomId()
    }
    taskList.push(taskObject)
    render()

}

// taskBoard에 input으로 들어온 값을 보여주기 위한 함수
// 이 함수로 taskBoard에 있는 ui를 다 그려줄거야
// check버튼이 눌렸을 때(isDone의 값이 true라는건 task를 끝냈다는 의미)
function render() {
    let resultHTML = " "
    for (let i = 0; i < taskList.length; i++) {

        if (taskList[i].isDone == true) {
            resultHTML += `<div class="listBox" id="tasklist">
            <div class="taskDone">${taskList[i].taskContent}</div>
            <div>
            <button onClick="taskDone('${taskList[i].id}')">Check</button>
            <button onClick="taskDelete('${taskList[i].id}')">Delete</button>
            </div >
            </div > `
        } else {
            resultHTML += `<div class="listBox" id="tasklist">
        <div>${taskList[i].taskContent}</div>
        <div>
        <button onClick="taskDone('${taskList[i].id}')">Check</button>
        <button onClick="taskDelete('${taskList[i].id}')">Delete</button>
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
    render()
}

// task를 삭제하고 싶어요
function taskDelete(id) {
    let newTaskList = []
    for (let i = 0; i < taskList.length; i++) {
        let currentTask = taskList[i]
        if (id != currentTask.id) {
            newTaskList.push(currentTask)
        }
    }
    taskList = newTaskList
    render()
}


// 배열에 추가되는 item에 고유한 id를 만들어줍시다
function randomId() {
    return '-' + Math.random().toString(36).substr(2, 9)
}