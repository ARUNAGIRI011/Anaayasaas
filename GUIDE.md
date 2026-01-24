# 🚀 How to Preview & Run Anaya Gen

Welcome to **Anaya Gen**! Follow these steps to run and test your application locally.

## Prerequisite: Database Setup
**Crucial Step**: Before running the app, ensure your database tables exist.
1. Go to your [Supabase Dashboard SQL Editor](https://supabase.com/dashboard/project/csdtmiydvhbqkzhzbtdc/sql).
2. Open the file `supabase_schema.sql` in this project (VS Code).
3. Copy all the SQL code.
4. Paste it into the Supabase SQL Editor and click **RUN**.

---

## 1. Start the Development Server
Open your terminal (in VS Code, press `Ctrl + ~` or `Cmd + J`) and run:

```bash
npm run dev
```

You should see output indicating the server is ready at `http://localhost:3000`.

## 2. Open in Browser
Click this link or type it into Chrome/Edge:
👉 **[http://localhost:3000](http://localhost:3000)**

## 3. Walkthrough Guide

### A. Authentication
1. You will land on the Home Page. Click **"Get Started"** or **"Login"**.
2. If you don't have an account, click **Sign Up**.
3. Enter a generic email (e.g., `test@example.com`) and password.
4. *Note: If email confirmation is enabled in Supabase, you'll need to verify your email. If you turned it off (recommended for dev), you will be logged in immediately.*

### B. Dashboard
Once logged in, you will see the **Dashboard** with your stats (Credits: 3).

### C. Generator (The Magic!)
1. Click **"Generator"** in the sidebar.
2. **Prompt**: Enter a video topic (e.g., *"A futuristic city with flying cars"*).
3. **Style**: Select a style (e.g., *"Gaming"* or *"Indian Viral"*).
4. Click **"Generate Thumbnail"**.
5. Wait ~3 seconds. The AI will plan the thumbnail and a preview image will appear!

### D. Payments (Test Mode)
1. Click **"Billing"** in the sidebar.
2. Select the **"Starter"** plan.
3. A Razorpay test modal will launch.
4. Use any dummy card or UPI to pay.
5. After success, check your credits on the Dashboard—they should increase!

---

## Troubleshooting
- **"Database Error"**: Did you run the SQL script in Supabase?
- **"Login Failed"**: Check if your Supabase project is active and credentials in `.env.local` are correct.
