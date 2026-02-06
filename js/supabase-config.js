(function() {
    'use strict';
    console.log('[SUPABASE-CONFIG] Initializing...', new Date().toISOString());

    // Prevent double initialization
    if (window.supabaseClient) {
        console.log('[SUPABASE-CONFIG] Already initialized.');
        if (!window.supabase) window.supabase = window.supabaseClient;
        return;
    }

    var SUPABASE_URL = 'https://zhlldovnjbfyznyrvwma.supabase.co';
    var SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpobGxkb3ZuamJmeXpueXJ2d21hIiwiccm9sZSI6ImFub24iLCJpYXQiOjE3NzAyNDg5MDcsImV4cCI6MjA4NTgyNDkwN30.lzljjCLKrph6ZXN_VZycVfYHHN90yMljwwreoFULsMQ';

    function initSupabase() {
        if (typeof window.supabase === 'undefined' || !window.supabase.createClient) {
            console.warn('[SUPABASE-CONFIG] Supabase SDK not ready yet, waiting...');
            setTimeout(initSupabase, 50);
            return;
        }

        console.log('[SUPABASE-CONFIG] Supabase SDK ready, creating client...');
        var createClient = window.supabase.createClient;
        window.supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        // Alias for compatibility
        window.supabase = window.supabaseClient;

        console.log('[SUPABASE-CONFIG] Done. window.supabase.auth:', !!window.supabase.auth);
    }

    // Start initialization (will wait for SDK if needed)
    initSupabase();
})();
