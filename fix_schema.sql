-- Add missing column to transactions table for proper order tracking
ALTER TABLE public.transactions ADD COLUMN IF NOT EXISTS razorpay_order_id VARCHAR(255);
