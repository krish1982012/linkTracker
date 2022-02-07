let myLinks = [];

let inpli = document.getElementById("inputLink");
let saveli = document.getElementById("saveLink");
let deleteAll = document.getElementById("deleteAll");
let saveCurrPage = document.getElementById("saveCurrPage");


window.onload = function () {
    let myLinksStr = localStorage.getItem('myl');
    //console.log(myLinksStr);
    let myLinksarr = JSON.parse(myLinksStr);
    //console.log(myLinksarr);
    if (myLinksarr != null) {
        myLinks = myLinksarr;
        printLinks();
    }

}


saveCurrPage.addEventListener('click', addcurr);

function addcurr() {

    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {

        myLinks.push(tabs[0].url);
        let str = JSON.stringify(myLinks);
        localStorage.setItem('myl', str);
        printLinks();

    });

}


saveli.addEventListener('click', addToArr);

function addToArr() {

    let linkValue = inpli.value;
    if (linkValue) {

        if (linkValue.indexOf('http') != 0) {
            linkValue = 'http://' + linkValue;
        }

        myLinks.push(linkValue);
        inpli.value = "";
        //console.log(myLinks);
        let str = JSON.stringify(myLinks);
        localStorage.setItem('myl', str);
        printLinks();
    }

}


deleteAll.addEventListener('dblclick', emptyarr);
function emptyarr() {
    let flag = confirm("it will delete all links permanently");
    if (flag == true) {
        myLinks = [];
        localStorage.removeItem('myl');
        printLinks();
    }

}


function printLinks() {
    let strFromStorage = localStorage.getItem('myl');
    myLinksarr = JSON.parse(strFromStorage);
    if (myLinksarr == null) {
        myLinks = [];
    }
    else {
        myLinks = myLinksarr;
    }

    let listele = document.getElementById("listOfLinks");
    let text = "";
    for (let i = 0; i < myLinks.length; i++) {
        text += `<li><a href="${myLinks[i]}" target="_blank" > ${myLinks[i]}</li>`;
    }
    listele.innerHTML = text;

}


let deleteLink = document.getElementById("deleteLink");

deleteLink.addEventListener('click', dellink);

function dellink() {
    let num = document.getElementById("itemNo").value;
    document.getElementById("itemNo").value = '';
    if (num == 0) {
        return;
    }
    //console.log(num+1);
    let temparr = localStorage.getItem('myl');
    temparr = JSON.parse(temparr);
    temparr.splice(num - 1, 1);
    //console.log(temparr);
    temparr = JSON.stringify(temparr);
    localStorage.setItem('myl', temparr);
    printLinks();
}
