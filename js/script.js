// 사이드메뉴 버튼 클릭시 보이기
function setMenu(_menu) {
    var filterButtons = document.querySelectorAll("nav li");
    filterButtons.forEach(function (filterButton) {
      filterButton.classList.remove("on");
    });
    document.querySelector("nav li." + _menu).classList.add("on");
    document.querySelector("main").className = _menu;
}


// 사진 올리기에서 텍스트 글자수 보이기
function setDescLength () {
    document.querySelector(".descLength").innerHTML =
     document.querySelector("input.description").value.length + "/20";
  }


// 프로필 수정 및 저장
  function showMyInfo () {
    document.querySelector("#myInfoId").innerHTML = my_info.id;
    document.querySelector("#myInfoUserName").innerHTML = my_info.user_name;
    document.querySelector("#sp-intro").innerHTML = my_info.introduction;
    document.querySelector("#ip-intro").value = my_info.introduction;
    document.querySelector("#myinfo input[type=radio][value=" + my_info.as + "]").checked = true;
  
    document.querySelectorAll("#myinfo input[type=checkbox]")
        .forEach(function(checkbox) {
        checkbox.checked = false;
    });
    
    my_info.interest.forEach(function (interest) {
        document.querySelector(
        "#myinfo input[type=checkbox][value=" + interest + "]"
        ).checked = true;
  });

}

function setEditMyInfo (on) {
    document.querySelector("#myinfo > div").className = on ? "edit" : "non-edit";
    document.querySelectorAll("#myinfo input").forEach(function (input) {
        input.disabled = !on;
      })
      showMyInfo();
  }
  
  function updateMyInfo () {
    my_info.introduction = document.querySelector("#ip-intro").value;
    my_info.as = document.querySelector("#myinfo input[type=radio]:checked").value;
    var interests = [];
    document.querySelectorAll("#myinfo input[type=checkbox]:checked").forEach(function (checked) {
    interests.push(checked.value);
    });
    my_info.interest = interests;

    setEditMyInfo(false);
    showMyInfo();
  }  

  function init() {
    showMyInfo();
  }
  