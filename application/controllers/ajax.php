<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Ajax extends CI_Controller {
	
	public function upd_bd()	{
		$data['name'] =  $_POST['name'];
		$data['time']= $_POST['min'] . ":" . $_POST['sec'];
		$data['date'] = date("Y-m-j H:i:s");
		
		if ($data['name'] !== 'false') {
			$this->load->model('result_model');
			$this->result_model->add_result($data);
		}
		
		$this->load->model('result_model');
        $back_value = $this->result_model->get_rating();
		echo json_encode($back_value) ;	
	}
	
	function get_db() {
		$this->load->model('result_model');
        $back_value = $this->result_model->get_rating();
		echo json_encode($back_value);
	}

}		