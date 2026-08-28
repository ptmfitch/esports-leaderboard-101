"use client";
import { useState } from "react";

const MODAL_ID = "report_issue_modal";

type Submitted = { agentUrl: string };

export default function ReportIssueButton() {
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<Submitted | null>(null);

  const dialog = () =>
    document.getElementById(MODAL_ID) as HTMLDialogElement | null;

  const open = () => {
    setText("");
    setError(null);
    setSubmitted(null);
    dialog()?.showModal();
  };

  const close = () => dialog()?.close();

  const submit = async () => {
    setSending(true);
    setError(null);
    try {
      const res = await fetch("/api/report-issue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, path: window.location.pathname }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Something went wrong");
        return;
      }
      setSubmitted({ agentUrl: json.agentUrl });
    } catch {
      setError("Could not reach the server");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <button className="btn btn-sm btn-outline mx-2" onClick={open}>
        Report issue
      </button>
      <dialog id={MODAL_ID} className="modal">
        <div className="modal-box">
          {submitted ? (
            <>
              <h3 className="font-bold text-lg mb-2">Report submitted</h3>
              <p className="py-2">
                An agent is checking Jira for duplicates and will file a bug in
                the ELD project if this is new.
              </p>
              <a
                className="link link-primary"
                href={submitted.agentUrl}
                target="_blank"
                rel="noreferrer"
              >
                Follow the agent
              </a>
              <div className="modal-action">
                <button
                  type="button"
                  className="btn btn-primary mx-1"
                  onClick={close}
                >
                  Done
                </button>
              </div>
            </>
          ) : (
            <>
              <h3 className="font-bold text-lg mb-2">Report an issue</h3>
              <p className="text-sm opacity-60 mb-2">
                Describe what went wrong. We check for an existing ticket before
                raising a new one.
              </p>
              <textarea
                className="textarea textarea-bordered w-full h-32"
                placeholder="What happened, and how can we reproduce it?"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <div className="modal-action">
                <button
                  type="button"
                  className="btn btn-secondary mx-1"
                  onClick={close}
                  disabled={sending}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary mx-1"
                  onClick={submit}
                  disabled={sending || text.trim().length === 0}
                >
                  {sending && <span className="loading loading-spinner" />}
                  Submit
                </button>
              </div>
              {error != null && (
                <div className="alert alert-error mt-4">{error}</div>
              )}
            </>
          )}
        </div>
      </dialog>
    </>
  );
}
