CREATE DEFINER=`root`@`%` PROCEDURE `createEventWithSubscriptions`(
IN numberOfSubscriptions INT,
IN clientID VARCHAR(60), 
IN clientIdentifier VARCHAR(175),
IN clientSecret  VARCHAR(175),
IN producerSystemIdentifier VARCHAR(175), 
IN producerSystemName VARCHAR(175),
IN consumerSystemIdentifier VARCHAR(175),
IN consumerSystemName VARCHAR(175),
IN eventIdentifier VARCHAR(175),
IN eventName VARCHAR(175),
IN actionName VARCHAR(175),
IN actionIdentifier VARCHAR(175),
IN actionHttpConfiguration  mediumtext,
IN securityActionHttpConfiguration mediumtext,
IN contractIdentifier VARCHAR(175),
IN contractName VARCHAR(175))
BEGIN
	DECLARE clientInsertId int;
    DECLARE producerSystemId int;
    DECLARE consumerSystemId int;
    DECLARE eventId int;
    DECLARE subscriptionsCount int default 0;
    
	INSERT INTO OAUTH2_Clients
	(`client_id`,
	`subject_id`,
	`client_secret`,
	`identifier`)
	VALUES
	(clientID,
	1,
	clientSecret,
	clientIdentifier);
    
    SET clientInsertId = (SELECT LAST_INSERT_ID());
    
    INSERT INTO system
	(`class`,
	`identifier`,
	`name`,
	`type`,
	`description`,
	`client_id`)
	VALUES
	('producer',
	producerSystemIdentifier,
	producerSystemName,
	'select',
	'description',
	clientInsertId);

	SET producerSystemId = (SELECT LAST_INSERT_ID());

	INSERT INTO system
	(`class`,
	`identifier`,
	`name`,
	`type`,
	`description`)
	VALUES
	('consumer',
	consumerSystemIdentifier,
	consumerSystemName,
	'CRM',
	'description');

	SET consumerSystemId = (SELECT LAST_INSERT_ID());
    
    INSERT INTO `eventhos`.`event`
	(`system_id`,
	`identifier`,
	`name`,
	`operation`,
	`description`)
	VALUES
	(producerSystemId,
	eventIdentifier,
	eventName,
	'new',
	'description');

	SET eventId = (SELECT LAST_INSERT_ID());
    
    WHILE subscriptionsCount < numberOfSubscriptions DO
		BEGIN
			declare createdActionId int;
            
			INSERT INTO action
			(`system_id`,
			`identifier`,
			`name`,
			`http_configuration`,
			`operation`,
			`description`)
			VALUES
			(consumerSystemId,
			CONCAT(actionIdentifier, convert(subscriptionsCount, CHAR)),
			CONCAT(actionName, convert(subscriptionsCount, CHAR)),
			actionHttpConfiguration,
			'select',
			'description');
            
            SET createdActionId = (SELECT LAST_INSERT_ID());
            
            INSERT INTO action_security
			(`action_id`,
			`type`,
			`http_configuration`)
			VALUES
			(createdActionId,
			'custom',
			securityActionHttpConfiguration);
            
            INSERT INTO contract
			(`action_id`,
			`event_id`,
			`identifier`,
			`name`)
			VALUES
			(createdActionId,
			eventId,
			CONCAT(contractIdentifier, convert(subscriptionsCount, CHAR)),
			CONCAT(contractName, convert(subscriptionsCount, CHAR)));
		END;
		SET subscriptionsCount = subscriptionsCount + 1;
	END WHILE;
    
    select subscriptionsCount;
END