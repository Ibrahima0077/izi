/*
  # Create point conversions table

  1. New Tables
    - `point_conversions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to users)
      - `points_converted` (integer)
      - `fcfa_amount` (integer)
      - `conversion_rate` (integer, points per 100 FCFA)
      - `status` (text, 'pending', 'completed', 'cancelled')
      - `created_at` (timestamp)
      - `completed_at` (timestamp)

  2. Security
    - Enable RLS on `point_conversions` table
    - Add policy for users to read their own conversions
    - Add policy for users to create conversions
*/

CREATE TABLE IF NOT EXISTS point_conversions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  points_converted integer NOT NULL,
  fcfa_amount integer NOT NULL,
  conversion_rate integer DEFAULT 1,
  status text DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'cancelled')),
  created_at timestamptz DEFAULT now(),
  completed_at timestamptz DEFAULT now()
);

ALTER TABLE point_conversions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own conversions"
  ON point_conversions
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create conversions"
  ON point_conversions
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_point_conversions_user_id ON point_conversions(user_id);
CREATE INDEX IF NOT EXISTS idx_point_conversions_created_at ON point_conversions(created_at DESC);