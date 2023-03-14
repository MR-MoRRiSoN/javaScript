const ipAddress = "172.18.20.110"
const serialNumber = document.getElementById("serialNumber");
const withoutSerialNumber = document.getElementById("withoutSerialNumber");
const normalMode = document.getElementById("normalMode");
const logout = document.getElementById("logout");



function checkLogin(){
    const xhr = new XMLHttpRequest();
    const accountName = document.getElementById("accountName");
    const checkUsername = localStorage.getItem("user");
    const checkPasswd = localStorage.getItem("passwd");
    xhr.open("POST", `http://${ipAddress}:8080/logIn/${checkUsername}/${checkPasswd}`);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.addEventListener("load", function() {
        const responseText = xhr.responseText;

        console.log(checkUsername);
        console.log(checkPasswd);

        try {
            const user = JSON.parse(responseText);
            console.log("hey");
            if(user["userID"]!==""){
                //login 
                accountName.innerText=`23434`;
                console.log("hey");
                accountName.innerText=`${user["userName"]} ${user["userSurname"]}`;
                
            }else{
                window.open("/page/loginPage/login.html", '_self');
            }

        } catch (error) {
            window.open("/page/loginPage/login.html", '_self');
        }
 



      });
    xhr.send();
    
    }

    //            window.open("/page/loginPage/login.html", '_self');

    
function getProducts(address){
        const xhr = new XMLHttpRequest();
        const tbody = document.getElementById("tbody");
        
        
        xhr.open("GET",`http://${ipAddress}:8080/`+address);
        console.log(`http://${ipAddress}:8080/`+address);
        xhr.send();
        xhr.responseType = "json";
        xhr.onload = () => {
          if (xhr.readyState == 4 && xhr.status == 200) {
            const data = xhr.response;
            let k =0;
            data.forEach(element => {
                k++;
                console.log(element["productId"]);
                const tr = document.createElement('tr');
                tr.innerHTML=`
                <tr>
                <td>${k}</td>
                <td>${element["vendorName"]}</td>
                <td>${element["productType"]}</td>
                <td>${element["serialNumber"]}</td>
                <td>${element["partNumber"]}</td>
                <td>${element["description"]}</td>
                <td>${element["storageName"]}</td>
                <td>${element["incomeDate"]}</td>
                <td>${element["status"]}</td>
                <td>${element["quantity"]}</td>
                </tr>
                `
                tbody.appendChild(tr);
                
            });
    
          } else {
            console.log(`Error: ${xhr.status}`);
          }
        };
    
    }

function getCollapse(){
    const xhr = new XMLHttpRequest();
    xhr.open("GET",`http://${ipAddress}:8080/getCollapse`);

    const collapse = document.getElementById("collapse");
    xhr.send();
    xhr.responseType = "json";

    xhr.onload = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
          const data = xhr.response;
          data.forEach(element => {
            // console.log(element)
              const a = document.createElement('a');
              a.className="collapse-item";
              a.innerText=element;
              collapse.appendChild(a);
          });
  
        } else {
          console.log(`Error: ${xhr.status}`);
        }
      };
    }

function cleanPerent(id){
    const tbody = document.getElementById(id);
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
      }
}

serialNumber.addEventListener('click', () => {
cleanPerent("tbody");
getProducts("checkSerial/true")


  });

withoutSerialNumber.addEventListener('click', () => {
    cleanPerent("tbody");
    getProducts("checkSerial/false")
  });

normalMode.addEventListener('click', () => {
    cleanPerent("tbody");
    getProducts("getProduct");
  });

  logout.addEventListener('click', () => {
    localStorage.clear();
    window.open("/page/loginPage/login.html", '_self');
  });

  
 
    checkLogin();
    getProducts("getProduct");

    
    