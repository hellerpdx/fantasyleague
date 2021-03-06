/*
universalFunctions included
class included
behaviour included
crossDomainRequest included
popCalendar included
globalNav included
playerSearch included
xmlHTTPRequest included
selectPopulator included
toggleWatchListStatus included
flot included
formatNumberTea included
waintility included
playerTable included
gigya included
comparePlayers included
flexpop included
ppc included
createSubmitForm included
showLogin included
The above blocks of code can be excluded and included through the query string.  For example:
/flb/static/js/libraries?exclude=universalFunctions,class
*/

/* start universalFunctions */


// BROWSER DETECT
var ie = "Microsoft Internet Explorer";
var nn = "Netscape"; var ns = "Netscape";
var browser = navigator.appName;

var mac = "MacPPC";
var os = navigator.platform;

window.suggestmeyes_loaded = true; // Disallow spyware package from hitting undefined repeatedly

// GO TO SITE
function gotosite(site) {
	if(site != "") {
		self.location=site;
	}
}

// LAUNCH WINDOW
function launchWindow(url, name, width, height) {
	var x = 0;
	var y = 0;
	if(navigator.appVersion.length > 0 && navigator.appVersion.charAt(0) > '3' && navigator.appVersion.charAt(0) <= '9') {
		if(width > screen.availWidth - 12) {
			width = screen.availWidth - 12;
		}
		if(height > screen.availHeight - 75) {
			height = screen.availHeight - 75;
		}
		x = (screen.availWidth - 12 - width) / 2;
		y = (screen.availHeight - 75 - height) / 2;
	}
	var params =  "status=1,scrollbars=1,resizable=1,screenX=" + x + ",screenY=" + y + ",width=" + width + ",height=" + height + ")";
	var windowvar = window.open(url, name, params);
}

// LAUNCH LIVE DRAFT
function launchDraft(url, name, width, height) {
	var x = 0;
	var y = 0;
	var params =  "status=0,scrollbars=0,resizable=0,left=" + x + ",top=" + y + ",screenX=" + x + ",screenY=" + y + ",width=" + width + ",height=" + height + ")";
	var windowvar = window.open(url, name, params);
}

// LAUNCH FANTASYCAST
function launchFantasycast(url) {
	var hd = 750, wd = 990;
	var h = Math.min(hd,window.screen.availHeight-75);
	var w = Math.min(window.screen.availWidth,(Math.min(wd,window.screen.availWidth)+(h < hd ? 25 : 0)));
	var scrollbars = (h < hd || w < wd ? 'scrollbars=yes' : '');
	window.open(url, 'fantasycastWindow2', scrollbars+',location=yes,resizable=yes,height='+h+',width='+w);
	return true;
}

// DHTML CONTROLS
var layerRef = ''; var styleSwitch = ''; var layerRefOther = '';
if (document.getElementById) {
	layerRef = 'document.getElementById(layer)';
	layerRefOther = 'document.getElementById(referenceLayer)';
	styleSwitch = '.style'
} else if (browser == ns) {
	layerRef = 'document.layers[layer]'
	layerRefOther = 'document.layers[referenceLayer]'
} else if (browser == ie) {
	layerRef = 'document.all[layer]'
	layerRefOther = 'document.all[referenceLayer]'
	styleSwitch = '.style'
}

function show(layer) {
	eval(layerRef + styleSwitch).display = (browser == ie ? 'inline' : null );
	eval(layerRef + styleSwitch).visibility = 'visible';
}

function hide(layer) {
	if (eval(layerRef)) {
		eval(layerRef + styleSwitch).display = 'none';
		eval(layerRef + styleSwitch).visibility = 'hidden';
	}	
}

function hideAll() {
	for (var i = 0; i < layers.length; i++) {
		hide(layers[i]);
	}
}

function changeContents(layer, content) {
	eval(layerRef).innerHTML = content;
}

function move(layer, top, left) {
	eval(layerRef + styleSwitch).top = top;
	eval(layerRef + styleSwitch).left = left;
}

function moveToOther(layer, referenceLayer) {
	move(layer, eval(layerRefOther + styleSwitch).posTop, eval(layerRefOther + styleSwitch).posLeft);
}

function moveToMouse(e, layer, offset_x, offset_y) {
	x=getPointerX(e);
	y=getPointerY(e);
	move(layer, eval(y) + eval(offset_y), eval(x) + eval(offset_x));
}

function getPointerX(e) {
	return (e != '' ? e.pageX : (getRealLeftByObj(window.event.srcElement) + 5));
}

function getPointerY(e) {
	return (e != '' ? e.pageY : (getRealTopByObj(window.event.srcElement) + 5));
}

function getRealLeft(layer) {
	thisObj = document.getElementById(layer);
	xPos = getRealLeftByObj(thisObj);
	return xPos;
}

function getRealTop(layer) {
	thisObj = document.getElementById(layer);
	yPos = getRealTopByObj(thisObj);
	return yPos;
}

function getRealLeftByObj(thisObj) {
	xPos = 0;
	if (thisObj) {
		xPos = thisObj.offsetLeft;
		tempEl = thisObj.offsetParent;
		while (tempEl != null) {
			xPos += tempEl.offsetLeft;
			tempEl = tempEl.offsetParent;
		}
	}
	return xPos;
}

function getRealTopByObj(thisObj) {
	yPos = 0;
	if (thisObj) {
		yPos = thisObj.offsetTop;
		tempEl = thisObj.offsetParent;
		while (tempEl != null) {
			yPos += tempEl.offsetTop;
			tempEl = tempEl.offsetParent;
		}
	}
    return yPos;
}

function setCookie(name, value, age) {
	var expires = (!age) ? '' : ';expires=' + new Date(new Date().getTime() + age).toGMTString();
	document.cookie = name+"="+value + ";path=/"+com.espn.games.gameRoot+"/" + expires;
}
/* end universalFunctions */

/* start class */


Class = {
	create: function() {
		var parent = null;
		var properties = Array.prototype.slice.call(arguments);
		if (properties.length > 0 && typeof properties[0] == "function") parent = properties.shift();

		function klass() {
			this.initialize.apply(this, arguments);
		}

		klass.superclass = parent;
		klass.subclasses = [];

		if (parent) {
			var subclass = function() { };
			subclass.prototype = parent.prototype;
			klass.prototype = new subclass;
			parent.subclasses.push(klass);
		}

		klass.addProperties = function(source) {
			for (var property in source) {
				this.prototype[property] = source[property];
			}
			if (typeof this.prototype.initialize == "function" && typeof source._initialize == "function" && typeof source.initialize != "function") {
				var oldInit = this.prototype.initialize;
				this.prototype.initialize = function() {
					oldInit.apply(this, arguments);
					source._initialize.apply(this, arguments);
				};
			}
		};

		for (var i = 0; i < properties.length; i++) {
			klass.addProperties(properties[i]);
		}

		if (!klass.prototype.initialize) klass.prototype.initialize = function() { };

		klass.prototype.constructor = klass;

		return klass;
	}
};


/* end class */

/* start behaviour */


/*
   Behaviour v1.1 by Ben Nolan, June 2005. Based largely on the work
   of Simon Willison (see comments by Simon below).

   Description:
   	
   	Uses css selectors to apply javascript behaviours to enable
   	unobtrusive javascript in html documents.
   	
   Usage:   
   
	var myrules = {
		'b.someclass' : function(element){
			element.onclick = function(){
				alert(this.innerHTML);
			}
		},
		'#someid u' : function(element){
			element.onmouseover = function(){
				this.innerHTML = "BLAH!";
			}
		}
	};
	
	Behaviour.register(myrules);
	
	// Call Behaviour.apply() to re-apply the rules (if you
	// update the dom, etc).

   License:
   
   	Behaviour is entirely BSD licensed.
   	
   More information:
   	
   	http://ripcord.co.nz/behaviour/
   
*/   

var Behaviour = {
	list : new Array,
	
	register : function(sheet){
		Behaviour.list.push(sheet);
	},
	
	start : function(){
		Behaviour.addLoadEvent(function(){
			Behaviour.apply();
		});
	},
	
	apply : function(){
		for (h=0;sheet=Behaviour.list[h];h++){
			for (selector in sheet){
				list = $$(selector);
				
				if (!list){
					continue;
				}

				for (var i=0;element=list[i];i++){
					sheet[selector](element);
				}
			}
		}
	},
	
	addLoadEvent : function(func){
		
		var oldonload = window.onload;
		
		if (typeof window.onload != 'function') {
			window.onload = func;
		} else {
			window.onload = function() {
				oldonload();
				func();
			}
		}
	}
}

Behaviour.start();
/* end behaviour */

/* start crossDomainRequest */


/* You should be using:
CrossDomain.request(url, options)
CrossDomain.insertScript(url)
*/

var CrossDomain = {};
CrossDomain.SWFID = 'crossDomainRequestSWF';
CrossDomain.callbackOptions = [];

CrossDomain.createXHR = function() {
	if (window.XMLHttpRequest) {
		return new XMLHttpRequest();
	}
	
	try { return new ActiveXObject('Msxml2.XMLHTTP.6.0'); } catch(e) {}
	try { return new ActiveXObject('Msxml2.XMLHTTP.3.0'); } catch(e) {}
	try { return new ActiveXObject('Msxml2.XMLHTTP'); } catch(e) {}
	try { return new ActiveXObject('Microsoft.XMLHTTP'); } catch(e) {}
	return false; /* no XHR support */
}

CrossDomain.sameDomainRequest = function(url, options) {
	var xhr = CrossDomain.createXHR()
	if(!xhr) { return false; }
	
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			var responseJSON = (options.parseJSON) ? CrossDomain.parseJSON(xhr.responseText) : null;
			var response = {responseText:xhr.responseText, responseXML:xhr.responseXML, statusCode:xhr.status, responseJSON:responseJSON}
			if (xhr.status >= 200 && xhr.status < 300 && options.onSuccess) {
				options.onSuccess(response);
			} else if (xhr.status >= 400 && options.onError) {
				options.onError(response);
			} else if (options.onComplete) {
				options.onComplete(response);
			}
		}
	}
	
	var paramString = ''
	if (options.parameters) {
		var delim = '';
		for(option in options.parameters) {
			paramString+=delim+option+'='+options.parameters[option];
			delim = '&';
		}
	}
	
	var body = (options.method == 'POST') ? paramString : '';
	var urlAndQueryString = (options.method == 'POST' || paramString == '') ? url : url+'?'+paramString;
	
	try {
		xhr.open(options.method, urlAndQueryString, true);
		xhr.send(body);
	} catch(e) {
		return false;
	}

	return true;
}

CrossDomain.setDefaultOptions = function(options) {
	if (!options) {
		options = {};
	}
	options.method = (options.method == 'POST' || options.method == 'post') ? 'POST' : 'GET';
	options.parseXML = (options.parseXML == true);
	options.parseJSON = (options.parseJSON == true);
	options.timeout = (options.timeout && options.timeout > 0 && options.timeout < 100000) ? options.timeout : 15000;
	options.useCodepage = (options.useCodepage == true);
	options.timestamp = new Date().getTime();

	/* convert query string to parameters map */
	if (options.parameters && options.parameters.length && options.parameters.split) {
		parameters = {};
		var paramArray = options.parameters.split('&');
		for (var i=0; i<paramArray.length; ++i) {
			var pair = paramArray[i].split('=');
			if (pair.length == 2) {
				parameters[pair[0]] = pair[1];
			}
		}
		options.parameters = parameters;
	}
	return options;
}

CrossDomain.parseXML = function(text) {
	var parsed = null;
	try {
		if (document.implementation.createDocument) {
			parsed = (new DOMParser()).parseFromString(text,'text/xml');
		} else if (window.ActiveXObject) {
			parsed = new ActiveXObject('Microsoft.XMLDOM');
			parsed.async='false';
			parsed.loadXML(text);
		}
	} catch (e) {}
	return parsed;
}

CrossDomain.parseJSON = function(text) {
	var parsed = null;
	try {
		parsed = eval('(' + responseText + ')');
	} catch (e) {}
	return parsed;
}

CrossDomain.insertSWF = function() {
	if (!swfobject || !swfobject.hasFlashPlayerVersion) {
		return false; /* page needs to include SWFObject */
	}

	if (!document.getElementById(CrossDomain.SWFID)) { /* only render SWF once */
		if (!swfobject.hasFlashPlayerVersion("8")) {
			return false; /* required Flash version not installed */
		}
		
		var placeHolder = document.createElement("div");
		placeHolder.id = CrossDomain.SWFID;
		document.body.appendChild(placeHolder);
		
		var flashvars = {
		};
		var params = {
			allowScriptAccess: "always",
			allowNetworking: "all"
		};
		var attributes = {
			style: "position:absolute;top:-100px;"
		};
		swfobject.embedSWF("http://g.espncdn.com/s/crossdomainrequest/crossdomain2.swf", CrossDomain.SWFID, "1", "1", "8", false, flashvars, params, attributes);
		
	}
	return true;
}

CrossDomain.storeCallback = function(options) {
	var index = CrossDomain.callbackOptions.push(options)-1;
	
	CrossDomain.callbackOptions[index].callback = function(responseText, statusCode) {
		var storedOptions = CrossDomain.callbackOptions[index];
		if (storedOptions != null) {
			CrossDomain.callbackOptions[index] = null;

			if (statusCode < 100) {
				statusCode = null; /* older browsers don't convey http status code to swf */
			}

			var responseXML = (storedOptions.parseXML) ? CrossDomain.parseXML(responseText) : null;
			var responseJSON = (storedOptions.parseJSON) ? CrossDomain.parseJSON(responseText) : null;

			if (storedOptions.onComplete) {
				storedOptions.onComplete({responseText:responseText, responseXML:responseXML, statusCode:statusCode, responseJSON:responseJSON});
			}
		}
	}
	
	window.setTimeout(function(){
		if (CrossDomain.callbackOptions[index] != null) {
			CrossDomain.callbackOptions[index].callback();
		}
	}, options.timeout); /* in case the response never comes back from swf */
	
	return index;
}

CrossDomain.makeRequestThroughSWF = function(options, callbackIndex) {
	if(!document.getElementById(CrossDomain.SWFID)) {
		return false; /* SWF not inserted */
	} else if (!document.getElementById(CrossDomain.SWFID).makeCrossDomainRequest) {
		if (!CrossDomain.queuedRequests) {
			CrossDomain.queuedRequests = [];
			CrossDomain.intervalId = window.setInterval(function(){
				if (document.getElementById(CrossDomain.SWFID).makeCrossDomainRequest) {
					window.clearInterval(CrossDomain.intervalId);
					CrossDomain.intervalId = null;
					while(CrossDomain.queuedRequests.length > 0) {
						var callbackIndex = CrossDomain.queuedRequests.shift();
						options = CrossDomain.callbackOptions[callbackIndex];
						CrossDomain.makeRequestThroughSWF(options, callbackIndex);
					}
					CrossDomain.queuedRequests = null;
				}
			}, 100);
		}
		CrossDomain.queuedRequests.push(callbackIndex);
	} else {
		document.getElementById(CrossDomain.SWFID).makeCrossDomainRequest(options.url, options.parameters, options.method, 'CrossDomain.callbackOptions['+callbackIndex+'].callback');
	}
	return true;
}

CrossDomain.request = function(url, options) {
	if (!document.getElementById) {
		return false; /* get a better browser! */
	}
	
	options = CrossDomain.setDefaultOptions(options);
	options.url = url;
	
	var successfullRequest = !options.useSWF && CrossDomain.sameDomainRequest(url, options);
	if (successfullRequest) {
		return true;
	}

	if (!CrossDomain.insertSWF()) {
		return false;
	}
	var callbackIndex = CrossDomain.storeCallback(options);
	return CrossDomain.makeRequestThroughSWF(options, callbackIndex);
};

CrossDomain.insertScript = function(url) {
	if (!url || !document.createElement) { return false; }

	var script = document.createElement('script');
	script.setAttribute('src', url);
	script.setAttribute('type', 'text/javascript');
	(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
	
	return true;
};


/* Old Syntax.  Instead, call CrossDomain.request() and CrossDomain.insertSWF() directly. */
function crossDomainRequest(url, options) {
	return (url) ? CrossDomain.request(url, options) : CrossDomain.insertSWF();
}
/* end crossDomainRequest */

/* start popCalendar */


(function($) {
PopupCalendar = Class.create({
	initialize: function(selectedDate, selectFunction, isActiveDate) {
		this.currentDate = new Date();
		this.showSelectedDate = selectedDate != null;
		this.selectedDate = (selectedDate ? selectedDate : this.currentDate);
		this.viewYear = this.selectedDate.getFullYear();
		this.viewMonth = this.selectedDate.getMonth();
		this.selectFunction = (selectFunction ? selectFunction : function(){});
		this.isActiveDate = (isActiveDate ? isActiveDate : function(d){ return true });
		this.container = this.createContainer();
	},
	
	createContainer: function() {
		var c = $('<table cellspacing="0" cellpadding="0" border="0" class="popupCalendarContainer"></table>');
		c.append('<tr class="popupCalendarNavRow"><td class="popupCalendarArrows prev"></td><td class="popupCalendarMonthYearName"></td><td class="popupCalendarArrows next"></td></tr>');
		c.append('<tr><td colspan="3"><table cellspacing="0" cellpadding="0" class="popupCalendarMonthDisplay"><tr class="popupCalendarDayHeaderRow"><th>Mo</th><th>Tu</th><th>We</th><th>Th</th><th>Fr</th><th>Sa</th><th>Su</th></tr></table></td></tr>');
		var _this = this;
		c.find('.popupCalendarArrows').click(function() { var d = $(this); if (d.hasClass('prev')) _this.viewPreviousMonth(); else _this.viewNextMonth(); });
		$('body').append(c.hide());
		return c;
	},

	isLeapYear: function(year) {
		return (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
	},

	getMonthDayCount: function(month, year) {
		var dayCounts = [31,28,31,30,31,30,31,31,30,31,30,31];
		return (month == 1 && this.isLeapYear(year) ? dayCounts[month] + 1 : dayCounts[month]);
	},

	getDayOfWeek: function(day, month, year) {
		var d = this.createDateObj(day, month, year);
		return d.getDay();
	},

	getMonthAbbrev: function(month) {
		var abbrevs = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
		return abbrevs[month];
	},

	createDateObj: function(day, month, year) {
		return new Date(year, month, day);
	},

	renderViewMonth: function() {
		var startDay = this.getDayOfWeek(1, this.viewMonth, this.viewYear);
		var daysInMonth = this.getMonthDayCount(this.viewMonth, this.viewYear);
		var lastDay = this.getDayOfWeek(daysInMonth, this.viewMonth, this.viewYear);
		var daysInWeek = 7;

		var isSelectedMonth = (this.selectedDate.getMonth() == this.viewMonth && this.selectedDate.getFullYear() == this.viewYear);
		var selectedDate = this.selectedDate.getDate();
		var isCurrentMonth = (this.currentDate.getMonth() == this.viewMonth && this.currentDate.getFullYear() == this.viewYear);
		var currentDateD = this.currentDate.getDate();

		var WEEK_START_DAY = 1;
		var startDate = 1 - ((daysInWeek + startDay - WEEK_START_DAY) % daysInWeek);
		var lastDate = daysInMonth + (daysInWeek - (lastDay - WEEK_START_DAY + 1)) % daysInWeek;
		var curWeek = null, _this = this;
		var monthContainer = this.container.find('.popupCalendarMonthDisplay');
		monthContainer.find('tr.popupCalendarWeek').remove();
		for (var i = startDate; i <= lastDate; i++) {
			if ((i - startDate) % daysInWeek == 0) curWeek = $('<tr></tr>').addClass('popupCalendarWeek');
			
			var realDay = (i >= 1 && i <= daysInMonth);
			var isActive = (realDay && this.isActiveDate(this.createDateObj(i, this.viewMonth, this.viewYear)));

			var thisCell = $('<td></td>').attr('monthDate', i);
			if (!realDay) thisCell.addClass('popupCalendarDayEmpty');
			else {
				if (isSelectedMonth && i == selectedDate && this.showSelectedDate) thisCell.addClass('popupCalendarDaySelected');
				if (isCurrentMonth && i == currentDateD) thisCell.addClass('popupCalendarDayCurrent');
				if (!isActive) thisCell.addClass('popupCalendarDayInactive');
			}
			if (realDay && isActive) thisCell.click(function() { _this.selectDate($(this)); });
			thisCell.html(realDay ? i+'' : '&nbsp;');
			curWeek.append(thisCell);
			
			if ((i - startDate) % daysInWeek == daysInWeek - 1) monthContainer.append(curWeek);
		}
		this.container.find('td.popupCalendarMonthYearName').html(this.getMonthAbbrev(this.viewMonth) + ' ' + this.viewYear);
	},

	viewNextMonth: function() {
		this.shiftViewMonth(1);
	},

	viewPreviousMonth: function() {
		this.shiftViewMonth(-1);
	},

	shiftViewMonth: function(delta) {
		var monthsInYear = 12;
		this.viewYear += Math.floor((this.viewMonth + delta) / monthsInYear);
		if (this.viewMonth + delta >= 0) this.viewMonth = (this.viewMonth + delta) % monthsInYear;
		else this.viewMonth = monthsInYear + ((this.viewMonth + delta) % monthsInYear);
		this.renderViewMonth();
	},

	moveCalendar: function(event) {
		this.container.css({top: ((event.pageY+15) + 'px'), left: ((event.pageX+22) + 'px') });
	},

	show: function(event) {
		this.renderViewMonth();
		this.moveCalendar(event);
		this.container.show();
		this.popped = true;
	},

	hide: function() {
		this.container.hide();
		this.popped = false;
	},

	toggle: function(event) {
		if (this.popped == true) this.hide();
		else this.show(event);
	},

	selectDate: function(cell) {
		var dateD = cell.attr('monthDate');
		this.showSelectedDate = true;
		var d = this.createDateObj(dateD, this.viewMonth, this.viewYear);
		this.selectedDate = d;
		this.hide();
		this.selectFunction(d);
	}
});
})(jQuery);
/* end popCalendar */

/* start globalNav */


/*****
RUNS THE ESPN HORIZONTAL NAV ON ESPN LEAGUE MANAGER
AUTHOR jonk
LAST UPDATED 09.07.2006
*****/

	
function initnav(obj) {
	if (document.getElementById && document.getElementById(obj)) {
		navRoot = document.getElementById(obj);
		for (i=0; i<navRoot.childNodes.length; i++) {
			node = navRoot.childNodes[i];
			// make sure drop downs don't extend past 990
			if (node.offsetLeft > 775) {
				var adjust = 775-node.offsetLeft;
				for (var j=0; j<node.childNodes.length; j++) {
					if (node.childNodes[j].nodeName.toUpperCase() == 'UL') {
						node.childNodes[j].style.left = adjust+'px';
					}
				}
			}
			node.onmouseover = function() {
				if (this.className.indexOf('lo') != -1) {
					if (this.className.indexOf('solid') != -1) {
						this.className = 'hi solid';
					} else {
						this.className = 'hi';
					}
				}
			}
			node.onmouseout = function() {
				if (this.className.indexOf('hi') != -1) {
					if (this.className.indexOf('solid') != -1) {
						this.className = 'lo solid';
					} else {
						this.className = 'lo'
					}
				}
			}
		}
	}
}

function goTo(where) {
	window.location = where;
}
function goToNew(where,winName,features) {
	window.open(where,winName,features);
}

// unrelated for html dropdowns
function gotosite(site) {
    if (site != "") {
        window.location=site;
    }
}


/*****
END ESPN HORIZONTAL NAV
*****/
/* end globalNav */

/* start playerSearch */


PlayerSuggester = Class.create();
PlayerSuggester.AJAX_THRESHOLD = 50;
PlayerSuggester.KEYPRESS_A = 65;
PlayerSuggester.KEYPRESS_Z = 90;
PlayerSuggester.KEYPRESS_UP = 38;
PlayerSuggester.KEYPRESS_DOWN = 40;
PlayerSuggester.KEYPRESS_13 = 13;
PlayerSuggester.PLAYERS_PER_PAGE = 6;
PlayerSuggester.SEARCH_DELAY = 350;
PlayerSuggester.MAX_NAME_LENGTH = 18;
PlayerSuggester.IE_INPUTFIELD_WIDTH = 149;
PlayerSuggester.POPUP_IMAGE_URL = 'http://g.espncdn.com/s/ffllm/07/images/gfx/popupcardicon.png';
PlayerSuggester.PNG_HACK_URL = 'http://g.espncdn.com/s/ffllm/05/images/pnghack.png';
PlayerSuggester.prototype = {

	suggestDiv: null,
	inputField: null,
	suggestUrl: null,
	cssPrefix: null,
	leagueId: null,
	teamId: null,
	suggestDivOpen: false,
	searchTimeout: null,
	varName: "",
	selectedRow: null,
	playerResults: null,
	playerMatches: null,
	lastSearch: "",
	currentSearch: "",
	page: null,
	isIE: false,
	focusedFirst: false,
	blurrable: true,
		
	initialize: function(searchObj) {
		this.suggestDiv = $(searchObj.suggestDiv);
		this.inputField = $(searchObj.inputField);
		this.cssPrefix = searchObj.cssPrefix;
		this.statId = searchObj.statId;
		this.chartSplitType = searchObj.chartSplitType;
		this.suggestUrl = "http://" + com.espn.env.host + "/" + com.espn.games.gameRoot + "/format/playerSuggestJSON";
		this.leagueId = com.espn.games.leagueId;
		this.teamId = com.espn.games.fromTeamId;
		this.chartPlayerId = searchObj.playerId;
		this.varName = searchObj.varName;
		this.page = 0;
		
		this.isIE = (document.all != null);
		if (this.isIE) this.inputField.style.width = PlayerSuggester.IE_INPUTFIELD_WIDTH + "px";
		this.inputField.setAttribute('autocomplete', 'off');
	},
		
	noReturn: function() {
		
	},
	
	submitSelectedPlayer: function() {
		if (this.selectedRow == null) return true;
		window.location.assign('http://' + com.espn.env.host + '/' + com.espn.games.gameRoot + '/freeagency?leagueId=' + this.leagueId + '&teamId=' + this.teamId + '&playerId=' + this.playerResults.players[this.selectedRow].playerId + '&avail=-1');
		return false;
	},
	
	focus: function() {
		if(!this.focusedFirst) {
			this.focusedFirst = true;
			this.inputField.value='';
			this.inputField.style.color='';
		}
		if (this.currentSearch != "") this.openSuggestBox();
	},
	
	blur: function() {
		if (this.blurrable) this.closeSuggestBox();
	},
	
	suggestDivOver: function() {
		this.blurrable = false;
	}, 
	
	suggestDivOut: function() {
		this.blurrable = true;
	},
	
	handleKeyUp: function(event, search) {
		var keyPressed = (window.event) ? event.keyCode : event.which;
		if ((keyPressed == PlayerSuggester.KEYPRESS_UP || keyPressed == PlayerSuggester.KEYPRESS_DOWN) && this.suggestDivOpen) {
			if (keyPressed == PlayerSuggester.KEYPRESS_DOWN) {
				var i = (this.selectedRow != null) ? this.selectedRow : (this.page * PlayerSuggester.PLAYERS_PER_PAGE) - 1;
				if (this.selectedRow != null) {
					this.unselectRow();
				}
				while (++i < this.playerResults.numResults) {
					if (this.playerMatchesSearch(this.playerResults.players[i])) {
						if ($(this.cssPrefix+'playerSearchRow'+this.playerResults.players[i].playerId)) this.selectRow(i);
						break;
					}
				}
			} else if (this.selectedRow != null) {
				var i = this.selectedRow;
				this.unselectRow();
				while (--i >= 0) {
					if (this.playerMatchesSearch(this.playerResults.players[i])) {
						if ($(this.cssPrefix+'playerSearchRow'+this.playerResults.players[i].playerId)) this.selectRow(i);
						break;
					}
				}
			}
			
		} else {
			this.page = 0;
			if (!search || search.replace(' ', '') == '') {
				clearTimeout(this.searchTimeout);
				this.closeSuggestBox();
				this.currentSearch = '';

			} else if (this.playerResults && this.playerResults.numResults < PlayerSuggester.AJAX_THRESHOLD && this.lastSearch != "" && search.toLowerCase().indexOf(this.lastSearch) == 0) { 
				this.currentSearch = search.toLowerCase();

				this.processSuggestion(this.playerResults);


			} else {
				this.lastSearch = search.toLowerCase();
				this.currentSearch = search.toLowerCase();

				clearTimeout(this.searchTimeout);
				this.searchTimeout = setTimeout(this.varName+".getSuggestJSON('"+search+"');",PlayerSuggester.SEARCH_DELAY);
			}
		}
		
		switch(search) {
		case 'whac-a-mole':
		case 'whack-a-mole':
			if (window.realtime != null && window.realtime.toast != null && typeof window.realtime.toast.whackingDay == 'function') {
				window.realtime.toast.whackingDay();
			}
			break;
		}
	},
	
	getSuggestJSON: function(search) {
		var params = "leagueId=" + this.leagueId + "&teamId=" + this.teamId + "&search=" + search + "&r=" + Math.floor(Math.random()*9999999);
				
		var _this = this;
		var _success = function(request) {
			_this.processSuggestion(eval('('+request.responseText+')'));
		};
		var temp = new Ajax.Request(this.suggestUrl, { method: 'get', parameters: params, onSuccess: _success});
	},
	
	createPlayerRow: function(playerObj, i) {
		var display = this.playerMatchesSearch(playerObj) ? 'block' : 'none';
		var onOver = 'onmouseover="' + this.varName + '.unselectRow();' + this.varName + '.selectRow(' + i + ');" ';
		var onOut = 'onmouseout=" ' + this.varName + '.unselectRow();" ';
			
		var divOpen = '<div id="' + this.cssPrefix + 'playerSearchRow' + playerObj.playerId + '" class="' + this.cssPrefix + 'playerSearchRow" style="display:' + display + ';"' + onOver + onOut + '>';
		var playerName = (playerObj.firstName + ' ' + playerObj.lastName).substr(0, PlayerSuggester.MAX_NAME_LENGTH);
				
		// CHARTS TAB
		if (this.varName == "playerSuggesterCharts") { 
			var playerInfo = '<div id="' + this.cssPrefix + 'playerSearchPlayerInfo' + playerObj.playerId + '" class="' + this.cssPrefix +'playerSearchPlayerInfo" onclick="Ppc.renderContentCharts({addlPlayerIds:' + playerObj.playerId + ',chartSplitType:\'' + this.chartSplitType + '\',statId:' + this.statId + ',playerId:' + this.chartPlayerId + ',leagueId:' + this.leagueId + ',teamId:' + this.teamId + '})">';
			var transButtonPlayerPop = '<div id="' + this.cssPrefix + 'playerSearchTransButtonPlayerPop' + playerObj.playerId + '" class="' + this.cssPrefix + 'playerSearchTransButtonPlayerPop"></div>';
		// PLAYER COMPARE
		} else if (this.varName == "playerSuggesterCompare" || this.varName == "playerSuggesterStaticCompare") {
			var playerInfo = '<div id="' + this.cssPrefix + 'playerSearchPlayerInfo' + playerObj.playerId + '" class="' + this.cssPrefix + 'playerSearchPlayerInfo" onclick="comparePlayersManager.addPlayer(event, ' + playerObj.playerId + ')">'
			var transButtonPlayerPop = '<div id="' + this.cssPrefix + 'playerSearchTransButtonPlayerPop' + playerObj.playerId + '" class="' + this.cssPrefix + 'playerSearchTransButtonPlayerPop"></div>';
		// MESSAGE BAORDS
		} else if (this.varName == "playerSuggesterMsgBoard") {
			var playerInfo = '<div id="' + this.cssPrefix + 'playerSearchPlayerInfo' + playerObj.playerId + '" class="' + this.cssPrefix + 'playerSearchPlayerInfo" onclick="document.getElementById(\'body\').value = document.getElementById(\'body\').value + \'[player#' + playerObj.playerId + ']' + playerObj.firstName + ' ' + playerObj.lastName+ '[/player]\'; document.getElementById(\'msgboard_playerName\').value=\'Last Name\'; document.getElementById(\'msgboard_playerName\').style.color=\'#999\'; document.getElementById(\'msgboard_playerSearchDiv\').style.visibility=\'hidden\'; playerSuggesterMsgBoard.closeMsgBoardSuggestBox();">'
			var transButtonPlayerPop = '<div id="' + this.cssPrefix + 'playerSearchTransButtonPlayerPop' + playerObj.playerId + '" class="' + this.cssPrefix + 'playerSearchTransButtonPlayerPop"></div>';
		// FIND A PLAYER
		} else {
			var playerInfo = '<div id="' + this.cssPrefix +'playerSearchPlayerInfo' + playerObj.playerId + '" class="' + this.cssPrefix +'playerSearchPlayerInfo" onclick="window.location.assign(\'http://' + com.espn.env.host + '/' + com.espn.games.gameRoot + '/freeagency?leagueId=' + this.leagueId + '&teamId=' + this.teamId + '&playerId=' + playerObj.playerId + '&avail=-1\')">'
			var popupTrigger = 'class="flexpop" content="tabs#ppc" instance="_ppc" tab="0" fpopHeight="357px" fpopWidth="490px" leagueId="' + this.leagueId + '" playerId="' + playerObj.playerId + '" teamId="' + this.teamId + '" cache="true"'
			var popupImage = '<img src="' + PlayerSuggester.POPUP_IMAGE_URL + '"' + popupTrigger + ' height="12" width="17" />';
			// IE PNG FIX
			if (this.isIE) { popupImage = '<img style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod=scale src=\'' + PlayerSuggester.POPUP_IMAGE_URL + '\');" src="' + PlayerSuggester.PNG_HACK_URL + '" width="17" height="12" border="0"' + popupTrigger + ' />'; }
			var transButtonPlayerPop = '<div id="playerSearchTransButtonPlayerPop' + playerObj.playerId + '" class="playerSearchTransButtonPlayerPop">' + popupImage + ' ' + playerObj.team + '</div>';
		}
		
		playerInfo = playerInfo + '<span class="' + this.cssPrefix +'playerSearchPlayerName">' + playerName + '</span> '
					+ '<span class="' + this.cssPrefix +'playerSearchTeamPosition">' + playerObj.proTeam + (playerObj.proTeam.length && (playerObj.position.length || playerObj.playerNumber.length) ? ' ' : '') + playerObj.position + (playerObj.position.length && playerObj.playerNumber.length ? ' ' : '') + playerObj.playerNumber + '</span>'
					+ '</div>';
					
		return divOpen + playerInfo + transButtonPlayerPop  + '</div>';
	},
	
	playerMatchesSearch: function(player) {
		return ((player.lastName.toLowerCase().indexOf(this.currentSearch) !== -1) || (player.firstName.toLowerCase().indexOf(this.currentSearch) !== -1) || player.proTeam.toLowerCase().indexOf(this.currentSearch) !== -1);
	},
	
	processSuggestion: function(playersObj) {
		var out = "";
		this.playerResults = playersObj;
		var shown=0, matches=0, firstIndex=0;
		var lastShownIndex = playersObj.numResults;
		for (var i = 0; i < playersObj.numResults; ++i) {
			var thisPlayer = playersObj.players[i];
			if (this.playerMatchesSearch(thisPlayer)) {
				if (matches >= this.page * PlayerSuggester.PLAYERS_PER_PAGE && shown < PlayerSuggester.PLAYERS_PER_PAGE) {
					if (shown == 0) {
						firstIndex = i;
					}
					out += this.createPlayerRow(thisPlayer, i);
					++shown;
					lastShownIndex = i;
				}
				++matches;
			}
		}
		this.playerMatches = matches;
		
		if (out == "") {
			this.closeSuggestBox();
		} else {
			out += this.showOptions(firstIndex, lastShownIndex);
			this.suggestDiv.innerHTML = out;
			this.openSuggestBox()
			
			if (this.playerMatches <= PlayerSuggester.PLAYERS_PER_PAGE) {
				var lastPlayerId = this.playerResults.players[lastShownIndex].playerId;
				$(this.cssPrefix + 'playerSearchPlayerInfo'+lastPlayerId).className = this.cssPrefix + 'playerSearchPlayerInfo ' + this.cssPrefix + 'playerSearchRowLast';
				$(this.cssPrefix + 'playerSearchTransButtonPlayerPop'+lastPlayerId).className = this.cssPrefix + 'playerSearchTransButtonPlayerPop ' + this.cssPrefix + 'playerSearchRowLast';
			}
		}
	},
	
	showOptions: function(firstIndex, lastShownIndex) {
		var out = "";
		var showPrev = false;
		var showNext = false;		
		if (this.playerMatches > PlayerSuggester.PLAYERS_PER_PAGE) {
			for (var i = 0; i < firstIndex; ++i) {
				if (this.playerMatchesSearch(this.playerResults.players[i])) {
					showPrev = true;
					break;
				}
			}		
			for (var i = lastShownIndex + 1; i < this.playerResults.numResults; i++) {
				if (this.playerMatchesSearch(this.playerResults.players[i])) {
					showNext = true;
					break;
				}
			}
			out += '<div class="' + this.cssPrefix + 'playerSearchOptions">';
						
			// HIDE "ALL PLAYERS" LINK WHEN NOT LEAGUE PLAYER SEARCH
			if (this.playerMatches >= 2 && this.varName == "playerSuggester") {
				out += '<div style="float: right;"><a href="javascript:$(\'playerSearch\').submit();">All ' + this.playerMatches + ' results &raquo;</a></div>';
			}
			var divider = '';
			if (showPrev) {
				out += '<a href="javascript:' + this.varName + '.flipPage(-1);">&laquo; Prev</a>';
				divider = ' | ';
			}
			if (showNext) {
				out += divider;
				out += '<a href="javascript:' + this.varName + '.flipPage(1);"> Next &raquo;</a>';
				divider = ' | ';
			}
			out += '<br clear="all" style="line-height: 2px;"/></div>';
		}
		return out;
		
	},
	
	flipPage: function(delta) {
		this.page += delta;
		if (this.page < 0 || Math.ceil(this.playerResults.numResults / PlayerSuggester.PLAYERS_PER_PAGE) - 1 < this.page) {
			this.page = 0;
		}
		this.processSuggestion(this.playerResults);
		this.inputField.focus();
	},
	
	openSuggestBox: function() {
		this.suggestDivOpen = true;
		this.suggestDiv.show();
	},
	
	closeSuggestBox: function() {
		this.suggestDivOpen = false;
		this.suggestDiv.hide();
	},
	
	closeMsgBoardSuggestBox: function() {
		this.closeSuggestBox();
		this.currentSearch = '';
		this.focusedFirst = false;
	},
	
	selectRow: function(i) {
		this.selectedRow = i;	
		$(this.cssPrefix+'playerSearchRow'+this.playerResults.players[i].playerId).className = this.cssPrefix+'playerSearchRowOver';
		//$('playerPopLink'+this.playerResults.players[i].playerId).show();
	},
		
	unselectRow: function() {
		if (this.selectedRow != null) {
			var playerRow = $(this.cssPrefix+'playerSearchRow'+this.playerResults.players[this.selectedRow].playerId)
			if (playerRow != null) {
				playerRow.className = this.cssPrefix+'playerSearchRow';
			}
			//$('playerPopLink'+this.playerResults.players[this.selectedRow].playerId).hide();
			this.selectedRow = null;
		}
	}
};
/* end playerSearch */

/* start xmlHTTPRequest */


/***********

THIS LIBRARY IS BEING DEPRECATED, CODE SHOULD BE REWORKED TO USE PROTOTYPE

***********/


var requests = new Object();
function fetch(requestName,url,processChangeMethodStr,fetchAsyc){
	requests[requestName]=null;
	if (window.XMLHttpRequest) {
		requests[requestName]=new XMLHttpRequest();
		if(fetchAsyc==true)requests[requestName].onreadystatechange=eval(processChangeMethodStr);
		requests[requestName].open("GET",url,fetchAsyc);
		requests[requestName].send(null);
	} else if (window.ActiveXObject) {
		requests[requestName] = new ActiveXObject("Microsoft.XMLHTTP");
		if(fetchAsyc == true)requests[requestName].onreadystatechange=eval(processChangeMethodStr);
		requests[requestName].open("GET", url, fetchAsyc);
		requests[requestName].send();
	}
	if(fetchAsyc==false)eval(processChangeMethodStr);
}
function getXMLData(request,pathEls,startObj,returnObj){
	
	var path=new Array();
	path=pathEls;
	if(isValidXML(request)){
		var currEl=startObj?startObj:request.responseXML;
		var i=0;
		if(path.length%2==0){
			while(i<path.length){
				var thisElName=path[i];
				var thisElIndex=path[i+1];
				i+=2;
				if(!currEl)return null;
				currEl=currEl.getElementsByTagName(thisElName);
				if(!currEl||currEl.length<thisElIndex)return null;
				currEl=currEl.item(thisElIndex);
			}
			return(!currEl?null:returnObj==true?currEl:!currEl.firstChild?'':currEl.firstChild.nodeValue);
		}else{return null;}
	}	
}
function isValidXML(request){
	return((request && request.readyState==4 && request.status==200)?true:false);
}
/* end xmlHTTPRequest */

/* start selectPopulator */

 // SELECT CONTROL POPULATOR
	function selectPopulator (control, values, names, defaultValue) {
	
		if(control.style.display == "none") {
			control.previousSibling.data = ""
			control.style.display = "inline"
		}
	
		var defaultIndex = -1;
		var prevSelectedValue = control.value
		var newSelectedIndex = -1;
		
		if (typeof control.options.remove == "function") {
			while (control.options.length > 0) control.options.remove(0);
		} else {
			control.options.length = 0;
		}
		for (var i = 0 ; i < values.length ; i++) {
			// FIND THE INDEX OF THE DEFAULT, IN CASE PREV SELECTION NOT VALID
			if (prevSelectedValue == values[i]) newSelectedIndex = i;
			if (defaultValue == values[i]) defaultIndex = i;
			control.options.add(new Option(names[i], values[i], false, false));
		}
		
		if (newSelectedIndex > -1) {
			control.selectedIndex = newSelectedIndex;
		} else {
			control.selectedIndex = defaultIndex;
		}
	}
/* end selectPopulator */

/* start toggleWatchListStatus */


var watchListManager;
(function($) {
	watchListManager = {
	
		messageParams: {
			fadeIn: 0,
			fadeOut: 500,
			ttl: 1500,
			idStr: "comparePlayersMessage",
			classStr: "comparePlayersMessage",
			top: -38,
			left: -30,
			message: "You have done something related to Watchlist.",
			rebindThickbox: true
		},
	
		toggleWatchListStatus: function (evt, playerId, teamId, leaugueId, aEl, callback) {
			var watchListPageUrl = "/" + com.espn.games.gameRoot + "/watchlist?leagueId=" + leagueId + "&amp;teamId=" + teamId;
			var watchListPageLauncher = '<a href="' + watchListPageUrl + '" style="text-decoration:underline;">Watchlist</a>';
		
			var addFaderMessage = "Player added &raquo; " + watchListPageLauncher;
			var remFaderMessage = "Player removed.";
			
			if (evt.pageX || evt.pageY) {
				var positions = { x: evt.pageX, y: evt.pageY }
			} else {
				posLeft = evt.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft) - document.documentElement.clientLeft;
				posTop = evt.clientY + (document.documentElement.scrollTop || document.body.scrollTop) - document.documentElement.clientTop;
				var positions = { x: posLeft, y: posTop }
			}
			var aEl = $(aEl);
			var isAdd = aEl.hasClass('offwatchlist');
			var addPlayerId = (isAdd ? playerId : null), removePlayerId = (isAdd ? null : playerId);
			var dataMap = {aj: true, addPlayerId: addPlayerId, removePlayerId: removePlayerId, leagueId: leagueId, teamId: teamId};
			$.get("/"+com.espn.games.gameRoot+"/watchlist", dataMap, function(data){ 
				if (data.result == "Success") {
					$(".watchList_" + playerId).toggleClass("offwatchlist onwatchlist").attr('title', (isAdd ? 'Click to remove from Watch List' : 'Click to add to Watch List'));
					if (typeof callback == "function") callback(aEl, addPlayerId, removePlayerId);
					messageFader.show(positions, watchListManager.messageParams, (isAdd ? addFaderMessage : remFaderMessage));
				} else if(data.errors) {
					errorMessage = "Failed: "
					for(var i=0; i < data.errors.length; i++) {
						errorMessage += data.errors[i] + " ";
					}
					messageFader.show(positions, watchListManager.messageParams, errorMessage);
				}
			}, "json");
			
			return true;
		},

		removePlayerFromWatchList: function(aEl, addPlayerId, removePlayerId) {
			var parentTable = $(aEl).parents('table.playerTableTable')[0];
			if (parentTable) {
				$("#plyr"+removePlayerId).hide();
				if ($('#' + parentTable.id + ' tr:gt(1):visible').length > 0) {
					$('#' + parentTable.id + ' tr:gt(1):visible:odd').removeClass('playerTableBgRow0').addClass('playerTableBgRow1');
					$('#' + parentTable.id + ' tr:gt(1):visible:even').removeClass('playerTableBgRow1').addClass('playerTableBgRow0');
				} else {
					$(parentTable).hide();
					if ($(parentTable).siblings('table.playerTableTable:visible').length == 0) {
						$('#playerTableContainerDiv').hide();
						$('#watchListEmptyNote').show();
					}
				}
			}
			return true;
		}
	};
})(jQuery);

/* end toggleWatchListStatus */

/* start flot */

// excanvas
if(!window.CanvasRenderingContext2D){(function(){var m=Math;var mr=m.round;var ms=m.sin;var mc=m.cos;var Z=10;var Z2=Z/2;var G_vmlCanvasManager_={init:function(opt_doc){var doc=opt_doc||document;if(/MSIE/.test(navigator.userAgent)&&!window.opera){var self=this;doc.attachEvent("onreadystatechange",function(){self.init_(doc)})}},init_:function(doc){if(doc.readyState=="complete"){if(!doc.namespaces["g_vml_"]){doc.namespaces.add("g_vml_","urn:schemas-microsoft-com:vml")}var ss=doc.createStyleSheet();ss.cssText="canvas{display:inline-block;overflow:hidden;"+"text-align:left;width:300px;height:150px}"+"g_vml_\\:*{behavior:url(#default#VML)}";var els=doc.getElementsByTagName("canvas");for(var i=0;i<els.length;i++){if(!els[i].getContext){this.initElement(els[i])}}}},fixElement_:function(el){var outerHTML=el.outerHTML;var newEl=el.ownerDocument.createElement(outerHTML);if(outerHTML.slice(-2)!="/>"){var tagName="/"+el.tagName;var ns;while((ns=el.nextSibling)&&ns.tagName!=tagName){ns.removeNode()}if(ns){ns.removeNode()}}el.parentNode.replaceChild(newEl,el);return newEl},initElement:function(el){el=this.fixElement_(el);el.getContext=function(){if(this.context_){return this.context_}return this.context_=new CanvasRenderingContext2D_(this)};el.attachEvent('onpropertychange',onPropertyChange);el.attachEvent('onresize',onResize);var attrs=el.attributes;if(attrs.width&&attrs.width.specified){el.style.width=attrs.width.nodeValue+"px"}else{el.width=el.clientWidth}if(attrs.height&&attrs.height.specified){el.style.height=attrs.height.nodeValue+"px"}else{el.height=el.clientHeight}return el}};function onPropertyChange(e){var el=e.srcElement;switch(e.propertyName){case'width':el.style.width=el.attributes.width.nodeValue+"px";el.getContext().clearRect();break;case'height':el.style.height=el.attributes.height.nodeValue+"px";el.getContext().clearRect();break}}function onResize(e){var el=e.srcElement;if(el.firstChild){el.firstChild.style.width=el.clientWidth+'px';el.firstChild.style.height=el.clientHeight+'px'}}G_vmlCanvasManager_.init();var dec2hex=[];for(var i=0;i<16;i++){for(var j=0;j<16;j++){dec2hex[i*16+j]=i.toString(16)+j.toString(16)}}function createMatrixIdentity(){return[[1,0,0],[0,1,0],[0,0,1]]}function matrixMultiply(m1,m2){var result=createMatrixIdentity();for(var x=0;x<3;x++){for(var y=0;y<3;y++){var sum=0;for(var z=0;z<3;z++){sum+=m1[x][z]*m2[z][y]}result[x][y]=sum}}return result}function copyState(o1,o2){o2.fillStyle=o1.fillStyle;o2.lineCap=o1.lineCap;o2.lineJoin=o1.lineJoin;o2.lineWidth=o1.lineWidth;o2.miterLimit=o1.miterLimit;o2.shadowBlur=o1.shadowBlur;o2.shadowColor=o1.shadowColor;o2.shadowOffsetX=o1.shadowOffsetX;o2.shadowOffsetY=o1.shadowOffsetY;o2.strokeStyle=o1.strokeStyle;o2.arcScaleX_=o1.arcScaleX_;o2.arcScaleY_=o1.arcScaleY_}function processStyle(styleString){var str,alpha=1;styleString=String(styleString);if(styleString.substring(0,3)=="rgb"){var start=styleString.indexOf("(",3);var end=styleString.indexOf(")",start+1);var guts=styleString.substring(start+1,end).split(",");str="#";for(var i=0;i<3;i++){str+=dec2hex[Number(guts[i])]}if((guts.length==4)&&(styleString.substr(3,1)=="a")){alpha=guts[3]}}else{str=styleString}return[str,alpha]}function processLineCap(lineCap){switch(lineCap){case"butt":return"flat";case"round":return"round";case"square":default:return"square"}}function CanvasRenderingContext2D_(surfaceElement){this.m_=createMatrixIdentity();this.mStack_=[];this.aStack_=[];this.currentPath_=[];this.strokeStyle="#000";this.fillStyle="#000";this.lineWidth=1;this.lineJoin="miter";this.lineCap="butt";this.miterLimit=Z*1;this.globalAlpha=1;this.canvas=surfaceElement;var el=surfaceElement.ownerDocument.createElement('div');el.style.width=surfaceElement.clientWidth+'px';el.style.height=surfaceElement.clientHeight+'px';el.style.overflow='hidden';el.style.position='absolute';surfaceElement.appendChild(el);this.element_=el;this.arcScaleX_=1;this.arcScaleY_=1}var contextPrototype=CanvasRenderingContext2D_.prototype;contextPrototype.clearRect=function(){this.element_.innerHTML="";this.currentPath_=[]};contextPrototype.beginPath=function(){this.currentPath_=[]};contextPrototype.moveTo=function(aX,aY){this.currentPath_.push({type:"moveTo",x:aX,y:aY});this.currentX_=aX;this.currentY_=aY};contextPrototype.lineTo=function(aX,aY){this.currentPath_.push({type:"lineTo",x:aX,y:aY});this.currentX_=aX;this.currentY_=aY};contextPrototype.bezierCurveTo=function(aCP1x,aCP1y,aCP2x,aCP2y,aX,aY){this.currentPath_.push({type:"bezierCurveTo",cp1x:aCP1x,cp1y:aCP1y,cp2x:aCP2x,cp2y:aCP2y,x:aX,y:aY});this.currentX_=aX;this.currentY_=aY};contextPrototype.quadraticCurveTo=function(aCPx,aCPy,aX,aY){var cp1x=this.currentX_+2.0/3.0*(aCPx-this.currentX_);var cp1y=this.currentY_+2.0/3.0*(aCPy-this.currentY_);var cp2x=cp1x+(aX-this.currentX_)/3.0;var cp2y=cp1y+(aY-this.currentY_)/3.0;this.bezierCurveTo(cp1x,cp1y,cp2x,cp2y,aX,aY)};contextPrototype.arc=function(aX,aY,aRadius,aStartAngle,aEndAngle,aClockwise){aRadius*=Z;var arcType=aClockwise?"at":"wa";var xStart=aX+(mc(aStartAngle)*aRadius)-Z2;var yStart=aY+(ms(aStartAngle)*aRadius)-Z2;var xEnd=aX+(mc(aEndAngle)*aRadius)-Z2;var yEnd=aY+(ms(aEndAngle)*aRadius)-Z2;if(xStart==xEnd&&!aClockwise){xStart+=0.125}this.currentPath_.push({type:arcType,x:aX,y:aY,radius:aRadius,xStart:xStart,yStart:yStart,xEnd:xEnd,yEnd:yEnd})};contextPrototype.rect=function(aX,aY,aWidth,aHeight){this.moveTo(aX,aY);this.lineTo(aX+aWidth,aY);this.lineTo(aX+aWidth,aY+aHeight);this.lineTo(aX,aY+aHeight);this.closePath()};contextPrototype.strokeRect=function(aX,aY,aWidth,aHeight){this.beginPath();this.moveTo(aX,aY);this.lineTo(aX+aWidth,aY);this.lineTo(aX+aWidth,aY+aHeight);this.lineTo(aX,aY+aHeight);this.closePath();this.stroke()};contextPrototype.fillRect=function(aX,aY,aWidth,aHeight){this.beginPath();this.moveTo(aX,aY);this.lineTo(aX+aWidth,aY);this.lineTo(aX+aWidth,aY+aHeight);this.lineTo(aX,aY+aHeight);this.closePath();this.fill()};contextPrototype.createLinearGradient=function(aX0,aY0,aX1,aY1){var gradient=new CanvasGradient_("gradient");return gradient};contextPrototype.createRadialGradient=function(aX0,aY0,aR0,aX1,aY1,aR1){var gradient=new CanvasGradient_("gradientradial");gradient.radius1_=aR0;gradient.radius2_=aR1;gradient.focus_.x=aX0;gradient.focus_.y=aY0;return gradient};contextPrototype.drawImage=function(image,var_args){var dx,dy,dw,dh,sx,sy,sw,sh;var oldRuntimeWidth=image.runtimeStyle.width;var oldRuntimeHeight=image.runtimeStyle.height;image.runtimeStyle.width='auto';image.runtimeStyle.height='auto';var w=image.width;var h=image.height;image.runtimeStyle.width=oldRuntimeWidth;image.runtimeStyle.height=oldRuntimeHeight;if(arguments.length==3){dx=arguments[1];dy=arguments[2];sx=sy=0;sw=dw=w;sh=dh=h}else if(arguments.length==5){dx=arguments[1];dy=arguments[2];dw=arguments[3];dh=arguments[4];sx=sy=0;sw=w;sh=h}else if(arguments.length==9){sx=arguments[1];sy=arguments[2];sw=arguments[3];sh=arguments[4];dx=arguments[5];dy=arguments[6];dw=arguments[7];dh=arguments[8]}else{throw"Invalid number of arguments";}var d=this.getCoords_(dx,dy);var w2=sw/2;var h2=sh/2;var vmlStr=[];var W=10;var H=10;vmlStr.push(' <g_vml_:group',' coordsize="',Z*W,',',Z*H,'"',' coordorigin="0,0"',' style="width:',W,';height:',H,';position:absolute;');if(this.m_[0][0]!=1||this.m_[0][1]){var filter=[];filter.push("M11='",this.m_[0][0],"',","M12='",this.m_[1][0],"',","M21='",this.m_[0][1],"',","M22='",this.m_[1][1],"',","Dx='",mr(d.x/Z),"',","Dy='",mr(d.y/Z),"'");var max=d;var c2=this.getCoords_(dx+dw,dy);var c3=this.getCoords_(dx,dy+dh);var c4=this.getCoords_(dx+dw,dy+dh);max.x=Math.max(max.x,c2.x,c3.x,c4.x);max.y=Math.max(max.y,c2.y,c3.y,c4.y);vmlStr.push("padding:0 ",mr(max.x/Z),"px ",mr(max.y/Z),"px 0;filter:progid:DXImageTransform.Microsoft.Matrix(",filter.join(""),", sizingmethod='clip');")}else{vmlStr.push("top:",mr(d.y/Z),"px;left:",mr(d.x/Z),"px;")}vmlStr.push(' ">','<g_vml_:image src="',image.src,'"',' style="width:',Z*dw,';',' height:',Z*dh,';"',' cropleft="',sx/w,'"',' croptop="',sy/h,'"',' cropright="',(w-sx-sw)/w,'"',' cropbottom="',(h-sy-sh)/h,'"',' />','</g_vml_:group>');this.element_.insertAdjacentHTML("BeforeEnd",vmlStr.join(""))};contextPrototype.stroke=function(aFill){var lineStr=[];var lineOpen=false;var a=processStyle(aFill?this.fillStyle:this.strokeStyle);var color=a[0];var opacity=a[1]*this.globalAlpha;var W=10;var H=10;lineStr.push('<g_vml_:shape',' fillcolor="',color,'"',' filled="',Boolean(aFill),'"',' style="position:absolute;width:',W,';height:',H,';"',' coordorigin="0 0" coordsize="',Z*W,' ',Z*H,'"',' stroked="',!aFill,'"',' strokeweight="',this.lineWidth,'"',' strokecolor="',color,'"',' path="');var newSeq=false;var min={x:null,y:null};var max={x:null,y:null};for(var i=0;i<this.currentPath_.length;i++){var p=this.currentPath_[i];if(p.type=="moveTo"){lineStr.push(" m ");var c=this.getCoords_(p.x,p.y);lineStr.push(mr(c.x),",",mr(c.y))}else if(p.type=="lineTo"){lineStr.push(" l ");var c=this.getCoords_(p.x,p.y);lineStr.push(mr(c.x),",",mr(c.y))}else if(p.type=="close"){lineStr.push(" x ")}else if(p.type=="bezierCurveTo"){lineStr.push(" c ");var c=this.getCoords_(p.x,p.y);var c1=this.getCoords_(p.cp1x,p.cp1y);var c2=this.getCoords_(p.cp2x,p.cp2y);lineStr.push(mr(c1.x),",",mr(c1.y),",",mr(c2.x),",",mr(c2.y),",",mr(c.x),",",mr(c.y))}else if(p.type=="at"||p.type=="wa"){lineStr.push(" ",p.type," ");var c=this.getCoords_(p.x,p.y);var cStart=this.getCoords_(p.xStart,p.yStart);var cEnd=this.getCoords_(p.xEnd,p.yEnd);lineStr.push(mr(c.x-this.arcScaleX_*p.radius),",",mr(c.y-this.arcScaleY_*p.radius)," ",mr(c.x+this.arcScaleX_*p.radius),",",mr(c.y+this.arcScaleY_*p.radius)," ",mr(cStart.x),",",mr(cStart.y)," ",mr(cEnd.x),",",mr(cEnd.y))}if(c){if(min.x==null||c.x<min.x){min.x=c.x}if(max.x==null||c.x>max.x){max.x=c.x}if(min.y==null||c.y<min.y){min.y=c.y}if(max.y==null||c.y>max.y){max.y=c.y}}}lineStr.push(' ">');if(typeof this.fillStyle=="object"){var focus={x:"50%",y:"50%"};var width=(max.x-min.x);var height=(max.y-min.y);var dimension=(width>height)?width:height;focus.x=mr((this.fillStyle.focus_.x/width)*100+50)+"%";focus.y=mr((this.fillStyle.focus_.y/height)*100+50)+"%";var colors=[];if(this.fillStyle.type_=="gradientradial"){var inside=(this.fillStyle.radius1_/dimension*100);var expansion=(this.fillStyle.radius2_/dimension*100)-inside}else{var inside=0;var expansion=100}var insidecolor={offset:null,color:null};var outsidecolor={offset:null,color:null};this.fillStyle.colors_.sort(function(cs1,cs2){return cs1.offset-cs2.offset});for(var i=0;i<this.fillStyle.colors_.length;i++){var fs=this.fillStyle.colors_[i];colors.push((fs.offset*expansion)+inside,"% ",fs.color,",");if(fs.offset>insidecolor.offset||insidecolor.offset==null){insidecolor.offset=fs.offset;insidecolor.color=fs.color}if(fs.offset<outsidecolor.offset||outsidecolor.offset==null){outsidecolor.offset=fs.offset;outsidecolor.color=fs.color}}colors.pop();lineStr.push('<g_vml_:fill',' color="',outsidecolor.color,'"',' color2="',insidecolor.color,'"',' type="',this.fillStyle.type_,'"',' focusposition="',focus.x,', ',focus.y,'"',' colors="',colors.join(""),'"',' opacity="',opacity,'" />')}else if(aFill){lineStr.push('<g_vml_:fill color="',color,'" opacity="',opacity,'" />')}else{lineStr.push('<g_vml_:stroke',' opacity="',opacity,'"',' joinstyle="',this.lineJoin,'"',' miterlimit="',this.miterLimit,'"',' endcap="',processLineCap(this.lineCap),'"',' weight="',this.lineWidth,'px"',' color="',color,'" />')}lineStr.push("</g_vml_:shape>");this.element_.insertAdjacentHTML("beforeEnd",lineStr.join(""))};contextPrototype.fill=function(){this.stroke(true)};contextPrototype.closePath=function(){this.currentPath_.push({type:"close"})};contextPrototype.getCoords_=function(aX,aY){return{x:Z*(aX*this.m_[0][0]+aY*this.m_[1][0]+this.m_[2][0])-Z2,y:Z*(aX*this.m_[0][1]+aY*this.m_[1][1]+this.m_[2][1])-Z2}};contextPrototype.save=function(){var o={};copyState(this,o);this.aStack_.push(o);this.mStack_.push(this.m_);this.m_=matrixMultiply(createMatrixIdentity(),this.m_)};contextPrototype.restore=function(){copyState(this.aStack_.pop(),this);this.m_=this.mStack_.pop()};contextPrototype.translate=function(aX,aY){var m1=[[1,0,0],[0,1,0],[aX,aY,1]];this.m_=matrixMultiply(m1,this.m_)};contextPrototype.rotate=function(aRot){var c=mc(aRot);var s=ms(aRot);var m1=[[c,s,0],[-s,c,0],[0,0,1]];this.m_=matrixMultiply(m1,this.m_)};contextPrototype.scale=function(aX,aY){this.arcScaleX_*=aX;this.arcScaleY_*=aY;var m1=[[aX,0,0],[0,aY,0],[0,0,1]];this.m_=matrixMultiply(m1,this.m_)};contextPrototype.clip=function(){};contextPrototype.arcTo=function(){};contextPrototype.createPattern=function(){return new CanvasPattern_};function CanvasGradient_(aType){this.type_=aType;this.radius1_=0;this.radius2_=0;this.colors_=[];this.focus_={x:0,y:0}}CanvasGradient_.prototype.addColorStop=function(aOffset,aColor){aColor=processStyle(aColor);this.colors_.push({offset:1-aOffset,color:aColor})};function CanvasPattern_(){}G_vmlCanvasManager=G_vmlCanvasManager_;CanvasRenderingContext2D=CanvasRenderingContext2D_;CanvasGradient=CanvasGradient_;CanvasPattern=CanvasPattern_})()}
// flot
(function(F){function D(AO,e,f){var W=[],o={colors:["#edc240","#afd8f8","#cb4b4b","#4da74d","#9440ed"],legend:{show:true,noColumns:1,labelFormatter:null,labelBoxBorderColor:"#ccc",container:null,position:"ne",margin:5,backgroundColor:null,backgroundOpacity:0.85},xaxis:{mode:null,min:null,max:null,autoscaleMargin:null,ticks:null,tickFormatter:null,labelWidth:null,labelHeight:null,tickDecimals:null,tickSize:null,minTickSize:null,monthNames:null,timeformat:null},yaxis:{autoscaleMargin:0.02},x2axis:{autoscaleMargin:null},y2axis:{autoscaleMargin:0.02},points:{show:false,radius:3,lineWidth:2,fill:true,fillColor:"#ffffff"},lines:{show:false,lineWidth:2,fill:false,fillColor:null},bars:{show:false,lineWidth:2,barWidth:1,fill:true,fillColor:null,align:"left"},grid:{color:"#545454",backgroundColor:null,tickColor:"#dddddd",labelMargin:5,borderWidth:2,markings:null,markingsColor:"#f4f4f4",markingsLineWidth:2,clickable:false,hoverable:false,autoHighlight:true,mouseActiveRadius:10},selection:{mode:null,color:"#e8cfac"},shadowSize:4},X=null,AP=null,AQ=null,g=null,AX=null,K=AO,AA={xaxis:{},yaxis:{},x2axis:{},y2axis:{}},m={left:0,right:0,top:0,bottom:0},AI=0,Z=0,N=0,AB=0,S={};this.setData=n;this.setupGrid=s;this.draw=AU;this.clearSelection=I;this.setSelection=AC;this.getCanvas=function(){return X};this.getPlotOffset=function(){return m};this.getData=function(){return W};this.getAxes=function(){return AA};this.highlight=AS;this.unhighlight=AH;y(f);n(e);j();s();AU();function n(AY){W=U(AY);c();t()}function U(Ac){var Aa=[];for(var AZ=0;AZ<Ac.length;++AZ){var Ab;if(Ac[AZ].data){Ab={};for(var AY in Ac[AZ]){Ab[AY]=Ac[AZ][AY]}}else{Ab={data:Ac[AZ]}}Aa.push(Ab)}return Aa}function y(AY){F.extend(true,o,AY);if(o.xaxis.noTicks&&o.xaxis.ticks==null){o.xaxis.ticks=o.xaxis.noTicks}if(o.yaxis.noTicks&&o.yaxis.ticks==null){o.yaxis.ticks=o.yaxis.noTicks}if(o.grid.coloredAreas){o.grid.markings=o.grid.coloredAreas}if(o.grid.coloredAreasColor){o.grid.markingsColor=o.grid.coloredAreasColor}}function c(){var Ad;var Ai=W.length,AY=[],Ab=[];for(Ad=0;Ad<W.length;++Ad){var Ah=W[Ad].color;if(Ah!=null){--Ai;if(typeof Ah=="number"){Ab.push(Ah)}else{AY.push(E(W[Ad].color))}}}for(Ad=0;Ad<Ab.length;++Ad){Ai=Math.max(Ai,Ab[Ad]+1)}var AZ=[],Ac=0;Ad=0;while(AZ.length<Ai){var Ag;if(o.colors.length==Ad){Ag=new G(100,100,100)}else{Ag=E(o.colors[Ad])}var Aa=Ac%2==1?-1:1;var Af=1+Aa*Math.ceil(Ac/2)*0.2;Ag.scale(Af,Af,Af);AZ.push(Ag);++Ad;if(Ad>=o.colors.length){Ad=0;++Ac}}var Ae=0,Aj;for(Ad=0;Ad<W.length;++Ad){Aj=W[Ad];if(Aj.color==null){Aj.color=AZ[Ae].toString();++Ae}else{if(typeof Aj.color=="number"){Aj.color=AZ[Aj.color].toString()}}Aj.lines=F.extend(true,{},o.lines,Aj.lines);Aj.points=F.extend(true,{},o.points,Aj.points);Aj.bars=F.extend(true,{},o.bars,Aj.bars);if(Aj.shadowSize==null){Aj.shadowSize=o.shadowSize}if(Aj.xaxis&&Aj.xaxis==2){Aj.xaxis=AA.x2axis}else{Aj.xaxis=AA.xaxis}if(Aj.yaxis&&Aj.yaxis==2){Aj.yaxis=AA.y2axis}else{Aj.yaxis=AA.yaxis}}}function t(){var Aa=Number.POSITIVE_INFINITY,AZ=Number.NEGATIVE_INFINITY,Ab;for(Ab in AA){AA[Ab].datamin=Aa;AA[Ab].datamax=AZ;AA[Ab].used=false}for(var Ae=0;Ae<W.length;++Ae){var Ad=W[Ae].data,Aj=W[Ae].xaxis,Ai=W[Ae].yaxis,AY=0,Ah=0;if(W[Ae].bars.show){AY=W[Ae].bars.align=="left"?0:-W[Ae].bars.barWidth/2;Ah=AY+W[Ae].bars.barWidth}Aj.used=Ai.used=true;for(var Ac=0;Ac<Ad.length;++Ac){if(Ad[Ac]==null){continue}var Ag=Ad[Ac][0],Af=Ad[Ac][1];if(Ag!=null&&!isNaN(Ag=+Ag)){if(Ag+AY<Aj.datamin){Aj.datamin=Ag+AY}if(Ag+Ah>Aj.datamax){Aj.datamax=Ag+Ah}}if(Af!=null&&!isNaN(Af=+Af)){if(Af<Ai.datamin){Ai.datamin=Af}if(Af>Ai.datamax){Ai.datamax=Af}}if(Ag==null||Af==null||isNaN(Ag)||isNaN(Af)){Ad[Ac]=null}}}for(Ab in AA){if(AA[Ab].datamin==Aa){AA[Ab].datamin=0}if(AA[Ab].datamax==AZ){AA[Ab].datamax=1}}}function j(){AI=K.width();Z=K.height();K.html("");K.css("position","relative");if(AI<=0||Z<=0){throw"Invalid dimensions for plot, width = "+AI+", height = "+Z}X=F('<canvas width="'+AI+'" height="'+Z+'"></canvas>').appendTo(K).get(0);if(F.browser.msie){X=window.G_vmlCanvasManager.initElement(X)}g=X.getContext("2d");AP=F('<canvas style="position:absolute;left:0px;top:0px;" width="'+AI+'" height="'+Z+'"></canvas>').appendTo(K).get(0);if(F.browser.msie){AP=window.G_vmlCanvasManager.initElement(AP)}AX=AP.getContext("2d");AQ=F([AP,X]);if(o.selection.mode!=null||o.grid.hoverable){AQ.each(function(){this.onmousemove=J});if(o.selection.mode!=null){AQ.mousedown(AN)}}if(o.grid.clickable){AQ.click(k)}}function s(){function AY(Ab,Aa){Q(Ab,Aa);L(Ab,Aa);w(Ab,Aa);if(Ab==AA.xaxis||Ab==AA.x2axis){Ab.p2c=function(Ac){return(Ac-Ab.min)*Ab.scale};Ab.c2p=function(Ac){return Ab.min+Ac/Ab.scale}}else{Ab.p2c=function(Ac){return(Ab.max-Ac)*Ab.scale};Ab.c2p=function(Ac){return Ab.max-Ac/Ab.scale}}}for(var AZ in AA){AY(AA[AZ],o[AZ])}AW();p();AV()}function Q(Ab,Ad){var Aa=Ad.min!=null?Ad.min:Ab.datamin;var AY=Ad.max!=null?Ad.max:Ab.datamax;if(AY-Aa==0){var AZ;if(AY==0){AZ=1}else{AZ=0.01}Aa-=AZ;AY+=AZ}else{var Ac=Ad.autoscaleMargin;if(Ac!=null){if(Ad.min==null){Aa-=(AY-Aa)*Ac;if(Aa<0&&Ab.datamin>=0){Aa=0}}if(Ad.max==null){AY+=(AY-Aa)*Ac;if(AY>0&&Ab.datamax<=0){AY=0}}}}Ab.min=Aa;Ab.max=AY}function L(Ad,Ag){var Ac;if(typeof Ag.ticks=="number"&&Ag.ticks>0){Ac=Ag.ticks}else{if(Ad==AA.xaxis||Ad==AA.x2axis){Ac=AI/100}else{Ac=Z/60}}var Al=(Ad.max-Ad.min)/Ac;var Ao,Ah,Aj,Ak,Af,Aa,AZ;if(Ag.mode=="time"){function An(Av,Ap,Ar){var Aq=function(Ax){Ax=""+Ax;return Ax.length==1?"0"+Ax:Ax};var Au=[];var At=false;if(Ar==null){Ar=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]}for(var As=0;As<Ap.length;++As){var Aw=Ap.charAt(As);if(At){switch(Aw){case"h":Aw=""+Av.getUTCHours();break;case"H":Aw=Aq(Av.getUTCHours());break;case"M":Aw=Aq(Av.getUTCMinutes());break;case"S":Aw=Aq(Av.getUTCSeconds());break;case"d":Aw=""+Av.getUTCDate();break;case"m":Aw=""+(Av.getUTCMonth()+1);break;case"y":Aw=""+Av.getUTCFullYear();break;case"b":Aw=""+Ar[Av.getUTCMonth()];break}Au.push(Aw);At=false}else{if(Aw=="%"){At=true}else{Au.push(Aw)}}}return Au.join("")}var Ai={second:1000,minute:60*1000,hour:60*60*1000,day:24*60*60*1000,month:30*24*60*60*1000,year:365.2425*24*60*60*1000};var Am=[[1,"second"],[2,"second"],[5,"second"],[10,"second"],[30,"second"],[1,"minute"],[2,"minute"],[5,"minute"],[10,"minute"],[30,"minute"],[1,"hour"],[2,"hour"],[4,"hour"],[8,"hour"],[12,"hour"],[1,"day"],[2,"day"],[3,"day"],[0.25,"month"],[0.5,"month"],[1,"month"],[2,"month"],[3,"month"],[6,"month"],[1,"year"]];var Ab=0;if(Ag.minTickSize!=null){if(typeof Ag.tickSize=="number"){Ab=Ag.tickSize}else{Ab=Ag.minTickSize[0]*Ai[Ag.minTickSize[1]]}}for(Af=0;Af<Am.length-1;++Af){if(Al<(Am[Af][0]*Ai[Am[Af][1]]+Am[Af+1][0]*Ai[Am[Af+1][1]])/2&&Am[Af][0]*Ai[Am[Af][1]]>=Ab){break}}Ao=Am[Af][0];Aj=Am[Af][1];if(Aj=="year"){Aa=Math.pow(10,Math.floor(Math.log(Al/Ai.year)/Math.LN10));AZ=(Al/Ai.year)/Aa;if(AZ<1.5){Ao=1}else{if(AZ<3){Ao=2}else{if(AZ<7.5){Ao=5}else{Ao=10}}}Ao*=Aa}if(Ag.tickSize){Ao=Ag.tickSize[0];Aj=Ag.tickSize[1]}Ah=function(Ar){var Aw=[],Au=Ar.tickSize[0],Ax=Ar.tickSize[1],Av=new Date(Ar.min);var Aq=Au*Ai[Ax];if(Ax=="second"){Av.setUTCSeconds(C(Av.getUTCSeconds(),Au))}if(Ax=="minute"){Av.setUTCMinutes(C(Av.getUTCMinutes(),Au))}if(Ax=="hour"){Av.setUTCHours(C(Av.getUTCHours(),Au))}if(Ax=="month"){Av.setUTCMonth(C(Av.getUTCMonth(),Au))}if(Ax=="year"){Av.setUTCFullYear(C(Av.getUTCFullYear(),Au))}Av.setUTCMilliseconds(0);if(Aq>=Ai.minute){Av.setUTCSeconds(0)}if(Aq>=Ai.hour){Av.setUTCMinutes(0)}if(Aq>=Ai.day){Av.setUTCHours(0)}if(Aq>=Ai.day*4){Av.setUTCDate(1)}if(Aq>=Ai.year){Av.setUTCMonth(0)}var Az=0,Ay=Number.NaN,As;do{As=Ay;Ay=Av.getTime();Aw.push({v:Ay,label:Ar.tickFormatter(Ay,Ar)});if(Ax=="month"){if(Au<1){Av.setUTCDate(1);var Ap=Av.getTime();Av.setUTCMonth(Av.getUTCMonth()+1);var At=Av.getTime();Av.setTime(Ay+Az*Ai.hour+(At-Ap)*Au);Az=Av.getUTCHours();Av.setUTCHours(0)}else{Av.setUTCMonth(Av.getUTCMonth()+Au)}}else{if(Ax=="year"){Av.setUTCFullYear(Av.getUTCFullYear()+Au)}else{Av.setTime(Ay+Aq)}}}while(Ay<Ar.max&&Ay!=As);return Aw};Ak=function(Ap,As){var At=new Date(Ap);if(Ag.timeformat!=null){return An(At,Ag.timeformat,Ag.monthNames)}var Aq=As.tickSize[0]*Ai[As.tickSize[1]];var Ar=As.max-As.min;if(Aq<Ai.minute){fmt="%h:%M:%S"}else{if(Aq<Ai.day){if(Ar<2*Ai.day){fmt="%h:%M"}else{fmt="%b %d %h:%M"}}else{if(Aq<Ai.month){fmt="%b %d"}else{if(Aq<Ai.year){if(Ar<Ai.year){fmt="%b"}else{fmt="%b %y"}}else{fmt="%y"}}}}return An(At,fmt,Ag.monthNames)}}else{var AY=Ag.tickDecimals;var Ae=-Math.floor(Math.log(Al)/Math.LN10);if(AY!=null&&Ae>AY){Ae=AY}Aa=Math.pow(10,-Ae);AZ=Al/Aa;if(AZ<1.5){Ao=1}else{if(AZ<3){Ao=2;if(AZ>2.25&&(AY==null||Ae+1<=AY)){Ao=2.5;++Ae}}else{if(AZ<7.5){Ao=5}else{Ao=10}}}Ao*=Aa;if(Ag.minTickSize!=null&&Ao<Ag.minTickSize){Ao=Ag.minTickSize}if(Ag.tickSize!=null){Ao=Ag.tickSize}Ad.tickDecimals=Math.max(0,(AY!=null)?AY:Ae);Ah=function(Ar){var At=[];var Au=C(Ar.min,Ar.tickSize),Aq=0,Ap=Number.NaN,As;do{As=Ap;Ap=Au+Aq*Ar.tickSize;At.push({v:Ap,label:Ar.tickFormatter(Ap,Ar)});++Aq}while(Ap<Ar.max&&Ap!=As);return At};Ak=function(Ap,Aq){return Ap.toFixed(Aq.tickDecimals)}}Ad.tickSize=Aj?[Ao,Aj]:Ao;Ad.tickGenerator=Ah;if(F.isFunction(Ag.tickFormatter)){Ad.tickFormatter=function(Ap,Aq){return""+Ag.tickFormatter(Ap,Aq)}}else{Ad.tickFormatter=Ak}if(Ag.labelWidth!=null){Ad.labelWidth=Ag.labelWidth}if(Ag.labelHeight!=null){Ad.labelHeight=Ag.labelHeight}}function w(Ac,Ae){Ac.ticks=[];if(!Ac.used){return }if(Ae.ticks==null){Ac.ticks=Ac.tickGenerator(Ac)}else{if(typeof Ae.ticks=="number"){if(Ae.ticks>0){Ac.ticks=Ac.tickGenerator(Ac)}}else{if(Ae.ticks){var Ad=Ae.ticks;if(F.isFunction(Ad)){Ad=Ad({min:Ac.min,max:Ac.max})}var Ab,AY;for(Ab=0;Ab<Ad.length;++Ab){var AZ=null;var Aa=Ad[Ab];if(typeof Aa=="object"){AY=Aa[0];if(Aa.length>1){AZ=Aa[1]}}else{AY=Aa}if(AZ==null){AZ=Ac.tickFormatter(AY,Ac)}Ac.ticks[Ab]={v:AY,label:AZ}}}}}if(Ae.autoscaleMargin!=null&&Ac.ticks.length>0){if(Ae.min==null){Ac.min=Math.min(Ac.min,Ac.ticks[0].v)}if(Ae.max==null&&Ac.ticks.length>1){Ac.max=Math.min(Ac.max,Ac.ticks[Ac.ticks.length-1].v)}}}function AW(){function AZ(Ac){if(Ac.labelWidth==null){Ac.labelWidth=AI/6}if(Ac.labelHeight==null){labels=[];for(i=0;i<Ac.ticks.length;++i){l=Ac.ticks[i].label;if(l){labels.push('<div class="tickLabel" style="float:left;width:'+Ac.labelWidth+'px">'+l+"</div>")}}Ac.labelHeight=0;if(labels.length>0){var Ab=F('<div style="position:absolute;top:-10000px;width:10000px;font-size:smaller">'+labels.join("")+'<div style="clear:left"></div></div>').appendTo(K);Ac.labelHeight=Ab.height();Ab.remove()}}}function AY(Ae){if(Ae.labelWidth==null||Ae.labelHeight==null){var Ad,Af=[],Ac;for(Ad=0;Ad<Ae.ticks.length;++Ad){Ac=Ae.ticks[Ad].label;if(Ac){Af.push('<div class="tickLabel">'+Ac+"</div>")}}if(Af.length>0){var Ab=F('<div style="position:absolute;top:-10000px;font-size:smaller">'+Af.join("")+"</div>").appendTo(K);if(Ae.labelWidth==null){Ae.labelWidth=Ab.width()}if(Ae.labelHeight==null){Ae.labelHeight=Ab.find("div").height()}Ab.remove()}if(Ae.labelWidth==null){Ae.labelWidth=0}if(Ae.labelHeight==null){Ae.labelHeight=0}}}AZ(AA.xaxis);AY(AA.yaxis);AZ(AA.x2axis);AY(AA.y2axis);var Aa=o.grid.borderWidth/2;for(i=0;i<W.length;++i){Aa=Math.max(Aa,2*(W[i].points.radius+W[i].points.lineWidth/2))}m.left=m.right=m.top=m.bottom=Aa;if(AA.xaxis.labelHeight>0){m.bottom=Math.max(Aa,AA.xaxis.labelHeight+o.grid.labelMargin)}if(AA.yaxis.labelWidth>0){m.left=Math.max(Aa,AA.yaxis.labelWidth+o.grid.labelMargin)}if(AA.x2axis.labelHeight>0){m.top=Math.max(Aa,AA.x2axis.labelHeight+o.grid.labelMargin)}if(AA.y2axis.labelWidth>0){m.right=Math.max(Aa,AA.y2axis.labelWidth+o.grid.labelMargin)}N=AI-m.left-m.right;AB=Z-m.bottom-m.top;AA.xaxis.scale=N/(AA.xaxis.max-AA.xaxis.min);AA.yaxis.scale=AB/(AA.yaxis.max-AA.yaxis.min);AA.x2axis.scale=N/(AA.x2axis.max-AA.x2axis.min);AA.y2axis.scale=AB/(AA.y2axis.max-AA.y2axis.min)}function AU(){a();for(var AY=0;AY<W.length;AY++){AK(W[AY])}}function V(AZ,Af){var Ac=Af+"axis",AY=Af+"2axis",Ab,Ae,Ad,Aa;if(AZ[Ac]){Ab=AA[Ac];Ae=AZ[Ac].from;Ad=AZ[Ac].to}else{if(AZ[AY]){Ab=AA[AY];Ae=AZ[AY].from;Ad=AZ[AY].to}else{Ab=AA[Ac];Ae=AZ[Af+"1"];Ad=AZ[Af+"2"]}}if(Ae!=null&&Ad!=null&&Ae>Ad){return{from:Ad,to:Ae,axis:Ab}}return{from:Ae,to:Ad,axis:Ab}}function a(){var Ac;g.save();g.clearRect(0,0,AI,Z);g.translate(m.left,m.top);if(o.grid.backgroundColor){g.fillStyle=o.grid.backgroundColor;g.fillRect(0,0,N,AB)}if(o.grid.markings){var AZ=o.grid.markings;if(F.isFunction(AZ)){AZ=AZ({xmin:AA.xaxis.min,xmax:AA.xaxis.max,ymin:AA.yaxis.min,ymax:AA.yaxis.max,xaxis:AA.xaxis,yaxis:AA.yaxis,x2axis:AA.x2axis,y2axis:AA.y2axis})}for(Ac=0;Ac<AZ.length;++Ac){var AY=AZ[Ac],Ae=V(AY,"x"),Ab=V(AY,"y");if(Ae.from==null){Ae.from=Ae.axis.min}if(Ae.to==null){Ae.to=Ae.axis.max}if(Ab.from==null){Ab.from=Ab.axis.min}if(Ab.to==null){Ab.to=Ab.axis.max}if(Ae.to<Ae.axis.min||Ae.from>Ae.axis.max||Ab.to<Ab.axis.min||Ab.from>Ab.axis.max){continue}Ae.from=Math.max(Ae.from,Ae.axis.min);Ae.to=Math.min(Ae.to,Ae.axis.max);Ab.from=Math.max(Ab.from,Ab.axis.min);Ab.to=Math.min(Ab.to,Ab.axis.max);if(Ae.from==Ae.to&&Ab.from==Ab.to){continue}Ae.from=Ae.axis.p2c(Ae.from);Ae.to=Ae.axis.p2c(Ae.to);Ab.from=Ab.axis.p2c(Ab.from);Ab.to=Ab.axis.p2c(Ab.to);if(Ae.from==Ae.to||Ab.from==Ab.to){g.strokeStyle=AY.color||o.grid.markingsColor;g.lineWidth=AY.lineWidth||o.grid.markingsLineWidth;g.moveTo(Math.floor(Ae.from),Math.floor(Ab.from));g.lineTo(Math.floor(Ae.to),Math.floor(Ab.to));g.stroke()}else{g.fillStyle=AY.color||o.grid.markingsColor;g.fillRect(Math.floor(Ae.from),Math.floor(Ab.to),Math.floor(Ae.to-Ae.from),Math.floor(Ab.from-Ab.to))}}}g.lineWidth=1;g.strokeStyle=o.grid.tickColor;g.beginPath();var Aa,Ad=AA.xaxis;for(Ac=0;Ac<Ad.ticks.length;++Ac){Aa=Ad.ticks[Ac].v;if(Aa<=Ad.min||Aa>=AA.xaxis.max){continue}g.moveTo(Math.floor(Ad.p2c(Aa))+g.lineWidth/2,0);g.lineTo(Math.floor(Ad.p2c(Aa))+g.lineWidth/2,AB)}Ad=AA.yaxis;for(Ac=0;Ac<Ad.ticks.length;++Ac){Aa=Ad.ticks[Ac].v;if(Aa<=Ad.min||Aa>=Ad.max){continue}g.moveTo(0,Math.floor(Ad.p2c(Aa))+g.lineWidth/2);g.lineTo(N,Math.floor(Ad.p2c(Aa))+g.lineWidth/2)}Ad=AA.x2axis;for(Ac=0;Ac<Ad.ticks.length;++Ac){Aa=Ad.ticks[Ac].v;if(Aa<=Ad.min||Aa>=Ad.max){continue}g.moveTo(Math.floor(Ad.p2c(Aa))+g.lineWidth/2,-5);g.lineTo(Math.floor(Ad.p2c(Aa))+g.lineWidth/2,5)}Ad=AA.y2axis;for(Ac=0;Ac<Ad.ticks.length;++Ac){Aa=Ad.ticks[Ac].v;if(Aa<=Ad.min||Aa>=Ad.max){continue}g.moveTo(N-5,Math.floor(Ad.p2c(Aa))+g.lineWidth/2);g.lineTo(N+5,Math.floor(Ad.p2c(Aa))+g.lineWidth/2)}g.stroke();if(o.grid.borderWidth){g.lineWidth=o.grid.borderWidth;g.strokeStyle=o.grid.color;g.lineJoin="round";g.strokeRect(0,0,N,AB)}g.restore()}function p(){K.find(".tickLabels").remove();var AY='<div class="tickLabels" style="font-size:smaller;color:'+o.grid.color+'">';function AZ(Ac,Ad){for(var Ab=0;Ab<Ac.ticks.length;++Ab){var Aa=Ac.ticks[Ab];if(!Aa.label||Aa.v<Ac.min||Aa.v>Ac.max){continue}AY+=Ad(Aa,Ac)}}AZ(AA.xaxis,function(Aa,Ab){return'<div style="position:absolute;top:'+(m.top+AB+o.grid.labelMargin)+"px;left:"+(m.left+Ab.p2c(Aa.v)-Ab.labelWidth/2)+"px;width:"+Ab.labelWidth+'px;text-align:center" class="tickLabel">'+Aa.label+"</div>"});AZ(AA.yaxis,function(Aa,Ab){return'<div style="position:absolute;top:'+(m.top+Ab.p2c(Aa.v)-Ab.labelHeight/2)+"px;right:"+(m.right+N+o.grid.labelMargin)+"px;width:"+Ab.labelWidth+'px;text-align:right" class="tickLabel">'+Aa.label+"</div>"});AZ(AA.x2axis,function(Aa,Ab){return'<div style="position:absolute;bottom:'+(m.bottom+AB+o.grid.labelMargin)+"px;left:"+(m.left+Ab.p2c(Aa.v)-Ab.labelWidth/2)+"px;width:"+Ab.labelWidth+'px;text-align:center" class="tickLabel">'+Aa.label+"</div>"});AZ(AA.y2axis,function(Aa,Ab){return'<div style="position:absolute;top:'+(m.top+Ab.p2c(Aa.v)-Ab.labelHeight/2)+"px;left:"+(m.left+N+o.grid.labelMargin)+"px;width:"+Ab.labelWidth+'px;text-align:left" class="tickLabel">'+Aa.label+"</div>"});AY+="</div>";K.append(AY)}function AK(AY){if(AY.lines.show||(!AY.bars.show&&!AY.points.show)){h(AY)}if(AY.bars.show){u(AY)}if(AY.points.show){v(AY)}}function h(Aa){function AZ(Aj,Ah,An,Am){var Ag,Ao=null,Ad=null,Ap=null;g.beginPath();for(var Ai=0;Ai<Aj.length;++Ai){Ag=Ao;Ao=Aj[Ai];if(Ag==null||Ao==null){continue}var Af=Ag[0],Al=Ag[1],Ae=Ao[0],Ak=Ao[1];if(Al<=Ak&&Al<Am.min){if(Ak<Am.min){continue}Af=(Am.min-Al)/(Ak-Al)*(Ae-Af)+Af;Al=Am.min}else{if(Ak<=Al&&Ak<Am.min){if(Al<Am.min){continue}Ae=(Am.min-Al)/(Ak-Al)*(Ae-Af)+Af;Ak=Am.min}}if(Al>=Ak&&Al>Am.max){if(Ak>Am.max){continue}Af=(Am.max-Al)/(Ak-Al)*(Ae-Af)+Af;Al=Am.max}else{if(Ak>=Al&&Ak>Am.max){if(Al>Am.max){continue}Ae=(Am.max-Al)/(Ak-Al)*(Ae-Af)+Af;Ak=Am.max}}if(Af<=Ae&&Af<An.min){if(Ae<An.min){continue}Al=(An.min-Af)/(Ae-Af)*(Ak-Al)+Al;Af=An.min}else{if(Ae<=Af&&Ae<An.min){if(Af<An.min){continue}Ak=(An.min-Af)/(Ae-Af)*(Ak-Al)+Al;Ae=An.min}}if(Af>=Ae&&Af>An.max){if(Ae>An.max){continue}Al=(An.max-Af)/(Ae-Af)*(Ak-Al)+Al;Af=An.max}else{if(Ae>=Af&&Ae>An.max){if(Af>An.max){continue}Ak=(An.max-Af)/(Ae-Af)*(Ak-Al)+Al;Ae=An.max}}if(Ad!=An.p2c(Af)||Ap!=Am.p2c(Al)+Ah){g.moveTo(An.p2c(Af),Am.p2c(Al)+Ah)}Ad=An.p2c(Ae);Ap=Am.p2c(Ak)+Ah;g.lineTo(Ad,Ap)}g.stroke()}function Ab(Aj,Aq,Ao){var Ah,Ar=null;var Ad=Math.min(Math.max(0,Ao.min),Ao.max);var Am,Ag=0;var Ap=false;for(var Ai=0;Ai<Aj.length;++Ai){Ah=Ar;Ar=Aj[Ai];if(Ap&&Ah!=null&&Ar==null){g.lineTo(Aq.p2c(Ag),Ao.p2c(Ad));g.fill();Ap=false;continue}if(Ah==null||Ar==null){continue}var Af=Ah[0],An=Ah[1],Ae=Ar[0],Al=Ar[1];if(Af<=Ae&&Af<Aq.min){if(Ae<Aq.min){continue}An=(Aq.min-Af)/(Ae-Af)*(Al-An)+An;Af=Aq.min}else{if(Ae<=Af&&Ae<Aq.min){if(Af<Aq.min){continue}Al=(Aq.min-Af)/(Ae-Af)*(Al-An)+An;Ae=Aq.min}}if(Af>=Ae&&Af>Aq.max){if(Ae>Aq.max){continue}An=(Aq.max-Af)/(Ae-Af)*(Al-An)+An;Af=Aq.max}else{if(Ae>=Af&&Ae>Aq.max){if(Af>Aq.max){continue}Al=(Aq.max-Af)/(Ae-Af)*(Al-An)+An;Ae=Aq.max}}if(!Ap){g.beginPath();g.moveTo(Aq.p2c(Af),Ao.p2c(Ad));Ap=true}if(An>=Ao.max&&Al>=Ao.max){g.lineTo(Aq.p2c(Af),Ao.p2c(Ao.max));g.lineTo(Aq.p2c(Ae),Ao.p2c(Ao.max));continue}else{if(An<=Ao.min&&Al<=Ao.min){g.lineTo(Aq.p2c(Af),Ao.p2c(Ao.min));g.lineTo(Aq.p2c(Ae),Ao.p2c(Ao.min));continue}}var As=Af,Ak=Ae;if(An<=Al&&An<Ao.min&&Al>=Ao.min){Af=(Ao.min-An)/(Al-An)*(Ae-Af)+Af;An=Ao.min}else{if(Al<=An&&Al<Ao.min&&An>=Ao.min){Ae=(Ao.min-An)/(Al-An)*(Ae-Af)+Af;Al=Ao.min}}if(An>=Al&&An>Ao.max&&Al<=Ao.max){Af=(Ao.max-An)/(Al-An)*(Ae-Af)+Af;An=Ao.max}else{if(Al>=An&&Al>Ao.max&&An<=Ao.max){Ae=(Ao.max-An)/(Al-An)*(Ae-Af)+Af;Al=Ao.max}}if(Af!=As){if(An<=Ao.min){Am=Ao.min}else{Am=Ao.max}g.lineTo(Aq.p2c(As),Ao.p2c(Am));g.lineTo(Aq.p2c(Af),Ao.p2c(Am))}g.lineTo(Aq.p2c(Af),Ao.p2c(An));g.lineTo(Aq.p2c(Ae),Ao.p2c(Al));if(Ae!=Ak){if(Al<=Ao.min){Am=Ao.min}else{Am=Ao.max}g.lineTo(Aq.p2c(Ak),Ao.p2c(Am));g.lineTo(Aq.p2c(Ae),Ao.p2c(Am))}Ag=Math.max(Ae,Ak)}if(Ap){g.lineTo(Aq.p2c(Ag),Ao.p2c(Ad));g.fill()}}g.save();g.translate(m.left,m.top);g.lineJoin="round";var Ac=Aa.lines.lineWidth;var AY=Aa.shadowSize;if(AY>0){g.lineWidth=AY/2;g.strokeStyle="rgba(0,0,0,0.1)";AZ(Aa.data,Ac/2+AY/2+g.lineWidth/2,Aa.xaxis,Aa.yaxis);g.lineWidth=AY/2;g.strokeStyle="rgba(0,0,0,0.2)";AZ(Aa.data,Ac/2+g.lineWidth/2,Aa.xaxis,Aa.yaxis)}g.lineWidth=Ac;g.strokeStyle=Aa.color;AD(Aa.lines,Aa.color);if(Aa.lines.fill){Ab(Aa.data,Aa.xaxis,Aa.yaxis)}AZ(Aa.data,0,Aa.xaxis,Aa.yaxis);g.restore()}function v(AZ){function Ac(Ag,Ae,Ah,Ak,Ai){for(var Af=0;Af<Ag.length;++Af){if(Ag[Af]==null){continue}var Ad=Ag[Af][0],Aj=Ag[Af][1];if(Ad<Ak.min||Ad>Ak.max||Aj<Ai.min||Aj>Ai.max){continue}g.beginPath();g.arc(Ak.p2c(Ad),Ai.p2c(Aj),Ae,0,2*Math.PI,true);if(Ah){g.fill()}g.stroke()}}function Ab(Ag,Ai,Ae,Ak,Ah){for(var Af=0;Af<Ag.length;++Af){if(Ag[Af]==null){continue}var Ad=Ag[Af][0],Aj=Ag[Af][1];if(Ad<Ak.min||Ad>Ak.max||Aj<Ah.min||Aj>Ah.max){continue}g.beginPath();g.arc(Ak.p2c(Ad),Ah.p2c(Aj)+Ai,Ae,0,Math.PI,false);g.stroke()}}g.save();g.translate(m.left,m.top);var Aa=AZ.lines.lineWidth;var AY=AZ.shadowSize;if(AY>0){g.lineWidth=AY/2;g.strokeStyle="rgba(0,0,0,0.1)";Ab(AZ.data,AY/2+g.lineWidth/2,AZ.points.radius,AZ.xaxis,AZ.yaxis);g.lineWidth=AY/2;g.strokeStyle="rgba(0,0,0,0.2)";Ab(AZ.data,g.lineWidth/2,AZ.points.radius,AZ.xaxis,AZ.yaxis)}g.lineWidth=AZ.points.lineWidth;g.strokeStyle=AZ.color;AD(AZ.points,AZ.color);Ac(AZ.data,AZ.points.radius,AZ.points.fill,AZ.xaxis,AZ.yaxis);g.restore()}function AM(Aj,Ah,Ac,Ai,Aa,Ao,An,Ak,Af){var Am=true,Ae=true,Ab=true,Ad=false,AZ=Aj+Ac,Al=Aj+Ai,AY=0,Ag=Ah;if(Ag<AY){Ag=0;AY=Ah;Ad=true;Ab=false}if(Al<An.min||AZ>An.max||Ag<Ak.min||AY>Ak.max){return }if(AZ<An.min){AZ=An.min;Am=false}if(Al>An.max){Al=An.max;Ae=false}if(AY<Ak.min){AY=Ak.min;Ad=false}if(Ag>Ak.max){Ag=Ak.max;Ab=false}if(Ao){Af.beginPath();Af.moveTo(An.p2c(AZ),Ak.p2c(AY)+Aa);Af.lineTo(An.p2c(AZ),Ak.p2c(Ag)+Aa);Af.lineTo(An.p2c(Al),Ak.p2c(Ag)+Aa);Af.lineTo(An.p2c(Al),Ak.p2c(AY)+Aa);Af.fill()}if(Am||Ae||Ab||Ad){Af.beginPath();AZ=An.p2c(AZ);AY=Ak.p2c(AY);Al=An.p2c(Al);Ag=Ak.p2c(Ag);Af.moveTo(AZ,AY+Aa);if(Am){Af.lineTo(AZ,Ag+Aa)}else{Af.moveTo(AZ,Ag+Aa)}if(Ab){Af.lineTo(Al,Ag+Aa)}else{Af.moveTo(Al,Ag+Aa)}if(Ae){Af.lineTo(Al,AY+Aa)}else{Af.moveTo(Al,AY+Aa)}if(Ad){Af.lineTo(AZ,AY+Aa)}else{Af.moveTo(AZ,AY+Aa)}Af.stroke()}}function u(Aa){function AZ(Ae,Ab,Ad,Ah,Af,Ai,Ag){for(var Ac=0;Ac<Ae.length;Ac++){if(Ae[Ac]==null){continue}AM(Ae[Ac][0],Ae[Ac][1],Ab,Ad,Ah,Af,Ai,Ag,g)}}g.save();g.translate(m.left,m.top);g.lineJoin="round";g.lineWidth=Aa.bars.lineWidth;g.strokeStyle=Aa.color;AD(Aa.bars,Aa.color);var AY=Aa.bars.align=="left"?0:-Aa.bars.barWidth/2;AZ(Aa.data,AY,AY+Aa.bars.barWidth,0,Aa.bars.fill,Aa.xaxis,Aa.yaxis);g.restore()}function AD(Aa,AY){var AZ=Aa.fill;if(!AZ){return }if(Aa.fillColor){g.fillStyle=Aa.fillColor}else{var Ab=E(AY);Ab.a=typeof AZ=="number"?AZ:0.4;Ab.normalize();g.fillStyle=Ab.toString()}}function AV(){K.find(".legend").remove();if(!o.legend.show){return }var Ae=[];var Ac=false;for(i=0;i<W.length;++i){if(!W[i].label){continue}if(i%o.legend.noColumns==0){if(Ac){Ae.push("</tr>")}Ae.push("<tr>");Ac=true}var Ag=W[i].label;if(o.legend.labelFormatter!=null){Ag=o.legend.labelFormatter(Ag)}Ae.push('<td class="legendColorBox"><div style="border:1px solid '+o.legend.labelBoxBorderColor+';padding:1px"><div style="width:14px;height:10px;background-color:'+W[i].color+';overflow:hidden"></div></div></td><td class="legendLabel">'+Ag+"</td>")}if(Ac){Ae.push("</tr>")}if(Ae.length==0){return }var Ai='<table style="font-size:smaller;color:'+o.grid.color+'">'+Ae.join("")+"</table>";if(o.legend.container!=null){o.legend.container.html(Ai)}else{var Af="";var AZ=o.legend.position,Aa=o.legend.margin;if(AZ.charAt(0)=="n"){Af+="top:"+(Aa+m.top)+"px;"}else{if(AZ.charAt(0)=="s"){Af+="bottom:"+(Aa+m.bottom)+"px;"}}if(AZ.charAt(1)=="e"){Af+="right:"+(Aa+m.right)+"px;"}else{if(AZ.charAt(1)=="w"){Af+="left:"+(Aa+m.left)+"px;"}}var Ah=F('<div class="legend">'+Ai.replace('style="','style="position:absolute;'+Af+";")+"</div>").appendTo(K);if(o.legend.backgroundOpacity!=0){var Ad=o.legend.backgroundColor;if(Ad==null){var Ab;if(o.grid.backgroundColor){Ab=o.grid.backgroundColor}else{Ab=A(Ah)}Ad=E(Ab).adjust(null,null,null,1).toString()}var AY=Ah.children();F('<div style="position:absolute;width:'+AY.width()+"px;height:"+AY.height()+"px;"+Af+"background-color:"+Ad+';"> </div>').prependTo(Ah).css("opacity",o.legend.backgroundOpacity)}}}var AG={pageX:null,pageY:null},d={first:{x:-1,y:-1},second:{x:-1,y:-1},show:false,active:false},AF=[],P=false,O=null,z=null;function AT(Ae,Ac){var Al=o.grid.mouseActiveRadius,Ar=Al*Al+1,At=null,An=false;function Ai(Ay,Ax){return{datapoint:W[Ay].data[Ax],dataIndex:Ax,series:W[Ay],seriesIndex:Ay}}for(var Aq=0;Aq<W.length;++Aq){var Aw=W[Aq].data,Ad=W[Aq].xaxis,Ab=W[Aq].yaxis,Am=Ad.c2p(Ae),Ak=Ab.c2p(Ac),AZ=Al/Ad.scale,AY=Al/Ab.scale,Av=W[Aq].bars.show,Au=!(W[Aq].bars.show&&!(W[Aq].lines.show||W[Aq].points.show)),Aa=W[Aq].bars.align=="left"?0:-W[Aq].bars.barWidth/2,As=Aa+W[Aq].bars.barWidth;for(var Ap=0;Ap<Aw.length;++Ap){if(Aw[Ap]==null){continue}var Ag=Aw[Ap][0],Af=Aw[Ap][1];if(Av){if(!An&&Am>=Ag+Aa&&Am<=Ag+As&&Ak>=Math.min(0,Af)&&Ak<=Math.max(0,Af)){At=Ai(Aq,Ap)}}if(Au){if((Ag-Am>AZ||Ag-Am<-AZ)||(Af-Ak>AY||Af-Ak<-AY)){continue}var Aj=Math.abs(Ad.p2c(Ag)-Ae),Ah=Math.abs(Ab.p2c(Af)-Ac),Ao=Aj*Aj+Ah*Ah;if(Ao<Ar){Ar=Ao;An=true;At=Ai(Aq,Ap)}}}}return At}function J(AZ){var Aa=AZ||window.event;if(Aa.pageX==null&&Aa.clientX!=null){var Ab=document.documentElement,AY=document.body;AG.pageX=Aa.clientX+(Ab&&Ab.scrollLeft||AY.scrollLeft||0);AG.pageY=Aa.clientY+(Ab&&Ab.scrollTop||AY.scrollTop||0)}else{AG.pageX=Aa.pageX;AG.pageY=Aa.pageY}if(o.grid.hoverable&&!z){z=setTimeout(R,100)}if(d.active){AL(AG)}}function AN(AY){if(AY.which!=1){return }document.body.focus();if(document.onselectstart!==undefined&&S.onselectstart==null){S.onselectstart=document.onselectstart;document.onselectstart=function(){return false}}if(document.ondrag!==undefined&&S.ondrag==null){S.ondrag=document.ondrag;document.ondrag=function(){return false}}AR(d.first,AY);AG.pageX=null;d.active=true;F(document).one("mouseup",Y)}function k(AY){if(P){P=false;return }M("plotclick",AY)}function R(){M("plothover",AG);z=null}function M(AZ,AY){var Aa=AQ.offset(),Af={pageX:AY.pageX,pageY:AY.pageY},Ad=AY.pageX-Aa.left-m.left,Ab=AY.pageY-Aa.top-m.top;if(AA.xaxis.used){Af.x=AA.xaxis.c2p(Ad)}if(AA.yaxis.used){Af.y=AA.yaxis.c2p(Ab)}if(AA.x2axis.used){Af.x2=AA.x2axis.c2p(Ad)}if(AA.y2axis.used){Af.y2=AA.y2axis.c2p(Ab)}var Ag=AT(Ad,Ab);if(Ag){Ag.pageX=parseInt(Ag.series.xaxis.p2c(Ag.datapoint[0])+Aa.left+m.left);Ag.pageY=parseInt(Ag.series.yaxis.p2c(Ag.datapoint[1])+Aa.top+m.top)}if(o.grid.autoHighlight){for(var Ac=0;Ac<AF.length;++Ac){var Ae=AF[Ac];if(Ae.auto&&!(Ag&&Ae.series==Ag.series&&Ae.point==Ag.datapoint)){AH(Ae.series,Ae.point)}}if(Ag){AS(Ag.series,Ag.datapoint,true)}}K.trigger(AZ,[Af,Ag])}function x(){if(!O){O=setTimeout(T,50)}}function T(){O=null;AX.save();AX.clearRect(0,0,AI,Z);AX.translate(m.left,m.top);var Ab,Aa;for(Ab=0;Ab<AF.length;++Ab){Aa=AF[Ab];if(Aa.series.bars.show){AJ(Aa.series,Aa.point)}else{AE(Aa.series,Aa.point)}}AX.restore();if(d.show&&b()){AX.strokeStyle=E(o.selection.color).scale(null,null,null,0.8).toString();AX.lineWidth=1;g.lineJoin="round";AX.fillStyle=E(o.selection.color).scale(null,null,null,0.4).toString();var AY=Math.min(d.first.x,d.second.x),Ad=Math.min(d.first.y,d.second.y),AZ=Math.abs(d.second.x-d.first.x),Ac=Math.abs(d.second.y-d.first.y);AX.fillRect(AY+m.left,Ad+m.top,AZ,Ac);AX.strokeRect(AY+m.left,Ad+m.top,AZ,Ac)}}function AS(Aa,AY,Ab){if(typeof Aa=="number"){Aa=W[Aa]}if(typeof AY=="number"){AY=Aa.data[AY]}var AZ=q(Aa,AY);if(AZ==-1){AF.push({series:Aa,point:AY,auto:Ab});x()}else{if(!Ab){AF[AZ].auto=false}}}function AH(Aa,AY){if(typeof Aa=="number"){Aa=W[Aa]}if(typeof AY=="number"){AY=Aa.data[AY]}var AZ=q(Aa,AY);if(AZ!=-1){AF.splice(AZ,1);x()}}function q(Aa,Ab){for(var AY=0;AY<AF.length;++AY){var AZ=AF[AY];if(AZ.series==Aa&&AZ.point[0]==Ab[0]&&AZ.point[1]==Ab[1]){return AY}}return -1}function AE(Ab,Aa){var AZ=Aa[0],Af=Aa[1],Ae=Ab.xaxis,Ad=Ab.yaxis;if(AZ<Ae.min||AZ>Ae.max||Af<Ad.min||Af>Ad.max){return }var Ac=Ab.points.radius+Ab.points.lineWidth/2;AX.lineWidth=Ac;AX.strokeStyle=E(Ab.color).scale(1,1,1,0.5).toString();var AY=1.5*Ac;AX.beginPath();AX.arc(Ae.p2c(AZ),Ad.p2c(Af),AY,0,2*Math.PI,true);AX.stroke()}function AJ(Aa,AY){AX.lineJoin="round";AX.lineWidth=Aa.bars.lineWidth;AX.strokeStyle=E(Aa.color).scale(1,1,1,0.5).toString();AX.fillStyle=E(Aa.color).scale(1,1,1,0.5).toString();var AZ=Aa.bars.align=="left"?0:-Aa.bars.barWidth/2;AM(AY[0],AY[1],AZ,AZ+Aa.bars.barWidth,0,true,Aa.xaxis,Aa.yaxis,AX)}function r(){var AZ=Math.min(d.first.x,d.second.x),AY=Math.max(d.first.x,d.second.x),Ab=Math.max(d.first.y,d.second.y),Aa=Math.min(d.first.y,d.second.y);var Ac={};if(AA.xaxis.used){Ac.xaxis={from:AA.xaxis.c2p(AZ),to:AA.xaxis.c2p(AY)}}if(AA.x2axis.used){Ac.x2axis={from:AA.x2axis.c2p(AZ),to:AA.x2axis.c2p(AY)}}if(AA.yaxis.used){Ac.yaxis={from:AA.yaxis.c2p(Ab),to:AA.yaxis.c2p(Aa)}}if(AA.y2axis.used){Ac.yaxis={from:AA.y2axis.c2p(Ab),to:AA.y2axis.c2p(Aa)}}K.trigger("plotselected",[Ac]);if(AA.xaxis.used&&AA.yaxis.used){K.trigger("selected",[{x1:Ac.xaxis.from,y1:Ac.yaxis.from,x2:Ac.xaxis.to,y2:Ac.yaxis.to}])}}function Y(AY){if(document.onselectstart!==undefined){document.onselectstart=S.onselectstart}if(document.ondrag!==undefined){document.ondrag=S.ondrag}d.active=false;AL(AY);if(b()){r();P=true}return false}function AR(Aa,AY){var AZ=AQ.offset();if(o.selection.mode=="y"){if(Aa==d.first){Aa.x=0}else{Aa.x=N}}else{Aa.x=AY.pageX-AZ.left-m.left;Aa.x=Math.min(Math.max(0,Aa.x),N)}if(o.selection.mode=="x"){if(Aa==d.first){Aa.y=0}else{Aa.y=AB}}else{Aa.y=AY.pageY-AZ.top-m.top;Aa.y=Math.min(Math.max(0,Aa.y),AB)}}function AL(AY){if(AY.pageX==null){return }AR(d.second,AY);if(b()){d.show=true;x()}else{I()}}function I(){if(d.show){d.show=false;x()}}function AC(AZ,AY){var Aa;if(o.selection.mode=="y"){d.first.x=0;d.second.x=N}else{Aa=V(AZ,"x");d.first.x=Aa.axis.p2c(Aa.from);d.second.x=Aa.axis.p2c(Aa.to)}if(o.selection.mode=="x"){d.first.y=0;d.second.y=AB}else{Aa=V(AZ,"y");d.first.y=Aa.axis.p2c(Aa.from);d.second.y=Aa.axis.p2c(Aa.to)}d.show=true;x();if(!AY){r()}}function b(){var AY=5;return Math.abs(d.second.x-d.first.x)>=AY&&Math.abs(d.second.y-d.first.y)>=AY}}F.plot=function(L,J,I){var K=new D(L,J,I);return K};function C(J,I){return I*Math.floor(J/I)}function H(J,K,I){if(K<J){return K}else{if(K>I){return I}else{return K}}}function G(O,N,J,L){var M=["r","g","b","a"];var I=4;while(-1<--I){this[M[I]]=arguments[I]||((I==3)?1:0)}this.toString=function(){if(this.a>=1){return"rgb("+[this.r,this.g,this.b].join(",")+")"}else{return"rgba("+[this.r,this.g,this.b,this.a].join(",")+")"}};this.scale=function(R,Q,S,P){I=4;while(-1<--I){if(arguments[I]!=null){this[M[I]]*=arguments[I]}}return this.normalize()};this.adjust=function(R,Q,S,P){I=4;while(-1<--I){if(arguments[I]!=null){this[M[I]]+=arguments[I]}}return this.normalize()};this.clone=function(){return new G(this.r,this.b,this.g,this.a)};var K=function(Q,P,R){return Math.max(Math.min(Q,R),P)};this.normalize=function(){this.r=K(parseInt(this.r),0,255);this.g=K(parseInt(this.g),0,255);this.b=K(parseInt(this.b),0,255);this.a=K(this.a,0,1);return this};this.normalize()}var B={aqua:[0,255,255],azure:[240,255,255],beige:[245,245,220],black:[0,0,0],blue:[0,0,255],brown:[165,42,42],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgrey:[169,169,169],darkgreen:[0,100,0],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkviolet:[148,0,211],fuchsia:[255,0,255],gold:[255,215,0],green:[0,128,0],indigo:[75,0,130],khaki:[240,230,140],lightblue:[173,216,230],lightcyan:[224,255,255],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightyellow:[255,255,224],lime:[0,255,0],magenta:[255,0,255],maroon:[128,0,0],navy:[0,0,128],olive:[128,128,0],orange:[255,165,0],pink:[255,192,203],purple:[128,0,128],violet:[128,0,128],red:[255,0,0],silver:[192,192,192],white:[255,255,255],yellow:[255,255,0]};function A(J){var I,K=J;do{I=K.css("background-color").toLowerCase();if(I!=""&&I!="transparent"){break}K=K.parent()}while(!F.nodeName(K.get(0),"body"));if(I=="rgba(0, 0, 0, 0)"){return"transparent"}return I}function E(K){var I;if(I=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(K)){return new G(parseInt(I[1],10),parseInt(I[2],10),parseInt(I[3],10))}if(I=/rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]+(?:\.[0-9]+)?)\s*\)/.exec(K)){return new G(parseInt(I[1],10),parseInt(I[2],10),parseInt(I[3],10),parseFloat(I[4]))}if(I=/rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(K)){return new G(parseFloat(I[1])*2.55,parseFloat(I[2])*2.55,parseFloat(I[3])*2.55)}if(I=/rgba\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\s*\)/.exec(K)){return new G(parseFloat(I[1])*2.55,parseFloat(I[2])*2.55,parseFloat(I[3])*2.55,parseFloat(I[4]))}if(I=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(K)){return new G(parseInt(I[1],16),parseInt(I[2],16),parseInt(I[3],16))}if(I=/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(K)){return new G(parseInt(I[1]+I[1],16),parseInt(I[2]+I[2],16),parseInt(I[3]+I[3],16))}var J=F.trim(K).toLowerCase();if(J=="transparent"){return new G(255,255,255,0)}else{I=B[J];return new G(I[0],I[1],I[2])}}})(jQuery);

// flot tooltip	

function flot_showTooltip(tooltipId, x, y, contents) {
	jQuery(function($) {

		$('<div id="' + tooltipId + '">' + contents + '</div>').css( {
			position: 'absolute',
			display: 'none',
			top: y + 5,
			left: x + 5,
			border: '1px solid #c9c9c9',
			padding: '2px',
			'background-color': '#e5e5e5',
			opacity: 0.80,
			'z-index': 10000002
		}).appendTo("body").fadeIn(200);
	});	
}
/* end flot */

/* start formatNumberTea */


function formatNumberTea(number, pattern) {
	if (isNaN(number)) {number = 0};
	var negativeSign = (number < 0) ? '-' : '';
	var formattedNumber;

	if (number == Infinity || number >= 17976931348623157000000000) {
		formattedNumber = 'INF';
	} else {
		var splitByDec = pattern.split('.');
		var patternL = splitByDec[0];
		var patternR = splitByDec[1] ? splitByDec[1] : '';

		splitByDec = (Math.round(Math.abs(number)*Math.pow(10,patternR.length))/Math.pow(10,patternR.length)+'').split('.');
		var numberL = (splitByDec[0] != '0' || patternL == '') ? splitByDec[0] : '';
		var numberR = splitByDec[1] ? splitByDec[1] : '';

		for (var l=0; l < patternL.length; ++l) {
			if (patternL.charAt(l) == '0' && numberL.length <= l) {
				numberL = '0' + numberL;
			}
		}

		for (var r=0; r < patternR.length; ++r) {
			if (patternR.charAt(r) == '0' && numberR.length <= r) {
				numberR+='0';
			}
		}

		var decimalPoint = (numberR === '') ? '' : '.';
		formattedNumber = numberL + decimalPoint + numberR;
	}
	return negativeSign + formattedNumber + '';
}
/* end formatNumberTea */

/* start waintility */


if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function(el) {
		for (var i = this.length-1; i >= 0; --i) {
			if (this[i] == el) { return i; } /* should really use === to check type */
		}
		return -1;
	}
}

Function.prototype.bindf = function() {
	if (arguments.length < 2 && typeof arguments[0] == "undefined") return this;
	var __method = this, args = Array.prototype.slice.call(arguments), object = args.shift();
	return function() {
		return __method.apply(object, args.concat(Array.prototype.slice.call(arguments)));
	}
};

Utility = {};

Utility.iterate = function(array, fn, context, progress) {
	if (!array.length) {
		if (progress) {
			progress.call(context, 0);
		}
		return;
	}

	var items = array.concat();
	var startTime = (new Date).getTime();
	(function work() {
		fn.call(context, items.shift());

		var itemsRemaining = !!items.length;
		var timeExpired = (new Date).getTime()-startTime > 100;
		if (progress) {
			if (timeExpired && !itemsRemaining) {
				setTimeout(function() {
					progress.apply(context, [0]);
				}, 20);
			} else {
				progress.call(context, items.length);
			}
		}
		if (itemsRemaining) {
			if (timeExpired) {
				setTimeout(work, 20);
				startTime = (new Date).getTime();
			} else {
				work();
			}
		}
	})();
};

Utility.defer = function(fn, context, args, callback) {
	if (!args) { args = []; }
	setTimeout(function() {
		var passToCallback = fn.apply(context, args);
		if (callback) {
			callback.call(context, passToCallback);
		}
	}, 20);
};

Utility.schedule = function(fns, context) {
	var startTime = (new Date).getTime();
	(function work() {
		fns.shift().call(context);
		if (fns.length > 0) {
			if ((new Date).getTime()-startTime > 100) {
				setTimeout(work, 20);
				startTime = (new Date).getTime();
			} else {
				work();
			}
		}
	})();
};


Utility.formatNumberTea = function(number, pattern) {
	if (isNaN(number)) {number = 0};
	var negativeSign = (number < 0) ? '-' : '';
	var formattedNumber;

	if (number == Infinity || number >= 17976931348623157000000000) {
		formattedNumber = 'INF';
	} else {
		var splitByDec = pattern.split('.');
		var patternL = splitByDec[0];
		var patternR = splitByDec[1] ? splitByDec[1] : '';

		splitByDec = (Math.round(Math.abs(number)*Math.pow(10,patternR.length))/Math.pow(10,patternR.length)+'').split('.');
		var numberL = (splitByDec[0] != '0' || patternL == '') ? splitByDec[0] : '';
		var numberR = splitByDec[1] ? splitByDec[1] : '';

		for (var l=0; l < patternL.length; ++l) {
			if (patternL.charAt(l) == '0' && numberL.length <= l) {
				numberL = '0' + numberL;
			}
		}

		for (var r=0; r < patternR.length; ++r) {
			if (patternR.charAt(r) == '0' && numberR.length <= r) {
				numberR+='0';
			}
		}

		var decimalPoint = (numberR === '') ? '' : '.';
		formattedNumber = numberL + decimalPoint + numberR;
	}
	return negativeSign + formattedNumber + '';
};

Utility.shortOrdinal = function(number) {
	if (number % 100 >= 11 && number % 100 <= 13) {
		return number + 'th';
	} else {
		switch(number % 10) {
			case 1: return number + 'st';
			case 2: return number + 'nd';
			case 3: return number + 'rd';
			default: return number + 'th';
		}
	}	
};

Utility.formatDelta = function(number) {
	if (number > 0.1) return '<span style="color:green">+' + number + '</span>';
	else if (number < -0.1)	return  '<span style="color:red">' + number + '</span>';
	else return '+0';
};

Utility.filterData = function(data, constants) {
	var n = new Object();
	for (var elId in constants) {
		if (data[constants[elId]] != null) n[constants[elId]] = data[constants[elId]];
	}
	return n;
};

Utility.decodeChanges = function(changes, constants) {
	var n = new Object();
	for (var elId in changes) {
		if (constants[elId] != null) n[constants[elId]] = changes[elId];
	}
	return n;
};

Utility.createDateForTimezone = function(ts, timezoneOffset) {
	var d = new Date();
	d.setTime(ts - (timezoneOffset - d.getTimezoneOffset())*60*1000);
	return d;
};

Utility.Listener = Class.create({
	initialize: function(fn, props) {
		this._fn = fn;
		this._props = props;
	},

	broadcast: function(component, args) {
		var props = (args.length > 0 ? args[0] : null);
		if (!props) args.unshift(null);
		args.unshift(component);
		if (!this._props || !props) this._fn.apply(component, args);
		else {
			for (var i = 0; i < this._props.length; i++) {
				if (props.indexOf(this._props[i]) >= 0) {
					this._fn.apply(component, args);
					break;
				}
			}
		}
	}

});

Utility.extend = function(base, top) {
	if (!base) base = new Object();
	for (var p in top) base[p] = top[p];
	return base;
};

Utility.objectToArray = function(ob) {
	if (typeof ob != 'object') { return []; }
	var a = [];
	for (var k in ob) {
		if (ob.hasOwnProperty(k)) {
			a.push(ob[k]);
		}
	}
	return a;
};

Utility.roundToPlace = function(f, p) {
	return Math.round(f*Math.pow(10, p))/Math.pow(10, p);
};

Utility.Zebugger = Class.create({
	initialize: function() {
		this.debugMode = null;
		this.debugAll = false;
		this.timers = new Object();
	},
	
	setDebugMode: function(mode) {
		if (!this.debugMode) this.debugMode = '';
		if (typeof mode == "string") this.debugMode += mode;
		if (mode == "true" || mode == true) this.debugAll = true;
	},
	
	debug: function() {
		try {
			if (this.debugMode) {
				var props = Array.prototype.slice.call(arguments), mode='';
				if (props.length > 0 && typeof props[0] == "string") mode = props.shift();
				if (this.debugAll || this.debugMode.indexOf(mode) >= 0) {
					if (typeof(console) != 'undefined' && typeof(console.log) == 'function') console.log.apply(console, props);
					else {
						//for (var i = 0; i < props.length; i++) alert(props[i]);
					}
				}
			}
		} catch(e) { }
	},
	
	getCurrentTime: function() {
		return (new Date().getTime());
		
	},
	
	startTimer: function(timerName, isStatic) {
		if (this.debugMode) {
			if (timerName == null) timerName = 'default';
			if (this.timers[timerName]) {
				this.timers[timerName].timeStart = this.getCurrentTime();
				this.timers[timerName].count++;
			}
			else this.timers[timerName] = {timeStart: this.getCurrentTime(), totalTime: 0, isStatic: isStatic == true, count: 1};
			this.lastTimerName = timerName;
		}
	},
	
	stopTimer: function(mode, timerName) {
		if (this.debugMode) {
			if (!timerName) timerName = this.lastTimerName;
			var timer = this.timers[timerName];
			if (timer) {
				var timeTaken = this.getCurrentTime() - timer.timeStart;
				if (!timer.isStatic) this.debug(mode, timerName+' took '+timeTaken+'ms');
				else timer.totalTime += timeTaken;
			}
		}
	}
});
Utility.zebugger = new Utility.Zebugger();

Utility.Fetcher = Class.create({
	
	createXHR: function() {
		if(window.XMLHttpRequest) {
			return new XMLHttpRequest();
		}
		
		try { return new ActiveXObject("Msxml2.XMLHTTP.6.0") } catch(e) {}
		try { return new ActiveXObject("Msxml2.XMLHTTP.3.0") } catch(e) {}
		try { return new ActiveXObject("Msxml2.XMLHTTP") } catch(e) {}
		try { return new ActiveXObject("Microsoft.XMLHTTP") } catch(e) {}
		return null;
	},
	
	fetch: function(url, options) {
		var xhr = new this.createXHR();
		if (!xhr) { return false; }
		
		options = this.setDefaultOptions(options);
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				var responseJSON = (options.parseJSON) ? this.parseJSON(xhr.responseText) : null;
				var response = {responseText:xhr.responseText, responseXML:xhr.responseXML, statusCode:xhr.status, responseJSON:responseJSON}
				if (xhr.status >= 200 && xhr.status < 300 && options.onSuccess) {
					options.onSuccess(response);
				} else if (options.onComplete) {
					options.onComplete(response);
				}
			}
		}.bindf(this);
		var paramString = ''
		if (options.parameters) {
			for(option in options.parameters) {
				paramString += (paramString == '') ? '?' : '&';
				paramString+=option+'='+options.parameters[option];
			}
		}
		try {
			xhr.open(options.method, url+paramString, true);
			xhr.send('');
		} catch(e) {
			return false;
		}
		return true;
	},
	
	setDefaultOptions: function(options) {
		if (!options) options = {};
		options.method = (options.method == 'POST' || options.method == 'post') ? 'POST' : 'GET';
		options.parseXML = (options.parseXML == true);
		options.parseJSON = (options.parseJSON == true);
	
		/* convert query string to parameters map */
		if (options.parameters && options.parameters.length && options.parameters.split) {
			parameters = {};
			var paramArray = options.parameters.split('&');
			for (var i=0; i<paramArray.length; ++i) {
				var pair = paramArray[i].split('=');
				if (pair.length == 2) {
					parameters[pair[0]] = pair[1];
				}
			}
			options.parameters = parameters;
		}
		return options;
	},
	
	parseXML: function(text) {
		var parsed = null;
		try {
			if (document.implementation.createDocument) {
				parsed = (new DOMParser()).parseFromString(text,'text/xml');
			} else if (window.ActiveXObject) {
				parsed = new ActiveXObject('Microsoft.XMLDOM');
				parsed.async='false';
				parsed.loadXML(text);
			}
		} catch (e) {}
		return parsed;
	},
	
	parseJSON: function(text) {
		var parsed = null;
		try {
			parsed = eval('(' + text + ')');
		} catch (e) {}
		return parsed;
	}
});
Utility.fetcher = new Utility.Fetcher();


Utility.Component = Class.create({
	registerListener: function(fn, props) {
		if (!this._listeners) {
			this._listeners = new Object();
			this._listenerId = 0;
		}
		this._listeners[this._listenerId] = new Utility.Listener(fn, props);
		return {object: this, id: this._listenerId++};
	},

	broadcastToListeners: function() {
		if (this._listeners) {
			for (var i in this._listeners) {
				this._listeners[i].broadcast(this, Array.prototype.slice.call(arguments));
			}
		}
	},
	
	unregisterListener: function(listenerId) {
		delete this._listeners[listenerId];
	},
	
	stopListening: function(listeners) {
		if (listeners == null) return null;
		for (var i = 0; i < listeners.length; ++i) {
			listeners[i].object.unregisterListener(listeners[i].id);
		}
		return null;
	},
	
	debug: function() {
		Utility.zebugger.debug.apply(Utility.zebugger, arguments);
	},
	
	startTimer: function() {
		Utility.zebugger.startTimer.apply(Utility.zebugger, arguments);
	},
	
	stopTimer: function() {
		Utility.zebugger.stopTimer.apply(Utility.zebugger, arguments);
	}
});

Utility.getCookie = function(name) {
	var cookies = document.cookie.split(';');
	for(var c=cookies.length-1; c >= 0; --c) {
		var cookie = cookies[c];
		while (cookie.charAt(0)==' ') {
			cookie = cookie.substring(1, cookie.length);
		}
		if (cookie.indexOf(name+'=') == 0) {
			return cookie.substring(name.length+1, cookie.length);
		}
	}
	return null;
};


/* end waintility */

/* start playerTable */


function players(navParams) {

	var spinnerEl = $("playerTableTabSpinner");
	if (spinnerEl) spinnerEl.show();
	var realtimeScoringDiv = $('realtimeScoringTools');
	var usingPnc = typeof rosterManager != "undefined";

	var params = navParams.split("&");
	var scoringPeriodId = null;
	var containerId = "playerTableContainerDiv";
	var inAjaxPath = null;
	var pCompareHighlight = false;
	for (var i = 0; i < params.length; i++) {
		var paramArr = params[i].split("=");
		var key = paramArr[0];
		if (key == "containerId" && paramArr[1] != "null") {
			containerId = paramArr[1];
		} else if (key == "scoringPeriodId") {
			scoringPeriodId = parseInt(paramArr[1]);
			if (realtimeScoringDiv) {
				parseInt(paramArr[1]) == com.espn.games.currentScoringPeriodId ? realtimeScoringDiv.show() : realtimeScoringDiv.hide();
			}
		} else if (key == "ajaxPath") {
			inAjaxPath = paramArr[1];
		} else if (key == "highlightForComparePlayers" && paramArr[1] == "true") {
			pCompareHighlight = true;
		}
	}

	var ajaxPath = (inAjaxPath ? inAjaxPath : 'playertable/prebuilt/'+com.espn.env.context.replace('_', '/'));

	if (typeof ajaxFilterUpdater != 'undefined' && typeof ajaxFilterUpdater.handleNewParams == "function" && ajaxFilterUpdater.containerId == containerId) {
		ajaxFilterUpdater.handleNewParams(navParams);
	}

	var _complete = function(t) {

		var responseScripts = t.responseText.extractScripts();
		if (usingPnc) {
			if (scoringPeriodId != null && scoringPeriodId != rosterManager.scoringPeriodId) {
				rosterManager.updateScoringPeriodId(scoringPeriodId, responseScripts);
			} else {
				rosterManager.tabChange(responseScripts);
			}
		} else {
			responseScripts.map(function(script) {
				return eval(script);
			});
		}

		if (spinnerEl) spinnerEl.hide();
		if (chooser) { chooser.isOpen = false; chooser.getObjs(); }
		if (pCompareHighlight == true) {
			comparePlayersManager.highlightStats();
			compareSearchObj = null;
			playerSuggesterCompare = null;
			compareSearchObj = new Object();
			compareSearchObj.varName = "playerSuggesterCompare";
			compareSearchObj.suggestDiv = "compare_playerSuggestions";
			compareSearchObj.inputField = "compare_playerName";
			compareSearchObj.cssPrefix = "compare_";
			playerSuggesterCompare = new PlayerSuggester(compareSearchObj);
		}
	}
	var url = "http://" + host + "/" + gameRoot + "/" + ajaxPath + "?" + navParams + noCache();

	var target = containerId;

	var confirmed = true;
	if (usingPnc && scoringPeriodId != null && scoringPeriodId != rosterManager.scoringPeriodId) confirmed = rosterManager.rosterSaver.confirmScoringPeriodChange();

	if (confirmed) new Ajax.Updater(target, url, {method:'get', onComplete: _complete, evalScripts: false});
	else if (spinnerEl) spinnerEl.hide();
}

function noCache() {
	return "&r=" + Math.round(Math.random() * 99999999);
}

function togglePlayerTableHiddenGroups() {
	jQuery('div.playerTableShowHideGroupLink').toggle();
	jQuery('table.playerTableTable.hideableGroup,div.boxscoreDangler.hideableGroup').toggle();
}

// CONTROL PLAYER NEWS TOGGLE
var toggleRosterViewPNI = function(playerId) {
	if ($('pnews_'+playerId)) {
		if ($('pnews_'+playerId).hasClassName('pni-rosterview-closed') && $('pnews_'+playerId).firstDescendant().hasClassName("hand")) {
			$('pnews_'+playerId).removeClassName('pni-rosterview-closed');
		} else {
			$('pnews_'+playerId).addClassName('pni-rosterview-closed');
		}
	}
}



function findPos(obj) {
	var curleft = curtop = 0;
	if (obj.offsetParent) {
		curleft = obj.offsetLeft
		curtop = obj.offsetTop
		while (obj = obj.offsetParent) {
			curleft += obj.offsetLeft
			curtop += obj.offsetTop
		}
	}
	return [curleft,curtop];
}

StatChooser = Class.create();

StatChooser.prototype = {

	isOpen: false,
	chooserDiv: null,
	chooserLink: null,
	inputs: null,
	
	initialize: function() { },
	
	updateCookie: function(playerParams) {
		var pipe = "";
		var statIdsToShow = "";
		
		this.inputs = this.chooserDiv.getElementsByTagName('input');
	
		var showAverages = null, showRotoLine = null;
		if (this.inputs) {
			for (var i=0; i < this.inputs.length; i++) {
				var thisEl = this.inputs[i];
				if (thisEl.name == "chooseLeagueStatsToDisplayChoice" && thisEl.type == "checkbox") {
					if (thisEl.checked) {
						statIdsToShow += pipe + thisEl.value;
						pipe = "|";
					}
				} else if (thisEl.name == "statDisplayType" && thisEl.checked) {
					showAverages = (thisEl.value == "averages");
				} else if (thisEl.name == "showRotoLine") {
					showRotoLine = thisEl.checked
				}
			}
		}

		var success = function(t){
			players(playerParams);
		}

		//GET LEAGUEID FROM PARAMS
		var params = playerParams.split("&");
		var leagueId = -1;
		for (var i = 0; i < params.length; i++) {
			var paramArr = params[i].split("=");
			if (paramArr[0] == "leagueId") {
				leagueId = paramArr[1];
				break;
			}
		}	
		
		var url = "http://" + host + "/" + gameRoot + "/" + "util/saveLeagueStatsToDisplayToCookie?leagueId=" + leagueId + "&show=" + statIdsToShow;
		if (showAverages != null) url += '&showAverages=' + showAverages;
		if (showRotoLine != null) {
			url += '&showRotoLine=' + showRotoLine;
			var rotoLine = $("rotoline-table")
			if(rotoLine) {
				if(showRotoLine == false) rotoLine.style.display = "none";
				else rotoLine.style.display = "table";
			}
		}
		url += noCache();
		var req = new Ajax.Request(url, {method:'get', onSuccess:success}); 
	},
	
	clearCookie: function(playerParams) {
		var success = function(t){ players(playerParams); }
		var failure = function(t){ }

		//GET LEAGUEID FROM PARAMS
		var params = playerParams.split("&");
		var leagueId = -1;
		for (var i = 0; i < params.length; i++) {
			var paramArr = params[i].split("=");
			if (paramArr[0] == "leagueId") {
				leagueId = paramArr[1];
				break;
			}
		}

		var url = "http://" + host + "/" + gameRoot + "/" + "util/clearLeagueStatsToDisplayCookie?leagueId=" + leagueId + noCache();
		var req = new Ajax.Request(url, {method:'get', onSuccess:success, onFailure:failure});
	},
	
	getObjs: function() {
		this.chooserDiv = $('chooseLeagueStatsToDisplayDiv');
		this.chooserLink = $('chooseLeagueStatsToDisplayLink');
	},
	
	toggle: function() {
		this.getObjs();	
		if (this.isOpen) this.chooserDiv.hide();
		else { 
			var location = findPos(this.chooserLink);
			this.chooserDiv.style.zIndex = -1;
			this.chooserDiv.show();
			this.chooserDiv.style.left = (this.chooserLink.offsetLeft+10)+"px";
			this.chooserDiv.style.top = (location[1]-75)+"px";
			this.chooserDiv.style.zIndex = 10;
		}
		this.isOpen = !this.isOpen;
	}

}

var chooser = new StatChooser();

(function($) {
	AjaxFilterUpdater = Class.create({
		initialize: function(bindHandlers, gameDateFilter, statQualifierFilter, containerId) {
			this.allowAjax = true;
			this.params = this.deserialize(window.location.search.substring(1));
			this.gameDateFilter = gameDateFilter;
			this.statQualifierFilter = statQualifierFilter;
			if (this.gameDateFilter != null) this.gameDateFilter.ajaxFilterUpdater = this;
			if (this.statQualifierFilter != null) this.statQualifierFilter.ajaxFilterUpdater = this;
			this.containerId = (containerId != null ? containerId : "playerTableContainerDiv");
			if (window.location.hash != '' && window.location.hash != '#reset' && window.location.search.indexOf(window.location.hash.substring(1)) < 0) {
				Utility.extend(this.params, this.deserialize(window.location.hash.substring(1)));
				this.showCurrentFilters();
				this.filter();
			}
			if (bindHandlers) this.bindEventHandlers();
		},

		deserialize: function(qs) {
			var qss = qs.split('&'), p = new Object();
			for (var i = 0; i < qss.length; i++) {
				var kv = qss[i].split('=');
				p[kv[0]] = kv[1];
			}
			return p;
		},

		serialize: function(ob) {
			var s = '', amp = '';
			for (var k in ob) {
				s += amp + k + '=' + ob[k];
				amp = '&';
			}
			return s;
		},

		filter: function(param, value, mutExParams, skipUpdate) {
			var newOb = {};
			if (param != null) {
				if (value == null) delete this.params[param];
				else {
					newOb[param] = value;
					Utility.extend(this.params, newOb);
				}
				var paramsToDelete = ['startIndex', 'playerId'].concat(mutExParams != null ? mutExParams : []);
				for (var i = 0; i < paramsToDelete.length; i++) delete this.params[paramsToDelete[i]];
			}
			if (!skipUpdate) players(this.serialize(this.params));
		},
		
		handleNewParams: function(newParams) {
			this.params = this.deserialize(newParams);
			this.updateHash();
		},

		updateHash: function() {
			var h = this.serialize(this.params).replace(/&*leagueId=[0-9]+/, '').replace(/&*teamId=[0-9]+/, '');
			if (h == null || h == '') h = 'reset';
			window.location.hash = h;
		},

		showCurrentFilters: function() {
			for (var k in this.params) {
				var val = this.params[k];
				if (k == "slotCategoryGroup") {
					$('ul.filterToolsOptionSet li a[name="slotCategoryId"]').removeClass('active');
					$('ul.filterToolsOptionSet li a.slotCategoryGroup[name="slotCategoryId"][value="'+val+'"]').addClass('active');
				} else if (k == "statFilter") {
					if (val != -1) {
						$('ul.filterToolsOptionSet li a[name="'+k+'"]').removeClass('active');
						$('ul.filterToolsOptionSet li a[name="'+k+'"][value="1"]').addClass('active');
						this.statQualifierFilter.reverseUpdate(val);
					}
				} else if (k == "gamesInScoringPeriodDate") {
					$('ul.filterToolsOptionSet li a[name="gamesInScoringPeriodId"]').removeClass('active');
					this.gameDateFilter.reverseUpdate(val);
				} else if (k == "search") {
					$('input#lastNameInput').attr('value', val);
					$('input#lastNameCancel').removeAttr('disabled');
				} else if (k == "proTeamId") {
					$('select#proTeamSelect').attr('value', val);
				} else {
					$('ul.filterToolsOptionSet li a[name="'+k+'"]').removeClass('active');
					$('ul.filterToolsOptionSet li a[name="'+k+'"][value="'+val+'"]').addClass('active');
				}
			}
		},
		
		resetAll: function() {
			var searchParams = this.deserialize(window.location.search.substring(1)), newOb = {}, paramsToKeep = ['leagueId', 'teamId', 'seasonId'], needsRedirect = false;
			for (var k in searchParams) {
				if (paramsToKeep.indexOf(k) > -1) newOb[k] = searchParams[k];
				else needsRedirect = true;
			}
			if (needsRedirect) window.location.search = '?' + this.serialize(newOb);
			else {
				this.params = newOb;
				this.filter();
				$('ul.filterToolsOptionSet li a').removeClass('active');
				$('ul.filterToolsOptionSet li a.default').addClass('active');
				this.statQualifierFilter.disableFilter();
				this.gameDateFilter.updateDateText(null);
				$('input#lastNameInput').attr('value', '');
				$('input#lastNameCancel').attr('disabled', 'disabled');
				$('input#lastNameSubmit').attr('disabled', '');
				$('select#proTeamSelect').attr('value', 'null');
			}
		},
		
		bindEventHandlers: function() {
			var _this = this;
			$('ul.filterToolsOptionSet li a').click(function(event) {
				event.preventDefault();
				var clickedEl = $(this);
				$('ul.filterToolsOptionSet li a[name="'+clickedEl.attr('name')+'"]').removeClass('active');
				clickedEl.addClass('active');
				if (clickedEl.hasClass('statFilter')) {
					if (parseInt(clickedEl.attr('value')) > -1) {
						_this.statQualifierFilter.enableFilter();
						return;
					} else {
						_this.statQualifierFilter.disableFilter();
					}
				}
				var nullParams = [], attrName = clickedEl.attr('name');
				if (clickedEl.attr('name') == 'slotCategoryId') {
					if (clickedEl.hasClass('slotCategoryId')) nullParams.push('slotCategoryGroup');
					else {
						nullParams.push('slotCategoryId');
						attrName = 'slotCategoryGroup';
					}
					if (_this.params.gamesInScoringPeriodId == "ps" && clickedEl.hasClass('noProbStart')) {
						$('ul.filterToolsOptionSet li a[name="gamesInScoringPeriodId"]').removeClass('active');
						var defGameFilter = $('ul.filterToolsOptionSet li a[name="gamesInScoringPeriodId"].default');
						defGameFilter.addClass('active');
						_this.filter('gamesInScoringPeriodId', defGameFilter.attr('value'), null, true);
					}
				}
				if (clickedEl.attr('name') == 'gamesInScoringPeriodId') {
					nullParams.push('gamesInScoringPeriodDate');
					_this.gameDateFilter.linkClicked();
					if (clickedEl.attr('value') == "ps") {
						var defSlot = $('ul.filterToolsOptionSet li a[name="slotCategoryId"].probStart').eq(0);
						var slotAttrName = 'slotCategroyId', slotNullParams = [];
						if (defSlot && defSlot.length > 0) {
							$('ul.filterToolsOptionSet li a[name="slotCategoryId"]').removeClass('active');
							defSlot.addClass('active');
							if (defSlot.hasClass('slotCategoryId')) slotNullParams.push('slotCategoryGroup');
							else {
								slotNullParams.push('slotCategoryId');
								slotAttrName = 'slotCategoryGroup';
							}
							_this.filter(slotAttrName, defSlot.attr('value'), slotNullParams, true);
						}
					}
				}
				_this.filter(attrName, clickedEl.attr('value'), nullParams);
			});

			$('input.lastNameFilterButton').click(function(event) {
				event.preventDefault();
				var clickedEl = $(this), searching = (clickedEl.attr('name') == 'search');
				if (searching) {
					_this.filter('search', $('#lastNameInput').attr('value'));
					$('#lastNameCancel').removeAttr('disabled');
				} else {
					_this.filter('search', null);
					$('#lastNameInput').attr('value', '')
					$('input#lastNameCancel').attr('disabled', 'disabled');
				}
			});

			$('#proTeamSelect').change(function(event) {
				event.preventDefault();
				var selectEl = $(this);
				_this.filter(selectEl.attr('name'), selectEl.attr('value'));
			});

			$('#statSliderStatChooser').change(function(event) {
				event.preventDefault();
				_this.statQualifierFilter.updateStatId($(this).attr('value'));
			});

			$('#gameDateSelectorPopupCalendarIcon').click(function(event){
				_this.gameDateFilter.handleIconClick(event);
			});

			$('#resetAllFiltersButton').click(function(event){
				event.preventDefault();
				_this.resetAll();
			});
		}
	});
	
	StatQualifierFilter = Class.create({
		initialize: function(filterOptions, usingFilter) {
			this.allowAjax = true;
			this.filterOptions = filterOptions;
			this.current = this.filterOptions[0];
			this.initSlider();
			this.renderCurrentSliderValue();
			this.renderCurrentSliderType();
			if (!usingFilter) this.disableFilter();
		},

		initSlider: function() {
			var ops = { slide: this.handleSlide.bindf(this), change: this.handleChange.bindf(this) };
			Utility.extend(ops, this.getOptionValues(this.current));
			this.sliderDiv = $("#statSlider");
			this.sliderDiv.slider(ops);
		},

		getOptionValues: function(op) {
			op.step = (op.step ? op.step : 1);
			op.value = (op.value ? op.value: op.min+(Math.round((op.max-op.min)/5)));
			op.type = (op.type ? op.type: StatQualifierFilter.CONSTANTS.TYPE_GT);
			return op;
		},
		
		isMin: function() {
			return this.current.type == StatQualifierFilter.CONSTANTS.TYPE_GT;
		},
		
		renderCurrentSliderValue: function(val) {
			var vuf = (val != null ? val : this.current.value);
			var vf = vuf;
			if (this.current.format) {
				if (typeof this.current.format == 'function') vf = this.current.format(vuf);
				else vf = Utility.formatNumberTea(vuf, this.current.format);
			}
			$('#statSliderValue').text(vf);
		},

		renderCurrentSliderType: function() {
			$('#statSliderTypeLabel').text((this.isMin() ? 'At least' : 'At most'));
		},
		
		updateStatId: function(statId, inVal) {
			var fields = ['min', 'max', 'value', 'step'];
			for (var i = 0; i < this.filterOptions.length; i++) {
				if (this.filterOptions[i].statId == statId) {
					this.current = this.filterOptions[i];
					if (inVal != null) this.current.value = inVal;
					this.getOptionValues(this.current);
					for (var i=0; i < fields.length; i++) this.sliderDiv.slider('option', fields[i], this.current[fields[i]]);
					this.renderCurrentSliderValue();
					this.renderCurrentSliderType();
					this.ajaxUpdate();
					return;
				}
			}
		},
		
		handleSlide: function(event, ui){ 
			this.renderCurrentSliderValue(ui.value);
		},
		
		handleChange: function(event, ui){
			this.current.value = ui.value;
			this.ajaxUpdate();
		},
		
		enableFilter: function(){
			this.sliderDiv.slider('enable');
			$('#statSliderStatChooser').removeAttr('disabled');
			this.ajaxUpdate();
		},
		
		disableFilter: function(){
			this.sliderDiv.slider('disable');
			$('#statSliderStatChooser').attr('disabled', 'disabled');
		},
		
		ajaxUpdate: function() {
			if (!this.allowAjax) return;
			var isMin = this.isMin();
			var statId = this.current.statId;
			var min = (isMin ? this.current.value : null);
			var max = (!isMin ? this.current.value : null);
			if (this.ajaxFilterUpdater) this.ajaxFilterUpdater.filter("statFilter", statId+'|'+min+'|'+max);
		},
		
		reverseUpdate: function(str) {
			this.allowAjax = false;
			var strs = str.split('|');
			var statId = parseInt(strs[0]);
			var min = (strs[1] != null && strs[1] != "null" ? parseFloat(strs[1]) : null);
			var max = (strs[2] != null && strs[2] != "null" ? parseFloat(strs[2]) : null);
			$('select#statSliderStatChooser').attr('value', statId);
			this.updateStatId(statId, (min != null ? min : max));
			this.enableFilter();
			this.allowAjax = true;
		}
	});
	StatQualifierFilter.CONSTANTS = {TYPE_GT:0, TYPE_LT:1};
	
	GameDateFilter = Class.create({
		initialize: function(transScoringPeriod, firstScoringPeriod, finalScoringPeriod) {
			this.transScoringPeriod = transScoringPeriod;
			this.firstScoringPeriod = firstScoringPeriod;
			this.finalScoringPeriod = finalScoringPeriod;
		},
		
		handleIconClick: function(event) {
			if (!this.popupCalendar) this.popupCalendar = new PopupCalendar(false, this.selectDate.bindf(this), this.isActive.bindf(this));
			this.popupCalendar.toggle(event);
		},
		
		selectDate: function(d) {
			$('ul.filterToolsOptionSet li a[name="gamesInScoringPeriodId"]').removeClass('active');
			if (d.getTime() >= this.transScoringPeriod[0] && d.getTime() < this.transScoringPeriod[1]) {
				$('ul.filterToolsOptionSet li a[name="gamesInScoringPeriodId"].current').addClass('active');
				this.updateDateText(null);
			} else {
				this.updateDateText(d);
			}
			if (this.ajaxFilterUpdater) this.ajaxFilterUpdater.filter('gamesInScoringPeriodDate', this.getTeaDateString(d), ['gamesInScoringPeriodId']);
		},
		
		isActive: function(d) {
			return (d.getTime() >= this.firstScoringPeriod[0] && d.getTime() < this.finalScoringPeriod[1]);
		},
		
		getTeaDateString: function(d) {
			function pad(n){return n<10 ? '0'+n : n}
			return '' + d.getFullYear() + pad(d.getMonth()+1) + pad(d.getDate());
		},
		
		getGameDateText: function(d) {
			var dayTexts = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'], monthTexts = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
			return dayTexts[d.getDay()] + ', ' + monthTexts[d.getMonth()] + ' ' + d.getDate();
		},
		
		linkClicked: function() {
			if (this.popupCalendar) this.popupCalendar.showSelectedDate = false;
			$('#gameDateSelectorSelectedDate').text('');
		},
		
		updateDateText: function(d) {
			var v = (d != null ? this.getGameDateText(d) : '');
			$('#gameDateSelectorSelectedDate').text(v);
		},
		
		reverseUpdate: function(teaDate) {
			var year = parseInt(teaDate.substr(0,4));
			var month = parseInt(teaDate.substr(4,2))-1;
			var date = parseInt(teaDate.substr(6,2));
			var d = new Date(year, month, date);
			this.updateDateText(d);
		}
	});
})(jQuery);
/* end playerTable */

/* start gigya */


ESPNGigya = {	
	scriptEl: null,
	pendingShare: null,
	
	serviceReady: function() {
		return typeof gigya!=='undefined' && typeof gigya.services!=='undefined' && typeof gigya.services.socialize!=='undefined';
	},
	
	loadGigya: function() {
		if (!this.scriptEl) {
			this.scriptEl = document.createElement('script');
			this.scriptEl.setAttribute('src', 'http://cdn.gigya.com/JS/socialize.js?apiKey=2_B48MVBl19K9CQj72UVrAqLh7VSAyZDfMkclkt8foSSRaAbdWu36H_N3Ky_ERWhDG');
			this.scriptEl.setAttribute('type', 'text/javascript');
			document.body.appendChild(this.scriptEl);
		}
		return this.scriptEl;
	},
	
	onServiceReady: function(serviceName) {
		if (serviceName === 'socialize' && this.pendingShare) {
			this.showShareUI(this.pendingShare);
		}
	},
	
	showShareUI: function(options) {
		if (!this.serviceReady()) {
			this.pendingShare = options;
			this.loadGigya();
			return false;
		}
		
		if (!options) { options = {}; }
		if (typeof this.setDefaultShareOptions == 'function') {
			options = this.setDefaultShareOptions(options);
		}
		
		var act = new gigya.services.socialize.UserAction();
		if (options.userMessage !== undefined) { act.setUserMessage(options.userMessage); }
		if (options.title !== undefined) { act.setTitle(options.title); }
		if (options.description !== undefined) { act.setDescription(options.description); }
		if (options.linkBack !== undefined) { act.setLinkBack(options.linkBack); }
		if (options.actionName !== undefined) { act.setActionName(options.actionName); }
		if (options.template !== undefined) { act.setTemplate(options.template); }
		if (options.templateFields) {
			for (var f=options.templateFields.length-1; f>=0; --f) {
				var templateField = options.templateFields[f];
				act.setTemplateField(templateField.fieldName, templateField.text, templateField.href);
			}
		}
		if (options.actionLinks) {
			for (var a=options.actionLinks.length-1; a>=0; --a) {
				var actionLink = options.actionLinks[a];
				act.addActionLink(actionLink.title, actionLink.href);
			}
		}
		if (options.mediaItems) {
			for (var m=options.mediaItems.length-1; m>=0; --m) {
				act.addMediaItem(options.mediaItems[m]);
			}
		}
		
		var params = { userAction:act };
		if (options.defaultProviders !== undefined) { params.defaultProviders = options.defaultProviders; }
		if (options.containerID !== undefined) { params.containerID = options.containerID; }
		if (options.context !== undefined) { params.context = options.context; }
		if (options.useFacebookConnect !== undefined) { params.useFacebookConnect = true; }
		if (typeof options.onSend === 'function') {params.onSend = options.onSend;}
		if (typeof options.onSendDone === 'function') {params.onSendDone = options.onSendDone;}
		if (typeof options.onLoad === 'function') {params.onLoad = options.onLoad;}
		if (typeof options.onClose === 'function') {params.onClose = options.onClose;}
		params.onError = options.onError || this.defaultOnError;
		
		var conf = {APIKey:'2_B48MVBl19K9CQj72UVrAqLh7VSAyZDfMkclkt8foSSRaAbdWu36H_N3Ky_ERWhDG'};
		if (options.cid !== undefined) { conf.cid = options.cid; }
		if (options.enabledProviders !== undefined) { conf.enabledProviders = options.enabledProviders; }
		if (options.disabledProviders !== undefined) { conf.disabledProviders = options.disabledProviders; }
		if (options.shortURLs !== undefined) { conf.shortURLs = options.shortURLs; }

		gigya.services.socialize.showShareUI(conf, params);
	},
	
	defaultOnError: function(e) {
		if (console && typeof console.log === 'function') { console.log(e); }
	}
};

function onGigyaServiceReady(serviceName) {
	ESPNGigya.onServiceReady(serviceName);
}

ESPNGigya.setDefaultShareOptions = function(options) {
	if (options.title === undefined) {
		options.title = 'ESPN Fantasy Baseball';
	}
	
	if (options.linkBack === undefined) {
		options.linkBack = 'http://games.espn.go.com/flb/welcome';
	}
	
	if (options.mediaItems === undefined) {
		options.mediaItems = [{
			type: 'image',
			src: 'http://g.espncdn.com/s/flblm/14/images/shield.logo.white90.png',
			href: 'http://games.espn.go.com/flb/welcome'
		}];
	}
	
	if (options.actionLinks === undefined) {
		options.actionLinks = [{
			title: 'Play Now',
			href: 'http://games.espn.go.com/flb/welcome'
		}];
	}
	
	if (options.cid === undefined) {
		options.cid = 'FantasyGames.FLB';
	}
	
	return options;
};
/* end gigya */

/* start comparePlayers */


var comparePlayersManager;
var comparePlayersManagerUrl      = "/" + com.espn.games.gameRoot + "/playertable/prebuilt/compareplayers?leagueId=" + com.espn.games.leagueId + "&amp;teamId=" + com.espn.games.fromTeamId + "&amp;playerCompare=true"
var comparePlayersManagerLauncher = '<a href="" content="ajax#' + comparePlayersManagerUrl + '" modal="true" fpopStyle="modal" instance="_comparePlayers" class="flexpop" style="text-decoration:underline;">Compare Players</a>';
(function($) {

	comparePlayersManager = {
	
		messageParams: {
			fadeIn: 0,
			fadeOut: 500,
			ttl: 1500,
			idStr: "comparePlayersMessage",
			classStr: "comparePlayersMessage",
			top: -38,
			left: -30,
			message: "You have done something related to Compare Players.",
			rebindThickbox: true
		},
		
		addFaderMessage: "Player added &raquo; " + comparePlayersManagerLauncher,
		remFaderMessage: "Player removed.",
		fullFaderMessage: "Player limit reached &raquo; " + comparePlayersManagerLauncher,
		
		
		launchComparePlayersPopup: function() {
		
		
		
		
		},
		
	
		handlePlayerClick: function(evt, playerId, aEl) {
		
			if (evt.pageX || evt.pageY) {
				var positions = { x: evt.pageX, y: evt.pageY }
			} else {
				posLeft = evt.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft) - document.documentElement.clientLeft;
				posTop = evt.clientY + (document.documentElement.scrollTop || document.body.scrollTop) - document.documentElement.clientTop;
				var positions = { x: posLeft, y: posTop }
			}

			aEl = $(aEl);
			var isAdd = aEl.hasClass("offcompareplayers");
			if (isAdd) {
				comparePlayersManager.addPlayer(evt, playerId, positions);
			} else {
				comparePlayersManager.remPlayer(evt, playerId, aEl, positions);
			}
			return false;
		},
		
		addPlayer: function(evt, playerId, positions) {
			var comparePlayers_isShowing = false
			if (jQuery('#comparePlayersTable').length != 0) { comparePlayers_isShowing = true } 
					
			if (!playerId || playerId == "undefined") return false;
			
			if (evt != null && positions == null) {
				if (evt.pageX || evt.pageY) {
					var positions = { x: evt.pageX, y: evt.pageY }
				} else {
					posLeft = evt.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft) - document.documentElement.clientLeft;
					posTop = evt.clientY + (document.documentElement.scrollTop || document.body.scrollTop) - document.documentElement.clientTop;
					var positions = { x: posLeft, y: posTop }
				}
			}
			
			
			var launcherEl = $("#comparePlayersLauncher")[0];
			var random = Math.floor(Math.random()*9999999999);
			var href = "/" + com.espn.games.gameRoot + "/tools/addToComparePlayers";
			var ajaxData = {leagueId: com.espn.games.leagueId, playerId: playerId, r: random};
			
			var ajaxResult = $.get(href, ajaxData, function(newCount) {
				if (newCount >= 0) {
					$("a.cmpToggle" + playerId).each(function(idx) {
						el = $(this);
						el.addClass("oncompareplayers").removeClass("offcompareplayers");
						el.attr("title", "Click to stop comparing this player");
					});
					$("#comparePlayersCount").html(newCount);
					if(comparePlayers_isShowing) {
						var o = {modal: "true", style: "modal", instance: "_comparePlayers"};
						cpHref = "/" + com.espn.games.gameRoot + "/playertable/prebuilt/compareplayers" + "?leagueId=" + com.espn.games.leagueId + "&playerId=" + playerId + "&r=" + random;
						jQuery("#fpop_content_comparePlayers").load(cpHref,function() { Flexpop.position(o) });
						Flexpop.remove("_ppc");
					}
					messageFader.show(positions,comparePlayersManager.messageParams, comparePlayersManager.addFaderMessage);
				} else if (newCount == -1) {
					messageFader.show(positions,comparePlayersManager.messageParams, comparePlayersManager.fullFaderMessage);
				}
			}, "text");
		},
		
		remPlayer: function(evt, playerId, aEl, positions) {
			var comparePlayers_isShowing = false;
			if (jQuery('#comparePlayersTable').length != 0) { comparePlayers_isShowing = true };
			
			var launcherEl = $("#comparePlayersLauncher")[0];
			var random = Math.floor(Math.random()*11)			
			var href = "/" + com.espn.games.gameRoot + "/tools/removeFromComparePlayers";
			var ajaxData = {leagueId: com.espn.games.leagueId, playerId: playerId, r: random};
			$.get(href, ajaxData, function(newCount) {
				$("a.cmpToggle" + playerId).each(function(idx) {
					el = $(this);
					el.addClass("offcompareplayers").removeClass("oncompareplayers");
					el.attr("title", "Click to compare this player");
				});
				$("#comparePlayersCount").html(newCount);
				if (comparePlayers_isShowing) {
					var o = {modal: "true", style: "modal", instance: "_comparePlayers"};
					cpHref = "/" + com.espn.games.gameRoot + "/playertable/prebuilt/compareplayers" + "?leagueId=" + com.espn.games.leagueId + "&playerId=" + playerId + "&r=" + random;
					jQuery("#fpop_content_comparePlayers").load(cpHref,function() { Flexpop.position(o) });
					Flexpop.remove("_ppc");
				}
				messageFader.show(positions,comparePlayersManager.messageParams, comparePlayersManager.remFaderMessage);
			}, "text");
			return false;
		},
		
		removeAll: function() {
			var comparePlayers_isShowing = false;
			if (jQuery('#comparePlayersTable').length != 0) { comparePlayers_isShowing = true };
			
			var launcherEl = $("#comparePlayersLauncher")[0];
			var ajaxData = { leagueId: com.espn.games.leagueId };
			var href = "/" + com.espn.games.gameRoot + "/tools/emptyComparePlayers"
			
			$.get(href, ajaxData, function(data) {
				$("#comparePlayersCount").html("0");
				$("a.oncompareplayers").each(function(idx) {
					el = $(this);
					el.addClass("offcompareplayers").removeClass("oncompareplayers");
					el.attr("title", "Click to compare this player");
				});

				if (comparePlayers_isShowing) {
					var o = {modal: "true", style: "modal", instance: "_comparePlayers"};
					cpHref = "/" + com.espn.games.gameRoot + "/playertable/prebuilt/compareplayers";
					jQuery("#fpop_content_comparePlayers").load(cpHref,function() { Flexpop.position(o) });
					Flexpop.remove("_ppc");
				}
			});
		},
		
		highlightStats: function()
		{
			$("div#comparePlayersTable table.playerTableTable").each(function(idx)
			{
				var t = $(this);
				var playerRows = t.find("tr[id^=plyr]");
				var statCols   = t.find("tr.tableSubHead td.playertableStat");
				
				for (var h = 0 ; h < statCols.length ; h++)
				{
					var statHdr = $(statCols[h]);
					var lowBtr  = statHdr.hasClass("lowerIsBetter");
					var bestVal = null;
					
					if (playerRows.length > 1)
					{
						// DETERMINE BEST VALUE FOR THIS STAT COLUMN
						for (var r = 0 ; r < playerRows.length ; r++)
						{
							thisRow = $(playerRows[r]);
							statCol = $(thisRow.find("td.playertableStat")[h]);
							thisVal = parseFloat(statCol.text());
							if (statCol.text().indexOf("--") == -1)
							{
								if (lowBtr && (bestVal == null || thisVal < bestVal)) bestVal = thisVal;
								if (!lowBtr && (bestVal == null || thisVal > bestVal)) bestVal = thisVal;
							}
						}
						
						// FIND & HIGHLIGHT CELLS THAT MATCH BEST VALUE
						if (bestVal != null)
						{
							for (var r = 0 ; r < playerRows.length ; r++)
							{
								thisRow = $(playerRows[r]);
								statCol = $(thisRow.find("td.playertableStat")[h]);
								thisVal = parseFloat(statCol.text());
								if (statCol.text().indexOf("--") == -1 && thisVal == bestVal) statCol.addClass("bestStat");
							}
						}
						
					}
				}
			});
		}
		
	};

})(jQuery);



var messageFader;
(function($) {

	messageFader = {
	
		defaults: {
			fadeIn: 0,
			fadeOut: 500,
			top: 15,
			left: 15,
			idStr: "messageFader",
			classStr: "messageFader",
			message: "This is a default message; you may wish to consider overriding it.",
			ttl: 2000,
			rebindThickbox: false
		},
		
		show: function(positions, appSettings, messageStr) {

			settings = $.extend(messageFader.defaults, appSettings);
			if (messageStr == null) {
				message = appSettings.message;
			} else {
				message = messageStr;
			}
			elem = messageFader.create(settings, message);
			if (messageFader.existingTimer != null) {
				clearTimeout(messageFader.existingTimer);
				elem.css({left:"-999em"});
				messageFader.existingTimer = null;
			}
			
			if (positions) {
			
				posLeft = positions.x + settings.left;
				posTop  = positions.y + settings.top;
			
				elem.css({top:posTop + "px",left:posLeft + "px"});
				messageFader.existingTimer = setTimeout(function() {
					elem.css({left:"-999em"});
					messageFader.existingTimer = null;
				}, settings.ttl);
			}
		},
		
		create: function(settings, message) {
			messageEl = $("#" + settings.idStr);
			if (messageEl.length == 0) {
				returnEl =  $(document.createElement("div")).attr("id",settings.idStr).addClass(settings.classStr).html(message).appendTo("body");
			} else {
				returnEl = $(messageEl[0]).html(message)
			}
			
			return returnEl;
		}

	}

})(jQuery);


/* end comparePlayers */

/* start flexpop */

/********************  FLEXPOP HOW TO  ********************
Add class="flexpop" to any link, div or image to apply the flexpop code
Add any of the following attributes to customize the flexpop:
	- content: specify the content type ("iframe", "string", "inline", "tabs" or "ajax") followed a '#' and the content.
		iframe example: <a href="" content="iframe#http://www.google.com" class="flexpop">xxx</a>
		string example: <a href="" content="string#Just a simple string!" class="flexpop">xxx</a>
		ajax example: <a href="" content="ajax#/'gc.GAME_ROOT'/test/template_name" class="flexpop">xxx</a>
		inline example: <a href="" content="inline#name_of_div" class="flexpop">xxx</a>
		tabs example: <a href="" content="tabs#ppc">xxx</a> (tabs are built using format.flexpop.tabs())
	- style: 'modal' or 'help' styles
	- modal: set to 'true' to center the flexpop inside a modal overlay
	- alert: set to 'true' to hide nav and, in the case of modal mode, clicking the overlay will not close the popup
	- tab: sets the default selected tab
	- cache: set to 'true' to turn on caching
	- fpopHeight: specified flexpop height, 'auto' by default
	- fpopWidth: specified flexpop width, 'auto' by default
***********************************************************/

// FLEX POPUP
var Flexpop = {};
// FLEXPOP INSTANCES
Flexpop.INSTANCES = [];
// FLEXPOP CONSTANTS
Flexpop.IMG_PATH_ARM = 'http://g.espncdn.com/s/flblm/14/images/popup/';
Flexpop.TAB_HEIGHT = 36;
// ARM CONSTANTS
Flexpop.ORIENTATION_DOWN = 0;
Flexpop.ORIENTATION_UP = 1;
Flexpop.ORIENTATION_LEFT = 0;
Flexpop.ORIENTATION_RIGHT = 1;
Flexpop.ORIENTATION_CENTER = 2;
Flexpop.ARM_HEIGHT = null;
Flexpop.ARM_WIDTH = null;
// IS USER HOVERING ON FLEXPOP
Flexpop.isHover = false;
//IPAD DETECTION
Flexpop.isiPad = navigator.userAgent.match(/iPad/i) != null;

// INIT
Flexpop.init = function(linkInfo, e) {
	jQuery(linkInfo).live(e, function(event) {
		var jqry_this = jQuery(this);

		var fpopOpen = false;
		var pos = jqry_this.offset();
		var posW = jqry_this.width();
		var posH = jqry_this.height();

		var i =  jqry_this.attr("instance") || "_default";
		var clssArray = (jqry_this.attr("class")||"").split(' ');
		for (clss in clssArray) { if (clssArray[clss] == 'fpop_open' + i) { fpopOpen = true; } }

		if (!fpopOpen) {
			if (event.type == 'mouseout') {
				Flexpop.remove(i);
			} else  {
				Flexpop.isHover = true; // KILL HOVER TIMER
				// FLEXPOP SETTINGS
				var a = jqry_this.href || jqry_this.alt;
				// SPLIT CONTENT FROM CONTENT TYPE
				var contentAttr = jqry_this.attr("content") || "";
				var c = contentAttr.substr(contentAttr.indexOf("#") + 1, contentAttr.length);
				var ct = contentAttr.substr(0, contentAttr.indexOf("#")) || 'ajax';
				var o = {
					instance: i,
					content: c,
					contentType: ct,
					style: jqry_this.attr("fpopStyle"),
					modal: jqry_this.attr("modal"),
					alert: jqry_this.attr("alert"),
					tab: jqry_this.attr("tab"),
					cache: jqry_this.attr("cache"),
					fpopHeight: jqry_this.attr("fpopHeight"),
					fpopWidth: jqry_this.attr("fpopWidth"),
					leagueId: jqry_this.attr("leagueId"),
					teamId: jqry_this.attr("teamId"),
					nhllines: jqry_this.attr("nhllines"),
					playerId: jqry_this.attr("playerId"),
					playerIdType: jqry_this.attr("playeridtype"),
					gameRoot: jqry_this.attr("gameroot"),
					xOrient: jqry_this.attr("xorient"),
					omniturePageName: jqry_this.attr("omniturePageName"),
					pos: pos,
					posW: posW,
					posH: posH,
					pageX: event.pageX,
					pageY: event.pageY,
					seasonId: jqry_this.attr("seasonId")
				};
				// REMOVE ANY OPEN FLEXPOP INSTANCES
				if (o.modal == "true") { Flexpop.remove_all(); }
				else { Flexpop.remove(o.instance); }
				// ADD OPEN FLEXPOP INSTANCE
				jqry_this.addClass("fpop_open" + o.instance);
				// SHOW FLEXPOP
				Flexpop.show(o);
			}
		} else {	// CLOSE FLEXPOP INSTANCE IF ALREADY OPEN
			if (event.type == 'mouseout') {	// KEEP FLEXPOP HOVER ISTANCE OPEN WHILE USER IS HOVERING ON THE FLEXPOP WINDOW
				Flexpop.isHover = false;
				jQuery('#fpop_window' + i).hover (
					function() {  Flexpop.isHover = true; },
					function () { Flexpop.remove(i); } );
					setTimeout(function() { if (!Flexpop.isHover) { Flexpop.remove(i); } }, 500);
			} else {
				Flexpop.remove(i);
			}
			return false;
		}
		return false;
	});
}
// DEFAULTS
Flexpop.defaults = function(o) {
	var options = {
		instance: o.instance || "_default",
		content: o.content,
		contentType: o.contentType || "ajax",
		style: o.style || "default",
		modal: o.modal || null,
		alert: o.alert  || null,
		tab: o.tab || 0,
		cache: o.cache || null,
		fpopHeight: o.fpopHeight || "auto",
		fpopWidth: o.fpopWidth || "auto",
		leagueId: o.leagueId || -1,
		teamId: o.teamId || -1,
		nhllines: o.nhllines || null,
		playerId: o.playerId || null,
		playerIdType: o.playerIdType || 'playerId',
		omniturePageName: o.omniturePageName || null,
		host: /^games.+espn(qa)?(\.go)?\.com$/.test(location.hostname) ? location.hostname : 'games.espn.com',
		gameRoot: o.gameRoot || 'flb',
		pos: o.pos || null,
		posW: o.posW || null,
		posH: o.posH || null,
		pageX: o.pageX || null,
		pageY: o.pageY || null,
		xOrient: o.xOrient || null,
		seasonId: o.seasonId || null
	}
	return options;
}
// SHOW
Flexpop.show = function(options) {
	// GET DEFAULT OPTIONS
	o = Flexpop.defaults(options);
	// SET INSTANCE
	Flexpop.instance_set(o.instance);
	// GET CACHED DATA
	cachedData = Flexpop.cache_get(o);
	// CREATE FLEX POP WINDOW
	if (o.modal == "true") { // MODAL
		jQuery("body").append('<div id="fpop_overlay' + o.instance + '" class="fpop_overlay"></div><div id="fpop_window' + o.instance + '" class="fpop_window_modal '+o.gameRoot+'"></div>');
		jQuery("body").css("overflow","hidden");
		if (o.alert != 'true') { jQuery('#fpop_overlay' + o.instance).click(function () { Flexpop.remove_all() }); }
	} else {
		jQuery("body").append('<div id="fpop_window' + o.instance + '" class="fpop_window '+o.gameRoot+'"></div>');
	}
	// DISPLAY CONTENT
	var track = true;
	Flexpop.shell_build(o);
	if (o.contentType == "tabs") {	// TABS
		track = false;
		jQuery('#fpop_content_border' + o.instance).append('<div id="fpop_content' + o.instance + '" class="fpop_content_' + o.style + '" style="width:' + o.fpopWidth + ';height:' + o.fpopHeight + ';"></div>');
		Flexpop.nav_add(o);
		Flexpop.position(o);
		Flexpop.tab_add(o);
		setTimeout(function() {	jQuery('div#fpop_window' + o.instance).show();}, 500); // ALLOW TAB CONTENT TIME TO LOAD
	} else if (o.contentType == "iframe") {	// IFRAME CONTENT
		if (cachedData === undefined) {
			jQuery('#fpop_content_border' + o.instance).append('<div id="fpop_content' + o.instance + '" class="fpop_content_' + o.style + '"><iframe frameborder="no" scorling="no" hspace="0" style="width:' + o.fpopWidth + ';height:' + o.fpopHeight + '; background-color:#FFFFFF;" src="' + o.content + '" id="fpop_iframeContent' + o.instance + '"></iframe>');
			Flexpop.cache_set(o);
		} else {
			jQuery('#fpop_content_border' + o.instance).append('<div id="fpop_content' + o.instance + '" class="fpop_content_' + o.style + '">' + cachedData + '</div>');
		}
		Flexpop.nav_add(o);
		Flexpop.position(o);
		jQuery('div#fpop_window' + o.instance).show();
	} else if (o.contentType == "inline") {	// INLINE CONTENT
		jQuery('#fpop_content_border' + o.instance).append('<div id="fpop_content' + o.instance + '" class="fpop_content_' + o.style + '" style="width:' + o.fpopWidth + ';height:' + o.fpopHeight + ';"></div>');
		Flexpop.nav_add(o)

		if (cachedData === undefined) {
			contentId = "#" + o.content;
			jQuery('#fpop_content' + o.instance).append(jQuery(contentId).children());
			jQuery('#fpop_window' + o.instance).unload(function () {
				jQuery(contentId).append(jQuery('#fpop_content' + o.instance).children());
			});
			Flexpop.cache_set(o);
		} else {
			jQuery('#fpop_content' + o.instance).append(cachedData);
		}

		Flexpop.position(o);
		jQuery('div#fpop_window' + o.instance).show();
	} else if (o.contentType == "string") {	// STRING CONTENT
		jQuery('#fpop_content_border' + o.instance).append('<div id="fpop_content' + o.instance + '" class="fpop_content_' + o.style + '" style="width:' + o.fpopWidth + ';height:' + o.fpopHeight + ';"></div>');
		Flexpop.nav_add(o)

		if (cachedData === undefined) {
			jQuery('#fpop_content' + o.instance).append(o.content);
			Flexpop.cache_set(o);
		} else {
			jQuery('#fpop_content' + o.instance).append(cachedData);
		}
		Flexpop.position(o);
		jQuery('div#fpop_window' + o.instance).show();
	} else {	// AJAX CONTENT
		jQuery('#fpop_content_border' + o.instance).append('<div id="fpop_content' + o.instance + '" class="fpop_content_' + o.style + '" style="width:' + o.fpopWidth + ';height:' + o.fpopHeight + ';"></div>');
		Flexpop.nav_add(o);
		if (cachedData === undefined || cachedData === null) {
			jQuery('#fpop_content' + o.instance).load(o.content,function() {
				Flexpop.position(o);
				jQuery('div#fpop_window' + o.instance).show();
				Flexpop.cache_set(o);
			});
		} else {
			jQuery('#fpop_content' + o.instance).append(cachedData);
			Flexpop.position(o);
			jQuery('div#fpop_window' + o.instance).show();
		}
	}

	// REMOVE
	jQuery('#fpop_closebtn').live('click', function () {
		i = "" + jQuery(this).attr("instance");
		c = "" + jQuery(this).attr("class");

		if (c == "fpop_closebtn_modal") { Flexpop.remove_all(); }
		else { Flexpop.remove(i); }
		return false;
	});

	if (track) {
		Flexpop.tracking(o);
	}

	return false;
}
// REMOVE
Flexpop.remove = function(instance) {
	if (instance === undefined) { instance = "_default"; }

	if (jQuery('div#fpop_overlay' + instance).length != 0) { jQuery("body").css("overflow","auto") };
	jQuery('div#fpop_overlay' + instance).remove();
	jQuery('div#fpop_window' + instance).remove();
	jQuery(".fpop_open" + instance).removeClass("fpop_open" + instance);

	return false;
}
// REMOVE ALL FLEXPOP INSTANCES
Flexpop.remove_all = function() {
	for (var i=0; i < Flexpop.INSTANCES.length; ++i) {
		Flexpop.remove(Flexpop.INSTANCES[i]);
	}
}
// ADD NAV
Flexpop.nav_add = function(o) {
	if (o.alert != 'true') { // DO NOT DISPLAY NAV BAR WHILE IN ALERT MODE
		if (o.style == "modal") {
			jQuery('#fpop_content_border' + o.instance).append('<div id="fpop_nav_modal' + o.instance + '" class="fpop_nav_modal"><a href="#" title="" id="fpop_closebtn" class="fpop_closebtn_modal" instance="' + o.instance + '" style="color:#9C9A9C;">X</a></div>');
		} else if (o.style == "help") {
			// NO HELP NAV
		} else  { // DEFAULT NAV BAR
			// INSERT POP PLAYER CARD AD
			var ad = '';
			if (true && o.instance == '_ppc' && o.fpopWidth == '490px') {
				ad = '<iframe style="float:left;" src="http://'+ o.host  +'/' + o.gameRoot + '/format/adFrame?pageName=playercards&context=&iType=playercardlogo&width=350&height=30&zone=' + o.gameRoot + 'playercards&adSegments=' + espn.core.ad_segments() + '" width="350" height="30" scrolling="no" frameborder="0" marginheight="0" marginwidth="0" allowtransparency="true"></iframe>';
			}
			jQuery('#fpop_content_border' + o.instance).append('<div id="fpop_nav' + o.instance + '" class="fpop_nav">'+ad+'<img width="71" height="20" border="0" title="" alt="CLOSE" src="http://g.espncdn.com/s/flblm/10/images/design07/playerpop/close.gif" id="fpop_closebtn" class="fpop_closebtn" instance="' + o.instance + '"></div>');
		}
	}
}
// ADD ARM
Flexpop.arm_add = function(o, orientation) {
	if (o.style == 'help') {
		imagePath = 'pcArrow_help';
		if(o.xOrient != "right") {
			jQuery('#fpop_window' + o.instance).append('<div id="fpop_arm' + o.instance + '" width="' + Flexpop.ARM_WIDTH + '" height="' + Flexpop.ARM_HEIGHT + '" style="z-index: 2; position: absolute;"></div>');
			jQuery('#fpop_arm' + o.instance).append('<img id="fpop_arm_image' + o.instance + '" width="' + Flexpop.ARM_WIDTH + '" height="' + Flexpop.ARM_HEIGHT + '" src="' + Flexpop.IMG_PATH_ARM + imagePath + '.gif">');
		}
	} else {
		imagePath = 'pcArrow_' + orientation.x;
		jQuery('#fpop_window' + o.instance).append('<div id="fpop_arm' + o.instance + '" width="' + Flexpop.ARM_WIDTH + '" height="' + Flexpop.ARM_HEIGHT + '" style="z-index: 2; position: absolute;"></div>');
		if (orientation.y == Flexpop.ORIENTATION_CENTER) { imagePath = imagePath + Flexpop.ORIENTATION_UP; } else { imagePath = imagePath + orientation.y; }
		jQuery('#fpop_arm' + o.instance).append('<img id="fpop_arm_image' + o.instance + '" width="' + Flexpop.ARM_WIDTH + '" height="' + Flexpop.ARM_HEIGHT + '" src="' + Flexpop.IMG_PATH_ARM + imagePath + '.png">');
	}
}
// SET ARM DIMENSIONS
Flexpop.arm_set_dimensions = function(o) {
	if (o.style == 'help') {
		Flexpop.ARM_HEIGHT = 11;
		Flexpop.ARM_WIDTH = 10;
	} else {
		Flexpop.ARM_HEIGHT = 110;
		Flexpop.ARM_WIDTH = 59;
	}
}
// ADD TABS
Flexpop.tab_add = function(o) {
	// SELECT TAB CONTENT
	var content = '';
	var seasonIdParam = '';
	if(o.seasonId != null) {seasonIdParam = '&seasonId=' + o.seasonId}
	if (o.content == "ppc") {
		content = '<div id="ppc">' +
			'<ul>' +
			'<li class="ui-tabs-nav-li"><table class="fpop_tab_table" cellpadding="0" cellspacing="0"><tr><td class="fpop_tab_left"></td><td class="fpop_tab_center"><a href="http://'+o.host+'/'+o.gameRoot+'/format/playerpop/overview?leagueId=' + o.leagueId + '&playerId=' + o.playerId + '&playerIdType=' + o.playerIdType + seasonIdParam + '">OVERVIEW</a></td></tr></table></li>' +
			'<li class="ui-tabs-nav-li"><table class="fpop_tab_table" cellpadding="0" cellspacing="0"><tr><td class="fpop_tab_left"></td><td class="fpop_tab_center"><a href="http://'+o.host+'/'+o.gameRoot+'/format/playerpop/news?leagueId=' + o.leagueId + '&playerId=' + o.playerId + '&playerIdType=' + o.playerIdType + seasonIdParam + '">NEWS</a></td></tr></table></li>' +
			'<li class="ui-tabs-nav-li"><table class="fpop_tab_table" cellpadding="0" cellspacing="0"><tr><td class="fpop_tab_left"></td><td class="fpop_tab_center"><a href="http://'+o.host+'/'+o.gameRoot+'/format/playerpop/video?leagueId=' + o.leagueId + '&playerId=' + o.playerId + '&playerIdType=' + o.playerIdType + seasonIdParam +'">VIDEO</a></tr></table></li>';
		if (o.leagueId && o.leagueId > 0) {
			content +=
			'<li class="ui-tabs-nav-li"><table class="fpop_tab_table" cellpadding="0" cellspacing="0"><tr><td class="fpop_tab_left"></td><td class="fpop_tab_center" id="fpop_ppc_charts_tab_link"><a href="http://'+o.host+'/'+o.gameRoot+'/format/playerpop/charts?leagueId=' + o.leagueId + '&playerId=' + o.playerId + '&playerIdType=' + o.playerIdType + seasonIdParam +'">CHARTS</a></tr></table></li>' +
			'<li class="ui-tabs-nav-li"><table class="fpop_tab_table" cellpadding="0" cellspacing="0"><tr><td class="fpop_tab_left"></td><td class="fpop_tab_center"><a href="http://'+o.host+'/'+o.gameRoot+'/format/playerpop/transactions?leagueId=' + o.leagueId + '&playerId=' + o.playerId + '&playerIdType=' + o.playerIdType + seasonIdParam + '">TRANSACTIONS</a></td></tr></table></li>';
		}
		if (o.nhllines == "true") {
			content += '<li class="ui-tabs-nav-li"><table class="fpop_tab_table" cellpadding="0" cellspacing="0"><tr><td class="fpop_tab_left"></td><td class="fpop_tab_center"><a href="http://'+o.host+'/'+o.gameRoot+'/format/playerpop/nhllines?playerId=' + o.playerId +'">LINES</a></td></tr></table></li>';		
		}
		content +='</ul></div>';
	}

	// ADD TABS
	jQuery('#fpop_content' + o.instance).append(content);
 	jQuery('#'+o.content).tabs({
 		selected: parseInt(o.tab),
 		cache: o.cache,
 		ajaxOptions: { crossDomain: jQuery.support.cors ? undefined : false }, /* otherwise the request is aborted in IE */
 		show: function(){ Flexpop.tracking(o); }
 	});
	jQuery('#fpop_td_tab' + o.instance).append(jQuery('#ppc > .ui-tabs-nav'));

}
// BUILD SHELL
Flexpop.shell_build = function(o) {
	if (o.style == "modal") {
		jQuery('#fpop_window' + o.instance).append('<div id="fpop_modal_border' + o.instance + '" class="fpop_modal_border"><div id="fpop_content_border' + o.instance + '"></div></div>');
	} else if (o.style == "help") {
		jQuery('#fpop_window' + o.instance).append('<div id="fpop_help_border' + o.instance + '" class="fpop_help_border"><div id="fpop_content_border' + o.instance + '"></div></div>');
	} else {
		tabClass = "fpop_corner_topright_notabs";
		if (o.contentType == "tabs") { tabClass = "fpop_corner_topright_tabs" }; // DO NOT ROUND TOP RIGHT CORNER WHEN USING TABS

		jQuery('#fpop_window' + o.instance).append('<table style="border-collapse: collapse;" cellspacing="0" cellpadding="0">' +
			'<tr><td id="fpop_td_tab' + o.instance + '" colspan="3"></td></tr>' +
			'<tr>' +
			'<td><div class="fpop_corner_topleft"></div></td>' +
			'<td class="fpop_border_top"></td>' +
			'<td><div class="' + tabClass + '"></div></td>' +
			'</tr>' +
			'<tr>' +
			'<td class="fpop_border_left"></td>' +
			'<td><div id="fpop_content_border' + o.instance + '"></div></td>' +
			'<td class="fpop_border_right"></td>' +
			'</tr>' +
			'<tr>' +
			'<td><div class="fpop_corner_bottomleft"></div></td>' +
			'<td class="fpop_border_bottom"></td>' +
			'<td><div class="fpop_corner_bottomright"></div></td>' +
			'</tr>'	+
			'</table>');
	}
}
// GET ORIENTATION
Flexpop.orientation = function(o, positions) {
	if (o.style == 'help') {
		var xOrientation = Flexpop.ORIENTATION_LEFT
		if(o.xOrient == "right") xOrientation = Flexpop.ORIENTATION_RIGHT;
		ao = {y: Flexpop.ORIENTATION_UP, x: xOrientation}
	} else {
		var widthNeeded = jQuery('#fpop_window' + o.instance).width() + Flexpop.ARM_WIDTH + 30;
		var heightNeeded = jQuery('#fpop_window' + o.instance).height();

		if (o.contentType == "tabs") {
			widthNeeded = parseInt(o.fpopWidth) + Flexpop.ARM_WIDTH + 30;
			heightNeeded = parseInt(o.fpopHeight) + Flexpop.TAB_HEIGHT + 50;
		}

		var availableHeight = jQuery(window).height();
		var availableWidth = jQuery(window).width();

		// LEFT | RIGHT
		if (availableWidth - (positions.right - (jQuery(window).scrollLeft() || document.body.scrollLeft)) - widthNeeded > 0) {
			x_orientation = Flexpop.ORIENTATION_LEFT;
		} else if ((positions.left - (jQuery(window).scrollLeft() || document.body.scrollLeft)) > widthNeeded) {
			x_orientation = Flexpop.ORIENTATION_RIGHT;
		} else {
			x_orientation = Flexpop.ORIENTATION_CENTER;
		}
		// UP | DOWN
		if ((positions.top - (jQuery(window).scrollTop() || document.body.scrollTop)) > heightNeeded) {
			y_orientation = Flexpop.ORIENTATION_DOWN;
		} else if (availableHeight - (positions.bottom - (jQuery(window).scrollTop() || document.body.scrollTop)) - heightNeeded > 0) {
			y_orientation = Flexpop.ORIENTATION_UP;
		} else {
			y_orientation = Flexpop.ORIENTATION_CENTER;
		}

		ao = {y: y_orientation, x: x_orientation};
	}
	return ao;
}
// POSITION WINDOW / ARM
Flexpop.position = function(o) {
	if (o.style == 'modal') {
		var h = jQuery('#fpop_window' + o.instance).height() || 0;
		var w = jQuery('#fpop_window' + o.instance).width() || 0;
		jQuery('#fpop_window' + o.instance).css({top: (jQuery(window).height() - h) / 2 + "px", left: ( jQuery(window).width() - w) / 2 + "px"});
	} else {
		var windowX;
		var windowY;
		var armX;
		var armY;

		Flexpop.arm_set_dimensions(o);
		positions = Flexpop.element_position(o);
		orntn = Flexpop.orientation(o, positions);

		// ADD ARM
		Flexpop.arm_add(o, orntn);

		// UP | DOWN
		if (orntn.y == Flexpop.ORIENTATION_DOWN) {
			armY = jQuery('#fpop_window' + o.instance).height() - Flexpop.ARM_HEIGHT;
			windowY = positions.top - jQuery('#fpop_window' + o.instance ).height();
		} else if (orntn.y == Flexpop.ORIENTATION_UP) {
			armY = 0;
			windowY = positions.bottom;
		} else {	// ORIENTATION_CENTER
			windowY = (jQuery(window).scrollTop() || document.body.scrollTop) + ((document.documentElement.clientHeight - jQuery('#fpop_window' + o.instance ).height()) / 2);
			armY = positions.top - windowY;
			if (armY > (document.documentElement.clientHeight / 2)) {
				imagePath = Flexpop.IMG_PATH_ARM + 'pcArrow_' + orntn.x + Flexpop.ORIENTATION_DOWN + '.png';
				jQuery('#fpop_arm_image' + o.instance).attr('src', imagePath);
				armY = armY - Flexpop.ARM_HEIGHT;
			}
		}
		// LEFT | RIGHT
		if (orntn.x == Flexpop.ORIENTATION_LEFT) {
			armX = (-1 * Flexpop.ARM_WIDTH) + 2;
			windowX = positions.right + Flexpop.ARM_WIDTH;
		} else if (orntn.x == Flexpop.ORIENTATION_RIGHT) {
			armX = jQuery('#fpop_window' + o.instance).width() - 10;
			windowX = positions.left - (jQuery('#fpop_window' + o.instance).width() + Flexpop.ARM_WIDTH - 10);
		} else {	// ORIENTATION_CENTER
			windowX = 0;
		}

		// POSITION WINDOW
		jQuery('#fpop_window' + o.instance).css({ top: windowY +'px', left: windowX +'px' })
		// POSITION ARM
		if (o.style == 'help') {
			jQuery('#fpop_arm' + o.instance).css({ top: '-4px', left: '-4px' });
		} else {	// DEFAULT
			if (armX == null) { jQuery('#fpop_arm' + o.instance).css({ display: 'none' }); }
			else { jQuery('#fpop_arm' + o.instance).css({ top: armY +'px', left: armX +'px' }); }
		}
	}
}
// GET ELEMENT POSITION
Flexpop.element_position = function(o) {
	// SPECIAL POSITIONING FOR iPad and COMPARE PLAYERS
	if (Flexpop.isiPad) {
		var elementLeft = o.pos.left;
		var elementRight = o.pos.left + o.posW;
		var elementTop = o.pageY;
		var elementBottom = o.pageY;
	} else if (jQuery('#comparePlayersTable').length != 0) {
		var elementLeft = o.pageX;
		var elementRight = o.pageX;
		var elementTop = o.pageY;
		var elementBottom = o.pageY;
	} else {
		var elementLeft = o.pos.left;
		var elementRight = o.pos.left + o.posW;
		var elementTop = o.pos.top;
		var elementBottom = o.pos.top + o.posH;
	}
	ePos = {left: elementLeft, right: elementRight, top: elementTop, bottom: elementBottom };
	return ePos;
}
// GET CACHED DATA
Flexpop.cache_get = function(o) {
	if (o.cache == "true") {
		return jQuery("body").data(o.content);
	} else { return undefined; }
}
// SET CACHED DATA
Flexpop.cache_set = function(o) {
	if (o.cache == "true") {
		jQuery("body").data(o.content, jQuery('#fpop_content' + o.instance).html());
	} else { return undefined; }
}
// SET INSTANCE
Flexpop.instance_set = function(instance) {
	var newInstance = true;
	for (var i=0; i < Flexpop.INSTANCES.length; ++i) {
		if (Flexpop.INSTANCES[i] == instance) {
			newInstance = false;
		}
	}
	if (newInstance) {
		Flexpop.INSTANCES.push(instance);
	}
}
// PAGE TRACKING
Flexpop.tracking = function(o) {
	if (!window.anTrackPageView) {
		return false;
	}
	var pageName = o.instance;
	if (pageName == "_default") {
		/* don't bother tracking what we won't be able to disambiguate */
		return false;
	}
	if (o.contentType == "tabs") {
		var tabId = "#" + o.content;
		var selected = jQuery(tabId).tabs('option', 'selected') + 1;
		pageName = pageName + '-' + jQuery('.ui-tabs-selected a').html();
	}
	var anExec;
	var anSiteSection = 'fantasy';
	var anContentSection = 'fantasy';
	var anContentSubSubSection = 'flb';
	var anContentSubSection = 'baseball';
	var anContentType = 'flexpop'
	var anLeafPageName = 'flexpop-' + pageName;
	
	if (o.omniturePageName != null) {
		anLeafPageName = o.omniturePageName;
	}
	
	var anStoryId = null;
	anTrackPageView(anExec,anSiteSection,anContentSection,anContentSubSection,anContentSubSubSection,anContentType,anLeafPageName,anStoryId);
}

Flexpop.isShowing = function(instance) {
	if (!instance) { instance = "_default"; }
	return jQuery("#fpop_window"+instance).is(":visible");
};

jQuery(document).ready(function(){
	Ppc.addToOldSchoolLinks();
	Ppc.escClose();
	Flexpop.init('.flexpop', 'click');
	Flexpop.init('.flexpop_hover', 'mouseover mouseout');
});
/* end flexpop */

/* start ppc */

// POP PLAYER CARD
var Ppc = {};
// ESC KEY CLOSE
Ppc.escClose = function() {
	jQuery(document).keypress(function(e) {
		 var key = e.keyCode || e.wich;
		 if (key && (key == 27)) { Flexpop.remove("_ppc"); }
	});
}
// TOGGLE GAME LOG STATS
Ppc.toggleStatsView = function(name, vCurrent, vNext) {
	var current = '#moreStatsView' + vCurrent;
	var next = '#moreStatsView' + vNext;
	jQuery(current).css({ display: 'none'});
	jQuery(next).css({ display: 'block'});
}
// CHARTS STAT NAV
Ppc.chartsStatNav = function(backForward, incomingTop) {

	var lineHeight = 28; /* DEFAULT LINE HEIGHT */
	var divHeight = jQuery("#chart-nav-stats").height();
	var currentTop = jQuery("#chart-nav-stats").position().top;

	/* PAGINATE TO SELECTED STAT ROW */
	if (incomingTop != null) { currentTop = incomingTop; }

	if (backForward == "backward" && currentTop + lineHeight <= 0) {
		var newTop = currentTop + lineHeight;
	} else if (backForward == "forward" && (currentTop - lineHeight)*-1 < divHeight) {
		var newTop = currentTop - lineHeight; }
	else {
		var newTop = currentTop;
	}

	jQuery("#chart-nav-stats").css({ top: newTop+'px' });

	/* HIDE SHOW NAV ARROWS */
	var lArrowDisplay = "visible";
	var rArrowDisplay = "visible";

	if (newTop == 0) { lArrowDisplay = "hidden"; }
	if ((newTop * -1) + lineHeight >= divHeight) { rArrowDisplay = "hidden"; }

	jQuery("#chart-nav-left-arrow").css({ visibility: lArrowDisplay });
	jQuery("#chart-nav-right-arrow").css({ visibility: rArrowDisplay });

}
// RENDER CHART
Ppc.renderContentCharts = function(options) {
	var url = 'http://'+o.host+'/'+o.gameRoot+'/format/playerpop/charts';

	// BUILD CHART PARAM
	var pars = 'playerId=' + options.playerId + '&playerIdType=' + options.playerIdType;
	if (options.leagueId > 0) { pars += '&leagueId=' + options.leagueId + '&teamId=' + options.teamId; }
	if (options.seasonId > 0) { pars += '&seasonId=' + options.seasonId; }
	if (options && options.statId != null) { pars += '&statId=' + options.statId }
	if (options && options.addlPlayerIds) { pars += '&addlPlayerIds=' + options.addlPlayerIds }
	if (options && options.chartSplitType) { pars += '&chartSplitType=' + options.chartSplitType }
	if (options.statDivTop != null) { pars += '&statDivTop=' + options.statDivTop; }
	else if (jQuery("#chart-nav-stats") != null) { pars += '&statDivTop=' + jQuery("#chart-nav-stats").position().top; }

	// CALL TAB WITH NEW PARAMS
	var tabs = jQuery('#ppc').tabs();
	tabs.tabs( 'url', 3, url + "?" + pars);
	tabs.tabs('load', 3);
}
// RENDER VIDEO
Ppc.renderContentVideo = function(options) {
	var url = 'http://'+o.host+'/'+o.gameRoot+'/format/playerpop/video';

	// BUILD VIDEO PARAM
	if (options.navDivTop != null) { navDivTop = options.navDivTop; } else { navDivTop = jQuery("#pcVideoNavItems").position().top; }
	var pars = 'playerId=' + options.playerId + '&playerIdType=' + options.playerIdType + '&videoId=' + options.videoId + '&navDivTop=' + navDivTop;
	if (options.leagueId != undefined) {
		pars = pars + '&leagueId=' + options.leagueId;
	}
	// CALL TAB WITH NEW PARAMS
	var tabs = jQuery('#ppc').tabs();
	tabs.tabs('select', 2);
	tabs.tabs('url', 2, url + "?" + pars);
	tabs.tabs('load', 2);
}
// VIDEO NAV
Ppc.videoNav = function(upDown, incomingTop) {
	var lineHeight = 24;
	var divHeight = jQuery("#pcVideoNavItems").height();
	var currentTop = jQuery("#pcVideoNavItems").position().top;

	// PAGINATE TO SELECTED STAT ROW
	if (incomingTop != null) { currentTop = incomingTop; }

	if (upDown == "up" && currentTop + lineHeight <= 0) {
		var newTop = currentTop + lineHeight;
	} else if (upDown == "down" && (currentTop - lineHeight)*-1 < divHeight) {
		var newTop = currentTop - lineHeight;
	} else {
		var newTop = currentTop;
	}
	jQuery("#pcVideoNavItems").css({ top: newTop+'px' });

	// HIDE SHOW NAV ARROWS
	var upArrowDisplay = "visible";
	var downArrowDisplay = "visible";
	if (newTop == 0) { upArrowDisplay = "hidden"; }
	if ((newTop * -1) + (lineHeight*2) >= divHeight) { downArrowDisplay = "hidden"; }
	jQuery("#videoNavUp").css({ visibility: upArrowDisplay });
	jQuery("#videoNavDown").css({ visibility: downArrowDisplay });
}
// RENDER NEWS
Ppc.renderContentNews = function(options) {
	var url = 'http://'+o.host+'/'+o.gameRoot+'/format/playerpop/news';

	// BUILD NEWS PARAM
	var pars = 'playerId=' + options.playerId + '&playerIdType=' + options.playerIdType + '&videoId=' + options.videoId;
	if (options.leagueId != undefined) {
		pars = pars + '&leagueId=' + options.leagueId;
	}
	// CALL TAB WITH NEW PARAMS
	var tabs = jQuery('#ppc').tabs();
	tabs.tabs('select', 1);
	tabs.tabs('url', 1, url + "?" + pars);
	tabs.tabs('load', 1);
}
// OLD SCHOOL LINKS
Ppc.addToOldSchoolLinks = function() {
	var gameRoots = {};
	gameRoots['mlb'] = 'flb';
	gameRoots['nfl'] = 'ffl';
	gameRoots['nba'] = 'fba';
	gameRoots['nhl'] = 'fhl';

	var pattern = /http:\/\/.*espn\.go\.com\/(mlb|nfl|nba|nhl)\/players?\/.*(statsId|playerId|tickerId|id)(?:=|\/)([0-9]+)/;

	var numInserted = 0;
	var anchorTags = document.getElementsByTagName('a');
	for(var i=anchorTags.length-1; i>-1; --i) {
		if (anchorTags[i].href) {
			var matches = anchorTags[i].href.match(pattern);
			if (matches && matches.length > 3) {
				var gameRoot = gameRoots[matches[1]];
				var playerIdType = matches[2];
				var playerId = matches[3];

				if (playerIdType == 'playerId' || playerIdType == 'id') {
					playerIdType = 'sportsId';
				}

				if (gameRoot) {
					jQuery(anchorTags[i]).attr({
						'class': 'flexpop',
						'instance': '_ppc',
						'playerid': playerId,
						'playeridtype': playerIdType,
						'gameroot': gameRoot,
						'content': 'tabs#ppc',
						'tab': 'null',
						'fpopwidth': '490px',
						'fpopheight': '357px',
						'cache': 'true'
					});
					++numInserted;
				}
			}
		}
	}
	return numInserted;
}

/* TOGGLE TABS ON OVERVIEW PAGE */
Ppc.toggleTabs = function(index) {
	jQuery('#overviewTabsHeader td').removeClass('selected');
	jQuery('#overviewTabsHeader #tabItem' + index).addClass('selected');

	jQuery('#overviewTabs div.tabView').css({ display: 'none'});
	jQuery('#overviewTabs #tabView' + index).css({ display: 'block'});
}
/* end ppc */

/* start createSubmitForm */


function createSubmitForm(formAction) {
	var formTag = document.createElement("form");
	formTag.method = "post";
	formTag.action = formAction;
	document.body.appendChild(formTag);
	formTag.submit();
}
/* end createSubmitForm */

/* start showLogin */


function ensureHighTrustBeforeProceeding(action) {	
	var callback = null;
	if (typeof action === 'function') {
		callback = action;
	} else if (action.nodeName === 'FORM') {
		if (action.getAttribute('data-high-trust') === 'ensured') {
			return true;
		}
		callback = function() {
			action.setAttribute('data-high-trust', 'ensured');
			action.submit();
		};
	}
	try {
		espn.memberservices.ensureHighTrust(callback);
	} catch (e) {
		setTimeout(callback, 10);
	}
	return false;
}

function showLogin(onComplete) {
	if (!Flexpop) { return false; }
	
	var hashBeacon = 'loginSuccess',
		flexpopInstance = 'login',
		interval = 100;
	
	Flexpop.show({
		contentType: "iframe",
		content: "http://www.espn.com/login/?appRedirect="+encodeURIComponent(window.location.href.split('#')[0]+'#'+hashBeacon),
		modal: "true",
		style: "modal",
		instance: flexpopInstance,
		fpopWidth: "785px",
		fpopHeight: "250px"
	});
	
	window.setTimeout(function(){
		if (window.location.hash == '#'+hashBeacon) {
			com.espn.games.userLoggedIn = true;
			Flexpop.remove(flexpopInstance);
			if (onComplete) {
				onComplete(true);
			}
		} else if (!Flexpop.isShowing(flexpopInstance)) {
			if (onComplete) {
				onComplete(false);
			}
		} else {
			window.setTimeout(arguments.callee, interval);
		}
	}, interval);
}
/* end showLogin */
