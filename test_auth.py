from playwright.sync_api import sync_playwright
import time

with sync_playwright() as p:
    browser = p.chromium.launch(headless=False)
    page = browser.new_page()
    
    page.on("console", lambda msg: print(f"CONSOLE [{msg.type}]: {msg.text}"))
    page.on("pageerror", lambda err: print(f"PAGE ERROR: {err}"))
    
    print("Opening login page...")
    page.goto('http://localhost:3000/login.html')
    page.wait_for_load_state('networkidle')
    
    page.screenshot(path='/tmp/login_page.png', full_page=True)
    print("Screenshot saved to /tmp/login_page.png")
    
    print("\nTrying to register a new user...")
    
    create_tab = page.locator('button.auth-tab[data-tab="register"]')
    if create_tab.count() > 0:
        create_tab.click()
        page.wait_for_timeout(500)
    
    page.fill('#registerName', 'Test User')
    page.fill('#registerEmail', f'test{int(time.time())}@example.com')
    page.fill('#registerPassword', 'password123')
    page.fill('#registerConfirm', 'password123')
    
    page.screenshot(path='/tmp/register_filled.png', full_page=True)
    print("Form filled, clicking submit...")
    
    page.click('.register-form .submit-btn')
    
    page.wait_for_timeout(3000)
    
    page.screenshot(path='/tmp/register_result.png', full_page=True)
    print("Result screenshot saved to /tmp/register_result.png")
    
    error_msg = page.locator('.error-message.show')
    success_msg = page.locator('.success-message.show')
    
    if error_msg.count() > 0:
        print(f"ERROR: {error_msg.text_content()}")
    elif success_msg.count() > 0:
        print(f"SUCCESS: {success_msg.text_content()}")
    else:
        print("No visible message after registration attempt")
    
    page.wait_for_timeout(2000)
    browser.close()
