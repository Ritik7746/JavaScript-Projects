
const addBtnContainer = document.querySelector(".add-button-container");
const tickerAdderBlock = document.querySelector(".ticket-adder-block");
const selectColorContainor = document.querySelector(".select-color-container");
const ticketAddedColor = document.querySelectorAll(".ticket-added-color");
const textArea = document.querySelector(".text-area");
const ticketContainor = document.querySelector(".ticket-containor");
const deleteButton = document.getElementById("dltbtn");
const navColors = document.querySelector(".nav-color-containor");
const showAllBtn = document.querySelector(".show-all-button-container");


function toggleBlocks(){
    tickerAdderBlock.classList.toggle("hide");
}
addBtnContainer.addEventListener("click", function(){
     toggleBlocks();
})

// Ticket Adder Block
let colorArr = ['red', 'blue', 'green', 'black'];
let defaultColorValue = "red";

selectColorContainor.addEventListener('click', function(event){
    let currentColorContainor = event.target;
    
    if(currentColorContainor.classList[1] == undefined) return;
    defaultColorValue = currentColorContainor.classList[1];
    
    for(let i = 0; i < ticketAddedColor.length; i++){
        ticketAddedColor[i].classList.remove('active');
    }
    currentColorContainor.classList.add('active');
})

// Text Area 
let textValue = "";
let ticketArr = [];
textArea.addEventListener('keydown', function(event){
   textValue = textArea.value;

   if(event.key == "Enter"){
    let currentTicketObj = {
        ticketValue : textValue,
        ticketColor : defaultColorValue,
        id : Date.now() 
    }
    ticketArr.push(currentTicketObj);
    createTicket(ticketArr);
    textArea.value = "";
    console.log("Pushing Element in ticketArr ",ticketArr);
    toggleBlocks();
   }
   
   
})


// Delete btn active or unactive
let isDelete = false;
deleteButton.addEventListener("click", function(){
  if(isDelete == true){
    deleteButton.setAttribute("fill", "currentColor");
  }else{
    deleteButton.setAttribute("fill", "red");
  }
  isDelete = !isDelete;

})


// Navbar color containor (it show only selected color tickets)
navColors.addEventListener('click', function(event) {
  let targetContainer = event.target;
  if (targetContainer === navColors) return;
  let targetColor = targetContainer.classList[0]; 
  
  let filteredTicket = [];
  for (let i = 0; i < ticketArr.length; i++) {
    if (ticketArr[i].ticketColor === targetColor) {
      filteredTicket.push(ticketArr[i]);
    }
  }
  createTicket(filteredTicket);
});


// Show All Tickets btn
showAllBtn.addEventListener('click', function(){
  createTicket(ticketArr);
})

// Create Tickets function
const lockBtn = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M18 8H20C20.5523 8 21 8.44772 21 9V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V9C3 8.44772 3.44772 8 4 8H6V7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7V8ZM11 15.7324V18H13V15.7324C13.5978 15.3866 14 14.7403 14 14C14 12.8954 13.1046 12 12 12C10.8954 12 10 12.8954 10 14C10 14.7403 10.4022 15.3866 11 15.7324ZM16 8V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V8H16Z"></path></svg>`
const unlockBtn = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M7 10H20C20.5523 10 21 10.4477 21 11V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V11C3 10.4477 3.44772 10 4 10H5V9C5 5.13401 8.13401 2 12 2C14.7405 2 17.1131 3.5748 18.2624 5.86882L16.4731 6.76344C15.6522 5.12486 13.9575 4 12 4C9.23858 4 7 6.23858 7 9V10ZM10 15V17H14V15H10Z"></path></svg>`
function createTicket(ticketArray){
   console.log("Ticket Array ",ticketArray);
   ticketContainor.innerHTML = "";

    for(let j = 0; j < ticketArray.length; j++){
        let ticketObj = ticketArray[j];
       console.log(ticketObj.ticketColor);
        let ticketBlockDiv = document.createElement('div');
        ticketBlockDiv.classList.add("ticket-block");
        ticketBlockDiv.innerHTML = `<div class="ticket-color ${ticketObj.ticketColor}"></div>
      <div class="ticket-task-area"> ${ticketObj.ticketValue}
        <div class="ticker-lock-button-container">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M18 8H20C20.5523 8 21 8.44772 21 9V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V9C3 8.44772 3.44772 8 4 8H6V7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7V8ZM11 15.7324V18H13V15.7324C13.5978 15.3866 14 14.7403 14 14C14 12.8954 13.1046 12 12 12C10.8954 12 10 12.8954 10 14C10 14.7403 10.4022 15.3866 11 15.7324ZM16 8V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V8H16Z"></path></svg>
        </div>
      </div>`

      // lock btn functions
      let btn = ticketBlockDiv.querySelector(".ticker-lock-button-container");
      let ticketTaskArea = ticketBlockDiv.querySelector(".ticket-task-area");
      let check = false;
      btn.addEventListener('click', function(){
        if(check == true){
            btn.innerHTML = lockBtn;
             ticketTaskArea.setAttribute("contenteditable", "false");
        }else{
            btn.innerHTML = unlockBtn;
             ticketTaskArea.setAttribute("contenteditable", "true");
        }
        check = !check;
      })

      // Color-Priority change on click 
      const ticketColorPannel = ticketBlockDiv.querySelector(".ticket-color");
      ticketColorPannel.addEventListener('click', function(){
        
        let currentTicketColor = ticketObj.ticketColor;
        let currentColorInd = 0;
        for(let i = 0; i < colorArr.length; i++){
            if(currentTicketColor == colorArr[i]){
                currentColorInd = i;
            }
        }
        let nextColorInd = (currentColorInd + 1) % colorArr.length;
        ticketColorPannel.classList.remove(currentTicketColor);
        ticketObj.ticketColor = colorArr[nextColorInd];
        ticketColorPannel.classList.add(colorArr[nextColorInd]);
        
      })

      // Double click delete ticket
      ticketBlockDiv.addEventListener('dblclick', function(){
        console.log("Doubleclicked activite");
        if(!isDelete) return;
    
        let currentId = ticketObj.id;
        for(let i = 0; i < ticketArray.length; i++){
          if(currentId == ticketArray[i].id){
            ticketArray.splice(i,1);
            ticketContainor.removeChild(ticketBlockDiv);
            break;
          }
        }
        console.log("New ticketArray ",ticketArray)
      }) 

      console.log(ticketBlockDiv);

      ticketContainor.appendChild(ticketBlockDiv);
    }

}
 console.log("ticketArr after delete element of ticketArray ",ticketArr);


   







// const addTicketButton = document.querySelector(".add-button-container");
// const tickerAdderBlock = document.querySelector(".ticker-adder-block");
// const ticketAdderColorContainer = document.querySelector(
//   ".ticket-adde-color-container"
// );
// const ticketAdderTextArea = document.querySelector(".ticket-adder-text");
// const taskAdderColors = document.querySelectorAll(".ticket-adde-color");
// const tickerContainerBox = document.querySelector(".ticket-container");
// const deleteButton = document.querySelector(".delete-button-container");
// const deleteIcon = document.getElementById("deleteIcon");
// const colorFilterContainer = document.querySelector(".nav-color-container");
// const showAllButton = document.querySelector(".show-all-button-container");

// let currentTaskAdderSelectedColor = "red";

// let taskArray = []; // to store the task

// let isDelete = false;

// let colorArray = ["red", "blue", "green", "black"];

// let lockButtonSvg = `<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="24" height="24"  fill="currentColor" >  <path    d="M19 10H20C20.5523 10 21 10.4477 21 11V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V11C3 10.4477 3.44772 10 4 10H5V9C5 5.13401 8.13401 2 12 2C15.866 2 19 5.13401 19 9V10ZM17 10V9C17 6.23858 14.7614 4 12 4C9.23858 4 7 6.23858 7 9V10H17ZM11 14V18H13V14H11Z"  ></path> </svg>`;

// let unlockButtonSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M7 10H20C20.5523 10 21 10.4477 21 11V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V11C3 10.4477 3.44772 10 4 10H5V9C5 5.13401 8.13401 2 12 2C14.7405 2 17.1131 3.5748 18.2624 5.86882L16.4731 6.76344C15.6522 5.12486 13.9575 4 12 4C9.23858 4 7 6.23858 7 9V10ZM5 12V20H19V12H5ZM10 15H14V17H10V15Z"></path></svg>`;

// showAllButton.addEventListener("click", function () {
//   createTickets(taskArray);
// });

// colorFilterContainer.addEventListener("click", function (event) {
//   let targetContainer = event.target;
//   let targetColor = targetContainer.classList[1];
//   let filteredTicket = [];

//   for (let i = 0; i < taskArray.length; i++) {
//     if (taskArray[i].color === targetColor) {
//       filteredTicket.push(taskArray[i]);
//     }
//   }
//   createTickets(filteredTicket);
// });

// function toggleTickerAdder() {
//   tickerAdderBlock.classList.toggle("hide");
// }

// addTicketButton.addEventListener("click", toggleTickerAdder);

// ticketAdderColorContainer.addEventListener("click", function (event) {
//   // Selecting the target container
//   const targetContainer = event.target;
//   // from targetContainer getting the color which user has selected
//   currentTaskAdderSelectedColor = targetContainer.classList[1];
//   // removing the border from all the colors
//   for (let i = 0; i < taskAdderColors.length; i++) {
//     let currentContainer = taskAdderColors[i];
//     currentContainer.classList.remove("active-color");
//   }
//   // Adding the border class to target container
//   targetContainer.classList.add("active-color");
// });

// ticketAdderTextArea.addEventListener("keydown", function (e) {
//   let keyPressed = e.key;
//   let task = ticketAdderTextArea.value;

//   if (keyPressed == "Enter") {
//     let currentTaskObj = {
//       task: task,
//       color: currentTaskAdderSelectedColor,
//       id: Date.now(),
//     };

//     taskArray.push(currentTaskObj);
//     createTickets(taskArray);
//     ticketAdderTextArea.value = "";
//     toggleTickerAdder();
//   }
// });




// deleteButton.addEventListener("click", function () {
//   if (isDelete) {
//     // delete is active
//     deleteIcon.setAttribute("fill", "#000000");
//   } else {
//     deleteIcon.setAttribute("fill", "red");
//     // delete is inactive
//   }
//   isDelete = !isDelete;
// });

// function createTickets(taskArrayCustom) {
//   tickerContainerBox.innerHTML = "";

//   for (let i = 0; i < taskArrayCustom.length; i++) {
//     let taskObj = taskArrayCustom[i];

//     let currentId = taskObj.id;

//     let ticketDiv = document.createElement("div");
//     ticketDiv.classList.add("ticket-block");

//     ticketDiv.innerHTML = `<div class="ticket-color ${taskObj.color}"></div>
//   <div class="ticket-task-area">
//    ${taskObj.task}
//   <div class="ticker-lock-button-container">
//     <svg
//         xmlns="http://www.w3.org/2000/svg"
//         viewBox="0 0 24 24"
//         width="24"
//         height="24"
//         fill="currentColor"
//       >
//         <path
//           d="M19 10H20C20.5523 10 21 10.4477 21 11V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V11C3 10.4477 3.44772 10 4 10H5V9C5 5.13401 8.13401 2 12 2C15.866 2 19 5.13401 19 9V10ZM17 10V9C17 6.23858 14.7614 4 12 4C9.23858 4 7 6.23858 7 9V10H17ZM11 14V18H13V14H11Z"
//         ></path>
//       </svg>
//     </div>
   
//   </div>`;

//     // delete functionality of ticket

//     ticketDiv.addEventListener("dblclick", function () {
//       if (!isDelete) return;

//       let newArray = [];

//       for (let i = 0; i < taskArrayCustom.length; i++) {
//         console.log(currentId, taskArrayCustom[i].id);
//         if (taskArrayCustom[i].id !== currentId) {
//           newArray.push(taskArrayCustom[i]);
//         }
//       }

//       taskArray = newArray;

//       tickerContainerBox.removeChild(ticketDiv);
//     });

//     const colorPanel = ticketDiv.querySelector(".ticket-color");
//     // This function is handling the color change feature in ticket
//     colorPanel.addEventListener("click", function () {
//       let currentColor = taskObj.color;
//       console.log(currentColor);
//       let currentColorIdx = 0;
//       for (let j = 0; j < colorArray.length; j++) {
//         if (currentColor == colorArray[j]) {
//           currentColorIdx = j;
//         }
//       }

//       let nextColorIdx = (currentColorIdx + 1) % colorArray.length;
//       colorPanel.classList.remove(currentColor);
//       taskObj.color = colorArray[nextColorIdx];
//       colorPanel.classList.add(colorArray[nextColorIdx]);
//     });
//     // To edit the task in the ticket

//     let lockButton = ticketDiv.querySelector(".ticker-lock-button-container");
//     let ticketTaskArea = ticketDiv.querySelector(".ticket-task-area");

//     let lockFlag = false; // the lock is colsed

//     lockButton.addEventListener("click", function () {
//       if (lockFlag == false) {
//         lockButton.innerHTML = unlockButtonSvg;
//         ticketTaskArea.setAttribute("contenteditable", "true");
//       } else {
//         lockButton.innerHTML = lockButtonSvg;
//         ticketTaskArea.setAttribute("contenteditable", "false");
//         taskObj.task = ticketTaskArea.innerText;
//       }
//       lockFlag = !lockFlag;
//     });

//     tickerContainerBox.appendChild(ticketDiv);
//   }
// }
