import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://kkgnnxunnzvcoiheykzr.supabase.co';

const supabaseKey ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtrZ25ueHVubnp2Y29paGV5a3pyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg5MjM1ODEsImV4cCI6MjA0NDQ5OTU4MX0.UkoTUPGzymjGhm4bIV0jUyE-QKQtuzOfY-_VT891ihQ"
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;