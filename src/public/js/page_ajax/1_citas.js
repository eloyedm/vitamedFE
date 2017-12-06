var serviceHost = 'http://vitalmed.xyz:8080';

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
		
		$.ajax({
			method: 'POST',
			url: serviceHost+'/services/nuevacita',
			data: {
				email: 		$('input[name="Mail"]'			).val(),
				password: 	$('input[name="Pass"]'			).val(),

				nombre: 	$('input[name="Fecha"]'			).val(),
				nombre: 	$('input[name="Hora"]'			).val(),
				apellidoP: 	$('input[name="Doctor"]'		).val(),
				apellidoM: 	$('input[name="Consultorio"]'	).val(),
				apellidoM: 	$('input[name="numCita"]'		).val()
			}
			,success: function(data){
				if (data.status == 202){
					//window.location.replace = ""
					alert("Se ha confirmado tu cita");

					//PROBABLEMENTE
					//window.location.href = "/recordatorios";
				}
			}
		})
	});



});