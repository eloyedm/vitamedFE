$(document).ready(function(){
	$("#bltypes > *").on("click", function(){
		$("#bltypes").slideUp(300);
		$("#curbltype").attr("src", $(this).attr("src")).attr("value",$(this).attr("value"));
	});

	$("#curbltype").on("click", function(){
		$("#bltypes").slideToggle(300);
	});
})