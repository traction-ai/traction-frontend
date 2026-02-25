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
  name: "Alex Chen",
  email: "alex@example.com",
  avatarUrl: null,
  createdAt: "2025-09-15T08:00:00Z",
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
