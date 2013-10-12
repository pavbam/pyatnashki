<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Test_model extends CI_Model {
	function get_1($data) {
		var $json = array("word" => "МИР", "name" => "VASYA");
		return json_encode($json);
	}
}