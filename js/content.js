var searchForm;

function addHtmlToBody(htmlPath) {
  // jquery load text file
  path = chrome.runtime.getURL(htmlPath);
  // dataが読み込まれるまで待つ
  var htmlText = $.ajax({
    url: path,
    async: false,
  }).responseText;
  // get the body element
  var body = document.getElementsByTagName("body")[0];
  var div = document.createElement("div");
  // change background color
  console.log(htmlText);
  div.innerHTML = htmlText;
  body.appendChild(div);
  return div;
}

function profileJump() {
  console.log(
    document.querySelectorAll('[data-testid="AppTabBar_Profile_Link"]')[0].href
  );
  try {
    document
      .querySelectorAll('[data-testid="AppTabBar_Profile_Link"]')[0]
      .click();
  } catch (e) {
    console.log(e);
  }
}

function twitterSearch(e) {
  if (e.keyCode === 13) {
    window.location.href = "https://twitter.com/search?q=" + searchForm.value;
  }
  return false;
}

function makeChannelTitle() {
  var a = "# " + window.location.href.replace("https://twitter.com/", "");
  if (window.location.href.includes("search")) {
    a =
      "# " + window.location.href.replace("https://twitter.com/search?q=", "");
  } else if (window.location.href.includes("hashtag")) {
    a = "# " + window.location.href.replace("https://twitter.com/hashtag/", "");
  } else if (window.location.href.includes("notifications")) {
    a = "# " + "notification";
  } else if (window.location.href.includes("messages")) {
    a = "# " + "message";
  } else if (window.location.href.includes("bookmarks")) {
    a = "# " + "bookmark";
  } else if (window.location.href.includes("lists")) {
    a = "# " + "list";
  } else if (window.location.href.includes("moments")) {
    a = "# " + "moment";
  }
  return decodeUrlEncodedString(a);
}

window.onload = function () {
  console.log("content.js loaded");
  addHtmlToBody("html/sidebar.html").style.height =
    window.innerHeight - 44 + "px";
  addHtmlToBody("html/searchBar.html");
  document.querySelector("#profile").addEventListener("click", profileJump);
  addHtmlToBody("html/channelHeader.html");
  // 検索バーのイベントリスナーを追加
  searchForm = document.getElementById("searchInputForm");
  searchForm.addEventListener("keypress", twitterSearch);
  // チャンネルタイトルを表示
  document.getElementById("channelTitle").innerText = makeChannelTitle();
};

window.onhashchange = function () {
  console.log("location changed!");
  document.getElementById("channelTitle").innerText = makeChannelTitle();
};

// decode URL encoded string
function decodeUrlEncodedString(str) {
  return decodeURIComponent(str.replace(/\+/g, " "));
}
