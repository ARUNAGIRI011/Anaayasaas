-- 1. Revoke the broad UPDATE permission from authenticated users
-- This stops them from updating 'credits' or 'plan_type' via the API
REVOKE UPDATE ON public.users FROM authenticated;

-- 2. Grant UPDATE permission ONLY for safe columns (name, language_preference)
GRANT UPDATE (name, language_preference) ON public.users TO authenticated;

-- 3. Ensure Transactions table is secure (if not already)
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- 4. Verify Policy for Transactions exists
-- (This creates it if it doesn't exist, safely)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'transactions' 
        AND policyname = 'Users can view own transactions'
    ) THEN
        CREATE POLICY "Users can view own transactions" 
        ON public.transactions FOR SELECT 
        USING (auth.uid() = user_id);
    END IF;
END
$$;
