import './main.scss';
import './plugin.js'


$(document).ready(function(){
		let app = document.createElement('div');
		app.innerHTML = "<h1>这个是第二个页面</h1>";
		$('body').append(app);

		$('h1').greenify();
	})