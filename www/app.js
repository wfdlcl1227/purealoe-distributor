var content = document.getElementById('content');



var socket = io.connect();
socket.on('news', function (data) {
	console.log(data);
	socket.emit('myevent', { my: 'data' });
});

socket.on('myevent2', function (data) {
	console.log(data);
});

function getBundleList() {
    var xhr = new XMLHttpRequest(),
        method = 'GET',
        url = '/bundles';

    xhr.open(method, url, true);
    xhr.onload = function () {
        console.log(xhr.responseText);
        bundles = JSON.parse(xhr.responseText);
        renderBundleList();
    };
    xhr.send();
}


function renderBundleList() {
    var html = '';
    bundles.forEach(function(bundle) {
        html = html + '<div class="row">' + renderBundle(bundle) + '</div>';
    });
    content.innerHTML = html;
}

getBundleList();
