// 유저가 값을 입력한다.
// 추가하기 버튼을 누르면 할일이 taskBox에 추가된다
// Delete 버튼을 클릭하면 할일이 리스트에서 삭제된다.
// Check 버튼을 클릭하면 할일이 끝난 것으로 간주하고 가로줄을 친다
// All, Ongoing, Done 탭을 누르면 underLine이 해당 탭으로 이동하며 목록이 보여진다
// Done 탭은 할일이 끝난 아이템만
// Ongoing 탭은 진행중인 아이템만
// All 탭은 모든 아이템을 상태에 상관없이 보여준다
// 되돌리기 버튼을 클릭하면 다시 Ongoing 상태로 되돌릴 수 있다.
// 모바일 버전에서도 확인할 수 있는 반응형 웹이다.


// 유저가 할 일을 입력하고 추가버튼을 누르면 추가된 리스트가 todoTab에 표시된다
// todoTab에 표시하게 하려면 userInput을 기억해야한다
// userInput을 기억하려면 객체에 저장해? 어떡해?
// 
let taskInput = document.getElementById("userInput")
let taskAddButton = document.getElementById("addBtn")
let taskList = []
taskAddButton.addEventListener("click", addTodo)

// let todoItem = {}

function addTodo() {
    let taskContent = taskInput.value
    taskList.push(taskContent)
    console.log(taskList)
    render()

}


function render() {
    let resultHTML = " "
    for (let i = 0; i < taskList.length; i++) {
        resultHTML += `<div class="listBox" id="tasklist">
        <div>${taskList[i]}</div>
        <div>
            <button>Check</button>
            <button>Delete</button>
        </div>
    </div>`
    }

    document.getElementById("taskBoard").innerHTML = resultHTML
}