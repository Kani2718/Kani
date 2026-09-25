-- Smart Campus AI relational schema
-- PostgreSQL 15+

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TYPE user_role AS ENUM ('Super Admin', 'Campus Admin', 'Facility Manager', 'Faculty');
CREATE TYPE room_status AS ENUM ('Available', 'Occupied', 'Reserved', 'Maintenance');
CREATE TYPE building_status AS ENUM ('Optimal', 'Warning', 'High Load');
CREATE TYPE alert_severity AS ENUM ('critical', 'warning', 'attention', 'info');
CREATE TYPE alert_category AS ENUM ('energy', 'water', 'occupancy', 'safety', 'system');
CREATE TYPE alert_status AS ENUM ('unread', 'read', 'resolved');
CREATE TYPE recommendation_priority AS ENUM ('HIGH', 'MEDIUM', 'LOW');
CREATE TYPE recommendation_status AS ENUM ('pending', 'applied', 'dismissed');

CREATE TABLE accounts (
  id text PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL UNIQUE,
  role user_role NOT NULL DEFAULT 'Faculty',
  institution text NOT NULL,
  campus_name text,
  phone text,
  avatar text,
  department text,
  password_hash text NOT NULL,
  registered_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id text NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  expires_at timestamptz NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX sessions_account_id_idx ON sessions(account_id);

CREATE TABLE buildings (
  id text PRIMARY KEY,
  name text NOT NULL,
  code text NOT NULL UNIQUE,
  total_floors integer NOT NULL CHECK (total_floors >= 0),
  total_rooms integer NOT NULL DEFAULT 0 CHECK (total_rooms >= 0),
  total_labs integer NOT NULL DEFAULT 0 CHECK (total_labs >= 0),
  capacity integer NOT NULL CHECK (capacity >= 0),
  current_occupancy integer NOT NULL DEFAULT 0 CHECK (current_occupancy >= 0),
  occupancy_rate numeric(5,2) NOT NULL DEFAULT 0 CHECK (occupancy_rate BETWEEN 0 AND 100),
  energy_kw numeric(12,3) NOT NULL DEFAULT 0,
  water_flow_l_min numeric(12,3) NOT NULL DEFAULT 0,
  solar_generation_kw numeric(12,3) NOT NULL DEFAULT 0,
  status building_status NOT NULL DEFAULT 'Optimal',
  coordinates jsonb NOT NULL DEFAULT '{"x": 0, "y": 0}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE classrooms (
  id text PRIMARY KEY,
  building_id text NOT NULL REFERENCES buildings(id) ON DELETE CASCADE,
  room_number text NOT NULL,
  floor integer NOT NULL,
  capacity integer NOT NULL CHECK (capacity >= 0),
  current_occupancy integer NOT NULL DEFAULT 0 CHECK (current_occupancy >= 0),
  status room_status NOT NULL DEFAULT 'Available',
  utilization_rate numeric(5,2) NOT NULL DEFAULT 0 CHECK (utilization_rate BETWEEN 0 AND 100),
  equipment jsonb NOT NULL DEFAULT '[]'::jsonb,
  department text NOT NULL,
  air_quality_ppm numeric(10,2),
  temp_celsius numeric(6,2),
  energy_usage_kw numeric(12,3) NOT NULL DEFAULT 0,
  last_cleaned text,
  UNIQUE (building_id, room_number)
);

CREATE TABLE classroom_schedules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  classroom_id text NOT NULL REFERENCES classrooms(id) ON DELETE CASCADE,
  course text NOT NULL,
  instructor text NOT NULL,
  scheduled_time text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE laboratories (
  id text PRIMARY KEY,
  building_id text NOT NULL REFERENCES buildings(id) ON DELETE CASCADE,
  name text NOT NULL,
  lab_code text NOT NULL UNIQUE,
  capacity integer NOT NULL CHECK (capacity >= 0),
  current_usage integer NOT NULL DEFAULT 0 CHECK (current_usage >= 0),
  status room_status NOT NULL DEFAULT 'Available',
  utilization_rate numeric(5,2) NOT NULL DEFAULT 0 CHECK (utilization_rate BETWEEN 0 AND 100),
  specialized_equipment jsonb NOT NULL DEFAULT '[]'::jsonb,
  department text NOT NULL,
  safety_rating text NOT NULL CHECK (safety_rating IN ('A+', 'A', 'B', 'Needs Inspection')),
  power_load_kw numeric(12,3) NOT NULL DEFAULT 0,
  hazardous_gas_sensor text NOT NULL DEFAULT 'Normal' CHECK (hazardous_gas_sensor IN ('Normal', 'Trace', 'Warning'))
);

CREATE TABLE laboratory_schedules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  laboratory_id text NOT NULL REFERENCES laboratories(id) ON DELETE CASCADE,
  scheduled_time text NOT NULL,
  subject text NOT NULL,
  professor text NOT NULL,
  enrolled integer NOT NULL DEFAULT 0 CHECK (enrolled >= 0)
);

CREATE TABLE alerts (
  id text PRIMARY KEY,
  title text NOT NULL,
  message text NOT NULL,
  category alert_category NOT NULL,
  severity alert_severity NOT NULL,
  occurred_at timestamptz NOT NULL,
  building_id text REFERENCES buildings(id) ON DELETE SET NULL,
  room_id text REFERENCES classrooms(id) ON DELETE SET NULL,
  status alert_status NOT NULL DEFAULT 'unread',
  metric_value text,
  action_required text
);
CREATE INDEX alerts_status_severity_idx ON alerts(status, severity);
CREATE INDEX alerts_building_id_idx ON alerts(building_id);

CREATE TABLE recommendations (
  id text PRIMARY KEY,
  title text NOT NULL,
  category text NOT NULL CHECK (category IN ('Energy Optimization', 'Space Allocation', 'Water Conservation', 'Maintenance')),
  problem text NOT NULL,
  ai_analysis text NOT NULL,
  recommended_action text NOT NULL,
  expected_benefit text NOT NULL,
  estimated_savings text NOT NULL,
  priority recommendation_priority NOT NULL,
  status recommendation_status NOT NULL DEFAULT 'pending',
  building_id text REFERENCES buildings(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  applied_at timestamptz
);

CREATE TABLE energy_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  current_kw numeric(12,3) NOT NULL DEFAULT 0,
  today_kwh numeric(14,3) NOT NULL DEFAULT 0,
  monthly_kwh numeric(14,3) NOT NULL DEFAULT 0,
  yesterday_kwh numeric(14,3) NOT NULL DEFAULT 0,
  peak_hour text,
  solar_generated_kwh numeric(14,3) NOT NULL DEFAULT 0,
  grid_import_kwh numeric(14,3) NOT NULL DEFAULT 0,
  recorded_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE energy_hourly_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_id uuid NOT NULL REFERENCES energy_metrics(id) ON DELETE CASCADE,
  hour text NOT NULL,
  today numeric(12,3) NOT NULL DEFAULT 0,
  yesterday numeric(12,3) NOT NULL DEFAULT 0,
  baseline numeric(12,3) NOT NULL DEFAULT 0
);

CREATE TABLE energy_building_breakdown (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_id uuid NOT NULL REFERENCES energy_metrics(id) ON DELETE CASCADE,
  building_id text REFERENCES buildings(id) ON DELETE SET NULL,
  building_name text NOT NULL,
  consumption numeric(14,3) NOT NULL DEFAULT 0,
  percentage numeric(5,2) NOT NULL DEFAULT 0 CHECK (percentage BETWEEN 0 AND 100)
);

CREATE TABLE water_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  current_flow_l_min numeric(12,3) NOT NULL DEFAULT 0,
  today_liters numeric(14,3) NOT NULL DEFAULT 0,
  monthly_liters numeric(14,3) NOT NULL DEFAULT 0,
  anomaly_detected boolean NOT NULL DEFAULT false,
  leakage_zone text,
  recorded_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE water_hourly_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_id uuid NOT NULL REFERENCES water_metrics(id) ON DELETE CASCADE,
  hour text NOT NULL,
  flow numeric(12,3) NOT NULL DEFAULT 0,
  average numeric(12,3) NOT NULL DEFAULT 0
);

CREATE TABLE water_building_breakdown (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_id uuid NOT NULL REFERENCES water_metrics(id) ON DELETE CASCADE,
  building_id text REFERENCES buildings(id) ON DELETE SET NULL,
  block text NOT NULL,
  usage numeric(14,3) NOT NULL DEFAULT 0,
  variance numeric(8,3) NOT NULL DEFAULT 0
);

CREATE TABLE sustainability_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  energy_saved_mwh numeric(14,3) NOT NULL DEFAULT 0,
  water_saved_liters numeric(14,3) NOT NULL DEFAULT 0,
  co2_reduction_tons numeric(14,3) NOT NULL DEFAULT 0,
  resource_efficiency_score numeric(5,2) NOT NULL DEFAULT 0 CHECK (resource_efficiency_score BETWEEN 0 AND 100),
  trees_equivalent integer NOT NULL DEFAULT 0,
  solar_coverage_percent numeric(5,2) NOT NULL DEFAULT 0 CHECK (solar_coverage_percent BETWEEN 0 AND 100),
  recorded_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE sustainability_trends (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_id uuid NOT NULL REFERENCES sustainability_metrics(id) ON DELETE CASCADE,
  month text NOT NULL,
  co2_saved numeric(14,3) NOT NULL DEFAULT 0,
  energy_saved numeric(14,3) NOT NULL DEFAULT 0
);

CREATE TABLE predictions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_name text NOT NULL,
  recorded_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE prediction_data_points (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  prediction_id uuid NOT NULL REFERENCES predictions(id) ON DELETE CASCADE,
  time_label text NOT NULL,
  historical numeric(14,3),
  predicted numeric(14,3) NOT NULL,
  upper_confidence numeric(14,3),
  lower_confidence numeric(14,3),
  actual numeric(14,3)
);

CREATE TABLE allocation_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  requested_by text REFERENCES accounts(id) ON DELETE SET NULL,
  students_count integer NOT NULL CHECK (students_count > 0),
  room_type text NOT NULL,
  requested_date date NOT NULL,
  time_slot text NOT NULL,
  required_equipment jsonb NOT NULL DEFAULT '[]'::jsonb,
  department text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX classrooms_building_id_idx ON classrooms(building_id);
CREATE INDEX laboratories_building_id_idx ON laboratories(building_id);
CREATE INDEX recommendations_status_idx ON recommendations(status);
CREATE INDEX energy_metrics_recorded_at_idx ON energy_metrics(recorded_at DESC);
CREATE INDEX water_metrics_recorded_at_idx ON water_metrics(recorded_at DESC);
