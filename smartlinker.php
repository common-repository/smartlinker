<?php
/*
 * Plugin Name: Smartlinker
 * Plugin URI: http://www.inetlinker.com/
 * Version: 2.1
 * Description: Smartlinker is a toolbar on the WordPress TinyMCE editor that enables you to hyperlink words and phrases in your blog. A word/phrase can be the name of a person, place or thing.
 * Author: Rakesh Sharma
 * Author URI: http://www.inetlinker.com/aboutus.html
 */


class SmartlinkerPlugin_Loader {
	function __construct() {
		$this->SmartlinkerPlugin_Loader();
	}

	function SmartlinkerPlugin_Loader() {
		$this->smartlinker_path = '/'.PLUGINDIR.'/smartlinker';				
		$this->plugin_path = "$this->smartlinker_path/tinymce";
		$this->smartlinkerplugin_path = "$this->plugin_path/jscripts";
		

		if (false !== $this->script) {
			add_filter('mce_buttons_3', array(&$this, 'add_mce_button'));
			add_filter('mce_plugins', array(&$this, 'add_mce_plugin'));			
			add_filter('mce_external_plugins', array(&$this, 'add_mce_external_plugin'));
			add_action('admin_print_scripts', array(&$this, 'enqueue_js'));
		}
	}

	function enqueue_js() {
		global $editing;
		if (!isset($editing) || !$editing || !user_can_richedit()) {
			return;
		}
		
	 
	   wp_enqueue_script('smartlinker_lib0', $this->smartlinkerplugin_path.'/JSON.js', 1);
	   wp_enqueue_script('smartlinker_lib1', $this->smartlinkerplugin_path.'/JSONRequest.js', 1);
	   wp_enqueue_script('smartlinker_lib2', $this->smartlinkerplugin_path.'/JSONRequestError.js', 1);

	   wp_enqueue_script('smartlinker_lib3', $this->smartlinkerplugin_path.'/yahoo.js', 1);

	   wp_enqueue_script('smartlinker_lib6', $this->smartlinkerplugin_path.'/event.js', 1);
	   wp_enqueue_script('smartlinker_lib7', $this->smartlinkerplugin_path.'/dom.js', 1);
	     
	   wp_enqueue_script('smartlinker_lib5', $this->smartlinkerplugin_path.'/connection.js', 1);
	   wp_enqueue_script('smartlinker_lib4', $this->smartlinkerplugin_path.'/autocomplete.js', 1);
	   	  


	   wp_enqueue_script('smartlinker_lib', $this->smartlinkerplugin_path.'/smartlinker.js', 1);
	  // wp_enqueue_script('smartlinker_tinymce', $this->plugin_path.'/editor_plugin.js', 1);

	   wp_enqueue_script('smartlinker_lib8', $this->smartlinkerplugin_path.'/smartlinkerautocomplete.js', 1);
		
		

	}
	function get_plugin_locale() {
		$locale = get_locale();	
		if (is_file(ABSPATH . $this->plugin_path . '/langs/'.$locale)) {			
			return $locale;
		}
		return 'en';
	}

	/**
     * TinyMCE (The rich edit box) Filter to add plugins
     * This is for WordPress < 2.5 only. (Applies to TinyMCE v2)
     *
     * @return array The plugins
     */
	function add_mce_plugin($plugins) {
		$plugins[] = 'smartlinker';
		return $plugins;
	}

	/**
     * TinyMCE (The rich edit box) Filter to add plugins
     * This is for WordPress >= 2.5 only. (Applies to TinyMCE v3)
     *
     * @return array The plugins
     */
    function add_mce_external_plugin($plugins)
    {
//        $plugins['smartlinker'] = plugin_url + '/editor_plugin.js';
		$plugins['smartlinker'] = get_bloginfo('wpurl').$this->plugin_path.'/editor_plugin.js';
        return $plugins;
    }
    

	function add_mce_button($buttons) {
	
		array_push($buttons, 'smartlinker_separator0');

		array_push($buttons, 'smartlink');
		array_push($buttons, 'unsmartlink');
		array_push($buttons, 'smartlinkerdir');
		array_push($buttons, 'smartlinkeroption');
		//array_push($buttons, 'smartlinkersuggestion');
		
		
	
		array_push($buttons, 'smartlinker_help');
		array_push($buttons, 'smartlinker_info');
		
		array_push($buttons, 'smartlinker_separator1');

		return $buttons;
	}

	function init() {
		$smartlinker = new SmartlinkerPlugin_Loader;
	}
}

add_action('init', array('SmartlinkerPlugin_Loader', 'init'));

?>
