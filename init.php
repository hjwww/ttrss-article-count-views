<?php
class article_count_views extends Plugin {
	private $host;

	function init($host) {
		$this->host = $host;
	}

	function about() {
		return array(1.0,
			"flag the article as opened",
			"hjwww");
	}

	
	function get_js() {
		return file_get_contents(dirname(__FILE__) . "/init.js");
	}

	function addView() {
		$id = db_escape_string($_REQUEST['id']);

		$result = db_query("UPDATE ttrss_user_entries 
			SET viewed = true, last_viewed = NOW()
			WHERE ref_id = '$id' AND owner_uid = " . $_SESSION["uid"]);

		if (db_affected_rows($result) != 0)
			print json_encode(array("acview" => 1, "id" => $id));
	}
	
	
	function api_version() {
		return 2;
	}

}
?>
