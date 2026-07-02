"use client";

import { useEffect, useState, useTransition } from "react";

interface BusinessHoursDay {
  day: string;
  open?: string;
  close?: string;
  closed?: boolean;
}

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const DEFAULT_HOURS: BusinessHoursDay[] = DAYS.map((day) => ({
  day,
  open: "10:00",
  close: "19:00",
  closed: day === "Monday" || day === "Sunday",
}));

/* ── Helpers ── */

function SectionHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="admin-card-header" style={{ flexDirection: "column", alignItems: "flex-start", gap: "4px" }}>
      <h3 className="admin-card-title">{title}</h3>
      <p style={{ fontSize: "0.78rem", color: "#8C7B6B", fontWeight: 300, lineHeight: 1.5, margin: 0 }}>{description}</p>
    </div>
  );
}

function FieldHint({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize: "0.72rem", color: "#A89B8E", marginTop: "4px", lineHeight: 1.4 }}>{children}</p>;
}

function RequiredDot() {
  return <span style={{ color: "#D4B8A8", marginLeft: "2px" }}>*</span>;
}

/* ── Main Component ── */

export default function CompanySettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, startSave] = useTransition();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  // Form state
  const [businessName, setBusinessName] = useState("Lather Head Spa");
  const [tagline, setTagline] = useState("");
  const [businessDescription, setBusinessDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneSecondary, setPhoneSecondary] = useState("");
  const [email, setEmail] = useState("");
  const [emailSupport, setEmailSupport] = useState("");
  const [contactFormEmail, setContactFormEmail] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("US");
  const [googleMapsUrl, setGoogleMapsUrl] = useState("");
  const [hours, setHours] = useState<BusinessHoursDay[]>(DEFAULT_HOURS);
  const [hoursNote, setHoursNote] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [facebookUrl, setFacebookUrl] = useState("");
  const [tiktokUrl, setTiktokUrl] = useState("");
  const [bookingUrl, setBookingUrl] = useState("/book");
  const [bookingCtaLabel, setBookingCtaLabel] = useState("Book Your Ritual");
  const [giftCardUrl, setGiftCardUrl] = useState("/gift-cards");
  const [announcementText, setAnnouncementText] = useState("");
  const [announcementActive, setAnnouncementActive] = useState(false);
  const [copyrightText, setCopyrightText] = useState("");

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((data) => {
        if (data.settings) {
          const s = data.settings;
          setBusinessName(s.businessName || "");
          setTagline(s.tagline || "");
          setBusinessDescription(s.businessDescription || "");
          setPhone(s.phone || "");
          setPhoneSecondary(s.phoneSecondary || "");
          setEmail(s.email || "");
          setEmailSupport(s.emailSupport || "");
          setContactFormEmail(s.contactFormEmail || "");
          setAddressLine1(s.addressLine1 || "");
          setAddressLine2(s.addressLine2 || "");
          setCity(s.city || "");
          setState(s.state || "");
          setZip(s.zip || "");
          setCountry(s.country || "US");
          setGoogleMapsUrl(s.googleMapsUrl || "");
          setHours(s.businessHours?.length ? s.businessHours : DEFAULT_HOURS);
          setHoursNote(s.hoursNote || "");
          setInstagramUrl(s.instagramUrl || "");
          setFacebookUrl(s.facebookUrl || "");
          setTiktokUrl(s.tiktokUrl || "");
          setBookingUrl(s.bookingUrl || "/book");
          setBookingCtaLabel(s.bookingCtaLabel || "Book Your Ritual");
          setGiftCardUrl(s.giftCardUrl || "/gift-cards");
          setAnnouncementText(s.announcementText || "");
          setAnnouncementActive(s.announcementActive || false);
          setCopyrightText(s.copyrightText || "");
          if (s.updatedAt) {
            setLastSaved(new Date(s.updatedAt).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }));
          }
        }
      })
      .catch(() => setError("Failed to load settings."))
      .finally(() => setLoading(false));
  }, []);

  function handleSave() {
    setError("");
    setSuccess("");
    startSave(async () => {
      try {
        const res = await fetch("/api/admin/settings", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            businessName, tagline, businessDescription,
            phone, phoneSecondary, email, emailSupport, contactFormEmail,
            addressLine1, addressLine2, city, state, zip, country, googleMapsUrl,
            businessHours: hours, hoursNote,
            instagramUrl, facebookUrl, tiktokUrl,
            bookingUrl, bookingCtaLabel, giftCardUrl,
            announcementText, announcementActive, copyrightText,
          }),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Failed to save.");
        } else {
          setSuccess("All changes saved. Your website has been updated.");
          setLastSaved(new Date().toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }));
          setTimeout(() => setSuccess(""), 5000);
        }
      } catch {
        setError("Network error. Please check your connection and try again.");
      }
    });
  }

  function updateHour(index: number, field: string, value: string | boolean) {
    setHours((prev) =>
      prev.map((h, i) => (i === index ? { ...h, [field]: value } : h))
    );
  }

  function formatTimeDisplay(time: string) {
    const [h, m] = time.split(":").map(Number);
    const ampm = h >= 12 ? "PM" : "AM";
    const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
    return `${h12}:${String(m).padStart(2, "0")} ${ampm}`;
  }

  if (loading) {
    return (
      <>
        <div className="admin-topbar"><h1 className="admin-topbar-title">Company Settings</h1></div>
        <div className="admin-content" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "300px" }}>
          <p style={{ color: "#8C7B6B", fontSize: "0.88rem" }}>Loading your business settings...</p>
        </div>
      </>
    );
  }

  return (
    <>
      {/* ── Top Bar ── */}
      <div className="admin-topbar">
        <div>
          <h1 className="admin-topbar-title">Company Settings</h1>
          {lastSaved && (
            <p style={{ fontSize: "0.7rem", color: "#8C7B6B", marginTop: "2px" }}>Last saved {lastSaved}</p>
          )}
        </div>
        <div className="admin-topbar-actions">
          <button
            className="admin-btn admin-btn-primary"
            onClick={handleSave}
            disabled={saving}
            style={{ minWidth: "140px" }}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      <div className="admin-content" style={{ maxWidth: "880px" }}>
        {/* Alerts */}
        {error && (
          <div className="admin-alert admin-alert-error" style={{ marginBottom: "24px" }}>
            <span style={{ fontSize: "1.1rem" }}>!</span><div>{error}</div>
          </div>
        )}
        {success && (
          <div className="admin-alert admin-alert-success" style={{ marginBottom: "24px" }}>
            <span style={{ fontSize: "1rem" }}>&#10003;</span><div>{success}</div>
          </div>
        )}

        {/* Intro note */}
        <div style={{ padding: "16px 20px", background: "rgba(212,184,168,0.08)", borderRadius: "8px", marginBottom: "28px", border: "1px solid rgba(212,184,168,0.15)" }}>
          <p style={{ fontSize: "0.82rem", color: "#5C4E42", lineHeight: 1.6, margin: 0 }}>
            Changes you make here will automatically update across your entire website — including the footer, contact page, booking pages, and search engine listings.
          </p>
        </div>

        {/* ── General Information ── */}
        <div className="admin-card" style={{ marginBottom: "24px" }}>
          <SectionHeader
            title="General Information"
            description="Your business name and tagline as they appear across the website."
          />
          <div className="admin-card-body">
            <div className="admin-form-grid admin-form-grid-2" style={{ marginBottom: "20px" }}>
              <div className="admin-form-group">
                <label className="admin-label">Business Name<RequiredDot /></label>
                <input className="admin-input" value={businessName} onChange={(e) => setBusinessName(e.target.value)} />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Tagline</label>
                <input className="admin-input" value={tagline} onChange={(e) => setTagline(e.target.value)} placeholder="Where the scalp breathes again." />
                <FieldHint>A short phrase that appears in the footer and metadata.</FieldHint>
              </div>
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Business Description</label>
              <textarea className="admin-textarea" value={businessDescription} onChange={(e) => setBusinessDescription(e.target.value)} rows={3} placeholder="A brief description of your business for search engines and social media..." style={{ minHeight: "80px" }} />
              <FieldHint>Used in search results and when your site is shared on social media.</FieldHint>
            </div>
          </div>
        </div>

        {/* ── Contact Information ── */}
        <div className="admin-card" style={{ marginBottom: "24px" }}>
          <SectionHeader
            title="Contact Information"
            description="Phone numbers and email addresses displayed on your website."
          />
          <div className="admin-card-body">
            <div className="admin-form-grid admin-form-grid-2" style={{ marginBottom: "20px" }}>
              <div className="admin-form-group">
                <label className="admin-label">Phone Number<RequiredDot /></label>
                <input className="admin-input" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(252) 531-0987" />
                <FieldHint>Shown in the footer, contact page, and booking sections.</FieldHint>
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Secondary Phone</label>
                <input className="admin-input" type="tel" value={phoneSecondary} onChange={(e) => setPhoneSecondary(e.target.value)} placeholder="Optional" />
              </div>
            </div>
            <div className="admin-form-grid admin-form-grid-2" style={{ marginBottom: "20px" }}>
              <div className="admin-form-group">
                <label className="admin-label">Email Address<RequiredDot /></label>
                <input className="admin-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="hello@latherspas.com" />
                <FieldHint>Your main public-facing email address.</FieldHint>
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Support Email</label>
                <input className="admin-input" type="email" value={emailSupport} onChange={(e) => setEmailSupport(e.target.value)} placeholder="Optional" />
              </div>
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Contact Form Recipient</label>
              <input className="admin-input" type="email" value={contactFormEmail} onChange={(e) => setContactFormEmail(e.target.value)} placeholder="Where contact form submissions are sent (defaults to primary email)" />
            </div>
          </div>
        </div>

        {/* ── Address & Location ── */}
        <div className="admin-card" style={{ marginBottom: "24px" }}>
          <SectionHeader
            title="Address & Location"
            description="Your physical location — shown in the footer, contact page, and Google search results."
          />
          <div className="admin-card-body">
            <div className="admin-form-group" style={{ marginBottom: "16px" }}>
              <label className="admin-label">Street Address<RequiredDot /></label>
              <input className="admin-input" value={addressLine1} onChange={(e) => setAddressLine1(e.target.value)} placeholder="620 Lynndale Court" />
            </div>
            <div className="admin-form-group" style={{ marginBottom: "16px" }}>
              <label className="admin-label">Address Line 2</label>
              <input className="admin-input" value={addressLine2} onChange={(e) => setAddressLine2(e.target.value)} placeholder="Suite, unit, building, etc." />
            </div>
            <div className="admin-form-grid admin-form-grid-2" style={{ marginBottom: "16px" }}>
              <div className="admin-form-group">
                <label className="admin-label">City<RequiredDot /></label>
                <input className="admin-input" value={city} onChange={(e) => setCity(e.target.value)} />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">State<RequiredDot /></label>
                <input className="admin-input" value={state} onChange={(e) => setState(e.target.value)} maxLength={2} style={{ textTransform: "uppercase" }} />
              </div>
            </div>
            <div className="admin-form-grid admin-form-grid-2">
              <div className="admin-form-group">
                <label className="admin-label">ZIP Code</label>
                <input className="admin-input" value={zip} onChange={(e) => setZip(e.target.value)} />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Country</label>
                <input className="admin-input" value={country} onChange={(e) => setCountry(e.target.value)} />
              </div>
            </div>
            <div className="admin-form-group" style={{ marginTop: "20px" }}>
              <label className="admin-label">Google Maps Link</label>
              <input className="admin-input" value={googleMapsUrl} onChange={(e) => setGoogleMapsUrl(e.target.value)} placeholder="Paste your Google Maps share link here" type="url" />
              <FieldHint>Used for the &ldquo;Get Directions&rdquo; link on your contact page.</FieldHint>
            </div>
          </div>
        </div>

        {/* ── Business Hours ── */}
        <div className="admin-card" style={{ marginBottom: "24px" }}>
          <SectionHeader
            title="Business Hours"
            description="Your operating hours — displayed in the footer, contact page, and Google search results."
          />
          <div className="admin-card-body">
            <div style={{ borderRadius: "8px", overflow: "hidden", border: "1px solid rgba(140,123,107,0.12)" }}>
              {/* Table header */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 80px 1fr 1fr", gap: "12px", padding: "10px 16px", background: "rgba(140,123,107,0.04)", borderBottom: "1px solid rgba(140,123,107,0.08)" }}>
                <span style={{ fontSize: "0.68rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "#8C7B6B" }}>Day</span>
                <span style={{ fontSize: "0.68rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "#8C7B6B" }}>Status</span>
                <span style={{ fontSize: "0.68rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "#8C7B6B" }}>Opens</span>
                <span style={{ fontSize: "0.68rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "#8C7B6B" }}>Closes</span>
              </div>
              {hours.map((h, i) => (
                <div
                  key={h.day}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 80px 1fr 1fr",
                    gap: "12px",
                    alignItems: "center",
                    padding: "12px 16px",
                    background: h.closed ? "rgba(140,123,107,0.02)" : "#fff",
                    borderBottom: i < hours.length - 1 ? "1px solid rgba(140,123,107,0.06)" : "none",
                  }}
                >
                  <span style={{ fontSize: "0.88rem", fontWeight: h.closed ? 400 : 500, color: h.closed ? "#A89B8E" : "#3D2E22" }}>
                    {h.day}
                  </span>
                  <label style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      checked={!h.closed}
                      onChange={(e) => updateHour(i, "closed", !e.target.checked)}
                      style={{ accentColor: "#3A6B37", width: "16px", height: "16px" }}
                    />
                    <span style={{ fontSize: "0.75rem", fontWeight: 500, color: h.closed ? "#c0392b" : "#3A6B37" }}>
                      {h.closed ? "Closed" : "Open"}
                    </span>
                  </label>
                  {!h.closed ? (
                    <>
                      <input
                        type="time"
                        className="admin-input"
                        value={h.open || "10:00"}
                        onChange={(e) => updateHour(i, "open", e.target.value)}
                        style={{ padding: "8px 10px", fontSize: "0.82rem" }}
                      />
                      <input
                        type="time"
                        className="admin-input"
                        value={h.close || "19:00"}
                        onChange={(e) => updateHour(i, "close", e.target.value)}
                        style={{ padding: "8px 10px", fontSize: "0.82rem" }}
                      />
                    </>
                  ) : (
                    <>
                      <span style={{ fontSize: "0.82rem", color: "#ccc" }}>—</span>
                      <span style={{ fontSize: "0.82rem", color: "#ccc" }}>—</span>
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* Hours preview */}
            <div style={{ marginTop: "16px", padding: "12px 16px", background: "rgba(212,184,168,0.06)", borderRadius: "6px", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "0.72rem", color: "#8C7B6B", fontWeight: 500 }}>Preview:</span>
              <span style={{ fontSize: "0.82rem", color: "#3D2E22" }}>
                {(() => {
                  const openDays = hours.filter((d) => !d.closed && d.open && d.close);
                  if (openDays.length === 0) return "No open hours set";
                  const first = openDays[0];
                  const last = openDays[openDays.length - 1];
                  return `${first.day.substring(0, 3)} – ${last.day.substring(0, 3)} · ${formatTimeDisplay(first.open!)} – ${formatTimeDisplay(first.close!)}`;
                })()}
              </span>
            </div>

            <div className="admin-form-group" style={{ marginTop: "16px" }}>
              <label className="admin-label">Special Hours Note</label>
              <input className="admin-input" value={hoursNote} onChange={(e) => setHoursNote(e.target.value)} placeholder="e.g. Closed for holidays Dec 24–26" />
              <FieldHint>Optional note shown alongside your hours (holiday closures, special schedules, etc.)</FieldHint>
            </div>
          </div>
        </div>

        {/* ── Social Media ── */}
        <div className="admin-card" style={{ marginBottom: "24px" }}>
          <SectionHeader
            title="Social Media"
            description="Links to your social profiles — shown in the website footer."
          />
          <div className="admin-card-body">
            <div style={{ display: "grid", gap: "16px" }}>
              <div className="admin-form-group">
                <label className="admin-label" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  Instagram
                </label>
                <input className="admin-input" value={instagramUrl} onChange={(e) => setInstagramUrl(e.target.value)} placeholder="https://www.instagram.com/yourhandle" type="url" />
              </div>
              <div className="admin-form-group">
                <label className="admin-label" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  Facebook
                </label>
                <input className="admin-input" value={facebookUrl} onChange={(e) => setFacebookUrl(e.target.value)} placeholder="https://www.facebook.com/yourpage" type="url" />
              </div>
              <div className="admin-form-group">
                <label className="admin-label" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  TikTok
                </label>
                <input className="admin-input" value={tiktokUrl} onChange={(e) => setTiktokUrl(e.target.value)} placeholder="https://www.tiktok.com/@yourhandle" type="url" />
              </div>
            </div>
            <FieldHint>Leave any field blank to hide that platform from your website.</FieldHint>
          </div>
        </div>

        {/* ── Booking & Links ── */}
        <div className="admin-card" style={{ marginBottom: "24px" }}>
          <SectionHeader
            title="Booking & Links"
            description="Configure your booking button and key page links."
          />
          <div className="admin-card-body">
            <div className="admin-form-grid admin-form-grid-2" style={{ marginBottom: "20px" }}>
              <div className="admin-form-group">
                <label className="admin-label">Booking Page URL</label>
                <input className="admin-input" value={bookingUrl} onChange={(e) => setBookingUrl(e.target.value)} />
                <FieldHint>Where &ldquo;Book Now&rdquo; buttons link to.</FieldHint>
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Booking Button Text</label>
                <input className="admin-input" value={bookingCtaLabel} onChange={(e) => setBookingCtaLabel(e.target.value)} />
                <FieldHint>The label shown on primary booking buttons.</FieldHint>
              </div>
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Gift Card Page URL</label>
              <input className="admin-input" value={giftCardUrl} onChange={(e) => setGiftCardUrl(e.target.value)} />
            </div>
          </div>
        </div>

        {/* ── Announcement Banner ── */}
        <div className="admin-card" style={{ marginBottom: "24px" }}>
          <SectionHeader
            title="Announcement Banner"
            description="Show a temporary message at the top of your website — great for promotions, holiday hours, or closures."
          />
          <div className="admin-card-body">
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px", padding: "12px 16px", background: announcementActive ? "rgba(58,107,55,0.06)" : "rgba(140,123,107,0.04)", borderRadius: "6px", border: `1px solid ${announcementActive ? "rgba(58,107,55,0.15)" : "rgba(140,123,107,0.08)"}` }}>
              <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", flex: 1 }}>
                <input
                  type="checkbox"
                  checked={announcementActive}
                  onChange={(e) => setAnnouncementActive(e.target.checked)}
                  style={{ accentColor: "#3A6B37", width: "18px", height: "18px" }}
                />
                <div>
                  <span style={{ fontSize: "0.88rem", fontWeight: 500, color: announcementActive ? "#3A6B37" : "#8C7B6B" }}>
                    {announcementActive ? "Banner is live on your website" : "Banner is hidden"}
                  </span>
                </div>
              </label>
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Banner Message</label>
              <input className="admin-input" value={announcementText} onChange={(e) => setAnnouncementText(e.target.value)} placeholder="e.g. Now booking holiday appointments — reserve your spot early!" />
            </div>
          </div>
        </div>

        {/* ── Footer & Copyright ── */}
        <div className="admin-card" style={{ marginBottom: "24px" }}>
          <SectionHeader
            title="Footer & Copyright"
            description="Customize the copyright text that appears at the bottom of every page."
          />
          <div className="admin-card-body">
            <div className="admin-form-group">
              <label className="admin-label">Copyright Text</label>
              <input className="admin-input" value={copyrightText} onChange={(e) => setCopyrightText(e.target.value)} placeholder={`Leave blank for default: © ${new Date().getFullYear()} ${businessName} · ${city}, ${state}`} />
              <FieldHint>If left blank, the copyright will automatically use your business name and location.</FieldHint>
            </div>
          </div>
        </div>

        {/* ── Bottom Save Bar ── */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 0 48px", borderTop: "1px solid rgba(140,123,107,0.08)", marginTop: "8px" }}>
          <p style={{ fontSize: "0.78rem", color: "#A89B8E" }}>
            {lastSaved ? `Last saved ${lastSaved}` : "No changes saved yet"}
          </p>
          <button
            className="admin-btn admin-btn-primary"
            onClick={handleSave}
            disabled={saving}
            style={{ minWidth: "160px", padding: "14px 32px" }}
          >
            {saving ? "Saving..." : "Save All Changes"}
          </button>
        </div>
      </div>
    </>
  );
}
