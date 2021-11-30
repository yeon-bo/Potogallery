function setMenu(_menu) {
    var filterButtons = document.querySelectorAll("nav li");
    filterButtons.forEach(function (filterButton) {
      filterButton.classList.remove("on");
    });

    document.querySelector("nav li." + _menu).classList.add("on");
    document.querySelector("main").className = _menu;
}


function setDescLength () {
    document.querySelector(".descLength").innerHTML =
     document.querySelector("input.description").value.length + "/20";
  }

  
  