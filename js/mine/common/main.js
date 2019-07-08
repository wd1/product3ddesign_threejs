jQuery(document).ready(function()
{
	var initObj		= new initEnv();
});

var projectID = "";

var initEnv			= function()
{
	var main		= this;

	main.twodObj 	= null;
	main.threeObj 	= null;
	main.upload_dir = "tmp/";

	this.init		= function()
	{
		this.init2D();
		this.init3D();
		this.initCSS();
		this.initUploader();
		this.initDisplay();
		this.initEvent();

		$(window).resize(main.initCSS);
	};

	this.initCSS	= function()
	{
		main.twodObj.canvasCSS();
		main.threeObj.updateSize();
	};

	this.init2D		= function()
	{
		main.twodObj = new drawObj(main);
		main.twodObj.init();
	}

	this.init3D 	= function()
	{
		main.threeObj = new Obj3D(main);
	}

	this.initUploader = function()
	{
		var btn = document.getElementById('uploadBtn');
		var uploader = new ss.SimpleUpload(
		{
			button: btn,
			url: 'php/file_upload.php',
			name: 'uploadfile',
			multipart: true,
			hoverClass: 'hover',
			focusClass: 'focus',
			responseType: 'json',
		
			onComplete: function( filename, response ) 
			{
				var param = {src : main.upload_dir + filename, selectable : true};

				main.twodObj.addImage(param, function()
				{
					main.threeObj.updateModel();
				});

				$("#popup_area").fadeOut();
			},
			onError: function() 
			{
				console.log('error');
			}
		});
	}

	this.initEvent 	= function()
	{
		$("#btn_add_design").click(function()
		{
			$("#popup_area").css("display", "block");
		});

		$("#popup_area").click(function()
		{
			$("#popup_area").fadeOut();
		});

		$("#btn_view_3d").click(function()
		{
			main.threeObj.updateModel();
		});

		$(".over_popup").click(function(evt)
		{
			evt.stopPropagation();
		});
	}

	this.initDisplay = function()
	{
		main.twodObj.initTexture(product_list[0].map)
		main.threeObj.addObject(product_list[0]);
	}

    this.init();
}