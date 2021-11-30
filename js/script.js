// 사이드메뉴 버튼 클릭시 보이기
function setMenu(_menu) {
    var filterButtons = document.querySelectorAll("nav li");
    filterButtons.forEach(function (filterButton) {
        filterButton.classList.remove("on");
    });
    document.querySelector("nav li." + _menu).classList.add("on");
    document.querySelector("main").className = _menu;
}

var sorts = {
    recent: function (a, b) { return (a.idx > b.idx) ? -1 : 1 },
    like: function (a, b) { return (a.likes > b.likes) ? -1 : 1 }
  }
var sort = sorts.recent;  

var filters = {
    all: function (it) { return true; },
    mine: function (it) { return it.user_id === my_info.id; },
    like: function (it) { return my_info.like.indexOf(it.idx) > -1; },
    follow: function (it) { return my_info.follow.indexOf(it.user_id) > -1; }
  }
  
  var filter = filters.all;

function setSort(_sort) {
  var sortButtons = document.querySelectorAll("#sorts li");
  sortButtons.forEach(function (sortButton) {
    sortButton.classList.remove('on');
  })
  document.querySelector("#sorts ." + _sort).classList.add("on");
  
  sort = sorts[_sort];
  showPhotos();
} 

function setFilter(_filter) {
    var filterButtons = document.querySelectorAll("#filters li");
    filterButtons.forEach(function (filterButton) {
      filterButton.classList.remove('on');
    });
    document.querySelector("#filters ." + _filter).classList.add("on");
    filter = filters[_filter];
    showPhotos();
  }
  


// 사진 올리기에서 텍스트 글자수 보이기
function setDescLength() {
    document.querySelector(".descLength").innerHTML =
        document.querySelector("input.description").value.length + "/20";
}


// 프로필 수정 및 저장
function showMyInfo() {
    document.querySelector("#myInfoId").innerHTML = my_info.id;
    document.querySelector("#myInfoUserName").innerHTML = my_info.user_name;
    document.querySelector("#sp-intro").innerHTML = my_info.introduction;
    document.querySelector("#ip-intro").value = my_info.introduction;
    document.querySelector("#myinfo input[type=radio][value=" + my_info.as + "]").checked = true;

    document.querySelectorAll("#myinfo input[type=checkbox]")
        .forEach(function (checkbox) {
            checkbox.checked = false;
        });

    my_info.interest.forEach(function (interest) {
        document.querySelector(
            "#myinfo input[type=checkbox][value=" + interest + "]"
        ).checked = true;
    });

}

function setEditMyInfo(on) {
    document.querySelector("#myinfo > div").className = on ? "edit" : "non-edit";
    document.querySelectorAll("#myinfo input").forEach(function (input) {
        input.disabled = !on;
    })
    showMyInfo();
}

function updateMyInfo() {
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


//갤러리 화면
function showPhotos() {

    var existingNodes = document.querySelectorAll("#gallery article:not(.hidden)");
    existingNodes.forEach(function (existingNode) {
        existingNode.remove();
    });

    // 갤러리 div 선택
    var gallery = document.querySelector("#gallery");

    var filtered = photos.filter(filter);
    filtered.sort(sort);

    filtered.forEach(function (photo) {
        // 각 사진을 썸네일로 만들어 넣음
        var photoNode = document.querySelector("article.hidden").cloneNode(true);
        photoNode.classList.remove("hidden");

        photoNode.querySelector(".author").innerHTML = photo.user_name;
        photoNode.querySelector(".desc").innerHTML = photo.description;
        photoNode.querySelector(".like").innerHTML = photo.likes;
        photoNode.querySelector(".photo").style.backgroundImage = "url('./img/photo/" + photo.file_name + "')";

        if (my_info.like.indexOf(photo.idx) > -1) {
            photoNode.querySelector(".like").classList.add("on");
        }

        photoNode.querySelector(".like").addEventListener(
            "click", function () { toggleLike(photo.idx) }
          )

        gallery.append(photoNode);
    })
}

function toggleLike(idx) {
    if (my_info.like.indexOf(idx) === -1) {
        my_info.like.push(idx);
        for (var i = 0; i < photos.length; i++) {
          if (photos[i].idx === idx) {
            photos[i].likes++;
            break;
          }
        }
    } else {
        my_info.like = my_info.like.filter(
            function (it) { return it !== idx; }
          );
          for (var i = 0; i < photos.length; i++) {
            if (photos[i].idx === idx) {
              photos[i].likes--;
              break;
            }
          }
    }
    // 최종적용
    showPhotos();
  }
  


function init() {
    showMyInfo();
    showPhotos();
}