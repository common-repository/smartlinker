
var ACJson = function() {
	 
  var mylogger;
  var oACDS;
  var oAutoComp;
  var endFlag = false;
  var submitFlag = false;
  var submitBlock = false;
  var inAjaxCall = false;
  var theQuery = "";
  var spellFlag = false;
  var plugin_phpdir='../wp-content/plugins/smartlinker';

  var url = plugin_phpdir + "/smartlinkerautocompletepost.php";

  return {
    init: function() {
	  if (document.getElementById('terminput') == null) return;
	 

      YAHOO.util.Event.addListener("terminput", "keyup", ACJson.CheckForKeyEnterEvent);
      oACDS = new YAHOO.widget.DS_XHR(url, ["Terms", "Term"]);
  
      oACDS.responseType = YAHOO.widget.DS_XHR.TYPE_JSON;
      oACDS.connTimeout = 15000;
      oACDS.dataErrorEvent.subscribe(ACJson.errorEvent);

      var codeurl= "";
     
	  
	  codeurl = "code=ALL";
	  
      oACDS.scriptQueryAppend = codeurl;

      oAutoComp = new YAHOO.widget.AutoComplete("terminput", "sresults", oACDS);

	   	    
      oAutoComp.typeAhead = false;
      oAutoComp.allowBrowserAutocomplete = false;
      oAutoComp.forceSelection = false;
      oAutoComp.alwaysShowContainer = false;
      oAutoComp.maxResultsDisplayed = 25;
      oAutoComp.autoHighlight = false;
      oAutoComp.itemSelectEvent.subscribe(ACJson.termSelected);
      oAutoComp.dataRequestEvent.subscribe(ACJson.loadingTerms);
      oAutoComp.containerCollapseEvent.subscribe(ACJson.CheckForKeyEnterEvent);
      oAutoComp.containerExpandEvent.subscribe(ACJson.containerExpand);
      oAutoComp.dataReturnEvent.subscribe(ACJson.myOnDataReturn);
      oAutoComp.textboxFocusEvent.subscribe(ACJson.showContainer);
	
      oAutoComp.formatResult = function(aResultItem, sQuery) {
	
          var sKey = aResultItem[0];
		  
          if (sKey.toLowerCase() == sQuery.toLowerCase()) {
            if (submitFlag) {
	           submitssform(sQuery.trim().toLowerCase());
            }
            else{
              oAutoComp.setHeader("");
              oAutoComp.autoHighlight = true;
              submitBlock = false;
            }
          }
          else{
            //oAutoComp.setHeader("<div style=\"display:block;padding:3px\"><b>Please Make a Selection Below:</b><div>");
          }
	var aTermWords = new Array();
	//aTermWords = sKey.split(/[^a-zA-Z0-9_'-]+/);
	aTermWords = sKey.split();

	// user query:
	var aQuery = new Array();
	aQuery = sQuery.split(/[^a-zA-Z0-9_'-]+/);
	

	// start building bolded markup:
	var sMarkup = "<div id='ysearchresult' style='font-weight:bold; padding: 0px; border: 0px'>";

        for (var i = 0; i < aTermWords.length; ++i)
	{
          var lowerSymptomWord = (unescape(aTermWords[i].toLowerCase()));
          var termWord = aTermWords[i];

          for (var j = 0; j < aQuery.length; ++j)
	  {
            var lowerQueryWord = (unescape(aQuery[j].toLowerCase()));
            var sKeyOffset = lowerSymptomWord.indexOf(lowerQueryWord);
            if (sKeyOffset == 0)
	    {
	      // add boldface:
              var boldpart = termWord.substring(0, lowerQueryWord.length);
              var nonboldpart = termWord.substring(lowerQueryWord.length);
              termWord = "<span style='font-weight:bold; padding: 0px; border: 0px'>" + boldpart + "</span>" + nonboldpart;
              break;
            }
	  }

          sMarkup += termWord;
          if (i < aTermWords.length-1)
          {
            sMarkup += " ";
          }
        }

	sMarkup+= "</div>";

	

	return sMarkup;
 

      };
    },
    CheckForKeyEnterEvent: function(event) {
      submitFlag = event.keyCode == 13;
      submitBlock = inAjaxCall;
    },
    CheckForClickEvent: function(event) {
      submitFlag = true;
      submitBlock = inAjaxCall;
    },
    containerExpand: function() {
      submitBlock = false;
    },
    endIt: function(){
		
      endFlag = true;
      oAutoComp.setHeader("");
      oAutoComp.setBody("<b>Adding Term to List Please Wait</b>");
    },
    showContainer: function(){
		
      if(!oAutoComp.isContainerOpen() && !endFlag){		  
		if (document.getElementById('terminput').value != null)
		{
			oAutoComp._sendQuery(document.getElementById('terminput').value);
		}
        
      }
    },
    termSelected: function() {
	

			 		 submitssform(document.getElementById('terminput').value);
		

  
    },

    loadingTerms: function(sType, aArgs) {
		
      inAjaxCall = true;
      submitBlock = true;
      theQuery = aArgs[1];
    },
    closeYahoo : function(){
	
      oAutoComp.setBody("");
      document.getElementById('terminput').focus();
    },
    selectionEnforce: function(aArgs) {
		
      oAutoComp.setBody("<div id=\"statescontainerdefault\"><b>in selectionEnforce, query did not match returned item  Please <a title=\"Start Over\" href=\"javascript:clearInput()\">Start Over</a></b></div>");
      spellFlag = false;
    },
    keyEvent: function(sType, aArgs) {
      oAutoComp = aArgs[0];
    },
    errorEvent: function() {
		
      oAutoComp.autoHighlight = false;
      oAutoComp.setBody("<div id=\"statescontainerdefault\"><b>Error Retrieving Data Please <a title=\"Start Over\" href=\"javascript:clearInput()\">Start Over</a></b></div>");
      inAjaxCall = false;
      submitFlag = false;
      submitBlock = false;
      spellFlag = false;
    },
	clearInput :function(){
  document.getElementById('terminput').value = "Check for word";
  ACJson.closeYahoo();
	},
    myOnDataReturn: function(sType, aArgs) {

      oAutoComp.autoHighlight = false;
      var sQuery = aArgs[1];
      var aResults = aArgs[2];
      if (aResults.length <= 0) {
        //oAutoComp.setBody("<div id=\"statescontainerdefault\"><b>Not A Recognized Term. Please <a title=\"Start Over\" href=\"javascript:clearInput()\">Start Over</a></b></div>");
      }
      inAjaxCall = false;
      submitFlag = false;
      spellFlag = false;
    },
    timeout : 5000
  };
}();

YAHOO.util.Event.addListener(this, "load",ACJson.init);


function submitssform(term){
	 ACJson.endIt();

     var openinnewwindowval = "N";
	 if (typeof(TinyMCE_SmartlinkerPlugin) != "undefined" )
	  {
		  openinnewwindowval = TinyMCE_SmartlinkerPlugin._openinnewwindowcode[TinyMCE_SmartlinkerPlugin._current_linkoption_id];
		
	  }
	  else
	  {
		  openinnewwindowval = TinyMCE_SmartlinkerPluginv25._openinnewwindowcode[TinyMCE_SmartlinkerPluginv25._current_linkoption_id];
	  }

	  geturlfromautocomplete(term, openinnewwindowval);

}
function geturlfromautocomplete(term, openinnewwindowval)
{

	requestNumber = JSONRequest.post(
	plugin_phpdir + "/smartlinkerpost.php", 
	{
		input: term,
		code: 'ALL',
		openinnewwindow: openinnewwindowval
	}, 
		autocompletecallbackfunc
	); 

}

function autocompletecallbackfunc(requestNumber, value, exception) {
	if (exception) {

		processAutoCompleteError(exception);

	} else {


		displayUrl(value);
	}
}

function processAutoCompleteError(exception)
{
	if (typeof(TinyMCE_SmartlinkerPlugin) != "undefined" )
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
	else
	{

	}
	
	
}

function displayUrl(Data)
{
	
	var range = tinyMCE.selectedInstance.selection.getRng();
	var selection = tinyMCE.selectedInstance.selection;
	var output=unescape(Data.output);
	var hint = unescape(Data.hint);
	var url = unescape(Data.url);
	var errormessage = unescape(Data.errormsg);

	document.getElementById('terminput').value = output;
	document.getElementById('terminput').focus();
    document.getElementById('terminput').select();
	
}



function submitssform1(theForm){
	 ACJson.endIt();

}



