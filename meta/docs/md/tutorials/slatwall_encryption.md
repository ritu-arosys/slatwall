##Usage & Conventions##
For a property that is to have its generic encryption process handled automatically a few conventions must be followed. The original property intended to be encrypted named {propertyName} is the property that stores the unencrypted value. The following property declarations in an entity demonstrate the naming conventions required by the encryption/decryption process:
 
* property name="{propertyName}";
* property name="{propertyName}Encrypted";
* property name="{propertyName}EncryptedGenerator";
* property name="{propertyName}EncryptedDateTime";


Storing the encrypted value of the original property
HibachiEntity.setupEncryptedProperties() is a method designated to handle that actual encrypting of properties of the entity. If left unimplemented encryption will not automatically take place for the entity’s encrypted properties. The logic to be implemented in the HibachiEntity.setupEncryptedProperties() method should determine under what conditions the HibachiEntity.encryptProperty(‘{propertyName}’) should be explicitly invoked for all of the defined encrypted properties.
 
Automatically Trigger Property Encryption
HibachiEntity.setupEncryptedProperties() is automatically triggered  from within the HibachiTransient.afterPopulate() method since this is a common point in the lifecycle when a property’s value is usually needing to be encrypted and set. The corresponding {propertyName}Encrypted property should be set by manually invoking HibachiEntity.encryptProperty(‘{propertyName}’) for all encrypted properties of the entity. The HibachiEntity.encryptProperty(‘{propertyName}’) automatically handles setting the {propertyName}EncryptedGenerator and {propertyName}EncryptedDatTime properties of the entity.
 
####Manually Trigger Property Encryption####
In some cases HibachiEntity.setupEncryptedProperties() may need to be invoked manually at some point after HibachiTransient.afterPopulate() has been invoked. This could be implemented in the setter method of the encrypted property {propertyName} to trigger the encryption process for the entity when required. HibachiEntity.setupEncryptedProperties() should be implemented in such a manner that repeated invocations should not cause undesired behavior or issues.
Retrieving the decrypted property value of the original property
Decrypting a property value is very straightforward and simple. Manually invoking the HibachiEntity.decryptProperty(‘{propertyName’) method within the getter method of the unencrypted property {propertyName} is commonly how and when an encrypted property value is decrypted.



##Encryption Utility & Algorithm##
###Password Based Key Derivation###
A password (or multiple passwords) is stored on the file system in a single file represented as a JSON struct. For each password object representation there are three keys associated: password, iterationCount, and createdDateTime.  The values of password and createdDateTime are self-documenting. The iterationCount value is a quantity which instructs the key generation process with the total number of sequences to iterate through the hashing process (ie. passing the current resulting hash output as the input into the next hashing iteration). Implementing iterative hashing to derive encryption keys adds another layer of less predictable complexity to the encryption/decryption algorithm. NOTE: See HibachiUtilityService.generatePasswordBasedEncryptionKey() to see implementation of hashing algorithm used to derive encryption keys.
 
A unique encryption key is generated using three inputs: the password, an iterationCount, and a salt value. The salt value is intended to be populated with a unique string such as a UUID. Entities with encrypted properties store and retrieve this salt value from the uniquely generated {propertyName}EncryptedGenerator property. As long as the salt differs this allows every encrypted property/value to be encrypted with a unique encryption key to increase the difficulty of decryption if database state and values are ever compromised.
 
###Encryption Password File###
The contents of the file where the passwords are stored is also encrypted using a hard-coded statically defined encryption key which can be found within the HibachiUtilityService.writeEncryptionPasswordFile() method. If the statically defined encryption key changes then the passwords cannot be retrieved. The encrypted data will effectively be locked in an encrypted state that can’t be decrypted in a simple manner if at all.
 
###Encryption and Decryption of Values###
All values encrypted will use an encryption derived using the latest password to encrypt the value. If a new password has been added since a value was last encrypted (effectively using a outdated and different encryption key) then the HibachiUtilityService.decryptValue() method will further iterate through all the existing passwords to generate an encryption key and attempt to decrypt starting with the latest password.
 
###Handling Legacy Encryption Key###
Special handling takes place when the clear-text legacy key file is found and read. The contents are converted into the required format and integrated into the encryption password file specially denoted within the password file. The decryption process must be able to distinguish and adjust its behavior whether it is working with a password or a legacy key. After the encryption password file has absorbed the legacy key file the legacy key file is deleted from the file system for obvious security reasons.



###Core Methods###

* HibachiUtilitySerivce.generatePasswordBasedEncryptionKey()
Derives the encryption key using the combination of password, generator, and iteration count.

* HibachiUtilityService.createDefaultEncryptionPasswordData()
Creates and returns struct with a randomly generated password and iterationCount.

* HibachiUtilityService.getEncryptionPasswordArray()
Password data are order descending from newest to oldest.

* HibachiUtilityService.addEncryptionPasswordData()
Appends new password data to encryption password file.

* HibachiUtilityService.encryptValue()
Encrypts a value using the latest password and provided salt.

* HibachiUtilityService.decryptValue()
Decrypts a value first by attempting to use latest password data (ie. 
HibachiUtilityService.getEncryptionPasswordArray()) and then remaining passwords until it is either successful or exhaustion because all possibilities have been attempted.

* HibachiUtilityService.reencryptData()
Handles reencrypting data of all entities that have any number of encrypted properties. Reencryption can be limited by batch size.

* HibachiEntity.setupEncryptedProperties()
Method that should be implemented by entity to invoke all necessary encryptProperty() calls under any possible conditions.

* HibachiEntity.encryptProperty()
Handles encrypting an entity property based up conventions.

* HibachiEntity.decryptProperty()
Handles decrypting an entity property based up conventions.

* HibachiEntity.getEncryptedPropertiesStruct()
Returns a struct of properties which also have the additional three required fields 
	* {propertyName}Encrypted, 
	* {propertyName}EncryptedGenerator, and 
	* {propertyName}EncryptedDateTime.

* HibachiEntity.getEncryptedPropertiesExistFlag()
Returns whether HibachiEntity.getEncryptedPropertiesStruct() has at least one element.
