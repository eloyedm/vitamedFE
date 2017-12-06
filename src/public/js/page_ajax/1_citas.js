var serviceHost = 'http://vitalmed.xyz:8080';
// var serviceHost = 'http://localhost:8000';

var user = readCookie('username');
$(document).ready(function(){

	$(".calendar td").on("click", function(){
		$.ajax({
			method: 'POST',
			url: serviceHost+'/services/solicitar/cita',
			success: function(data){
				$('input[name="Doctor"]').val(data.doctor.nombre).attr('data-cita', data.doctor.iddoctor);
				$('input[name="Consultorio"]').val(data.consultorio.consultorio).attr('data-cita', data.consultorio.idconsultorio);
				$("#confirmarCita").fadeIn(400);
			}
		})
	});

	$("#confirmarCita").fadeOut(0);
	$("#confirmarCita *[name='cancel']").on("click", function(){
		$("#confirmarCita").fadeOut(400);
	})
	$("#confirmarCita *[name='submit']").on("click", function(){

		$("#confirmarCita").fadeOut(1000);
		$.ajax({
			method: 'POST',
			url: serviceHost+'/services/create/cita',
			data: {
				user: user,
				fecha: 	$('input[name="Fecha"]'			).val(),
				hora: 	$('input[name="Hora"]'			).val(),
				doctor: 	$('input[name="Doctor"]'		).attr('data-cita'),
				consultorio: 	$('input[name="Consultorio"]'	).attr('data-cita')
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
