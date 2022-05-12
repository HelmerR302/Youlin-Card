try {
    const encryptedData = window.location.search.replace("?data=", "");
    const bytes  = CryptoJS.AES.decrypt(encryptedData, window.yaoshi || 'secret key 123');
    const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    console.log(data);

} catch (_e) {
    alert("url 错误！")
}

