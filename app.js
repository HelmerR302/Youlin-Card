window.yaoshi = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Base64.parse(`${window.location.host}-otmr9c`));

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
  "definiteness",
  "upsilon",
  "vexatious",
  "mineralizes",
  "zappy",
  "commonweals",
  "dalesman",
  "tearing",
  "inarticulates",
  "dogvanes",
  "dioxid",
  "naturals",
  "tided",
  "autolysins",
  "hourly",
  "logotypies",
  "househusbands",
  "bitmapped",
  "subheads",
  "hibernators",
  "surceasing",
  "invisibles",
  "lysogenic",
  "unrobed",
  "daidzeins",
  "wanned",
  "disseizees",
  "gonadotropin",
  "bracteate",
  "lolloped",
  "enterocolitis",
  "herries",
  "singsong",
  "deserve",
  "unpressured",
  "ferlie",
  "manos",
  "muled",
  "towaways",
  "lordoses",
  "outdesigned",
  "betaking",
  "mining",
  "perithecia",
  "spleenworts",
  "dependants",
  "sojas",
  "modica",
  "stoked",
  "springtail",
  "autoclaving",
  "aliteracies",
  "burriest",
  "glossolalists",
  "nickeling",
  "trophallaxis",
  "sissyish",
  "jog",
  "haricot",
  "bicorns",
  "trichotomies",
  "notations",
  "galloping",
  "oven",
  "denumerability",
  "haplessnesses",
  "overlong",
  "reconvening",
  "dogtrots",
  "devolution",
  "marathoners",
  "boites",
  "hatracks",
  "downgraded",
  "nonunionized",
  "regarded",
  "metalworkers",
  "wos",
  "perchers",
  "copy",
  "lysogen",
  "novocaine",
  "finishing",
  "mottle",
  "iceboats",
  "fibrannes",
  "cobia",
  "duststorm",
  "horseman",
  "veinier",
  "pacy",
  "bushmaster",
  "volplane",
  "rickettsias",
  "dryers",
  "bassetted",
  "witchings",
  "duckwalked",
  "megalomaniacs",
  "amphidiploid",
  "duikers",
  "phantasying",
  "cooks",
  "wormed",
  "daylightings",
  "distrainers",
  "pillowing",
  "plasher",
  "avidnesses",
  "coesite",
  "pewees",
  "trivalent",
  "resectable",
  "vaultingly",
  "houselessnesses",
  "charactering",
  "proffered",
  "dealings",
  "condo",
  "twilled",
  "syphoning",
  "hypochondriasis",
  "demitting",
  "swains",
  "cystoscopies",
  "centerpieces",
  "enserfments",
  "bragging",
  "biometrical",
  "innocently",
  "oxidasic",
  "sinuosities",
  "superannuate",
  "ospreys",
  "kidnaps",
  "lipides",
  "gridlock",
  "evasions",
  "illnesses",
  "erratical",
  "hopefulnesses",
  "ectases",
  "carburetted",
  "pilotfish",
  "talapoin",
  "oxygenating",
  "biggish",
  "ctenophoran",
  "puddliest",
  "newspeaks",
  "gutlike",
  "acted",
  "conductions",
  "rootlet",
  "looed",
  "coalitions",
  "bandmates",
  "some",
  "fastness",
  "chics",
  "sickness",
  "cartelized",
  "tenderized",
  "badmouthing",
  "crisscrossing",
  "traumatism",
  "effusion",
  "boroughs",
  "sympatholytic",
  "kremlins",
  "expandors",
  "featliest",
  "tarmac",
  "crudes",
  "sannyasin",
  "fearlessly",
  "edentates",
  "redenying",
  "jubilations",
  "polariscopic",
  "wallboards",
  "dendrons",
  "garcon",
  "regather",
  "myoclonuses",
  "wishbones",
  "accelerant",
  "hawsepipe",
  "hawala",
  "masterminding",
  "fyke",
  "speechwriters",
  "coadmit",
  "alkine",
  "pyrheliometer",
  "antidiabetic",
  "brotherlinesses",
  "maculation",
  "overdose",
  "exophthalmoses",
];

const platformOptions = platforms.map(
  (platform) => `<option value=${platform} >`
);

$("#datalistOptions").append(platformOptions);

const addRow = () => {
  let row = $("#copyMe").clone(true)[0];
  row.style.display = "flex";
  row.id = Math.random().toString().substr(2, 8);
  $("#accountRowList").append(row);
};

// Apply callback on options
const onSearchInput = () => {
  let searchValue = $("#SMDataList")[0].value;
  $("#datalistOptions")[0].childNodes.forEach((option) => {
    if (option.value === searchValue) {
      addRow();
      // TODO: it should break, but forEach does not support break statement.
    }
  });
};

$("#SMDataList")[0].oninput = onSearchInput;

const accountRow = "<p>My Account {accountName}</p>";
// });

//
onChangeUsername = (e) => {
  $(e).parent().attr("data-username", e.value);
};

// delete row button
function deleteRow(btn) {
  var findRow = btn.parentNode;
  findRow.remove();
}

//star group
$(".star").click(function (e) {
  $(this).removeClass("selected");
  $(this).addClass("selected");
  $(this).nextAll().addClass("selected");
  
  const index = 2 - $(this).index();
  console.log(index);
  $(e.target).parent().attr("data-frequency", index);
});

// Next button
$("#next-button").click(function () {
  $("#avatar-page").hide();
  $("#accounts-page").show().css({ display: "flex" });
});

$("#addIcon").click(addRow);


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
  
    let data = [];
    data[0] = ""; // username
   // get beardice_path
   data[1] = window.avatarPath;
   data[2] = [];
   const rows = $(".account-row:not(#copyMe)");
   rows.each((index, row) => {
      const username = $(row).find(".username").attr('data-username');
      const frequency = $(row).find(".frequency").attr('data-frequency');
      if(!username && !frequency) {
        alert("请完整输入");
        return;
      }
      data[2][index] = [];
      data[2][index][0] = "";
      data[2][index][1] = username;
      data[2][index][2] = frequency
   })
    ;
   const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), window.yaoshi || 'secret key 123').toString();
   console.log(ciphertext);
}

$("#generate").click(generateData);