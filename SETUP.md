# Setting up the feedback form

The guide has a **Give feedback** button. Until you do the steps below, that
button still works — it just hands the reader their note to email instead of
filing it for you. Nothing here is urgent, and nothing breaks if you stop
halfway.

You need a Google account. Budget about ten minutes.

---

## 1. Make the Sheet

1. Go to <https://sheets.new> — a blank spreadsheet opens.
2. Name it something you'll recognise, e.g. **How Decisions Move — feedback**.
3. In the **first row**, type these four headings, one per cell, starting in A1:

   | A | B | C | D |
   |---|---|---|---|
   | Timestamp | Name | Feedback | Context |

   Spelling and order matter — the script writes columns in this order.

## 2. Add the script

4. In that same Sheet: **Extensions → Apps Script**. A code editor opens in a
   new tab, showing a nearly-empty file with `function myFunction() {}` in it.
5. Select all of that placeholder code and delete it.
6. Open `feedback-endpoint.gs` from this repo, copy **all** of it, and paste it in.
7. Click the save icon (or Ctrl/Cmd-S).

## 3. Deploy it

8. Top right: **Deploy → New deployment**.
9. Click the gear icon next to "Select type" and choose **Web app**.
10. Fill in the three fields:
    - **Description** — anything, e.g. `feedback v1`
    - **Execute as** — **Me** (your account writes the rows)
    - **Who has access** — **Anyone**

    "Anyone" is required. The guide is a plain web page with no login, so the
    browser arrives as a stranger. It means anyone who has the endpoint URL can
    append a row — which is why the script caps field lengths and ignores bots.
    It does **not** give anyone access to the Sheet itself.
11. Click **Deploy**.
12. Google asks you to authorize. Click **Authorize access**, pick your account,
    and when you see **"Google hasn't verified this app"**, click **Advanced →
    Go to (your project name)**. That warning is normal for a script you wrote
    yourself. Then **Allow**.
13. Copy the **Web app URL**. It looks like:

    ```
    https://script.google.com/macros/s/AKfycb.....................­/exec
    ```

## 4. Point the guide at it

14. Open `ews-pathways-data.js` in this repo.
15. Near the top, find:

    ```js
    const CONFIG = {
      feedbackEndpoint: null,
    ```

16. Paste your URL in, in quotes:

    ```js
    const CONFIG = {
      feedbackEndpoint: "https://script.google.com/macros/s/AKfycb.../exec",
    ```

17. Save, then commit and push:

    ```
    git add ews-pathways-data.js
    git commit -m "Point feedback form at the Sheet"
    git push
    ```

    GitHub rebuilds and redeploys the page on its own — give it about a minute,
    then hard-reload the site and send yourself a test note.

While you're in `CONFIG`, you can also set `feedbackEmail` to a real address.
That address is only used if the endpoint fails, as a way out for the reader.

---

## Testing it with curl

To check the endpoint without going through the page, paste this into a
terminal, with your own URL:

```
curl -L -X POST "https://script.google.com/macros/s/AKfycb.../exec" \
  -d "name=Test" \
  -d "feedback=This is a test note" \
  -d "context=curl test"
```

`-L` matters: Apps Script answers with a redirect, and without it curl stops
there and prints nothing useful.

You should get back:

```
{"ok":true}
```

...and a new row should appear in the Sheet within a second or two. To check
the bot filter, add `-d "website=spam"` — you'll still get `{"ok":true}`, but
**no row should be written**. That silence is deliberate.

## Editing the script later

If you change `feedback-endpoint.gs`, saving is not enough — the deployed
version is a snapshot, and the live URL keeps serving the old code until you
publish a new one.

1. Paste your edits into the Apps Script editor and save.
2. **Deploy → Manage deployments**.
3. Click the pencil (edit) icon on the existing deployment.
4. Under **Version**, choose **New version**.
5. Click **Deploy**.

Doing it this way keeps the **same URL**, so nothing needs changing in
`ews-pathways-data.js`. If you instead use *New deployment*, you get a
different URL and must repeat step 4 above.

## If notes stop arriving

- Send a test through the form. If you get **"That didn't send"**, the endpoint
  is unreachable — check the deployment still exists under *Manage deployments*.
- If you get the thank-you but no row appears, the endpoint is reachable but the
  script is failing. Open the Apps Script editor and check **Executions** in the
  left sidebar for the error.
- The page cannot tell you which of these happened. It only knows whether the
  request left the browser — Google's reply comes from a different domain and
  the page isn't allowed to read it.
