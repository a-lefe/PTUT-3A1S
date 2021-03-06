drop table if exists plane;

create table plane (
	gid integer not null,
    airportresources_checkin_desks varchar(200),
	airlines_airline_name varchar(200),
    flightnumbers_tripnumber integer,
    remark_description varchar(200),
    airports_next_name varchar(200),
	aircraft_aircrafttype_icaocode varchar(200),
    remark_code varchar(200),
    flightnumbers_icaoflightnumber varchar(200),
    airports_next_iatacode varchar(200),
    timestamps_sobt datetime,
    countrytype_code char(1),
    flightnumbers_operatortripnumber integer,
    timestamps_cancellationdate varchar(200),
    airports_destination_iatacode varchar(200),
    countrytype_description varchar(200),
    flightnumbers_suffix varchar(200),
    airports_destination_icaocode varchar(200),
    flightnumbers_internalflightnumber varchar(200),
    turnflightinternalid integer,
    airportresources_terminal char(5),
    timestamps_atot varchar(200),
    airportresources_boarding_departurelounge char(5),
    flightnumbers_operatoriataflightnumber char(7),
    timestamps_eobt datetime,
    timestamps_modificationdate datetime,
	airlines_airline_icaocode char(3),
    airports_destination_name varchar(200),
    servicetype_description varchar(200),
    flightnumbers_callsign char(8),
    last_update_fme datetime,
    flightnumbers_operatorinternalflightnumber char(8),
    servicetype_iatacode char(1),
    flightstatus_code char(3),
    flightstatus_description varchar(200),
	aircraft_aircrafttype_iatacode char(3),
	airlines_operator_iatacode char(2),
    flightnumbers_operatorsuffix varchar(200),
    publiccomment varchar(200),
    airportresources_checkin_checkinarea integer,
	airlines_airline_iatacode char(2),
    airlines_operator_icaocode char(3),
	aircraft_aircrafttype_modelname char(1),
    airportresources_boarding_gates varchar(200),
    flightnumbers_iataflightnumber char(7),
    flightnumbers_operatoricaoflightnumber char(8),
    airports_next_icaocode char(4),
    timestamps_aobt varchar(200),
    airlines_operator_name varchar(200),
    CONSTRAINT pk_plane PRIMARY KEY (gid)
);