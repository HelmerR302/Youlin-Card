window.yaoshi = CryptoJS.enc.Base64.stringify(
  CryptoJS.enc.Base64.parse(`${window.location.host}-otmr9c`)
);

window.avatarPath = "identicon/0"

/* Event handlers */
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

// delete card button
function deleteCard(btn) {
  getCard(btn).remove()
}

const onRandomizeNickname = () => {
  $("#profile-nickname")[0].value = generateName();
}

const showQRcode = (ciphertext) => {

  const qrCode = new QRCodeStyling({
    width: 300,
    height: 300,
    type: "svg",
    data: `${window.location.href}profile/?data=${ciphertext}`,
    image: `assets/logo.svg`,
    dotsOptions: {
        color: "#39395f",
    },
    imageOptions: {
        crossOrigin: "anonymous",
        margin: 10
    }
});
  qrCode.append(document.getElementById("qr-code"));
};

const resetPageHeight = () => {
  $("html").css({height: "100%", padding: 0, background: "white"});
  $("body").css({padding: 0, background: "white"});
}

// Display the last page
const showLastPage = (ciphertext) => {
  $('#page-3-avatar').attr("src", `https://avatars.dicebear.com/api/${window.avatarPath}.svg`);
  $('#page-3-nickname').html(window.nickname);
  showQRcode(ciphertext);
  resetPageHeight();
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
  data[0] = window.nickname || ""; // username
  // get beardice_path
  data[1] = window.avatarPath;
  data[2] = [];
  const cards = $(".account-card:not(#copyMe)");
  cards.each((index, card) => {
    const platform = $(card).attr("data-platform");
    const username = $(card).attr("data-username");
    const frequency = $(card).attr("data-frequency");
    if (!username || !frequency || !platform) {
      isValid = false;
      alert("请完整输入");
      return false;;
    }
    data[2][index] = [];
    data[2][index][0] = window.platforms.indexOf(platform) > -1 ? window.platforms.indexOf(platform) : platform;
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
  showLastPage(ciphertext);
};

/* Event listeners*/

$("#profileImg").click(getURL);

const platformOptions = [...platforms].sort().map(
  (platform) => `<option value=${platform.replace(" ", "-")}>${cnDict[platform] || platform}</option>`
);
$("#datalistOptions").append(platformOptions);

$("#SMDataList")[0].oninput = onSearchInput;

//star group
$(".star").click(function (e) {
  $(this).parent().find(".star").removeClass("selected");
  $(this).addClass("selected");
  $(this).prevAll().addClass("selected");

  getCard(e.target).attr("data-frequency", $(this).index());
});

$("#random-nickname-button").click(onRandomizeNickname)

// Next button
$("#next-button").click(function () {
  window.nickname = $("#profile-nickname")[0].value;
  $("#avatar-page").hide();
  $("#accounts-page").show().css({ display: "flex" });
  $("html").css({height: "auto"})
});

$("#addIcon").click(() => addCard());

$("#generate").click(generateData);

onRandomizeNickname();
