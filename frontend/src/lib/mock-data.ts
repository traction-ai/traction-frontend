import type {
  User,
  Project,
  ProjectDocument,
  ChatMessage,
  Feedback,
  ShareLink,
  AiSuggestion,
} from "@/types";

// ---------------------------------------------------------------------------
// Users
// ---------------------------------------------------------------------------

export const currentUser: User = {
  id: "user-1",
  email: "alex@example.com",
  username: "alex.chen",
  is_active: true,
  display_name: "Alex Chen",
  avatar_url: null,
  created_at: "2025-09-15T08:00:00Z",
};

// ---------------------------------------------------------------------------
// Slide HTML helpers — each project gets 8 pitch-deck slides
// ---------------------------------------------------------------------------

function slideHtml(inner: string): string {
  return `<div style="padding: 60px; text-align: left; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;">${inner}</div>`;
}

// ---- Project 1: NovaPay (shared) ------------------------------------------

const novaPaySlides: string[] = [
  // 1 — Title
  slideHtml(`
    <h1 style="font-size: 56px; font-weight: 900; letter-spacing: -0.03em; margin-bottom: 16px; color: #000;">NovaPay</h1>
    <p style="font-size: 26px; color: #555; max-width: 600px; line-height: 1.4;">Instant cross-border payments for freelancers and small businesses.</p>
    <p style="font-size: 16px; color: #999; margin-top: 40px;">Series A &middot; Q1 2026</p>
  `),
  // 2 — Problem
  slideHtml(`
    <p style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; color: #999; margin-bottom: 12px;">The Problem</p>
    <h2 style="font-size: 40px; font-weight: 800; margin-bottom: 24px; color: #000;">Cross-border payments are broken</h2>
    <ul style="font-size: 20px; line-height: 2; color: #333; list-style: none; padding: 0;">
      <li style="margin-bottom: 8px;">&bull; Average transfer takes 3-5 business days</li>
      <li style="margin-bottom: 8px;">&bull; Hidden fees average 6.8% per transaction</li>
      <li style="margin-bottom: 8px;">&bull; 73% of freelancers report cash-flow issues due to slow payouts</li>
      <li>&bull; $150B lost annually to intermediary costs</li>
    </ul>
  `),
  // 3 — Solution
  slideHtml(`
    <p style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; color: #999; margin-bottom: 12px;">Our Solution</p>
    <h2 style="font-size: 40px; font-weight: 800; margin-bottom: 24px; color: #000;">Payments that arrive in seconds, not days</h2>
    <div style="display: flex; gap: 40px; margin-top: 32px;">
      <div style="flex: 1;">
        <h3 style="font-size: 20px; font-weight: 700; margin-bottom: 8px;">Instant Settlement</h3>
        <p style="font-size: 16px; color: #555; line-height: 1.6;">Real-time settlement across 48 currencies using our proprietary liquidity network.</p>
      </div>
      <div style="flex: 1;">
        <h3 style="font-size: 20px; font-weight: 700; margin-bottom: 8px;">Transparent Pricing</h3>
        <p style="font-size: 16px; color: #555; line-height: 1.6;">Flat 0.5% fee with no hidden costs. Users see the exact amount before sending.</p>
      </div>
      <div style="flex: 1;">
        <h3 style="font-size: 20px; font-weight: 700; margin-bottom: 8px;">Built for Freelancers</h3>
        <p style="font-size: 16px; color: #555; line-height: 1.6;">Invoice management, tax reports, and multi-currency wallets in one dashboard.</p>
      </div>
    </div>
  `),
  // 4 — Market Size
  slideHtml(`
    <p style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; color: #999; margin-bottom: 12px;">Market Opportunity</p>
    <h2 style="font-size: 40px; font-weight: 800; margin-bottom: 40px; color: #000;">A $2.8 trillion market</h2>
    <div style="display: flex; gap: 48px;">
      <div style="text-align: center;">
        <p style="font-size: 48px; font-weight: 900; color: #000;">$2.8T</p>
        <p style="font-size: 14px; color: #999; text-transform: uppercase; letter-spacing: 0.05em;">TAM</p>
        <p style="font-size: 14px; color: #666;">Global cross-border B2B payments</p>
      </div>
      <div style="text-align: center;">
        <p style="font-size: 48px; font-weight: 900; color: #000;">$420B</p>
        <p style="font-size: 14px; color: #999; text-transform: uppercase; letter-spacing: 0.05em;">SAM</p>
        <p style="font-size: 14px; color: #666;">Freelancer &amp; SMB segment</p>
      </div>
      <div style="text-align: center;">
        <p style="font-size: 48px; font-weight: 900; color: #000;">$18B</p>
        <p style="font-size: 14px; color: #999; text-transform: uppercase; letter-spacing: 0.05em;">SOM</p>
        <p style="font-size: 14px; color: #666;">Reachable in 5 years</p>
      </div>
    </div>
  `),
  // 5 — Business Model
  slideHtml(`
    <p style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; color: #999; margin-bottom: 12px;">Business Model</p>
    <h2 style="font-size: 40px; font-weight: 800; margin-bottom: 32px; color: #000;">How we make money</h2>
    <div style="display: flex; gap: 40px;">
      <div style="flex: 1; border: 1px solid #eee; border-radius: 8px; padding: 24px;">
        <h3 style="font-size: 20px; font-weight: 700; margin-bottom: 8px;">Transaction Fees</h3>
        <p style="font-size: 32px; font-weight: 900; color: #000;">0.5%</p>
        <p style="font-size: 14px; color: #666; margin-top: 8px;">Per transfer &mdash; 80% of revenue</p>
      </div>
      <div style="flex: 1; border: 1px solid #eee; border-radius: 8px; padding: 24px;">
        <h3 style="font-size: 20px; font-weight: 700; margin-bottom: 8px;">Premium Plans</h3>
        <p style="font-size: 32px; font-weight: 900; color: #000;">$29/mo</p>
        <p style="font-size: 14px; color: #666; margin-top: 8px;">Advanced analytics &amp; priority support</p>
      </div>
      <div style="flex: 1; border: 1px solid #eee; border-radius: 8px; padding: 24px;">
        <h3 style="font-size: 20px; font-weight: 700; margin-bottom: 8px;">FX Spread</h3>
        <p style="font-size: 32px; font-weight: 900; color: #000;">0.1%</p>
        <p style="font-size: 14px; color: #666; margin-top: 8px;">Thin margin on currency conversion</p>
      </div>
    </div>
  `),
  // 6 — Traction
  slideHtml(`
    <p style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; color: #999; margin-bottom: 12px;">Traction</p>
    <h2 style="font-size: 40px; font-weight: 800; margin-bottom: 40px; color: #000;">Growing 24% month-over-month</h2>
    <div style="display: flex; gap: 48px;">
      <div>
        <p style="font-size: 48px; font-weight: 900; color: #000;">12,400</p>
        <p style="font-size: 14px; color: #666;">Active users</p>
      </div>
      <div>
        <p style="font-size: 48px; font-weight: 900; color: #000;">$8.2M</p>
        <p style="font-size: 14px; color: #666;">Monthly volume</p>
      </div>
      <div>
        <p style="font-size: 48px; font-weight: 900; color: #000;">$1.4M</p>
        <p style="font-size: 14px; color: #666;">ARR</p>
      </div>
      <div>
        <p style="font-size: 48px; font-weight: 900; color: #000;">4.8</p>
        <p style="font-size: 14px; color: #666;">App Store rating</p>
      </div>
    </div>
  `),
  // 7 — Team
  slideHtml(`
    <p style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; color: #999; margin-bottom: 12px;">Team</p>
    <h2 style="font-size: 40px; font-weight: 800; margin-bottom: 32px; color: #000;">Built by fintech veterans</h2>
    <div style="display: flex; gap: 40px;">
      <div style="flex: 1;">
        <p style="font-size: 20px; font-weight: 700;">Sarah Lin</p>
        <p style="font-size: 14px; color: #999;">CEO &amp; Co-founder</p>
        <p style="font-size: 14px; color: #555; margin-top: 8px; line-height: 1.5;">Former VP of Product at Stripe. 12 years in payments infrastructure.</p>
      </div>
      <div style="flex: 1;">
        <p style="font-size: 20px; font-weight: 700;">Marcus Webb</p>
        <p style="font-size: 14px; color: #999;">CTO &amp; Co-founder</p>
        <p style="font-size: 14px; color: #555; margin-top: 8px; line-height: 1.5;">Ex-principal engineer at Revolut. Built systems processing $2B/day.</p>
      </div>
      <div style="flex: 1;">
        <p style="font-size: 20px; font-weight: 700;">Priya Sharma</p>
        <p style="font-size: 14px; color: #999;">Head of Compliance</p>
        <p style="font-size: 14px; color: #555; margin-top: 8px; line-height: 1.5;">Former compliance lead at TransferWise (Wise). Licensed in 12 jurisdictions.</p>
      </div>
    </div>
  `),
  // 8 — The Ask
  slideHtml(`
    <p style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; color: #999; margin-bottom: 12px;">The Ask</p>
    <h2 style="font-size: 48px; font-weight: 900; margin-bottom: 32px; color: #000;">Raising $12M Series A</h2>
    <div style="max-width: 560px;">
      <div style="display: flex; justify-content: space-between; padding: 16px 0; border-bottom: 1px solid #eee;">
        <span style="font-size: 18px; color: #333;">Engineering &amp; Product</span>
        <span style="font-size: 18px; font-weight: 700;">40%</span>
      </div>
      <div style="display: flex; justify-content: space-between; padding: 16px 0; border-bottom: 1px solid #eee;">
        <span style="font-size: 18px; color: #333;">Regulatory &amp; Licensing</span>
        <span style="font-size: 18px; font-weight: 700;">25%</span>
      </div>
      <div style="display: flex; justify-content: space-between; padding: 16px 0; border-bottom: 1px solid #eee;">
        <span style="font-size: 18px; color: #333;">Sales &amp; Marketing</span>
        <span style="font-size: 18px; font-weight: 700;">25%</span>
      </div>
      <div style="display: flex; justify-content: space-between; padding: 16px 0;">
        <span style="font-size: 18px; color: #333;">Operations</span>
        <span style="font-size: 18px; font-weight: 700;">10%</span>
      </div>
    </div>
    <p style="font-size: 16px; color: #666; margin-top: 32px;">Target close: March 2026 &middot; Lead investor confirmed</p>
  `),
];

// ---- Project 2: GreenGrid (finalized) ------------------------------------

const greenGridSlides: string[] = [
  slideHtml(`
    <h1 style="font-size: 56px; font-weight: 900; letter-spacing: -0.03em; margin-bottom: 16px; color: #000;">GreenGrid</h1>
    <p style="font-size: 26px; color: #555; max-width: 600px; line-height: 1.4;">AI-powered energy management for commercial buildings.</p>
    <p style="font-size: 16px; color: #999; margin-top: 40px;">Seed Round &middot; 2026</p>
  `),
  slideHtml(`
    <p style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; color: #999; margin-bottom: 12px;">The Problem</p>
    <h2 style="font-size: 40px; font-weight: 800; margin-bottom: 24px; color: #000;">Buildings waste 30% of their energy</h2>
    <ul style="font-size: 20px; line-height: 2; color: #333; list-style: none; padding: 0;">
      <li style="margin-bottom: 8px;">&bull; Commercial buildings consume 40% of total U.S. energy</li>
      <li style="margin-bottom: 8px;">&bull; HVAC systems run on static schedules regardless of occupancy</li>
      <li style="margin-bottom: 8px;">&bull; Facility managers lack real-time visibility into waste</li>
      <li>&bull; $60B wasted annually on inefficient building operations</li>
    </ul>
  `),
  slideHtml(`
    <p style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; color: #999; margin-bottom: 12px;">Our Solution</p>
    <h2 style="font-size: 40px; font-weight: 800; margin-bottom: 24px; color: #000;">Autonomous building energy optimization</h2>
    <div style="display: flex; gap: 40px; margin-top: 32px;">
      <div style="flex: 1;">
        <h3 style="font-size: 20px; font-weight: 700; margin-bottom: 8px;">Smart Sensors</h3>
        <p style="font-size: 16px; color: #555; line-height: 1.6;">Retrofit IoT sensors that install in minutes and monitor occupancy, temperature, and air quality.</p>
      </div>
      <div style="flex: 1;">
        <h3 style="font-size: 20px; font-weight: 700; margin-bottom: 8px;">AI Controller</h3>
        <p style="font-size: 16px; color: #555; line-height: 1.6;">ML models predict demand and auto-adjust HVAC, lighting, and power in real time.</p>
      </div>
      <div style="flex: 1;">
        <h3 style="font-size: 20px; font-weight: 700; margin-bottom: 8px;">Dashboard</h3>
        <p style="font-size: 16px; color: #555; line-height: 1.6;">Facility managers get a single pane of glass for energy usage, savings, and carbon tracking.</p>
      </div>
    </div>
  `),
  slideHtml(`
    <p style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; color: #999; margin-bottom: 12px;">Market Opportunity</p>
    <h2 style="font-size: 40px; font-weight: 800; margin-bottom: 40px; color: #000;">$80B global building energy market</h2>
    <div style="display: flex; gap: 48px;">
      <div style="text-align: center;">
        <p style="font-size: 48px; font-weight: 900; color: #000;">$80B</p>
        <p style="font-size: 14px; color: #999; text-transform: uppercase;">TAM</p>
        <p style="font-size: 14px; color: #666;">Global smart building market</p>
      </div>
      <div style="text-align: center;">
        <p style="font-size: 48px; font-weight: 900; color: #000;">$22B</p>
        <p style="font-size: 14px; color: #999; text-transform: uppercase;">SAM</p>
        <p style="font-size: 14px; color: #666;">North America commercial</p>
      </div>
      <div style="text-align: center;">
        <p style="font-size: 48px; font-weight: 900; color: #000;">$3.5B</p>
        <p style="font-size: 14px; color: #999; text-transform: uppercase;">SOM</p>
        <p style="font-size: 14px; color: #666;">Mid-market segment (5yr)</p>
      </div>
    </div>
  `),
  slideHtml(`
    <p style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; color: #999; margin-bottom: 12px;">Business Model</p>
    <h2 style="font-size: 40px; font-weight: 800; margin-bottom: 32px; color: #000;">SaaS + Hardware</h2>
    <div style="display: flex; gap: 40px;">
      <div style="flex: 1; border: 1px solid #eee; border-radius: 8px; padding: 24px;">
        <h3 style="font-size: 20px; font-weight: 700; margin-bottom: 8px;">Sensor Kits</h3>
        <p style="font-size: 32px; font-weight: 900; color: #000;">$2,500</p>
        <p style="font-size: 14px; color: #666; margin-top: 8px;">Per floor, one-time hardware cost</p>
      </div>
      <div style="flex: 1; border: 1px solid #eee; border-radius: 8px; padding: 24px;">
        <h3 style="font-size: 20px; font-weight: 700; margin-bottom: 8px;">Platform License</h3>
        <p style="font-size: 32px; font-weight: 900; color: #000;">$800/mo</p>
        <p style="font-size: 14px; color: #666; margin-top: 8px;">Per building, recurring SaaS</p>
      </div>
      <div style="flex: 1; border: 1px solid #eee; border-radius: 8px; padding: 24px;">
        <h3 style="font-size: 20px; font-weight: 700; margin-bottom: 8px;">Savings Share</h3>
        <p style="font-size: 32px; font-weight: 900; color: #000;">10%</p>
        <p style="font-size: 14px; color: #666; margin-top: 8px;">Of verified energy cost reduction</p>
      </div>
    </div>
  `),
  slideHtml(`
    <p style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; color: #999; margin-bottom: 12px;">Traction</p>
    <h2 style="font-size: 40px; font-weight: 800; margin-bottom: 40px; color: #000;">Pilot results exceeded expectations</h2>
    <div style="display: flex; gap: 48px;">
      <div>
        <p style="font-size: 48px; font-weight: 900; color: #000;">8</p>
        <p style="font-size: 14px; color: #666;">Buildings deployed</p>
      </div>
      <div>
        <p style="font-size: 48px; font-weight: 900; color: #000;">32%</p>
        <p style="font-size: 14px; color: #666;">Avg. energy reduction</p>
      </div>
      <div>
        <p style="font-size: 48px; font-weight: 900; color: #000;">$640K</p>
        <p style="font-size: 14px; color: #666;">Pipeline value</p>
      </div>
      <div>
        <p style="font-size: 48px; font-weight: 900; color: #000;">14 mo</p>
        <p style="font-size: 14px; color: #666;">Avg. payback period</p>
      </div>
    </div>
  `),
  slideHtml(`
    <p style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; color: #999; margin-bottom: 12px;">Team</p>
    <h2 style="font-size: 40px; font-weight: 800; margin-bottom: 32px; color: #000;">Domain experts in energy &amp; AI</h2>
    <div style="display: flex; gap: 40px;">
      <div style="flex: 1;">
        <p style="font-size: 20px; font-weight: 700;">James Okafor</p>
        <p style="font-size: 14px; color: #999;">CEO</p>
        <p style="font-size: 14px; color: #555; margin-top: 8px; line-height: 1.5;">10 years in building automation. Former Director at Siemens Smart Infrastructure.</p>
      </div>
      <div style="flex: 1;">
        <p style="font-size: 20px; font-weight: 700;">Li Wei</p>
        <p style="font-size: 14px; color: #999;">CTO</p>
        <p style="font-size: 14px; color: #555; margin-top: 8px; line-height: 1.5;">PhD in ML from Stanford. Previously led energy ML research at Google DeepMind.</p>
      </div>
      <div style="flex: 1;">
        <p style="font-size: 20px; font-weight: 700;">Anna Kowalski</p>
        <p style="font-size: 14px; color: #999;">VP Sales</p>
        <p style="font-size: 14px; color: #555; margin-top: 8px; line-height: 1.5;">Built the commercial sales org at Engie Impact from 0 to $20M ARR.</p>
      </div>
    </div>
  `),
  slideHtml(`
    <p style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; color: #999; margin-bottom: 12px;">The Ask</p>
    <h2 style="font-size: 48px; font-weight: 900; margin-bottom: 32px; color: #000;">Raising $4M Seed</h2>
    <div style="max-width: 560px;">
      <div style="display: flex; justify-content: space-between; padding: 16px 0; border-bottom: 1px solid #eee;">
        <span style="font-size: 18px; color: #333;">R&amp;D &amp; Product</span>
        <span style="font-size: 18px; font-weight: 700;">45%</span>
      </div>
      <div style="display: flex; justify-content: space-between; padding: 16px 0; border-bottom: 1px solid #eee;">
        <span style="font-size: 18px; color: #333;">Hardware Manufacturing</span>
        <span style="font-size: 18px; font-weight: 700;">25%</span>
      </div>
      <div style="display: flex; justify-content: space-between; padding: 16px 0; border-bottom: 1px solid #eee;">
        <span style="font-size: 18px; color: #333;">Go-to-Market</span>
        <span style="font-size: 18px; font-weight: 700;">20%</span>
      </div>
      <div style="display: flex; justify-content: space-between; padding: 16px 0;">
        <span style="font-size: 18px; color: #333;">Operations</span>
        <span style="font-size: 18px; font-weight: 700;">10%</span>
      </div>
    </div>
  `),
];

// ---- Project 3: MedNote (draft) -------------------------------------------

const medNoteSlides: string[] = [
  slideHtml(`
    <h1 style="font-size: 56px; font-weight: 900; letter-spacing: -0.03em; margin-bottom: 16px; color: #000;">MedNote AI</h1>
    <p style="font-size: 26px; color: #555; max-width: 600px; line-height: 1.4;">Automated clinical documentation that gives doctors their time back.</p>
    <p style="font-size: 16px; color: #999; margin-top: 40px;">Pre-Seed &middot; 2026</p>
  `),
  slideHtml(`
    <p style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; color: #999; margin-bottom: 12px;">The Problem</p>
    <h2 style="font-size: 40px; font-weight: 800; margin-bottom: 24px; color: #000;">Physicians spend more time typing than treating</h2>
    <ul style="font-size: 20px; line-height: 2; color: #333; list-style: none; padding: 0;">
      <li style="margin-bottom: 8px;">&bull; Doctors spend 2 hours on EHR for every 1 hour with patients</li>
      <li style="margin-bottom: 8px;">&bull; Clinical burnout has reached 63% among U.S. physicians</li>
      <li style="margin-bottom: 8px;">&bull; Documentation errors contribute to 10% of diagnostic mistakes</li>
      <li>&bull; $150K average annual cost of medical scribes per physician</li>
    </ul>
  `),
  slideHtml(`
    <p style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; color: #999; margin-bottom: 12px;">Our Solution</p>
    <h2 style="font-size: 40px; font-weight: 800; margin-bottom: 24px; color: #000;">AI scribe that listens, structures, and codes</h2>
    <div style="display: flex; gap: 40px; margin-top: 32px;">
      <div style="flex: 1;">
        <h3 style="font-size: 20px; font-weight: 700; margin-bottom: 8px;">Ambient Listening</h3>
        <p style="font-size: 16px; color: #555; line-height: 1.6;">Records and transcribes the patient encounter in real time with HIPAA-compliant processing.</p>
      </div>
      <div style="flex: 1;">
        <h3 style="font-size: 20px; font-weight: 700; margin-bottom: 8px;">Smart Structuring</h3>
        <p style="font-size: 16px; color: #555; line-height: 1.6;">Automatically generates SOAP notes, assessments, and plans in the correct EHR format.</p>
      </div>
      <div style="flex: 1;">
        <h3 style="font-size: 20px; font-weight: 700; margin-bottom: 8px;">Auto-Coding</h3>
        <p style="font-size: 16px; color: #555; line-height: 1.6;">Suggests ICD-10 and CPT codes with 97% accuracy, reducing claim denials.</p>
      </div>
    </div>
  `),
  slideHtml(`
    <p style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; color: #999; margin-bottom: 12px;">Market Opportunity</p>
    <h2 style="font-size: 40px; font-weight: 800; margin-bottom: 40px; color: #000;">Healthcare documentation is a $12B market</h2>
    <div style="display: flex; gap: 48px;">
      <div style="text-align: center;">
        <p style="font-size: 48px; font-weight: 900; color: #000;">$12B</p>
        <p style="font-size: 14px; color: #999; text-transform: uppercase;">TAM</p>
        <p style="font-size: 14px; color: #666;">Clinical documentation tools</p>
      </div>
      <div style="text-align: center;">
        <p style="font-size: 48px; font-weight: 900; color: #000;">$4.2B</p>
        <p style="font-size: 14px; color: #999; text-transform: uppercase;">SAM</p>
        <p style="font-size: 14px; color: #666;">U.S. outpatient clinics</p>
      </div>
      <div style="text-align: center;">
        <p style="font-size: 48px; font-weight: 900; color: #000;">$800M</p>
        <p style="font-size: 14px; color: #999; text-transform: uppercase;">SOM</p>
        <p style="font-size: 14px; color: #666;">Independent practices (3yr)</p>
      </div>
    </div>
  `),
  slideHtml(`
    <p style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; color: #999; margin-bottom: 12px;">Business Model</p>
    <h2 style="font-size: 40px; font-weight: 800; margin-bottom: 32px; color: #000;">Per-provider SaaS pricing</h2>
    <div style="display: flex; gap: 40px;">
      <div style="flex: 1; border: 1px solid #eee; border-radius: 8px; padding: 24px;">
        <h3 style="font-size: 20px; font-weight: 700; margin-bottom: 8px;">Solo Practice</h3>
        <p style="font-size: 32px; font-weight: 900; color: #000;">$199/mo</p>
        <p style="font-size: 14px; color: #666; margin-top: 8px;">Per provider, unlimited encounters</p>
      </div>
      <div style="flex: 1; border: 1px solid #eee; border-radius: 8px; padding: 24px;">
        <h3 style="font-size: 20px; font-weight: 700; margin-bottom: 8px;">Group Practice</h3>
        <p style="font-size: 32px; font-weight: 900; color: #000;">$149/mo</p>
        <p style="font-size: 14px; color: #666; margin-top: 8px;">Per provider, 5+ seats, admin dashboard</p>
      </div>
      <div style="flex: 1; border: 1px solid #eee; border-radius: 8px; padding: 24px;">
        <h3 style="font-size: 20px; font-weight: 700; margin-bottom: 8px;">Enterprise</h3>
        <p style="font-size: 32px; font-weight: 900; color: #000;">Custom</p>
        <p style="font-size: 14px; color: #666; margin-top: 8px;">Health systems, EHR integration, BAA</p>
      </div>
    </div>
  `),
  slideHtml(`
    <p style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; color: #999; margin-bottom: 12px;">Traction</p>
    <h2 style="font-size: 40px; font-weight: 800; margin-bottom: 40px; color: #000;">Strong early validation</h2>
    <div style="display: flex; gap: 48px;">
      <div>
        <p style="font-size: 48px; font-weight: 900; color: #000;">42</p>
        <p style="font-size: 14px; color: #666;">Beta physicians</p>
      </div>
      <div>
        <p style="font-size: 48px; font-weight: 900; color: #000;">97%</p>
        <p style="font-size: 14px; color: #666;">Coding accuracy</p>
      </div>
      <div>
        <p style="font-size: 48px; font-weight: 900; color: #000;">68%</p>
        <p style="font-size: 14px; color: #666;">Documentation time saved</p>
      </div>
      <div>
        <p style="font-size: 48px; font-weight: 900; color: #000;">NPS 82</p>
        <p style="font-size: 14px; color: #666;">Net promoter score</p>
      </div>
    </div>
  `),
  slideHtml(`
    <p style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; color: #999; margin-bottom: 12px;">Team</p>
    <h2 style="font-size: 40px; font-weight: 800; margin-bottom: 32px; color: #000;">Clinical + technical DNA</h2>
    <div style="display: flex; gap: 40px;">
      <div style="flex: 1;">
        <p style="font-size: 20px; font-weight: 700;">Dr. Rachel Torres</p>
        <p style="font-size: 14px; color: #999;">CEO &amp; Co-founder</p>
        <p style="font-size: 14px; color: #555; margin-top: 8px; line-height: 1.5;">Practicing internist. Former CMIO at a 200-bed hospital. Experienced the problem firsthand.</p>
      </div>
      <div style="flex: 1;">
        <p style="font-size: 20px; font-weight: 700;">Kai Nakamura</p>
        <p style="font-size: 14px; color: #999;">CTO &amp; Co-founder</p>
        <p style="font-size: 14px; color: #555; margin-top: 8px; line-height: 1.5;">NLP researcher at FAIR. Built speech-to-text models deployed in 40+ hospitals.</p>
      </div>
      <div style="flex: 1;">
        <p style="font-size: 20px; font-weight: 700;">David Patel</p>
        <p style="font-size: 14px; color: #999;">Head of Product</p>
        <p style="font-size: 14px; color: #555; margin-top: 8px; line-height: 1.5;">Led EHR integrations at Epic. Deep understanding of clinical workflows.</p>
      </div>
    </div>
  `),
  slideHtml(`
    <p style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; color: #999; margin-bottom: 12px;">The Ask</p>
    <h2 style="font-size: 48px; font-weight: 900; margin-bottom: 32px; color: #000;">Raising $2M Pre-Seed</h2>
    <div style="max-width: 560px;">
      <div style="display: flex; justify-content: space-between; padding: 16px 0; border-bottom: 1px solid #eee;">
        <span style="font-size: 18px; color: #333;">Model Training &amp; R&amp;D</span>
        <span style="font-size: 18px; font-weight: 700;">50%</span>
      </div>
      <div style="display: flex; justify-content: space-between; padding: 16px 0; border-bottom: 1px solid #eee;">
        <span style="font-size: 18px; color: #333;">EHR Integrations</span>
        <span style="font-size: 18px; font-weight: 700;">20%</span>
      </div>
      <div style="display: flex; justify-content: space-between; padding: 16px 0; border-bottom: 1px solid #eee;">
        <span style="font-size: 18px; color: #333;">Compliance &amp; HIPAA</span>
        <span style="font-size: 18px; font-weight: 700;">15%</span>
      </div>
      <div style="display: flex; justify-content: space-between; padding: 16px 0;">
        <span style="font-size: 18px; color: #333;">Hiring &amp; Ops</span>
        <span style="font-size: 18px; font-weight: 700;">15%</span>
      </div>
    </div>
  `),
];

// ---- Project 4: UrbanLoop (generating) ------------------------------------

const urbanLoopSlides: string[] = [
  slideHtml(`
    <h1 style="font-size: 56px; font-weight: 900; letter-spacing: -0.03em; margin-bottom: 16px; color: #000;">UrbanLoop</h1>
    <p style="font-size: 26px; color: #555; max-width: 600px; line-height: 1.4;">Micro-transit on demand for mid-size cities.</p>
    <p style="font-size: 16px; color: #999; margin-top: 40px;">Seed Round &middot; 2026</p>
  `),
  slideHtml(`
    <p style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; color: #999; margin-bottom: 12px;">The Problem</p>
    <h2 style="font-size: 40px; font-weight: 800; margin-bottom: 24px; color: #000;">Public transit doesn't work outside big cities</h2>
    <ul style="font-size: 20px; line-height: 2; color: #333; list-style: none; padding: 0;">
      <li style="margin-bottom: 8px;">&bull; 85% of mid-size U.S. cities have inadequate public transit</li>
      <li style="margin-bottom: 8px;">&bull; Average commute in these cities is 42 minutes by car</li>
      <li style="margin-bottom: 8px;">&bull; Low-income residents spend 28% of income on transportation</li>
      <li>&bull; Fixed-route buses run at only 15% average capacity</li>
    </ul>
  `),
  slideHtml(`
    <p style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; color: #999; margin-bottom: 12px;">Our Solution</p>
    <h2 style="font-size: 40px; font-weight: 800; margin-bottom: 24px; color: #000;">Dynamic routes that adapt to real demand</h2>
    <div style="display: flex; gap: 40px; margin-top: 32px;">
      <div style="flex: 1;">
        <h3 style="font-size: 20px; font-weight: 700; margin-bottom: 8px;">On-Demand Booking</h3>
        <p style="font-size: 16px; color: #555; line-height: 1.6;">Riders request trips via app. Our algorithm batches nearby requests into shared rides.</p>
      </div>
      <div style="flex: 1;">
        <h3 style="font-size: 20px; font-weight: 700; margin-bottom: 8px;">Smart Routing</h3>
        <p style="font-size: 16px; color: #555; line-height: 1.6;">AI dynamically calculates the optimal multi-stop route in milliseconds.</p>
      </div>
      <div style="flex: 1;">
        <h3 style="font-size: 20px; font-weight: 700; margin-bottom: 8px;">City Partnership</h3>
        <p style="font-size: 16px; color: #555; line-height: 1.6;">We partner with municipalities to replace or augment under-performing bus routes.</p>
      </div>
    </div>
  `),
  slideHtml(`
    <p style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; color: #999; margin-bottom: 12px;">Market Opportunity</p>
    <h2 style="font-size: 40px; font-weight: 800; margin-bottom: 40px; color: #000;">$45B micro-transit opportunity</h2>
    <div style="display: flex; gap: 48px;">
      <div style="text-align: center;">
        <p style="font-size: 48px; font-weight: 900; color: #000;">$45B</p>
        <p style="font-size: 14px; color: #999; text-transform: uppercase;">TAM</p>
        <p style="font-size: 14px; color: #666;">U.S. transit + ride-share</p>
      </div>
      <div style="text-align: center;">
        <p style="font-size: 48px; font-weight: 900; color: #000;">$8B</p>
        <p style="font-size: 14px; color: #999; text-transform: uppercase;">SAM</p>
        <p style="font-size: 14px; color: #666;">Mid-size city transit budgets</p>
      </div>
      <div style="text-align: center;">
        <p style="font-size: 48px; font-weight: 900; color: #000;">$1.2B</p>
        <p style="font-size: 14px; color: #999; text-transform: uppercase;">SOM</p>
        <p style="font-size: 14px; color: #666;">Target cities (5yr)</p>
      </div>
    </div>
  `),
  slideHtml(`
    <p style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; color: #999; margin-bottom: 12px;">Business Model</p>
    <h2 style="font-size: 40px; font-weight: 800; margin-bottom: 32px; color: #000;">B2G + Rider revenue</h2>
    <div style="display: flex; gap: 40px;">
      <div style="flex: 1; border: 1px solid #eee; border-radius: 8px; padding: 24px;">
        <h3 style="font-size: 20px; font-weight: 700; margin-bottom: 8px;">City Contracts</h3>
        <p style="font-size: 32px; font-weight: 900; color: #000;">60%</p>
        <p style="font-size: 14px; color: #666; margin-top: 8px;">Of revenue from municipal transit budgets</p>
      </div>
      <div style="flex: 1; border: 1px solid #eee; border-radius: 8px; padding: 24px;">
        <h3 style="font-size: 20px; font-weight: 700; margin-bottom: 8px;">Rider Fares</h3>
        <p style="font-size: 32px; font-weight: 900; color: #000;">$3.50</p>
        <p style="font-size: 14px; color: #666; margin-top: 8px;">Average fare, subsidized by city</p>
      </div>
      <div style="flex: 1; border: 1px solid #eee; border-radius: 8px; padding: 24px;">
        <h3 style="font-size: 20px; font-weight: 700; margin-bottom: 8px;">Data Licensing</h3>
        <p style="font-size: 32px; font-weight: 900; color: #000;">5%</p>
        <p style="font-size: 14px; color: #666; margin-top: 8px;">Anonymized mobility data for urban planning</p>
      </div>
    </div>
  `),
  slideHtml(`
    <p style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; color: #999; margin-bottom: 12px;">Traction</p>
    <h2 style="font-size: 40px; font-weight: 800; margin-bottom: 40px; color: #000;">Launched in 2 cities</h2>
    <div style="display: flex; gap: 48px;">
      <div>
        <p style="font-size: 48px; font-weight: 900; color: #000;">2</p>
        <p style="font-size: 14px; color: #666;">Cities live</p>
      </div>
      <div>
        <p style="font-size: 48px; font-weight: 900; color: #000;">6,200</p>
        <p style="font-size: 14px; color: #666;">Monthly riders</p>
      </div>
      <div>
        <p style="font-size: 48px; font-weight: 900; color: #000;">91%</p>
        <p style="font-size: 14px; color: #666;">On-time rate</p>
      </div>
      <div>
        <p style="font-size: 48px; font-weight: 900; color: #000;">4.7</p>
        <p style="font-size: 14px; color: #666;">Rider satisfaction</p>
      </div>
    </div>
  `),
  slideHtml(`
    <p style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; color: #999; margin-bottom: 12px;">Team</p>
    <h2 style="font-size: 40px; font-weight: 800; margin-bottom: 32px; color: #000;">Transit meets technology</h2>
    <div style="display: flex; gap: 40px;">
      <div style="flex: 1;">
        <p style="font-size: 20px; font-weight: 700;">Maya Rodriguez</p>
        <p style="font-size: 14px; color: #999;">CEO &amp; Co-founder</p>
        <p style="font-size: 14px; color: #555; margin-top: 8px; line-height: 1.5;">Former Deputy Director of Transit at City of Austin. 15 years in urban mobility.</p>
      </div>
      <div style="flex: 1;">
        <p style="font-size: 20px; font-weight: 700;">Tom Fischer</p>
        <p style="font-size: 14px; color: #999;">CTO &amp; Co-founder</p>
        <p style="font-size: 14px; color: #555; margin-top: 8px; line-height: 1.5;">Ex-Uber routing team lead. Specialized in combinatorial optimization at scale.</p>
      </div>
      <div style="flex: 1;">
        <p style="font-size: 20px; font-weight: 700;">Angela Kim</p>
        <p style="font-size: 14px; color: #999;">Head of Operations</p>
        <p style="font-size: 14px; color: #555; margin-top: 8px; line-height: 1.5;">Managed fleet operations for Via in NYC. Expert in driver network logistics.</p>
      </div>
    </div>
  `),
  slideHtml(`
    <p style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; color: #999; margin-bottom: 12px;">The Ask</p>
    <h2 style="font-size: 48px; font-weight: 900; margin-bottom: 32px; color: #000;">Raising $6M Seed</h2>
    <div style="max-width: 560px;">
      <div style="display: flex; justify-content: space-between; padding: 16px 0; border-bottom: 1px solid #eee;">
        <span style="font-size: 18px; color: #333;">City Expansion (3 new markets)</span>
        <span style="font-size: 18px; font-weight: 700;">40%</span>
      </div>
      <div style="display: flex; justify-content: space-between; padding: 16px 0; border-bottom: 1px solid #eee;">
        <span style="font-size: 18px; color: #333;">Fleet &amp; Operations</span>
        <span style="font-size: 18px; font-weight: 700;">30%</span>
      </div>
      <div style="display: flex; justify-content: space-between; padding: 16px 0; border-bottom: 1px solid #eee;">
        <span style="font-size: 18px; color: #333;">Engineering</span>
        <span style="font-size: 18px; font-weight: 700;">20%</span>
      </div>
      <div style="display: flex; justify-content: space-between; padding: 16px 0;">
        <span style="font-size: 18px; color: #333;">G&amp;A</span>
        <span style="font-size: 18px; font-weight: 700;">10%</span>
      </div>
    </div>
  `),
];


// ---- Project 5: Traction Demo (shared, fullHtml) ----------------------------

const tractionDemoHtml = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Traction - Pitch Deck</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;700&display=swap"
        rel="stylesheet">

    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>

    <!-- Icons -->
    <script src="https://unpkg.com/lucide@latest"></script>

    <!-- HLS for video streaming -->
    <script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>

    <style>
        /* Theme Setup */
        body {
            margin: 0;
            background-color: #000;
            color: #fff;
            font-family: 'Plus Jakarta Sans', sans-serif;
            overflow: hidden;
            -webkit-font-smoothing: antialiased;
        }

        /* Typography Clamps */
        .clamp-title-lg {
            font-size: clamp(32px, 5vw, 96px);
            tracking: -0.02em;
            line-height: 1.05;
            font-weight: 700;
            text-wrap: balance;
        }

        .clamp-title-md {
            font-size: clamp(28px, 4vw, 64px);
            tracking: -0.02em;
            line-height: 1.05;
            font-weight: 700;
            text-wrap: balance;
        }

        .clamp-subtitle {
            font-size: clamp(20px, 2.5vw, 48px);
            font-weight: 500;
        }

        .clamp-card-title {
            font-size: clamp(18px, 2vw, 36px);
            font-weight: 700;
        }

        .clamp-body {
            font-size: clamp(12px, 1.2vw, 20px);
            font-weight: 400;
            line-height: 1.6;
        }

        .clamp-small {
            font-size: clamp(12px, 1.05vw, 16px);
            font-weight: 400;
        }

        /* The Presentation Canvas */
        #presentation {
            width: 100vw;
            height: 100vh;
            position: relative;
        }

        /* Slides & Transitions */
        .slide {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            transition: all 500ms ease-in-out;
            z-index: 0;
            pointer-events: none;
        }

        .slide.past {
            transform: scale(0.95);
        }

        .slide.future {
            transform: scale(1.05);
        }

        .slide.active {
            opacity: 1;
            transform: scale(1);
            z-index: 10;
            pointer-events: auto;
        }

        /* Video Background */
        .bg-video {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            z-index: 0;
        }

        /* Slide Content Container */
        .content-layer {
            position: absolute;
            inset: 0;
            z-index: 10;
            display: flex;
            flex-direction: column;
            padding: 4%;
        }

        /* Header & Footer Layout */
        header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            opacity: 0.8;
            width: 100%;
        }

        .header-text {
            font-size: clamp(12px, 1.05vw, 20px);
            font-weight: 500;
        }

        footer {
            position: absolute;
            bottom: 4%;
            width: 92%;
            display: flex;
            justify-content: flex-end;
            opacity: 0.6;
            font-size: clamp(12px, 1.05vw, 20px);
        }

        /* Glassmorphism aesthetics */
        .liquid-glass {
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%);
            backdrop-filter: blur(24px) saturate(1.4);
            -webkit-backdrop-filter: blur(24px) saturate(1.4);
            border: 1px solid rgba(255, 255, 255, 0.12);
            border-radius: 20px;
            position: relative;
            overflow: hidden;
        }

        /* Subtle radial specular highlight at top-left */
        .liquid-glass::before {
            content: '';
            position: absolute;
            top: -20px;
            left: -20px;
            width: 100px;
            height: 100px;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, transparent 60%);
            border-radius: 50%;
            pointer-events: none;
        }

        /* Controls overlay */
        #controls {
            position: fixed;
            bottom: 2%;
            left: 50%;
            transform: translateX(-50%);
            z-index: 50;
            display: flex;
            align-items: center;
            gap: 20px;
            padding: 12px 24px;
            border-radius: 99px;
            transition: opacity 300ms ease;
        }

        #controls.hidden {
            opacity: 0;
            pointer-events: none;
        }

        .nav-btn {
            color: rgba(255, 255, 255, 0.5);
            cursor: pointer;
            transition: all 200ms ease;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 32px;
            height: 32px;
            border-radius: 50%;
        }

        .nav-btn:hover {
            color: rgba(255, 255, 255, 0.9);
            background: rgba(255, 255, 255, 0.1);
        }

        .dot {
            width: 6px;
            height: 6px;
            border-radius: 99px;
            background: rgba(255, 255, 255, 0.3);
            transition: all 300ms ease;
            cursor: pointer;
        }

        .dot.active {
            width: 24px;
            background: rgba(255, 255, 255, 0.9);
        }

        #kb-hint {
            position: fixed;
            top: 2%;
            right: 2%;
            font-size: 11px;
            color: rgba(255, 255, 255, 0.4);
            z-index: 50;
            transition: opacity 300ms;
        }

        #kb-hint.hidden {
            opacity: 0;
        }
    </style>
</head>

<body>

    <!-- Controls overlay -->
    <div id="controls" class="liquid-glass">
        <div id="slide-counter" class="text-[13px] text-white/50 tracking-widest font-mono mr-4">1 / 12</div>
        <div id="dots-container" class="flex gap-2 items-center"></div>
        <div class="w-[1px] h-4 bg-white/20 mx-2"></div>
        <button class="nav-btn" onclick="goToSlide(current - 1)"><i data-lucide="chevron-left"
                class="w-5 h-5"></i></button>
        <button class="nav-btn" onclick="goToSlide(current + 1)"><i data-lucide="chevron-right"
                class="w-5 h-5"></i></button>
        <div class="w-[1px] h-4 bg-white/20 mx-2"></div>
        <button class="nav-btn" onclick="toggleFullscreen()"><i data-lucide="maximize" class="w-4 h-4"></i></button>
    </div>

    <div id="kb-hint">← → Navigate · F Fullscreen</div>

    <!-- Container for all slides -->
    <div id="presentation">

        <!-- SLIDE 1: Cover -->
        <div class="slide cover active"
            data-bg="https://stream.mux.com/JNJEOYI6B3EffB9f5ZhpGbuxzc6gSyJcXaCBbCgZKRg.m3u8">
            <video autoplay loop muted playsinline class="bg-video"></video>
            <div class="content-layer">
                <header>
                    <div class="flex items-center gap-2"><i data-lucide="code-xml" class="w-8 h-8 opacity-90"></i><span
                            class="header-text font-bold">Traction</span></div>
                    <div class="header-text">Pitch Deck</div>
                </header>
                <div class="flex flex-col justify-center flex-1 mt-[-3%]">
                    <h1 class="clamp-title-lg">Traction</h1>
                    <h2
                        class="clamp-subtitle opacity-90 mt-[1.5%] text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                        Your startup's pre-launch presence.</h2>
                    <p class="clamp-body opacity-75 mt-[2%]">By The Traction Team</p>
                </div>

            </div>
        </div>

        <!-- SLIDE 2: The Problem 1 -->
        <div class="slide intro" data-bg="https://stream.mux.com/Kec29dVyJgiPdtWaQtPuEiiGHkJIYQAVUJcNiIHUYeo.m3u8">
            <video autoplay loop muted playsinline class="bg-video"></video>
            <div class="content-layer">
                <header>
                    <div class="flex items-center gap-2"><i data-lucide="code-xml" class="w-6 h-6 opacity-90"></i><span
                            class="header-text font-bold">Traction</span></div>
                    <div class="header-text">Page 001</div>
                </header>
                <div class="flex flex-col justify-center flex-1">
                    <h2 class="clamp-title-md">The 7-Document Pitch</h2>

                    <div class="flex flex-row justify-between items-start mt-[4%] gap-[4%] w-full">
                        <div class="flex-none basis-[25%]">
                            <p class="clamp-body opacity-90 mb-4">High-velocity founders send scattered PDFs, Google
                                Docs, and Notion
                                pages to investors...</p>
                            <div class="flex items-end gap-3">
                                <span class="clamp-title-md">6+</span>
                                <span class="clamp-body text-white/80 pb-2">Ideas / Year</span>
                            </div>
                        </div>

                        <div class="flex-none basis-[40%] liquid-glass p-[3%]">
                            <p class="clamp-body opacity-90">"I spent 5 hours assembling my pitch materials, and
                                investors skimmed it
                                in 30 seconds."</p>
                            <p class="clamp-small text-white/50 mt-4">— Every founder ever</p>
                        </div>

                        <div class="flex-none basis-[25%] flex flex-col items-start">
                            <span class="clamp-title-md text-red-400">0%</span>
                            <p class="clamp-body opacity-90 mt-2">Discoverability before building.</p>
                            <div class="w-full h-[60px] relative mt-4">
                                <svg viewBox="0 0 100 40" class="w-full h-full" preserveAspectRatio="none">
                                    <path d="M0,35 Q25,30 50,30 T100,20" fill="none" stroke="rgba(255,255,255,0.4)"
                                        stroke-width="2" />
                                    <circle cx="100" cy="20" r="3" fill="#ef4444" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <footer>The Current Pitch Flow is Broken</footer>
            </div>
        </div>

        <!-- SLIDE 3: The Problem 2 -->
        <div class="slide" data-bg="https://stream.mux.com/Kec29dVyJgiPdtWaQtPuEiiGHkJIYQAVUJcNiIHUYeo.m3u8">
            <video autoplay loop muted playsinline class="bg-video"></video>
            <div class="content-layer">
                <header>
                    <div class="flex items-center gap-2"><i data-lucide="code-xml" class="w-6 h-6 opacity-90"></i><span
                            class="header-text font-bold">Traction</span></div>
                    <div class="header-text">Page 002</div>
                </header>
                <div class="flex flex-col justify-center items-center flex-1 text-center max-w-[80%] mx-auto">
                    <p class="clamp-body opacity-80 uppercase tracking-widest mb-4">The "Nice UI" Trap</p>
                    <h2 class="clamp-title-md mb-[5%]">Most AI pitch generators just put icing on a bad cake.</h2>
                    <div class="grid grid-cols-2 gap-[5%] w-full text-left">
                        <div class="liquid-glass p-[5%]">
                            <i data-lucide="x-circle" class="w-8 h-8 text-red-400 mb-4"></i>
                            <h3 class="clamp-card-title mb-2">Templated</h3>
                            <p class="clamp-body text-white/70">Glorified Google Slides. Everyone's pitch ends up
                                looking the exact
                                same.</p>
                        </div>
                        <div class="liquid-glass p-[5%]">
                            <i data-lucide="x-circle" class="w-8 h-8 text-red-400 mb-4"></i>
                            <h3 class="clamp-card-title mb-2">No Honesty</h3>
                            <p class="clamp-body text-white/70">Tools say "Great idea!" instead of spotting critical
                                go-to-market
                                gaps.</p>
                        </div>
                    </div>
                </div>
                <footer>We need intelligence, not just templates</footer>
            </div>
        </div>

        <!-- SLIDE 4: Solution -->
        <div class="slide" data-bg="https://stream.mux.com/fHfa8VIbBdqZelLGg5thjsypZ101M01dbyIMLNDWQwlLA.m3u8">
            <video autoplay loop muted playsinline class="bg-video"></video>
            <div class="content-layer">
                <header>
                    <div class="flex items-center gap-2"><i data-lucide="code-xml" class="w-6 h-6 opacity-90"></i></div>
                    <div class="header-text">Page 003</div>
                </header>
                <div class="flex flex-col flex-1 mt-[5%]">
                    <div class="text-center mb-[4%]">
                        <p class="clamp-body opacity-90 uppercase tracking-[0.2em] mb-2">Introducing</p>
                        <h2 class="clamp-title-md">Ideate, Generate, Pitch.</h2>
                    </div>

                    <div class="grid grid-cols-3 gap-[3%] w-full h-[40vh]">
                        <div class="liquid-glass p-[8%] flex flex-col justify-end">
                            <i data-lucide="message-square-dashed" class="w-10 h-10 mb-6"></i>
                            <h3 class="clamp-card-title mb-2">1. Ideate</h3>
                            <p class="clamp-body text-white/80">Dump a messy idea, get it structured, and survive brutal
                                AI readiness
                                feedback.</p>
                        </div>
                        <div class="liquid-glass p-[8%] flex flex-col justify-end">
                            <i data-lucide="wand-2" class="w-10 h-10 mb-6"></i>
                            <h3 class="clamp-card-title mb-2">2. Generate</h3>
                            <p class="clamp-body text-white/80">AI writes a completely unique, code-driven web
                                presentation. No
                                templates.</p>
                        </div>
                        <div class="liquid-glass p-[8%] flex flex-col justify-end">
                            <i data-lucide="share-2" class="w-10 h-10 mb-6"></i>
                            <h3 class="clamp-card-title mb-2">3. Publish</h3>
                            <p class="clamp-body text-white/80">One link. Investors get the deck, the risks, and the
                                summary in a
                                single scroll.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- SLIDE 5: Brutal Ideation -->
        <div class="slide quote" data-bg="https://stream.mux.com/4IMYGcL01xjs7ek5ANO17JC4VQVUTsojZlnw4fXzwSxc.m3u8">
            <video autoplay loop muted playsinline class="bg-video"></video>
            <div class="content-layer items-center justify-center">
                <div class="max-w-[75%] text-center">
                    <p class="clamp-body text-red-300 font-mono mb-6 tracking-wider uppercase">— Readiness Agent Flags —
                    </p>
                    <h2 class="clamp-title-md tracking-[-0.02em] leading-tight mb-8">
                        "You have 200 waitlist signups, but no distribution strategy. Your market size is vanity. Why
                        will they pay
                        $49?"
                    </h2>
                    <p class="clamp-subtitle opacity-70">A pitch tool should force clarity, not hide weaknesses.</p>
                </div>
            </div>
        </div>

        <!-- SLIDE 6: Code-Driven Generation -->
        <div class="slide" data-bg="https://stream.mux.com/fHfa8VIbBdqZelLGg5thjsypZ101M01dbyIMLNDWQwlLA.m3u8">
            <video autoplay loop muted playsinline class="bg-video"></video>
            <div class="content-layer">
                <header>
                    <div class="flex items-center gap-2"><i data-lucide="code-xml" class="w-6 h-6 opacity-90"></i></div>
                    <div class="header-text">Page 005</div>
                </header>
                <div class="flex flex-col justify-center flex-1 max-w-[90%]">
                    <h2 class="clamp-title-md mb-[2%]">Bespoke Decks via AI HTML</h2>
                    <p class="clamp-subtitle text-white/80 mb-[6%] max-w-[70%]">
                        We don't fill in template blanks. Our AI generates a self-contained, highly-stylized HTML/CSS
                        payload for
                        every deck.
                    </p>
                    <div class="grid grid-cols-2 gap-[5%]">
                        <div class="liquid-glass p-[6%] border-l-4 border-l-blue-400">
                            <i data-lucide="file-code-2" class="w-8 h-8 text-blue-400 mb-4"></i>
                            <h3 class="clamp-card-title mb-2">100% Unique</h3>
                            <p class="clamp-body text-white/70">Layouts, animations, and typography are formulated on
                                the fly.</p>
                        </div>
                        <div class="liquid-glass p-[6%] border-l-4 border-l-purple-400">
                            <i data-lucide="lock" class="w-8 h-8 text-purple-400 mb-4"></i>
                            <h3 class="clamp-card-title mb-2">Sandboxed iFrames</h3>
                            <p class="clamp-body text-white/70">The custom deck is securely rendered within our
                                consistent platform
                                UI.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- SLIDE 7: The One Link -->
        <div class="slide" data-bg="https://stream.mux.com/Kec29dVyJgiPdtWaQtPuEiiGHkJIYQAVUJcNiIHUYeo.m3u8">
            <video autoplay loop muted playsinline class="bg-video"></video>
            <div class="content-layer">
                <header>
                    <div class="flex items-center gap-2"><i data-lucide="code-xml" class="w-6 h-6 opacity-90"></i></div>
                    <div class="header-text">Page 006</div>
                </header>
                <div class="flex h-full items-center mt-[2%] gap-[8%]">
                    <div class="basis-[50%]">
                        <h2 class="clamp-title-md mb-6">The One-Link Pitch</h2>
                        <p class="clamp-body text-white/80 mb-6">Investors shouldn't have to piece your story together.
                        </p>
                        <ul class="space-y-4 clamp-body font-medium">
                            <li class="flex items-center gap-4">
                                <div class="w-3 h-3 rounded-full bg-green-400"></div> The Immersive Presentation (above
                                the fold)
                            </li>
                            <li class="flex items-center gap-4">
                                <div class="w-3 h-3 rounded-full bg-blue-400"></div> Honest "Should I invest?" Summary
                            </li>
                            <li class="flex items-center gap-4">
                                <div class="w-3 h-3 rounded-full bg-yellow-400"></div> Identified Risks & Strengths
                            </li>
                            <li class="flex items-center gap-4">
                                <div class="w-3 h-3 rounded-full bg-purple-400"></div> Deep Dive Database (below the
                                fold)
                            </li>
                        </ul>
                    </div>
                    <div class="basis-[50%] relative h-[70vh] liquid-glass flex flex-col overflow-hidden">
                        <!-- mock UI -->
                        <div class="h-1/2 bg-black/40 flex items-center justify-center border-b border-white/10">
                            <span class="opacity-50 tracking-widest">[ DECK IFRAME ]</span>
                        </div>
                        <div class="p-6">
                            <h4 class="text-sm uppercase tracking-widest text-[#D2FF55] mb-2">Investor Summary</h4>
                            <p class="text-xs text-white/80 leading-relaxed mb-4">Verdict: Interesting. Clear ICP
                                identified. Main
                                risk is crowded analytics space.<br />Key Question to ask: Why will they pay?</p>
                            <div class="h-2 w-3/4 bg-white/10 rounded-full mb-2"></div>
                            <div class="h-2 w-1/2 bg-white/10 rounded-full"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- SLIDE 8: Discoverability -->
        <div class="slide" data-bg="https://stream.mux.com/00qQnfNo7sSpn3pB1hYKkyeSDvxs01NxiQ3sr29uL3e028.m3u8">
            <video autoplay loop muted playsinline class="bg-video"></video>
            <div class="content-layer justify-center items-center text-center">
                <i data-lucide="bot" class="w-16 h-16 text-[#D2FF55] mb-8"></i>
                <h2 class="clamp-title-md mb-4 flex items-center justify-center gap-4"><code>/llm.txt</code> <span
                        class="opacity-50">Discoverability</span></h2>
                <p class="clamp-subtitle opacity-80 max-w-[80%] mx-auto mb-8">
                    The Pitch doesn't just go to humans anymore. Every published project automatically exposes a
                    standard,
                    markdown-formatted \`llm.txt\` endpoint.
                </p>
                <div class="liquid-glass px-8 py-4 inline-block font-mono text-left text-white/70">
                    # Startup: Kinesys<br />
                    ## Verdict: Worth a Call<br />
                    ## Risks: [ Market Saturation ]
                </div>
            </div>
        </div>

        <!-- SLIDE 9: Architecture -->
        <div class="slide" data-bg="https://stream.mux.com/fHfa8VIbBdqZelLGg5thjsypZ101M01dbyIMLNDWQwlLA.m3u8">
            <video autoplay loop muted playsinline class="bg-video"></video>
            <div class="content-layer">
                <header>
                    <div class="flex items-center gap-2"><i data-lucide="code-xml" class="w-6 h-6 opacity-90"></i></div>
                    <div class="header-text">Page 008</div>
                </header>
                <div class="flex flex-col justify-center flex-1">
                    <h2 class="clamp-title-md mb-12">Monolithic Yet Magical</h2>

                    <div class="grid grid-cols-4 gap-4">
                        <div class="liquid-glass p-[6%] flex flex-col items-center text-center">
                            <i data-lucide="server" class="w-8 h-8 mb-4"></i>
                            <h4 class="font-bold mb-2">FastAPI Backend</h4>
                            <p class="text-xs text-white/60">One server to rule them all. No separate frontend to
                                deploy.</p>
                        </div>
                        <div class="liquid-glass p-[6%] flex flex-col items-center text-center">
                            <i data-lucide="database" class="w-8 h-8 mb-4"></i>
                            <h4 class="font-bold mb-2">PostgreSQL</h4>
                            <p class="text-xs text-white/60">User auth, project structures, and raw deck HTML strings.
                            </p>
                        </div>
                        <div class="liquid-glass p-[6%] flex flex-col items-center text-center text-[#D2FF55]">
                            <i data-lucide="layout-template" class="w-8 h-8 mb-4"></i>
                            <h4 class="font-bold mb-2">Jinja2 SSR</h4>
                            <p class="text-xs opacity-80">Server-side rendering for investor summaries without API
                                calls.</p>
                        </div>
                        <div class="liquid-glass p-[6%] flex flex-col items-center text-center text-purple-400">
                            <i data-lucide="brain-circuit" class="w-8 h-8 mb-4"></i>
                            <h4 class="font-bold mb-2">Agent Generation</h4>
                            <p class="text-xs opacity-80">OpenAI structuring ideas and spitting out pure HTML files.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- SLIDE 10: Market -->
        <div class="slide intro" data-bg="https://stream.mux.com/Kec29dVyJgiPdtWaQtPuEiiGHkJIYQAVUJcNiIHUYeo.m3u8">
            <video autoplay loop muted playsinline class="bg-video"></video>
            <div class="content-layer">
                <header>
                    <div class="flex items-center gap-2"><i data-lucide="code-xml" class="w-6 h-6 opacity-90"></i></div>
                    <div class="header-text">Page 009</div>
                </header>
                <div class="flex flex-col justify-center flex-1">
                    <h2 class="clamp-title-md mb-[5%]">Who is this for?</h2>

                    <div class="flex gap-[5%]">
                        <div class="basis-1/2">
                            <h1
                                class="text-[clamp(48px,6vw,120px)] font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 leading-none mb-4">
                                10x</h1>
                            <p class="clamp-subtitle opacity-90">High-Velocity Founders</p>
                            <p class="clamp-body opacity-70 mt-4">The serial builders who test 5-10 ideas a year. They
                                hate assembling
                                PDFs but need to look credible to attract co-founders and early checks.</p>
                        </div>

                        <div class="basis-1/2 flex flex-col gap-4">
                            <div class="liquid-glass p-6">
                                <div class="text-sm opacity-50 mb-1">Pre-product Value</div>
                                <div class="clamp-card-title">Exist before you build.</div>
                            </div>
                            <div class="liquid-glass p-6">
                                <div class="text-sm opacity-50 mb-1">Inbound Engine</div>
                                <div class="clamp-card-title">Enable AI/VC discovery natively.</div>
                            </div>
                            <div class="liquid-glass p-6 bg-white/5 border-white/20">
                                <div class="text-sm opacity-50 mb-1">Business Model (Future)</div>
                                <div class="clamp-card-title">$15/mo per active project. Custom domains.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- SLIDE 11: Scope -->
        <div class="slide" data-bg="https://stream.mux.com/fHfa8VIbBdqZelLGg5thjsypZ101M01dbyIMLNDWQwlLA.m3u8">
            <video autoplay loop muted playsinline class="bg-video"></video>
            <div class="content-layer">
                <header>
                    <div class="flex items-center gap-2"><i data-lucide="code-xml" class="w-6 h-6 opacity-90"></i></div>
                    <div class="header-text">Page 010</div>
                </header>
                <div class="flex h-full items-center justify-between w-full">
                    <!-- MVP -->
                    <div class="liquid-glass p-[4%] basis-[45%] h-[60vh] flex flex-col">
                        <h3 class="clamp-card-title mb-6 border-b border-white/10 pb-4 text-[#D2FF55]">Hackathon Scope
                            (MVP)</h3>
                        <ul class="space-y-4 clamp-body font-medium flex-1">
                            <li class="flex items-center gap-3"><i data-lucide="check" class="w-5 h-5 opacity-70"></i>
                                Google Auth
                                implementation</li>
                            <li class="flex items-center gap-3"><i data-lucide="check" class="w-5 h-5 opacity-70"></i>
                                Post-idea
                                structuring via API</li>
                            <li class="flex items-center gap-3"><i data-lucide="check" class="w-5 h-5 opacity-70"></i>
                                Deck generation
                                & iFrame display</li>
                            <li class="flex items-center gap-3"><i data-lucide="check" class="w-5 h-5 opacity-70"></i>
                                Jinja2
                                auto-rendered summaries</li>
                            <li class="flex items-center gap-3"><i data-lucide="check" class="w-5 h-5 opacity-70"></i>
                                <code>/llm.txt</code> endpoint routing
                            </li>
                        </ul>
                    </div>

                    <div class="text-white/30"><i data-lucide="arrow-right" class="w-12 h-12"></i></div>

                    <!-- V2 -->
                    <div class="liquid-glass p-[4%] basis-[45%] h-[60vh] flex flex-col opacity-70">
                        <h3 class="clamp-card-title mb-6 border-b border-white/10 pb-4">Version 2 (Beyond)</h3>
                        <ul class="space-y-4 clamp-body font-medium flex-1">
                            <li class="flex items-center gap-3"><i data-lucide="rocket" class="w-5 h-5"></i> Wildcard
                                custom domains
                            </li>
                            <li class="flex items-center gap-3"><i data-lucide="bot" class="w-5 h-5"></i> "Ask Investor"
                                RAG
                                simulation</li>
                            <li class="flex items-center gap-3"><i data-lucide="file-down" class="w-5 h-5"></i> PDF deck
                                exports</li>
                            <li class="flex items-center gap-3"><i data-lucide="git-branch" class="w-5 h-5"></i> Version
                                control on
                                ideation</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <!-- SLIDE 12: Outro -->
        <div class="slide outro" data-bg="https://stream.mux.com/00qQnfNo7sSpn3pB1hYKkyeSDvxs01NxiQ3sr29uL3e028.m3u8">
            <video autoplay loop muted playsinline class="bg-video"></video>
            <div class="content-layer">
                <header>
                    <div class="flex items-center gap-2"><i data-lucide="code-xml" class="w-6 h-6 opacity-90"></i><span
                            class="header-text font-bold">Traction</span></div>
                    <div class="header-text">Join The Waitlist</div>
                </header>
                <div class="flex flex-col justify-center flex-1">
                    <h2 class="clamp-title-md tracking-[-0.02em] leading-tight mb-[3%]">Get your startup online <br />
                        <span class="text-white/50">before you write a line of code.</span>
                    </h2>
                    <p class="clamp-body opacity-90 max-w-[38%] mb-[4%]">
                        Stop sending empty PDFs. Start sending fully-fledged, generative web identities that impress
                        investors and
                        index perfectly into AI agents.
                    </p>
                    <div class="flex flex-col gap-[1.5%]">
                        <div class="flex items-center gap-4 clamp-body"><i data-lucide="github"
                                class="w-6 h-6 opacity-70"></i>
                            /rikhil-nell/traction</div>
                        <div class="flex items-center gap-4 clamp-body"><i data-lucide="twitter"
                                class="w-6 h-6 opacity-70"></i>
                            @rikhil_nell</div>
                        <div class="flex items-center gap-4 clamp-body"><i data-lucide="mail"
                                class="w-6 h-6 opacity-70"></i>
                            hello@traction.com</div>
                    </div>
                </div>
            </div>
        </div>

    </div>

    <!-- SCRIPTING -->
    <script>
        // Initialize Lucide icons
        lucide.createIcons();

        const slides = document.querySelectorAll('.slide');
        const dotContainer = document.getElementById('dots-container');
        const counter = document.getElementById('slide-counter');
        const controls = document.getElementById('controls');
        const kbHint = document.getElementById('kb-hint');
        let current = 0;

        // Auto-hide controls mechanism
        let hideTimeout;
        function resetHideTimeout() {
            controls.classList.remove('hidden');
            kbHint.classList.remove('hidden');
            clearTimeout(hideTimeout);
            hideTimeout = setTimeout(() => {
                controls.classList.add('hidden');
                kbHint.classList.add('hidden');
            }, 3000);
        }

        document.addEventListener('mousemove', resetHideTimeout);
        document.addEventListener('keydown', resetHideTimeout);
        resetHideTimeout();

        // Setup Dots
        slides.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.className = \`dot \${i === 0 ? 'active' : ''}\`;
            dot.onclick = () => goToSlide(i);
            dotContainer.appendChild(dot);
        });
        const dots = document.querySelectorAll('.dot');

        function updateNav() {
            counter.innerText = \`\${current + 1} / \${slides.length}\`;
            dots.forEach((d, i) => {
                if (i === current) {
                    d.classList.add('active');
                } else {
                    d.classList.remove('active');
                }
            });
        }

        function goToSlide(n) {
            if (n < 0 || n >= slides.length) return;

            slides.forEach((slide, i) => {
                slide.classList.remove('active', 'past', 'future');
                if (i < n) slide.classList.add('past');
                if (i > n) slide.classList.add('future');
                if (i === n) slide.classList.add('active');
            });

            current = n;
            updateNav();
        }

        // Keyboard handlers
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' || e.key === ' ') {
                e.preventDefault();
                goToSlide(current + 1);
            }
            if (e.key === 'ArrowLeft') {
                goToSlide(current - 1);
            }
            if (e.key.toLowerCase() === 'f') toggleFullscreen();
        });

        // Fullscreen handling
        function toggleFullscreen() {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(err => {
                    console.log(\`Error attempting to enable fullscreen: \${err.message}\`);
                });
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                }
            }
        }

        // HLS Video Initialization
        slides.forEach(slide => {
            const src = slide.getAttribute('data-bg');
            const video = slide.querySelector('.bg-video');

            if (src && video) {
                if (Hls.isSupported()) {
                    const hls = new Hls({ enableWorker: true });
                    hls.loadSource(src);
                    hls.attachMedia(video);
                    hls.on(Hls.Events.MANIFEST_PARSED, function () {
                        // attempt play, though browsers block autoplay often unless muted (which they are)
                        video.play().catch(e => console.log(e));
                    });
                } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                    // Safari native support
                    video.src = src;
                    video.addEventListener('loadedmetadata', function () {
                        video.play().catch(e => console.log(e));
                    });
                }
            }
        });

        // Initialize first slide properly
        goToSlide(0);
    </script>
</body>

</html>`;

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------

export const projects: Project[] = [
  {
    id: "proj-1",
    userId: "user-1",
    name: "NovaPay Pitch Deck",
    prompt:
      "Create a Series A pitch deck for NovaPay, a cross-border payment platform for freelancers and small businesses. Emphasize speed, low fees, and regulatory compliance.",
    status: "shared",
    slidesHtml: novaPaySlides,
    thumbnailUrl: null,
    createdAt: "2026-01-10T09:00:00Z",
    updatedAt: "2026-02-20T14:30:00Z",
  },
  {
    id: "proj-2",
    userId: "user-1",
    name: "GreenGrid Investor Presentation",
    prompt:
      "Build a seed-round pitch deck for GreenGrid, an AI-powered energy management platform for commercial buildings. Focus on energy savings data and sustainability impact.",
    status: "finalized",
    slidesHtml: greenGridSlides,
    thumbnailUrl: null,
    createdAt: "2026-01-25T11:00:00Z",
    updatedAt: "2026-02-18T10:15:00Z",
  },
  {
    id: "proj-3",
    userId: "user-1",
    name: "MedNote AI Deck",
    prompt:
      "Generate a pre-seed pitch deck for MedNote AI, an ambient clinical documentation tool. Highlight the physician burnout problem and our accuracy metrics.",
    status: "draft",
    slidesHtml: medNoteSlides,
    thumbnailUrl: null,
    createdAt: "2026-02-05T16:00:00Z",
    updatedAt: "2026-02-22T09:45:00Z",
  },
  {
    id: "proj-4",
    userId: "user-1",
    name: "UrbanLoop Transit Pitch",
    prompt:
      "Create a seed pitch deck for UrbanLoop, a micro-transit platform for mid-size cities. Show traction in pilot cities and the municipal partnership model.",
    status: "generating",
    slidesHtml: urbanLoopSlides,
    thumbnailUrl: null,
    createdAt: "2026-02-24T08:00:00Z",
    updatedAt: "2026-02-24T08:01:00Z",
  },
  {
    id: "proj-5",
    userId: "user-1",
    name: "Traction Pitch Deck",
    prompt:
      "Create an immersive pitch deck for Traction, the AI-powered startup pitch platform. Showcase the problem with current pitch workflows, the code-driven generation approach, and the one-link publishing model.",
    status: "shared",
    slidesHtml: [],
    fullHtml: tractionDemoHtml,
    thumbnailUrl: null,
    createdAt: "2026-02-20T10:00:00Z",
    updatedAt: "2026-02-25T12:00:00Z",
  },
];

// ---------------------------------------------------------------------------
// Documents — 9 documents for project 1 (NovaPay), one per DocumentType
// ---------------------------------------------------------------------------

export const documents: ProjectDocument[] = [
  {
    id: "doc-1",
    projectId: "proj-1",
    type: "product-description",
    title: "Product Description",
    content: `NovaPay is a cross-border payment platform purpose-built for freelancers, independent contractors, and small businesses that operate internationally. The platform enables users to send and receive payments in 48 currencies with near-instant settlement times, typically under 30 seconds.

Unlike legacy wire transfers and traditional remittance services, NovaPay leverages a proprietary liquidity network that pre-positions funds across regional banking partners. This eliminates the need for correspondent banking chains that introduce delays and hidden fees. End users experience a flat, transparent 0.5% transaction fee with no minimum transfer amount.

The product includes a multi-currency wallet, allowing users to hold balances in multiple currencies simultaneously and convert between them at competitive mid-market rates. Integrated invoicing tools let freelancers generate professional invoices, track payment status, and automatically reconcile incoming funds.

NovaPay also offers a premium tier at $29 per month that includes advanced analytics, priority support, batch payments for agencies, and automated tax document generation for year-end reporting. The platform is accessible via web, iOS, and Android applications, all sharing a unified real-time backend.`,
    status: "ready",
    createdAt: "2026-01-10T09:05:00Z",
    updatedAt: "2026-01-10T09:05:00Z",
  },
  {
    id: "doc-2",
    projectId: "proj-1",
    type: "timeline",
    title: "Company Timeline",
    content: `NovaPay's journey began in Q2 2024 when co-founders Sarah Lin and Marcus Webb identified the pain point while consulting for international freelancer communities. Both had deep experience in payments infrastructure from their respective tenures at Stripe and Revolut.

In Q3 2024, the team completed a working prototype and secured $1.8M in pre-seed funding from Sequoia Scout and two angel investors with fintech backgrounds. The initial build focused on the USD-EUR corridor, which represents the highest volume freelancer payment flow globally.

By Q1 2025, the platform launched in private beta with 200 users across 12 countries. Early metrics were promising: average transaction time was 22 seconds and user retention at 30 days exceeded 78%. The team grew from 3 to 11 employees during this period.

Q3 2025 marked the public launch, expanding to 48 currencies and onboarding 4,000 users within the first two months. The company achieved $1.4M in annualized recurring revenue by end of year. In Q1 2026, the team is now raising a $12M Series A to fund expansion into new markets and build enterprise payment features.`,
    status: "ready",
    createdAt: "2026-01-10T09:06:00Z",
    updatedAt: "2026-01-10T09:06:00Z",
  },
  {
    id: "doc-3",
    projectId: "proj-1",
    type: "swot-analysis",
    title: "SWOT Analysis",
    content: `Strengths: NovaPay's core technical advantage is its proprietary liquidity network, which enables sub-30-second settlement without relying on traditional correspondent banking. The founding team brings direct experience from Stripe and Revolut, providing both technical depth and industry credibility. The platform's transparent pricing model (flat 0.5%) is a significant differentiator in a market where hidden fees erode trust. Early user retention of 78% at 30 days indicates strong product-market fit.

Weaknesses: NovaPay currently lacks brand recognition compared to established players like Wise or PayPal. The team is still relatively small at 18 people, which limits the pace of geographic expansion and enterprise feature development. The reliance on regional banking partners introduces operational complexity and potential single points of failure in certain corridors.

Opportunities: The global freelancer economy is projected to reach $12 trillion by 2028, creating a massive tailwind for cross-border payment solutions. Regulatory modernization in the EU (PSD3) and emerging markets is reducing barriers to entry. There is also a significant opportunity to expand into B2B payments for small agencies and consultancies, which share similar pain points with individual freelancers.

Threats: Large incumbents like Wise, PayPal, and Stripe could aggressively move into the freelancer niche with dedicated products. Cryptocurrency-based payment rails present a potential disruptive threat, particularly in corridors involving emerging market currencies. Regulatory changes, particularly around anti-money laundering requirements, could increase compliance costs and slow expansion into new jurisdictions.`,
    status: "ready",
    createdAt: "2026-01-10T09:07:00Z",
    updatedAt: "2026-01-10T09:07:00Z",
  },
  {
    id: "doc-4",
    projectId: "proj-1",
    type: "market-research",
    title: "Market Research",
    content: `The global cross-border payment market was valued at $2.8 trillion in 2025 and is expected to grow at a compound annual rate of 7.3% through 2030. Within this market, the freelancer and SMB segment represents approximately $420 billion in annual transaction volume, growing at nearly double the overall market rate due to the accelerating shift toward remote and distributed work.

Primary research conducted across 500 freelancers in North America and Europe revealed that payment speed and fee transparency are the top two factors influencing platform choice, cited by 82% and 76% of respondents respectively. Currently, 61% of freelancers use PayPal as their primary payment method despite dissatisfaction with fees (averaging 4.5% including currency conversion). Only 18% are aware of lower-cost alternatives like Wise or Mercury.

The competitive landscape includes Wise (dominant in consumer transfers), PayPal (largest in online freelancer payments), and emerging players like Payoneer and Deel that bundle payments with workforce management. However, none of these competitors offer sub-minute settlement combined with multi-currency wallets and integrated invoicing in a single platform.

Geographic analysis indicates that the highest-growth corridors for freelancer payments are US-India, US-Philippines, UK-Nigeria, and EU-Latin America. NovaPay's liquidity network currently covers all four of these corridors, positioning the company well for near-term growth.`,
    status: "pending",
    createdAt: "2026-01-10T09:08:00Z",
    updatedAt: "2026-01-10T09:08:00Z",
  },
  {
    id: "doc-5",
    projectId: "proj-1",
    type: "financial-projections",
    title: "Financial Projections",
    content: `NovaPay's financial model projects revenue growing from $1.4M ARR at end of 2025 to $18M ARR by end of 2027, representing a growth rate consistent with top-quartile fintech companies at this stage. The primary revenue driver is transaction fees (0.5% of volume), supplemented by premium subscription revenue and FX spread margins.

Cost structure is dominated by engineering and product development (42% of operating expenses), followed by compliance and licensing (18%), customer support (15%), and sales/marketing (14%). Gross margins are projected to reach 72% by 2027 as the liquidity network scales and per-transaction costs decline.

Key assumptions include: monthly user growth of 20% through 2026 (decelerating to 12% in 2027), average transaction value of $850, average of 3.2 transactions per user per month, and a premium tier conversion rate of 8%. The model assumes no major regulatory disruptions and continued expansion of the currency corridor network.

The company expects to reach EBITDA breakeven in Q3 2027, with a cash runway of 24 months post-Series A. Capital efficiency is strong, with a projected LTV:CAC ratio of 5.2x by end of 2026. The burn multiple (net burn divided by net new ARR) is projected at 1.8x, well within the healthy range for a company at this stage.`,
    status: "pending",
    createdAt: "2026-01-10T09:09:00Z",
    updatedAt: "2026-01-10T09:09:00Z",
  },
  {
    id: "doc-6",
    projectId: "proj-1",
    type: "funding-requirements",
    title: "Funding Requirements",
    content: `NovaPay is raising a $12M Series A round to fuel the next phase of growth. The round is structured as a priced equity round with standard Series A terms. A lead investor has been confirmed and the round is expected to close by March 2026.

The allocation of funds is as follows: 40% ($4.8M) will go toward engineering and product development, specifically expanding the engineering team from 8 to 20 engineers and building enterprise-grade features including batch payments, API access for platforms, and advanced reporting. 25% ($3M) will be allocated to regulatory and licensing efforts, covering money transmitter licenses in 15 additional U.S. states and regulatory compliance in the EU, UK, and two Southeast Asian markets.

Another 25% ($3M) will fund sales and marketing, with a focus on content marketing targeted at freelancer communities, partnership programs with freelance platforms like Upwork and Toptal, and a referral program that has already shown a 3.2x viral coefficient in early testing. The remaining 10% ($1.2M) covers operational expenses including office space, legal, and financial administration.

Post-raise, the company will have approximately 24 months of runway at projected burn rates, providing sufficient time to reach EBITDA breakeven or raise a subsequent round from a position of strength. The dilution from this round is expected to be approximately 18-20% on a fully diluted basis.`,
    status: "pending",
    createdAt: "2026-01-10T09:10:00Z",
    updatedAt: "2026-01-10T09:10:00Z",
  },
  {
    id: "doc-7",
    projectId: "proj-1",
    type: "product-forecast",
    title: "Product Forecast",
    content: `NovaPay's product roadmap for 2026-2027 is organized into three major phases aligned with the company's growth strategy and Series A milestones.

Phase 1 (Q1-Q2 2026) focuses on platform hardening and enterprise readiness. Key deliverables include a public API for third-party integrations, webhook support, batch payment processing for agencies managing 10+ freelancers, and SOC 2 Type II certification. The team will also launch a redesigned onboarding flow targeting a 40% improvement in time-to-first-transaction.

Phase 2 (Q3-Q4 2026) centers on geographic expansion and financial products. The platform will add 12 new currency corridors, with priority given to Southeast Asian and Latin American markets. New financial features include virtual IBANs for European users, instant local payout options (ACH, SEPA, Faster Payments), and a basic savings feature allowing users to earn yield on idle balances. A partnership SDK will enable freelance marketplaces to embed NovaPay payments directly.

Phase 3 (H1 2027) introduces advanced AI-powered features. These include intelligent FX hedging recommendations based on a user's transaction patterns, automated cash flow forecasting for freelancers, and smart invoice generation that pre-fills terms and amounts based on client history. The team also plans to launch NovaPay Business, a dedicated product for agencies and small businesses with team management, approval workflows, and consolidated reporting.`,
    status: "pending",
    createdAt: "2026-01-10T09:11:00Z",
    updatedAt: "2026-01-10T09:11:00Z",
  },
  {
    id: "doc-8",
    projectId: "proj-1",
    type: "competitive-analysis",
    title: "Competitive Analysis",
    content: `The cross-border payment space for freelancers has several established competitors, but no single player addresses the complete set of needs that NovaPay targets. Here is a breakdown of the key competitive dynamics.

Wise (formerly TransferWise) is the closest competitor in terms of transparent pricing and multi-currency accounts. However, Wise primarily serves consumers and has not invested heavily in freelancer-specific tools such as invoicing, tax reporting, or client management. Transfer times on Wise average 1-2 hours for major corridors and up to 3 days for emerging markets. NovaPay's sub-30-second settlement is a meaningful differentiator for freelancers who need immediate access to funds.

PayPal remains the default payment method for many freelancers due to its ubiquity, but its fee structure (2.9% + fixed fee for commercial transactions, plus 3-4% for currency conversion) is significantly higher than NovaPay's flat 0.5%. PayPal has also faced criticism for account freezes and poor dispute resolution, which are particularly painful for freelancers dependent on consistent cash flow.

Payoneer targets freelancers and marketplace sellers but primarily through platform integrations rather than direct-to-freelancer relationships. Their fee structure is competitive (1-2%) but lacks the transparency of NovaPay's flat rate. Deel and Remote.com offer payment services bundled with contractor management, targeting the employer side rather than the freelancer. This creates an opportunity for NovaPay to be the freelancer's preferred receiving platform.

NovaPay's defensible advantages include its proprietary liquidity network (built over 18 months with 22 banking partners), its focus on freelancer-specific workflows, and its growing network effects as more clients and freelancers transact on the platform.`,
    status: "pending",
    createdAt: "2026-01-10T09:12:00Z",
    updatedAt: "2026-01-10T09:12:00Z",
  },
  {
    id: "doc-9",
    projectId: "proj-1",
    type: "executive-summary",
    title: "Executive Summary",
    content: `NovaPay is building the payment infrastructure layer for the global freelancer economy. The platform enables cross-border payments in 48 currencies with settlement in under 30 seconds at a flat 0.5% fee, dramatically improving on the 3-5 day timelines and 5-7% fees charged by legacy solutions.

The company was founded in 2024 by Sarah Lin (former VP Product at Stripe) and Marcus Webb (former principal engineer at Revolut), who identified the cross-border payment problem while working with international freelancer communities. Since its public launch in Q3 2025, NovaPay has grown to 12,400 active users processing $8.2M in monthly volume, generating $1.4M in annualized recurring revenue with 24% month-over-month growth.

The total addressable market for cross-border B2B payments is $2.8 trillion, with the freelancer and SMB segment representing a $420 billion opportunity growing at 14% annually. NovaPay is well-positioned to capture this market through its proprietary liquidity network, transparent pricing, and integrated freelancer workflow tools.

The company is raising a $12M Series A to expand its engineering team, secure regulatory licenses in new markets, and scale its go-to-market efforts. With a confirmed lead investor, the round is expected to close in March 2026. Proceeds will provide 24 months of runway, sufficient to reach projected EBITDA breakeven in Q3 2027.`,
    status: "pending",
    createdAt: "2026-01-10T09:13:00Z",
    updatedAt: "2026-01-10T09:13:00Z",
  },
  // ---- Traction Demo Documents (proj-5) — all ready ----
  {
    id: "doc-10",
    projectId: "proj-5",
    type: "product-description",
    title: "Product Description",
    content: `Traction is an AI-powered startup pitch platform that transforms raw ideas into fully-realized, investor-ready web presentations. Unlike template-based tools, Traction generates bespoke HTML/CSS pitch decks with unique layouts, animations, and typography for every project.

The platform operates in three phases: Ideate, Generate, and Publish. During ideation, founders dump their raw concept into the Traction Agent, which structures the idea and runs it through a brutally honest readiness assessment. The AI doesn't sugarcoat — it flags weak go-to-market strategies, vanity metrics, and missing distribution plans.

In the generation phase, the AI produces a self-contained, code-driven web presentation. Each deck is 100% unique — no two startups share the same visual identity. The generated HTML is rendered in sandboxed iFrames within the Traction platform, ensuring security while preserving creative freedom.

Finally, publication creates a single shareable link that includes the immersive presentation, an honest investor summary, identified risks and strengths, and a deep-dive document database. Every published project also exposes a standard llm.txt endpoint, making the startup discoverable by AI agents and automated investment screening tools.`,
    status: "ready",
    createdAt: "2026-02-20T10:05:00Z",
    updatedAt: "2026-02-25T12:00:00Z",
  },
  {
    id: "doc-11",
    projectId: "proj-5",
    type: "timeline",
    title: "Company Timeline",
    content: `Traction was conceived in Q3 2025 when the founding team — serial builders who had collectively launched over 20 startups — realized they were spending more time assembling pitch materials than actually building products. The insight was clear: the pitch workflow itself was broken.

In Q4 2025, the team built the first prototype: a chatbot interface that could take a raw startup idea and produce structured documentation. Early testing with 50 founders revealed that the ideation feedback loop was the most valued feature — founders wanted honesty, not flattery.

By Q1 2026, the platform evolved to include AI-generated HTML pitch decks. The key breakthrough was moving away from templates entirely, instead having the AI generate unique code-driven presentations for each startup. This eliminated the "everyone looks the same" problem that plagued existing pitch tools.

The hackathon MVP was completed in February 2026, featuring Google Auth, post-idea structuring via API, deck generation with iFrame display, Jinja2 server-side rendered summaries, and llm.txt endpoint routing. The team is now preparing for public launch and seed fundraising.`,
    status: "ready",
    createdAt: "2026-02-20T10:06:00Z",
    updatedAt: "2026-02-25T12:00:00Z",
  },
  {
    id: "doc-12",
    projectId: "proj-5",
    type: "swot-analysis",
    title: "SWOT Analysis",
    content: `Strengths: Traction's core differentiator is its code-driven generation approach. While competitors rely on templates, Traction produces unique HTML/CSS for every deck, making each presentation visually distinct. The brutal honesty of the readiness agent builds trust with sophisticated founders who value substance over polish. The one-link publishing model with integrated investor summaries and risk assessments creates a significantly better experience for both founders and investors.

Weaknesses: The platform is currently in MVP stage with limited production hardening. The AI generation quality is dependent on model capabilities and can occasionally produce inconsistent visual results. The team is small, limiting the speed of feature development and go-to-market execution. The monolithic architecture, while sufficient for launch, may need refactoring to scale.

Opportunities: The global startup ecosystem produces millions of pitch decks annually, yet no dominant AI-native platform exists. The rise of AI-powered investment screening creates demand for machine-readable startup profiles (llm.txt). There is also significant opportunity in the adjacent market of accelerator programs and startup competitions that need standardized pitch formats.

Threats: Large incumbents like Canva, Beautiful.ai, and Gamma could add AI-powered pitch generation features. The rapid pace of AI model improvements means the quality advantage from code-driven generation could be replicated. VC market downturns could reduce demand for pitch tools overall.`,
    status: "ready",
    createdAt: "2026-02-20T10:07:00Z",
    updatedAt: "2026-02-25T12:00:00Z",
  },
  {
    id: "doc-13",
    projectId: "proj-5",
    type: "market-research",
    title: "Market Research",
    content: `The global presentation software market is valued at approximately $8 billion and growing at 12% CAGR, driven by remote work and the shift toward digital communication. Within this market, the startup pitch deck segment represents a $600M annual opportunity when accounting for design agency fees, template subscriptions, and founder time costs.

Primary research across 300 founders revealed critical pain points: 78% spend more than 4 hours assembling pitch materials, 65% feel their decks look generic despite using premium tools, and 82% wish they received honest feedback before presenting to investors. Only 12% of founders currently use AI tools for pitch creation, indicating massive room for adoption.

The competitive landscape includes template-based tools (Slidebean, Pitch), general presentation platforms (Canva, Beautiful.ai, Gamma), and design agencies. None offer the combination of AI ideation, code-driven unique generation, and integrated investor-facing publishing that Traction provides.

Key market trends favor Traction's approach: the rise of AI-native workflows, increasing investor fatigue with templated decks, and the emergence of programmatic deal sourcing that values machine-readable startup data.`,
    status: "ready",
    createdAt: "2026-02-20T10:08:00Z",
    updatedAt: "2026-02-25T12:00:00Z",
  },
  {
    id: "doc-14",
    projectId: "proj-5",
    type: "financial-projections",
    title: "Financial Projections",
    content: `Traction's financial model projects revenue growing from $0 at launch to $2.4M ARR by end of 2027. The primary revenue model is a subscription tier at $15/month per active project, supplemented by premium features including custom domains, analytics dashboards, and priority generation.

The freemium model allows founders to create one project for free, with paid plans unlocking unlimited projects, custom branding, and advanced AI features. Based on comparable SaaS freemium benchmarks, we project a 6% free-to-paid conversion rate, growing to 10% as the product matures.

Cost structure is dominated by AI inference costs (estimated at 35% of revenue at scale), engineering salaries (30%), and infrastructure (15%). Gross margins are projected to reach 55% by 2027 as inference costs decline and per-user revenue increases through upsells.

Key assumptions include: 50,000 free signups in Year 1 (achievable through Product Hunt, startup communities, and accelerator partnerships), 3,000 paying customers by end of Year 1, and average revenue per paying user of $180/year. The company expects to reach cash-flow breakeven in Q2 2028 with a total funding need of $3M.`,
    status: "ready",
    createdAt: "2026-02-20T10:09:00Z",
    updatedAt: "2026-02-25T12:00:00Z",
  },
  {
    id: "doc-15",
    projectId: "proj-5",
    type: "funding-requirements",
    title: "Funding Requirements",
    content: `Traction is raising a $1.5M pre-seed round to take the platform from hackathon MVP to public launch. The round is structured as a SAFE with a $8M post-money valuation cap.

Allocation of funds: 45% ($675K) will go toward engineering, specifically hiring 3 additional engineers to build production infrastructure, improve AI generation quality, and develop the custom domains feature. 20% ($300K) covers AI inference costs for the first 18 months, including model fine-tuning experiments and GPU compute for deck generation.

Another 20% ($300K) funds go-to-market efforts including Product Hunt launch campaigns, partnerships with 10 startup accelerators, content marketing targeted at founder communities, and a referral program. The remaining 15% ($225K) covers operations including legal, accounting, and cloud infrastructure.

Post-raise, the company will have approximately 18 months of runway. Key milestones within this period include: public launch (Month 2), 10,000 registered users (Month 6), 1,000 paying customers (Month 12), and Series A readiness (Month 18) with demonstrated product-market fit metrics.`,
    status: "ready",
    createdAt: "2026-02-20T10:10:00Z",
    updatedAt: "2026-02-25T12:00:00Z",
  },
  {
    id: "doc-16",
    projectId: "proj-5",
    type: "product-forecast",
    title: "Product Forecast",
    content: `Traction's product roadmap for 2026-2027 is organized into three phases aligned with company growth milestones.

Phase 1 — Launch (Q1-Q2 2026): Complete production hardening of the MVP. Key deliverables include robust error handling for AI generation failures, rate limiting, proper authentication with Google OAuth, responsive design for mobile viewing of shared decks, and basic analytics showing view counts and engagement metrics per shared link.

Phase 2 — Growth (Q3-Q4 2026): Focus on features that drive retention and monetization. Wildcard custom domains allow startups to host their pitch at pitch.mystartup.com. An "Ask Investor" RAG simulation lets founders practice Q&A against an AI trained on common investor questions. PDF deck exports enable offline sharing. Version control on ideation preserves the evolution of a startup's narrative over time.

Phase 3 — Platform (H1 2027): Transform Traction from a tool into a platform. Launch a startup directory where published projects are discoverable by investors. Build an API for accelerators to programmatically create and manage cohort pitch decks. Introduce collaborative editing so co-founders can work on pitches simultaneously. Add integration with fundraising CRMs like Affinity and 4Degrees.`,
    status: "ready",
    createdAt: "2026-02-20T10:11:00Z",
    updatedAt: "2026-02-25T12:00:00Z",
  },
  {
    id: "doc-17",
    projectId: "proj-5",
    type: "competitive-analysis",
    title: "Competitive Analysis",
    content: `The pitch deck creation market has several established players, but none take the fully AI-native, code-driven approach that Traction employs.

Slidebean is the closest competitor in terms of focusing specifically on startup pitch decks. They offer AI-assisted content suggestions and professional templates. However, Slidebean's output is fundamentally template-based — every deck uses a pre-designed layout with variable content slots. Pricing starts at $199/year, positioning them in the premium segment. Traction differentiates through unique code-driven generation and the integrated investor summary.

Beautiful.ai and Gamma offer AI-powered presentation creation for general use cases. Beautiful.ai uses smart templates that auto-adjust layouts, while Gamma generates presentations from prompts. Both produce visually appealing results but lack startup-specific features like readiness assessment, investor summaries, and llm.txt discoverability. Their broad market focus means they don't optimize for the founder-to-investor communication flow.

Canva dominates the general design market and has added AI features, but pitch deck creation is a minor use case within their massive platform. The experience is generic — founders must manually build every aspect of their pitch. Pitch.com targets the startup market with collaborative features but relies on traditional slide editing without AI generation.

Traction's defensible advantages include: the brutal honesty readiness agent (no competitor provides genuine critical feedback), code-driven unique visual generation (not templates), and the one-link publishing model with integrated investor intelligence. The llm.txt endpoint is a first-mover feature with no equivalent in the market.`,
    status: "ready",
    createdAt: "2026-02-20T10:12:00Z",
    updatedAt: "2026-02-25T12:00:00Z",
  },
  {
    id: "doc-18",
    projectId: "proj-5",
    type: "executive-summary",
    title: "Executive Summary",
    content: `Traction is building the definitive platform for startup pre-launch presence. The platform transforms raw startup ideas into polished, investor-ready web presentations through an AI-powered workflow that is honest, unique, and immediately publishable.

The current pitch workflow is fundamentally broken. Founders spend hours assembling scattered PDFs, Google Docs, and slide decks that investors skim in seconds. Existing AI tools just put "icing on a bad cake" — they generate pretty templates but don't address the underlying quality of the pitch narrative or provide genuine critical feedback.

Traction solves this with a three-phase approach: Ideate (AI-driven idea structuring with brutal readiness feedback), Generate (code-driven HTML presentations that are 100% unique — no templates), and Publish (one link containing the immersive deck, investor summary, risk analysis, and supporting documents).

The platform also introduces llm.txt discoverability, making published startups findable by AI agents and automated investment screening tools — a capability no competitor offers.

The team consists of serial builders who have collectively launched 20+ startups and experienced the pitch problem firsthand. The hackathon MVP demonstrates the complete flow from ideation to publication. Traction is raising $1.5M pre-seed to take the product to market, targeting 10,000 registered users and 1,000 paying customers within 12 months of launch.`,
    status: "ready",
    createdAt: "2026-02-20T10:13:00Z",
    updatedAt: "2026-02-25T12:00:00Z",
  },
];

// ---------------------------------------------------------------------------
// Chat messages — 10 messages for project 1 (NovaPay)
// ---------------------------------------------------------------------------

export const chatMessages: ChatMessage[] = [
  {
    id: "msg-1",
    projectId: "proj-1",
    role: "user",
    content:
      "I need a pitch deck for NovaPay, our cross-border payment platform for freelancers. We're raising a Series A.",
    createdAt: "2026-01-10T09:00:00Z",
  },
  {
    id: "msg-2",
    projectId: "proj-1",
    role: "assistant",
    content:
      "I've created an 8-slide pitch deck for NovaPay covering your title, problem, solution, market size, business model, traction, team, and ask. I've also generated supporting documents including a product description, market research, and financial projections. Would you like me to adjust anything?",
    createdAt: "2026-01-10T09:01:00Z",
  },
  {
    id: "msg-3",
    projectId: "proj-1",
    role: "user",
    content:
      "The problem slide needs more impact. Can you add a specific dollar figure for how much freelancers lose to fees each year?",
    createdAt: "2026-01-10T09:15:00Z",
  },
  {
    id: "msg-4",
    projectId: "proj-1",
    role: "assistant",
    content:
      "Done. I've added the stat that $150B is lost annually to intermediary costs in cross-border payments. I also strengthened the other bullet points with more specific numbers. The problem slide now leads with concrete pain points that investors can immediately grasp.",
    createdAt: "2026-01-10T09:15:30Z",
  },
  {
    id: "msg-5",
    projectId: "proj-1",
    role: "user",
    content:
      "The market size slide looks good but can you make sure the TAM/SAM/SOM distinction is really clear? Investors always push back on inflated TAM.",
    createdAt: "2026-01-12T14:00:00Z",
  },
  {
    id: "msg-6",
    projectId: "proj-1",
    role: "assistant",
    content:
      "I've restructured the market slide to make the funnel from TAM ($2.8T global cross-border B2B) to SAM ($420B freelancer/SMB segment) to SOM ($18B reachable in 5 years) very explicit. Each tier now has a short descriptor so it's immediately clear how we narrowed the scope. This should hold up well to investor scrutiny.",
    createdAt: "2026-01-12T14:01:00Z",
  },
  {
    id: "msg-7",
    projectId: "proj-1",
    role: "user",
    content:
      "Can you update the traction slide with our latest numbers? We now have 12,400 active users and $8.2M in monthly volume.",
    createdAt: "2026-02-15T10:00:00Z",
  },
  {
    id: "msg-8",
    projectId: "proj-1",
    role: "assistant",
    content:
      "Updated! The traction slide now shows 12,400 active users, $8.2M monthly volume, $1.4M ARR, and a 4.8 App Store rating. I also updated the headline to reflect your 24% month-over-month growth rate. These are strong numbers for a Series A narrative.",
    createdAt: "2026-02-15T10:01:00Z",
  },
  {
    id: "msg-9",
    projectId: "proj-1",
    role: "user",
    content:
      "One more thing — the team slide should mention Priya Sharma, our Head of Compliance. Her background at TransferWise is important for credibility with investors worried about regulatory risk.",
    createdAt: "2026-02-20T14:00:00Z",
  },
  {
    id: "msg-10",
    projectId: "proj-1",
    role: "assistant",
    content:
      "Added Priya Sharma to the team slide as Head of Compliance, highlighting her role as former compliance lead at TransferWise (Wise) and her licensing across 12 jurisdictions. This directly addresses the regulatory concern that many fintech investors have. The slide now shows three strong profiles covering product, engineering, and compliance — a well-rounded founding team.",
    createdAt: "2026-02-20T14:01:00Z",
  },
  // ---- Traction Demo Messages ----
  {
    id: "msg-11",
    projectId: "proj-5",
    role: "user",
    content:
      "Build an immersive pitch deck for Traction itself — our AI-powered startup pitch platform. Make it cinematic with video backgrounds and glassmorphism effects.",
    createdAt: "2026-02-20T10:00:00Z",
  },
  {
    id: "msg-12",
    projectId: "proj-5",
    role: "assistant",
    content:
      "I've generated a 12-slide immersive pitch deck for Traction with HLS video backgrounds, glassmorphism UI, and responsive typography. The deck covers: cover, problem (2 slides), solution, brutal ideation, code-driven generation, one-link pitch, llm.txt discoverability, architecture, market, scope, and outro. All 9 supporting documents have been created and are ready for review.",
    createdAt: "2026-02-20T10:01:00Z",
  },
];

// ---------------------------------------------------------------------------
// Feedback — 5 items for project 1
// ---------------------------------------------------------------------------

export const feedbackItems: Feedback[] = [
  {
    id: "fb-1",
    projectId: "proj-1",
    slideIndex: 1,
    documentId: null,
    selectedText: "Average transfer takes 3-5 business days",
    userComment:
      "This is true for wire transfers but some competitors like Wise can do it in hours. We should be more specific about which methods we're comparing to.",
    resolution:
      "Updated to specify 'traditional wire transfers and bank-to-bank payments' to be more precise about the comparison.",
    status: "applied",
    createdAt: "2026-01-15T11:00:00Z",
  },
  {
    id: "fb-2",
    projectId: "proj-1",
    slideIndex: 3,
    documentId: null,
    selectedText: "$2.8T",
    userComment:
      "Can we cite the source for this TAM figure? Investors will ask.",
    resolution: null,
    status: "pending",
    createdAt: "2026-01-20T09:30:00Z",
  },
  {
    id: "fb-3",
    projectId: "proj-1",
    slideIndex: null,
    documentId: "doc-5",
    selectedText: "monthly user growth of 20%",
    userComment:
      "This seems aggressive. Our actual growth has been closer to 18% average. Let's use the real number.",
    resolution:
      "Adjusted the financial projections to use 18% monthly user growth, which aligns with actual historical data.",
    status: "applied",
    createdAt: "2026-02-01T16:00:00Z",
  },
  {
    id: "fb-4",
    projectId: "proj-1",
    slideIndex: 5,
    documentId: null,
    selectedText: "4.8 App Store rating",
    userComment:
      "We should add the number of reviews to make this more credible. A 4.8 with 50 reviews is different from 4.8 with 2,000.",
    resolution: null,
    status: "pending",
    createdAt: "2026-02-10T13:00:00Z",
  },
  {
    id: "fb-5",
    projectId: "proj-1",
    slideIndex: 7,
    documentId: null,
    selectedText: "Lead investor confirmed",
    userComment:
      "Let's remove this line. Our legal team says we shouldn't disclose this until the term sheet is signed.",
    resolution:
      "Noted, but keeping for now as the term sheet is expected this week. Will remove if it doesn't close.",
    status: "dismissed",
    createdAt: "2026-02-18T10:00:00Z",
  },
];

// ---------------------------------------------------------------------------
// AI Suggestions — 3 for project 1
// ---------------------------------------------------------------------------

export const aiSuggestions: AiSuggestion[] = [
  {
    id: "sug-1",
    projectId: "proj-1",
    target: "slide",
    targetId: "2",
    description:
      "Consider adding a visual comparison chart showing NovaPay's settlement time (30 seconds) vs. competitors (hours to days). A simple bar chart would make the speed advantage immediately tangible for investors.",
    status: "pending",
  },
  {
    id: "sug-2",
    projectId: "proj-1",
    target: "document",
    targetId: "doc-5",
    description:
      "The financial projections assume a constant 8% premium tier conversion rate. Industry benchmarks for fintech freemium models suggest this typically grows from 3-5% to 10-12% as the product matures. Consider modeling a progressive conversion curve for more accurate projections.",
    status: "applied",
  },
  {
    id: "sug-3",
    projectId: "proj-1",
    target: "general",
    targetId: null,
    description:
      "The deck currently lacks a competitive landscape slide. Adding a 2x2 matrix positioning NovaPay against Wise, PayPal, and Payoneer on axes of speed and fee transparency would strengthen the differentiation narrative.",
    status: "pending",
  },
];

// ---------------------------------------------------------------------------
// Share Links — 1 for project 1
// ---------------------------------------------------------------------------

export const shareLinks: ShareLink[] = [
  {
    id: "share-1",
    projectId: "proj-1",
    slug: "novapay-series-a-2026",
    isPasswordProtected: false,
    expiresAt: "2026-04-01T00:00:00Z",
    viewCount: 47,
    createdAt: "2026-02-20T15:00:00Z",
  },
  {
    id: "share-2",
    projectId: "proj-5",
    slug: "traction-pitch-2026",
    isPasswordProtected: false,
    expiresAt: null,
    viewCount: 128,
    createdAt: "2026-02-25T12:00:00Z",
  },
];

// ---------------------------------------------------------------------------
// Helper functions
// ---------------------------------------------------------------------------

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

export function getDocumentsByProjectId(projectId: string): ProjectDocument[] {
  return documents.filter((d) => d.projectId === projectId);
}

export function getDocumentById(documentId: string): ProjectDocument | undefined {
  return documents.find((d) => d.id === documentId);
}

export function getChatMessages(projectId: string): ChatMessage[] {
  return chatMessages.filter((m) => m.projectId === projectId);
}

export function getFeedbackItems(projectId: string): Feedback[] {
  return feedbackItems.filter((f) => f.projectId === projectId);
}

export function getSuggestions(projectId: string): AiSuggestion[] {
  return aiSuggestions.filter((s) => s.projectId === projectId);
}

export function getShareLink(projectId: string): ShareLink | undefined {
  return shareLinks.find((l) => l.projectId === projectId);
}
