import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient('https://nqfbcobkrrgrvxofavfl.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xZmJjb2JrcnJncnZ4b2ZhdmZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA3NTcyNzIsImV4cCI6MjAwNjMzMzI3Mn0.dc0prmrdQ9R9M4jAzXv_4OAcsWZ_4-Ff5lCN6dJT2NY');


