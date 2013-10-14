<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Result_model extends CI_Model {

	function get_rating() {	
		$this->db->order_by('time','asc');	
		$query = $this->db->get('result_game');
		return $query->result_array();
	}
	
	function add_result($data) {
		$this->db->insert('result_game', $data);
	}
}