const ipAddress = "172.18.20.110"
const userName = document.getElementById("username");
const passwd = document.getElementById("passwd");
const logInButton = document.getElementById("login");
const xhr = new XMLHttpRequest();




logInButton.addEventListener('click', () => {
    console.log(userName.value);
    console.log(passwd.value);
    xhr.open("POST", `http://${ipAddress}:8080/logIn/${userName.value}/${passwd.value}`);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.addEventListener("load", function() {
        const responseText = xhr.responseText;
        try {
            const user = JSON.parse(responseText);
            if(user["userID"]!==""){
                //login 
                localStorage.setItem("user",user["userLogInNickname"]);
                localStorage.setItem("passwd",user["userPassword"]);
                window.open("/page/storagePage/Storage.html", '_self');
                console.log("Done")
                
                
            }else{
                //inncorect passwd
            }

        } catch (error) {
            
        }
       

        console.log();


      });
    xhr.send();
  });


