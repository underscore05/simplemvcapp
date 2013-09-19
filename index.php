<?php

define('DS', DIRECTORY_SEPARATOR);
define('APP_PATH', __DIR__.DS."app");

$loader = require_once("vendor/autoload.php");


$config = require_once('app/config/main.php');


//require_once("vendor/Composer/ClassLoader.php");
//$loader = new \Composer\Autoload\ClassLoader();
$loader->set("app", dirname($config['basePath']));
$loader->set("base", "/Users/richardroque/www/sandbox/simplemvc");
$loader->register();

$req = \base\Request::getInstance();
$app = new \base\Application();
echo $app->process($req);