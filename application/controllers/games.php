<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Games extends CI_Controller {

    public function index() {
        
            $this->load->view('hello_view');
    }

    function pyatnashki() {
        $this->load->model('result_model');
        $data['ra'] = json_encode($this->result_model->get_rating());
		$this->load->view('pyatnashki_view', $data);
       	
      // $this->load->view('test_view', $data);
    }
    
    function wwww() {
        $this->load->model('result_model');
        $data = $this->result_model->get_rating();

      echo json_encode($data);
    }
    

}

?>
