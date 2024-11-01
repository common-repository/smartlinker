/**
 * 
 * @Plugin Name: Smartlinker
 * @author: Rakesh Sharma
 * 
 */

/* Import plugin specific language pack */


var plugin_url='../wp-content/plugins/smartlinker/tinymce';
var plugin_phpdir='../wp-content/plugins/smartlinker';
var TinyMCE_SmartlinkerPluginv25 = '';
if (typeof(tinymce)!="undefined")
{
		// WordPress 2.5+ & TinyMCE 3

		( function() {	
			var Event = tinymce.dom.Event, each = tinymce.each, DOM = tinymce.DOM;
        tinymce.create('tinymce.plugins.TinyMCE_SmartlinkerPlugin', {
		_inputHTML: "",
		_tb: "",
		_data: "",
		_menu: "",
		_e: "",
		_current_category_id: 0,
		_current_linkoption_id: 0,
		_category: [ "Auto Hyperlink",  "Architecture", "Art & Sculpture", "Astronomy & Space Science", "Business", "Chemistry", "Education & Literature", 
			"Geography & Earth Science", "History, Politics & Law", "Mathematics & Physics", "Movies, TV & Theatre",
			"Music", "Plants & Animals", "Religion & Philosophy", "Sports & Hobbies", "Technology"],
		_categorycode: ["ALL", "CAR", "CA", "STA", "B", "STC", "CEL", "G", "LP", "STM", "EMO", "EMU", "N", "R", "S", "STT", "C"],
		_linkoptions: ['Open link in same window', 'Open link in new window'],
		_openinnewwindowcode:['N', 'Y'],	
		
		/*display_url: 0,
		ie5: "",
		ns6: "",
		menuobj: "",*/

            getInfo:function() {
                return { longname:'Smartlinker', author:'Rakesh Sharma', authorurl:'http://www.inetlinker.com/aboutus.html', infourl:'http://www.inetlinker.com/tools.html#whatissmartlinkerforwordpress', version:'2.0' };
            },
            init:function(ed,url) {
				
				//TinyMCE_SmartlinkerPluginv25.ie5 = document.all&&document.getElementById;
				//TinyMCE_SmartlinkerPluginv25.ns6 = document.getElementById&&!document.all;

				var DOM = tinymce.DOM;

				DOM.loadCSS(plugin_url + '/css/inetlinkerStyles.css');

				if (tinymce.isGecko)
				{				
					tinymce.create('tinymce.smartlinker.SmartlinkerEditClass', 
					{
						EditClass : function(id, s) {
							this.parent(id, s);
							this.classPrefix = 'mceSmartlinkerEditClass';
						},

						renderHTML : function() {
							return "<span id=\"smartlinkerautocomplete\"><input id=\"terminput\" name=\"text1\"  type=\"text\"  onblur=\"TinyMCE_SmartlinkerPluginv25.hs_q1(this,false)\" onfocus=\"TinyMCE_SmartlinkerPluginv25.hs_q1(this,true)\" style=\"width:100px; height:23px; padding: 3px 0px 0px 0px; vertical-align:text-bottom;border: 1px solid #404040; \" alt=\"Check for word in database\" value=\"Check for word\"><div id=\"sresults\"></div> </span>";
						},

						postRender : function() {}


					}
					);
				}
				else
				{
					
					tinymce.create('tinymce.smartlinker.SmartlinkerEditClass', 
					{
						EditClass : function(id, s) {
							this.parent(id, s);							
							this.classPrefix = 'mceSmartlinkerEditClass';
						},

						renderHTML : function() {
							return "<span id=\"smartlinkerautocomplete\"><input id=\"terminput\" name=\"text1\"  type=\"text\"  onblur=\"TinyMCE_SmartlinkerPluginv25.hs_q1(this,false)\" onfocus=\"TinyMCE_SmartlinkerPluginv25.hs_q1(this,true)\" style=\"width:100px; height:19px;  vertical-align:middle;font-family: Arial; font-size: 8.9pt; padding: 3px 0px 0px 0px; vertical-align:text-bottom;border:1px;border-style: solid; border-color: #404040; \" value=\"Check for word\"><div id=\"sresults\"></div> </span>";
						},

						postRender : function() { if (ACJson.oAutoComp == null) ACJson.init();}


					}
					);
				}

			

/////////////////// new code

			var t = this;

			t.editor = ed;
			t.onContextMenu = new tinymce.util.Dispatcher(this);

			ed.onContextMenu.add(function(ed, e) {
				if (!e.ctrlKey) {
				

					t._process(ed, e); 
					
					//t._getMenu(ed).showMenu(e.clientX, e.clientY);
					
					Event.add(ed.getDoc(), 'click', hide);
					Event.cancel(e);
				}
			});

			function hide() {
				
				if (t._menu) {
					t._menu.removeAll();
					t._menu.destroy();
					Event.remove(ed.getDoc(), 'click', hide);
				}
				
			};

			ed.onMouseDown.add(hide);
			ed.onKeyDown.add(hide);


				/*if (tinymce.isGecko)
				{		
					
					tinymce.create('tinymce.smartlinker.SmartlinkerEditClass1', 
					{
						EditClass : function(id, s) {
							this.parent(id, s);
							this.classPrefix = 'mceSmartlinkerEditClass1';
						},

						renderHTML : function() {
							//return "<div id=\"ie5menu\" class=\"skin0\" onMouseover=\"highlightie5(event)\" onMouseout=\"lowlightie5(event)\" onClick=\"jumptoie5(event)\" display:none>";
							return "<div id=\"ie5menu\" class=\"skin0\" onMouseover=\"TinyMCE_SmartlinkerPluginv25.highlightie5(event)\" onMouseout=\"TinyMCE_SmartlinkerPluginv25.lowlightie5(event)\" onClick=\"TinyMCE_SmartlinkerPluginv25.jumptoie5(event)\" display:none>";
						},

						postRender : function() {}


					}
					);
				}
				else
				{
					
					tinymce.create('tinymce.smartlinker.SmartlinkerEditClass1', 
					{
						EditClass : function(id, s) {
							this.parent(id, s);							
							this.classPrefix = 'mceSmartlinkerEditClass1';
						},

						renderHTML : function() {
							return "<div id=\"ie5menu\" class=\"skin0\" onMouseover=\"TinyMCE_SmartlinkerPluginv25.highlightie5(event)\" onMouseout=\"TinyMCE_SmartlinkerPluginv25.lowlightie5(event)\" onClick=\"TinyMCE_SmartlinkerPluginv25.jumptoie5(event)\" display:none>";
							//return "<div id=\"ie5menu\" class=\"skin0\" onMouseover=\"TinyMCE_SmartlinkerPluginv25.highlightie5(event)\" onMouseout=\"TinyMCE_SmartlinkerPluginv25.lowlightie5(event)\" onClick=\"TinyMCE_SmartlinkerPluginv25.jumptoie5(event)\" display:none>";
							//return "<div id=\"ie5menu\" class=\"skin0\" display:none>";
							
						},

						postRender : function() {}


					}
					);
				}*/

			/*	 var divTag = document.createElement("div"); 
				 divTag.id = "ie5menu";   
				 divTag.class = "skin0";     
				 divTag.style.display ="None";  */

			/*	alert('1111:' + document.getElementById("ie5menu"));
				if (TinyMCE_SmartlinkerPluginv25.ie5||TinyMCE_SmartlinkerPluginv25.ns6)
				{
					
					TinyMCE_SmartlinkerPluginv25.menuobj=document.getElementById("ie5menu");
				}

				if (TinyMCE_SmartlinkerPluginv25.ie5||TinyMCE_SmartlinkerPluginv25.ns6){
					TinyMCE_SmartlinkerPluginv25.menuobj.style.display='';
					document.oncontextmenu=TinyMCE_SmartlinkerPluginv25.showmenuie5;
					document.onclick=TinyMCE_SmartlinkerPluginv25.hidemenuie5;
				}*/


				///// end new code

				/*tinymce.create('tinymce.smartlinker.SmartlinkerTableStart', 
				{
					SmartlinkerTableStart : function(id, s) {
						//this.parent(id, s);
						this.classPrefix = 'SmartlinkerTableStart';
					},

					renderHTML : function() {
						//return "<div id=\"smartlinkerdivbar\" style=\"display: block;\">";
						return "<table id=\"smartlinker_toolbar\" class=\"mceToolbar Enabled\" cellspacing=\"0\" cellpadding=\"0\" align=\"\" style=\"display: block;\"><tbody><tr>";
					},

					postRender : function() {}


				}
				);

				tinymce.create('tinymce.smartlinker.SmartlinkerTableEnd', 
				{
					SmartlinkerTableEnd : function(id, s) {
						//this.parent(id, s);
						this.classPrefix = 'SmartlinkerTableEnd';
					},

					renderHTML : function() {
						//return "<div id=\"smartlinkerdivbar\" style=\"display: block;\">";
						return "</tr></tbody></table>";
					},

					postRender : function() {}


				}
				);*/

				TinyMCE_SmartlinkerPluginv25 = this;			

				cookie_category_id = TinyMCE_SmartlinkerPluginv25._getCookie('smartlinker_category');
				for(i=0; i< TinyMCE_SmartlinkerPluginv25._category.length; ++i) {
					if (TinyMCE_SmartlinkerPluginv25._category[i] == cookie_category_id) {
						TinyMCE_SmartlinkerPluginv25._current_category_id=i;
						break;
					}
				}

				cookie_linkoptions_id = TinyMCE_SmartlinkerPluginv25._getCookie('smartlinker_linkoption');
				for(i=0; i< TinyMCE_SmartlinkerPluginv25._linkoptions.length; ++i) {
					if (TinyMCE_SmartlinkerPluginv25._linkoptions[i] == cookie_linkoptions_id) {
						TinyMCE_SmartlinkerPluginv25._current_linkoption_id=i;
						break;
					}
				}

				// Add a node change handler, selects the button in the UI when a image is selected
				ed.onNodeChange.add(function(ed, cm, n) {											

				if (n.nodeName.toLowerCase() == 'a')
				{
						cm.setDisabled('smartlink', 1); 
						cm.setDisabled('unsmartlink', 0);
						
				}
				else
				{
					if (ed.selection.getContent() != '' && n.nodeName.toLowerCase() != 'img')
					{	
					
						cm.setDisabled('smartlink', 0); //enable
						cm.setDisabled('unsmartlink', 0);	
						
					}
					else
					{
						cm.setDisabled('smartlink', 1); //disable
						cm.setDisabled('unsmartlink', 1);	
						
					}
				}
				TinyMCE_SmartlinkerPluginv25._setButtonColor("default");
					
					
				});
		
            },
			execCommand : function(editor_id, element, command, user_interface, value) {				
				var inst = tinyMCE.selectedInstance;
				var range = tinyMCE.selectedInstance.selection.getRng();
				var selection = tinyMCE.selectedInstance.selection;
				var index;
				var t = this;
				var url, output;


				ed = t.editor;
				
				if (typeof(editor_id) != 'undefined' && (editor_id.indexOf('mceSmartlinkHyperlink_') !=-1 ||
					editor_id.indexOf('mceSmartlinkPreview_') != -1)
				&& typeof(command) == 'undefined')
				{
					if (editor_id.indexOf('mceSmartlinkPreview_') != -1)
					{
						//alert(plugin_url);
						index = editor_id.replace("mceSmartlinkPreview_", "");
						//alert(index);
						url = t._data.Terms[index].Url;
						// alert(url);
						 /*ed.windowManager.open({
                                        file : url,
                                        width : 600,
                                        height : 385,
                                        inline : 1
                                }, {
                                        plugin_url : plugin_url
                                });*/
								
								/*tinyMCE.activeEditor.windowManager.open({
								   url : url,
								   width : 780,
								   height : 380,
								   scrollbars: 'yes',
								   resizeable: 'yes'								   
								}, {
									//custom_param : 0,
									//window : win,									        
									});*/
									window.open(url, 'mywindow', 'resizable=1,width=780,height=480,scrollbars=1');
						//output = "<a href=\"" + url + "\">" + _inputHTML + "</a>";
					}
					else
					{
							if (editor_id.indexOf('mceSmartlinkHyperlink_') != -1)
							{
								index = editor_id.replace("mceSmartlinkHyperlink_", "");
								url = t._data.Terms[index].Url;
								var openinnewwindow = this._openinnewwindowcode[this._current_linkoption_id];
								if (openinnewwindow == "Y")
								{
									output = "<a href=\"" + url + "\"" + " target=\"_blank\"" + ">" + t._inputHTML + "</a>";
								}
								else
								{
									output = "<a href=\"" + url + "\">" + t._inputHTML + "</a>";
								}
								
								selection.setContent(output);
								TinyMCE_SmartlinkerPluginv25._setButtonColor("green", 'Match Found');
							}
					}
					return true;
				}
				
			/*	switch (editor_id) {
					case 'mceSmartlinkHyperlink':
						alert('this is mceSmartlinkhyperlink option');
						if (tinymce.isIE)
						{
							selection.setContent(output);	
							TinyMCE_SmartlinkerPluginv25._setButtonColor("green", hint);
						}
						else
						{
							if (tinymce.isGecko)
							{
								
								selection.setContent(output);								
								
								TinyMCE_SmartlinkerPluginv25._setButtonColor("green", hint);
							}
						}
						return true;

					case 'mceSmartlinkPreview':
						alert('this is mceSmartlinkPreview option');
						return true;

				
				}*/
				return false;
			},
			_process : function(ed, e)
			{
				
				
				var t = this, m = t._menu, se = ed.selection, col = se.isCollapsed(), el = se.getNode() || ed.getBody(), am, p1, p2;
				

				t._e = e;
				//t._e123 = e;

				if (m) {
					m.removeAll();
					m.destroy();
				}

				p1 = DOM.getPos(ed.getContentAreaContainer());
				p2 = DOM.getPos(ed.getContainer());

				m = ed.controlManager.createDropMenu('contextmenu', {
					offset_x : p1.x + ed.getParam('contextmenu_offset_x', 0),
					offset_y : p1.y + ed.getParam('contextmenu_offset_y', 0),
					constrain : 1
				});

				t._menu = m;
				t.onContextMenu.dispatch(t, m, el, col);


				if (tinymce.isIE)
				{
				
						var document = tinyMCE.selectedInstance.getDoc();
						var inst = tinyMCE.selectedInstance;			
						var range = inst.selection.getRng();
						var selection = inst.selection;	  
					
						var inputHTML = "";			
						this._inputHTML = "";

						inputHTML = selection.getContent();
						//alert('1:' + inputHTML);
						/*pattern = /(<p>)(<\/p>)/;
						inputHTML = inputHTML.replace(pattern, '');
						alert('2:' + inputHTML);*/
						inputHTML = inputHTML.replace('<p>', '');
						inputHTML = inputHTML.replace('</p>', '');

						if (inputHTML != '')
						{
							this._inputHTML = inputHTML;
						}
					
						if (this._inputHTML != "")
						{
						
							//var categorycode = this._categorycode[this._current_category_id];
							//var openinnewwindow = this._openinnewwindowcode[this._current_linkoption_id];													
							
							//var obj = smartlinkv25(this._inputHTML, categorycode, openinnewwindow);

							//t._setButtonColor("default");
							t._setButtonColor("datatransfer", "Working...");
							var categorycode = "ALL";//this._categorycode[this._current_category_id];
							var openinnewwindow = this._openinnewwindowcode[this._current_linkoption_id];	
							
							var obj = smartlinkv30(this._inputHTML/*, categorycode, openinnewwindow*/);
						}
				}
				else
				{
					if (tinymce.isGecko)
					{
							var document = tinyMCE.selectedInstance.getDoc();
							var inst = tinyMCE.selectedInstance;
						
							var range = inst.selection.getRng();
						
							var selection = inst.selection;
																	
							var parentElement = range.startContainer.parentNode;						   
							
							var inputHTML = "";							
							this._inputHTML = "";
							
							//if (this._inputHTML == '')
							//{
								inputHTML = selection.getContent();
								if (inputHTML.length > 0)
								{
									this._inputHTML = inputHTML;
								}
							
								if (this._inputHTML.length > 0)
								{
									//t._setButtonColor("default");
									t._setButtonColor("datatransfer", "Working...");

									var categorycode = "ALL";//this._categorycode[this._current_category_id];
									var openinnewwindow = this._openinnewwindowcode[this._current_linkoption_id];															
									
									//var obj = smartlinkv25(this._inputHTML, categorycode, openinnewwindow);
									//alert('Before smartlinkv30:' + this._inputHTML);
									var obj = smartlinkv30(this._inputHTML/*, categorycode, openinnewwindow*/);
									//var Data = t._data;
									//alert('back in func after smartlinkv30 call:' + Data.NumberResults); 
									/*if (Data.NumberResults > 0)
									{
										for (i = 0; i < Data.NumberResults; i++)
										{

											var define = '';
											if (Data.Terms[i].Define != '' && Data.Terms[i].Define != ' ')
											{
												if (Data.Terms[i].Define.length > 50)
												{
													define = ' (' +  Data.Terms[i].Define.substr(0, 49) + '...)';
												}
												else define = ' (' +  Data.Terms[i].Define + ')';
											}
											am = m.addMenu({title : Data.Terms[i].Term + define + ' - ' +  Data.Terms[i].Url });
											am.add({title : 'Preview link', cmd : 'JustifyLeft'});				
										}
									}*/
									//alert('after smartlinkv30');
									//functemp(this._inputHTML);
									//return;
								}
							 //}									
							
					}
					else
					{
						alert('Browser not supported');
					}
				}


			},
			_getMenu : function(ed) {
			var t = this, m = t._menu, se = ed.selection, col = se.isCollapsed(), el = se.getNode() || ed.getBody(), am, p1, p2;

			if (m) {
				m.removeAll();
				m.destroy();
			}

			p1 = DOM.getPos(ed.getContentAreaContainer());
			p2 = DOM.getPos(ed.getContainer());

			m = ed.controlManager.createDropMenu('contextmenu', {
				offset_x : p1.x + ed.getParam('contextmenu_offset_x', 0),
				offset_y : p1.y + ed.getParam('contextmenu_offset_y', 0),
				constrain : 1
			});

			t._menu = m;
			t.onContextMenu.dispatch(t, m, el, col);

			if (tinymce.isIE)
			{
			
					var document = tinyMCE.selectedInstance.getDoc();
					var inst = tinyMCE.selectedInstance;			
					var range = inst.selection.getRng();
					var selection = inst.selection;	  

				
					var inputHTML = "";			
					this._inputHTML = "";
				
					

					inputHTML = selection.getContent();
					if (inputHTML != '')
					{
						this._inputHTML = inputHTML;
					}
				
					if (this._inputHTML != "")
					{
					
						//var categorycode = this._categorycode[this._current_category_id];
						//var openinnewwindow = this._openinnewwindowcode[this._current_linkoption_id];													
						
						//var obj = smartlinkv25(this._inputHTML, categorycode, openinnewwindow);

						var categorycode = "ALL";//this._categorycode[this._current_category_id];
						var openinnewwindow = "Y";//this._openinnewwindowcode[this._current_linkoption_id];								
						var obj = smartlinkv30(this._inputHTML, categorycode, openinnewwindow);
					}
			}
			else
			{
				if (tinymce.isGecko)
				{
						var document = tinyMCE.selectedInstance.getDoc();
						var inst = tinyMCE.selectedInstance;
					
						var range = inst.selection.getRng();
					
						var selection = inst.selection;
																
						var parentElement = range.startContainer.parentNode;						   
						
						var inputHTML = "";
						
						this._inputHTML = "";
						
						if (this._inputHTML == '')
						{
							inputHTML = selection.getContent();
							if (inputHTML != '')
							{
								this._inputHTML = inputHTML;
							}
						
							if (this._inputHTML != "")
							{
							
								var categorycode = "ALL";//this._categorycode[this._current_category_id];
								var openinnewwindow = "Y";//this._openinnewwindowcode[this._current_linkoption_id];															
								
								//var obj = smartlinkv25(this._inputHTML, categorycode, openinnewwindow);
								//alert('Before smartlinkv30:' + this._inputHTML);
								//var obj = smartlinkv30(this._inputHTML, categorycode, openinnewwindow);
								//var Data = t._data;
								//alert('back in func after smartlinkv30 call:' + Data.NumberResults); 
								/*if (Data.NumberResults > 0)
								{
									for (i = 0; i < Data.NumberResults; i++)
									{

										var define = '';
										if (Data.Terms[i].Define != '' && Data.Terms[i].Define != ' ')
										{
											if (Data.Terms[i].Define.length > 50)
											{
												define = ' (' +  Data.Terms[i].Define.substr(0, 49) + '...)';
											}
											else define = ' (' +  Data.Terms[i].Define + ')';
										}
										am = m.addMenu({title : Data.Terms[i].Term + define + ' - ' +  Data.Terms[i].Url });
										am.add({title : 'Preview link', cmd : 'JustifyLeft'});				
									}
								}*/
								//alert('after smartlinkv30');
								//functemp(this._inputHTML);
								//return;
							}
						}									
						
				}
				else
				{
					alert('Browser not supported');
				}
			}

			


			am = m.addMenu({title : 'Aurora (Space Science/Astronomy) - http://www.windows.ucar.edu/tour/link=/earth/Magnetosphere/aurora.html', cmd : 'JustifyLeft'});
			am.add({title : 'Preview link', cmd : 'mceSmartlinkPreview'});
			am.add({title : 'Hyper link', cmd : 'mceSmartlinkhyperlink'});
			am = m.addMenu({title : 'Aurora (Province) - http://en.wikipedia.org/wiki/Aurora_(province)', cmd : 'JustifyLeft'});
			am.add({title : 'Preview link', cmd : 'JustifyLeft'});
			am.add({title : 'Hyper link', cmd : 'JustifyLeft'});

			return m;

			/*m.add({title : 'advanced.cut_desc', icon : 'cut', cmd : 'Cut'}).setDisabled(col);
			m.add({title : 'advanced.copy_desc', icon : 'copy', cmd : 'Copy'}).setDisabled(col);
			m.add({title : 'advanced.paste_desc', icon : 'paste', cmd : 'Paste'});

			if ((el.nodeName == 'A' && !ed.dom.getAttrib(el, 'name')) || !col) {
				m.addSeparator();
				m.add({title : 'advanced.link_desc', icon : 'link', cmd : ed.plugins.advlink ? 'mceAdvLink' : 'mceLink', ui : true});
				m.add({title : 'advanced.unlink_desc', icon : 'unlink', cmd : 'UnLink'});
			}

			m.addSeparator();
			m.add({title : 'advanced.image_desc', icon : 'image', cmd : ed.plugins.advimage ? 'mceAdvImage' : 'mceImage', ui : true});

			m.addSeparator();
			am = m.addMenu({title : 'contextmenu.align'});
			am.add({title : 'contextmenu.left', icon : 'justifyleft', cmd : 'JustifyLeft'});
			am.add({title : 'contextmenu.center', icon : 'justifycenter', cmd : 'JustifyCenter'});
			am.add({title : 'contextmenu.right', icon : 'justifyright', cmd : 'JustifyRight'});
			am.add({title : 'contextmenu.full', icon : 'justifyfull', cmd : 'JustifyFull'});*/

			/*m.add({title : 'Aurora - http://www.windows.ucar.edu/tour/link=/earth/Magnetosphere/aurora.html', cmd : 'Paste'});
			m.add({title : 'Aurora - http://en.wikipedia.org/wiki/Aurora_(province)', cmd : 'Paste'});
			m.add({title : 'Aurora - http://en.wikipedia.org/wiki/Aurora', cmd : 'Paste'});
			m.add({title : 'Aurora - http://en.wikipedia.org/wiki/National_Film_Registry', cmd : 'Paste'});
			m.add({title : 'Aurora - http://en.wikipedia.org/wiki/Aurora_(typeface)', cmd : 'Paste'});
			m.add({title : 'Aurora - http://en.wikipedia.org/wiki/Aurora_(band)', cmd : 'Paste'});
			m.add({title : 'Aurora - http://en.wikipedia.org/wiki/Aurora,_Suriname', cmd : 'Paste'});
			m.add({title : 'Aurora - http://en.wikipedia.org/wiki/Aurora,_Ohio', cmd : 'Paste'});*/

			
			
			/*am = m.addMenu({title : 'Aurora (Space Science/Astronomy) - http://www.windows.ucar.edu/tour/link=/earth/Magnetosphere/aurora.html'});
			am.add({title : 'Preview link', cmd : 'JustifyLeft'});
			am = m.addMenu({title : 'Aurora (Province) - http://en.wikipedia.org/wiki/Aurora_(province)'});
			am.add({title : 'Preview link', cmd : 'JustifyLeft'});*/


			/*
			^@"Term":"Aurora"},{"Url":"http://en.wikipedia.org/wiki/Aurora_(province)"}},
^@"Term":"Aurora"},{"Url":"http://www.windows.ucar.edu/tour/link=/earth/Magnetosphere/aurora.html"}},
^@"Term":"Aurora"},{"Url":"http://en.wikipedia.org/wiki/Aurora_(film)"}},
^@"Term":"Aurora"},{"Url":"http://en.wikipedia.org/wiki/Aurora"}},
^@"Term":"Aurora"},{"Url":"http://en.wikipedia.org/wiki/Aurora_(mythology)"}},
^@"Term":"Aurora"},{"Url":"http://en.wikipedia.org/wiki/Aurora_(typeface)"}},
^@"Term":"Aurora"},{"Url":"http://en.wikipedia.org/wiki/Aurora_(astronomy)"}},
^@"Term":"Aurora"},{"Url":"http://en.wikipedia.org/wiki/Aurora_(punk_band)"}},
^@"Term":"Aurora"},{"Url":"http://en.wikipedia.org/wiki/Aurora_(planet)"}},
^@"Term":"Aurora"},{"Url":"http://en.wikipedia.org/wiki/Aurora_(Aurora_album)"}},
^@"Term":"Aurora"},{"Url":"http://en.wikipedia.org/wiki/Aurora_(pen_manufacturer)"}},
^@"Term":"Aurora"},{"Url":"http://en.wikipedia.org/wiki/Aurora_(Jean-Luc_Ponty_album)"}},
^@"Term":"Aurora"},{"Url":"http://en.wikipedia.org/wiki/Aurora_(comics)"}},
^@"Term":"Aurora"},{"Url":"http://en.wikipedia.org/wiki/Aurora_(Lights_Action_song)"}},
^@"Term":"Aurora"},{"Url":"http://en.wikipedia.org/wiki/Aurora_(band)"}},
^@"Term":"Aurora"},{"Url":"http://en.wikipedia.org/wiki/Aurora_(1957_automobile)"}},
^@"Term":"Aurora"},{"Url":"http://en.wikipedia.org/wiki/Aurora,_Isabela"}},
^@"Term":"Aurora"},{"Url":"http://en.wikipedia.org/wiki/Aurora,_Suriname"}},
^@"Term":"Aurora"},{"Url":"http://en.wikipedia.org/wiki/Aurora,_South_Dakota"}},
^@"Term":"Aurora"},{"Url":"http://en.wikipedia.org/wiki/Aurora,_Ohio"}},

			*/
		




			
		},
			/*showmenuie5 : function (e) {
					//Find out how close the mouse is to the corner of the window
					var rightedge=TinyMCE_SmartlinkerPluginv25.ie5? document.body.clientWidth-event.clientX : window.innerWidth-e.clientX;
					var bottomedge=TinyMCE_SmartlinkerPluginv25.ie5? document.body.clientHeight-event.clientY : window.innerHeight-e.clientY;

					//if the horizontal distance isn't enough to accomodate the width of the context menu
					if (rightedge<menuobj.offsetWidth)
					//move the horizontal position of the menu to the left by it's width
					TinyMCE_SmartlinkerPluginv25.menuobj.style.left=TinyMCE_SmartlinkerPluginv25.ie5? document.body.scrollLeft+event.clientX-menuobj.offsetWidth : window.pageXOffset+e.clientX-menuobj.offsetWidth;
					else
					//position the horizontal position of the menu where the mouse was clicked
					TinyMCE_SmartlinkerPluginv25.menuobj.style.left=TinyMCE_SmartlinkerPluginv25.ie5? document.body.scrollLeft+event.clientX : window.pageXOffset+e.clientX;

					//same concept with the vertical position
					if (e.clientY > menuobj.offsetHeight)
					TinyMCE_SmartlinkerPluginv25.menuobj.style.top=TinyMCE_SmartlinkerPluginv25.ie5? document.body.scrollTop+event.clientY-menuobj.offsetHeight: window.pageYOffset+e.clientY- menuobj.offsetHeight;
					else
					TinyMCE_SmartlinkerPluginv25.menuobj.style.top=TinyMCE_SmartlinkerPluginv25.ie5? document.body.scrollTop+event.clientY : window.pageYOffset+e.clientY;



					TinyMCE_SmartlinkerPluginv25.menuobj.style.visibility="visible";
					return false;
			},
			hidemenuie5: function(e) {
					TinyMCE_SmartlinkerPluginv25.menuobj.style.visibility="hidden";
			},
			highlightie5: function(e) {
					var firingobj=TinyMCE_SmartlinkerPluginv25.ie5? event.srcElement : e.target;
					if (firingobj.className=="menuitems"||ns6&&firingobj.parentNode.className=="menuitems"){
					if (TinyMCE_SmartlinkerPluginv25.ns6&&firingobj.parentNode.className=="menuitems") firingobj=firingobj.parentNode; //up one node
					firingobj.style.backgroundColor="highlight";
					firingobj.style.color="white";
					if (display_url==1)
					window.status=event.srcElement.url;
				}
			},
			lowlightie5: function(e) {
					var firingobj=TinyMCE_SmartlinkerPluginv25.ie5? event.srcElement : e.target;
					if (firingobj.className=="menuitems"||ns6&&firingobj.parentNode.className=="menuitems"){
					if (TinyMCE_SmartlinkerPluginv25.ns6&&firingobj.parentNode.className=="menuitems") firingobj=firingobj.parentNode; //up one node
					firingobj.style.backgroundColor="";
					firingobj.style.color="black";
					window.status='';
					}
			},
			jumptoie5: function(e) {
				var firingobj=TinyMCE_SmartlinkerPluginv25.ie5? event.srcElement : e.target;
				if (firingobj.className=="menuitems"||TinyMCE_SmartlinkerPluginv25.ns6&&firingobj.parentNode.className=="menuitems"){
				if (TinyMCE_SmartlinkerPluginv25.ns6&&firingobj.parentNode.className=="menuitems") firingobj=firingobj.parentNode;
				if (firingobj.getAttribute("target"))
				window.open(firingobj.getAttribute("url"),firingobj.getAttribute("target"));
				else
				window.location=firingobj.getAttribute("url");
				}
			},*/



			_getCookie : function(name) {
				var dc = document.cookie;
				var prefix = name + "=";
				var begin = dc.indexOf("; " + prefix);

				if (begin == -1) {
					begin = dc.indexOf(prefix);

					if (begin != 0)
						return null;
				} else
					begin += 2;

				var end = document.cookie.indexOf(";", begin);

				if (end == -1)
					end = dc.length;

				return unescape(dc.substring(begin + prefix.length, end));
			},
			_setCookie : function(name, value, expires, path, domain, secure) {
				var curCookie = name + "=" + escape(value) +
					((expires) ? "; expires=" + expires.toGMTString() : "") +
					((path) ? "; path=" + escape(path) : "") +
					((domain) ? "; domain=" + domain : "") +
					((secure) ? "; secure" : "");

				document.cookie = curCookie;
			},
			hs_q1: function (q,fo)
			{
					df = "";
					if (tinymce.isGecko)
					{
						df = "Check for word";
					}
					else
					{
						df = "Check for word";
					}



					
					if(q.value == df && fo)
					{
						q.value="";
						q.style.color="#000000";
					}
					else
					{
						if (q.value=="" || q.value==df)
						{
							q.style.color="#999999";
							q.value=df;
						}
						else
						{
							q.style.color="#000000";
						}
					}
			},
		
			createControl : function(n, cm) {
			
			var t = this, c;
			
			
				 switch (n) {
					

						case 'smartlink':
							//var cls = tinymce.smartlinker.SmartlinkerEditClass1;
							//document.appendChild(cls);
							//alert('smartlink:' + document.getElementById("ie5menu"));
							var b = cm.createButton('smartlink', {
							title : 'Smart Link',
							image : plugin_url+'/images/smartlink.gif',

							
							
							onclick : function() {							
								//t._setButtonColor("default");
								//t._setButtonColor("datatransfer", "Working...");
								//t._doSmartLinking(cm);
								t._process(t.editor, '');
							}
						});
						
						return b;

						case 'unsmartlink':
							var b = cm.createButton('unsmartlink', {
							
							title : 'Unlink',
							image : plugin_url+'/images/unsmartlink.gif',							
							onclick : function() {
						
								var ed=cm.editor,s=ed.selection;
								if(s.isCollapsed())s.select(s.getNode());
								ed.getDoc().execCommand('unlink',false,null);
								s.collapse(0);
								
								cm.setDisabled('smartlink', 0); 
								ed.selection.setContent('');
								
							}
						});
						return b;

						
						case 'smartlinkersuggestion':
						var cls = tinymce.smartlinker.SmartlinkerEditClass;		
						return new cls();

						/*case 'smartlinkersuggestion1':
							alert('smartlinkersuggestion1');
						var cls = tinymce.smartlinker.SmartlinkerEditClass1;		
						return new cls();*/
						
						

						/*case 'smartlinkerdir':
							var spb = cm.createSplitButton('smartlinkerdir', {
							title : 'Smartlinker Categories',
							image : plugin_url+'/images/directory.gif',
							scope : t,
							onclick : function() {
							}
						});

						spb.onRenderMenu.add(function(spb, m) {							
							for(i = 0; i< t._category.length; ++i) {																

								var o = {icon : 1}, mi;							

								o.onclick = function(v) {
									t._setButtonColor("default");
									t.selectedDirItem.setSelected(0);

									mi = m.items[v.id];
									mi.setSelected(1);
									t._current_category_id=v.rowIndex;
									t.selectedDirItem = mi;

									var expires = new Date();
									expires.setTime(expires.getTime() + 1000*3600*24*30);
									t._setCookie('smartlinker_category', t._category[t._current_category_id], expires);

								};

								o.title = t._category[i];
								mi = m.add(o);
								mi.setSelected(i == t._current_category_id);
								if (i == t._current_category_id) t.selectedDirItem = mi;
							}

						});

						return spb;*/

						case 'smartlinkeroption':
						var spb1 = cm.createSplitButton('smartlinkeroption', {
							title : 'Smartlinker Toolbox',
							image : plugin_url+'/images/option.gif',
							scope : t,
							onclick : function() {
							}
						});

						spb1.onRenderMenu.add(function(spb1, m) {							
							var categorySubMenu, linkoptionsSubMenu;

							//categorySubMenu = m.addMenu({title : 'Smartlinker Categories'});
							linkoptionsSubMenu = m.addMenu({title : 'Link Options'});

							m.add({title : 'Smartlinker Help', onclick : function() {
								
								t._setButtonColor("default");
								tinyMCE.activeEditor.windowManager.open({
								   url : 'http://www.inetlinker.com/wordpress_help.html',
								   width : 780,
								   height : 380,
								   scrollbars: 'yes',
								   resizeable: 'yes'
								}, {
								   custom_param : 1
								});
								
							}});

							for(i = 0; i < t._linkoptions.length; ++i) {																

								var o = {icon : 1}, mi;							

								o.onclick = function(v) {
									t._setButtonColor("default");
									t.selectedLinkOptionItem.setSelected(0);

									mi = linkoptionsSubMenu.items[v.id];
									mi.setSelected(1);
									t._current_linkoption_id=v.rowIndex;
									t.selectedLinkOptionItem = mi;		
									
									var expires = new Date();
									expires.setTime(expires.getTime() + 1000*3600*24*30);
									t._setCookie('smartlinker_linkoption', t._linkoptions[t._current_linkoption_id], expires);
								};

								o.title = t._linkoptions[i];
								mi = linkoptionsSubMenu.add(o);
								mi.setSelected(i == t._current_linkoption_id);
								if (i == t._current_linkoption_id) t.selectedLinkOptionItem = mi;
							}

							/*for(i = 0; i< t._category.length; ++i) {																

								var o = {icon : 1}, mi;							

								o.onclick = function(v) {
									t._setButtonColor("default");
									t.selectedDirItem.setSelected(0);

									mi = categorySubMenu.items[v.id];
									mi.setSelected(1);
									t._current_category_id=v.rowIndex;
									t.selectedDirItem = mi;

									var expires = new Date();
									expires.setTime(expires.getTime() + 1000*3600*24*30);
									t._setCookie('smartlinker_category', t._category[t._current_category_id], expires);

								};

								o.title = t._category[i];
								mi = categorySubMenu.add(o);
								mi.setSelected(i == t._current_category_id);
								if (i == t._current_category_id) t.selectedDirItem = mi;
							}*/



						});
						return spb1;

						case 'smartlinker_info':
							var b = cm.createButton('smartlinker_info', {
							title : 'Link Status Indicator',
							image : plugin_url+'/images/gray.gif',
							onclick : function() {
								t._setButtonColor("default");
								tinyMCE.activeEditor.windowManager.open({
								   url : 'http://www.inetlinker.com/wordpress_help.html',
								   width : 780,
								   height : 380,
								   scrollbars: 'yes',
								   resizeable: 'yes'
								}, {
								   custom_param : 1
								});
								
							}
						});
						return b;


						case 'smartlinker_help':
						
							var b = cm.createButton('smartlinker_help', {
							title : 'Smartlinker Help',
							image : plugin_url+'/images/help1.gif',
							onclick : function() {
								t._setButtonColor("default");
								tinyMCE.activeEditor.windowManager.open({
								   url : 'http://www.inetlinker.com/wordpress_help.html',
								   width : 780,
								   height : 380,
								   scrollbars: 'yes',
								   resizeable: 'yes'
								}, {
								   custom_param : 1
								});
								
							}
						});
						

						/*case 'smartlinker_separator0' :					
							var b = cm.createSeparator();
						return b;*/

						/*case 'smartlinker_separator1' :					
						var cls = tinymce.smartlinker.SmartlinkerTableEnd;		
						return new cls();*/

						
						
				 }
				
            },
			_getSelectedHTML : function() {
				var inst = tinyMCE.selectedInstance, e2, r = tinyMCE.selectedInstance.selection.getRng(), h;

				if (!r)
					return null;

				e2 = document.createElement("body");

				if (r.cloneContents)
					e2.appendChild(r.cloneContents());
				else if (typeof(r.item) != 'undefined' || typeof(r.htmlText) != 'undefined')
					e2.innerHTML = r.item ? r.item(0).outerHTML : r.htmlText;
				else
					e2.innerHTML = r.toString(); // Failed, use text for now
				
				return e2.innerHTML;
			},
			_setButtonColor : function(state, msg)
			{
			//alert('_setButtonColor:' + document.getElementById("ie5menu"));	
				/*TinyMCE_SmartlinkerPluginv25.menuobj=document.getElementById("ie5menu");

				TinyMCE_SmartlinkerPluginv25.menuobj.style.display='';
				document.oncontextmenu=TinyMCE_SmartlinkerPluginv25.showmenuie5;		
				document.onclick=TinyMCE_SmartlinkerPluginv25.hidemenuie5;*/

				var c = document.getElementById(tinyMCE.selectedInstance.editorId + '_smartlinker_info');
				
				switch(state)
				{
					case "gray":				
						c.innerHTML = "<img class=\"mceIcon\" title=\"" + msg + "\" alt=\"" + msg + "\" src=\"" + plugin_url + '/images/gray.gif' + "\"/>";
					break;

					case "red":
						c.innerHTML = "<img class=\"mceIcon\" title=\"" + msg + "\" alt=\"" + msg + "\" src=\"" + plugin_url + '/images/red.gif' + "\"/>";
					break;

					case "green":
						c.innerHTML = "<img class=\"mceIcon\" title=\"" + msg + "\" alt=\"" + msg + "\" src=\"" + plugin_url + '/images/green.gif' + "\"/>";
					break;

					case "yellow":
						c.innerHTML = "<img class=\"mceIcon\" title=\"" + msg + "\" alt=\"" + msg + "\" src=\"" + plugin_url+ '/images/yellow.gif' + "\"/>";
					break;

					case "datatransfer":
						c.innerHTML = "<img class=\"mceIcon\" title=\"" + msg + "\" alt=\"" + msg + "\" src=\"" + plugin_url + '/images/data-transfer.gif' + "\"/>";
					break;

					default:
						msg = "Link Status Indicator";
						c.innerHTML = "<img class=\"mceIcon\" title=\"" + msg + "\" alt=\"" + msg + "\" src=\"" + plugin_url + '/images/gray.gif' + "\"/>";
					break;

				}
			},

			_doSmartLinking : function(editor_id) {	
		
	
				if (tinymce.isIE)
				{
				
						var document = tinyMCE.selectedInstance.getDoc();
						var inst = tinyMCE.selectedInstance;			
						var range = inst.selection.getRng();
						var selection = inst.selection;	  

					
						var inputHTML = "";			
						this._inputHTML = "";
					
						

						inputHTML = selection.getContent();
						if (inputHTML != '')
						{
							this._inputHTML = inputHTML;
						}
					
						if (this._inputHTML != "")
						{
						
							var categorycode = this._categorycode[this._current_category_id];
							var openinnewwindow = this._openinnewwindowcode[this._current_linkoption_id];													
							
							var obj = smartlinkv25(this._inputHTML, categorycode, openinnewwindow);
						}
				}
				else
				{
					if (tinymce.isGecko)
					{
							var document = tinyMCE.selectedInstance.getDoc();
							var inst = tinyMCE.selectedInstance;
						
							var range = inst.selection.getRng();
						
							var selection = inst.selection;
																	
							var parentElement = range.startContainer.parentNode;						   
							
							var inputHTML = "";
							
							this._inputHTML = "";
							
							if (this._inputHTML == '')
							{
								inputHTML = selection.getContent();
								if (inputHTML != '')
								{
									this._inputHTML = inputHTML;
								}
							
								if (this._inputHTML != "")
								{
								
									var categorycode = this._categorycode[this._current_category_id];
									var openinnewwindow = this._openinnewwindowcode[this._current_linkoption_id];															
									
									var obj = smartlinkv25(this._inputHTML, categorycode, openinnewwindow);
									return;
								}
							}									
							
					}
					else
					{
						alert('Browser not supported');
					}
				}
				



		}       
        });
        tinymce.PluginManager.add('smartlinker', tinymce.plugins.TinyMCE_SmartlinkerPlugin);
    } )();

}
else
{
		tinyMCE.importPluginLanguagePack('smartlinker');
		// WordPress < 2.5 and Wordpress >= 2.1 & / TinyMCE 2
	
		var TinyMCE_SmartlinkerPlugin = {
		_inputHTML: "",
		_menu: new TinyMCE_Menu(),
		_optionsmenu: new TinyMCE_Menu(),
		_current_category_id: 0,
		_current_linkoption_id: 0,
		_category: [ "Auto Hyperlink", "Architecture", "Art & Sculpture", "Astronomy & Space Science", "Business", "Chemistry", "Education & Literature", 
			"Geography & Earth Science", "History, Politics & Law", "Mathematics & Physics", "Movies, TV & Theatre",
			"Music", "Plants & Animals", "Religion & Philosophy", "Sports & Hobbies", "Technology"],
		_categorycode: ["ALL", "CAR", "CA", "STA", "B", "STC", "CEL", "G", "LP", "STM", "EMO", "EMU", "N", "R", "S", "STT"],
		_linkoptions: ['Open link in same window', 'Open link in new window'],
		_openinnewwindowcode:['N', 'Y'],

		/**
		 * Returns information about the plugin as a name/value array.
		 * The current keys are longname, author, authorurl, infourl and version.
		 *
		 * @returns Name/value array containing information about the plugin.
		 * @type Array 
		 */
		getInfo : function() {
			return {
				longname : 'Smartlinker',
				author : 'Rakesh Sharma',
				authorurl : 'http://www.inetlinker.com/aboutus.html',
				infourl : 'http://www.inetlinker.com/tools.html#whatissmartlinkerforwordpress',
				version : "2.0"
			};
		},

		
		hs_q1: function (q,fo)
		{
				df = "Check for word";
				if(q.value == df && fo)
				{
					q.value="";
					q.style.color="#000000";
				}
				else
				{
					if (q.value=="" || q.value==df)
					{
						q.style.color="#999999";
						q.value=df;
					}
					else
					{
						q.style.color="#000000";
					}
				}
		},


		/**
		 * Returns the HTML code for a specific control or empty string if this plugin doesn't have that control.
		 * A control can be a button, select list or any other HTML item to present in the TinyMCE user interface.
		 * The variable {$editor_id} will be replaced with the current editor instance id and {$pluginurl} will be replaced
		 * with the URL of the plugin. Language variables such as {$lang_somekey} will also be replaced with contents from
		 * the language packs.
		 *
		 * @param {string} cn Editor control/button name to get HTML for.
		 * @return HTML code for a specific control or empty string.
		 * @type string
		 */
		getControlHTML : function(cn) {		

			switch (cn) {
				case "smartlinker_separator0" :
					return "<div id=\"smartlinkerdivbar\" style=\"display: block;\">";

				case "smartlink" :
					return tinyMCE.getButtonHTML(cn, "lang_smartlinker_smartlink_desc", '{$pluginurl}/images/smartlink.gif','mceSmartlink', true);

				case "unsmartlink" :
					return tinyMCE.getButtonHTML(cn, 'lang_smartlinker_unsmartlink_desc', '{$pluginurl}/images/unsmartlink.gif', 'mceUnSmartlink', false);

				case "smartlinkerdir":
					return tinyMCE.getMenuButtonHTML(cn, 'lang_smartlinker_directory_title', '{$pluginurl}/images/directory.gif', 'smartlinkerToggleMenu', 'smartlinkerToggleMenu');

				case "smartlinkeroption":
					return tinyMCE.getMenuButtonHTML(cn, 'lang_smartlinker_option_title', '{$pluginurl}/images/option.gif', 'mceOption', 'mceOption');

				case "smartlinker_info" :
					return tinyMCE.getButtonHTML(cn, 'lang_smartlinker_info_desc', '{$pluginurl}/images/data-transfer.gif', 'mceSmartlinkerInfo', true);

				case "smartlinker_help":
					return tinyMCE.getButtonHTML(cn, 'lang_smartlinker_help_desc', '{$pluginurl}/images/help1.gif', 'mceSmartlinkerHelp', true);
				
				case "smartlinker_separator1" :
					return "</div>";

			

				case "smartlinkersuggestion":

					return "<span id=\"smartlinkerautocomplete\"><input id=\"terminput\" name=\"text1\"  type=\"text\"  onblur=\"TinyMCE_SmartlinkerPlugin.hs_q1(this,false)\" onfocus=\"TinyMCE_SmartlinkerPlugin.hs_q1(this,true)\" style=\"font-family:Verdana, Arial,Helvetica, sans-serif; font-size:9px; height:13px; color:rgb(153, 153, 153); vertical-align:text-bottom;\" alt=\"Check for word in database\" value=\"Check for word\"><div id=\"sresults\"></div> </span>";


			}

			return "";
		},

	  _getPosHTML : function(r, sn, en) {
			var w = document.createTreeWalker(r, NodeFilter.SHOW_ALL, null, false), n, p = 0, d = {};
			e = document.createElement("body");

			while ((n = w.nextNode()) != null) {
				if (n == sn)
					d.start = p;

				if (n == en) {
					d.end = p;
					return d;
				}

				e.appendChild(n.cloneNode(true));
				p += n.nodeValue ? n.nodeValue.length : 0;
			}

			return null;
		},
		
		_getSelectedHTML : function() {
			var inst = tinyMCE.selectedInstance, e2, r = tinyMCE.selectedInstance.selection.getRng(), h;

			if (!r)
				return null;

			e2 = document.createElement("body");

			if (r.cloneContents)
				e2.appendChild(r.cloneContents());
			else if (typeof(r.item) != 'undefined' || typeof(r.htmlText) != 'undefined')
				e2.innerHTML = r.item ? r.item(0).outerHTML : r.htmlText;
			else
				e2.innerHTML = r.toString(); // Failed, use text for now

			h = tinyMCE._cleanupHTML(inst, inst.contentDocument, inst.settings, e2, e2, false, true, false);
		
			return e2.innerHTML;
		},
		
		_doSmartLinking : function(editor_id) {	
			TinyMCE_SmartlinkerPlugin._setButtonColor("datatransfer", "Working...");
			if (tinyMCE.isMSIE)
			{
				var document = tinyMCE.selectedInstance.getDoc();
				var inst = tinyMCE.selectedInstance;			
				var range = inst.selection.getRng();
				var selection = inst.selection;	  

			
				
				var inputHTML = "";			
				this._inputHTML = "";

				inputHTML = selection.getSelectedText();
				
				if (inputHTML != '')
				{
					this._inputHTML = inputHTML;
				}
				
				if (this._inputHTML != "")
				{
					var categorycode = this._categorycode[this._current_category_id];
					var openinnewwindow = this._openinnewwindowcode[this._current_linkoption_id];

					var obj = smartlink(this._inputHTML, categorycode, openinnewwindow);

				
				}
			
															
			}
			else
			{
				if (tinyMCE.isGecko)
				{
					var document = tinyMCE.selectedInstance.getDoc();
					var inst = tinyMCE.selectedInstance;					
					var range = tinyMCE.selectedInstance.selection.getRng();					
					var selection = tinyMCE.selectedInstance.selection;					
					var parentElement = tinyMCE.getParentElement(range.startContainer);

					
					var inputHTML = "";					
					this._inputHTML = "";
					
					   
					inputHTML = selection.getSelectedText();
		
					if (inputHTML != '')
					{
						this._inputHTML = inputHTML;
					}
					
					if (this._inputHTML != "")
					{
						var categorycode = this._categorycode[this._current_category_id];
						var openinnewwindow = this._openinnewwindowcode[this._current_linkoption_id];
					
						var obj = smartlink(this._inputHTML, categorycode, openinnewwindow);
						return;
					
					}
										
				}
				else
				{
					alert('Browser not supported');
				}
			}


	   },


		execCommand : function(editor_id, element, command, user_interface, value) {				
			var inst = tinyMCE.selectedInstance;
			focusElm = inst.getFocusElement();

			switch (command) {
				case 'smartlinkerToggleMenu':
					this._toggleMenu(editor_id);
					return true;

				case 'mceOption':
					this._toggleOptionsMenu(editor_id);
				return true;

				case 'mceUnSmartlink':				
					// Unlink if caret is inside link
					if (tinyMCE.isGecko && inst.getSel().isCollapsed) {
						focusElm = inst.getParentElement(focusElm, 'A');

						if (focusElm)
							inst.selection.selectNode(focusElm, false);
					}

					inst.getDoc().execCommand('unlink', user_interface, value);

					tinyMCE.isGecko && inst.getSel().collapseToEnd();

					tinyMCE.triggerNodeChange();				
					
				return true;

				case 'mceSmartlinkerInfo':					
				return true;

				case 'mceSmartlink':
					this._doSmartLinking(editor_id);
				return true;			
		
				case 'mceSmartlinkerHelp':
					var template = new Array();

					template['file']   = 'http://www.inetlinker.com/wordpress_help.html';
					template['width']  = 780;
					template['height'] = 380;

					args = {
						resizable : 'yes',
						scrollbars : 'yes'
					};

					tinyMCE.openWindow(template, args);
					return true;


				return true;
			}
			return false;
		},
		_onMenuClick : function(editor_id, category_id) {
		
			this._setCategory(editor_id, category_id);
			this._menu.hide();	

//			ACJson.closeYahoo();
			
			ACJson.clearInput();			
			//ACJson.init();

			
		},
		_onOptionsMenuClick : function(editor_id, linkoptions_id) {
			this._setLinkOptions(editor_id, linkoptions_id);
			this._optionsmenu.hide();		
		},
		initInstance : function(inst) {
			var m = this._menu;
			if (!tinyMCE.hasMenu("smartlinkermenu")) {
				m.init({});
				tinyMCE.addMenu("smartlinkermenu", m);
			}
			var m1 = this._optionsmenu;
			if (!tinyMCE.hasMenu("optionsmenu")) {
				m1.init({});
				tinyMCE.addMenu("optionsmenu", m1);
			}
			this._buildMenu(inst.editorId);
			this._buildOptionsMenu(inst.editorId);

			// load script from cookie
			cookie_category_id = this._getCookie('smartlinker_category');
			for(i=0; i<this._category.length; ++i) {
				if (this._category[i] == cookie_category_id) {
					this._setCategory(inst.editorId, i);
					break;
				}
			}

			cookie_linkoptions_id = this._getCookie('smartlinker_linkoption');
			for(i=0; i<this._linkoptions.length; ++i) {
				if (this._linkoptions[i] == cookie_linkoptions_id) {
					this._setLinkOptions(inst.editorId, i);
					break;
				}
			}

			this._setButtonColor("gray", "Link Status Indicator");
			
		},
		_toggleMenu : function(editor_id) {
			
			//alert('_toggleMenu:' + editor_id);
			var m = this._menu;
			var e = document.getElementById(editor_id + '_smartlinkerdir');
			if (m.isVisible()) {
				console.log('visible');
				m.hide();
				return;
			}
			
			this._buildMenu(editor_id);
			m.moveRelativeTo(e, 'bl');
			m.moveBy(tinyMCE.isMSIE && !tinyMCE.isOpera ? 0 : 1, -1);
			if (tinyMCE.isOpera) m.moveBy(0, -2);
			m.show();
		},
		_toggleOptionsMenu : function(editor_id) {
			var m = this._optionsmenu;
			var e = document.getElementById(editor_id + '_smartlinkeroption');
			if (m.isVisible()) {
				console.log('visible');
				m.hide();
				return;
			}
			this._buildOptionsMenu(editor_id);
			m.moveRelativeTo(e, 'bl');
			m.moveBy(tinyMCE.isMSIE && !tinyMCE.isOpera ? 0 : 1, -1);
			if (tinyMCE.isOpera) m.moveBy(0, -2);
			m.show();
		},
		_setLinkOptions : function(editor_id, linkoption_id) {
		
			this._current_linkoption_id = linkoption_id;
			
			// save current script in a cookie for a month 
			var expires = new Date();
			expires.setTime(expires.getTime() + 1000*3600*24*30);
			this._setCookie('smartlinker_linkoption', this._linkoptions[this._current_linkoption_id], expires);
		},
		_setCategory : function(editor_id, category_id) {		
			this._current_category_id = category_id;

			// save current script in a cookie for a month 
			var expires = new Date();
			expires.setTime(expires.getTime() + 1000*3600*24*30);
			this._setCookie('smartlinker_category', this._category[this._current_category_id], expires);
		},

		_buildMenu : function(editor_id) {
		//	alert('_buildMenu:' + this._current_category_id);
			var m = this._menu, i, c;
			m.clear();

			for(i=0; i<this._category.length; ++i) {

				c = (this._current_category_id == i)? 'mceMenuSelectedItem'  : 'mceMenuCheckItem';
				m.add({text: this._category[i], js: 'tinyMCE.plugins.smartlinker._onMenuClick("'+editor_id+'", '+i+');', class_name: c});
			
			}
			
			m.addSeparator();
			
		},


		_buildOptionsMenu : function(editor_id) {
			var m = this._optionsmenu, i, c;
			m.clear();
		
			for(i=0; i<this._linkoptions.length; ++i) {
				c = (this._current_linkoption_id == i)? 'mceMenuSelectedItem'  : 'mceMenuCheckItem';
				m.add({text: this._linkoptions[i], js: 'tinyMCE.plugins.smartlinker._onOptionsMenuClick("'+editor_id+'", '+i+');', class_name: c});
			}
		},

		

		/**
		 * Gets called ones the cursor/selection in a TinyMCE instance changes. This is useful to enable/disable
		 * button controls depending on where the user are and what they have selected. This method gets executed
		 * alot and should be as performance tuned as possible.
		 *
		 * @param {string} editor_id TinyMCE editor instance id that was changed.
		 * @param {HTMLNode} node Current node location, where the cursor is in the DOM tree.
		 * @param {int} undo_index The current undo index, if this is -1 custom undo/redo is disabled.
		 * @param {int} undo_levels The current undo levels, if this is -1 custom undo/redo is disabled.
		 * @param {boolean} visual_aid Is visual aids enabled/disabled ex: dotted lines on tables.
		 * @param {boolean} any_selection Is there any selection at all or is there only a cursor.
		 */
		handleNodeChange : function(editor_id, node, undo_index, undo_levels, visual_aid, any_selection) {
			// Select smartlinker button if parent node is a strong or b
			this._setButtonColor("gray", "Link Status Indicator");
			if (any_selection) {
				tinyMCE.switchClass(editor_id + '_smartlink', 'mceButtonNormal');
				tinyMCE.switchClass(editor_id + '_unsmartlink', 'mceButtonNormal');

				return true;
			}
			if (node.nodeName == "A")
			{
				tinyMCE.switchClass(editor_id + '_smartlink', 'mceButtonDisabled');
				tinyMCE.switchClass(editor_id + '_unsmartlink', 'mceButtonNormal');
				return true;
			}
			

			tinyMCE.switchClass(editor_id + '_smartlink', 'mceButtonDisabled');
			tinyMCE.switchClass(editor_id + '_unsmartlink', 'mceButtonDisabled');
			
			

			return true;

		},

		// Private plugin internal methods
	 _getCookie : function(name) {
			var dc = document.cookie;
			var prefix = name + "=";
			var begin = dc.indexOf("; " + prefix);

			if (begin == -1) {
				begin = dc.indexOf(prefix);

				if (begin != 0)
					return null;
			} else
				begin += 2;

			var end = document.cookie.indexOf(";", begin);

			if (end == -1)
				end = dc.length;

			return unescape(dc.substring(begin + prefix.length, end));
		},
		_setCookie : function(name, value, expires, path, domain, secure) {
			var curCookie = name + "=" + escape(value) +
				((expires) ? "; expires=" + expires.toGMTString() : "") +
				((path) ? "; path=" + escape(path) : "") +
				((domain) ? "; domain=" + domain : "") +
				((secure) ? "; secure" : "");

			document.cookie = curCookie;
		},

		/**
		 * This is just a internal plugin method, prefix all internal methods with a _ character.
		 * The prefix is needed so they doesn't collide with future TinyMCE callback functions.
		 *
		 * @param {string} a Some arg1.
		 * @param {string} b Some arg2.
		 * @return Some return.
		 * @type string
		 */
		_someInternalFunction : function(a, b) {
			return 1;
		},

		_setButtonColor : function(state, msg)
		{
			

			if (typeof(tinyMCE.instances.mce_editor_0.editorId) != "undefined")
			{
				var c = document.getElementById(tinyMCE.instances.mce_editor_0.editorId + '_smartlinker_info');
			}
			else
			{
				var c = document.getElementById(tinyMCE.selectedInstance.editorId + '_smartlinker_info');
			}
			
			switch(state)
			{
				case "gray":				
					c.innerHTML = "<img title=\"" + msg + "\" alt=\"" + msg + "\" src=\"" + TinyMCE_SmartlinkerPlugin.baseURL + '/images/gray.gif' + "\"/>";
				break;

				case "red":
					c.innerHTML = "<img title=\"" + msg + "\" alt=\"" + msg + "\" src=\"" + TinyMCE_SmartlinkerPlugin.baseURL + '/images/red.gif' + "\"/>";
				break;

				case "green":
					c.innerHTML = "<img title=\"" + msg + "\" alt=\"" + msg + "\" src=\"" + TinyMCE_SmartlinkerPlugin.baseURL + '/images/green.gif' + "\"/>";
				break;

				case "yellow":
					c.innerHTML = "<img title=\"" + msg + "\" alt=\"" + msg + "\" src=\"" + TinyMCE_SmartlinkerPlugin.baseURL + '/images/yellow.gif' + "\"/>";
				break;

				case "datatransfer":
					c.innerHTML = "<img title=\"" + msg + "\" alt=\"" + msg + "\" src=\"" + TinyMCE_SmartlinkerPlugin.baseURL + '/images/data-transfer.gif' + "\"/>";
				break;

				default:
					msg = "Status of last smart link";
					c.innerHTML = "<img title=\"" + msg + "\" alt=\"" + msg + "\" src=\"" + TinyMCE_SmartlinkerPlugin.baseURL + '/images/gray.gif' + "\"/>";
				break;

			}
		},

		_getTopLevelNode : function(node)
		{
			while (typeof(node.parentNode.type) == "undefined" )
			{
				if (node.parentNode.value == -1)
				{
					return node;
				}
				else
				{
					if (node.parentNode != null)
					{
						node=node.parentNode;
					}
				}
			}

			if (node.parentNode.value == -1)
			{
				return node;
			}

			return node;
		}
		,
		_importLanguagePack : function() {
		TinyMCE.prototype.loadScript = TinyMCE.prototype.orgLoadScript;
		
		tinyMCE.loadScript(plugin_url + '/langs/' + 'en' + '.js');
		tinyMCE.loadCSS(plugin_url + '/css/' + 'inetlinkerStyles.css');	
		
		TinyMCE.prototype.loadScript = function() {};

		
	}

		



	};



	// Adds the plugin class to the list of available TinyMCE plugins

	tinyMCE.addPlugin('smartlinker', TinyMCE_SmartlinkerPlugin);
	TinyMCE_SmartlinkerPlugin._importLanguagePack();
	tinyMCE.setPluginBaseURL('smartlinker', plugin_url);
}
