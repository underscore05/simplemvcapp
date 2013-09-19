if(!Richard){
	var Richard = {};
}

/*var AjaxTableHistory = {
	currentTable: null,
	onPopState: function(e){
		var state = e.state;
    	if(state){
    		console.log(state.tableUrl);
			Richard.AjaxTableHistory.currentTable.refresh(state.tableUrl);
    	}
    }
};
window.onpopstate =  AjaxTableHistory.onPopState;
*/
Richard.AjaxTable = new Class({
	Implements: [Options, Events],
	Binds: ['onPageLoaded', 'onHeaderClick', 'onPagerClick', 'onRowClick', 'onSelectAll', 'onSearch'],
	options : {
        autostart : true,
        loadInto: 'main'
    },
    initialize : function (options){
		this.setOptions(options);
		if (this.options.autostart)
            window.addEvent('load', this.onPageLoaded);
    },
	onPageLoaded: function(){
		var self = this;
		this.table = $(this.options.table);
		this.table.addEvent('click:relay(thead input.check_all)', this.onSelectAll);
		this.table.addEvent('click:relay(thead a)', this.onHeaderClick)
		this.table.addEvent('click:relay(tbody tr)', this.onRowClick);
		this.table.addEvent('click:relay(tfoot a)', this.onPagerClick);

		// 2012-11-01
		this.table.addEvent('click:relay(tbody td)', this.onRowClick);

		/* 2012-11-20
			Why commented out? This code is for pager that is not inside the table element.
			If the table class is "partsTable" then its pager should be "partsTablePager" - richard
		*/
		// commented 2012-11-01
		if($$('.'+self.options.table+'Pager').length!=0){
			$$('.'+self.options.table+'Pager').addEvent('click:relay(a)', this.onPagerClick);
		}

		$$('#'+self.options.table+'Container input.export2excelBtn').addEvent('click', function(){
			var noneChecked = true;
			var chks = $$('table#'+self.options.table+' tbody input[type="checkbox"]');
			chks.each(function(elem, k, v){
				if(elem.checked==true) noneChecked = false;
			});
			if(noneChecked) alert('Please select at least 1 item to be exported to Excel');
			return !noneChecked;
		});

		if(this.options.searchForm && $$('form.'+this.options.searchForm)){
			$searchForm = $$('form.'+this.options.searchForm);
			Array.each($searchForm, function(item, index, obj){
				if(!item.hasClass('withSearch')){
					item.addClass('withSearch')
					item.addEvent('submit', self.onSearch);
				}
			});
		}

		var jserr = $('jsErr');
		if(!jserr.hasClass('used')){
			jserr.addClass('used');
			jserr.setStyle('display','none');
			if($('jsErr').innerText)
				var err = $('jsErr').innerText.trim();
			else if($('jsErr').textContent)
				var err = $('jsErr').textContent.trim();

			if(err)
				alert(err);
		}

		//AjaxTableHistory.currentTable = self;
		//if(history.pushState) history.pushState({tableUrl:this.table.get('data-url')}, null, this.table.get('data-url'));
	},
	onSearch: function(event, target){
		var f = event.target;
		event.preventDefault();
		var setFilter = '&filter_set=true';
		var action = f.get('action');
		if(this.cancel==true) setFilter = '&filter_reset=true';
		var d = f.toQueryString() + setFilter;
		new Request.HTML({
			url: action,
			update:$(this.options.loadInto)
		}).send(d);
	},
	onHeaderClick: function(event, target){
		var a = target;
		if(a.get('follow')!='true'){
			event.preventDefault();
			if(!a.get('href')) return;
			new Request.HTML({
				url:a.get('href'),
				update:$(this.options.loadInto)
			}).send();
		}
	},
	onPagerClick: function(event, target){
		var a = target;
		if(a.get('follow')!='true'){
			event.preventDefault();
			new Request.HTML({
				url:a.get('href'),
				update:$(this.options.loadInto)
			}).send();
		}
	},
	onRowClick: function(event, target){
		var tr = target;
		if(event.target.tagName=='INPUT'){
			event.stopPropagation();
		}
		else if(event.target.tagName=='A'){
			event.stopPropagation();
		}
		else{
			var url = '';
			if(url=tr.get('data-url'))
				window.location.href=url;
		}
	},
	onSelectAll: function(event, target){
		var inp = target;
		var checked = inp.checked;
		$$('table#'+this.options.table+' tbody input[type=checkbox]').each(function(elem){
			elem.checked = checked;
			elem.addEvent('click', function(){
				inp.checked = false;
			});
		});
	},
	refresh: function(state_url){
		var self = this;
		if(!state_url) state_url = self.table.get('data-url');

		new Request.HTML({
			url: state_url,
			update:$(this.options.loadInto)
		}).send();
	}
});