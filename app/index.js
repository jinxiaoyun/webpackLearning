import sub from './sub';
// import $ from 'jquery';
import './plugin.js'
import moment from 'moment';
import './main.scss';
var app = document.createElement('div');

let fun = ()=>{
	console.log('eeee');

	
};
fun();

const myPromise = Promise.resolve(33);

myPromise.then((num)=>{
	console.log(num);
});

app.innerHTML = '<h1>Just Test webpack<h1>';
app.appendChild(sub());

$('body').append(app);
$('body').append('<p>look at me! now is ' + moment().format() + '</p>');
$('p').greenify();