import { createClient } from '@supabase/supabase-js';

const URL = 'https://itmmzmqestfvmmdbhsjo.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0bW16bXFlc3Rmdm1tZGJoc2pvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2MzIwMjUsImV4cCI6MjA2MTIwODAyNX0.uxTbxnaidOiLy4e_BdRgmmUWPiWaW9HF3SmxoQYa57s';

export const supabase = createClient(URL, API_KEY);

