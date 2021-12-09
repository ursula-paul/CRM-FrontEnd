let urlId=window.location.search.split("=");
urlId= +urlId[urlId.length-1]
// console.log(typeof urlId)
let myToken=localStorage.getItem(`ursula`)
if (!myToken) {
  window.location.href="login.html"
}


// console.log(urlId);
async function getProduct(){
    console.log('dfdfdfdfd');
    // let myToken=localStorage.getItem(`ursula`)
    // if (!myToken) {
    //   window.location.href="login.html"
    // }
    let upFullname= document.getElementById('up-fullname')
    let upEmail= document.getElementById('up-email')
    let upGender= document.getElementById('up-gender')
    let upPhone= document.getElementById('up-phone')
    let upAddress= document.getElementById('up-address')
    let upNotes= document.getElementById('up-notes')

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
//    const products = await (await fetch("https://crm-management-system.herokuapp.com/")).json();
   //products
   console.log(products)
   let theCustomer=products.find(a => a.id == urlId)
   console.log(theCustomer)
   upFullname.value=theCustomer['fullname']
   upEmail.value=theCustomer['email']
   upGender.value=theCustomer['gender']
   upPhone.value=theCustomer['phone']
   upAddress.value=theCustomer['address']
   upNotes.value=theCustomer.notes
}

getProduct()


// // update product
async function updateCustomer(){
    // let myToken=localStorage.getItem(`ursula`)

    let fullname= document.getElementById('up-fullname').value
    let email= document.getElementById('up-email').value
    let gender= document.getElementById('up-gender').value
    let phone= document.getElementById('up-phone').value
    let address= document.getElementById('up-address').value
    let notes= document.getElementById('up-notes').value

    console.log(fullname);
    let data=JSON.stringify({fullname,email,gender,phone,address,notes},null,4)
    console.log(data);

    let response = await fetch(`https://crm-management-system.herokuapp.com/${urlId}`, {
      headers:{
          'Accept':'application/json',
          'Content-Type':'application/json',
          'Authorization': `Bearer ${myToken}`
      },
      method: "PUT",
      body: data
    });
    
    let result = await response.json();
    console.log(result);
    alert(result.message);
    location.reload();
}



  