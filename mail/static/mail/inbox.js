document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => all_box());
  document.querySelector('#sent').addEventListener('click', () => send_box());
  document.querySelector('#archived').addEventListener('click', () => archive_box());
  document.querySelector('#compose').addEventListener('click', compose_email);
  document.querySelector('#compose-form').addEventListener('submit', send_mail);
  // By default, load the inbox
  all_box();
});

function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}

function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;
}


function send_mail(e) {
  e.preventDefault();

  fetch('/emails', {
  method: 'POST',
  body: JSON.stringify({
      recipients: document.getElementById('compose-recipients').value,
      subject: document.getElementById('compose-subject').value,
      body: document.getElementById('compose-body').value
  })
  })
  .then(response => response.json())
  .then(result => {
    if (result.message) {
      send_box();
    } else {
      const message = document.getElementById('form-message');
      message.style.display = 'block';
      message.innerHTML = result.error;
      console.log(result)
    }
  });

}


function send_box() {
  // load the box
  load_mailbox('sent');

  // load the emails inside the box
  fetch('/emails/sent')
  .then(response => response.json())
  .then(emails => {
      emails.forEach((e) => render_email(e))
  });
}

function archive_box() {
  // load the box
  load_mailbox('archive');

  // load the emails inside the box
  fetch('/emails/archive')
  .then(response => response.json())
  .then(emails => {
    emails.forEach((e) => render_email(e))
  });
}

function all_box() {
  // load the box
  load_mailbox('inbox');

  // load the emails inside the box
  fetch('/emails/inbox')
  .then(response => response.json())
  .then(emails => {
    emails.forEach((e) => render_email(e))
  });
}


function render_email(email) {
  const card = document.createElement('div');

  card.className = 'card';
  if (email.read)
    card.classList.add('read');

  card.innerHTML = `<span style="text-align: left">Sender: ${email.sender}</span>` +
                    `<span style="text-align: left">Subject: ${email.subject}</span>` +
                    `<span style="text-align: right">${email.timestamp}</span>`;

  document.querySelector('#emails-view').append(card);
}