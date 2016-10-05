<?php
// Récupération des données au format json
$jsondata = file_get_contents('all_data.json');
// Passage des données dans un tableau
$data = json_decode($jsondata, true);
// Parcours de toutes les lignes
foreach $data as $line {
	// On place dans des variables toutes les données de la ligne
	$airportresources_checkin_desks = $line['airportresources_checkin_desks'];
	$airlines_airline_name = $line['airlines_airline_name'];
	$flightnumbers_tripnumber = $line['flightnumbers_tripnumber'];
	$remark_description = $line['remark_description'];
	$airports_next_name = $line['airports_next_name'];
	$aircraft_aircrafttype_icaocode = $line['aircraft_aircrafttype_icaocode'];
	$remark_code = $line['remark_code'];
	$flightnumbers_icaoflightnumber = $line['flightnumbers_icaoflightnumber'];
	$airports_next_iatacode = $line['airports_next_iatacode'];
	$timestamps_sobt = $line['timestamps_sobt'];
	$countrytype_code = $line['countrytype_code'];
	$flightnumbers_operatortripnumber = $line['flightnumbers_operatortripnumber'];
	$gid = $line['gid'];
	$timestamps_cancellationdate = $line['timestamps_cancellationdate'];
	$airports_destination_iatacode = $line['airports_destination_iatacode'];
	$countrytype_description = $line['countrytype_description'];
	$flightnumbers_suffix = $line['flightnumbers_suffix'];
	$airports_destination_icaocode = $line['airports_destination_icaocode'];
	$flightnumbers_internalflightnumber = $line['flightnumbers_internalflightnumber'];
	$turnflightinternalid = $line['turnflightinternalid'];
	$airportresources_terminal = $line['airportresources_terminal'];
	$timestamps_atot = $line['timestamps_atot'];
	$airportresources_boarding_departurelounge = $line['airportresources_boarding_departurelounge'];
	$flightnumbers_operatoriataflightnumber = $line['flightnumbers_operatoriataflightnumber'];
	$timestamps_eobt = $line['timestamps_eobt'];
	$timestamps_modificationdate = $line['timestamps_modificationdate'];
	$airlines_airline_icaocode = $line['airlines_airline_icaocode'];
	$airports_destination_name = $line['airports_destination_name'];
	$servicetype_description = $line['servicetype_description'];
	$flightnumbers_callsign = $line['flightnumbers_callsign'];
	$last_update_fme = $line['last_update_fme'];
	$flightnumbers_operatorinternalflightnumber = $line['flightnumbers_operatorinternalflightnumber'];
	$servicetype_iatacode = $line['servicetype_iatacode'];
	$flightstatus_code = $line['flightstatus_code'];
	$flightstatus_description = $line['flightstatus_description'];
	$aircraft_aircrafttype_iatacode = $line['aircraft_aircrafttype_iatacode'];
	$airlines_operator_iatacode = $line['airlines_operator_iatacode'];
	$flightnumbers_operatorsuffix = $line['flightnumbers_operatorsuffix'];
	$publiccomment = $line['publiccomment'];
	$airportresources_checkin_checkinarea = $line['airportresources_checkin_checkinarea'];
	$airlines_airline_iatacode = $line['airlines_airline_iatacode'];
	$airlines_operator_icaocode = $line['airlines_operator_icaocode'];
	$aircraft_aircrafttype_modelname = $line['aircraft_aircrafttype_modelname'];
	$airportresources_boarding_gates = $line['airportresources_boarding_gates'];
	$flightnumbers_iataflightnumber = $line['flightnumbers_iataflightnumber'];
	$flightnumbers_operatoricaoflightnumber = $line['flightnumbers_operatoricaoflightnumber'];
	$airports_next_icaocode = $line['airports_next_icaocode'];
	$timestamps_aobt = $line['timestamps_aobt'];
	$airlines_operator_name = $line['airlines_operator_name'];

	// Requête d'insertion ou de modification dans la base
	// Si données déjà présentes (clée 'gid' existe déjà), alors le tuple est mis à jour
	// Sinon un nouveau tuple est inséré
	$req = "REPLACE INTO planeInfo (airportresources_checkin_desks, airlines_airline_name, flightnumbers_tripnumber, remark_description, airports_next_name, aircraft_aircrafttype_icaocode, remark_code, flightnumbers_icaoflightnumber, airports_next_iatacode, timestamps_sobt, countrytype_code, flightnumbers_operatortripnumber, gid, timestamps_cancellationdate, airports_destination_iatacode, countrytype_description, flightnumbers_suffix, airports_destination_icaocode, flightnumbers_internalflightnumber, turnflightinternalid, airportresources_terminal, timestamps_atot, airportresources_boarding_departurelounge, flightnumbers_operatoriataflightnumber, timestamps_eobt, timestamps_modificationdate, airlines_airline_icaocode, airports_destination_name, servicetype_description, flightnumbers_callsign, last_update_fme, flightnumbers_operatorinternalflightnumber, servicetype_iatacode, flightstatus_code, flightstatus_description, aircraft_aircrafttype_iatacode, airlines_operator_iatacode, flightnumbers_operatorsuffix, publiccomment, airportresources_checkin_checkinarea, airlines_airline_iatacode, airlines_operator_icaocode, aircraft_aircrafttype_modelname, airportresources_boarding_gates, flightnumbers_iataflightnumber, flightnumbers_operatoricaoflightnumber, airports_next_icaocode, timestamps_aobt, airlines_operator_name)
		VALUES ('$airportresources_checkin_desks', '$airlines_airline_name', '$flightnumbers_tripnumber', '$remark_description', '$airports_next_name', '$aircraft_aircrafttype_icaocode', '$remark_code', '$flightnumbers_icaoflightnumber', '$airports_next_iatacode', '$timestamps_sobt', '$countrytype_code', '$flightnumbers_operatortripnumber', '$gid', '$timestamps_cancellationdate', '$airports_destination_iatacode', '$countrytype_description', '$flightnumbers_suffix', '$airports_destination_icaocode', '$flightnumbers_internalflightnumber', '$turnflightinternalid', '$airportresources_terminal', '$timestamps_atot', '$airportresources_boarding_departurelounge', '$flightnumbers_operatoriataflightnumber', '$timestamps_eobt', '$timestamps_modificationdate', '$airlines_airline_icaocode', '$airports_destination_name', '$servicetype_description', '$flightnumbers_callsign', '$last_update_fme', '$flightnumbers_operatorinternalflightnumber', '$servicetype_iatacode', '$flightstatus_code', '$flightstatus_description', '$aircraft_aircrafttype_iatacode', '$airlines_operator_iatacode', '$flightnumbers_operatorsuffix', '$publiccomment', '$airportresources_checkin_checkinarea', '$airlines_airline_iatacode', '$airlines_operator_icaocode', '$aircraft_aircrafttype_modelname', '$airportresources_boarding_gates', '$flightnumbers_iataflightnumber', '$flightnumbers_operatoricaoflightnumber', '$airports_next_icaocode', '$timestamps_aobt', '$airlines_operator_name')";
}
?>