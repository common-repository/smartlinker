
	

		
   

	
	function smartlink(inputval, codeval, openinnewwindowval)
	{

		requestNumber = JSONRequest.post(
	    plugin_phpdir + "/smartlinkerpost.php", 
		{
			input: inputval,
			code: codeval,
			openinnewwindow: openinnewwindowval
		}, 
		callbackfunc
	); 

	}

	
	function processError(exception)
	{
		
		if (tinyMCE.isMSIE)
		{
			TinyMCE_SmartlinkerPlugin._setButtonColor("red", exception.message);
		}
		else
		{
			if (tinyMCE.isGecko)
			{
				TinyMCE_SmartlinkerPlugin._setButtonColor("red", eval(exception));
			}
			else
			{
				TinyMCE_SmartlinkerPlugin._setButtonColor("red", "Browser Not Suppordted");
			}
		}
		
	}

	
	function callbackfunc(requestNumber, value, exception) {
        if (exception) {
		
		processError(exception);

        } else {
		
		//console.dir(value);
         processResponse(value);
        }
    }

	function smartlinkv25(inputval, codeval, openinnewwindowval)
	{
	
		requestNumber = JSONRequest.post(
		plugin_phpdir + "/smartlinkerpost.php", 
		{
			input: inputval,
			code: codeval,
			openinnewwindow: openinnewwindowval
		}, 
			callbackfuncv25
		); 

	}

	function smartlinkv30(inputval, codeval, openinnewwindowval)
	{
	
		requestNumber = JSONRequest.post(
		plugin_phpdir + "/smartlinkerpost.php", 
		{
			input: inputval
				/*,
			code: codeval,
			openinnewwindow: openinnewwindowval*/
		}, 
			callbackfuncv30
		);
			

	}

	

	function processResponse(Data)
	{
		
		var range = tinyMCE.selectedInstance.selection.getRng();
		var selection = tinyMCE.selectedInstance.selection;
        var output=unescape(Data.output);
		var hint = unescape(Data.hint);
		var url = unescape(Data.url);
		var errormessage = unescape(Data.errormsg);

		if (errormessage == '')
		{
			if (output != TinyMCE_SmartlinkerPlugin._inputHTML )
			{
			
				if (tinyMCE.isMSIE || tinyMCE.isGecko)
				{
					if (hint != '' && hint.indexOf('No Match') != -1)
					{
						TinyMCE_SmartlinkerPlugin._setButtonColor("red", hint);
						return;
					}
					if (url != '')
					{		
					
						var openinnewwindow = TinyMCE_SmartlinkerPlugin._openinnewwindowcode[TinyMCE_SmartlinkerPlugin._current_linkoption_id];
						tinyMCE.selectedInstance.contentDocument.execCommand("createlink", false, tinyMCE.uniqueURL);
						elementArray = tinyMCE.getElementsByAttributeValue(tinyMCE.selectedInstance.contentDocument.body, "a", "href", tinyMCE.uniqueURL);
						tinyMCE.setAttrib(elementArray[0], 'href', url);
						tinyMCE.setAttrib(elementArray[0], 'mce_href',url);
						if (openinnewwindow == 'Y')
						{					
							tinyMCE.setAttrib(elementArray[0], 'target','_blank');
						}

						tinyMCE.linkElement = elementArray;

						TinyMCE_SmartlinkerPlugin._setButtonColor("green", hint);
					}
					else
					{
							
							if (errormessage != '')
							{
								TinyMCE_SmartlinkerPlugin._setButtonColor("red", errormessage);	
							}
							else
							{
								TinyMCE_SmartlinkerPlugin._setButtonColor("red", "No Match77 Found for '" + TinyMCE_SmartlinkerPlugin._inputHTML + "'");
							}

					}

				}
				
			}
			else
			{
				
				if (hint != '' && hint.indexOf('No Match') == -1)
				{
					TinyMCE_SmartlinkerPlugin._setButtonColor("yellow", hint);
				}
				else
				{
					TinyMCE_SmartlinkerPlugin._setButtonColor("red", hint);
				}
									
			}
		}
		else
		{
			TinyMCE_SmartlinkerPlugin._setButtonColor("red", errormessage);
		}

		return;
	}

	function callbackfuncv25(requestNumber, value, exception) {
		if (exception) {
		 processErrorv25(exception);
		} else {		
		 processResponsev25(value);
		}
    }

	function callbackfuncv30(requestNumber, value, exception) {

		if (exception) {
		 processErrorv30(exception);
		} else {		
		 processResponsev30(value);
		}
    }

	function processErrorv30(exception)
	{
		
		
		if (tinymce.isIE)
		{
			TinyMCE_SmartlinkerPluginv25._setButtonColor("red", exception.message);
		}
		else
		{
			if (tinymce.isGecko)
			{
				TinyMCE_SmartlinkerPluginv25._setButtonColor("red", eval(exception));
			}
			else
			{
				TinyMCE_SmartlinkerPluginv25._setButtonColor("red", "Browser Not Suppordted");
			}
		}

		//return exception;
		
	}


    function processErrorv25(exception)
	{
		

		if (tinymce.isIE)
		{
			TinyMCE_SmartlinkerPluginv25._setButtonColor("red", exception.message);
		}
		else
		{
			if (tinymce.isGecko)
			{
				TinyMCE_SmartlinkerPluginv25._setButtonColor("red", eval(exception));
			}
			else
			{
				TinyMCE_SmartlinkerPluginv25._setButtonColor("red", "Browser Not Suppordted");
			}
		}
		
	}

	function processResponsev30(Data)
	{
		
		var am;
		var t = TinyMCE_SmartlinkerPluginv25;
		var m = t._menu;
	
		var range = tinyMCE.selectedInstance.selection.getRng();
		
		var selection = tinyMCE.selectedInstance.selection;
		
		var i;
		t._data = Data;
		var Event = tinymce.dom.Event;
		var ed = t.editor;
		var e = t._e;

		
		
		//alert('inside processResponsev30:' + Data.NumberResults);

		if (Data.NumberResults > 0)
		{
			for (i = 0; i < Data.NumberResults; i++)
			{

				var define = '';
				var url='';
				var len;
				/*if (Data.Terms[i].Define != '' && Data.Terms[i].Define != ' ')
				{
					if (Data.Terms[i].Define.length > 70)
					{
						define = ' (' +  Data.Terms[i].Define.substr(0, 69) + '...)';
					}
					else define = ' (' +  Data.Terms[i].Define + ')';
				}
				if (Data.Terms[i].Url != '' && Data.Terms[i].Url != ' ')
				{
					if (Data.Terms[i].Url.length + define.length + Data.Terms[i].Term.length > 140)
					{
						len = 140 - (define.length + Data.Terms[i].Term.length);
						url = Data.Terms[i].Url.substr(0, len) + '...';
					}
					else url = Data.Terms[i].Url;
				}*/
				if (Data.Terms[i].Define != '' && Data.Terms[i].Define != ' ')
				{
					if (Data.Terms[i].Define.length + Data.Terms[i].Term.length + Data.Terms[i].Url.length > 140)
					{
						

						len = 140 - Data.Terms[i].Term.length;						
						counter = 20;
						for (j = 0; j <= counter; j++)
						{
							if (Data.Terms[i].Define[len-j] == ' ')
							{
								len = len - j;
								break;		
							}
						}

						len1 = Data.Terms[i].Define.substr(len, 70).length;
						if (len1 > 0)
						{
							define = ' (' +  Data.Terms[i].Define.substr(0, len) + '<br>' + Data.Terms[i].Define.substr(len, 70) + '...)';
						}
						else
						{
							define = ' (' +  Data.Terms[i].Define.substr(0, len) + ') <br>';	
						}
					}
					else define = ' (' +  Data.Terms[i].Define + ')';

				}
				if (Data.Terms[i].Url != '' && Data.Terms[i].Url != ' ')
				{
					if (Data.Terms[i].Url.length + define.length + Data.Terms[i].Term.length > 140)
					{
						len = 140 - len1;
						if (len <= Data.Terms[i].Url.length)
						{
							url = Data.Terms[i].Url.substr(0, len) + '...';
						}
						else url = Data.Terms[i].Url;
					}
					else 
					{
						len = 140 - (define.length + Data.Terms[i].Term.length);
						url = Data.Terms[i].Url.substr(0, len);
					}
				}
				am = m.addMenu({title : Data.Terms[i].Term + define + ' - ' +  url});

				am.add({title : 'Preview link', cmd : 'mceSmartlinkPreview_'+ i});	
				am.add({title : 'Hyperlink', cmd : 'mceSmartlinkHyperlink_' + i});	
				
				//am.add({title : 'Preview link', cmd : 'mceSmartlinkPreview'});
				//am.add({title : 'Hyper link', cmd : 'mceSmartlinkhyperlink'});
			}
			m.showMenu(10, 15);
			TinyMCE_SmartlinkerPluginv25._setButtonColor("green", 'Match Found for \'' + t._inputHTML + '\'');
		}
		else
		{
			if (Data.ErrorMessage != '')
			{
				TinyMCE_SmartlinkerPluginv25._setButtonColor("red", Data.ErrorMessage);
			}
			else
			{
				TinyMCE_SmartlinkerPluginv25._setButtonColor("red", 'No Match Found for \'' + t._inputHTML + '\'');
			}
		}

//alert('processResponsev305b:'+e.pageX + ':' + e.pageY);
		
		
		//Event.add(ed.getDoc(), 'click', t.hide);
		
		//Event.cancel(e);
		

		/*am = m.addMenu({title : 'Aurora (Space Science/Astronomy) - http://www.windows.ucar.edu/tour/link=/earth/Magnetosphere/aurora.html'});
			am.add({title : 'Preview link', cmd : 'JustifyLeft'});
			am = m.addMenu({title : 'Aurora (Province) - http://en.wikipedia.org/wiki/Aurora_(province)'});
			am.add({title : 'Preview link', cmd : 'JustifyLeft'});*/

        //var output=unescape(Data.output);
		//var hint = unescape(Data.hint);
//return Data;
		//var errormessage = unescape(Data.errormsg);
	}

	function processResponsev25(Data)
	{
		
		var range = tinyMCE.selectedInstance.selection.getRng();
		var selection = tinyMCE.selectedInstance.selection;
        var output=unescape(Data.output);
		var hint = unescape(Data.hint);

		var errormessage = unescape(Data.errormsg);
		
		if (errormessage == '')
		{
			
				if (hint != '' && hint.indexOf('No Match') != -1)
				{
					TinyMCE_SmartlinkerPluginv25._setButtonColor("red", hint);
					return;
				}
			
				if (output != TinyMCE_SmartlinkerPluginv25._inputHTML)
				{
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
				}
				else
				{
					
					if (hint != '' && hint.indexOf('No Match') == -1)
					{
						TinyMCE_SmartlinkerPluginv25._setButtonColor("yellow", hint);
					}
					else
					{
						TinyMCE_SmartlinkerPluginv25._setButtonColor("red", hint);
					}
										
				}
			
			
		}
		else
		{
			TinyMCE_SmartlinkerPluginv25._setButtonColor("red", errormessage);
		}

		

		return;
	}

	

	
