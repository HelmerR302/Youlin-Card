const encryptedData = window.location.search.replace("?data=", "");
     const bytes  = CryptoJS.AES.decrypt(encryptedData, window.yaoshi || 'secret key 123');
    const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

try {
    console.log(data);
} catch (_e) {
    alert("URL错误！");
}

// (3) ['', 'micah/bdea', Array(2)]
// 0: ""
// 1: "micah/bdea"
// 2: Array(2)
// 0: (3) ['', 'joi', '2']
// 1: Array(3)
// 0: ""
// 1: "joi22"
// 2: "1"
// length: 3
// [[Prototype]]: Array(0)
// length: 2
// [[Prototype]]: Array(0)
// length: 3
// [[Prototype]]: Array(0)

  /*
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
$("#profileImg").attr('src', `https://avatars.dicebear.com/api/${avatarString}.svg`);
$('#profileName').html(data[0]);


// replace [0] by i? so the next row can be i+1
// clone a row & pase the data; i=+; i < data[2].length

console.log(data[2]);
for (let i = 0; i < data[2].length ; i++) {
        let newRow = $('#infoRow').clone(true);
        $(newRow).removeAttr('id');
       
        $(newRow).find(".accountNameText").html(data[2][i][1]);
    
        if (data[2][i][2] < 1) {
            $(newRow).find('.star1').css('color', '#FF8D29');
        }
        else if (data[2][i][2] == 1) {
            $(newRow).find('.star1, .star2').css('color', '#FF8D29');
        } 
        else {
            $(newRow).find('#starGroup').css('color', '#FF8D29');
        }

        $('#info-part').append(newRow);
        newRow[0].style.display='flex';


}
