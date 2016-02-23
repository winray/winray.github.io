window.onload = function() {
    init();
    document.getElementById("shufflebutton").onclick = shuffle;
    add_select();
    select_picture();
    document.getElementById("select").onchange = select_picture;
}

function add_select() {
    var arrayPicture = new Array('picture1', 'picture2', 'picture3', 'picture4', 'picture5');
    var _select = document.createElement("select");
    for (var i = 0; i < arrayPicture.length; i++) {
        var _option = document.createElement("option");
        _option.value = arrayPicture[i];
        _option.text = arrayPicture[i];
        _select.appendChild(_option);
    }
    _select.id = "select";
    controls = document.getElementById("controls").appendChild(_select);
}

function select_picture() {
    var picture = document.getElementById("select").value;
    for (var i = 0; i < 15; ++i)
        pieces[i].picture.style.backgroundImage = 'url(pictures/' + picture + '.jpg)';
}

function piece(row, col, id, picture) {
    this.row = row;
    this.col = col;
    this.id = id;
    this.picture = picture;
}
var available = 15;
var pieces = [];

function init() {
    var divs = document.getElementById("puzzlearea").getElementsByTagName("div");
    for (var i = 0; i < 15; i++) {
        divs[i].className = "puzzlepiece";
        divs[i].onclick = clickChange;
        pieces[i] = new piece(Math.floor(i / 4), i % 4, i + 1, divs[i]);
        pieces[i].picture.style.backgroundPosition = "-" + pieces[i].col * 100 + "px -" + pieces[i].row * 100 + "px";
    }
    layout();
}

function layout() {
    for (var i = 0; i < 15; ++i) {
        pieces[i].picture.style.left = pieces[i].col * 100 + "px";
        pieces[i].picture.style.top = pieces[i].row * 100 + "px";
    }
}

function different(aRow, aCol) {
    for (var i = 0; i < 15; ++i)
        if (Math.abs(pieces[i].row - aRow) + Math.abs(pieces[i].col - aCol) != 1)
            pieces[i].picture.className = "puzzlepiece";
        else
            pieces[i].picture.className += " movablepiece";
}

function shuffle() {
    var j = 0;
    for (var i = 0; i < 100; ++i) {
        while (Math.abs(pieces[j].row - Math.floor(available / 4)) + Math.abs(pieces[j].col - available % 4) != 1)
            j == 14 ? j = 0 : j++;
        move(j, Math.floor(available / 4), available % 4);
        j == 14 ? j = 0 : j++;
    }
    layout();
}

function is_ok() {
    for (var i = 0; i < 15; i++)
        if (pieces[i].row * 4 + pieces[i].col != pieces[i].id - 1) return false;
    return true;
}

function move(pick, aRow, aCol) {
    available = pieces[pick].row * 4 + pieces[pick].col;
    pieces[pick].col = aCol, pieces[pick].row = aRow;
    layout();
}

function clickChange() {
    var pick = parseInt(this.textContent) - 1;
    var aRow = Math.floor(available / 4);
    var aCol = available % 4;
    if (Math.abs(pieces[pick].row - aRow) + Math.abs(pieces[pick].col - aCol) != 1) return;
    move(pick, aRow, aCol);
    different(Math.floor(available / 4), available % 4);
    if (is_ok())
        alert("You Win!");
}
