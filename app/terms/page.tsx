import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service | Powerclub Global",
  description:
    "Terms governing your use of the Powerclub Global platform and services.",
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

export default function TermsPage() {
  const effectiveDate = "May 19, 2026";

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="container mx-auto px-4 py-24 max-w-3xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-3">
            Terms of{" "}
            <span className="text-[#ae904c]">Service</span>
          </h1>
          <p className="text-white/50 text-sm">
            Effective Date: {effectiveDate} &nbsp;·&nbsp; Last Updated:{" "}
            {effectiveDate}
          </p>
          <div className="mt-6 p-4 border border-[#ae904c]/30 rounded-xl bg-[#ae904c]/5 text-white/70 text-sm leading-relaxed">
            Please read these Terms of Service (&quot;Terms&quot;) carefully before using the
            Powerclub Global platform, dashboard, or related services (the
            &quot;Services&quot;) operated by{" "}
            <strong className="text-white">POWERCLUB GLOBAL LLC</strong> (&quot;Powerclub
            Global,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). By accessing or using the Services you
            agree to be bound by these Terms. If you do not agree, do not use
            the Services.
          </div>
        </div>

        {/* 1. Eligibility */}
        <Section id="eligibility" title="1. Eligibility and Account Registration">
          <p>
            You must be at least 18 years of age and have the legal capacity to
            enter into a binding contract to use the Services. If you are using
            the Services on behalf of an organization, you represent that you
            have the authority to bind that organization to these Terms.
          </p>
          <p>
            You are responsible for maintaining the confidentiality of your
            account credentials and for all activity that occurs under your
            account. You must notify us immediately at{" "}
            <a
              href="mailto:contact@powerclubglobal.com"
              className="text-[#ae904c] underline underline-offset-2"
            >
              contact@powerclubglobal.com
            </a>{" "}
            if you suspect unauthorized access.
          </p>
        </Section>

        {/* 2. Services Description */}
        <Section id="services" title="2. Description of Services">
          <p>
            Powerclub Global provides an AI-powered business intelligence and
            operations platform including project management, CRM, social media
            management, content publishing, financial integrations, and
            AI-assisted tools (collectively, the &quot;Services&quot;). Specific
            features available to you depend on your subscription plan.
          </p>
          <p>
            We may modify, suspend, or discontinue any part of the Services at
            any time. We will provide reasonable notice of material changes that
            affect your use.
          </p>
        </Section>

        {/* 3. Acceptable Use */}
        <Section id="acceptable-use" title="3. Acceptable Use">
          <p>You agree to use the Services only for lawful purposes and in accordance with these Terms. You must not:</p>
          <ul className="space-y-1.5 pl-1 mt-2">
            <Li>Violate any applicable local, state, national, or international law or regulation</Li>
            <Li>Upload, transmit, or distribute any content that is unlawful, harmful, defamatory, obscene, or otherwise objectionable</Li>
            <Li>Infringe any intellectual property or privacy rights of any person or entity</Li>
            <Li>Attempt to gain unauthorized access to any part of the Services or any third-party system</Li>
            <Li>Interfere with or disrupt the integrity or performance of the Services</Li>
            <Li>Use automated scripts, bots, or scrapers to access the Services without our express written consent</Li>
            <Li>Harvest or collect personal data of other users without their consent</Li>
            <Li>Impersonate any person or entity, or misrepresent your affiliation with a person or entity</Li>
            <Li>Use the Services to send unsolicited communications (spam)</Li>
            <Li>Reverse engineer, decompile, or attempt to extract source code from the Services</Li>
          </ul>
        </Section>

        {/* 4. Third-Party Integrations */}
        <Section id="integrations" title="4. Third-Party Integrations">
          <p>
            The Services allow you to connect third-party platforms including
            Google Workspace, Microsoft OneDrive, LinkedIn, TikTok, Meta
            (Facebook and Instagram), X/Twitter, Slack, QuickBooks, Pinterest,
            YouTube, and others (each a &quot;Third-Party Service&quot;). Your use of
            each connected Third-Party Service is governed by that service&apos;s
            own terms of service and privacy policy, in addition to these Terms.
          </p>
          <p>
            By connecting a Third-Party Service you authorize us to access,
            retrieve, and act on data from that service only as described in
            our{" "}
            <a
              href="/privacy"
              className="text-[#ae904c] underline underline-offset-2"
            >
              Privacy Policy
            </a>{" "}
            and only within the scopes you grant during the OAuth authorization
            flow. You may revoke any integration at any time through your account
            settings or directly through the Third-Party Service&apos;s platform.
          </p>
          <p>
            You acknowledge and agree that:
          </p>
          <ul className="space-y-1.5 pl-1 mt-2">
            <Li>We are not responsible for the availability, accuracy, or conduct of any Third-Party Service.</Li>
            <Li>
              Your use of Google APIs is subject to the{" "}
              <a
                href="https://developers.google.com/terms/api-services-user-data-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#ae904c] underline underline-offset-2"
              >
                Google API Services User Data Policy
              </a>
              , including the Limited Use requirements.
            </Li>
            <Li>Your use of Meta products is subject to the <a href="https://developers.facebook.com/terms/" target="_blank" rel="noopener noreferrer" className="text-[#ae904c] underline underline-offset-2">Meta Platform Terms</a>.</Li>
            <Li>Your use of LinkedIn APIs is subject to the <a href="https://www.linkedin.com/legal/l/api-terms-of-use" target="_blank" rel="noopener noreferrer" className="text-[#ae904c] underline underline-offset-2">LinkedIn API Terms of Use</a>.</Li>
            <Li>Your use of X / Twitter APIs is subject to the <a href="https://developer.x.com/en/developer-terms/agreement-and-policy" target="_blank" rel="noopener noreferrer" className="text-[#ae904c] underline underline-offset-2">X Developer Agreement and Policy</a>.</Li>
            <Li>Your use of TikTok APIs is subject to the <a href="https://www.tiktok.com/legal/page/global/tik-tok-developer-terms-of-service/en" target="_blank" rel="noopener noreferrer" className="text-[#ae904c] underline underline-offset-2">TikTok Developer Terms of Service</a>.</Li>
            <Li>Your use of Microsoft APIs is subject to the <a href="https://learn.microsoft.com/en-us/legal/microsoft-apis/terms-of-use" target="_blank" rel="noopener noreferrer" className="text-[#ae904c] underline underline-offset-2">Microsoft APIs Terms of Use</a>.</Li>
            <Li>Your use of Slack APIs is subject to the <a href="https://slack.com/terms-of-service/api" target="_blank" rel="noopener noreferrer" className="text-[#ae904c] underline underline-offset-2">Slack API Terms of Service</a>.</Li>
            <Li>Your use of QuickBooks APIs is subject to the <a href="https://developer.intuit.com/app/developer/qbo/docs/legal-agreements/intuit-terms-of-service-for-intuit-developer-services" target="_blank" rel="noopener noreferrer" className="text-[#ae904c] underline underline-offset-2">Intuit Developer Terms of Service</a>.</Li>
          </ul>

          <SubSection title="4.1 Your Obligations When Using Integrations">
            <p>When using third-party integrations, you must not:</p>
            <ul className="space-y-1.5 pl-1 mt-2">
              <Li>Use data obtained through integrations for advertising targeting, data brokerage, or surveillance</Li>
              <Li>Use Slack data to train machine learning or AI models</Li>
              <Li>Store Pinterest API data beyond immediate use as required by Pinterest&apos;s policies</Li>
              <Li>Use Google API data for any purpose not prominently visible as a feature in the Services</Li>
              <Li>Discriminate against any person based on protected characteristics using data obtained through Meta APIs</Li>
            </ul>
          </SubSection>
        </Section>

        {/* 5. User Content */}
        <Section id="user-content" title="5. User Content">
          <p>
            You retain ownership of all content you upload, create, or transmit
            through the Services (&quot;User Content&quot;). By submitting User Content,
            you grant Powerclub Global a limited, non-exclusive, royalty-free
            license to host, store, process, and display that content solely to
            provide the Services to you.
          </p>
          <p>
            You represent and warrant that you have all rights necessary to grant
            this license and that your User Content does not violate the rights
            of any third party or any applicable law.
          </p>
          <p>
            If your User Content includes copyrighted material and you believe
            it has been infringed, you may submit a DMCA takedown notice to{" "}
            <a
              href="mailto:contact@powerclubglobal.com"
              className="text-[#ae904c] underline underline-offset-2"
            >
              contact@powerclubglobal.com
            </a>{" "}
            with the information required by 17 U.S.C. § 512(c)(3).
          </p>
        </Section>

        {/* 6. Payment and VIBE Tokens */}
        <Section id="payments" title="6. Payment Terms and VIBE Tokens">
          <p>
            Certain features require a paid subscription or expenditure of VIBE
            tokens. All fees are stated in USD unless otherwise noted. By
            purchasing a subscription or tokens, you authorize us to charge your
            payment method on the applicable billing cycle.
          </p>
          <p>
            VIBE tokens are a platform utility credit redeemable for Services.
            They are not a cryptocurrency, security, or investment instrument.
            VIBE tokens have no cash value and are non-refundable except where
            required by applicable law. Unused tokens expire upon account
            termination.
          </p>
          <p>
            Subscription fees are non-refundable except where required by law
            or as stated in our refund policy at the time of purchase. We
            reserve the right to change pricing with 30 days&apos; written notice.
          </p>
        </Section>

        {/* 7. Intellectual Property */}
        <Section id="ip" title="7. Intellectual Property">
          <p>
            The Services, including all software, design, text, graphics, and
            other content created by Powerclub Global, are owned by Powerclub
            Global and protected by applicable intellectual property laws.
            Nothing in these Terms transfers any intellectual property rights
            to you except the limited license to use the Services as described
            herein.
          </p>
          <p>
            &quot;Powerclub Global,&quot; the Powerclub Global logo, and related marks are
            trademarks of POWERCLUB GLOBAL LLC. You may not use our marks
            without our prior written consent.
          </p>
        </Section>

        {/* 8. AI-Assisted Features */}
        <Section id="ai-features" title="8. AI-Assisted Features">
          <p>
            The Services include AI-powered features such as content generation,
            research assistance, and automated workflows. You acknowledge that:
          </p>
          <ul className="space-y-1.5 pl-1 mt-2">
            <Li>AI-generated outputs may be inaccurate, incomplete, or inappropriate — always review before use.</Li>
            <Li>You are solely responsible for any decisions made based on AI-generated content.</Li>
            <Li>AI features are powered by third-party model providers (including Anthropic) whose own usage policies apply to your use of those features.</Li>
            <Li>We do not use your personal data or integration data to train AI models without your explicit opt-in consent.</Li>
          </ul>
        </Section>

        {/* 9. Data and Privacy */}
        <Section id="privacy-ref" title="9. Data and Privacy">
          <p>
            Your use of the Services is subject to our{" "}
            <a href="/privacy" className="text-[#ae904c] underline underline-offset-2">
              Privacy Policy
            </a>
            , which is incorporated into these Terms by reference. The Privacy
            Policy describes how we collect, use, and protect your information,
            including detailed disclosures for each third-party integration.
          </p>
          <p>
            You are responsible for ensuring that any personal data you input
            about other individuals (such as CRM contacts) has been collected
            lawfully and with appropriate consent.
          </p>
        </Section>

        {/* 10. Termination */}
        <Section id="termination" title="10. Termination">
          <p>
            You may terminate your account at any time by contacting us or using
            the account closure option in your settings. We may suspend or
            terminate your access immediately if you materially breach these
            Terms, engage in fraudulent activity, or if required by law or by
            a third-party platform whose terms govern our integration.
          </p>
          <p>
            Upon termination, your right to use the Services ceases. We will
            handle your data as described in the{" "}
            <a href="/privacy" className="text-[#ae904c] underline underline-offset-2">
              Privacy Policy
            </a>
            . Sections 5 (User Content license survives only as needed to
            remove content), 7 (Intellectual Property), 11 (Disclaimers), 12
            (Limitation of Liability), and 13 (Governing Law) survive
            termination.
          </p>
        </Section>

        {/* 11. Disclaimers */}
        <Section id="disclaimers" title="11. Disclaimers">
          <p className="uppercase text-xs tracking-wide text-white/50 font-semibold mb-3">
            Please read carefully
          </p>
          <p>
            THE SERVICES ARE PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT
            WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT
            LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
            PURPOSE, NON-INFRINGEMENT, OR UNINTERRUPTED OR ERROR-FREE
            OPERATION. WE DO NOT WARRANT THAT THE SERVICES WILL MEET YOUR
            REQUIREMENTS OR THAT ANY ERRORS WILL BE CORRECTED.
          </p>
          <p>
            THIRD-PARTY SERVICES AND INTEGRATIONS ARE PROVIDED BY THEIR
            RESPECTIVE OPERATORS. WE MAKE NO REPRESENTATIONS REGARDING THE
            AVAILABILITY, ACCURACY, OR RELIABILITY OF ANY THIRD-PARTY SERVICE.
          </p>
        </Section>

        {/* 12. Limitation of Liability */}
        <Section id="liability" title="12. Limitation of Liability">
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, POWERCLUB GLOBAL
            LLC, ITS OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS SHALL NOT BE
            LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR
            PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, GOODWILL, OR
            OTHER INTANGIBLE LOSSES, ARISING OUT OF OR IN CONNECTION WITH YOUR
            USE OF THE SERVICES.
          </p>
          <p>
            OUR TOTAL CUMULATIVE LIABILITY TO YOU FOR ANY CLAIMS ARISING UNDER
            THESE TERMS SHALL NOT EXCEED THE GREATER OF (A) THE AMOUNTS YOU
            PAID US IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM OR (B) ONE
            HUNDRED DOLLARS ($100).
          </p>
          <p>
            SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF CERTAIN WARRANTIES
            OR LIMITATION OF LIABILITY, SO THE ABOVE LIMITATIONS MAY NOT APPLY
            TO YOU.
          </p>
        </Section>

        {/* 13. Indemnification */}
        <Section id="indemnification" title="13. Indemnification">
          <p>
            You agree to indemnify, defend, and hold harmless Powerclub Global
            LLC and its officers, directors, employees, and agents from and
            against any claims, liabilities, damages, losses, and expenses
            (including reasonable attorneys&apos; fees) arising out of or relating to
            (a) your use of the Services, (b) your User Content, (c) your
            violation of these Terms, or (d) your violation of any third-party
            rights or applicable law.
          </p>
        </Section>

        {/* 14. Governing Law */}
        <Section id="governing-law" title="14. Governing Law and Dispute Resolution">
          <p>
            These Terms are governed by the laws of the State of Oklahoma,
            United States, without regard to conflict-of-law principles. Any
            dispute arising under these Terms shall be resolved exclusively in
            the state or federal courts located in Kay County, Oklahoma, and
            you consent to personal jurisdiction in those courts.
          </p>
          <p>
            For disputes involving amounts of $10,000 or less, either party
            may elect to resolve the dispute through binding, non-appearance
            based arbitration. The arbitrator&apos;s award shall be final and
            binding and may be entered as a judgment in any court of competent
            jurisdiction.
          </p>
          <p>
            You waive any right to participate in a class action lawsuit or
            class-wide arbitration.
          </p>
        </Section>

        {/* 15. Changes */}
        <Section id="changes" title="15. Changes to These Terms">
          <p>
            We may update these Terms at any time. We will provide at least 30
            days&apos; notice of material changes via email or a prominent notice
            in the Services. Your continued use of the Services after the
            effective date of any update constitutes your acceptance of the
            revised Terms. If you do not agree to the updated Terms, you must
            stop using the Services and close your account.
          </p>
        </Section>

        {/* 16. Contact */}
        <Section id="contact" title="16. Contact Us">
          <p>
            Questions about these Terms may be directed to:
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
