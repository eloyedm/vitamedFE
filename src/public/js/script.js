$(document).ready(function(){
	$("#signInBtn").click( function(event){
		window.location.replace = "./Citas.html";

		event.preventDefault();
		$.ajax({
			method: 'POST',
			url: '/services/login',
			data: {
				email: $('input[name="Mail"]'),
				password: $('input[name="Pass"]'),

				nombre: $('input[name="Nom"]'),
				apellidoP: $('input[name="aPat"]'),
				apellidoM: $('input[name="aMat"]')
			}
			,success: function(data){
				if (data.status == 202){
					//window.location.replace = ""
					alert("Te has registrado!");
				}
			}
		})
	})
	$("#logInBtn").click(function(event){
		window.location.replace = "./Citas.html";

		event.preventDefault();
		$.ajax({
			method: 'POST',
			url: '/services/login',
			data: {
				email: $('input[name="Mail"]'),
				password: $('input[name="Pass"]')
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


