<?php

/**
 * Users controller class
 *
 * @package \app\controllers
 * @author Richard Neil Roque
 **/
namespace app\controllers;

class Users extends \base\Controller
{
    public $layout = 'two-column';
	public function getIndex()
	{	
		$res = $this->getResponse();		
		$view = $this->getView('list');		
		$res->setView($view);
		$this->layout = "main";
		return $res;
	}
	
	
} 
// END class 