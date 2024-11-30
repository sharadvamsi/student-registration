const studentName = document.getElementById("studentName");
const studentId = document.getElementById("studentId");
const email = document.getElementById("email");
const contact = document.getElementById("contact");
const addBtn = document.querySelector(".addBtn");
const studentDetails = document.querySelector("#student-details")


function removeElement(deleteButton) {
   
    // Removing the parent div from the DOM
    const parentDiv = deleteButton.parentElement;
    const studentName = parentDiv.querySelector('h4').innerText; // Assuming first `h4` is the name
    parentDiv.remove();

    // Updating localStorage by removing the record
    const storedData = JSON.parse(localStorage.getItem("students")) || [];
    const updatedData = storedData.filter(student => student.studentName !== studentName);

    localStorage.setItem("students", JSON.stringify(updatedData));

    
}

function editElement(editButton){
    const parentDiv = editButton.parentElement;
    const modifiedData = {}
    const studentNameExisting = parentDiv.querySelector('h4').innerText;
    const storedData = JSON.parse(localStorage.getItem("students")) || [];
    const filtered = storedData.filter(student => student.studentName !== studentNameExisting);
    const updatedData = storedData.filter(student => student.studentName === studentNameExisting);

    if(studentName.value !== updatedData[0].studentName && studentName.value !== ''){
        modifiedData['studentName']=studentName.value

    } if (studentName.value !== '' && studentName.value !== updatedData[0].studentName) {
        modifiedData['studentName'] = studentName.value;
    }
    
    if(studentId.value !== updatedData[0].studentId && studentId.value !== ''){
        modifiedData['studentId']=studentId.value

    }
    if(email.value !== updatedData[0].email && email.value !== ''){
        modifiedData['email']=email.value

    }
    if(contact.value !== updatedData[0].contact && contact.value !== ''){
        modifiedData['contact'] = contact.value

    }
   const b1 = updatedData[0]
   const b1obj = {...b1,...modifiedData}
   filtered.push(b1obj);
   parentDiv.remove();
   addNewData(b1obj)

    localStorage.setItem("students", JSON.stringify(filtered));    

}


function addNewData(studentData){
    const container = document.createElement('div');
    container.classList.add("details-header");
    for(let y in studentData){
        const value = document.createElement('h4');
        value.innerText = studentData[y];
        container.appendChild(value)        
        studentDetails.appendChild(container);
        
    }
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("actionButton")
    deleteButton.addEventListener('click', function() {
        removeElement(this); // Passing the delete button as an argument
    })
    deleteButton.textContent = "delete"
    container.appendChild(deleteButton); 
    const editButton = document.createElement("button");
    editButton.classList.add("actionButton")
    editButton.addEventListener('click', function() {
        editElement(this); // Passing the edit button as an argument
    })
    editButton.textContent = "edit"
    container.appendChild(editButton);

}
const data = JSON.parse(localStorage.getItem("students")) || []
addBtn.addEventListener('click',function(e){
    //validating input fields
    e.preventDefault();
    if(studentName.value === '' || studentId.value === '' || email.value === '' || contact.value === ''){
        alert('Please provide all inputs');
        return
    }
    console.log(!studentName.value.isalpha);
    
    if (!studentName.value.split('').every(char => char.toLowerCase() !== char.toUpperCase())) {
        alert("Name should only contain alphabetic characters, not numbers or special characters.");
        return;
    }
    if(typeof(studentName.value) !== "string"){
        alert("name should be string");
        return
    }
    if(!email.value.endsWith("@gmail.com")){
        alert("please provide valid email Id");
        return
    }
    if(contact.value.length < 10){
        alert("provide contact number of 10 digits")
        return
    }
    //adding new data to DOM
    const studentData = {
        studentName:studentName.value,
        studentId:studentId.value,
        email:email.value,
        contact:contact.value
    }
    studentName.value='';
    studentId.value='';
    email.value='';
    contact.value='';
    addNewData(studentData)
    
 
    
    data.push(studentData);
    //adding data to localStorage
    localStorage.setItem("students", JSON.stringify(data));
})

const data2 = JSON.parse(localStorage.getItem("students"));



if(data2){
    //getting data from localStorage when page is refreshed.
    for(let x of data2){
        const container = document.createElement('div');
        container.classList.add("details-header");
        for(let y in x){
            const value = document.createElement('h4');
            value.innerText = x[y];
            container.appendChild(value)        
            studentDetails.appendChild(container);
        }
        const deleteButton = document.createElement("button");
        deleteButton.addEventListener('click', function() {
            removeElement(this); 
        })
        deleteButton.textContent = "delete"
        deleteButton.classList.add("actionButton")
        container.appendChild(deleteButton); 
        const editButton = document.createElement("button");
        editButton.textContent = "edit"
        editButton.addEventListener('click', function() {
            editElement(this);
        })
        editButton.classList.add("actionButton")
        container.appendChild(editButton);
        
    }
    
}



