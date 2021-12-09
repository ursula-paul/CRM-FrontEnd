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
        `      
    })
    tableBody.innerHTML = results
})



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

// async function updateCustomer(id){
//   console.log('dffgfgfgffgf',id);

//   let myToken=localStorage.getItem(`ursula`)

//   let upfullname=document.getElementById('up-fullname').value
//   console.log(upfullname);

//   let response = await fetch(`https://crm-management-system.herokuapp.com/${id}`, 
//   {            
//     headers: {
//     'Authorization': `Bearer ${myToken}`
//  },
//     method: 'PUT',
//     body: JSON.stringify(data)
//   })
//   let result = await response.json();
//   location.reload();
// }


