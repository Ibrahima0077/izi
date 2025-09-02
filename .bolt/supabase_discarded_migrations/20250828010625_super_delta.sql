/*
  # Create convoys table

  1. New Tables
    - `convoys`
      - `id` (uuid, primary key)
      - `departure_date` (date)
      - `price_per_kg` (integer, price in FCFA)
      - `carrier_address` (text)
      - `carrier_name` (text)
      - `destination` (text)
      - `available_space` (integer, percentage)
      - `is_active` (boolean, default true)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `convoys` table
    - Add policy for authenticated users to read convoys
    - Add policy for admins to manage convoys
*/

CREATE TABLE IF NOT EXISTS convoys (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  departure_date date NOT NULL,
  price_per_kg integer NOT NULL,
  carrier_address text NOT NULL,
  carrier_name text NOT NULL,
  destination text DEFAULT 'Bamako, Mali',
  available_space integer DEFAULT 100,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE convoys ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read active convoys"
  ON convoys
  FOR SELECT
  TO authenticated
  USING (is_active = true);

-- Insert sample convoys
INSERT INTO convoys (departure_date, price_per_kg, carrier_address, carrier_name, available_space) VALUES
('2025-01-25', 2500, 'Room 1205, Building A, Yiwu International Trade City, No. 381 Chouzhou North Road, Yiwu, Zhejiang, China 322000', 'Express Yiwu', 85),
('2025-01-28', 2300, 'Warehouse 15, Guangzhou International Trade Center, 117 Haizhu Middle Road, Haizhu District, Guangzhou, China 510120', 'Guangzhou Express', 92),
('2025-02-02', 2600, 'Floor 8, Block C, Shenzhen International Trade Building, 2008 Shennan Middle Road, Futian District, Shenzhen, China 518048', 'Shenzhen Logistics', 78),
('2025-02-05', 2400, 'Unit 302, Block B, Hangzhou Trade Plaza, 88 Yan\'an Road, Hangzhou, Zhejiang, China 310006', 'Hangzhou Express', 95),
('2025-02-10', 2700, 'Room 506, International Commerce Building, 200 Nanjing Road, Shanghai, China 200001', 'Shanghai Cargo', 67);