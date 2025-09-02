/*
  # Create loyalty transactions table

  1. New Tables
    - `loyalty_transactions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to users)
      - `points` (integer, can be positive or negative)
      - `type` (text, 'earned' or 'spent' or 'converted')
      - `description` (text)
      - `reference_id` (text, optional reference to shipment or conversion)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `loyalty_transactions` table
    - Add policy for users to read their own transactions
    - Add policy for system to insert transactions
*/

CREATE TABLE IF NOT EXISTS loyalty_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  points integer NOT NULL,
  type text NOT NULL CHECK (type IN ('earned', 'spent', 'converted')),
  description text NOT NULL,
  reference_id text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE loyalty_transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own transactions"
  ON loyalty_transactions
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "System can insert transactions"
  ON loyalty_transactions
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_loyalty_transactions_user_id ON loyalty_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_loyalty_transactions_created_at ON loyalty_transactions(created_at DESC);