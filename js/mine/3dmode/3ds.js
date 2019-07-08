/*
	HTML5 3D Engine for manage various 3D objects.
*/

var Obj3D			= function(parent)
{
	var main		= this;

	/* main variables for set up env */

	main.container 	= null;
	main.scene 		= null;
	main.camera 	= null;
	main.renderer	= null;
	main.controls 	= null;
	main.canvID 	= "";
	main.base_model = null;

	main.init 		= function()
	{
		main.canvID = "area_3d";
		main.parent = parent;
		main.sWidth = $("#" + main.canvID).width();
		main.sHeight= $("#" + main.canvID).height();

		main.init3DEnv();
	}

	main.init3DEnv	= function()
	{
		main.scene 	= new THREE.Scene();
		main.clock 	= new THREE.Clock();

		main.initCamera();
		main.initLights();
		main.initRenderer();
		main.initControls();
		main.initEvent();
		main.render();
	}

	main.initCamera	= function()
	{
		var angle 	= 50;
		var near 	= 1;
		var far 	= 2000;
		var aspect 	= main.sWidth / main.sHeight;

		main.camera	= new THREE.PerspectiveCamera( angle, aspect, near, far);
		main.scene.add(main.camera);

		main.camera.position.set(0,0,80);
		main.camera.lookAt(main.scene.position);
	}

	main.initEvent      = function()
    {
        
    }

    main.updateSize 	= function()
    {
    	main.sWidth = $("#" + main.canvID).width();
		main.sHeight= $("#" + main.canvID).height();

		main.camera.aspect = main.sWidth / main.sHeight;
		main.camera.updateProjectionMatrix();
		main.webGLRenderer.setSize( main.sWidth, main.sHeight );
		main.webGLRenderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
    }

	main.initRenderer 	= function()
	{
		main.webGLRenderer = new THREE.WebGLRenderer({ antialias: true, alpha : true, transparent : true });
		main.webGLRenderer.setSize(main.sWidth, main.sHeight);
		main.webGLRenderer.setClearColor(0xffffff, 0);

		main.webGLRenderer.gammaInput = true;
		main.webGLRenderer.gammaOutput = true;
		main.webGLRenderer.shadowMapEnabled = true;
		main.webGLRenderer.shadowMapCascade = true;
		main.webGLRenderer.shadowMapType = THREE.PCFSoftShadowMap;
		main.webGLRenderer.shadowMapEnabled = true;
		main.webGLRenderer.shadowMapSoft    = true;

		document.getElementById(main.canvID).appendChild(main.webGLRenderer.domElement);
	}

	main.initControls 	= function()
	{
		main.controls 	= new THREE.OOrbitControls( main.camera, main.webGLRenderer.domElement );
		main.controls.constraint.smoothZoom = true;
		main.controls.constraint.zoomDampingFactor = 0.2;
		main.controls.constraint.smoothZoomSpeed = 5.0;
		main.controls.update();
	}

	main.initLights 	= function()
	{
  		var light_front	= new THREE.DirectionalLight( 0xdfdfdf );
  		var light_back	= new THREE.DirectionalLight( 0xdfdfdf );
		var hemiLight 	= new THREE.HemisphereLight( 0xffffff, 0x666666, 0.65 );

		var ambLight = new THREE.AmbientLight( 0xffffff ); // soft white light
            main.scene.add( ambLight );

		light_front.position.set( 0, 100, 150 );
		light_back.position.set( 0, 100, -150 );

		// light_front.castShadow = true;

		main.scene.add( hemiLight );
		main.scene.add( light_front );
		main.scene.add( light_back );
	}

	main.addObject      = function(obj)
	{
		if(obj.type == "gltf")
			main.loadGltf(obj);
		else if(obj.type == "obj")
			main.loadObjMTL(obj);
	}

	main.loadGltf 		= function(param)
	{
		var loader 		= new THREE.GLTFLoader();
		var obj_url  	= param.dir + param.model;

		loader.load( obj_url, function ( gltf ) 
		{
			var mesh = gltf.scene.children[0];

			gltf.scene.traverse( function ( child ) 
			{
				if ( child.isMesh ) 
				{
					child.material.side = THREE.DoubleSide;
				}
			});

			main.scene.add( mesh );
		});
	}

	main.loadObjMTL 	= function(param)
	{
		var objLoader   = new THREE.OBJLoader();
		var mtlLoader   = new THREE.MTLLoader();

		var dir_path    = param.dir;
		var obj_path    = param.obj;
		var mtl_path    = param.mtl;

		mtlLoader.setPath( dir_path );
		mtlLoader.load(mtl_path, function(materials) 
		{
			materials.preload();

			objLoader.setPath(dir_path);
			objLoader.setMaterials(materials);

			objLoader.load( obj_path, function ( object )
			{
				var mesh = object.children[0];
				var textureLoader = new THREE.TextureLoader();
				var geometry = new THREE.Geometry().fromBufferGeometry( mesh.geometry );
                    geometry.computeFaceNormals();
                    geometry.mergeVertices();
                    geometry.computeVertexNormals();
				
				var material = new THREE.MeshPhongMaterial(
				{
	                side : THREE.DoubleSide,
	                map : textureLoader.load(param.map),
	                normalMap: textureLoader.load(param.normal),
	                shading: THREE.SmoothShading,
	            });

	            main.base_model = new THREE.Mesh(geometry, material);
				main.scene.add(main.base_model);
			});
		});
	}

	main.updateModel = function()
	{
		// console.log(main.parent.twodObj.canvas);
		// main.base_model
		// var canvas      = document.getElementById("canvas");

		// var img_url 	= main.parent.twodObj.canvas.toDataURL();
		// var textureLoader = new THREE.TextureLoader();

		var texture = THREE.ImageUtils.loadTexture(main.parent.twodObj.canvas.toDataURL(), {}, function() 
        {
            // var width       = texture.image.width;
            // var height      = texture.image.height;

            // texture.wrapS   = texture.wrapT = THREE.ClampToEdgeWrapping;

            // main.scene.background = texture;
            main.base_model.material.map = texture;
        });

		// console.log(main.parent.twodObj.canvas.toDataURL());
		
		// main.base_model.material.map = new THREE.CanvasTexture(canvas);
	}

	main.render     = function() 
    {
        main.controls.update(main.clock.getDelta());
        requestAnimationFrame(main.render);
        main.webGLRenderer.render(main.scene, main.camera);
    }

    main.init();	
}
