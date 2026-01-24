-- Create Users Table (extends Supabase auth.users)
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  language_preference VARCHAR(10) DEFAULT 'en', -- en, hi, hinglish
  plan_type VARCHAR(20) DEFAULT 'free', -- free, starter, creator, pro
  credits INT DEFAULT 3,
  subscription_id VARCHAR(255), -- Razorpay subscription ID
  subscription_status VARCHAR(20), -- active, canceled, expired
  renewal_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security for Users
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" 
ON public.users FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
ON public.users FOR UPDATE 
USING (auth.uid() = id);

-- SECURITY NOTE: To prevent users from updating their own 'credits', 
-- you should run:
-- REVOKE UPDATE ON public.users FROM authenticated;
-- GRANT UPDATE (name, language_preference) ON public.users TO authenticated;
-- The backend uses Service Role to update credits safely.

-- Create Trigger to automatically create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, name)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();


-- Create Thumbnails Table
CREATE TABLE public.thumbnails (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  prompt TEXT NOT NULL,
  language VARCHAR(10),
  style_preset VARCHAR(50),
  file_url TEXT NOT NULL, -- Supabase Storage URL
  resolution VARCHAR(10), -- 720p, 1080p
  has_watermark BOOLEAN DEFAULT true,
  credits_used INT DEFAULT 1,
  generation_time_seconds INT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS for Thumbnails
ALTER TABLE public.thumbnails ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own thumbnails" 
ON public.thumbnails FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own thumbnails" 
ON public.thumbnails FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own thumbnails" 
ON public.thumbnails FOR DELETE 
USING (auth.uid() = user_id);


-- Create Transactions Table
CREATE TABLE public.transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id),
  razorpay_payment_id VARCHAR(255),
  razorpay_subscription_id VARCHAR(255),
  amount DECIMAL(10, 2),
  currency VARCHAR(3) DEFAULT 'INR',
  status VARCHAR(20), -- success, failed, pending
  type VARCHAR(20), -- subscription, topup
  credits_added INT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS for Transactions
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own transactions" 
ON public.transactions FOR SELECT 
USING (auth.uid() = user_id);


-- Create Storage Bucket for Thumbnails
-- Note: You usually create buckets in the dashboard, but here is the policy
-- INSERT INTO storage.buckets (id, name, public) VALUES ('thumbnails', 'thumbnails', true);

-- Storage Policies (assuming bucket 'thumbnails' exists)
-- CREATE POLICY "Users can upload own thumbnails"
-- ON storage.objects FOR INSERT
-- WITH CHECK (bucket_id = 'thumbnails' AND auth.uid()::text = (storage.foldername(name))[1]);

-- CREATE POLICY "Anyone can view thumbnails"
-- ON storage.objects FOR SELECT
-- USING (bucket_id = 'thumbnails');
