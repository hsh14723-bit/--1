# Security Specification: Hansol Brush Firestore Database

This document outlines the security invariants, validation rules, and vulnerability profiles for the `gallery` and `inquiries` collections in Hansol Brush's cloud-synced database.

## 1. Data Invariants

1. **Gallery Items (`/gallery/{galleryId}`)**
   - Any visitor can read the gallery items.
   - Creating/deleting a gallery item is restricted to the administrator. (Verified client-side via passcode/admin session, and constrained in Firestore with strict schema and value size limits to prevent database flood abuse).
   - `id` must be a valid document ID string.
   - `title` must be a string up to 128 characters.
   - `description` must be a string up to 1000 characters.
   - `imageUrl` must be a string representing the image (URL or uncompressed raw base64 string).
   - `category` must be either `'production'` or `'industry'`.
   - `createdAt` must be a valid ISO date string.

2. **Inquiries (`/inquiries/{inquiryId}`)**
   - Any visitor can create a new inquiry (quote request).
   - Read/update/delete of inquiries is strictly private (for administrative tracking).
   - `clientName` must be a string up to 128 characters.
   - `phone` must be a string up to 32 characters.
   - `brushType` must be a string up to 128 characters.
   - `content` must be a string up to 3000 characters.
   - `status` must be either `'pending'` or `'completed'`.
   - `createdAt` must be a valid ISO date string.

---

## 2. The "Dirty Dozen" Target Vulnerability Payloads

These 12 scenarios represent malicious or invalid database writes that our security rules must lock down:

1. **Gallery: Spoofed ID Injection** - Injecting custom `/gallery/..%2F..%2Fmalicious` path elements.
2. **Gallery: Extreme Title Flooder** - Writing a title string larger than 128 characters.
3. **Gallery: Ghost Fields (Shadow Update)** - Adding unrequested field structures like `isApproved: true` to bypass administrative moderation.
4. **Gallery: Invalid Category** - Setting `category` to a value other than `production` or `industry`.
5. **Gallery: Type Mismatch** - Submitting `createdAt` as a boolean instead of an ISO date string.
6. **Gallery: Massive Description** - Submitting a `description` exceeding 1000 characters to drain resources.
7. **Inquiry: System Status Spoofing** - Submitting a new inquiry initialized with `status: 'completed'`.
8. **Inquiry: Client Name Exceeding Limit** - Creating an inquiry with a `clientName` exceeding 128 characters (denial of wallet via database storage inflation).
9. **Inquiry: Missing Mandatory Field** - Submitting an inquiry without the client's `phone` number.
10. **Inquiry: Extra Shadow Field** - Injecting system fields like `adminNotes: 'Spam approved'` or `isAdmin: true` into an inquiry.
11. **Inquiry: Unauthorized Admin Lockout Read** - Accessing all inquiries without authenticating.
12. **Inquiry: Invalid Value Type** - Passing a number or array as the `content` field.

---

## 3. Test Runner Design

We build a validator mapping matching tests against these payloads to guarantee they are strictly rejected by the ruleset.
