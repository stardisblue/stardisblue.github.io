<?php

$dirJson = "../json/save.json";

$murs = $_POST['data'];

file_put_contents($dirJson, json_encode($murs, true));

?>