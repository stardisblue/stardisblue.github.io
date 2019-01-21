<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"  xmlns:dyn="http://exslt.org/dynamic" version="1.0">
<xsl:output method="xml" encoding="UTF-8" />
<xsl:strip-space elements="*"/>	
	<xsl:param name="criteres" />

<!-- Fonction construction requete xpath -->	
	<xsl:template name="contruit_xpath">
		<xsl:param name="critere" />
		<xsl:param name="balisePrecedente" />
        <xsl:variable name="tete" select="substring-before($critere, '|')" />
  	    <xsl:variable name="queue" select="substring-after($critere, '|')" />
  	         <!--Tete : <xsl:value-of select="$tete"/> <br/>
  		     Queue : <xsl:value-of select="$queue"/> <br/>-->
        <xsl:variable name="BA" select="substring-before($tete, '=')" /><!--couple balise-attribut -->
  		 <xsl:variable name="valeur" select="substring-after($tete, '=')" />
  		<xsl:variable name="B" select="substring-before($BA, '-')" />
  		<xsl:variable name="A" select="substring-after($BA, '-')" />
  			     <!--
  			     Tete <xsl:value-of select="$tete"/> <br/>
  			     Queue <xsl:value-of select="$queue"/> <br/>
  			     BA <xsl:value-of select="$BA"/> <br/>
  			     Valeur <xsl:value-of select="$valeur"/> <br/><br/-->
  			     
  			<xsl:choose>
  				<xsl:when test="$B = $balisePrecedente">[@<xsl:value-of select="$A"/>='<xsl:value-of select="$valeur"/>']</xsl:when>
  				<xsl:otherwise>/<xsl:value-of select="$B"/>[@<xsl:value-of select="$A"/>='<xsl:value-of select="$valeur"/>']</xsl:otherwise>
		    </xsl:choose>

  			     
  			<xsl:choose>
  			<xsl:when test="string-length($queue) > 0">
				<xsl:call-template name="contruit_xpath">
					<xsl:with-param name="critere" select="$queue"/>
					<xsl:with-param name="balisePrecedente" select="$B"/><!-- garde memoire balise precedente pour savoir si on a un changement de balise -->
				</xsl:call-template>
			</xsl:when>
		    </xsl:choose>
				
	</xsl:template>


	<xsl:template match="/">
	    <!--xsl:value-of select="$criteres"/-->
		<xsl:variable name="xpath"> <!--xpath recupere retour de la fonction construit_xpath-->
			<xsl:call-template name="contruit_xpath">
				<xsl:with-param name="critere" select="$criteres"/>
				<xsl:with-param name="balisePrecedente" select="''"/>
			</xsl:call-template>
			</xsl:variable>	
	    <xsl:value-of select="$xpath"/>
	    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <image xlink:href="images/worldmap.png" width="800px" height="540px" />
          <xsl:for-each select="dyn:evaluate($xpath)">
          <image xlink:href="images/icon.png" x="{@x+20}" y="{@y+20}" height="30px" width="30px" />
        </xsl:for-each>
        </svg>
 		

		<!--xsl:variable name="evaluat" select="dyn:evaluate($xpath)"/-->
        <!--xsl:variable name="resultat">
		[-->
		<xsl:for-each select="dyn:evaluate($xpath)">
			<xsl:for-each select="@*">
			    <xsl:variable name="p" select="position()" />
				"<xsl:value-of select="name()"/>" : "<xsl:value-of select="."/>"
				<xsl:if test="not(last() = $p)">, </xsl:if>
			</xsl:for-each>
		}
		<xsl:if test="not(last() = position())">, </xsl:if>
		</xsl:for-each>
		
		<!--	
		]
		</xsl:variable-->

		<!-- Flux sorti -->
		<!--xsl:value-of select="$xpath"/-->
		<!--xsl:value-of select="$resultat"/-->

	
	</xsl:template>
</xsl:stylesheet>