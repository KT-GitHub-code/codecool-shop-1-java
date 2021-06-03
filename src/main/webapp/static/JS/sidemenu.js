
init()

function init(){
document.getElementById("sidenavTrigger").addEventListener("mouseenter", openNav);
}

function openNav() {
    document.getElementById("sideNavMenu").style.width = "250px";
}

function closeNav() {
    document.getElementById("sideNavMenu").style.width = "0";
}

