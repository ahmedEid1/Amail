- Send Mail: 
    - When a user submits the email composition form, add JavaScript code to actually send the email.
        - You’ll likely want to make a POST request to /emails, passing in values for recipients, subject, and body.
    - Once the email has been sent, load the user’s sent mailbox.

---
- Mailbox: When a user visits their Inbox, Sent mailbox, or Archive, load the appropriate mailbox.
    - You’ll likely want to make a GET request to /emails/<mailbox> to request the emails for a particular mailbox.
    - When a mailbox is visited, the application should first query the API for the latest emails in that mailbox.
    - Each email should then be rendered in its own box (e.g. as a <div> with a border) that displays who the email is from, what the subject line is, and the timestamp of the email.
    - If the email is unread, it should appear with a white background. If the email has been read, it should appear with a gray background.
---

- View Email: 
  - When a user clicks on an email, the user should be taken to a view where they see the content of that email.
  - Your application should show the email’s sender, recipients, subject, timestamp, and body.
  - Once the email has been clicked on, you should mark the email as read. Recall that you can send a PUT request to /emails/<email_id> to update whether an email is read or not.
