
<!--<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">-->
<?php
//header("Content-type: image/svg+xml");
// Load the XML source
//$parametres = str_replace("&","|",urldecode ($_server['Query_String]))."|";
//$xml = new DOMDocument;
//$xml->load('musee.xml');

//$xsl = new DOMDocument;
//$xsl->load('geo.xsl');

// Configure the transformer
//$proc = new XSLTProcessor;
//$proc = setParametres(null,'criteres',$parametres);
//$proc->importStyleSheet($xsl); // attach the xsl rules

//echo $proc->transformToXML($xml);

        $uttl = htmlentities($_SERVER['QUERY_STRING']);
        $uttl=str_replace("é","e","$uttl");
        //echo $uttl;

	$doc_xml = new DOMDocument();
	$doc_xml->load('musee.xml');//chargment de donnee.xml sous forme d'arbre DOM

	$doc_xsl = new DOMDocument();
	$doc_xsl->load('plan.xsl');//chargment de plan.xsl sous forme d'arbre DOM

	$proc = new XsltProcessor();//cree interprete
	$proc->importStylesheet($doc_xsl);

	/** remplace & -> | et + -> ' ' **/
	$queryString = str_replace("&", "|", $_SERVER['QUERY_STRING']);
	$queryString = str_replace("+", " ", $queryString);
	$queryString = $queryString.'|';

	$proc->setParameter(null, 'criteres', $queryString);
     // echo $queryString;	
	//$handle = fopen("objets.json", "w+");
	$chaine = $proc->transformToXML($doc_xml);//donne musee.xml a la feuille xsl + affiche flux resultat sur sortie standart
	echo $chaine;
	//fwrite($handle, $chaine);
	//fclose($handle);
	//header('Location: /musee.xml');

?>

