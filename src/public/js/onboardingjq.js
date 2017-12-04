$(document).ready(function(){
	var paginaVisitada = false;
	if(!paginaVisitada)
		$(".blackscreen").show();
	
	$("#omitirs").on("click", function(){
		$(".blackscreen").fadeOut(300);
	});
	$(".onboard .enlaceob:nth-child(1)").on("click", function(){
		$(".blackscreen").fadeOut(300);
	});
})
