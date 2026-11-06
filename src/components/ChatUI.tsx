"use client";

import { useState } from "react";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import Link from "next/link";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function ChatUI() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [copied, setCopied] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");

  async function sendMessage() {
    if (!input.trim()) {
      return;
    }

    setError("");
    setIsSending(true);
    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ message: input })
    });

    const data = await res.json();

    if (!res.ok || !data?.reply) {
      setError("Unable to send prompt. Please try again.");
      setIsSending(false);
      return;
    }

    setResponse(data.reply);
    setIsSending(false);
  }

  function copyResponse() {
    if (!response) return;
    navigator.clipboard.writeText(response);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  return (
    <>
      <div style={{ width: '100%', maxWidth: 760, margin: '0 auto' }}>
      <div style={{
        width: '100%',
        background: 'rgba(255, 255, 255, 0.10)',
        borderRadius: 32,
        border: '1px solid rgba(255, 255, 255, 0.18)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        padding: 32,
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, textAlign: 'center' }}>
          <div className="logoContainer">
            <Image src="/eke.png" alt="Bi logo" fill style={{ objectFit: 'contain' }} />
          </div>
          <div>
            <p style={{ margin: '16px auto 0', maxWidth: 560, color: '#4b5563', lineHeight: 1.6, fontFamily: montserrat.style.fontFamily, fontWeight: 500 }}>
              Visit <span><Link href="https://eke-perfect.vercel.app/">https://eke-perfect.vercel.app/</Link></span> for more info.
            </p>
          </div>
        </div>

        <div style={{ marginTop: 30, display: 'flex', flexDirection: 'column', gap: 18 }}>
         <textarea
  value={input}
  onChange={e => setInput(e.target.value)}
  placeholder="Type your prompt eg. (list my services etc.)"
  rows={5}
  style={{
    width: '100%',
    borderRadius: 24,
    border: '1px solid #d1d5db',
    padding: '18px 20px',
    fontSize: 16,
    lineHeight: 1.75,
    resize: 'vertical',
    outline: 'none',
    background: '#ffffff',
    color: '#000000',
    caretColor: '#000000',
    fontFamily: montserrat.style.fontFamily,
  }}
  className="chat-input"
/>
          <button
            onClick={sendMessage}
            disabled={isSending}
            style={{
              width: '100%',
              borderRadius: 24,
              border: 'none',
              padding: '16px 22px',
              fontSize: 16,
              fontWeight: 700,
              color: '#ffffff',
              background: '#4fb3ee',
              cursor: isSending ? 'not-allowed' : 'pointer',
              opacity: isSending ? 0.8 : 1,
              fontFamily: montserrat.style.fontFamily,
            }}
          >
            {isSending ? 'Sending...' : 'Send'}
          </button>
          {error ? (
            <div style={{ color: '#b91c1c', fontSize: 14, fontFamily: montserrat.style.fontFamily }}>{error}</div>
          ) : null}

          {response ? (
            <div style={{
              width: '100%',
              borderRadius: 24,
              border: '1px solid #e5e7eb',
              background: '#ffffff',
              padding: 18,
            }}>
              <div style={{ whiteSpace: 'pre-wrap', color: '#111827', lineHeight: 1.75, fontFamily: montserrat.style.fontFamily }}>
                {response}
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12 }}>
                <button
                  onClick={copyResponse}
                  style={{
                    borderRadius: 18,
                    border: 'none',
                    padding: '10px 16px',
                    fontSize: 14,
                    fontWeight: 700,
                    color: '#111827',
                    background: '#f3f4f6',
                    cursor: 'pointer',
                    fontFamily: montserrat.style.fontFamily,
                  }}
                >
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      </div>
      <style jsx>{`
        .logoContainer {
          width: 440px;
          height: 140px;
          position: relative;
        }

        @media (max-width: 768px) {
          .logoContainer {
            width: 260px;
            height: 84px;
          }
        }
      `}</style>
    </>
  );
}
