$(document).ready(function(){
	$("#signInBtn").click( function(event){
		window.location.replace = "./Citas.html";

		event.preventDefault();
		$.ajax({
			method: 'POST',
			url: 'http://vitamedbe.local/services/login',
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
				}
			}
		})
	})
	$("#loginBtn").click(function(event){
		window.location.replace = "./Citas.html";

		event.preventDefault();
		$.ajax({
			method: 'POST',
			url: 'http://vitamedbe.local/services/login',
			data: {
				email: $('input[name="Mail"]').val(),
				password: $('input[name="Pass"]').val()
			}
			,success: function(data){
				if (data.status == 202){
					//window.location.replace = ""
					alert("Te has logueado!");
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
})
