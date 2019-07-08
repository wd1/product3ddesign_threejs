<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>3D Cloth Custom Builder</title>

<link rel="stylesheet" type="text/css" href="style/style.css" />
<link rel="stylesheet" type="text/css" href="style/jquery-ui.css" />
</head>

<script type="text/javascript" src="js/library/jquery.min.js"></script>
<script type="text/javascript" src="js/library/jquery-ui.min.js"></script>
<script type="text/javascript" src="js/library/fabric.min.js"></script>
<script type="text/javascript" src="js/library/SimpleAjaxUploader.js"></script>

<script type="text/javascript" src="js/library/three.js"></script>
<script type="text/javascript" src="js/library/OBJLoader.js"></script>
<script type="text/javascript" src="js/library/MTLLoader.js"></script>
<script type="text/javascript" src="js/library/GLTFLoader.js"></script>
<script type="text/javascript" src="js/library/OrbitControls.js"></script>
<!--script type="text/javascript" src="js/library/OrbitContaint.js"></script-->

<script type="text/javascript" src="js/mine/3dmode/product_list.js"></script>
<script type="text/javascript" src="js/mine/3dmode/3ds.js"></script>
<script type="text/javascript" src="js/mine/common/main.js"></script>
<script type="text/javascript" src="js/mine/drawing/draw.js"></script>

<body>
	<div id="top_area">
        <ul>
            <li>
                <img src="img/icon_setting.png">
                <span>PATTERNS</span>
            </li>
            <li id="btn_add_design">
                <img src="img/icon_background.png">
                <span>ADD DESIGN</span>
            </li>
            <li>
                <img src="img/icon_font.png">
                <span>ADD TEXT</span>
            </li>
            <li id="btn_view_3d">
                <img src="img/icon_3d.png">
                <span>View 3D</span>
            </li>
        </ul>
    </div>

    <div id="popup_area">
        <div id="design_area" class="over_popup">
            <h2>Add Design</h2>
            <h5>Please upload your new design.</h5>
            <button id="uploadBtn" class="btn btn-large btn-primary">Choose File</button>
        </div>
    </div>

    <div id="main_area">
        <div id="area_2d">
            <canvas id="canvas"></canvas>
        </div>
        <div id="area_3d"></div>
    </div>

    <div id="footer_area">
    </div>
</body>