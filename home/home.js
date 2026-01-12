// Theme Management
    const themeToggle = document.querySelector('.theme-toggle');
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const currentTheme = localStorage.getItem('theme') || (prefersDarkMode ? 'dark' : 'light');
    
    // Apply saved theme
    if (currentTheme === 'light') {
      document.body.classList.add('light-mode');
    }
    
    // Update theme icon
    function updateThemeIcon(isLight) {
      const icon = themeToggle.querySelector('svg');
      if (!icon) return;

      icon.innerHTML = isLight 
        ? `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>`
        : `<circle cx="12" cy="12" r="5"></circle>
           <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path>`;
    }
    
    // Theme toggle handler
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light-mode');
      const isLight = document.body.classList.contains('light-mode');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
      updateThemeIcon(isLight);
    });

    // System theme change listener
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (!localStorage.getItem('theme')) {
        document.body.classList.toggle('light-mode', !e.matches);
        updateThemeIcon(!e.matches);
      }
    });

    // Initialize theme icon
    updateThemeIcon(currentTheme === 'light');

    // Firebase Integration
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
    import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
    import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";

    // Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyBzPa671GH71UvTcZ3dECFPrW4xe1vS9ds",
      authDomain: "marketplace-e0bff.firebaseapp.com",
      projectId: "marketplace-e0bff",
      storageBucket: "marketplace-e0bff.appspot.com",
      messagingSenderId: "892936444768",
      appId: "1:892936444768:web:f595b3a3e5d697988e1c05",
      databaseURL: "https://marketplace-e0bff-default-rtdb.europe-west1.firebasedatabase.app"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const database = getDatabase(app);

    // DOM Elements
    const hero = document.querySelector('.hero');
    const defaultHeroContent = hero.innerHTML;
    const logoutBtn = document.getElementById('logoutBtn');
    const profileDropdown = document.querySelector('.profile-dropdown');
    const userAvatar = document.querySelector('.user-avatar');

    // Auth State Listener
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        // Not signed in - redirect to sign-in page
        window.location.href = '/signin/signin.html';
        return;
      }

      try {
        // User is signed in
        const username = user.email.split('@')[0];
        const userRef = ref(database, `users/${username}`);
        const snapshot = await get(userRef);

        if (!snapshot.exists()) {
          window.location.href = '/signin/signin.html';
          return;
        }

        const userData = snapshot.val();

        // Check banned / pending status
        if (userData.declined) {
          window.location.href = '/adminlogic/declined/declined.html';
          return;
        }
        
        if (userData.banned) {
          window.location.href = '/adminlogic/banned/banned.html';
          return;
        }

        // Update UI for authenticated user
        hero.innerHTML = `
          <h1>Welcome back, <span class="highlight">${userData.name || username}</span></h1>
          <p>You are logged in as <strong>${userData.role || 'user'}</strong>.</p>
          ${userData.roomnumber ? `<p>Room: ${userData.roomnumber}</p>` : ''}
          ${userData.program ? `<p>Program: ${userData.program}</p>` : ''}
          <a href="/home/market/market.html" class="btn btn-primary cta-btn">Enter Marketplace</a>
        `;

        // Update profile image if available
        if (userData.profilePictureUrl) {
          userAvatar.src = userData.profilePictureUrl;
          userAvatar.alt = `${userData.name}'s profile picture`;
        }

        // Make profile dropdown clickable
        userAvatar.addEventListener('click', (e) => {
          e.stopPropagation();
          const dropdown = profileDropdown.querySelector('.dropdown-content');
          const isVisible = dropdown.style.display === 'block';
          
          if (isVisible) {
            dropdown.style.opacity = '0';
            dropdown.style.transform = 'translateY(10px)';
            setTimeout(() => {
              dropdown.style.display = 'none';
            }, 300);
          } else {
            dropdown.style.display = 'block';
            setTimeout(() => {
              dropdown.style.opacity = '1';
              dropdown.style.transform = 'translateY(0)';
            }, 10);
          }
        });

        // Logout functionality
        if (logoutBtn) {
          logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            signOut(auth).then(() => {
              window.location.href = '/signin/signin.html';
            }).catch((error) => {
              console.error('Logout error:', error);
            });
          });
        }

      } catch (error) {
        console.error('Error loading user data:', error);
        hero.innerHTML = `
          ${defaultHeroContent}
          <div class="error-message" style="color: #ff6b6b; margin-top: 1rem;">
            Couldn't load your profile. <button onclick="window.location.reload()" style="background: none; border: none; color: var(--primary); text-decoration: underline; cursor: pointer;">Try again</button>
          </div>
        `;
      }
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!profileDropdown.contains(e.target)) {
        const dropdown = profileDropdown.querySelector('.dropdown-content');
        dropdown.style.opacity = '0';
        dropdown.style.transform = 'translateY(10px)';
        setTimeout(() => {
          dropdown.style.display = 'none';
        }, 300);
      }
    });

    // Service Worker Registration for PWA
    // if ('serviceWorker' in navigator && window.location.hostname !== 'localhost') {
    //   window.addEventListener('load', () => {
    //     navigator.serviceWorker.register('/sw.js').then(registration => {
    //       console.log('ServiceWorker registration successful with scope:', registration.scope);
    //     }).catch(err => {
    //       console.log('ServiceWorker registration failed:', err);
    //     });
    //   });
    // }

    // Focus styles for keyboard navigation
    document.addEventListener('keyup', (e) => {
      if (e.key === 'Tab') {
        document.documentElement.classList.add('keyboard-focus');
      }
    });

    document.addEventListener('mousedown', () => {
      document.documentElement.classList.remove('keyboard-focus');
    });

    // Add animation to CTA button on page load
    document.addEventListener('DOMContentLoaded', () => {
      const ctaBtn = document.querySelector('.cta-btn');
      if (ctaBtn) {
        setTimeout(() => {
          ctaBtn.style.animation = 'pulse 2s infinite';
        }, 1500);
      }
    });