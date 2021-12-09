const tableBody = document.querySelector(".tbody")


let urlId=window.location.search.split("=");
urlId=urlId[urlId.length-1]

console.log(urlId);

async function getProduct(){
  let myToken=localStorage.getItem(`ursula`)
    try{
      let response = await fetch(
        "https://crm-management-system.herokuapp.com",
          {
            headers: {
              'Authorization': `Bearer ${myToken}`
           },
            method:"GET"
          },
        );
      const products = await response.json()
      return products
    }catch(err){
        console.log(err)
    }
}
getProduct().then(data => {
  
    console.log(data, "data found")
    let results = ""
    data.map(({ id, fullname, email, gender, phone, address, notes },i) => {
      console.log(typeof id)
        results += `
        <tr>
            <th scope="row">${id}</th>
            <td>${fullname}</td>
            <td>${email}</td>
            <td>${gender}</td>
            <td data-id='${id}'> 
            <a href="edit-customer.html?id=${id}" class="btn btn-primary">

            <i class="fa fa-edit greenColor"></i>
            </a>
            <button class="btn btn-danger" onclick ="deleteCustomer(${id})">
            <i class="fa fa-trash redColor"></i>
            </button>
            </td>
        </tr>

        <!-- Modal -->
        <div class="modal fade" id="editformmodal${i}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">

            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Edit Customer </h5>
                <button type="button" class="btn-close" 
                data-bs-dismiss="modal" aria-label="Close">
                </button>
              </div>

              <div class="modal-body">  
              <div class="mb-3">
                      <label for="exampleFormControlInput1"class="form-label">Full Name </label>
                      <input type="email" class="form-control"
                       id="up-fullname"
                        placeholder="fullname" value ="${fullname}">
                    </div>  
                  <div class="mb-3">
                      <label for="exampleFormControlInput1"class="form-label">Email address</label>
                      <input type="email" class="form-control"
                       id="up-email"
                        placeholder="name@example.com" value ="${email}">
                    </div>
                    
                    <div class="mb-3">
                      <label for="exampleFormControlInput1"class="form-label">Gender</label>
                      <input type="text" class="form-control"
                       id="up-gender" 
                        placeholder="gender" value ="${gender}"
                         readonly>
                    </div>
                    
                    <select id="up-gender" class="form-select" aria-label="Default select example">
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>

                    <div class="mb-3">
                      <label for="exampleFormControlInput1"class="form-label">Phone </label>
                      <input type="email" class="form-control"
                       id="up-phone"
                        placeholder="phone" value ="${phone}">
                    </div>

                    <div class="mb-3">
                      <label for="exampleFormControlInput1"class="form-label">Address</label>
                      <input type="email" id="up-address" class="form-control"
                       id="exampleFormControlInput1"
                        placeholder="phone" value ="${address}">
                    </div>

                    <div class="mb-3">
                      <label for="exampleFormControlTextarea1" 
                      class="form-label" id="up-notes">Notes</label>
                      <textarea class="form-control" 
                       id="exampleFormControlTextarea1" 
                       rows="3">${notes}</textarea>
                    </div>
                    
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" onclick="updateCustomer()" class="btn btn-primary" id="close-btn">save changes</button>
              </div>
            </div>
          </div>
        </div>
        `      
    })
    tableBody.innerHTML = results
})

// const saveChanges = document.getElementById('close-btn');
// saveChanges.addEventListener('click', async(e)=>{
//   e.preventDefault();
  
// })

//console.log('i am here')

const submitBtn = document.querySelector("button[type='submit']")
submitBtn.addEventListener('click', async (e)=>{
  e.preventDefault();
const customerName = document.getElementById("fullname").value;
const customerEmail = document.getElementById("email-address").value;
const customerGender = document.getElementById("gender").value;
const customerAddress = document.getElementById("address").value;
const customerPhone = document.getElementById("phone").value;
const customerNotes = document.getElementById("notes").value;



data = {
  fullname: customerName,
  email: customerEmail,
  gender: customerGender,
  phone: customerPhone,
  address: customerAddress,
  notes: customerNotes
}
  console.log('i am here now')
  
  console.log(data)
  let myToken=localStorage.getItem(`ursula`)

  await fetch(
    "https://crm-management-system.herokuapp.com/", {
    headers: {
      'Authorization': `Bearer ${myToken}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
   },
      method: 'POST',
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res => alert(`${res.message}`))
    .then(()=>location.reload())
})



 async function deleteCustomer(id){
  let myToken=localStorage.getItem(`ursula`)

  let response=await fetch(
    `https://crm-management-system.herokuapp.com/${id}`, 
  {
    headers: {
      'Authorization': `Bearer ${myToken}`
   },
    method: 'DELETE'
  }
  );
  let result= await response.json()
  console.log(result);
  console.log(response);
  location.reload()
}

async function updateCustomer(id){
  console.log('dffgfgfgffgf',id);

  let myToken=localStorage.getItem(`ursula`)

  let upfullname=document.getElementById('up-fullname').value
  console.log(upfullname);

  let response = await fetch(`https://crm-management-system.herokuapp.com/${id}`, 
  {            
    headers: {
    'Authorization': `Bearer ${myToken}`
 },
    method: 'PUT',
    body: JSON.stringify(data)
  })
  let result = await response.json();
  location.reload();
}


