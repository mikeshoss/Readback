# Published FOI documents

Drop redacted PDFs here, then add an entry to the matching request in
`src/data/foi.json`:

    "documents": [
      {
        "kind": "form",
        "label": "Request form as mailed to Waterloo Regional Police",
        "file": "/foi/waterloo-request-form.pdf",
        "date": "2026-09-05",
        "note": "Signature and home address removed.",
        "redacted": true
      }
    ]

`kind` is one of: form, acknowledgment, response, records, fee, correspondence.
`file` is the public path, so a file saved here as `waterloo-request-form.pdf`
is referenced as `/foi/waterloo-request-form.pdf`.
`redacted` defaults to true; set it to false only for a document published
whole, and only when that is actually true.

File size and the "PDF" label are read from the file at build time, so the
page cannot advertise a document that is not there.

## Before you upload

Redaction must be destructive. Drawing a black box in Preview or Acrobat
leaves the text underneath selectable and copyable — the classic way redacted
documents leak. Flatten the file after redacting, or export it to images and
back to PDF, then open the result and try to select the covered text.

Also check the PDF's metadata (Author, Title) — it often carries a real name
or a local file path even when the visible page is clean.
