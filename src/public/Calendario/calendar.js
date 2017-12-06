$(document).ready(function(){
	var vDate = new Date();

	$(".calendar").each(function(){
		actualizarCal($(this));
	});

	function actualizarCal(me){
		me.empty();

		if (me[0].hasAttribute("data-day") == false)
			$(me).attr("data-day", vDate.getDate());

		if (me[0].hasAttribute("data-month") == false)
		$(me).attr("data-month", vDate.getMonth());

		if (me[0].hasAttribute("data-year") == false)
			$(me).attr("data-year", vDate.getFullYear());


		var today = $(me).attr("data-day");
		var esteMes = $(me).attr("data-month");
		var esteAnio = $(me).attr("data-year");


		var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octube", "Noviembre", "Diciembre"];
		var semana = ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"];
		var largoMes = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

		var threshold = 2;

		var altDays = [];


		var pmonthlen = largoMes[esteMes-1];
		if (esteMes == 0)
			var pmonthlen = 11;

		var monthlen = largoMes[esteMes];

		var count = 1;

		$(me).append($("<time>"+meses[esteMes]+" del "+ esteAnio +"</time>"));

		var table = $("<table></table>")
		$(me).append(table);

		var bigDay = $("<div class='bigDay'></div>");
		//$(me).append(bigDay);


		var header = $("<tr></tr>");
		for(var e = 0; e < 7; e++)
			header.append($("<th>"+semana[e]+"</tr>"));
		$(table).append(header);

		for(var i = 0; i < 5; i++){	//Rows
			var row = $("<tr></tr>");
			table.append(row);

			for(var e = 0; e < 7; e++){	//Items
				var showDay = "err";
				var style = "";

				if (threshold <= 0){
					showDay = count;

					if (showDay > monthlen){
						style = "muted nextMonth";
						showDay -= monthlen;
					}else
					if (((showDay < today) && (esteMes <= vDate.getMonth())) || esteMes < vDate.getMonth()){
						style = "muted prev";
					}
					count++;
				}else{
					style = "muted prevMonth";
					showDay = pmonthlen-threshold+count;
					threshold--;
				}

				if($.inArray(showDay, altDays) != -1){
					style = style.concat(" alt");
					bigDay.addClass("alt");
				}

				if(showDay == today && threshold <=0 && showDay <= monthlen){
					style = style.concat(" today");
					bigDay.addClass("today");
					bigDay.append("<h2>"+today+"</h2>");
				}

				row.append("<td class='"+style+"'>"+showDay+"</td>");
			}
		}

	}
	$(document).on("click",".calendar td", function(){

		var cal = $(this).closest(".calendar");
		var mnt = parseInt(cal.attr("data-month"));
		var yr = parseInt(cal.attr("data-year"));

		var redo = false;
		if ($(this).hasClass("nextMonth")){
			if ((mnt + 1) > 11){
					cal.attr("data-month", 0);
					cal.attr("data-year", yr+1);
					mnt = 0;
					redo = true;
				}
				else
					cal.attr("data-month", mnt+1);
			actualizarCal(cal);
		}
		else
			if ($(this).hasClass("prevMonth")){
				if ((mnt - 1) < 0){
					cal.attr("data-month", 11);
					cal.attr("data-year", yr-1);
					mnt = 11;
					redo = true;
				}
				else
					cal.attr("data-month", mnt-1);
			actualizarCal(cal);
		}
		else
			$("#confirmarCita").fadeIn	(250);

		mnt = parseInt(cal.attr("data-month"));

		$("#confirmarCita").find("*[name='fecha']").val(this.innerHTML + "-" + (mnt+1) + "-" + cal.attr("data-year"));

	});
	/*$(".calendar .bigDay").on("click", function () {
		console.log("out");
		$(this).toggleClass("minimize");
	});*/
})