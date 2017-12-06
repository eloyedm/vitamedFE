var serviceHost = 'http://vitalmed.xyz:8080';
// var serviceHost = 'http://localhost:8000';
var cookies;

$(document).ready(function(){
	//DASHBOARD
	var user = readCookie('username');
	var userToken = readCookie('sessionToken');
	if 	($("#citasHolder").length > 0){
		dashboard_get_chart(serviceHost+'/services/get/general/grouped', user, userToken);
		dashboard_get_citas(serviceHost+'/services/recordatorios', user, userToken);
	}
	else if
	//CITAS
		//($("#cita_disponible").length > 0)
		//dashboard_get('routes/citas','Z_bas01@hotmail.com','123ABC');
	//else if
	//RECORDATORIOS
		($("#rec_general").length > 0)
		recordatorios_get(serviceHost+'/services/recordatorios',user,userToken);
	//else if
	//CONFIGURACION
		//($("#rec_general").length > 0)
		//dashboard_get('routes/configuracion','Z_bas01@hotmail.com','123ABC');


	function dashboard_get_chart(route, user, token){
	    $.ajax({
			url: route,
			async: true,
			type: 'POST',
			data: {user: user, token: token},
			success: function(response){
				var chartVal = [];
				var chartPoints = [];
				var fecha = new Date();

				//GRAFICO DE CITAS
				for (var i = 0; i < 12; i++){
					chartVal.push({'x': new Date(fecha.getFullYear(), fecha.getMonth() - i, 01), 'y': response.citas[i]});
					chartPoints.push(chartVal[i]);
				}

				//GRAFICOS
				var chart = new CanvasJS.Chart("chartContainer",
			    {
				    title: {
				    	text: "Tus citas el ultimo año"
				    },
			        data: [{
				    	color: "red",
				    	type: "area",
				    	fillOpacity: 0.3,
				    	lineThickness: 4,
				    	dataPoints: chartPoints
				    }]
			    });
				chart.render();
			},
			error: function(x,y,z){
				alert("Error " + x + y + z);
			}
		});
	}
	function dashboard_get_citas(route, user, token){
		$.ajax({
			url: route,
			async: true,
			type: 'POST',
			data: {user: user, token: token},
			success: function(response){


				//CITAS
				for (var i = 0; i < response.citas.length; i++){
					var ndate = response.citas[i].fecha.date.split(" ")[0]+ "   " +response.citas[i].hora.date.split(" ")[1].split(".")[0];
                 	var envelope = 	$('<div class="fill block"></div>')
                 			.append('<h4 class=" t-center"><TIME>'	+ndate								+'</TIME></h4>')
                 			/*.append('<p>Consultorio: '				+response.citas[i].consultorio		+'</p>')
                 			.append('<p>Doctor: '					+response.citas[i].doctor 			+'</p>')
                 			.append('<p>Numero de cita: '			+response.citas[i].cita 			+'</p>');
*/
                 		envelope = 	$('<li></li>')
                 			.append($('<div class="receta-container row"></div>')
                 			.append($('<div class="row"></div>')
                 			.append(envelope)));

					$("#citasHolder").append(envelope);
				}
				
				startCarousel();
			},
			error: function(x,y,z){
				alert("Error " + x + y + z);
			}
		});
	}
	//var disponibilidadCache =


	function citas_get(route, user, token){//Esta funcion, pide las fechas y horas disponibles dentro de un mes en intervalos de 30min de 7:00 a 7:00
	}

	function recordatorios_get(route, user, token){ //Solo pide los recordatorios 3 veces
		$.ajax({
			url: route,
			async: true,
			type: 'POST',
			data: {user: user, token: token},
			success: function(response){

				var result = response;
				var citasVal = result.citas;

				//CITAS
				for (var i = 0; i < citasVal.length; i++){

                 	var envelope = 	$('<div class="fill block"></div>')
                 			.append('<h4 class=" t-center"><TIME>'	+citasVal[i].fecha.date 		+'</TIME></h4>')
                 			.append('<p>Consultorio: '				+citasVal[i].consultorio+'</p>')
                 			.append('<p>Doctor: '					+citasVal[i].doctor 	+'</p>')
                 			.append('<p>Numero de cita: '			+citasVal[i].cita 		+'</p>');

                 		envelope = 	$('<li></li>')
                 			.append($('<div class="receta-container row"></div>')
                 			.append($('<div class="row"></div>')
                 			.append(envelope)));


					$("#rec_general").append(envelope);
					$("#rec_receta").append(envelope);
					$("#rec_especial").append(envelope);
				}
				startCarousel();
			},
			error: function(x,y,z){
				alert("Error " + x + y + z)
			}
		})
	}

    
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
