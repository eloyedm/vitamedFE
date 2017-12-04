var serviceHost = 'http://vitalmed.xyz:8080';
// var serviceHost = 'http://localhost:8000';
var cookies;

var user = readCookie('user');
$(document).ready(function(){

	$("#imagen1").on('click', function(event) {
		$("#tipoSecreto").val("1");
		$("#inp2").parent().show();
		$("#inp3").parent().hide();
		$("#inp4").parent().hide();
		$('#inp2').attr("disabled","disabled");
	});
	$("#imagen2").on('click', function() {
		$("#tipoSecreto").val("2");
		$("#inp2").parent().hide();
		$("#inp3").parent().show();
		$("#inp4").parent().show();
		$('#inp2').attr("disabled","disabled");
	});
	$("#imagen3").on('click', function() {
		$("#tipoSecreto").val("3");
		$("#inp2").parent().show();
		$("#inp3").parent().show();
		$("#inp4").parent().hide();
		$('#inp2').removeAttr("disabled");
		//Desbloquear departamento
		//cambiar *seleccione departamento
	});

	$( "#btnNuevaCita" ).click(function( event ) {
  		console.log( $( "#horaV" ) );
  		event.preventDefault();
	});

	$('#inp1').timepicker({minTime:'7:00am', maxTime:'6:30pm'});

	$("#btnNuevaCita").click( function(event){
		window.location.replace = "/citas";
		event.preventDefault();
		var tipo = $()
		 $.ajax({
			method: 'POST',
			url: serviceHost + '/services/cita',
			data: {
				tipo: $('input[name="tipoCita"]').val(),
				fecha: $('#inp0').val(),
				hora: $('#inp1').val(),
				departamento: $('#inp2').val(),
				medico: $('#inp3').val(),
				consultorio:$('#inp4').val(),
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

	if ($("#imagen1").length)
		$("#imagen1")[0].click();

	$.ajax({
		method: 'POST',
		url: serviceHost+ '/services/consultorios',
		success: function(data){
			var consultoriosContainer = $(".consultSelect");
			var stringCons = '';
			for (var consultorio of data.consultorios) {
				stringCons += '<option value="'+consultorio.numero+'" >'+consultorio.consultorio+'</option>';
			}
			consultoriosContainer.html(stringCons);
		}
	});
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
