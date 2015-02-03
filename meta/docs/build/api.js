YUI.add("yuidoc-meta", function(Y) {
   Y.YUIDoc = { meta: {
    "classes": [
        "BaseDocumentationService",
        "DocsReferenceRouter",
        "Hibachi",
        "HibachiAuditService",
        "HibachiAuthenticationService",
        "HibachiCacheService",
        "HibachiController",
        "HibachiControllerEntity",
        "HibachiControllerREST",
        "HibachiDAO",
        "HibachiEntity",
        "HibachiErrors",
        "HibachiEventService",
        "HibachiMessages",
        "HibachiObject",
        "HibachiProcess",
        "HibachiRBService",
        "HibachiScope",
        "HibachiService",
        "HibachiSession",
        "HibachiSmartlistTag",
        "HibachiTransient",
        "HibachiValidationService",
        "SlatwallDocsControllerList",
        "SlatwallDocsControllerMarkDownBody",
        "SlatwallDocsControllerMarkDownList",
        "SlatwallDocsControllerMeta",
        "docSharedService",
        "docsMDRouter",
        "main"
    ],
    "modules": [
        "Hibachi",
        "ngSlatwall",
        "slatwallDocs"
    ],
    "allModules": [
        {
            "displayName": "Hibachi",
            "name": "Hibachi",
            "description": "Hibachi is the custom framework that Slatwall is built on top of."
        },
        {
            "displayName": "ngSlatwall",
            "name": "ngSlatwall",
            "description": "This is the primary API frm which the frontend communicates with the backend"
        },
        {
            "displayName": "slatwallDocs",
            "name": "slatwallDocs",
            "description": "Handles finding and serving Coldfusion Documentation Files"
        }
    ]
} };
});