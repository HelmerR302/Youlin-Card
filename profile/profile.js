window.yaoshi = CryptoJS.enc.Base64.stringify(
  CryptoJS.enc.Base64.parse(`${window.location.host}-otmr9c`)
);

const loadProfile = () => {
  const encryptedData = window.location.search.replace("?data=", "");
  const bytes = CryptoJS.AES.decrypt(
    encryptedData,
    window.yaoshi || "secret key 123"
  );
  const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

  try {
    console.log(data);
  } catch (_e) {
    alert("URL错误！");
  }

  /* schema
    0: "",
    1: beardice_path
    2: [
        [
            0: platform info (index),
            1: account username,
            2: frequency
        ],
        [
            0: platform info (index),
            1: account username,
            2: frequency
        ]
    ]

    accounts: data[2]
  */

  let avatarString = data[1];
  $("#profileImg").attr(
    "src",
    `https://avatars.dicebear.com/api/${avatarString}.svg`
  );
  $("#profileName").html(data[0]);

  // replace [0] by i? so the next row can be i+1
  // clone a row & pase the data; i=+; i < data[2].length

  console.log(data[2]);
  for (let i = 0; i < data[2].length; i++) {
    let newRow = $("#infoRow").clone(true);
    $(newRow).removeAttr("id");

    $(newRow).find(".platformName").html(`${window.platforms[data[2][i][0]] || data[2][i][0]}`);

    $(newRow).find(".accountNameText").html(`@${data[2][i][1]}`);

    if (data[2][i][2] < 1) {
      $(newRow).find(".star1").css("color", "#FF8D29");
    } else if (data[2][i][2] == 1) {
      $(newRow).find(".star1, .star2").css("color", "#FF8D29");
    } else {
      $(newRow).find("#starGroup").css("color", "#FF8D29");
    }

    $("#info-body").append(newRow);
    newRow[0].style.display = "table-row";
  }

  $('#captcha-section').hide();
  $('#profile').show();
};

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

  function loadCaptcha() {
    window.captchaText = getRandomInt(1000, 9999);
    figlet(window.captchaText, function(err, data) {
      $('#captcha').html(data)
    });
  }      

  function checkCaptcha() {
    if ($('#captchaCheck').val() == window.captchaText) {
      $.cookie(`${window.location.host}-yanzheng`, 'verified', { expires: 30, path: '/' });
      loadProfile()
    } else {
      alert('请输入正确的验证码');
    }
  }

  if ($.cookie(`${window.location.host}-yanzheng`) == "verified") {
    loadProfile();
  } else {
    loadCaptcha();
  }

