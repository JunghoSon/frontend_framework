/*! util.validation.js */

var ValidationUtil={
	is_null:function(val){
		if(typeof val==='undefined' || val===null){
			return true;
		}else{
			return false;
		}
	},

	is_empty_string:function(val){
		if(val===''){
			return true;
		}else{
			return false;
		}
	}
};