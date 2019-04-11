var code;

export function createCode() {
    code = '';
    var codeLength = 4;
    var codeV = document.getElementById('code');
    var random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
        'I', 'J', 'K',
        'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
    for (var i = 0; i < codeLength; i++) {
        var index = Math.floor(Math.random() * 36);
        code += random[index];
    }
    codeV.value = code;
}

export function validate() {
    var oValue = document.getElementById('input').value.toUpperCase();
    if (oValue == 0) {
        alert('请输入验证码');
    } else if (oValue != code) {
        alert('验证码不正确，请重新输入');
        oValue = ' ';
        createCode();
    } else {
        console.log("验证通过")
    }
}
