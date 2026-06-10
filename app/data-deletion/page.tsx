"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle, Clock, AlertCircle, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface StatusResponse {
  confirmation_code: string;
  status: string;
  created_at: string;
  completed_at: string | null;
}

interface ManualResponse {
  confirmation_code: string;
  message: string;
}

function StatusBadge({ status }: { status: string }) {
  if (status === "completed") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-green-900/40 border border-green-700/40 px-3 py-1 text-sm font-medium text-green-400">
        <CheckCircle className="h-3.5 w-3.5" /> Completed
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-900/30 border border-yellow-700/30 px-3 py-1 text-sm font-medium text-yellow-400">
      <Clock className="h-3.5 w-3.5" /> Pending — processing within 30 days
    </span>
  );
}

function DataDeletionContent() {
  const searchParams = useSearchParams();
  const idParam = searchParams.get("id");

  const [statusResult, setStatusResult] = useState<StatusResponse | null>(null);
  const [statusError, setStatusError] = useState("");
  const [statusLoading, setStatusLoading] = useState(false);
  const [lookupCode, setLookupCode] = useState(idParam ?? "");

  const [email, setEmail] = useState("");
  const [requestResult, setRequestResult] = useState<ManualResponse | null>(null);
  const [requestError, setRequestError] = useState("");
  const [requestLoading, setRequestLoading] = useState(false);

  useEffect(() => {
    if (idParam) fetchStatus(idParam);
  }, [idParam]);

  async function fetchStatus(code: string) {
    setStatusError("");
    setStatusResult(null);
    setStatusLoading(true);
    try {
      const res = await fetch(
        `/api/data-deletion/status?id=${encodeURIComponent(code)}`
      );
      const data = await res.json();
      if (!res.ok) {
        setStatusError(data.error ?? "Could not retrieve status.");
        return;
      }
      setStatusResult(data);
    } catch {
      setStatusError("Could not retrieve status. Please try again.");
    } finally {
      setStatusLoading(false);
    }
  }

  async function handleRequest(e: React.FormEvent) {
    e.preventDefault();
    setRequestError("");
    setRequestResult(null);
    setRequestLoading(true);
    try {
      const formData = new FormData();
      formData.append("email", email);
      const res = await fetch("/api/data-deletion", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        setRequestError(data.error ?? "Failed to submit request.");
        return;
      }
      setRequestResult(data);
    } catch {
      setRequestError("Failed to submit request. Please try again.");
    } finally {
      setRequestLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="container mx-auto px-4 py-24 max-w-3xl">
        {/* Header */}
        <div className="mb-12">
          <p className="text-[#ae904c] text-sm font-medium tracking-widest uppercase mb-3">
            Privacy & Data Rights
          </p>
          <h1 className="text-4xl font-bold text-white mb-4">
            Data Deletion Request
          </h1>
          <p className="text-white/60 leading-relaxed">
            You have the right to request deletion of any personal data we hold
            about you, including data associated with your Facebook or Instagram
            connection to Powerclub Global. Requests are processed within{" "}
            <span className="text-white/90">30 days</span>.
          </p>
        </div>

        {/* What we store */}
        <section className="mb-8 rounded-xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold text-[#ae904c] mb-4">
            What data we hold
          </h2>
          <ul className="space-y-2.5">
            {[
              "Your name, email address, and profile information",
              "Social media account connections (Facebook, Instagram, LinkedIn, etc.)",
              "Posts, drafts, and content scheduled through our platform",
              "Usage history and activity logs",
              "Billing and transaction records (retained as required by law)",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-white/60">
                <ChevronRight className="h-4 w-4 mt-0.5 flex-shrink-0 text-[#ae904c]" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-white/40">
            Financial records may be retained for up to 7 years as required by
            applicable law, even after a deletion request is processed.
          </p>
        </section>

        {/* Request form */}
        {!requestResult ? (
          <section className="mb-8 rounded-xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold text-white mb-1">
              Submit a deletion request
            </h2>
            <p className="text-sm text-white/50 mb-6">
              Enter the email address associated with your Powerclub Global
              account.
            </p>

            <form onSubmit={handleRequest} className="space-y-4">
              <div>
                <label
                  htmlFor="del-email"
                  className="block text-sm font-medium text-white/70 mb-1.5"
                >
                  Email address
                </label>
                <input
                  id="del-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#ae904c]/50 focus:border-[#ae904c]/50"
                />
              </div>

              {requestError && (
                <div className="flex items-center gap-2 rounded-lg bg-red-900/20 border border-red-700/30 p-3 text-sm text-red-400">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  {requestError}
                </div>
              )}

              <button
                type="submit"
                disabled={requestLoading}
                className="w-full rounded-lg bg-[#ae904c] px-4 py-2.5 text-sm font-semibold text-black hover:bg-[#c4a45a] disabled:opacity-50 transition-colors"
              >
                {requestLoading ? "Submitting…" : "Submit deletion request"}
              </button>
            </form>
          </section>
        ) : (
          <section className="mb-8 rounded-xl border border-green-700/30 bg-green-900/20 p-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <h2 className="text-base font-semibold text-white">
                  Request received
                </h2>
                <p className="mt-1 text-sm text-white/60">
                  {requestResult.message}
                </p>
                <div className="mt-3 flex items-center gap-2 flex-wrap">
                  <span className="text-sm text-white/50">
                    Confirmation code:
                  </span>
                  <span className="font-mono text-sm font-bold text-[#ae904c]">
                    {requestResult.confirmation_code}
                  </span>
                </div>
                <p className="mt-1 text-xs text-white/40">
                  Save this code to check your request status at any time.
                </p>
                <button
                  onClick={() => {
                    setLookupCode(requestResult.confirmation_code);
                    fetchStatus(requestResult.confirmation_code);
                  }}
                  className="mt-3 text-sm font-medium text-[#ae904c] hover:underline"
                >
                  Check status →
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Status lookup */}
        <section className="mb-12 rounded-xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold text-white mb-1">
            Check request status
          </h2>
          <p className="text-sm text-white/50 mb-5">
            Already submitted? Enter your confirmation code to check the status.
          </p>

          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={lookupCode}
              onChange={(e) => setLookupCode(e.target.value.toUpperCase())}
              placeholder="Confirmation code"
              className="flex-1 rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm font-mono text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#ae904c]/50 focus:border-[#ae904c]/50"
            />
            <button
              onClick={() => fetchStatus(lookupCode)}
              disabled={statusLoading || !lookupCode.trim()}
              className="rounded-lg border border-[#ae904c]/50 px-4 py-2.5 text-sm font-medium text-[#ae904c] hover:bg-[#ae904c]/10 disabled:opacity-40 transition-colors"
            >
              {statusLoading ? "Checking…" : "Check"}
            </button>
          </div>

          {statusError && (
            <div className="flex items-center gap-2 rounded-lg bg-red-900/20 border border-red-700/30 p-3 text-sm text-red-400">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              {statusError}
            </div>
          )}

          {statusResult && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/50">Status</span>
                <StatusBadge status={statusResult.status} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/50">Confirmation code</span>
                <span className="font-mono text-sm font-medium text-[#ae904c]">
                  {statusResult.confirmation_code}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/50">Submitted</span>
                <span className="text-sm text-white/80">
                  {new Date(statusResult.created_at).toLocaleDateString(
                    "en-US",
                    { year: "numeric", month: "long", day: "numeric" }
                  )}
                </span>
              </div>
              {statusResult.completed_at && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/50">Completed</span>
                  <span className="text-sm text-white/80">
                    {new Date(statusResult.completed_at).toLocaleDateString(
                      "en-US",
                      { year: "numeric", month: "long", day: "numeric" }
                    )}
                  </span>
                </div>
              )}
            </div>
          )}
        </section>

        {/* Contact */}
        <p className="text-center text-sm text-white/40">
          Questions about your data?{" "}
          <a
            href="mailto:privacy@powerclubglobal.com"
            className="text-[#ae904c] hover:underline"
          >
            privacy@powerclubglobal.com
          </a>
        </p>
      </main>

      <Footer />
    </div>
  );
}

export default function DataDeletionPage() {
  return (
    <Suspense>
      <DataDeletionContent />
    </Suspense>
  );
}
