import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jhobcenbfutdunkujsej.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impob2JjZW5iZnV0ZHVua3Vqc2VqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE5MTg0NzYsImV4cCI6MjA3NzQ5NDQ3Nn0.iHm3jdFyPcdNmjobvYn1XfeydTskwjUdpSr8pHlcN-E";

export const supabase = createClient(supabaseUrl, supabaseKey);
