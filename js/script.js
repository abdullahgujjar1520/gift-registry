// DOM Ready Function
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });
    }
    
    // Form Validation and Submission
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }
            
            if (password.length < 8) {
                alert('Password must be at least 8 characters long!');
                return;
            }
            
            // Simulate registration
            alert('Registration successful! Redirecting to dashboard...');
            window.location.href = 'dashboard.html';
        });
    }
    
    // Login Form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate login
            alert('Login successful!');
            window.location.href = 'dashboard.html';
        });
    }
    
    // Create Registry Form - Add Gift Items
    const addGiftItemBtn = document.getElementById('addGiftItem');
    const giftItemsContainer = document.getElementById('giftItemsContainer');
    
    if (addGiftItemBtn) {
        let itemCount = 1;
        
        addGiftItemBtn.addEventListener('click', function() {
            itemCount++;
            
            const newItem = document.createElement('div');
            newItem.className = 'gift-item';
            newItem.innerHTML = `
                <div class="gift-item-header">
                    <h3>Item #${itemCount}</h3>
                    <button type="button" class="btn-remove-item">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Item Name *</label>
                        <input type="text" placeholder="e.g., KitchenAid Stand Mixer" required>
                    </div>
                    <div class="form-group">
                        <label>Price *</label>
                        <input type="number" placeholder="0.00" min="0" step="0.01" required>
                    </div>
                </div>
                <div class="form-group">
                    <label>Description</label>
                    <textarea placeholder="Item description, color, size, etc." rows="2"></textarea>
                </div>
                <div class="form-group">
                    <label>Image URL (optional)</label>
                    <input type="url" placeholder="https://example.com/image.jpg">
                </div>
                <div class="form-group">
                    <label>Store/Website Link (optional)</label>
                    <input type="url" placeholder="https://example.com/product">
                </div>
                <div class="form-group">
                    <label>Priority</label>
                    <select>
                        <option value="low">Low</option>
                        <option value="medium" selected>Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
            `;
            
            giftItemsContainer.appendChild(newItem);
            
            // Add event listener to remove button
            const removeBtn = newItem.querySelector('.btn-remove-item');
            removeBtn.addEventListener('click', function() {
                newItem.remove();
            });
        });
        
        // Remove item functionality for existing items
        const removeButtons = document.querySelectorAll('.btn-remove-item');
        removeButtons.forEach(button => {
            button.addEventListener('click', function() {
                button.closest('.gift-item').remove();
            });
        });
    }
    
    // Mark as Purchased Buttons
    const markPurchasedButtons = document.querySelectorAll('.btn-mark-purchased');
    markPurchasedButtons.forEach(button => {
        button.addEventListener('click', function() {
            const itemCard = this.closest('.gift-item-card');
            const statusDiv = itemCard.querySelector('.gift-item-status');
            
            // Confirm purchase
            if (confirm('Are you sure you want to mark this item as purchased?')) {
                statusDiv.innerHTML = '<i class="fas fa-check-circle"></i> Purchased';
                statusDiv.className = 'gift-item-status purchased';
                
                this.innerHTML = '<i class="fas fa-check"></i> Already Purchased';
                this.className = 'btn btn-disabled';
                this.disabled = true;
                
                // Update progress bar
                updateProgressBar();
                
                alert('Thank you for marking this item as purchased!');
            }
        });
    });
    
    // Copy Link Functionality
    const copyButtons = document.querySelectorAll('.btn-copy');
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const linkInput = this.previousElementSibling;
            linkInput.select();
            document.execCommand('copy');
            
            // Visual feedback
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check"></i>';
            this.style.backgroundColor = 'var(--success)';
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.style.backgroundColor = '';
            }, 2000);
        });
    });
    
    // Share Buttons
    const shareButtons = document.querySelectorAll('.share-btn');
    shareButtons.forEach(button => {
        button.addEventListener('click', function() {
            const platform = this.textContent.trim();
            const url = window.location.href;
            let shareUrl = '';
            
            switch(platform) {
                case 'Facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                    break;
                case 'WhatsApp':
                    shareUrl = `https://wa.me/?text=${encodeURIComponent(`Check out this gift registry: ${url}`)}`;
                    break;
                case 'Email':
                    shareUrl = `mailto:?subject=Gift Registry&body=Check out this gift registry: ${url}`;
                    break;
                default:
                    return;
            }
            
            window.open(shareUrl, '_blank');
        });
    });
    
    // Filter Registry Items
    const filterSelect = document.querySelector('.filter-select');
    if (filterSelect) {
        filterSelect.addEventListener('change', function() {
            const filterValue = this.value;
            const giftItems = document.querySelectorAll('.gift-item-card');
            
            giftItems.forEach(item => {
                switch(filterValue) {
                    case 'all':
                        item.style.display = 'block';
                        break;
                    case 'available':
                        if (item.querySelector('.available')) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                        break;
                    case 'purchased':
                        if (item.querySelector('.purchased')) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                        break;
                    case 'priority':
                        if (item.querySelector('.priority.high')) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                        break;
                }
            });
        });
    }
    
    // Progress Bar Update Function
    function updateProgressBar() {
        const totalItems = document.querySelectorAll('.gift-item-card').length;
        const purchasedItems = document.querySelectorAll('.purchased').length;
        const percentage = totalItems > 0 ? Math.round((purchasedItems / totalItems) * 100) : 0;
        
        const progressFill = document.querySelector('.progress-fill');
        const progressText = document.querySelector('.progress-header span');
        
        if (progressFill) {
            progressFill.style.width = `${percentage}%`;
        }
        
        if (progressText) {
            progressText.textContent = `${percentage}% Complete`;
        }
        
        // Update stats
        const purchasedStat = document.querySelector('.registry-stats .stat:nth-child(2) strong');
        const remainingStat = document.querySelector('.registry-stats .stat:nth-child(3) strong');
        
        if (purchasedStat) {
            purchasedStat.textContent = purchasedItems;
        }
        
        if (remainingStat) {
            remainingStat.textContent = totalItems - purchasedItems;
        }
    }
    
    // Initialize progress bar
    updateProgressBar();
    
    // Search Functionality
    const searchInput = document.querySelector('.search-input-group input');
    const searchButton = document.querySelector('.search-input-group .btn');
    
    if (searchButton && searchInput) {
        searchButton.addEventListener('click', function() {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                alert(`Searching for: ${searchTerm}`);
                // In a real app, this would make an API call
            }
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchButton.click();
            }
        });
    }
    
    // Toggle Switches in Profile
    const switches = document.querySelectorAll('.switch input');
    switches.forEach(switchInput => {
        switchInput.addEventListener('change', function() {
            const setting = this.closest('.setting-item').querySelector('h4').textContent;
            const status = this.checked ? 'enabled' : 'disabled';
            console.log(`${setting}: ${status}`);
        });
    });
    
    // Danger Zone Actions
    const deleteAccountBtn = document.querySelector('.btn-danger');
    if (deleteAccountBtn) {
        deleteAccountBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                alert('Account deletion requested. You will receive a confirmation email.');
            }
        });
    }
    
    // Export Data Button
    const exportBtn = document.querySelector('.btn-outline:last-child');
    if (exportBtn && exportBtn.textContent.includes('Export')) {
        exportBtn.addEventListener('click', function() {
            const mockData = {
                user: {
                    name: "Sarah Johnson",
                    email: "sarah.johnson@example.com",
                    registries: 5,
                    totalItems: 42,
                    joined: "January 2023"
                },
                registries: [
                    {
                        title: "Sarah's 30th Birthday",
                        type: "birthday",
                        date: "2024-10-15",
                        items: 25,
                        purchased: 12
                    }
                ]
            };
            
            const dataStr = JSON.stringify(mockData, null, 2);
            const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
            
            const exportFileDefaultName = 'giftease-data.json';
            
            const linkElement = document.createElement('a');
            linkElement.setAttribute('href', dataUri);
            linkElement.setAttribute('download', exportFileDefaultName);
            linkElement.click();
        });
    }
    
    // Create Registry Form Submission
    const createRegistryForm = document.getElementById('createRegistryForm');
    if (createRegistryForm) {
        createRegistryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const title = document.getElementById('registryTitle').value;
            const type = document.getElementById('registryType').value;
            
            if (!title || !type) {
                alert('Please fill in all required fields');
                return;
            }
            
            // Simulate registry creation
            alert(`Registry "${title}" created successfully!`);
            window.location.href = 'dashboard.html';
        });
    }
    
    // Print Registry
    const printBtn = document.querySelector('.btn-secondary:has(.fa-print)');
    if (printBtn) {
        printBtn.addEventListener('click', function() {
            window.print();
        });
    }
    
    // Share Registry Modal
    const shareBtn = document.querySelector('.btn-primary:has(.fa-share-alt)');
    if (shareBtn) {
        shareBtn.addEventListener('click', function() {
            const shareModal = `
                <div class="modal" style="
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0,0,0,0.5);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10000;
                ">
                    <div style="
                        background: white;
                        padding: 2rem;
                        border-radius: var(--radius);
                        max-width: 500px;
                        width: 90%;
                    ">
                        <h3>Share Registry</h3>
                        <p>Copy this link to share with friends and family:</p>
                        <div class="registry-link" style="margin: 1rem 0;">
                            <input type="text" value="https://giftease.com/registry/sarah-birthday-2024" readonly style="width: 100%; padding: 10px;">
                        </div>
                        <div style="display: flex; gap: 1rem; margin-top: 1rem;">
                            <button onclick="this.closest('.modal').remove()" class="btn btn-secondary">Close</button>
                            <button onclick="navigator.clipboard.writeText('https://giftease.com/registry/sarah-birthday-2024'); alert('Link copied!')" class="btn btn-primary">Copy Link</button>
                        </div>
                    </div>
                </div>
            `;
            
            document.body.insertAdjacentHTML('beforeend', shareModal);
        });
    }
});

// Initialize any other page-specific functionality
window.addEventListener('load', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Form validation for all forms
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = this.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = 'var(--danger)';
                } else {
                    field.style.borderColor = '';
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                alert('Please fill in all required fields.');
            }
        });
    });
});