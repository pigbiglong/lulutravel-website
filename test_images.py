#!/usr/bin/env python3
"""Detailed image loading test"""

from playwright.sync_api import sync_playwright
import time

def test_images():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 1920, "height": 1080})
        page = context.new_page()
        
        base_url = "http://localhost:8000"
        
        print("=" * 60)
        print("IMAGE LOADING TEST")
        print("=" * 60)
        
        # Test product pages
        print("\n[Product Pages - Hero Images]")
        for page_name in ["product-classic.html", "product-culinary.html", "product-nature.html"]:
            page.goto(f"{base_url}/{page_name}", wait_until="networkidle", timeout=30000)
            time.sleep(2)  # Wait for images to load
            
            hero_img = page.locator(".product-hero-bg img").first
            if hero_img.count() > 0:
                src = hero_img.get_attribute("src")
                natural_width = hero_img.evaluate("el => el.naturalWidth")
                print(f"\n  {page_name}:")
                print(f"    Src: {src}")
                print(f"    Natural Width: {natural_width}px")
                print(f"    Status: {'OK' if natural_width > 0 else 'LOADING/ERROR'}")
        
        browser.close()
        print("\n" + "=" * 60)

if __name__ == "__main__":
    test_images()
