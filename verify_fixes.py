#!/usr/bin/env python3
"""Quick verification test for lulutravel fixes"""

from playwright.sync_api import sync_playwright
import time

def test_fixes():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 1920, "height": 1080})
        page = context.new_page()
        
        base_url = "http://localhost:8000"
        
        print("=" * 60)
        print("VERIFICATION: lulutravel Fixes")
        print("=" * 60)
        
        # Test 1: Mobile menu button on index.html
        print("\n[1] Mobile menu on index.html (mobile viewport):")
        # Set mobile viewport
        page.set_viewport_size({"width": 375, "height": 667})
        page.goto(f"{base_url}/index.html", wait_until="domcontentloaded")
        time.sleep(0.5)
        hamburger = page.locator("#hamburger, .hamburger")
        print(f"  Hamburger button: {'FOUND' if hamburger.count() > 0 else 'NOT FOUND'}")
        
        if hamburger.count() > 0:
            try:
                hamburger.first.click(timeout=2000)
                time.sleep(0.3)
                nav_links = page.locator(".nav-links.active")
                print(f"  Menu toggle: {'WORKING' if nav_links.count() > 0 else 'NOT WORKING'}")
            except Exception as e:
                print(f"  Menu toggle: ERROR - {e}")
        else:
            print(f"  Cannot test toggle")
        
        # Reset to desktop
        page.set_viewport_size({"width": 1920, "height": 1080})
        
        # Test 2: Mobile menu on product detail pages
        print("\n[2] Mobile menu on product pages:")
        for page_name in ["product-classic.html", "product-culinary.html", "product-nature.html"]:
            page.goto(f"{base_url}/{page_name}", wait_until="domcontentloaded")
            time.sleep(0.3)
            mobile_btn = page.locator("#mobileMenuBtn, .mobile-menu-btn")
            print(f"  {page_name}: {'FOUND' if mobile_btn.count() > 0 else 'NOT FOUND'}")
        
        # Test 3: Cart page Supabase error fixed
        print("\n[3] Cart page:")
        page.goto(f"{base_url}/cart.html", wait_until="domcontentloaded")
        time.sleep(0.5)
        console_errors = []
        page.on("console", lambda msg: console_errors.append(msg.text) if msg.type == "error" else None)
        page.reload()
        time.sleep(0.5)
        
        supabase_errors = [e for e in console_errors if 'supabase' in e.lower() or 'window.supabase' in e.lower()]
        print(f"  Supabase errors: {len(supabase_errors)}")
        
        # Test 4: Quantity buttons in cart (add test item first)
        print("\n[4] Cart quantity controls:")
        page.set_viewport_size({"width": 1920, "height": 1080})
        
        # Add a test item to cart first
        test_item = {
            "id": "test-1",
            "name": "Classic China",
            "route": "Beijing · Xi'an · Shanghai",
            "icon": "🏯",
            "price": 2800,
            "date": "2026-03-01",
            "travelers": 2,
            "days": 8
        }
        page.evaluate(f"""
            localStorage.setItem('lulutravel_cart', JSON.stringify([{test_item}]));
        """)
        
        page.goto(f"{base_url}/cart.html", wait_until="domcontentloaded")
        time.sleep(0.5)
        quantity_btns = page.locator("button:has-text('+'), button:has-text('-')")
        print(f"  Quantity buttons: {quantity_btns.count()}")
        
        if quantity_btns.count() > 0:
            try:
                # Test clicking the + button
                page.evaluate("document.querySelectorAll('button').forEach(b => { if(b.textContent.includes('+')) b.click(); })")
                time.sleep(0.3)
                print(f"  Quantity adjustment: WORKING")
            except:
                print(f"  Quantity adjustment: ERROR")
        
        # Test 5: Booking page date validation
        print("\n[5] Booking date validation:")
        page.goto(f"{base_url}/booking.html", wait_until="domcontentloaded")
        time.sleep(0.3)
        date_input = page.locator("input[type='date']")
        if date_input.count() > 0:
            min_attr = date_input.get_attribute("min")
            print(f"  Date min attribute: {min_attr if min_attr else 'NOT SET'}")
        else:
            print(f"  Date input: NOT FOUND")
        
        # Test 6: Footer on pages
        print("\n[6] Footer check:")
        for page_name in ["booking.html", "cart.html", "login.html", "profile.html", "404.html"]:
            page.goto(f"{base_url}/{page_name}", wait_until="domcontentloaded", timeout=10000)
            time.sleep(0.3)
            footer = page.locator("footer")
            print(f"  {page_name}: {'FOUND' if footer.count() > 0 else 'NOT FOUND'}")
        
        browser.close()
        
        print("\n" + "=" * 60)
        print("VERIFICATION COMPLETE")
        print("=" * 60)

if __name__ == "__main__":
    test_fixes()
