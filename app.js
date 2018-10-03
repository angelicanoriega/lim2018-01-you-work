const name = document.getElementById('name');
const lastname = document.getElementById('lastname');
const id = document.getElementById('Id');
const btn = document.getElementById('btn');
const data = document.getElementById('usuari-information');
const visitantes = document.getElementById('Visitantes');
const administración = document.getElementById('Administración');
const date = new Date().getDate() + 'day ' + new Date().getMonth() + 'month ' + new Date().getFullYear() + 'year ';
const hour = new Date().getHours() + 'h ' + new Date().getMinutes() + 'min ' + new Date().getSeconds() + 'sec';
const information = {
    name: '',
    lastname: '',
    url: '',
    date: date,
    hour: hour
}
// btn.addEventListener('click',()=>{
//     information.name=name.value;
//     information.lastname=lastname.value;
//     firebase.database().ref(`${date}/${name.value}`).set(information);
// })


// capturar imagen
window.addEventListener("DOMContentLoaded", function () {
    const video = document.getElementById('video');
    const localStream = null;
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    const errBack = function (e) {
        console.log('Opps.. no se puede utilizar la cámara', e);
    };
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({
            video: true
        }).then(function (stream) {
            video.src = window.URL.createObjectURL(stream);
            video.play();
        });
    } else if (navigator.getUserMedia) { // Standard
        navigator.getUserMedia({
            video: true
        }, function (stream) {
            video.src = stream;
            video.play();
            localStream = stream;
        }, errBack);
    } else if (navigator.webkitGetUserMedia) { // WebKit-prefixed
        navigator.webkitGetUserMedia({
            video: true
        }, function (stream) {
            video.src = window.URL.createObjectURL(stream);
            video.play();
            localStream = stream;
        }, errBack);
    } else if (navigator.mozGetUserMedia) { // Mozilla-prefixed
        navigator.mozGetUserMedia({
            video: true
        }, function (stream) {
            video.src = window.URL.createObjectURL(stream);
            video.play();
            localStream = stream;
        }, errBack);
    }
    document.getElementById('tomar').addEventListener('click', function () {
        context.drawImage(video, 0, 0, 500, 360);
    });
    btn.addEventListener('click', () => {
        information.name = name.value;
        information.lastname = lastname.value;
        information.url = canvas.toDataURL();
        firebase.database().ref(`usuarios/${name.value}`).set(information);
    })
}, false);
const paintData = (name,lastname,date,hour, url, directionHtml) => {
    const div = document.createElement('div');
    const div2 = document.createElement('div');
    const div3 = document.createElement('div');
    const div4 = document.createElement('div');
    const img = document.createElement('img');
    const p = document.createElement("p");
    const text = document.createTextNode('Nombre '+name+' Apellido '+lastname+' Fecha '+date+' Hora '+hour);
    p.appendChild(text);
    img.setAttribute('src', url);
    img.setAttribute('class', 'img-fluid');
    div.setAttribute('class', "col-md-12");
    div2.setAttribute('class', "row");
    div3.setAttribute('class', "col-md-3");
    div4.setAttribute('class', "col-md-9");
    div3.appendChild(img);
    div4.appendChild(p);
    div2.appendChild(div3);  
    div2.appendChild(div4);
    div.appendChild(div2);
    directionHtml.appendChild(div);
}
visitantes.addEventListener('click',()=>{
    document.getElementById('second').removeAttribute('class');
    document.getElementById('first').setAttribute('class', "hidden");

})
administración.addEventListener('click',()=>{
    document.getElementById('three').removeAttribute('class');
    document.getElementById('first').setAttribute('class', "hidden");
    document.getElementById('Visitantes')
    const ref = firebase.database().ref("usuarios");
    ref.on("child_added", snap => {
        paintData(snap.val().name,snap.val().lastname,snap.val().date, snap.val().hour, snap.val().url, data);
    })
})