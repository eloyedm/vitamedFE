// var serviceHost = 'http://vitalmed.xyz:8080';
var serviceHost = 'http://localhost:8000';
$(document).ready(function(){

	$(".calendar td").on("click", function(){
		$("#confirmarCita").fadeIn(400);
	});

	$("#confirmarCita").fadeOut(0);
	$("#confirmarCita *[name='cancel']").on("click", function(){
		$("#confirmarCita").fadeOut(400);
	})
	$("#confirmarCita *[name='submit']").on("click", function(){

		$("#confirmarCita").fadeOut(1000);
	});

	$('#hora').timepicker({minTime:'7:00am', maxTime:'6:30pm'});

});
