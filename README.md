# WEDE-PO-PART-1
## Student Information
Sibusiso Mokoena<br>
WEDE5020
T Mashile
Project Overview 
The Seattle Coffee Company website is a premium, immersive digital storefront and brand hub. It is designed to do more than just sell coffee; it tells the story of the Pacific Northwest’s coffee culture. The website acts as a bridge between the rainy, artistic streets of Seattle and the customer's kitchen, offering a curated selection of small-batch roasts, brewing gear, and subscription services.

The aesthetic is "Urban Rustic"—blending moody, overcast visuals with warm, wood-toned textures to evoke the feeling of a cozy Capitol Hill café. Functionally, it is a high-performance e-commerce platform integrated with a dynamic content blog for brewing tips and origin stories.
The "At-Home Barista" (Primary): Professionals and millennials (ages 25–45) who view coffee as a craft. They own a grinder, weigh their beans, and are willing to pay a premium for single-origin, ethically sourced lots. They seek transparency and traceability.

The "Convenience Seeker": Busy individuals who love Seattle-style roasts but lack the time to visit a physical store. They are looking for a frictionless subscription model ("Set it and forget it") that delivers fresh beans to their door every two weeks.

The "Gift Giver": Customers purchasing curated gift boxes (mugs + beans + syrups) for friends and family who are coffee enthusiasts.
The Problem: Coffee lovers often struggle to find fresh, high-quality roast dates outside of local roasteries. They are overwhelmed by vague tasting notes ("chocolate" and "berry" mean nothing without context) and are frustrated by subscription services that lock them into rigid schedules without flexibility.

The Solution:

Transparency: Every product page features the exact "Roasted On" date and a detailed flavor wheel specific to that batch.
Flexibility: The subscription manager allows users to pause, swap beans, or change delivery frequencies with a single click (no phone calls required).
Education: The website solves the "knowledge gap" by providing AI-driven brew guides—users input their brewing method (e.g., Chemex, AeroPress), and the site outputs the precise water temperature and grind size for that specific bean.
In essence, Seattle Coffee Company exists to ensure that no matter where you live, you can experience the perfect cup of Seattle rain-soaked perfection without the pretension. It delivers confidence in every bag.
The website aims to position Seattle Coffee Company as the definitive digital ambassador for Seattle-style roasting. Beyond selling beans, the site must become a trusted educational resource—teaching visitors about origin stories, roast profiles, and brewing science—so that customers associate the brand with expertise, authenticity, and the soul of the Pacific Northwest.
The website is designed to convert one-time buyers into lifelong subscribers. By prioritizing a seamless subscription experience, flexible delivery scheduling, and personalized product recommendations, the goal is to reduce churn and build a loyal community that repeatedly chooses Seattle Coffee Company over local competitors or big-box retailers.
Measurable Metric: Percentage of total site visitors who complete a subscription sign-up (weekly, bi-weekly, or monthly) rather than making a one-time purchase.
Tactics: Implement a prominent "Subscribe & Save 15%" CTA on product pages, a simplified 3-step checkout flow, and an exit-intent popup offering a free tasting kit with first subscriptions.
Measurable Metric: The percentage of shoppers who add items to their cart but do not complete checkout (industry average for specialty coffee is ~25–30%).
Tactics: Deploy an abandoned cart email sequence (sent at 1 hour, 24 hours, and 48 hours), display trust badges (freshness guarantee, carbon-neutral shipping), and offer a dynamic progress bar during checkout to reduce friction. Success will be tracked via Google Analytics 4 and Shopify/E-commerce backend reports.

Allows visitors to create a secure personal account using email/password or social login (Google/Apple).

Supports two account tiers:

Standard Account: For one-time purchasers (saves shipping addresses, order history, and wishlists).

Subscriber Account: Includes all standard features, plus access to the subscription management dashboard (pause, swap beans, adjust delivery frequency, and view upcoming charges).

Implements "Magic Link" email authentication as an alternative to passwords for frictionless login.

Includes a "Forgot Password" flow with secure password reset links.
Drives Objective 1 (15% Subscription Rate): Registered users are 3x more likely to convert to subscribers because their preferences and addresses are already saved, reducing checkout friction.

Supports Goal 2 (Customer Retention): The account dashboard becomes the "home base" for loyalty, allowing users to track their roast history and reorder favorites with one click.

Data Collection: Captures first-party data (preferred roast levels, brewing methods) to personalize future email campaigns and product recommendations.
A dynamic, filterable product grid showcasing all coffee beans, brewing equipment, and gift sets.

Advanced Filtering & Sorting: Users can filter by:

Roast Level: Light, Medium, Dark, Espresso.

Origin: Ethiopia, Colombia, Sumatra, Guatemala, or Blends.

Flavor Profile: Fruity, Nutty, Chocolatey, Floral, Spicy.

Price Range: Slider-based filtering.

Dietary: Organic, Fair Trade, Decaf.

Quick View Modal: Hover or click a product to see a summary (roast date, tasting notes, brewing recommendations) without leaving the catalogue page.

Interactive Flavor Wheel: Each product page features a clickable, color-coded flavor wheel that animates to highlight the dominant notes (e.g., blueberry, dark chocolate, caramel).

Dynamic "Brew Guide" Toggle: Users select their brewing method (Pour-Over, French Press, Espresso, AeroPress), and the page updates with specific grind size, water temperature, and coffee-to-water ratio for that exact bean.

Supports Goal 1 (Brand Authority): The flavor wheel and brew guide educate users, positioning Seattle Coffee Company as an expert resource, not just a retailer.

Drives Objective 2 (Reduce Cart Abandonment): Quick View and advanced filters reduce the time users spend searching, minimizing frustration and drop-off.

Increases Average Order Value (AOV): Cross-selling recommendations (e.g., "Customers who bought this bean also bought this grinder") appear dynamically within the catalogue.

A multi-purpose contact form accessible from the footer, "Contact Us" page, and product pages (via a "Have a Question?" button).

Form Fields:

Full Name (required)

Email Address (required)

Order Number (optional – auto-populates if user is logged in)

Subject Dropdown: General Inquiry, Order Issue, Subscription Question, Wholesale/B2B, Partnership, Feedback

Message Body (required)

File Attachment (optional – for uploading photos of damaged items or receipts)

Smart Routing: Based on the subject selected, the form routes the email to the appropriate internal department:

Order Issue → Support Team (Zendesk/Helpdesk)

Subscription Question → Billing Team

Wholesale/B2B → Sales Team

General Inquiry → General Inbox

Email Integration: 

Uses SendGrid or AWS SES for reliable email delivery.

Sends an auto-confirmation email to the user with a ticket number and estimated response time (24-48 hours).

Sends a rich HTML notification to the internal team with all form data, user profile link, and order history (if logged in).

Anti-Spam Protection: Google reCAPTCHA v3 and a honeypot field to prevent bot submissions.

Supports Goal 2 (Customer Retention): Fast, routed responses to issues prevent frustration and churn. A positive support experience increases the likelihood of repeat purchases.

Supports Objective 2 (Reduce Cart Abandonment): The "Have a Question?" button on product pages allows users to clarify doubts (e.g., "Is this bean good for espresso?") before they abandon their cart out of uncertainty.

Wholesale Lead Generation: The B2B routing captures potential café/restaurant partnerships, expanding revenue streams beyond direct-to-consumer.

