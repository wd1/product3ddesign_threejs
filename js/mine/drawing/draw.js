//***************************************************************************************//
//
//	FabricJS Object Drawing file
//
//***************************************************************************************//

var drawObj 		= function()
{
	var main 		= this;

	main.canvasID 	= "canvas";
	main.canvWidth	= 300;
	main.canvHeight	= 300;
	main.canvas 	= null;
	
	main.prevScale	= 1;

	main.init 		= function()
	{
		main.canvasCSS();
		main.initFabric();
	}

	main.canvasCSS	= function(width, height)
	{
		main.canvWidth  = $("#area_2d").width();
		main.canvHeight = $("#area_2d").height();

		if(width)
			main.canvWidth = width;

		if(height)
			main.canvHeight = height;

		$("#" + main.canvasID).attr("width",main.canvWidth);
		$("#" + main.canvasID).attr("height",main.canvHeight);
		$("#" + main.canvasID).css("width",main.canvWidth);
		$("#" + main.canvasID).css("height",main.canvHeight);

		if(main.canvas)
		{
			main.canvas.setWidth(main.canvWidth);
			main.canvas.setHeight(main.canvHeight);
			main.canvas.renderAll();
			main.canvas.calcOffset();
		}
	}

	main.initFabric	= function()
	{
		main.canvas = new fabric.Canvas(main.canvasID);
	}

	main.initTexture = function(img_src)
	{
		var param = {src : img_src, selectable : false, autofit : true};

		main.addImage(param, function(width, height)
		{
			main.canvasCSS(width, height);
		});
	}

	main.addImage 	= function(param, callback)
	{
		var imgObj = fabric.Image.fromURL(param.src, function(img)
		{
			var scale 	= Math.min(main.canvWidth / img.width, main.canvHeight / img.height);
			var width 	= param.width?param.width : img.width;
			var height  = param.height?param.height : img.height;

			if(param.autofit)
			{
				width 	= img.width * scale;
				height 	= img.height * scale;
			}

			var object 	= img.set(
			{
				width 	: width,
				height 	: height,
				angle 	: 0,
				selectable : param.selectable
			});

			main.canvas.add(object);

			if(callback)
				callback(img.width, img.height);
		});
	}

	main.addText 	= function(param)
	{
		main.canvas.add(new fabric.Text(param.text,
		{ 
			left 	: param.x,
			top 	: param.y, 
			fill 	: param.color,
		}));
	}
};