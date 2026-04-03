import { environment } from '../environments/environment';

export const API_BASE_URL = environment.apiUrl;

export const Apiendpoints = {
  MASTER_UNIT: 'master/unit',
  MASTER_COMMANDS: 'master/command',
  MASTER_COMPARTMENT: 'master/compartment',
  MASTER_CATEGORY: 'master/category/',
  AUTHORITY: 'master/ops-authority/',
  OVERSEEING_TEAM: '',
  PROPULSION: '',
  BER_CERTIFICATE: 'shipmodule/ber-certificate/',
  SHIP_WEIGHT_MANAGEMENT: 'shipmodule/ship-weight-management/',
  IN_378: 'shipmodule/in-378',
  MASTER_REFITS: 'master/refits/',
  BOATS: '',
  BOAT_HISTORY_SHEET: '',

  MASTER_CLASS: 'master/class',
  MASTER_COUNTRY: 'master/countries/',
  MASTER_STATION: 'master/stations/',
  MASTER_STATE: 'master/states/',
  MASTER_CITY: 'master/cities/',
  MASTER_CLUSTER: 'master/clusters/',
  MASTER_LOCATION: 'master/locations/',
  MASTER_MODULE: 'master/modules/',
  MASTER_SUB_MODULE: 'master/sub_module',
  MASTER_SUB_MODULE_DETEAILS: 'master/sub_module/details',

  MASTER_BOAT_SPECIFICATION: 'master/boat-specifications/',
  MASTER_BOAT_BUILDER: 'master/boat-builders/',
  MASTER_ENGINE_OEM: 'master/engine-oems/',
  MASTER_BOAT_DETAILS: 'master/boat-details/',
  CONTENT_TYPE: 'master/content-types/dropdown/',
  MASTER_ORDER_BOAT_DETAILS: 'order-boats/',
  MASTER_BOAT_REAPPROPRIATIONS: 'boat-appropriations/',

  ICCP_PART_ONE: 'shipmodule/iccp-returns-part-one/iccp-measurements/',
  MASTER_ANODE: 'master/anodes/',
  MASTER_REFERENCE_ELECTRODES: 'master/reference-electrodes/',
  MASTER_DOCKYARD: 'master/dockyards/',
  MASTER_SURVEY_CYCLE: 'master/survey-cycle/',
  MASTER_UNIT_TYPE: 'master/unittypes/',
  // ICCP_PART_ONE: 'shipmodule/iccp-returns-part-one/quarterly-hull-potential/',
  MASTER_ANODES: 'master/anodes/',

  //--------------------------------------- HITU FORMS  ----------------------------------

  HVAC_PHASE1: 'hitumodule/hvac-phase1/',
  WATER_TIGHT_DOOR: 'hitumodule/wt-door/',
  WATER_TIGHT_HATCHES: 'hitumodule/wt-hatches/',
  EMERGENCY_ESCAPE_HATCH: 'hitumodule/escape-hatches/',

  MASTER_UIG: 'master/uig-master/',

  // MASTER
  MASTERS_DROPDOWNS: 'master/dropdowns/',
  MASTERS_DROPDOWN_VALUE: 'master/dropdown-values/',

  // LOGIN AND PERMISSION
  ACCESS_PERMISSIONS: 'access/get-permissions/',

  MASTER_GLOBAL_SECTION: 'master/global_section',
  MASTER_GLOBAL_SUB_SECTION: 'master/global_sub_section',

  MASTER_GLOBAL_SUB_SUB_SECTION: 'master/global_sub_sub_section',

  MASTER_STATUS: 'master/status',

  MASTER_PROJECT: 'master/project',
  MASTER_PROJECT_TYPE: 'master/project_type',
  MASTER_PROJECT_TYPE_CREATE: 'master/project_type/details',


  MASTER_MESSAGES: 'master/messages_master',

  MASTER_KMC: 'master/KnowledgeManagementCenter',

  MASTER_ILMS_SPARE: 'master/ilms-spare/',

  MASTER_SYSTEM: 'master/system',

  MASTER_SSS_SECTION: 'transaction/sss_map',

  MASTER_EQUIPMENT: 'master/equipment',

  MASTER_VENDOR: 'master/vendors',

  MASTER_ILMS_EQUIPMENT: 'master/ilms-equipment',

  MASTER_SOTR_TYPE: 'master/sotr-type-master',

  MASTER_SHIP: 'master/ship',

  MASTER_MASSAGE_CREATE: 'master/messages-create',

  MASTER_DIRECTORATE_CREATE: 'master/unit/details',

  MASTER_COMMOAND_CREATE: 'master/command/details',

  MASTER_STATUS_CREATE: 'master/status/details',

  MASTER_CLASS_CREATE: 'master/class/details',



};
