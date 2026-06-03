/* jshint ignore:start */
/**
 * MOCK_DATA — fixture data for all API endpoints.
 *
 * To add/change demo content edit this file only.
 * IDs must match real select-data in www/json/ (e.g. country_id 229 = USA).
 */
'use strict';

angular.module('sylphairMock').constant('MOCK_DATA', (function () {

  var pilotUser = {
    id: 1,
    email: 'pilot@demo.com',
    role: 'pilot',
    finished_registration: true,
    auth_token: 'mock-token-pilot-xyz',
    first_name: 'John',
    last_name: 'Smith',
    gender: 'M',
    date_of_birth: '1985-06-15',
    nationality_id: 229,
    avatar: 'img/default-user-image.png',
    pilot: {
      id: 1,
      user_id: 1,
      position: 'pilot',
      gender: 'M',
      date_of_birth: '1985-06-15',
      nationality_id: 229,
      english_proficiency: 1,
      total_flight_hours: 3500,
      licenses: [
        { id: 1, type_of_license: 'ATP', issuance_authority: 'FAA', license_number: 'ATP-001', date_of_issue: '2010-03-01', date_of_expiry: '2026-03-01' }
      ],
      medical_certificates: [
        { id: 1, medical_type: 'Class 1', issuance_authority: 'FAA', date_of_issue: '2022-01-15', date_of_expiry: '2025-01-15' }
      ],
      flight_hours_attributes: [
        { id: 1, aircraft_id: 53, total_hours: 2000, time_on_type: 500 }
      ],
      type_ratings_attributes: [
        { id: 1, aircraft_id: 53, date_of_issue: '2015-05-01', date_of_expiry: '2027-05-01' },
        { id: 2, aircraft_id: 9, date_of_issue: '2018-08-01', date_of_expiry: '2028-08-01' }
      ],
      international_experience_attributes: [
        { id: 1, country_id: 77, years: 2 },
        { id: 2, country_id: 75, years: 1 }
      ],
      language_proficiencies_attributes: [
        { id: 1, language_id: 1, level: 'native' },
        { id: 2, language_id: 2, level: 'intermediate' }
      ],
      passport_attributes: {
        id: 1,
        country_id: 229,
        passport_number: 'A12345678',
        date_of_issue: '2018-09-01',
        date_of_expiry: '2028-09-01'
      },
      visa_attributes: [
        { id: 1, country_id: 77, date_of_issue: '2020-01-01', date_of_expiry: '2025-01-01' }
      ],
      unavailable_days: [],
      availability_attributes: [
        { id: 1, start_date: '2026-07-01', end_date: '2026-12-31' }
      ],
      contract_types: ['employment', 'freelancer']
    },
    jobs_applied: [
      {
        id: 10,
        position: 'pilot',
        contract_type: 'employment',
        monthly_salary: 12000,
        country_id: 229,
        start_date: '2026-08-01',
        end_date: '2027-07-31',
        aircraft_owner_id: 2,
        aircraft_id: 53
      },
      {
        id: 11,
        position: 'co-pilot',
        contract_type: 'freelancer',
        monthly_salary: 9500,
        country_id: 77,
        start_date: '2026-09-01',
        end_date: '2027-02-28',
        aircraft_owner_id: 2,
        aircraft_id: 9
      }
    ]
  };

  var aomUser = {
    id: 2,
    email: 'aom@demo.com',
    role: 'aircraft owner',
    finished_registration: true,
    auth_token: 'mock-token-aom-xyz',
    first_name: 'Alice',
    last_name: 'Johnson',
    avatar: 'img/default-user-image.png',
    aircraft_owner: {
      id: 2,
      user_id: 2,
      jobs: [
        {
          id: 9,
          aircraft_owner_id: 2,
          position: 'pilot',
          contract_type: 'employment',
          time_on_type: 500,
          start_date: '2026-08-01',
          end_date: '2027-07-31',
          monthly_salary: 15000,
          days_active: 120,
          country_id: 229,
          job_type: 'pilot job',
          aircraft_id: 53,
          allowance: { housing: 'true', transportation: 'true', education: 'false', other: 'false', description: 'Housing provided.' }
        },
        {
          id: 8,
          aircraft_owner_id: 2,
          position: 'co-pilot',
          contract_type: 'freelancer',
          time_on_type: 200,
          start_date: '2026-07-01',
          end_date: '2026-12-31',
          monthly_salary: 8000,
          days_active: 60,
          country_id: 77,
          job_type: 'mechanic job',
          aircraft_id: 9,
          allowance: { housing: 'false', transportation: 'true', education: 'false', other: 'false', description: '' }
        }
      ]
    },
    jobs_applied: []
  };

  var mechanicUser = {
    id: 3,
    email: 'mechanic@demo.com',
    role: 'mechanic',
    finished_registration: true,
    auth_token: 'mock-token-mechanic-xyz',
    first_name: 'Mike',
    last_name: 'Wilson',
    avatar: 'img/default-user-image.png',
    crew_member: {
      id: 3,
      user_id: 3,
      role: 'mechanic',
      position: ['airframe', 'avionics'],
      nationality_id: 57,
      date_of_birth: '1980-03-20',
      gender: 'M',
      licenses: [
        { id: 1, issuance_authority: 'FAA', license_number: 'AME-555', date_of_issue: '2012-06-01', date_of_expiry: '2026-06-01' }
      ],
      unavailable_days: [],
      availability_attributes: []
    },
    jobs_applied: []
  };

  var attendantUser = {
    id: 4,
    email: 'attendant@demo.com',
    role: 'flight attendant',
    finished_registration: true,
    auth_token: 'mock-token-attendant-xyz',
    first_name: 'Sara',
    last_name: 'Davis',
    avatar: 'img/default-user-image.png',
    crew_member: {
      id: 4,
      user_id: 4,
      role: 'flight attendant',
      position: 'flight attendant',
      nationality_id: 77,
      date_of_birth: '1992-11-05',
      gender: 'F',
      unavailable_days: [],
      availability_attributes: []
    },
    jobs_applied: []
  };

  // country_id reference: 229=USA 77=UK 75=France 68=Spain 57=Germany 38=Canada 13=Australia
  // aircraft_id reference: 9=AIRBUS 320 53=BOEING 737 54=BOEING 747
  var mockPilots = [
    {
      id: 1,
      user_id: 1,
      position: 'pilot',
      gender: 'M',
      date_of_birth: '1985-06-15',
      nationality_id: 229,
      english_proficiency: 1,
      total_flight_hours: 3500,
      licenses: [{ id: 1, type_of_license: 'ATP', issuance_authority: 'FAA' }],
      medical_certificates: [{ id: 1, medical_type: 'Class 1' }],
      type_ratings_attributes: [{ id: 1, aircraft_id: 53 }],
      international_experience_attributes: [{ id: 1, country_id: 77 }],
      language_proficiencies_attributes: [{ id: 1, language_id: 1, level: 'native' }],
      passport_attributes: { country_id: 229, passport_number: 'A12345678', date_of_expiry: '2028-09-01' },
      availability_attributes: [{ start_date: '2026-07-01', end_date: '2026-12-31' }],
      unavailable_days: [],
      flight_hours_attributes: [{ aircraft_id: 53, total_hours: 2000 }],
      contract_types: ['employment', 'freelancer'],
      first_name: 'John',
      last_name: 'Smith',
      user: { id: 1, first_name: 'John', last_name: 'Smith', avatar: 'img/default-user-image.png' }
    },
    {
      id: 5,
      user_id: 5,
      position: 'co-pilot',
      gender: 'F',
      date_of_birth: '1990-02-28',
      nationality_id: 68,
      english_proficiency: 2,
      total_flight_hours: 1200,
      licenses: [{ id: 2, type_of_license: 'CPL', issuance_authority: 'EASA' }],
      medical_certificates: [{ id: 2, medical_type: 'Class 1' }],
      type_ratings_attributes: [],
      international_experience_attributes: [],
      language_proficiencies_attributes: [{ id: 2, language_id: 1, level: 'advanced' }],
      passport_attributes: { country_id: 68, passport_number: 'B98765432', date_of_expiry: '2027-04-15' },
      availability_attributes: [{ start_date: '2026-08-01', end_date: '2027-01-31' }],
      unavailable_days: [],
      flight_hours_attributes: [{ aircraft_id: 9, total_hours: 1200 }],
      contract_types: ['freelancer'],
      first_name: 'Maria',
      last_name: 'Garcia',
      user: { id: 5, first_name: 'Maria', last_name: 'Garcia', avatar: 'img/default-user-image.png' }
    },
    {
      id: 6,
      user_id: 6,
      position: 'pilot',
      gender: 'M',
      date_of_birth: '1978-09-10',
      nationality_id: 38,
      english_proficiency: 1,
      total_flight_hours: 8000,
      licenses: [
        { id: 3, type_of_license: 'ATP', issuance_authority: 'Transport Canada' },
        { id: 4, type_of_license: 'CPL', issuance_authority: 'Transport Canada' }
      ],
      medical_certificates: [{ id: 3, medical_type: 'Class 1' }],
      type_ratings_attributes: [{ id: 2, aircraft_id: 54 }],
      international_experience_attributes: [{ id: 2, country_id: 229 }, { id: 3, country_id: 13 }],
      language_proficiencies_attributes: [
        { id: 3, language_id: 1, level: 'native' },
        { id: 4, language_id: 3, level: 'basic' }
      ],
      passport_attributes: { country_id: 38, passport_number: 'C11223344', date_of_expiry: '2029-01-01' },
      availability_attributes: [{ start_date: '2026-09-01', end_date: '2027-08-31' }],
      unavailable_days: [],
      flight_hours_attributes: [
        { aircraft_id: 53, total_hours: 5000 },
        { aircraft_id: 54, total_hours: 3000 }
      ],
      contract_types: ['employment'],
      first_name: 'Robert',
      last_name: 'Chen',
      user: { id: 6, first_name: 'Robert', last_name: 'Chen', avatar: 'img/default-user-image.png' }
    }
  ];

  var mockCrewMembers = [
    {
      id: 3,
      user_id: 3,
      role: 'mechanic',
      position: ['airframe', 'avionics'],
      nationality_id: 57,
      gender: 'M',
      date_of_birth: '1980-03-20',
      licenses: [{ id: 1, issuance_authority: 'FAA', license_number: 'AME-555' }],
      availability_attributes: [{ start_date: '2026-07-01', end_date: '2026-12-31' }],
      unavailable_days: [],
      first_name: 'Mike',
      last_name: 'Wilson',
      user: { id: 3, first_name: 'Mike', last_name: 'Wilson', avatar: 'img/default-user-image.png' }
    },
    {
      id: 4,
      user_id: 4,
      role: 'flight attendant',
      position: 'flight attendant',
      nationality_id: 77,
      gender: 'F',
      date_of_birth: '1992-11-05',
      availability_attributes: [{ start_date: '2026-08-01', end_date: '2027-03-31' }],
      unavailable_days: [],
      first_name: 'Sara',
      last_name: 'Davis',
      user: { id: 4, first_name: 'Sara', last_name: 'Davis', avatar: 'img/default-user-image.png' }
    },
    {
      id: 7,
      user_id: 7,
      role: 'mechanic',
      position: ['power plant', 'sheet metal'],
      nationality_id: 68,
      gender: 'M',
      date_of_birth: '1975-07-14',
      licenses: [{ id: 2, issuance_authority: 'EASA', license_number: 'AME-777' }],
      availability_attributes: [{ start_date: '2026-09-01', end_date: '2027-06-30' }],
      unavailable_days: [],
      first_name: 'Carlos',
      last_name: 'Rodriguez',
      user: { id: 7, first_name: 'Carlos', last_name: 'Rodriguez', avatar: 'img/default-user-image.png' }
    }
  ];

  var mockJobs = [
    {
      id: 9,
      aircraft_owner_id: 2,
      position: 'pilot',
      contract_type: 'employment',
      time_on_type: 500,
      start_date: '2026-08-01',
      end_date: '2027-07-31',
      monthly_salary: 15000,
      days_active: 120,
      country_id: 229,
      job_type: 'pilot job',
      aircraft_id: 53,
      allowance: { housing: 'true', transportation: 'true', education: 'false', other: 'false', description: 'Housing provided.' }
    },
    {
      id: 10,
      aircraft_owner_id: 3,
      position: 'co-pilot',
      contract_type: 'freelancer',
      time_on_type: 200,
      start_date: '2026-07-01',
      end_date: '2026-12-31',
      monthly_salary: 8000,
      days_active: 60,
      country_id: 77,
      job_type: 'pilot job',
      aircraft_id: 9,
      allowance: { housing: 'false', transportation: 'true', education: 'false', other: 'false', description: '' }
    },
    {
      id: 11,
      aircraft_owner_id: 4,
      position: 'pilot',
      contract_type: 'employment',
      time_on_type: 1000,
      start_date: '2026-09-01',
      end_date: '2027-08-31',
      monthly_salary: 18000,
      days_active: 200,
      country_id: 75,
      job_type: 'pilot job',
      aircraft_id: 54,
      allowance: { housing: 'true', transportation: 'true', education: 'true', other: 'false', description: 'Full package.' }
    }
  ];

  var mockConversations = [
    {
      id: 1,
      sender_id: 1,
      recipient_id: 2,
      sender_data: { first_name: 'John', last_name: 'Smith', id: 1 },
      recipient_data: { first_name: 'Alice', last_name: 'Johnson', id: 2 },
      last_message: 'Looking forward to hearing from you!',
      updated_at: '2026-06-01T10:30:00Z'
    },
    {
      id: 2,
      sender_id: 3,
      recipient_id: 1,
      sender_data: { first_name: 'Mike', last_name: 'Wilson', id: 3 },
      recipient_data: { first_name: 'John', last_name: 'Smith', id: 1 },
      last_message: 'Are you available next month?',
      updated_at: '2026-05-28T14:00:00Z'
    }
  ];

  var mockConversationDetail = {
    id: 1,
    sender_id: 1,
    recipient_id: 2,
    sender_data: { first_name: 'John', last_name: 'Smith', id: 1 },
    recipient_data: { first_name: 'Alice', last_name: 'Johnson', id: 2 },
    is_last_page: true,
    messages: [
      { id: 1, user_id: 2, payload: { body: 'Hi John, I saw your profile and I am impressed!' }, created_at: '2026-06-01T09:00:00Z' },
      { id: 2, user_id: 1, payload: { body: 'Thank you Alice, I would love to discuss the opportunity.' }, created_at: '2026-06-01T09:15:00Z' },
      { id: 3, user_id: 2, payload: { body: 'Great! Can we schedule a call for next week?' }, created_at: '2026-06-01T09:20:00Z' },
      { id: 4, user_id: 1, payload: { body: 'Looking forward to hearing from you!' }, created_at: '2026-06-01T10:30:00Z' }
    ]
  };

  return {
    users: {
      'pilot': pilotUser,
      'aircraft owner': aomUser,
      'mechanic': mechanicUser,
      'flight attendant': attendantUser
    },
    pilots: mockPilots,
    crew_members: mockCrewMembers,
    jobs: mockJobs,
    conversations: mockConversations,
    conversation_detail: mockConversationDetail,
    aircrafts: [
      { id: 9,   name: 'AIRBUS 320' },
      { id: 11,  name: 'AIRBUS 330' },
      { id: 14,  name: 'AIRBUS 380' },
      { id: 53,  name: 'BOEING 737' },
      { id: 54,  name: 'BOEING 747' },
      { id: 57,  name: 'BOEING 777' },
      { id: 58,  name: 'BOEING 787' },
      { id: 73,  name: 'BOMBARDIER CRJ 900' },
      { id: 80,  name: 'BOMBARDIER GLEX' },
      { id: 145, name: 'GULFSTREAM G 500/550' },
      { id: 168, name: 'PILATUS PC 12' }
    ]
  };

})());
