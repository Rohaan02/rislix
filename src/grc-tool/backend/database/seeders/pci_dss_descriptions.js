export const PCI_DSS_DESCRIPTIONS = {
    'REQ-1.1.1': `All security policies and operational procedures that are identified in Requirement 1 are:
• Documented.
• Kept up to date.
• In use.
• Known to all affected parties.`,
    'REQ-1.2.1': `Configuration standards for NSC rulesets are:
• Defined.
• Implemented.
• Maintained.`,
    'REQ-1.2.4': `An accurate data-flow diagram(s) is maintained that meets the following:
• Shows all account data flows across systems and networks.
• Updated as needed upon changes to the environment.`,
    'REQ-1.2.8': `Configuration files for NSCs are:
• Secured from unauthorized access.
• Kept consistent with active network configurations.`,
    'REQ-1.3.1': `Inbound traffic to the CDE is restricted as follows:
• To only traffic that is necessary.
• All other traffic is specifically denied.`,
    'REQ-1.3.2': `Outbound traffic from the CDE is restricted as follows:
• To only traffic that is necessary.
• All other traffic is specifically denied.`,
    'REQ-1.3.3': `NSCs are installed between all wireless networks and the CDE, regardless of whether the wireless network is a CDE, such that:
• All wireless traffic from wireless networks into the CDE is denied by default.
• Only wireless traffic with an authorized business purpose is allowed into the CDE.`,
    'REQ-1.4.2': `Inbound traffic from untrusted networks to trusted networks is restricted to:
• Communications with system components that are authorized to provide publicly accessible services, protocols, and ports.
• Stateful responses to communications initiated by system components in a trusted network.
• All other traffic is denied.`,
    'REQ-1.5.1': `Security controls are implemented on any computing devices, including company- and employee-owned devices, that connect to both untrusted networks (including the Internet) and the CDE as follows:
• Specific configuration settings are defined to prevent threats being introduced into the entity's network.
• Security controls are actively running.
• Security controls are not alterable by users of the computing devices unless specifically documented and authorized by management on a case-by-case basis for a limited period.`,
    'REQ-2.1.1': `All security policies and operational procedures that are identified in Requirement 2 are:
• Documented.
• Kept up to date.
• In use.
• Known to all affected parties.`,
    'REQ-2.2.1': `Configuration standards are developed, implemented, and maintained to:
• Cover all system components.
• Address all known security vulnerabilities.
• Be consistent with industry-accepted system hardening standards or vendor hardening recommendations.
• Be updated as new vulnerability issues are identified, as defined in Requirement 6.3.1.
• Be applied when new systems are configured and verified as in place before or immediately after a system component is connected to a production environment.`,
    'REQ-2.2.2': `Vendor default accounts are managed as follows:
• If the vendor default account(s) will be used, the default password is changed per Requirement 8.3.6.
• If the vendor default account(s) will not be used, the account is removed or disabled.`,
    'REQ-2.2.3': `Primary functions requiring different security levels are managed as follows:
• Only one primary function exists on a system component,
OR
• Primary functions with differing security levels that exist on the same system component are isolated from each other,
OR
• Primary functions with differing security levels on the same system component are all secured to the level required by the function with the highest security need.`,
    'REQ-2.2.5': `If any insecure services, protocols, or daemons are present:
• Business justification is documented.
• Additional security features are documented and implemented that reduce the risk of using insecure services, protocols, or daemons.`,
    'REQ-2.3.1': `For wireless environments connected to the CDE or transmitting account data, all wireless vendor defaults are changed at installation or are confirmed to be secure, including but not limited to:
• Default wireless encryption keys.
• Passwords on wireless access points.
• SNMP defaults.
• Any other security-related wireless vendor defaults.`,
    'REQ-2.3.2': `For wireless environments connected to the CDE or transmitting account data, wireless encryption keys are changed as follows:
• Whenever personnel with knowledge of the key leave the company or the role for which the knowledge was necessary.
• Whenever a key is suspected of or known to be compromised.`,
    'REQ-3.1.1': `All security policies and operational procedures that are identified in Requirement 3 are:
• Documented.
• Kept up to date.
• In use.
• Known to all affected parties.`,
    'REQ-3.2.1': `Account data storage is kept to a minimum through implementation of data retention and disposal policies, procedures, and processes that include at least the following:
• Coverage for all locations of stored account data.
• Coverage for any sensitive authentication data (SAD) stored prior to completion of authorization.
• Limiting data storage amount and retention time to that which is required for legal or regulatory, and/or business requirements.
• Specific retention requirements for stored account data that defines length of retention period and includes a documented business justification.
• Processes for secure deletion or rendering account data unrecoverable when no longer needed per the retention policy.
• A process for verifying, at least once every three months, that stored account data exceeding the defined retention period has been securely deleted or rendered unrecoverable.`,
    'REQ-3.3.3': `Additional requirement for issuers and companies that support issuing services and store sensitive authentication data: Any storage of sensitive authentication data is:
• Limited to that which is needed for a legitimate issuing business need and is secured.
• Encrypted using strong cryptography.`,
    'REQ-3.5.1': `PAN is rendered unreadable anywhere it is stored by using any of the following approaches:
• One-way hashes based on strong cryptography of the entire PAN.
• Truncation (hashing cannot be used to replace the truncated segment of PAN).
– If hashed and truncated versions of the same PAN, or different truncation formats of the same PAN, are present in an environment, additional controls are in place such that the different versions cannot be correlated to reconstruct the original PAN.
• Index tokens.
• Strong cryptography with associated key-management processes and procedures.`,
    'REQ-3.5.1.2': `If disk-level or partition-level encryption (rather than file-, column-, or field-level database encryption) is used to render PAN unreadable, it is implemented only as follows:
• On removable electronic media,
OR
• If used for non-removable electronic media, PAN is also rendered unreadable via another mechanism that meets Requirement 3.5.1.`,
    'REQ-3.5.1.3': `If disk-level or partition-level encryption is used (rather than file-, column-, or field-level database encryption) to render PAN unreadable, it is managed as follows:
• Logical access is managed separately and independently of native operating system authentication and access control mechanisms.
• Decryption keys are not associated with user accounts.
• Authentication factors (passwords, passphrases, or cryptographic keys) that allow access to unencrypted data are stored securely.`,
    'REQ-3.6.1': `Procedures are defined and implemented to protect cryptographic keys used to protect stored account data against disclosure and misuse that include:
• Access to keys is restricted to the fewest number of custodians necessary.
• Key-encrypting keys are at least as strong as the data-encrypting keys they protect.
• Key-encrypting keys are stored separately from data-encrypting keys.
• Keys are stored securely in the fewest possible locations and forms.`,
    'REQ-3.6.1.1': `Additional requirement for service providers only: A documented description of the cryptographic architecture is maintained that includes:
• Details of all algorithms, protocols, and keys used for the protection of stored account data, including key strength and expiry date.
• Preventing the use of the same cryptographic keys in production and test environments.
• Description of the key usage for each key.
• Inventory of any hardware security modules (HSMs), key management systems (KMS), and other secure cryptographic devices (SCDs) used for key management, including type and location of devices.`,
    'REQ-3.6.1.2': `Secret and private keys used to protect stored account data are stored in one (or more) of the following forms at all times:
• Encrypted with a key-encrypting key that is at least as strong as the data-encrypting key, and that is stored separately from the data-encrypting key.
• Within a secure cryptographic device (SCD), such as a hardware security module (HSM) or PTS-approved point-of-interaction device.
• As at least two full-length key components or key shares, in accordance with an industry-accepted method.`,
    'REQ-3.7.4': `Key management policies and procedures are implemented for cryptographic key changes for keys that have reached the end of their cryptoperiod, as defined by the associated application vendor or key owner, and based on industry best practices and guidelines, including the following:
• A defined cryptoperiod for each key type in use.
• A process for key changes at the end of the defined cryptoperiod.`,
    'REQ-3.7.5': `Key management policies and procedures are implemented to include the retirement, replacement, or destruction of keys used to protect stored account data, as deemed necessary when:
• The key has reached the end of its defined cryptoperiod.
• The integrity of the key has been weakened, including when personnel with knowledge of a cleartext key component leaves the company, or the role for which the key component was known.
• The key is suspected of or known to be compromised. Retired or replaced keys are not used for encryption operations.`,
    'REQ-4.1.1': `All security policies and operational procedures that are identified in Requirement 4 are:
• Documented.
• Kept up to date.
• In use.
• Known to all affected parties.`,
    'REQ-4.2.1': `Strong cryptography and security protocols are implemented as follows to safeguard PAN during transmission over open, public networks:
• Only trusted keys and certificates are accepted.
• Certificates used to safeguard PAN during transmission over open, public networks are confirmed as valid and are not expired or revoked.
• The protocol in use supports only secure versions or configurations and does not support fallback to, or use of insecure versions, algorithms, key sizes, or implementations.
• The encryption strength is appropriate for the encryption methodology in use.`,
    'REQ-5.1.1': `All security policies and operational procedures that are identified in Requirement 5 are:
• Documented.
• Kept up to date.
• In use.
• Known to all affected parties.`,
    'REQ-5.2.2': `The deployed anti-malware solution(s):
• Detects all known types of malware.
• Removes, blocks, or contains all known types of malware.`,
    'REQ-5.2.3': `Any system components that are not at risk for malware are evaluated periodically to include the following:
• A documented list of all system components not at risk for malware.
• Identification and evaluation of evolving malware threats for those system components.
• Confirmation whether such system components continue to not require anti-malware protection.`,
    'REQ-5.3.2': `The anti-malware solution(s):
• Performs periodic scans and active or real-time scans.
OR
• Performs continuous behavioral analysis of systems or processes.`,
    'REQ-5.3.3': `For removable electronic media, the anti-malware solution(s):
• Performs automatic scans when the media is inserted, connected, or logically mounted,
OR
• Performs continuous behavioral analysis of systems or processes when the media is inserted, connected, or logically mounted.`,
    'REQ-6.1.1': `All security policies and operational procedures that are identified in Requirement 6 are:
• Documented.
• Kept up to date.
• In use.
• Known to all affected parties.`,
    'REQ-6.2.1': `Bespoke and custom software are developed securely, as follows:
• Based on industry standards and/or best practices for secure development.
• In accordance with PCI DSS (for example, secure authentication and logging).
• Incorporating consideration of information security issues during each stage of the software development lifecycle.`,
    'REQ-6.2.2': `Software development personnel working on bespoke and custom software are trained at least once every 12 months as follows:
• On software security relevant to their job function and development languages.
• Including secure software design and secure coding techniques.
• Including, if security testing tools are used, how to use the tools for detecting vulnerabilities in software.`,
    'REQ-6.2.3': `Bespoke and custom software is reviewed prior to being released into production or to customers, to identify and correct potential coding vulnerabilities, as follows:
• Code reviews ensure code is developed according to secure coding guidelines.
• Code reviews look for both existing and emerging software vulnerabilities.
• Appropriate corrections are implemented prior to release.`,
    'REQ-6.2.3.1': `If manual code reviews are performed for bespoke and custom software prior to release to production, code changes are:
• Reviewed by individuals other than the originating code author, and who are knowledgeable about code-review techniques and secure coding practices.
• Reviewed and approved by management prior to release.`,
    'REQ-6.2.4': `Software engineering techniques or other methods are defined and in use by software development personnel to prevent or mitigate common software attacks and related vulnerabilities in bespoke and custom software, including but not limited to the following:
• Injection attacks, including SQL, LDAP, XPath, or other command, parameter, object, fault, or injection-type flaws.
• Attacks on data and data structures, including attempts to manipulate buffers, pointers, input data, or shared data.
• Attacks on cryptography usage, including attempts to exploit weak, insecure, or inappropriate cryptographic implementations, algorithms, cipher suites, or modes of operation.
• Attacks on business logic, including attempts to abuse or bypass application features and functionalities through the manipulation of APIs, communication protocols and channels, client side functionality, or other system/application functions and resources. This includes cross-site scripting (XSS) and cross-site request forgery (CSRF).
• Attacks on access control mechanisms, including attempts to bypass or abuse identification, authentication, or authorization mechanisms, or attempts to exploit weaknesses in the implementation of such mechanisms.
• Attacks via any "high-risk" vulnerabilities identified in the vulnerability identification process, as defined in Requirement 6.3.1.`,
    'REQ-6.3.1': `Security vulnerabilities are identified and managed as follows:
• New security vulnerabilities are identified using industry-recognized sources for security vulnerability information, including alerts from international and national computer emergency response teams (CERTs).
• Vulnerabilities are assigned a risk ranking based on industry best practices and consideration of potential impact.
• Risk rankings identify, at a minimum, all vulnerabilities considered to be a high-risk or critical to the environment.
• Vulnerabilities for bespoke and custom, and third-party software (for example operating systems and databases) are covered.`,
    'REQ-6.3.3': `All system components are protected from known vulnerabilities by installing applicable security patches/updates as follows:
• Patches/updates for critical vulnerabilities (identified according to the risk ranking process at Requirement 6.3.1) are installed within one month of release.
• All other applicable security patches/updates are installed within an appropriate time frame as determined by the entity's assessment of the criticality of the risk to the environment as identified according to the risk ranking process at Requirement 6.3.1.`,
    'REQ-6.4.1': `For public-facing web applications, new threats and vulnerabilities are addressed on an ongoing basis and these applications are protected against known attacks as follows:
• Reviewing public-facing web applications via manual or automated application vulnerability security assessment tools or methods as follows:
– At least once every 12 months and after significant changes.
– By an entity that specializes in application security.
– Including, at a minimum, all common software attacks in Requirement 6.2.4.
– All vulnerabilities are ranked in accordance with Requirement 6.3.1.
– All vulnerabilities are corrected.
– The application is re-evaluated after the corrections.
OR
• Installing an automated technical solution(s) that continually detects and prevents web-based attacks as follows:
– Installed in front of public-facing web applications to detect and prevent web-based attacks.
– Actively running and up to date as applicable.
– Generating audit logs.
– Configured to either block web-based attacks or generate an alert that is immediately investigated.`,
    'REQ-6.4.2': `For public-facing web applications, an automated technical solution is deployed that continually detects and prevents web-based attacks, with at least the following:
• Is installed in front of public-facing web applications and is configured to detect and prevent web-based attacks.
• Actively running and up to date as applicable.
• Generating audit logs.
• Configured to either block web-based attacks or generate an alert that is immediately investigated.`,
    'REQ-6.4.3': `All payment page scripts that are loaded and executed in the consumer's browser are managed as follows:
• A method is implemented to confirm that each script is authorized.
• A method is implemented to assure the integrity of each script.
• An inventory of all scripts is maintained with written business or technical justification as to why each is necessary.`,
    'REQ-6.5.1': `Changes to all system components in the production environment are made according to established procedures that include:
• Reason for, and description of, the change.
• Documentation of security impact.
• Documented change approval by authorized parties.
• Testing to verify that the change does not adversely impact system security.
• For bespoke and custom software changes, all updates are tested for compliance with Requirement 6.2.4 before being deployed into production.
• Procedures to address failures and return to a secure state.`,
    'REQ-7.1.1': `All security policies and operational procedures that are identified in Requirement 7 are:
• Documented.
• Kept up to date.
• In use.
• Known to all affected parties.`,
    'REQ-7.2.1': `An access control model is defined and includes granting access as follows:
• Appropriate access depending on the entity's business and access needs.
• Access to system components and data resources that is based on users' job classification and functions.
• The least privileges required (for example, user, administrator) to perform a job function.`,
    'REQ-7.2.2': `Access is assigned to users, including privileged users, based on:
• Job classification and function.
• Least privileges necessary to perform job responsibilities.`,
    'REQ-7.2.4': `All user accounts and related access privileges, including third-party/vendor accounts, are reviewed as follows:
• At least once every six months.
• To ensure user accounts and access remain appropriate based on job function.
• Any inappropriate access is addressed.
• Management acknowledges that access remains appropriate.`,
    'REQ-7.2.5': `All application and system accounts and related access privileges are assigned and managed as follows:
• Based on the least privileges necessary for the operability of the system or application.
• Access is limited to the systems, applications, or processes that specifically require their use.`,
    'REQ-7.2.5.1': `All access by application and system accounts and related access privileges are reviewed as follows:
• Periodically (at the frequency defined in the entity's targeted risk analysis, which is performed according to all elements specified in Requirement 12.3.1).
• The application/system access remains appropriate for the function being performed.
• Any inappropriate access is addressed.
• Management acknowledges that access remains appropriate.`,
    'REQ-7.2.6': `All user access to query repositories of stored cardholder data is restricted as follows:
• Via applications or other programmatic methods, with access and allowed actions based on user roles and least privileges.
• Only the responsible administrator(s) can directly access or query repositories of stored CHD.`,
    'REQ-8.1.1': `All security policies and operational procedures that are identified in Requirement 8 are:
• Documented.
• Kept up to date.
• In use.
• Known to all affected parties.`,
    'REQ-8.2.2': `Group, shared, or generic IDs, or other shared authentication credentials are only used when necessary on an exception basis, and are managed as follows:
• ID use is prevented unless needed for an exceptional circumstance.
• Use is limited to the time needed for the exceptional circumstance.
• Business justification for use is documented.
• Use is explicitly approved by management.
• Individual user identity is confirmed before access to an account is granted.
• Every action taken is attributable to an individual user.`,
    'REQ-8.2.4': `Addition, deletion, and modification of user IDs, authentication factors, and other identifier objects are managed as follows:
• Authorized with the appropriate approval.
• Implemented with only the privileges specified on the documented approval.`,
    'REQ-8.2.7': `Accounts used by third parties to access, support, or maintain system components via remote access are managed as follows:
• Enabled only during the time period needed and disabled when not in use.
• Use is monitored for unexpected activity.`,
    'REQ-8.3.1': `All user access to system components for users and administrators is authenticated via at least one of the following authentication factors:
• Something you know, such as a password or passphrase.
• Something you have, such as a token device or smart card.
• Something you are, such as a biometric element.`,
    'REQ-8.3.4': `Invalid authentication attempts are limited by:
• Locking out the user ID after not more than 10 attempts.
• Setting the lockout duration to a minimum of 30 minutes or until the user's identity is confirmed.`,
    'REQ-8.3.5': `If passwords/passphrases are used as authentication factors to meet Requirement 8.3.1, they are set and reset for each user as follows:
• Set to a unique value for first-time use and upon reset.
• Forced to be changed immediately after the first use.`,
    'REQ-8.3.6': `If passwords/passphrases are used as authentication factors to meet Requirement 8.3.1, they meet the following minimum level of complexity:
• A minimum length of 12 characters (or IF the system does not support 12 characters, a minimum length of eight characters).
• Contain both numeric and alphabetic characters.`,
    'REQ-8.3.8': `Authentication policies and procedures are documented and communicated to all users including:
• Guidance on selecting strong authentication factors.
• Guidance for how users should protect their authentication factors.
• Instructions not to reuse previously used passwords/passphrases.
• Instructions to change passwords/passphrases if there is any suspicion or knowledge that the password/passphrases have been compromised and how to report the incident.`,
    'REQ-8.3.9': `If passwords/passphrases are used as the only authentication factor for user access (i.e., in any single-factor authentication implementation) then either:
• Passwords/passphrases are changed at least once every 90 days,
OR
• The security posture of accounts is dynamically analyzed, and real-time access to resources is automatically determined accordingly.`,
    'REQ-8.3.10': `Additional requirement for service providers only: If passwords/passphrases are used as the only authentication factor for customer user access to cardholder data (i.e., in any single-factor authentication implementation), then guidance is provided to customer users including:
• Guidance for customers to change their user passwords/passphrases periodically.
• Guidance as to when, and under what circumstances, passwords/passphrases are to be changed.`,
    'REQ-8.3.10.1': `Additional requirement for service providers only: If passwords/passphrases are used as the only authentication factor for customer user access (i.e., in any single-factor authentication implementation) then either:
• Passwords/passphrases are changed at least once every 90 days,
OR
• The security posture of accounts is dynamically analyzed, and real-time access to resources is automatically determined accordingly.`,
    'REQ-8.3.11': `Where authentication factors such as physical or logical security tokens, smart cards, or certificates are used:
• Factors are assigned to an individual user and not shared among multiple users.
• Physical and/or logical controls ensure only the intended user can use that factor to gain access.`,
    'REQ-8.5.1': `MFA systems are implemented as follows:
• The MFA system is not susceptible to replay attacks.
• MFA systems cannot be bypassed by any users, including administrative users unless specifically documented, and authorized by management on an exception basis, for a limited time period.
• At least two different types of authentication factors are used.
• Success of all authentication factors is required before access is granted.`,
    'REQ-8.6.1': `If accounts used by systems or applications can be used for interactive login, they are managed as follows:
• Interactive use is prevented unless needed for an exceptional circumstance.
• Interactive use is limited to the time needed for the exceptional circumstance.
• Business justification for interactive use is documented.
• Interactive use is explicitly approved by management.
• Individual user identity is confirmed before access to account is granted.
• Every action taken is attributable to an individual user.`,
    'REQ-8.6.3': `Passwords/passphrases for any application and system accounts are protected against misuse as follows:
• Passwords/passphrases are changed periodically (at the frequency defined in the entity's targeted risk analysis, which is performed according to all elements specified in Requirement 12.3.1) and upon suspicion or confirmation of compromise.
• Passwords/passphrases are constructed with sufficient complexity appropriate for how frequently the entity changes the passwords/passphrases.`,
    'REQ-9.1.1': `All security policies and operational procedures that are identified in Requirement 9 are:
• Documented.
• Kept up to date.
• In use.
• Known to all affected parties.`,
    'REQ-9.2.1.1': `Individual physical access to sensitive areas within the CDE is monitored with either video cameras or physical access control mechanisms (or both) as follows:
• Entry and exit points to/from sensitive areas within the CDE are monitored.
• Monitoring devices or mechanisms are protected from tampering or disabling.
• Collected data is reviewed and correlated with other entries.
• Collected data is stored for at least three months, unless otherwise restricted by law.`,
    'REQ-9.3.1': `Procedures are implemented for authorizing and managing physical access of personnel to the CDE, including:
• Identifying personnel.
• Managing changes to an individual's physical access requirements.
• Revoking or terminating personnel identification.
• Limiting access to the identification process or system to authorized personnel.`,
    'REQ-9.3.1.1': `Physical access to sensitive areas within the CDE for personnel is controlled as follows:
• Access is authorized and based on individual job function.
• Access is revoked immediately upon termination.
• All physical access mechanisms, such as keys, access cards, etc., are returned or disabled upon termination.`,
    'REQ-9.3.2': `Procedures are implemented for authorizing and managing visitor access to the CDE, including:
• Visitors are authorized before entering.
• Visitors are escorted at all times.
• Visitors are clearly identified and given a badge or other identification that expires.
• Visitor badges or other identification visibly distinguishes visitors from personnel.`,
    'REQ-9.3.4': `Visitor logs are used to maintain a physical record of visitor activity both within the facility and within sensitive areas, including:
• The visitor's name and the organization represented.
• The date and time of the visit.
• The name of the personnel authorizing physical access.
• Retaining the log for at least three months, unless otherwise restricted by law.`,
    'REQ-9.4.3': `Media with cardholder data sent outside the facility is secured as follows:
• Media sent outside the facility is logged.
• Media is sent by secured courier or other delivery method that can be accurately tracked.
• Offsite tracking logs include details about media location.`,
    'REQ-9.4.6': `Hard-copy materials with cardholder data are destroyed when no longer needed for business or legal reasons, as follows:
• Materials are cross-cut shredded, incinerated, or pulped so that cardholder data cannot be reconstructed.
• Materials are stored in secure storage containers prior to destruction.`,
    'REQ-9.4.7': `Electronic media with cardholder data is destroyed when no longer needed for business or legal reasons via one of the following:
• The electronic media is destroyed.
• The cardholder data is rendered unrecoverable so that it cannot be reconstructed.`,
    'REQ-9.5.1': `POI devices that capture payment card data via direct physical interaction with the payment card form factor are protected from tampering and unauthorized substitution, including the following:
• Maintaining a list of POI devices.
• Periodically inspecting POI devices to look for tampering or unauthorized substitution.
• Training personnel to be aware of suspicious behavior and to report tampering or unauthorized substitution of devices.`,
    'REQ-9.5.1.1': `An up-to-date list of POI devices is maintained, including:
• Make and model of the device.
• Location of device.
• Device serial number or other methods of unique identification.`,
    'REQ-9.5.1.3': `Training is provided for personnel in POI environments to be aware of attempted tampering or replacement of POI devices, and includes:
• Verifying the identity of any third-party persons claiming to be repair or maintenance personnel, before granting them access to modify or troubleshoot devices.
• Procedures to ensure devices are not installed, replaced, or returned without verification.
• Being aware of suspicious behavior around devices.
• Reporting suspicious behavior and indications of device tampering or substitution to appropriate personnel.`,
    'REQ-10.1.1': `All security policies and operational procedures that are identified in Requirement 10 are:
• Documented.
• Kept up to date.
• In use.
• Known to all affected parties.`,
    'REQ-10.2.1.5': `Audit logs capture all changes to identification and authentication credentials including, but not limited to:
• Creation of new accounts.
• Elevation of privileges.
• All changes, additions, or deletions to accounts with administrative access.`,
    'REQ-10.2.1.6': `Audit logs capture the following:
• All initialization of new audit logs, and
• All starting, stopping, or pausing of the existing audit logs.`,
    'REQ-10.2.2': `Audit logs record the following details for each auditable event:
• User identification.
• Type of event.
• Date and time.
• Success and failure indication.
• Origination of event.
• Identity or name of affected data, system component, resource, or service (for example, name and protocol).`,
    'REQ-10.4.1': `The following audit logs are reviewed at least once daily:
• All security events.
• Logs of all system components that store, process, or transmit CHD and/or SAD.
• Logs of all critical system components.
• Logs of all servers and system components that perform security functions (for example, network security controls, intrusion-detection systems/intrusion-prevention systems (IDS/IPS), authentication servers).`,
    'REQ-10.6.2': `Systems are configured to the correct and consistent time as follows:
• One or more designated time servers are in use.
• Only the designated central time server(s) receives time from external sources.
• Time received from external sources is based on International Atomic Time or Coordinated Universal Time (UTC).
• The designated time server(s) accept time updates only from specific industry-accepted external sources.
• Where there is more than one designated time server, the time servers peer with one another to keep accurate time.
• Internal systems receive time information only from designated central time server(s).`,
    'REQ-10.6.3': `Time synchronization settings and data are protected as follows:
• Access to time data is restricted to only personnel with a business need.
• Any changes to time settings on critical systems are logged, monitored, and reviewed.`,
    'REQ-10.7.1': `Additional requirement for service providers only: Failures of critical security control systems are detected, alerted, and addressed promptly, including but not limited to failure of the following critical security control systems:
• Network security controls.
• IDS/IPS.
• FIM.
• Anti-malware solutions.
• Physical access controls.
• Logical access controls.
• Audit logging mechanisms.
• Segmentation controls (if used).`,
    'REQ-10.7.2': `Failures of critical security control systems are detected, alerted, and addressed promptly, including but not limited to failure of the following critical security control systems:
• Network security controls.
• IDS/IPS.
• Change-detection mechanisms.
• Anti-malware solutions.
• Physical access controls.
• Logical access controls.
• Audit logging mechanisms.
• Segmentation controls (if used).
• Audit log review mechanisms.
• Automated security testing tools (if used).`,
    'REQ-10.7.3': `Failures of any critical security control systems are responded to promptly, including but not limited to:
• Restoring security functions.
• Identifying and documenting the duration (date and time from start to end) of the security failure.
• Identifying and documenting the cause(s) of failure and documenting required remediation.
• Identifying and addressing any security issues that arose during the failure.
• Determining whether further actions are required as a result of the security failure.
• Implementing controls to prevent the cause of failure from reoccurring.
• Resuming monitoring of security controls.`,
    'REQ-11.1.1': `All security policies and operational procedures that are identified in Requirement 11 are:
• Documented.
• Kept up to date.
• In use.
• Known to all affected parties.`,
    'REQ-11.2.1': `Authorized and unauthorized wireless access points are managed as follows:
• The presence of wireless (Wi-Fi) access points is tested for.
• All authorized and unauthorized wireless access points are detected and identified.
• Testing, detection, and identification occurs at least once every three months.
• If automated monitoring is used, personnel are notified via generated alerts.`,
    'REQ-11.3.1': `Internal vulnerability scans are performed as follows:
• At least once every three months.
• Vulnerabilities that are either high-risk or critical (according to the entity's vulnerability risk rankings defined at Requirement 6.3.1) are resolved.
• Rescans are performed that confirm all high-risk and all critical vulnerabilities (as noted above) have been resolved.
• Scan tool is kept up to date with latest vulnerability information.
• Scans are performed by qualified personnel and organizational independence of the tester exists.`,
    'REQ-11.3.1.1': `All other applicable vulnerabilities (those not ranked as high-risk vulnerabilities or critical vulnerabilities according to the entity's vulnerability risk rankings defined at Requirement 6.3.1) are managed as follows:
• Addressed based on the risk defined in the entity's targeted risk analysis, which is performed according to all elements specified in Requirement 12.3.1.
• Rescans are conducted as needed.`,
    'REQ-11.3.1.2': `Internal vulnerability scans are performed via authenticated scanning as follows:
• Systems that are unable to accept credentials for authenticated scanning are documented.
• Sufficient privileges are used for those systems that accept credentials for scanning.
• If accounts used for authenticated scanning can be used for interactive login, they are managed in accordance with Requirement 8.2.2.`,
    'REQ-11.3.1.3': `Internal vulnerability scans are performed after any significant change as follows:
• Vulnerabilities that are either high-risk or critical (according to the entity's vulnerability risk rankings defined at Requirement 6.3.1) are resolved.
• Rescans are conducted as needed.
• Scans are performed by qualified personnel and organizational independence of the tester exists (not required to be a QSA or ASV).`,
    'REQ-11.3.2': `External vulnerability scans are performed as follows:
• At least once every three months.
• By a PCI SSC Approved Scanning Vendor (ASV).
• Vulnerabilities are resolved and ASV Program Guide requirements for a passing scan are met.
• Rescans are performed as needed to confirm that vulnerabilities are resolved per the ASV Program Guide requirements for a passing scan.`,
    'REQ-11.3.2.1': `External vulnerability scans are performed after any significant change as follows:
• Vulnerabilities that are scored 4.0 or higher by the CVSS are resolved.
• Rescans are conducted as needed.
• Scans are performed by qualified personnel and organizational independence of the tester exists (not required to be a QSA or ASV).`,
    'REQ-11.4.1': `A penetration testing methodology is defined, documented, and implemented by the entity, and includes:
• Industry-accepted penetration testing approaches.
• Coverage for the entire CDE perimeter and critical systems.
• Testing from both inside and outside the network.
• Testing to validate any segmentation and scope-reduction controls.
• Application-layer penetration testing to identify, at a minimum, the vulnerabilities listed in Requirement 6.2.4.
• Network-layer penetration tests that encompass all components that support network functions as well as operating systems.
• Review and consideration of threats and vulnerabilities experienced in the last 12 months.
• Documented approach to assessing and addressing the risk posed by exploitable vulnerabilities and security weaknesses found during penetration testing.
• Retention of penetration testing results and remediation activities results for at least 12 months.`,
    'REQ-11.4.2': `Internal penetration testing is performed:
• Per the entity's defined methodology.
• At least once every 12 months.
• After any significant infrastructure or application upgrade or change.
• By a qualified internal resource or qualified external third-party.
• Organizational independence of the tester exists (not required to be a QSA or ASV).`,
    'REQ-11.4.3': `External penetration testing is performed:
• Per the entity's defined methodology.
• At least once every 12 months.
• After any significant infrastructure or application upgrade or change.
• By a qualified internal resource or qualified external third party.
• Organizational independence of the tester exists (not required to be a QSA or ASV).`,
    'REQ-11.4.4': `Exploitable vulnerabilities and security weaknesses found during penetration testing are corrected as follows:
• In accordance with the entity's assessment of the risk posed by the security issue as defined in Requirement 6.3.1.
• Penetration testing is repeated to verify the corrections.`,
    'REQ-11.4.5': `If segmentation is used to isolate the CDE from other networks, penetration tests are performed on segmentation controls as follows:
• At least once every 12 months and after any changes to segmentation controls/methods.
• Covering all segmentation controls/methods in use.
• According to the entity's defined penetration testing methodology.
• Confirming that the segmentation controls/methods are operational and effective, and isolate the CDE from all out-of-scope systems.
• Confirming effectiveness of any use of isolation to separate systems with differing security levels (see Requirement 2.2.3).
• Performed by a qualified internal resource or qualified external third party.
• Organizational independence of the tester exists (not required to be a QSA or ASV).`,
    'REQ-11.4.6': `Additional requirement for service providers only: If segmentation is used to isolate the CDE from other networks, penetration tests are performed on segmentation controls as follows:
• At least once every six months and after any changes to segmentation controls/methods.
• Covering all segmentation controls/methods in use.
• According to the entity's defined penetration testing methodology.
• Confirming that the segmentation controls/methods are operational and effective, and isolate the CDE from all out-of-scope systems.
• Confirming effectiveness of any use of isolation to separate systems with differing security levels (see Requirement 2.2.3).
• Performed by a qualified internal resource or qualified external third party.
• Organizational independence of the tester exists (not required to be a QSA or ASV).`,
    'REQ-11.5.1': `Intrusion-detection and/or intrusion-prevention techniques are used to detect and/or prevent intrusions into the network as follows:
• All traffic is monitored at the perimeter of the CDE.
• All traffic is monitored at critical points in the CDE.
• Personnel are alerted to suspected compromises.
• All intrusion-detection and prevention engines, baselines, and signatures are kept up to date.`,
    'REQ-11.5.2': `A change-detection mechanism (for example, file integrity monitoring tools) is deployed as follows:
• To alert personnel to unauthorized modification (including changes, additions, and deletions) of critical files.
• To perform critical file comparisons at least once weekly.`,
    'REQ-11.6.1': `A change- and tamper-detection mechanism is deployed as follows:
• To alert personnel to unauthorized modification (including indicators of compromise, changes, additions, and deletions) to the security impacting HTTP headers and the script contents of payment pages as received by the consumer browser.
• The mechanism is configured to evaluate the received HTTP headers and payment pages.
• The mechanism functions are performed as follows:
– At least weekly,
OR
– Periodically (at the frequency defined in the entity's targeted risk analysis, which is performed according to all elements specified in Requirement 12.3.1).`,
    'REQ-12.1.1': `An overall information security policy is:
• Established.
• Published.
• Maintained.
• Disseminated to all relevant personnel, as well as to relevant vendors and business partners.`,
    'REQ-12.1.2': `The information security policy is:
• Reviewed at least once every 12 months.
• Updated as needed to reflect changes to business objectives or risks to the environment.`,
    'REQ-12.2.1': `Acceptable use policies for end-user technologies are documented and implemented, including:
• Explicit approval by authorized parties.
• Acceptable uses of the technology.
• List of products approved by the company for employee use, including hardware and software.`,
    'REQ-12.3.1': `For each PCI DSS requirement that specifies completion of a targeted risk analysis, the analysis is documented and includes:
• Identification of the assets being protected.
• Identification of the threat(s) that the requirement is protecting against.
• Identification of factors that contribute to the likelihood and/or impact of a threat being realized.
• Resulting analysis that determines, and includes justification for, how the frequency or processes defined by the entity to meet the requirement minimize the likelihood and/or impact of the threat being realized.
• Review of each targeted risk analysis at least once every 12 months to determine whether the results are still valid or if an updated risk analysis is needed.
• Performance of updated risk analyses when needed, as determined by the annual review.`,
    'REQ-12.3.2': `A targeted risk analysis is performed for each PCI DSS requirement that the entity meets with the customized approach, to include:
• Documented evidence detailing each element specified in Appendix D: Customized Approach (including, at a minimum, a controls matrix and risk analysis).
• Approval of documented evidence by senior management.
• Performance of the targeted analysis of risk at least once every 12 months.`,
    'REQ-12.3.3': `Cryptographic cipher suites and protocols in use are documented and reviewed at least once every 12 months, including at least the following:
• An up-to-date inventory of all cryptographic cipher suites and protocols in use, including purpose and where used.
• Active monitoring of industry trends regarding continued viability of all cryptographic cipher suites and protocols in use.
• Documentation of a plan, to respond to anticipated changes in cryptographic vulnerabilities.`,
    'REQ-12.3.4': `Hardware and software technologies in use are reviewed at least once every 12 months, including at least the following:
• Analysis that the technologies continue to receive security fixes from vendors promptly.
• Analysis that the technologies continue to support (and do not preclude) the entity's PCI DSS compliance.
• Documentation of any industry announcements or trends related to a technology, such as when a vendor has announced "end of life" plans for a technology.
• Documentation of a plan, approved by senior management, to remediate outdated technologies, including those for which vendors have announced "end of life" plans.`,
    'REQ-12.4.1': `Additional requirement for service providers only: Responsibility is established by executive management for the protection of cardholder data and a PCI DSS compliance program to include:
• Overall accountability for maintaining PCI DSS compliance.
• Defining a charter for a PCI DSS compliance program and communication to executive management.`,
    'REQ-12.4.2': `Additional requirement for service providers only: Reviews are performed at least once every three months to confirm that personnel are performing their tasks in accordance with all security policies and operational procedures. Reviews include, but are not limited to, the following tasks:
• Daily log reviews.
• Configuration reviews for network security controls.
• Applying configuration standards to new systems.
• Responding to security alerts.
• Change-management processes.`,
    'REQ-12.4.2.1': `Additional requirement for service providers only: Reviews conducted in accordance with Requirement 12.4.2 are documented to include:
• Results of the reviews.
• Documented remediation actions taken for any tasks that were found to not be performed at Requirement 12.4.2.
• Review and sign-off of results by personnel assigned responsibility for the PCI DSS compliance program.`,
    'REQ-12.5.2': `PCI DSS scope is documented and confirmed by the entity at least once every 12 months and upon significant change to the in-scope environment. At a minimum, the scoping validation includes:
• Identifying all data flows for the various payment stages (for example, authorization, capture settlement, chargebacks, and refunds) and acceptance channels (for example, card-present, card-not-present, and e-commerce).
• Updating all data-flow diagrams per Requirement 1.2.4.
• Identifying all locations where account data is stored, processed, and transmitted, including but not limited to: 1) any locations outside of the currently defined CDE, 2) applications that process CHD, 3) transmissions between systems and networks, and 4) file backups.
• Identifying all system components in the CDE, connected to the CDE, or that could impact security of the CDE.
• Identifying all segmentation controls in use and the environment(s) from which the CDE is segmented, including justification for environments being out of scope.
• Identifying all connections from third-party entities with access to the CDE.
• Confirming that all identified data flows, account data, system components, segmentation controls, and connections from third parties with access to the CDE are included in scope.`,
    'REQ-12.6.2': `The security awareness program is:
• Reviewed at least once every 12 months, and
• Updated as needed to address any new threats and vulnerabilities that may impact the security of the entity's cardholder data and/or sensitive authentication data, or the information provided to personnel about their role in protecting cardholder data.`,
    'REQ-12.6.3': `Personnel receive security awareness training as follows:
• Upon hire and at least once every 12 months.
• Multiple methods of communication are used.
• Personnel acknowledge at least once every 12 months that they have read and understood the information security policy and procedures.`,
    'REQ-12.6.3.1': `Security awareness training includes awareness of threats and vulnerabilities that could impact the security of cardholder data and/or sensitive authentication data, including but not limited to:
• Phishing and related attacks.
• Social engineering.`,
    'REQ-12.8.2': `Written agreements with TPSPs are maintained as follows:
• Written agreements are maintained with all TPSPs with which account data is shared or that could affect the security of the CDE.
• Written agreements include acknowledgments from TPSPs that TPSPs are responsible for the security of account data the TPSPs possess or otherwise store, process, or transmit on behalf of the entity, or to the extent that the TPSP could impact the security of the entity's cardholder data and/or sensitive authentication data.`,
    'REQ-12.9.2': `Additional requirement for service providers only: TPSPs support their customers' requests for information to meet Requirements 12.8.4 and 12.8.5 by providing the following upon customer request:
• PCI DSS compliance status information (Requirement 12.8.4).
• Information about which PCI DSS requirements are the responsibility of the TPSP and which are the responsibility of the customer, including any shared responsibilities (Requirement 12.8.5), for any service the TPSP provides that meets a PCI DSS requirement(s) on behalf of customers or that can impact security of customers' cardholder data or sensitive authentication data.`,
    'REQ-12.10.1': `An incident response plan exists and is ready to be activated in the event of a suspected or confirmed security incident. The plan includes, but is not limited to:
• Roles, responsibilities, and communication and contact strategies in the event of a suspected or confirmed security incident, including notification of payment brands and acquirers, at a minimum.
• Incident response procedures with specific containment and mitigation activities for different types of incidents.
• Business recovery and continuity procedures.
• Data backup processes.
• Analysis of legal requirements for reporting compromises.
• Coverage and responses of all critical system components.
• Reference or inclusion of incident response procedures from the payment brands.`,
    'REQ-12.10.2': `At least once every 12 months, the security incident response plan is:
• Reviewed and the content is updated as needed.
• Tested, including all elements listed in Requirement 12.10.1.`,
    'REQ-12.10.5': `The security incident response plan includes monitoring and responding to alerts from security monitoring systems, including but not limited to:
• Intrusion-detection and intrusion-prevention systems.
• Network security controls.
• Change-detection mechanisms for critical files.
• The change-and tamper-detection mechanism for payment pages.
• Detection of unauthorized wireless access points.`,
    'REQ-12.10.7': `Incident response procedures are in place, to be initiated upon the detection of stored PAN anywhere it is not expected, and include:
• Determining what to do if PAN is discovered outside the CDE, including its retrieval, secure deletion, and/or migration into the currently defined CDE, as applicable.
• Identifying whether sensitive authentication data is stored with PAN.
• Determining where the account data came from and how it ended up where it was not expected.
• Remediating data leaks or process gaps that resulted in the account data being where it was not expected.`,
};
//# sourceMappingURL=pci_dss_descriptions.js.map