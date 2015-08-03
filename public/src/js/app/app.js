/*! app.js */

(function(){
	'use strict';

	var app={
		init:function(){
			this.set_event();
		},

		set_event:function(){
			$('button').on('click',function(e){
				alert('test!!');
			});
		}
	};

	app.init();
})();



