// async function login(){
//     let emaillog =document.getElementById('emaillog').value
//     let passlog =document.getElementById('passlog').value
//     console.log(passlog);
//     let response=await fetch(
//       `https://crm-management-system.herokuapp.com/${id}`, 
//       {
//         method: 'POST',
//         headers: {'Content-Type':'application/json',

//         },
//         body: JSON.stringify(data)
//       },
//     );
//     let result= await response.json()
//     console.log(result);
//     console.log(response);
//     location.reload()
// }

async function login() {
    let email=document.getElementById('emaillog').value
    let password=document.getElementById('passlog').value
    let loginObj=JSON.stringify({email,password},null,4)
    console.log(email,password,loginObj);
    let response = await fetch("https://crm-management-system.herokuapp.com/users/login", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: loginObj
    });
    let result = await response.json();
    console.log(result);
    // localStorage.removeItem('clpapp')
    localStorage.setItem(`ursula`,result.token)
    let mytoken=localStorage.getItem(`ursula`)
    console.log(mytoken);
    location.href='index.html'
  }
  

  async function register(){
    let fullname=document.getElementById('fullname').value
    let email=document.getElementById('emailme').value
    let password=document.getElementById('passme').value
    console.log(fullname,email,password);
    if(!fullname || !email || !password){
    return alert('all fields are required')
    }
    console.log(fullname,email,password);
    let userObj={fullname,email,password}
    userObj = JSON.stringify(userObj, null, 4);
    console.log(userObj);
    let response = await fetch("https://crm-management-system.herokuapp.com/users/signup", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: userObj
    });
    let result = await response.json();
    console.log(result);
    if(result.message=='Account created'){
        // alert notification
        alert('Account created')
    }
  }


  async function logout() {
    localStorage.removeItem('ursula')
    location.reload()
}