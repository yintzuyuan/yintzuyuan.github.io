---
layout: default.njk
title: 聯絡
description: 聯繫殷慈遠 - 字體設計與創意合作
---

# 📮 聯絡

無論是關於字體設計的疑問，還是創意合作的提案，我都很樂意傾聽您的想法。

## 📨 發送訊息

<form id="contact-form" onsubmit="return sendEmail();">
  <label>
    姓名
    <input type="text" id="name" name="name" placeholder="您的姓名" required>
  </label>

  <label>
    訊息
    <textarea id="message" name="message" placeholder="想說的話..." required></textarea>
  </label>

  <button type="submit">發送訊息</button>
</form>

<script>
function sendEmail() {
  const name = document.getElementById('name').value;
  const message = document.getElementById('message').value;

  const mailBody = `姓名: ${name}\n\n訊息:\n${message}`;
  window.location.href = `mailto:info@erikyin.net?subject=來自網站的訊息&body=${encodeURIComponent(mailBody)}`;

  return false;
}
</script>

偏好傳統方式？您也可以直接發送郵件至 [info@erikyin.net](mailto:info@erikyin.net)

---

期待與您一同探索文字設計的無限可能。也許您的一個想法，就是下一個精彩項目的開始。
