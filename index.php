<?php

define('DS', DIRECTORY_SEPARATOR);
define('APP_PATH', __DIR__.DS."app");


$loader = require_once "vendor/autoload.php";
$loader->set("app", __DIR__);
$loader->set("base", "/Users/richardroque/www/sandbox/simplemvc");

$req = \base\Request::getInstance();
$app = new \base\Application();
echo $app->process($req);