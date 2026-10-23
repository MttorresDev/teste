// número do WhatsApp
var NUMERO = "5581998118079";

// Monta todos os links de WhatsApp com a mensagem de cada botão (data-msg).
document.querySelectorAll("a.wa").forEach(function (a) {
  var msg = a.dataset.msg || "Olá! Quero agendar uma conversa com a TwoTT Group.";
  a.href = "https://wa.me/" + NUMERO + "?text=" + encodeURIComponent(msg);
  a.target = "_blank";
  a.rel = "noopener";
});