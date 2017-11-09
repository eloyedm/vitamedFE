$(document).ready(function(){
	$(".calendar").each(function(i){

		console.log("in");

		var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octube", "Noviembre", "Diciembre"];
		var semana = ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"];
		var largoMes = [31, 28-29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];




		var vDate = new Date();

		var threshold = 2;

		var altDays = [17,5,23];

		var today = vDate.getDate();
		var esteMes = vDate.getMonth();

		var pmonthlen = largoMes[esteMes-1];
		if (esteMes == 0)
			var pmonthlen = 11;

		var monthlen = largoMes[esteMes];

		var count = 1;

		$(this).append($("<time>"+meses[esteMes]+" del "+ vDate.getFullYear() +"</time>"));

		var table = $("<table></table>")
		$(this).append(table);

		var bigDay = $("<div class='bigDay'></div>");
		//$(this).append(bigDay);


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
						style = "muted";
						showDay -= monthlen;
					}else
					if (showDay < today){
						style = "muted prev";
					}
					count++;
				}else{
					style = "muted";
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

	})

	$(".calendar .bigDay").on("click", function () {
		console.log("out");
		$(this).toggleClass("minimize");
		//$(this).hide(500, "swing");
	})
})