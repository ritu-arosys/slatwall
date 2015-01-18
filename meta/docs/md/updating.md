##Updating Slatwall
Once you have Slatwall installed, it is important to keep it up to date with the latest releases.  This ensures that you are always up to date with any new features & functionality as well as security bugs that have been fixed.  The good news is that Slatwall makes this extreamly easy.

1. Backup your Site Files & Database
2. Log into the admin
3. Navigate to **Tools / Help >> Update Slatwall**
4. You will see the current version you are on as well as the available versions to update to
5. From the dropdown you can select either the latest stable release, or latest bleeding edge release.  In addition you can also define a custom branch on github that you would like to update to by typing the name in.

| Version       | Description                                                                                                                  |
|---------------|------------------------------------------------------------------------------------------------------------------------------|
| Stable        | This version should be used by all production sites.                                                                         |
| Bleeding Edge | This version should only be used when testing on development server a new feature that is planned to be in a future release. |
| Custom        | This should only be used by advanced users, and when explicitly asked to update to a custom branch from the support forums.  |

6. Select the appropriate option and click the "Update" button.
7. Be patient because this can take several minutes.  Once the action is complete you should be redirected to the main dashboard with an "Update Successful Message"
8. You can verify that your version of Slatwall was updated by navigating to **Tools / Help >> About** and reviewing the version number.

>__IMPORTANT DEVELOPER NOTE__:  If you have made any changes to files in your slatwall instance that are outside of the "Update Safe" folders defined in the File Structure docs, there is a very high chance that those changes will be overridden so please take extream caution and always backup your work.  You should never need to make a change to Slatwall that is outside of the "Update Safe" folders.  If you don't know how to make your necessary customization inside the "Update Safe" folders, please post a question to the google group.

