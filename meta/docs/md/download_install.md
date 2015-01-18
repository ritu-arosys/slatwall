##Download and Install

###Requirements

* CFML Server Version: Coldfusion 9.0.1 or Railo 4.0.1.003
* Database Engine: MySQL, Microsoft SQL or Other
* Operating System: Windows, Mac OSX, Linux

_Slatwall_ is built on top of Javas Hibernate. Theoretically any of the databases that Hibernate supports should work, but as of right now only MS SQL & MySQL are tested with every release. Use other engines at your own risk.

###Selecting Install Style

You can install Slatwall a handful of different ways. Selecting the correct option really depends on your situation and how you intend to use Slatwall. At its core you can think of Slatwall as your back-office commerce management solution. Slatwall by itself does not have any CMS built in, so if you planing to be building a public facing eCommerce website we hightly recommend selecting an option that includes a CMS.

###Standalone

This is a good option for anyone who already has a CFML engine like Adobe Coldfusion or Railo runningon your server, and either dont plan to use a CMS or plan to implement a custom CMS that we dont already have an integration built for.
Integrated w/Mura
Mura is one of the most powerful open source content management systems on the market. If you plan to roll out a public facing eCommerce site, we highly recommend this option.

###Installing

####Standalone
Navigate to [getslatwall.com] and click the _Download_ link, and select _Standalone Install_.
The file should be downloaded as a .zip file that you will need to unzip.
Once the application is unzipped, place it in your web root and configure it to run either via IIS or Apache.
Create a datasource called _Slatwall_ in your CFIDE or Railo administrator, and point it to a fresh database.
Navigate to the site in your browser and follow the steps on the screen.
 
####Integrated w/Mura
Navigate to [getslatwall.com](http://www.getslatwall.com/) and click the _Download_ link, and select _Slatwall for Mura_.
The file that is downloaded will be a .zip file, that can be installed as a plugin into mura.
Open your Mura Administrator and Navigate to Settings > Plugins.
Select the .zip file that you just downloaded and click the _Deploy_ link.
On the next page you will be presented with some settings for how you would like accounts to sync. By default we set it up so that system users sync with Slatwall but site users do not, which means that admins will exist in both systems, but the customer accounts created dont also get created in Mura.
On this page you also need to select the sites that you would like to deploy on. At least 1 site needs to be selected.
Once you have all your settings in place, press _Update_. This step may take a couple minutes as the plugin installs the latest version of Slatwall in the rootfolder of Mura.

Now that the plugin is installed you can got to Modules > Plugins > Slatwall.
Optional: Review the Mura Integration Overview to learn more about how Slatwallinteracts with Mura.
