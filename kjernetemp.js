/*
* TODO:
* - handle screen rotation
* - add styling
*/
var screenWidth;
var currentScreen = 0;
var scrollSpeed = 200;
var headerHistory = ["Velg kjøtt"];

var data = [
	{
		"name": "Svin",
		"children": [
			{ 
				"name": "Kotelett", 
				"children": [{ "name": "rare", "description": "x grader" }]
			}, 
			{ 
				"name": "Svinesteik", 
				"children": [
				{ 
					"name": "rare", 
					"description": "50-55 grader" 
				}, 
				{ 
					"name": "medium",
					"description": "57-60 grader" 
				}, 
				{ 
					"name": "well done",
					"description": "61-67 grader" 
				}]
			}
		]
	},
	{
		"name": "Lam",
		"children": [{ "name": "Lammesteik", "children": [{ "name": "rare", "description": "x grader" }] }, { "name": "Lammekotelett", "children": [{ "name": "rare", "description": "x grader" }] }]
	},
	{
		"name": "Test 1",
		"children": [{ "name": "Test 1-1", "children": [{ "name": "rare", "description": "x grader" }] }, { "name": "Test 1-2", "children": [{ "name": "rare", "description": "x grader" }] }]
	},
	{
		"name": "Test 2",
		"children": [{ "name": "Test 2-1", "children": [{ "name": "rare", "description": "x grader" }] }, { "name": "Test 2-2", "children": [{ "name": "rare", "description": "x grader" }] }]
	},
	{
		"name": "Test 3",
		"children": [{ "name": "Test 3-1", "children": [{ "name": "rare", "description": "x grader" }] }, { "name": "Test 3-2", "children": [{ "name": "rare", "description": "x grader" }] }]
	},
	{
		"name": "Test 4",
		"children": [{ "name": "Test 4-1", "children": [{ "name": "rare", "description": "x grader" }] }, { "name": "Test 4-2", "children": [{ "name": "rare", "description": "x grader" }] }]
	},
	{
		"name": "Test 5",
		"children": [{ "name": "Test 5-1", "children": [{ "name": "rare", "description": "x grader" }] }, { "name": "Test 5-2", "children": [{ "name": "rare", "description": "x grader" }] }]
	},
	{
		"name": "Test 6",
		"children": [{ "name": "Test 6-1", "children": [{ "name": "rare", "description": "x grader" }] }, { "name": "Test 6-2", "children": [{ "name": "rare", "description": "x grader" }] }]
	},
	{
		"name": "Test 7",
		"children": [{ "name": "Test 7-1", "children": [{ "name": "rare", "description": "x grader" }] }, { "name": "Test 7-2", "children": [{ "name": "rare", "description": "x grader" }] }]
	},
	{
		"name": "Test 8",
		"children": [{ "name": "Test 8-1", "children": [{ "name": "rare", "description": "x grader" }] }, { "name": "Test 8-2", "children": [{ "name": "rare", "description": "x grader" }] }]
	},		
	{
		"name": "Test 9",
		"children": [{ "name": "Test 9-1", "children": [{ "name": "rare", "description": "x grader" }] }, { "name": "Test 9-2", "children": [{ "name": "rare", "description": "x grader" }] }]
	},
	{
		"name": "Test 10",
		"children": [{ "name": "Test 10-1", "children": [{ "name": "rare", "description": "x grader" }] }, { "name": "Test 10-2", "children": [{ "name": "rare", "description": "x grader" }] }]
	},
	{
		"name": "Test 11",
		"children": [{ "name": "Test 11-1", "children": [{ "name": "rare", "description": "x grader" }] }, { "name": "Test 11-2", "children": [{ "name": "rare", "description": "x grader" }] }]
	},
	{
		"name": "Test 12",
		"children": [{ "name": "Test 12-1", "children": [{ "name": "rare", "description": "x grader" }] }, { "name": "Test 12-2", "children": [{ "name": "rare", "description": "x grader" }] }]
	},
	{
		"name": "Test 13",
		"children": [{ "name": "Test 13-1", "children": [{ "name": "rare", "description": "x grader" }] }, { "name": "Test 13-2", "children": [{ "name": "rare", "description": "x grader" }] }]
	},
	{
		"name": "Test 14",
		"children": [{ "name": "Test 14-1", "children": [{ "name": "rare", "description": "x grader" }] }, { "name": "Test 14-2", "children": [{ "name": "rare", "description": "x grader" }] }]
	},
	{
		"name": "Test nederste trenode",
		"children": [{ "name": "Test nederst-1", "children": [{ "name": "rare", "description": "x grader" }] }, { "name": "Test nederst-2", "children": [{ "name": "rare", "description": "x grader" }] }]
	}
];

function Kjernetemp()
{
	var me = this;
	var scrollPane = me.getScrollPane();
	me.setupTabButtons();
	
	
	var $firstView = document.createElement("div");
	$firstView.classList.add("card");
	$firstView.style.width = screenWidth;
	me.fillView($firstView, data);
	
	var $backButton = document.getElementById("backButton");
	$backButton.style.display = "none";
	var backButtonClickFn = function (event)
	{
		event.preventDefault();
		me.scrollPrev();
	};
	$backButton.addEventListener("click", backButtonClickFn, false);
	$backButton.addEventListener("touchend", backButtonClickFn, false);
	me.setHeaderName();
	
	scrollPane.style.width = screenWidth;
	scrollPane.appendChild($firstView);
};

Kjernetemp.prototype.setupTabButtons = function()
{
	var me = this;
	// default active button is temperatureButton
	var $temperatureButton = document.getElementById("temperatureButton");
	var $contactButton = document.getElementById("contactButton");
	
	$temperatureButton.classList.add("activeTabButton");
	
	var onTemperatureButtonClick = function(event)
	{
		event.preventDefault();
		document.getElementById("temperatureTree").style.display = "block";
		document.getElementById("contact").style.display = "none";
		$temperatureButton.classList.add("activeTabButton");
		$contactButton.classList.remove("activeTabButton");
	};
	$temperatureButton.addEventListener("click", onTemperatureButtonClick, false);
	$temperatureButton.addEventListener("touchend", onTemperatureButtonClick, false);
	
	var onContactButtonClick = function(event)
	{
		event.preventDefault();
		document.getElementById("temperatureTree").style.display = "none";
		document.getElementById("contact").style.display = "block";
		$temperatureButton.classList.remove("activeTabButton");
		$contactButton.classList.add("activeTabButton");
	};
	$contactButton.addEventListener("click", onContactButtonClick, false);
	$contactButton.addEventListener("touchend", onContactButtonClick, false);
};

Kjernetemp.prototype.fillView = function(view, viewData)
{
	var me = this;
	for(var i = 0; i < viewData.length; i++)
	{
		var listObject = document.createElement("div");
		listObject.classList.add("listObject");
		var listObjectName = document.createElement("div");
		listObjectName.classList.add("listObjectName");
		listObjectName.innerHTML = viewData[i].name;
		listObject.appendChild(listObjectName);
		
		if(viewData[i].description)
		{
			var listObjectDescription = document.createElement("div");
			listObjectDescription.innerHTML = viewData[i].description
			listObject.appendChild(listObjectDescription);
		}
		
		listObjectClickFn = function(event)
		{
			event.preventDefault();
			var treePath = event.currentTarget.getAttribute("treePath");
			var scrollPane = me.getScrollPane();
			var $newCard = document.createElement("div");
			me.fillView($newCard, viewData[treePath].children);
			$newCard.style.width = screenWidth + "px";
			$newCard.classList.add("card");
			
			headerHistory.push(viewData[treePath].name);
			me.setHeaderName();
			
			scrollPane.appendChild($newCard);
			scrollPane.style.width = scrollPane.clientWidth + screenWidth + "px";
			
			setTimeout(function() { me.scrollNext(); }, 10); // TODO: better fix for this!!!
		};
		
		listObject.setAttribute("treePath", i);
		if(viewData[i].children)
		{
			listObject.addEventListener("click", listObjectClickFn, false);
			listObject.addEventListener("touchend", listObjectClickFn, false);
			var listObjectArrow = document.createElement("div");
			listObjectArrow.innerHTML = ">";
			listObjectArrow.classList.add("listObjectArrow");
			listObject.appendChild(listObjectArrow);
		}
		view.appendChild(listObject);
	} 
};

Kjernetemp.prototype.setHeaderName = function()
{
	var headerNameEl = document.getElementById("headerName");
	headerNameEl.innerHTML = headerHistory[headerHistory.length - 1];
};

Kjernetemp.prototype.getScrollPane = function()
{
	return document.getElementById("scrollpane");
};

Kjernetemp.prototype.scrollNext = function()
{
	var me = this;
	currentScreen += 1;
	document.getElementById("backButton").style.display = "";
	me.doScroll();
	setTimeout(function() {
		me.getScrollPane().style.transition = "";
	}, scrollSpeed);
};

Kjernetemp.prototype.scrollPrev = function()
{
	var me = this;
	currentScreen -= 1;
	if(currentScreen === 0)
		document.getElementById("backButton").style.display = "none";
	
	me.doScroll();
	headerHistory.pop();
	me.setHeaderName();
	setTimeout(function() {
		me.getScrollPane().style.width = me.getScrollPane().clientWidth - screenWidth + "px";
		me.getScrollPane().removeChild(me.getScrollPane().lastChild);
		me.getScrollPane().style.transition = "";
	}, scrollSpeed); // TODO: better fix for removing last child.
};

Kjernetemp.prototype.doScroll = function()
{
	var me = this;
	me.getScrollPane().style.transition = scrollSpeed + "ms"; // enable animation of card movement.
	me.getScrollPane().style.right = screenWidth * currentScreen;
};
/*
// for testing. Replace by swipe motions
document.addEventListener("keydown", function(e)
{
	e = e || window.event;
	
	if(e.keyCode === 37) //left
		kjernetempGlobal.scrollPrev();
}, false);
*/
window.onload = function () 
{
	screenWidth = document.getElementById("temperatureTree").clientWidth;
	kjernetempGlobal = new Kjernetemp();
};