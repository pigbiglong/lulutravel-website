/**
 * lulutravel - Authentication State Manager
 */

// Wait for Supabase to be ready with polling
function waitForSupabase(callback, attempts = 0) {
    const maxAttempts = 100;
    if (window.supabaseClient) {
        callback();
    } else if (attempts < maxAttempts) {
        setTimeout(() => waitForSupabase(callback, attempts + 1), 100);
    } else {
        console.error('[Auth] Supabase client not found');
    }
}

const AuthManager = {
    _initialized: false,

    init: function() {
        if (this._initialized) return;
        this._initialized = true;

        waitForSupabase(() => {
            this.setupAuthListener();
            this.checkAuth();
        });
    },

    setupAuthListener: function() {
        if (!window.supabaseClient) return;

        const self = this;

        window.supabaseClient.auth.onAuthStateChange(async (event, session) => {
            if (event === 'INITIAL_SESSION') {
                if (session) self.updateAuthUI(session);
            } else if (event === 'SIGNED_IN') {
                self.updateAuthUI(session);
            } else if (event === 'SIGNED_OUT') {
                self.updateAuthUI(null);
            }
        });
    },

    checkAuth: async function() {
        if (!window.supabaseClient) return;
        try {
            const { data: { session } } = await window.supabaseClient.auth.getSession();
            this.updateAuthUI(session);
        } catch (err) {
            console.error('[Auth] Session check error:', err);
            this.updateAuthUI(null);
        }
    },

    updateAuthUI: function(session) {
        const authContainers = document.querySelectorAll('#auth-item-container');
        if (authContainers.length === 0) return;

        const loginNoticeLink = document.querySelector('.login-notice a');
        const loginNotice = document.getElementById('loginNotice');
        const bookingForm = document.getElementById('bookingForm');

            if (session && session.user) {
                const user = session.user;

                authContainers.forEach(container => {
                container.innerHTML = `
                    <div class="user-menu-container">
                        <button class="user-menu-btn" id="userMenuBtn">My Account</button>
                        <div class="user-dropdown" id="userDropdown">
                            <a href="profile.html" class="dropdown-item">Profile</a>
                            <a href="profile.html#bookings" class="dropdown-item">My Orders</a>
                            <div class="dropdown-divider"></div>
                            <button class="dropdown-item logout-btn" id="logoutBtn">Sign Out</button>
                        </div>
                    </div>
                `;
            });

            // Click to toggle dropdown
            document.getElementById('userMenuBtn').addEventListener('click', function(e) {
                e.stopPropagation();
                const dropdown = document.getElementById('userDropdown');
                dropdown.classList.toggle('active');
            });

            // Click outside to close dropdown
            document.addEventListener('click', function() {
                const dropdown = document.getElementById('userDropdown');
                if (dropdown) dropdown.classList.remove('active');
            });

            // Sign out handler
            document.getElementById('logoutBtn').addEventListener('click', function(e) {
                e.stopPropagation();
                AuthManager.signOut();
            });

            if (loginNotice) loginNotice.style.display = 'none';
            if (bookingForm) bookingForm.style.display = 'block';

            // Auto-fill form fields
            const nameField = document.getElementById('fullName');
            const emailField = document.getElementById('email');
            if (nameField && !nameField.value) nameField.value = user.user_metadata?.name || '';
            if (emailField && !emailField.value) emailField.value = user.email || '';

        } else {
            const currentPath = window.location.pathname.split('/').pop() || 'index.html';
            const search = window.location.search;
            const redirect = (currentPath === 'login.html' || currentPath === 'profile.html') ? 'index.html' : currentPath + search;
            const loginUrl = `login.html?redirect=${encodeURIComponent(redirect)}`;

            authContainers.forEach(container => {
                container.innerHTML = `<a href="${loginUrl}" class="nav-cta" id="authLink">Sign In</a>`;
            });

            if (loginNoticeLink) loginNoticeLink.href = loginUrl;
            if (loginNotice) loginNotice.style.display = 'block';
            if (bookingForm) bookingForm.style.display = 'none';
        }
    },

    signOut: async function() {
        if (!window.supabaseClient) return;
        try {
            await window.supabaseClient.auth.signOut();
            window.location.href = 'login.html';
        } catch (err) {
            console.error('[Auth] Sign out error:', err);
            window.location.reload();
        }
    },

    refreshUI: function() {
        this.checkAuth();
    }
};

// Expose to window
window.AuthManager = AuthManager;

// Start initialization
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => AuthManager.init());
} else {
    AuthManager.init();
}
