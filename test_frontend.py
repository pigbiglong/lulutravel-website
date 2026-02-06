#!/usr/bin/env python3
"""Frontend testing script for lulutravel website - simplified"""

from playwright.sync_api import sync_playwright
import time

def test_website():
    results = {"pages": [], "functional": [], "suggestions": []}
    
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 1920, "height": 1080})
        page = context.new_page()
        
        console_errors = []
        page.on("console", lambda msg: console_errors.append(f"{msg.type}: {msg.text}") if msg.type == "error" else None)
        
        base_url = "http://localhost:8000"
        
        pages_to_test = [
            ("index.html", "Homepage"),
            ("about.html", "About"),
            ("product.html", "Product"),
            ("product-classic.html", "Classic"),
            ("product-culinary.html", "Culinary"),
            ("product-nature.html", "Nature"),
            ("booking.html", "Booking"),
            ("cart.html", "Cart"),
            ("login.html", "Login"),
            ("profile.html", "Profile"),
            ("blog.html", "Blog"),
            ("contact.html", "Contact"),
            ("faq.html", "FAQ"),
            ("terms.html", "Terms"),
            ("privacy.html", "Privacy"),
            ("404.html", "404"),
        ]
        
        print("=" * 60)
        print("LULUTRAVEL FRONTEND TESTING")
        print("=" * 60)
        
        # Test each page
        for filename, page_name in pages_to_test:
            console_errors.clear()
            try:
                url = f"{base_url}/{filename}"
                response = page.goto(url, wait_until="domcontentloaded", timeout=10000)
                time.sleep(0.3)
                
                issues = []
                
                # Check navigation
                nav = page.locator("nav, .navbar, header nav").first
                if not nav.is_visible():
                    issues.append("Missing visible navigation")
                
                # Check footer
                footer = page.locator("footer")
                if footer.count() == 0:
                    issues.append("Missing footer")
                
                # Check for broken images (quick check)
                broken_imgs = page.evaluate("""() => {
                    return Array.from(document.images)
                        .filter(img => !img.complete || img.naturalWidth === 0)
                        .map(img => img.src);
                }""")
                if broken_imgs:
                    issues.append(f"Broken images: {len(broken_imgs)}")
                
                # Check console errors
                if console_errors:
                    issues.append(f"Console errors: {len(console_errors)}")
                
                # Take screenshot
                page.screenshot(path=f"/tmp/lulu_{filename.replace('.html', '')}.png", full_page=True)
                
                status = "OK" if not issues else f"{len(issues)} issues"
                print(f"  {page_name:15} : {status}")
                if issues:
                    for issue in issues:
                        print(f"                    - {issue}")
                
                results["pages"].append({"page": page_name, "issues": issues})
                
            except Exception as e:
                print(f"  {page_name:15} : ERROR - {str(e)[:40]}")
        
        # Functional Tests
        print("\n" + "-" * 60)
        print("FUNCTIONAL TESTS")
        print("-" * 60)
        
        # Test 1: Mobile responsiveness
        print("\n[Mobile Responsiveness]")
        page.set_viewport_size({"width": 375, "height": 667})
        page.goto(f"{base_url}/index.html", wait_until="domcontentloaded")
        time.sleep(0.5)
        page.screenshot(path="/tmp/lulu_mobile_home.png")
        
        # Check hamburger
        hamburger = page.locator(".hamburger, .mobile-toggle, [class*='burger']")
        if hamburger.count() > 0:
            print(f"  Hamburger menu: FOUND ({hamburger.count()})")
            try:
                hamburger.first.click(timeout=3000)
                time.sleep(0.5)
                page.screenshot(path="/tmp/lulu_mobile_menu_open.png")
                print("  Mobile menu click: OK")
            except:
                print("  Mobile menu click: FAILED")
                results["suggestions"].append("Mobile menu might not be clickable")
        else:
            print("  Hamburger menu: NOT FOUND")
            results["suggestions"].append("Add hamburger menu for mobile")
        
        # Test 2: Login form
        print("\n[Login Form]")
        page.set_viewport_size({"width": 1920, "height": 1080})
        page.goto(f"{base_url}/login.html", wait_until="domcontentloaded")
        time.sleep(0.5)
        
        # Check tabs
        sign_in_tab = page.locator("text=登录, text=Sign In, [class*='tab']").first
        sign_up_tab = page.locator("text=注册, text=Sign Up, text=Register").first
        
        email_input = page.locator("input[type='email'], input[name='email']")
        password_input = page.locator("input[type='password']")
        
        print(f"  Email input: {'OK' if email_input.count() > 0 else 'MISSING'}")
        print(f"  Password input: {'OK' if password_input.count() > 0 else 'MISSING'}")
        
        # Test form validation
        if email_input.count() > 0:
            submit_btn = page.locator("button[type='submit'], input[type='submit']").first
            if submit_btn.is_visible():
                try:
                    submit_btn.click(timeout=2000)
                    time.sleep(0.3)
                    # Check if validation message appears
                    print("  Form validation: Submitted (check if validation works)")
                except:
                    print("  Form validation: Button not clickable")
        
        # Test 3: Booking form
        print("\n[Booking Form]")
        page.goto(f"{base_url}/booking.html", wait_until="domcontentloaded")
        time.sleep(0.5)
        
        date_input = page.locator("input[type='date']")
        guest_selector = page.locator("[class*='guest'], select, input[type='number']")
        
        print(f"  Date picker: {'OK' if date_input.count() > 0 else 'MISSING'}")
        print(f"  Guest selector: {'OK' if guest_selector.count() > 0 else 'MISSING'}")
        
        # Test 4: Cart
        print("\n[Shopping Cart]")
        page.goto(f"{base_url}/cart.html", wait_until="domcontentloaded")
        time.sleep(0.5)
        
        cart_items = page.locator("[class*='cart'], [class*='Cart']")
        qty_btns = page.locator("button:has-text('+'), button:has-text('-')")
        
        print(f"  Cart elements: {cart_items.count()}")
        print(f"  Quantity buttons: {qty_btns.count()}")
        
        # Test 5: Contact form
        print("\n[Contact Form]")
        page.goto(f"{base_url}/contact.html", wait_until="domcontentloaded")
        time.sleep(0.5)
        
        contact_form = page.locator("form")
        print(f"  Form present: {'OK' if contact_form.count() > 0 else 'MISSING'}")
        
        if contact_form.count() > 0:
            inputs = contact_form.first.locator("input, textarea")
            print(f"  Input fields: {inputs.count()}")
        
        # Test 6: FAQ accordion
        print("\n[FAQ Accordion]")
        page.goto(f"{base_url}/faq.html", wait_until="domcontentloaded")
        time.sleep(0.5)
        
        faq_items = page.locator("[class*='faq'], [class*='accordion'], details, .question")
        print(f"  FAQ items: {faq_items.count()}")
        
        if faq_items.count() > 0:
            try:
                faq_items.first.click(timeout=2000)
                time.sleep(0.3)
                page.screenshot(path="/tmp/lulu_faq_clicked.png")
                print("  Accordion click: OK")
            except:
                print("  Accordion click: NOT INTERACTIVE")
                results["suggestions"].append("FAQ items may need accordion interactivity")
        
        # Test 7: Scroll animations
        print("\n[Scroll Animations]")
        page.goto(f"{base_url}/index.html", wait_until="domcontentloaded")
        time.sleep(1)
        
        # Check for animation classes
        animated = page.evaluate("""() => {
            const elements = document.querySelectorAll('[class*="fade"], [class*="animate"], [class*="reveal"], [data-aos]');
            return elements.length;
        }""")
        print(f"  Animated elements: {animated}")
        
        # Scroll and screenshot
        page.evaluate("window.scrollTo(0, 500)")
        time.sleep(0.5)
        page.screenshot(path="/tmp/lulu_scroll_500.png")
        
        page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        time.sleep(0.5)
        page.screenshot(path="/tmp/lulu_scroll_bottom.png")
        
        # Test 8: Links check
        print("\n[Navigation Links]")
        page.goto(f"{base_url}/index.html", wait_until="domcontentloaded")
        
        internal_links = page.evaluate("""() => {
            const links = document.querySelectorAll('a[href]');
            return Array.from(links)
                .map(a => a.getAttribute('href'))
                .filter(href => href && !href.startsWith('http') && !href.startsWith('#') && !href.startsWith('javascript'))
                .filter((v, i, a) => a.indexOf(v) === i);  // unique
        }""")
        print(f"  Internal links found: {len(internal_links)}")
        
        broken_links = []
        for link in internal_links[:15]:  # Check first 15
            try:
                resp = page.goto(f"{base_url}/{link}", timeout=5000)
                if resp and resp.status >= 400:
                    broken_links.append(link)
            except:
                broken_links.append(link)
        
        if broken_links:
            print(f"  Broken links: {broken_links}")
            results["functional"].append(f"Broken links: {broken_links}")
        else:
            print("  All tested links: OK")
        
        browser.close()
    
    return results

if __name__ == "__main__":
    results = test_website()
    
    print("\n" + "=" * 60)
    print("SUMMARY & SUGGESTIONS")
    print("=" * 60)
    
    if results["suggestions"]:
        print("\nSuggestions for improvement:")
        for s in results["suggestions"]:
            print(f"  - {s}")
    
    if results["functional"]:
        print("\nFunctional issues:")
        for f in results["functional"]:
            print(f"  - {f}")
    
    # Count pages with issues
    pages_with_issues = [p for p in results["pages"] if p["issues"]]
    print(f"\nPages with issues: {len(pages_with_issues)}/{len(results['pages'])}")
