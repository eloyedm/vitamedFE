var serviceHost = 'http://vitalmed.xyz:8080';
// var serviceHost = 'http://localhost:8000';
var cookies;

var user = readCookie('username');

$(document).ready(function(){
  var recetasSlider = $("#rec_receta");
  var generalSlider = $("#rec_general");
  var specialSlider = $("#rec_especial");
  $.ajax({
    method: 'POST',
    url: serviceHost+ '/services/get/recetas',
    data: {
      user: user
    },
    success: function(data){
      var recetas = '';
      for (receta of data.recetas) {
        var fecha = new Date(receta.fecha.date);
        var hora = new Date(receta.hora.date);
        fecha = moment(fecha).format('DD/MMM/YYYY')
        hora = moment(hora).format('hh:mm a');
        recetas += '<li><div class="receta-container row"><div class="row"><div class="fill block"><h4 class=" t-center"><TIME datetime="'+fecha+' '+hora+'">'+fecha+' '+hora+'</TIME></h4><p>Departamento: Farmacia</p><p>&nbsp;</p></div></div></div></li>';
        recetasSlider.html(recetas);
      }
    }
  });
  $.ajax({
    method: 'POST',
    url: serviceHost+ '/services/get/general',
    data: {
      user: user
    },
    success: function(data){
      var citasContainer = '';
      for (cita of data.citas) {
        var fecha = new Date(cita.fecha.date);
        var hora = new Date(cita.hora.date);
        fecha = moment(fecha).format('DD/MMM/YYYY')
        hora = moment(hora).format('hh:mm a');
        citasContainer += '<li><div class="receta-container row"><div class="row"><div class="fill block"><h4 class=" t-center"><TIME datetime="'+fecha+' '+hora+'">'+fecha+' '+hora+'</TIME></h4><p>Consultorio:'+cita.consultorio+'</p><p>Doctor: </p><p>&nbsp;</p></div></div></div></li>';
        generalSlider.html(citasContainer);
      }
    }
  });
  $.ajax({
    method: 'POST',
    url: serviceHost+ '/services/get/especial',
    data: {
      user: user
    },
    success: function(data){
      var citasContainer = '';
      for (cita of data.citas) {
        var fecha = new Date(cita.fecha.date);
        var hora = new Date(cita.hora.date);
        fecha = moment(fecha).format('DD/MMM/YYYY')
        hora = moment(hora).format('hh:mm a');
        citasContainer += '<li><div class="receta-container row"><div class="row"><div class="fill block"><h4 class=" t-center"><TIME datetime="'+fecha+' '+hora+'">'+fecha+' '+hora+'</TIME></h4><p>Departamento:'+cita.consultorio+'</p><p>Doctor: </p><p>&nbsp;</p></div></div></div></li>';
        specialSlider.html(citasContainer);
      }
    }
  })
})
