var popupObj 	= function()
{
	var main 	= this;
	
	main.drawObj = null;

	this.init 		= function(drawObj)
	{
		this.initEvt();
		this.drawObj = drawObj;
	}

	this.initEvt 	= function()
	{
		$(".overlay_close").click(function()
		{
			$("#overlay").fadeOut();
			$("#over_overlay").css("display","none");
		});

		$("#txt_fbgimage").click(function()
		{
			$(".popup").css("display","none");
			$("#overlay_image").css({"display":""});
			$("#overlay").css("display","inline");
			$("#over_overlay").fadeIn();
		});

		$("#btn_useimage").click(function()
		{
			$(".preview_area").html("<img src='" + $("#img_url").val() + "'>");
		});

		$("#project_list").on("change",function()
		{
			var descr = $(this).children(":selected").attr("descr");

			$("#view_pdescr").html(descr);
		});

		$("#upload_btn").click(function()
		{
			$("#loading").ajaxStart(function(){ $(this).show();	});
			$("#loading").ajaxComplete(function(){ $(this).hide(); });

			$.ajaxFileUpload(
			{
				url:'php/doajaxfileupload.php',
				secureuri:false,
				fileElementId:'fileToUpload',
				dataType: 'json',
				data:{name:'logan', id:'id'},
				success: function (data, status)
				{
					if(typeof(data.error) != 'undefined')
					{
						if(data.error != '')
						{
							alert(data.error);
						}else
						{
							$(".preview_area").html(data.msg);
						}
					}
				},
				error: function (data, status, e)
				{
					alert(e);
				}
			});
			
			return false;
		});

		$("#btn_addimg").click(function()
		{
			var url = $(".preview_area").children("img").attr("src");

			if($(".preview_area").html() == "") 
			{
				alert("Please select one file");
				return;
			}

			$("#txt_fbgimage").val(url);
			$("#overlay").fadeOut();
			$("#over_overlay").css("display","none");

			$("#canvas").css({"background-image":"url(" + url + ")"});
		});

		$("#btn_addprj").click(function()
		{
			var title 	= $("#project_title").val();
			var descr	= $("#project_descr").val();
			var data 	= $(this).data("canv_data");

			if(title == "")
			{
				alert("Please input title");
				return;
			}

			if($("#creat_project").children(".overlay_title").children("span").html() == "Create New Project")
				main.drawObj.canvas.clear().renderAll();

			$.ajax(
			{
				type: "POST",
				url: "php/ajax.php", 
				data: ({mode:'create_project',title:title,descr:descr,data:data}),
				cache: false,
				success: function(result)
				{
					if(result == -1)
					{
						alert("The project name you inputed already Exist!");
						return;
					}

					projectID = result;

					$("#overlay").fadeOut();
					$("#over_overlay").css("display","none");
					$("#font_protitle").html(title);

					alert("Successfullyl Saved!");
				}
			});
		});

		$("#btn_selprj").click(function()
		{
			var data 	= $("#project_list").children(":selected").attr("data");
			var obj 	= [];
			var title 	= $("#project_list").children(":selected").html();

			if(data) obj = JSON.parse(data);

			$("#font_protitle").html(title);

			projectID = $("#project_list").children(":selected").val();

			if(obj.length == 0)
			{
				$("#overlay").fadeOut();
				$("#over_overlay").css("display","none");
			
				main.drawObj.canvas.clear().renderAll();

				return;
			}

			main.drawObj.jsonToCanvas(data);

			$("#overlay").fadeOut();
			$("#over_overlay").css("display","none");
		});

		$("#btn_addnew").click(function()
		{
			var mtl  	= "";
			var html 	= "";
				html 	+= $("#add_object").find(".content_part:nth-child(2)").find("p").html() + ",";
				html 	+= $("#add_object").find(".content_part:nth-child(3)").find("p").html() + ",";
				html 	+= $("#add_object").find(".content_part:nth-child(4)").find("p").html() + ",";
				html 	+= $("#add_object").find(".content_part:nth-child(5)").find("p").html() + ",";
				html 	+= $("#obj_name").val() + ",";
				html 	+= $("#obj_width").val() + ",";
				html 	+= $("#obj_height").val() + ",";

			$("#add_object").find(".content_part:nth-child(6)").find("p").each(function()
			{
				mtl += $(this).html() + ";";
			});

			html += mtl;

			$.ajax(
			{
				type: "POST",
				url: "php/ajax.php", 
				data: ({mode:'create_object',data:html}),
				cache: false,
				success: function(result)
				{
					console.log(result);
					window.location.href = "index.php";
				}
			});
		});
	}
}