// var serviceHost = 'http://vitalmed.xyz:8080';
var serviceHost = 'http://localhost:8000';
var cookies;

var user = readCookie('username');
var token = readCookie('sessionToken');
$(document).ready(function(){
	$("#bltypes > *").on("click", function(){
		$("#bltypes").slideUp(300);
		$("#curbltype").attr("src", $(this).attr("src")).attr("value",$(this).attr("value"));
	});

	$("#curbltype").on("click", function(){
		$("#bltypes").slideToggle(300);
	});

	$.ajax({
		method: "POST",
		url: serviceHost+'/services/userinfo',
		data: {
			user: user,
			token: token
		},
		success: function(data){
			console.log(data);
			$('#inp0').val(data.info[0].nombre);
			$('#inp1').val(data.info[0].apellidop);
			$('#inp2').val(data.info[0].apellidom);
		}
	})
})
