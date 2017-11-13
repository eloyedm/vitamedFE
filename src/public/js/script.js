$(document).ready(function(){
	$("#signInBtn").click( function(event){
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
	$(".hide-target")[0].click();
})
