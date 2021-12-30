export const utilService = {
    makeId,
    getRandomColor,
    handleDateCheck
}


function handleDateCheck(timestamp) {
    let date = new Date(timestamp).toLocaleDateString('he-IL');
    if (Date.now() - timestamp < 1000 * 60 * 60 * 24)
      date = 'Today at ' + new Date(timestamp).toLocaleTimeString('he-IL');
    else if (Date.now() - timestamp < 1000 * 60 * 60 * 24 * 2)
      date = 'Yesterday at ' + new Date(timestamp).toLocaleTimeString('he-IL');
    return date;
  };

function makeId(length = 5) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var txt = '';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}


function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}