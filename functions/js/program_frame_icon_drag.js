<SCRIPT LANGUAGE="JavaScript">

var Drag_icon = {

	obj : null,

	init : function(icon_name,o, oRoot, minX, maxX, minY, maxY, bSwapHorzRef, bSwapVertRef, fXMapper, fYMapper)
	{
	   // window definition
       // example for draging object in window with id  program_frame
       // Drag.init(document.getElementById("newmenuitem_move_bar"),document.getElementById("newmenuitem"));
       //oRoot = "";

       minY = 50;
       maxY = (window.parent.document.getElementById("program_frame").clientHeight - oRoot.clientHeight - 32);
       minX =29;
       maxX = (window.parent.document.getElementById("program_frame").clientWidth - oRoot.clientWidth - 35);
       bSwapHorzRef = false;
       bSwapVertRef = false;
       fXMapper = null;
       fYMapper = null;

       //bSwapHorzRef = false;
       //bSwapVertRef = false;
       //fXMapper = null;
       //fYMapper = null;
       // end of window definition



        o.onmousedown	= Drag_icon.start;


		o.hmode			= bSwapHorzRef ? false : true ;
		o.vmode			= bSwapVertRef ? false : true ;

		o.root = oRoot && oRoot != null ? oRoot : o ;

		if (o.hmode  && isNaN(parseInt(o.root.style.left  ))) o.root.style.left   = "0px";
		if (o.vmode  && isNaN(parseInt(o.root.style.top   ))) o.root.style.top    = "0px";
		if (!o.hmode && isNaN(parseInt(o.root.style.right ))) o.root.style.right  = "0px";
		if (!o.vmode && isNaN(parseInt(o.root.style.bottom))) o.root.style.bottom = "0px";

		o.minX	= typeof minX != 'undefined' ? minX : null;
		o.minY	= typeof minY != 'undefined' ? minY : null;
		o.maxX	= typeof maxX != 'undefined' ? maxX : null;
		o.maxY	= typeof maxY != 'undefined' ? maxY : null;

		o.xMapper = fXMapper ? fXMapper : null;
		o.yMapper = fYMapper ? fYMapper : null;

		o.root.onDragStart	= new Function();
		o.root.onDragEnd	= new Function();
        o.root.onDrag		= new Function();
        o.root.icon_name = icon_name;

	},

	start : function(e)
	{
	    var o = Drag_icon.obj = this;

		e = Drag_icon.fixE(e);
		var y = parseInt(o.vmode ? o.root.style.top  : o.root.style.bottom);
		var x = parseInt(o.hmode ? o.root.style.left : o.root.style.right );
		o.root.onDragStart(x, y);

		o.lastMouseX	= e.clientX;
		o.lastMouseY	= e.clientY;

		if (o.hmode) {
			if (o.minX != null)	o.minMouseX	= e.clientX - x + o.minX;
			if (o.maxX != null)	o.maxMouseX	= o.minMouseX + o.maxX - o.minX;
		} else {
			if (o.minX != null) o.maxMouseX = -o.minX + e.clientX + x;
			if (o.maxX != null) o.minMouseX = -o.maxX + e.clientX + x;
		}

		if (o.vmode) {
			if (o.minY != null)	o.minMouseY	= e.clientY - y + o.minY;
			if (o.maxY != null)	o.maxMouseY	= o.minMouseY + o.maxY - o.minY;
		} else {
			if (o.minY != null) o.maxMouseY = -o.minY + e.clientY + y;
			if (o.maxY != null) o.minMouseY = -o.maxY + e.clientY + y;
		}

		document.onmousemove	= Drag_icon.drag;
		document.onmouseup		= Drag_icon.end;


		return false;
	},

	drag : function(e)
	{
		e = Drag_icon.fixE(e);
		var o = Drag_icon.obj;
		var ey	= e.clientY;
		var ex	= e.clientX;
		var y = parseInt(o.vmode ? o.root.style.top  : o.root.style.bottom);
		var x = parseInt(o.hmode ? o.root.style.left : o.root.style.right );
		var nx, ny;

		if (o.minX != null) ex = o.hmode ? Math.max(ex, o.minMouseX) : Math.min(ex, o.maxMouseX);
		if (o.maxX != null) ex = o.hmode ? Math.min(ex, o.maxMouseX) : Math.max(ex, o.minMouseX);
		if (o.minY != null) ey = o.vmode ? Math.max(ey, o.minMouseY) : Math.min(ey, o.maxMouseY);
		if (o.maxY != null) ey = o.vmode ? Math.min(ey, o.maxMouseY) : Math.max(ey, o.minMouseY);

		nx = x + ((ex - o.lastMouseX) * (o.hmode ? 1 : -1));
		ny = y + ((ey - o.lastMouseY) * (o.vmode ? 1 : -1));

		if (o.xMapper)		nx = o.xMapper(y)
		else if (o.yMapper)	ny = o.yMapper(x)

		Drag_icon.obj.root.style[o.hmode ? "left" : "right"] = nx + "px";
		Drag_icon.obj.root.style[o.vmode ? "top" : "bottom"] = ny + "px";
		Drag_icon.obj.lastMouseX	= ex;
		Drag_icon.obj.lastMouseY	= ey;

		Drag_icon.obj.root.onDrag(nx, ny);
        document.getElementById(Drag_icon.obj.icon_name).src='./images/red-tack.png';
		return false;
	},

	end : function()
	{
		document.onmousemove = null;
		document.onmouseup   = null;
		Drag_icon.obj.root.onDragEnd(	parseInt(Drag_icon.obj.root.style[Drag_icon.obj.hmode ? "left" : "right"]),
									parseInt(Drag_icon.obj.root.style[Drag_icon.obj.vmode ? "top" : "bottom"]));
		Drag_icon.obj = null;
	},

	fixE : function(e)
	{
		if (typeof e == 'undefined') e = window.event;
		if (typeof e.layerX == 'undefined') e.layerX = e.offsetX;
		if (typeof e.layerY == 'undefined') e.layerY = e.offsetY;
		return e;
	}



};
</script>