// var serviceHost = 'http://vitamedbe.local';
var serviceHost = 'http://localhost:8000';
var cookies;

var user = readCookie('user');
$(document).ready(function(){


	$("#imagen1").on('click', function(event) {
		$("#tipoSecreto").val("1");
		});
	$("#imagen2").on('click', function() {
		$("#tipoSecreto").val("2");
		});
	$("#imagen3").on('click', function() {
		$("#tipoSecreto").val("3");
		});

	$( "#btnNuevaCita" ).click(function( event ) {
  		console.log( $( "#horaV" ) );
  		event.preventDefault();
	});

	$('#horaV').timepicker({minTime:'7:00am', maxTime:'6:30pm'});

	$("#btnNuevaCita").click( function(event){
		window.location.replace = "/citas";
		event.preventDefault();
		$.ajax({
			method: 'POST',
			url: serviceHost + '/services/cita',
			data: {
				tipo: $('input[name="tipoCita"]').val(),
				fecha: $('input[name="inp0"]').val(),
				hora: $('input[name="horaV"]').val(),
				departamento: $('input[name="departamento"]').val(),
				medico: $('input[name="medico"]').val(),
				consultorio:$('input[name="inp3"]').val(),
				user: user
			}
			,success: function(data){
				if (data.status == 202){
					//window.location.replace = ""
					alert("Cita agregada exitosamente");
				}
			}
		})
	})

})

function getCookieValue(a) {
    var b = document.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)');
    return b ? b.pop() : '';
}

function createCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name,"",-1);
}
