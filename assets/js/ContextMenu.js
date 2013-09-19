/**
	script: ContextMenu.js
	name: ContextMenu
	description: Class that converts anchor tags inside the target element into a ContextMenu
	license: MIT-style license
	requires:
		- Core/MooTools
		- Core/More	
		- Bootstrap.css

	Known limitations: 
		- Doesn't work with nested element with nested Context menu
*/
var ContextMenu = new Class({
	Implements: [Events, Options],
	Binds: ["show", "hide"],
	initialize: function(context, options) {
		var self = this;
		self.setOptions(options);               
		self.context = context;
		self.context.getElements('.actions').setStyle('display', 'none');               
		var evt = 'contextmenu' + (options.target?':relay('+options.target+')':'');
		self.context.addEvent(evt, self.show);
		document.body.addEvent('click', self.hide);
	},
	show: function(evt, elem) {		
		document.body.fireEvent('click'); //Firing click will close other existing instances of ContextMenu
		evt.stop();
		var self = this;
		
		if(!elem) {
			elem = self.context;
		}
		
		var actions = elem.getElements('.actions a');
		//Get previous siblings and attach itself to it.
		elem.getElement('.actions !~').adopt(self); 
		self.menuList.empty();
		actions.each(function(a) {
			var li = new Element('li');               
			li.adopt(a.clone());
			self.menuList.adopt(li);
		});
		self.container.setStyle('opacity', 0);
		self.container.setPosition(evt.page);
		self.container.fade('in');		
		self.fireEvent('show', [evt, elem]);
	},
	hide: function(e) {
		console.log(e);
		var self = this;		
		if(self.container) {
			self.container.fade("out");
		}		
	},
	toElement: function() {
		var self = this;
		if(!self.container){
			self.container = new Element('div.dropdown', {'styles':{'position':'absolute'}});
			self.menuList = new Element('ul.dropdown-menu', {'styles':{'display':'block'}});
			self.container.adopt(self.menuList);
			self.container.get('tween').options.duration = 60;
		}
		return this.container;
	}
});