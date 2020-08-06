console.log($);

url = window.location.href;
url = url.substr(0, url.lastIndexOf('/'))
accId = url.substr(url.lastIndexOf('/') + 1)

$.get(`/accounts/${accId}`).done((data) => {
  $('h3').text(`Hello ${data.session.username} here you can modify ${data.account.username}'s account`)

  $('input[name=username]').val(`${data.account.username}`);
  $('input[name=firstname]').val(`${data.account.owner.firstName}`);
  $('input[name=lastname]').val(`${data.account.owner.lastName}`);
  $('input[name=cpr]').val(`${data.account.owner.cpr}`);
  $('input[name=email]').val(`${data.account.owner.email}`);
});