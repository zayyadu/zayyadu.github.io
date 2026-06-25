
  # Follow the guide

  This is a code bundle for Follow the guide. The original project is available at https://www.figma.com/design/J6n49qYaSS8TIEPOTDOecq/Follow-the-guide.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  ## Waitlist storage

  This landing page sends waitlist signups to a Supabase Edge Function, which stores them in your database.

  Create a table such as `waitlist_signups` with at least these columns:

  - `id` uuid primary key, default `gen_random_uuid()`
  - `name` text
  - `email` text unique
  - `role` text
  - `source` text
  - `created_at` timestamptz default `now()`

  Then add these environment variables in a local `.env` file:

  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`

  For the Edge Function, set these Supabase secrets:

  - `SUPABASE_SERVICE_ROLE_KEY`
  - `WAITLIST_TABLE` optional, defaults to `waitlist_signups`

  The client sends signups to the Edge Function at `/functions/v1/waitlist`.
  Deploy the function with `supabase functions deploy waitlist` after setting the secrets.
  
