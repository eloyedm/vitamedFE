var serviceHost = 'http://vitalmed.xyz:8080';
// var serviceHost = 'http://localhost:8000';
var cookies;

$(document).ready(function(){
	$("#signInBtn").click( function(event){
		event.preventDefault();
		$.ajax({
			method: 'POST',
			url: serviceHost+'/services/register',
			data: {
				email: $('input[name="Mail"]').val(),
				password: $('input[name="Pass"]').val(),

				nombre: $('input[name="Nom"]').val(),
				apellidoP: $('input[name="aPat"]').val(),
				apellidoM: $('input[name="aMat"]').val()
			}
			,success: function(data){
				if (data.status == 202){
					//window.location.replace = ""
					alert("Te has registrado!");
          window.location.replace('/home');
				}
			}
		})
	})
	$("#loginBtn").click(function(event){
		event.preventDefault();
		$.ajax({
			method: 'POST',
			url: serviceHost+'/services/login',
			data: {
				email: $('input[name="Mail"]').val(),
				password: $('input[name="Pass"]').val()
			}
			,success: function(data){
				if (data.status == 202){
					if(readCookie('sessionToken') == null){
						eraseCookie('username');
						eraseCookie('sessionToken');
					}
					window.location.replace('/home');
					createCookie('sessionToken', data.data.token, 1);
					createCookie('username', $('input[name="Mail"]').val());
				}
			}
		})
	})


	$(".hide-trigger").on("click",function(){
		$(".hide-trigger").each(function(){
			$(this).removeClass("active");
		})
		$(this).addClass("active");

		$("#hide-card").fadeOut(250, () => {
			$("#hide-card").find("h3")[0].innerHTML = $(this).find("strong")[0].innerHTML;
			$("#hide-card").fadeIn(100);
		});
	})

	$(".hide-target").on("click",function(){

		$(".hide-target").each(function(){
			$(this).removeClass("active");
			$("#" + $(this).attr("data-target")).fadeOut(250);
		})
		$(this).addClass("active");


		var hidenSeek = "#" + $(this).attr("data-target");
		var tmp = function(a){
			$(a).fadeIn(100);
		}
		setTimeout(tmp, 250, hidenSeek);
	});
	$(".hide-target").each(function(){
		$("#" + $(this).attr("data-target")).fadeOut(0);
	})
	if ($(".hide-target").length)
		$(".hide-target")[0].click();
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
