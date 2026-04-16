import React, { useEffect, useState } from "react";

const BASE_URL = "https://teaching-hood-backend.netcraftglobal.com/api";

// Map method codes to readable labels
const METHOD_LABELS = {
  card: "Card",
  upi: "UPI",
  netbanking: "Net Banking",
  wallet: "Wallet",
  emi: "EMI",
};

const STATUS_LABELS = {
  captured: "Paid",
  authorized: "Authorized",
  created: "Pending",
  failed: "Failed",
};

// ─── Skeleton loader ──────────────────────────────────────────────────────────
const Skeleton = ({ className = "" }) => (
  <div className={`animate-pulse bg-gray-200 rounded-lg ${className}`} />
);

// ─── Icon components ──────────────────────────────────────────────────────────
const CheckIcon = () => (
  <svg viewBox="0 0 52 52" className="w-full h-full" fill="none">
    <circle cx="26" cy="26" r="25" stroke="currentColor" strokeWidth="2" fill="none" />
    <path
      d="M14 26l8 8 16-16"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const FailIcon = () => (
  <svg viewBox="0 0 52 52" className="w-full h-full" fill="none">
    <circle cx="26" cy="26" r="25" stroke="currentColor" strokeWidth="2" fill="none" />
    <path d="M18 18l16 16M34 18L18 34" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

// ─── Detail Row ───────────────────────────────────────────────────────────────
const DetailRow = ({ label, value, mono = false }) => (
  <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
    <span className="text-sm text-gray-500">{label}</span>
    <span className={`text-sm font-semibold text-gray-800 ${mono ? "font-mono text-xs" : ""}`}>
      {value || "—"}
    </span>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
const PaymentSuccessPage = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [urlParams, setUrlParams] = useState({});

  useEffect(() => {
    // Parse all URL params
    const params = Object.fromEntries(new URLSearchParams(window.location.search));
    setUrlParams(params);

    const paymentId = params.razorpay_payment_id;

    if (!paymentId) {
      setError("Payment ID not found in URL. Please contact support.");
      setLoading(false);
      return;
    }

    verifyPayment(paymentId);
  }, []);

  const verifyPayment = async (paymentId) => {
    try {
      const res = await fetch(`${BASE_URL}/payment/success`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ razorpay_payment_id: paymentId }),
      });

      const json = await res.json();

      if (!res.ok || !json.status) {
        throw new Error(json.message || "Payment verification failed.");
      }

      setData(json.data);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const formatAmount = (amount, currency = "INR") => {
    if (!amount) return "—";
    const num = parseFloat(amount);
    // Razorpay sends amount in paise
    const inRupees = num > 1000 ? num / 100 : num;
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: currency || "INR",
      minimumFractionDigits: 0,
    }).format(inRupees);
  };

  const isPaid = data?.status === "captured" || data?.status === "authorized";

  // ── Loading State ────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md">
          <div className="flex flex-col items-center mb-8">
            <Skeleton className="w-20 h-20 rounded-full mb-4" />
            <Skeleton className="h-6 w-40 mb-2" />
            <Skeleton className="h-4 w-56" />
          </div>
          <Skeleton className="h-24 w-full mb-6 rounded-2xl" />
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex justify-between items-center py-1">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-28" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── Error State ──────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md text-center">
          <div className="w-20 h-20 mx-auto text-red-400 mb-4">
            <FailIcon />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Verification Failed</h2>
          <p className="text-sm text-gray-500 mb-6">{error}</p>
          <a
            href="/"
            className="inline-block w-full py-3 px-6 bg-gray-900 text-white rounded-xl font-semibold text-sm hover:bg-gray-700 transition"
          >
            Go Back to Home
          </a>
        </div>
      </div>
    );
  }

  // ── Success State ─────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center px-4 py-10">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md overflow-hidden">

        {/* Top colored band */}
        <div className={`h-2 w-full ${isPaid ? "bg-gradient-to-r from-green-400 to-emerald-500" : "bg-gradient-to-r from-yellow-400 to-orange-400"}`} />

        <div className="p-8">

          {/* Icon + Status */}
          <div className="flex flex-col items-center mb-8">
            <div className={`w-20 h-20 mb-4 ${isPaid ? "text-green-500" : "text-yellow-500"}`}>
              {isPaid ? <CheckIcon /> : (
                <svg viewBox="0 0 52 52" fill="none" className="w-full h-full">
                  <circle cx="26" cy="26" r="25" stroke="currentColor" strokeWidth="2" />
                  <path d="M26 16v12M26 34v2" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
              )}
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900 mb-1">
              {isPaid ? "Payment Successful!" : "Payment " + (STATUS_LABELS[data?.status] || data?.status)}
            </h1>
            <p className="text-sm text-gray-400">
              {isPaid
                ? "Your subscription has been activated."
                : "Your payment is being processed."}
            </p>
          </div>

          {/* Amount highlight */}
          <div className={`rounded-2xl px-6 py-5 mb-6 text-center ${isPaid ? "bg-green-50 border border-green-100" : "bg-yellow-50 border border-yellow-100"}`}>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Amount Paid</p>
            <p className={`text-4xl font-black ${isPaid ? "text-green-600" : "text-yellow-600"}`}>
              {formatAmount(data?.amount, data?.currency)}
            </p>
            {data?.currency && (
              <p className="text-xs text-gray-400 mt-1 uppercase">{data.currency}</p>
            )}
          </div>

          {/* Details */}
          <div className="rounded-2xl border border-gray-100 bg-gray-50 px-5 py-1 mb-6">
            <DetailRow label="Payment ID" value={data?.payment_id} mono />
            <DetailRow
              label="Status"
              value={
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                  isPaid ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                }`}>
                  {STATUS_LABELS[data?.status] || data?.status}
                </span>
              }
            />
            <DetailRow
              label="Payment Method"
              value={METHOD_LABELS[data?.method] || data?.method}
            />
            {data?.card_last && (
              <DetailRow label="Card ending" value={`•••• ${data.card_last}`} />
            )}
          </div>

          {/* Razorpay link params (link_id if present) */}
          {urlParams.razorpay_payment_link_id && (
            <div className="rounded-2xl border border-gray-100 bg-gray-50 px-5 py-1 mb-6">
              <DetailRow label="Link ID" value={urlParams.razorpay_payment_link_id} mono />
              {urlParams.razorpay_payment_link_status && (
                <DetailRow label="Link Status" value={urlParams.razorpay_payment_link_status} />
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <a
              href="/dashboard"
              className="w-full py-3.5 px-6 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-bold text-sm text-center transition flex items-center justify-center gap-2"
            >
              Go to Dashboard
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <a
              href="/"
              className="w-full py-3 px-6 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold text-sm text-center transition"
            >
              Back to Home
            </a>
          </div>

          {/* Support note */}
          <p className="text-center text-xs text-gray-400 mt-5">
            Koi problem?{" "}
            <a href="mailto:support@teachinghood.com" className="text-blue-500 font-semibold hover:underline">
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;