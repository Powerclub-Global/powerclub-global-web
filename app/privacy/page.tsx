import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Powerclub Global",
  description:
    "How Powerclub Global collects, uses, and protects your personal information.",
};

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mb-10">
      <h2 className="text-xl font-semibold text-[#ae904c] mb-3">{title}</h2>
      <div className="space-y-3 text-white/70 leading-relaxed">{children}</div>
    </section>
  );
}

function SubSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-5">
      <h3 className="text-base font-semibold text-white/90 mb-2">{title}</h3>
      <div className="space-y-2 text-white/70 leading-relaxed">{children}</div>
    </div>
  );
}

function Li({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-2">
      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ae904c]" />
      <span>{children}</span>
    </li>
  );
}

export default function PrivacyPage() {
  const effectiveDate = "May 19, 2026";

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="container mx-auto px-4 py-24 max-w-3xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-3">
            Privacy{" "}
            <span className="text-[#ae904c]">Policy</span>
          </h1>
          <p className="text-white/50 text-sm">
            Effective Date: {effectiveDate} &nbsp;·&nbsp; Last Updated:{" "}
            {effectiveDate}
          </p>
          <div className="mt-6 p-4 border border-[#ae904c]/30 rounded-xl bg-[#ae904c]/5 text-white/70 text-sm leading-relaxed">
            This Privacy Policy describes how <strong className="text-white">POWERCLUB GLOBAL LLC</strong>{" "}
            (&quot;Powerclub Global,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) collects, uses, and
            shares information about you when you use our platform, dashboard,
            mobile applications, and related services (collectively, the
            &quot;Services&quot;). By using the Services, you agree to the practices
            described in this policy.
          </div>
        </div>

        {/* Google Limited Use — required verbatim statement */}
        <div className="mb-10 p-4 border border-[#ae904c]/40 rounded-xl bg-[#ae904c]/5 text-white/80 text-sm leading-relaxed">
          <strong className="text-[#ae904c]">Google API Services Disclosure:</strong>{" "}
          The App&apos;s use of information received from Google APIs will adhere to the{" "}
          <a
            href="https://developers.google.com/terms/api-services-user-data-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#ae904c] underline underline-offset-2"
          >
            Google API Services User Data Policy
          </a>
          , including the Limited Use requirements.
        </div>

        {/* 1. Information We Collect */}
        <Section id="information-collected" title="1. Information We Collect">
          <p>
            We collect information you provide directly, information generated
            through your use of the Services, and information received from
            third-party platforms you connect to your account.
          </p>

          <SubSection title="1.1 Account Information">
            <p>
              When you register, we collect your name, email address, password
              (stored as a one-way hash), organization name, and billing details.
            </p>
          </SubSection>

          <SubSection title="1.2 Integration Data">
            <p>
              When you connect a third-party platform to the Services (such as
              Google Workspace, Microsoft OneDrive, LinkedIn, TikTok, Meta
              products, X/Twitter, QuickBooks, or Slack), we access only the data
              you explicitly authorize through that platform&apos;s OAuth consent
              screen. The data we may access includes:
            </p>
            <ul className="space-y-1.5 mt-2 pl-1">
              <Li>
                <strong>Google (Gmail, Drive, Calendar, YouTube):</strong> Email
                content and metadata, file names and contents, calendar events,
                and YouTube channel analytics — only as required to deliver the
                specific feature you enable.
              </Li>
              <Li>
                <strong>Microsoft (OneDrive):</strong> File metadata and
                contents within scopes you authorize.
              </Li>
              <Li>
                <strong>LinkedIn:</strong> Profile information, company pages,
                posts, and connection data within authorized scopes.
              </Li>
              <Li>
                <strong>TikTok:</strong> Profile information, video metadata, and
                publishing access within authorized scopes.
              </Li>
              <Li>
                <strong>Meta (Facebook, Instagram):</strong> Page data, post
                content, audience insights, and messaging data within authorized
                scopes.
              </Li>
              <Li>
                <strong>X / Twitter:</strong> Profile data, posts, and
                engagement metrics within authorized scopes.
              </Li>
              <Li>
                <strong>Slack:</strong> Workspace messages and channel data
                within authorized scopes.
              </Li>
              <Li>
                <strong>QuickBooks / Intuit:</strong> Financial records,
                invoices, and accounting data within authorized scopes.
              </Li>
            </ul>
          </SubSection>

          <SubSection title="1.3 Usage and Analytics Data">
            <p>
              We automatically collect information about how you interact with
              the Services, including pages viewed, features used, timestamps,
              IP address, browser type, and device identifiers. We use this
              data to operate, maintain, and improve the Services.
            </p>
          </SubSection>

          <SubSection title="1.4 Payment and Transaction Data">
            <p>
              When you purchase Services or transact in VIBE tokens, we collect
              billing information, transaction identifiers, and payment processor
              data. Full payment card details are handled by our payment processor
              and are not stored on our servers.
            </p>
          </SubSection>
        </Section>

        {/* 2. How We Use Your Information */}
        <Section id="how-we-use" title="2. How We Use Your Information">
          <p>We use the information we collect to:</p>
          <ul className="space-y-1.5 pl-1 mt-2">
            <Li>Provide, operate, and maintain the Services</Li>
            <Li>Personalize your experience and deliver features you request</Li>
            <Li>Process transactions and manage your account</Li>
            <Li>Send transactional emails and service notifications</Li>
            <Li>Detect, investigate, and prevent security incidents and abuse</Li>
            <Li>Comply with legal obligations</Li>
            <Li>Improve and develop new features based on aggregate, anonymized usage patterns</Li>
          </ul>
          <p className="mt-4">
            <strong className="text-white">We do not use your data to:</strong>
          </p>
          <ul className="space-y-1.5 pl-1 mt-2">
            <Li>Target, serve, or optimize advertising of any kind</Li>
            <Li>Sell, rent, or trade your personal data to data brokers or third-party marketers</Li>
            <Li>Train machine learning or large language models without your explicit opt-in consent</Li>
            <Li>Profile you for employment, credit, housing, or insurance eligibility determinations</Li>
            <Li>Conduct surveillance or track your activity across unrelated services</Li>
          </ul>
        </Section>

        {/* 3. Integration-Specific Disclosures */}
        <Section id="integration-disclosures" title="3. Integration-Specific Disclosures">

          <SubSection title="3.1 Google API Services">
            <p>
              Our use of data obtained from Google APIs is limited to providing
              or improving user-facing features that are prominently visible
              within the Services. We do not transfer Google user data to third
              parties for advertising, data brokerage, or any purpose unrelated
              to the feature that requested it. No Google user data is accessed
              by our personnel except (a) with your affirmative consent, (b) for
              security investigation, (c) as required by law, or (d) for
              internal aggregated operations after data is anonymized.
            </p>
            <p className="mt-2 text-sm text-white/50 italic">
              See the boxed disclosure at the top of this policy for the
              required verbatim Google Limited Use statement.
            </p>
          </SubSection>

          <SubSection title="3.2 Microsoft (OneDrive)">
            <p>
              Data accessed through Microsoft APIs is used solely to provide
              the file management and storage features you enable. We do not
              use Microsoft API data for advertising or marketing purposes.
              You may revoke our access to your Microsoft account at any time
              by visiting{" "}
              <a
                href="https://account.live.com/consent/Manage"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#ae904c] underline underline-offset-2"
              >
                account.live.com/consent/Manage
              </a>{" "}
              or{" "}
              <a
                href="https://myapps.microsoft.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#ae904c] underline underline-offset-2"
              >
                myapps.microsoft.com
              </a>
              . After revoking access, you may also disconnect the integration
              within your Powerclub Global account settings to remove any
              locally stored tokens.
            </p>
          </SubSection>

          <SubSection title="3.3 Meta (Facebook & Instagram)">
            <p>
              Platform Data obtained through Meta APIs is processed only as
              described in this policy. We delete Platform Data upon your
              request, upon account closure, or when we discontinue the
              relevant feature. We maintain proof of deletion upon Meta&apos;s
              request. We do not use Meta Platform Data for discriminatory
              purposes related to protected characteristics, for
              creditworthiness determinations, or for surveillance.
            </p>
          </SubSection>

          <SubSection title="3.4 LinkedIn">
            <p>
              We access LinkedIn data only within the scopes you authorize and
              only to provide or improve the LinkedIn-related features you
              actively use. We will notify you before any material change in
              how we use LinkedIn data and will obtain fresh consent where
              required. You may withdraw consent at any time through your
              LinkedIn account settings or by disconnecting the integration in
              the Services.
            </p>
          </SubSection>

          <SubSection title="3.5 X / Twitter">
            <p>
              We do not link your X identity to off-platform identifiers without
              your express, opt-in consent. We do not aggregate location data
              from X posts separately from the posts themselves. We do not use
              X data to conduct surveillance or monitor individuals at sensitive
              locations or events.
            </p>
          </SubSection>

          <SubSection title="3.6 TikTok">
            <p>
              TikTok data is processed only for the purpose of enabling the
              TikTok publishing and analytics features within the Services. We
              do not use TikTok data for cross-context behavioral advertising.
              Personnel with access to TikTok-derived data are bound by
              confidentiality obligations. We cooperate with TikTok to fulfill
              data subject rights requests promptly.
            </p>
          </SubSection>

          <SubSection title="3.7 Slack">
            <p>
              Slack workspace data accessed through our integration is used
              solely to provide the Slack-related features you enable. We do not
              combine Slack data with information from unrelated sources. We do
              not use Slack data to train machine learning models or large
              language models. All Slack user data will be deleted within
              fourteen (14) business days of you disconnecting the Slack
              integration or closing your account.
            </p>
          </SubSection>

          <SubSection title="3.8 QuickBooks / Intuit">
            <p>
              Financial data accessed via the QuickBooks API is used solely for
              the accounting and invoicing features you enable. We do not use
              QuickBooks data for competitive intelligence or any purpose beyond
              your stated application function. Data is accessed only within the
              scopes the authenticating user authorizes.
            </p>
          </SubSection>

          <SubSection title="3.9 Pinterest">
            <p>
              Pinterest API data is not persistently stored beyond what is
              immediately required to display or act on the data you request.
              We do not share Pinterest data with third parties, merge it with
              data from other accounts, or combine it with information from other
              services. If you use audience onboarding or advertising features,
              we will provide clear notice and obtain any necessary consents
              before sharing data with Pinterest for those purposes.
            </p>
          </SubSection>
        </Section>

        {/* 4. Data Sharing */}
        <Section id="data-sharing" title="4. How We Share Your Information">
          <p>
            We do not sell your personal data. We share information only in the
            following circumstances:
          </p>
          <ul className="space-y-1.5 pl-1 mt-2">
            <Li>
              <strong>Service Providers:</strong> We engage third-party vendors
              (infrastructure, analytics, payments) who process data on our
              behalf under written agreements at least as protective as this
              policy.
            </Li>
            <Li>
              <strong>Your Organization:</strong> If you use the Services as
              part of an organization account, your workspace administrators may
              have access to your activity and data within that workspace.
            </Li>
            <Li>
              <strong>Legal Requirements:</strong> We may disclose information
              if required by law, court order, or valid government request.
            </Li>
            <Li>
              <strong>Business Transfers:</strong> In connection with a merger,
              acquisition, or sale of assets, your data may be transferred.
              We will provide notice before your data is subject to a different
              privacy policy.
            </Li>
            <Li>
              <strong>With Your Consent:</strong> We share information for
              any other purpose with your explicit consent.
            </Li>
          </ul>
        </Section>

        {/* 5. Data Retention and Deletion */}
        <Section id="data-retention" title="5. Data Retention and Deletion">
          <p>
            We retain your personal data for as long as your account is active
            or as needed to provide the Services. You may request deletion of
            your account and associated data at any time by contacting us at{" "}
            <a
              href="mailto:contact@powerclubglobal.com"
              className="text-[#ae904c] underline underline-offset-2"
            >
              contact@powerclubglobal.com
            </a>
            .
          </p>
          <p>
            Upon account closure or upon your request:
          </p>
          <ul className="space-y-1.5 pl-1 mt-2">
            <Li>We delete or anonymize your personal data within 30 days, except where retention is required by law.</Li>
            <Li>Third-party integration tokens and cached data are deleted promptly.</Li>
            <Li>Slack-specific data is deleted within 14 business days as required by Slack&apos;s policies.</Li>
            <Li>Pinterest API data is not retained beyond the immediate session.</Li>
          </ul>
          <p>
            We may retain certain data in anonymized, aggregated form for
            analytics and service improvement after deletion of your account.
          </p>
        </Section>

        {/* 6. Your Rights */}
        <Section id="your-rights" title="6. Your Rights">
          <p>
            Depending on your location, you may have the following rights
            regarding your personal data:
          </p>
          <ul className="space-y-1.5 pl-1 mt-2">
            <Li><strong>Access:</strong> Request a copy of the personal data we hold about you.</Li>
            <Li><strong>Correction:</strong> Request correction of inaccurate data.</Li>
            <Li><strong>Deletion:</strong> Request deletion of your personal data.</Li>
            <Li><strong>Portability:</strong> Request a machine-readable export of your data.</Li>
            <Li><strong>Restriction:</strong> Request that we limit processing of your data.</Li>
            <Li><strong>Objection:</strong> Object to certain types of processing, including direct marketing.</Li>
            <Li><strong>Withdraw Consent:</strong> Withdraw consent at any time where processing is based on consent, without affecting prior processing.</Li>
          </ul>
          <p>
            To exercise any of these rights, contact us at{" "}
            <a
              href="mailto:contact@powerclubglobal.com"
              className="text-[#ae904c] underline underline-offset-2"
            >
              contact@powerclubglobal.com
            </a>
            . We will respond within 30 days. You also have the right to
            revoke third-party integrations directly through each platform&apos;s
            account settings at any time.
          </p>

          <SubSection title="California Residents (CCPA)">
            <p>
              California residents have the right to know what personal
              information is collected, sold, or disclosed; to opt out of the
              sale of personal information (we do not sell personal
              information); to request deletion; and to non-discrimination for
              exercising these rights.
            </p>
          </SubSection>

          <SubSection title="EEA / UK Residents (GDPR)">
            <p>
              If you are located in the European Economic Area or United
              Kingdom, you may lodge a complaint with your local data protection
              authority. Our lawful bases for processing are: performance of a
              contract (account and service delivery), legitimate interests
              (security, fraud prevention, analytics), and consent (third-party
              integrations).
            </p>
          </SubSection>
        </Section>

        {/* 7. Security */}
        <Section id="security" title="7. Security">
          <p>
            We implement industry-standard technical and organizational measures
            to protect your data, including AES-GCM encryption for stored OAuth
            tokens, TLS for data in transit, and access controls limiting
            employee access to personal data. In the event of a data breach
            affecting your personal information, we will notify you and any
            affected platform providers without undue delay as required by
            applicable law.
          </p>
        </Section>

        {/* 8. Cookies */}
        <Section id="cookies" title="8. Cookies and Tracking">
          <p>
            We use cookies and similar technologies to maintain sessions,
            remember preferences, and analyze usage. If we display embedded
            X (Twitter) content or widgets, please be aware that X may collect
            data for interest-based advertising and personalization; you can
            opt out through X&apos;s account settings.
          </p>
        </Section>

        {/* 9. Children */}
        <Section id="children" title="9. Children's Privacy">
          <p>
            The Services are not directed to individuals under the age of 18.
            We do not knowingly collect personal data from children. If you
            believe a child has provided us with personal data, please contact
            us and we will delete it promptly.
          </p>
        </Section>

        {/* 10. Changes */}
        <Section id="changes" title="10. Changes to This Policy">
          <p>
            We may update this Privacy Policy from time to time. We will notify
            you of material changes by email or through a prominent notice within
            the Services at least 30 days before the change takes effect. Your
            continued use of the Services after the effective date constitutes
            acceptance of the updated policy. If a change affects how we process
            data obtained through a third-party integration, we will obtain fresh
            consent where required by that platform&apos;s terms.
          </p>
        </Section>

        {/* 11. Contact */}
        <Section id="contact" title="11. Contact Us">
          <p>
            If you have questions about this Privacy Policy or wish to exercise
            your rights, contact us:
          </p>
          <div className="mt-4 p-5 border border-[#ae904c]/20 rounded-xl bg-white/5 space-y-1 text-white/80">
            <p className="font-semibold text-white">POWERCLUB GLOBAL LLC</p>
            <p>223 W Grand Ave</p>
            <p>Ponca City, OK 74601</p>
            <p>
              Email:{" "}
              <a
                href="mailto:contact@powerclubglobal.com"
                className="text-[#ae904c] underline underline-offset-2"
              >
                contact@powerclubglobal.com
              </a>
            </p>
          </div>
        </Section>
      </main>

      <Footer />
    </div>
  );
}
