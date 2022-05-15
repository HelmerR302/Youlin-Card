window.yaoshi = CryptoJS.enc.Base64.stringify(
  CryptoJS.enc.Base64.parse(`${window.location.host}-otmr9c`)
);

function getURL() {
  //generate random sprites and seeds, seeds is a set of 4 random characters
  let spritesList = [
    "male",
    "female",
    "human",
    "identicon",
    "bottts",
    "jdenticon",
    "gridy",
    "micah",
  ];

  let randomSprites = spritesList[Math.floor(Math.random() * 8)];

  function makeSeed() {
    let randomString = "";
    let letters = "abcdefghijklmnopqrstuvwxyz";
    for (let i = 0; i < 4; i++) {
      randomString += letters.charAt(Math.floor(Math.random() * 26));
    }
    return randomString;
  }

  window.avatarPath = `${randomSprites}/${makeSeed()}`;
  let randomURL = `https://avatars.dicebear.com/api/${window.avatarPath}.svg`;

  this.src = randomURL;
}

$("#profileImg").click(getURL);

// $(function () {
window.platforms = [
  "Facebook",
  "WhatsApp",
  "QQ",
  "WeChat",
  "QZone",
  "Tumblr",
  "Instagram",
  "Twitter",
  "Google",
  "Baidu Tieba",
  "Skype",
  "Viber",
  "Sina Weibo",
  "LINE",
  "Snapchat",
  "YY",
  "VKontakte ",
  "Pinterest",
  "LinkedIn",
  "Telegram",
  "Reddit",
  "Taringa",
  "Foursquare",
  "Renren",
  "Tagged",
  "Badoo",
  "Myspace",
  "Mix",
  "The Dots",
  "Kiwibox",
  "Skyrock",
  "Delicious",
  "Snapfish",
  "ReverbNation",
  "Flixster",
  "Care2",
  "CafeMom",
  "Ravelry",
  "Nextdoor",
  "Wayn",
  "Cellufun",
  "YouTube",
  "Upstream",
  "Classmates",
  "MyHeritage",
  "Viadeo",
  "Xing",
  "Xanga",
  "LiveJournal",
  "Friendster",
  "Funny or Die",
  "Gaia Online",
  "We Heart It",
  "Buzznet",
  "DeviantArt",
  "Flickr",
  "MeetMe",
  "Meetup",
  "Tout",
  "Mixi",
  "Douban",
  "Vero",
  "Quora",
  "Spreely",
  "Discord",
  "TikTok",
  "WT Social",
  "Triller",
  "Elpha",
  "Yubo",
  "PopBase",
  "Peanut ",
  "Valence",
  "Flip",
  "HouseParty",
  "Caffeine",
  "Steemit",
  "Goodreads",
  "Twitch",
  "CaringBridge",
  "WattPad",
  "Crunchyroll",
  "Soundcloud",
  "Mocospace",
  "CouchSurfing",
  "italki",
  "Medium",
  "Ello",
  "Vimeo",
  "Giphy",
  "Tribe",
  "Kuaishou",
  "Imgur",
  "Influenster",
  "FilmAffinity",
  "Open Diary",
  "Bubbly",
  "Clubhouse",
  "MeWe",
  "Gab",
  "Rumble",
];

const cnDict = {
  "Kuaishou": "快手",
}

const platformOptions = platforms.map(
  (platform) => `<option value=${platform.replace(" ", "-")}>${cnDict[platform] || platform}</option>`
);

$("#datalistOptions").append(platformOptions);

const addCard = (platformArg) => {
  let card = $("#copyMe").clone(true)[0];
  card.style.display = "flex";
  card.id = Math.random().toString().substr(2, 8);
  const platform = platformArg && platformArg.replace("-", " ")
  $(card).find(".platform-name").html(cnDict[platform] || platform)
  $(card).attr("data-platform", platformArg);
  $("#accountCardList").append(card);
};

// Apply callback on options
const onSearchInput = () => {
  let searchValue = $("#SMDataList")[0].value;
  $("#datalistOptions")[0].childNodes.forEach((option) => {
    if (option.value === searchValue) {
      addCard(option.value);
      // TODO: it should break, but forEach does not support break statement.
    }
  });
};

$("#SMDataList")[0].oninput = onSearchInput;

//

getCard = (e) => {
  return $(e).parents(".account-card").last()
}

onChangeUsername = (e) => {
  getCard(e).attr("data-username", e.value);
};

onChangePlatform = (e) => {
  const value = $(e).prev('input')[0].value
  getCard(e).attr("data-platform", value);
  $(e).parents(".platform-name").last().html(value);
};

// delete row button
function deleteCard(btn) {
  getCard(btn).remove()
}

//star group
$(".star").click(function (e) {
  $(this).parent().find(".star").removeClass("selected");
  $(this).addClass("selected");
  $(this).prevAll().addClass("selected");

  // const index = 2 - $(this).index();
  getCard(e.target).attr("data-frequency", $(this).index());
});

// Next button
$("#next-button").click(function () {
  $("#avatar-page").hide();
  $("#accounts-page").show().css({ display: "flex" });
});

$("#addIcon").click(() => addCard());

// Display the last page
const showLastPage = () => {
  $("#avatar-page").hide();
  $("#accounts-page").hide();
  $("#page-3").show();
};

const generateData = () => {
  /*
    0: "",
    1: beardice_path
    2: [
        [
            0: platform info (index),
            1: account username,
            2: frequency
        ]
    ]
  */
  let isValid = true;
  let data = [];
  data[0] = ""; // username
  // get beardice_path
  data[1] = window.avatarPath;
  data[2] = [];
  const rows = $(".account-row:not(#copyMe)");
  rows.each((index, row) => {
    const username = $(row).find(".username").attr("data-username");
    const frequency = $(row).find(".frequency").attr("data-frequency");
    if (!username && !frequency) {
      isValid = false;
      alert("请完整输入");
      return;
    }
    data[2][index] = [];
    data[2][index][0] = "";
    data[2][index][1] = username;
    data[2][index][2] = frequency;
  });
  if (!isValid) {
    return;
  }
  const ciphertext = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    window.yaoshi || "secret key 123"
  ).toString();
  console.log(ciphertext);
  showLastPage();
};

$("#generate").click(generateData);
