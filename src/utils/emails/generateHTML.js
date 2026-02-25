export const verifyEmailTemplate = (otp, email) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Epic Quests - Verify Your Account</title>
  <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Outfit:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #2A2733;
      font-family: 'Outfit', sans-serif;
      color: #F5EFE6;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #343140;
      border: 4px solid #4A4658;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    }
    .header {
      background: linear-gradient(135deg, #8E6BA8 0%, #5C3D74 100%);
      padding: 30px 20px;
      text-align: center;
      border-bottom: 4px solid #4A4658;
    }
    .header h1 {
      margin: 0;
      color: #E7C9A5;
      font-family: 'Press Start 2P', cursive;
      font-size: 20px;
      text-shadow: 2px 2px 0px #2B183D;
      letter-spacing: 1px;
    }
    .content {
      padding: 40px 30px;
      text-align: center;
    }
    .content h2 {
      color: #F5EFE6;
      font-size: 28px;
      margin-top: 0;
      margin-bottom: 20px;
      font-weight: 700;
    }
    .content p {
      color: #D6CFC5;
      font-size: 16px;
      line-height: 1.6;
      margin-bottom: 30px;
    }
    .otp-container {
      background-color: #2A2733;
      border: 2px dashed #E7C9A5;
      border-radius: 12px;
      padding: 20px;
      display: inline-block;
      margin-bottom: 30px;
    }
    .otp-code {
      font-family: 'Press Start 2P', monospace;
      font-size: 32px;
      color: #E7C9A5;
      letter-spacing: 10px;
      margin: 0;
      text-shadow: 0 0 10px rgba(231, 201, 165, 0.5);
    }
    .footer {
      background-color: #2B183D;
      padding: 20px;
      text-align: center;
      border-top: 2px solid #4A4658;
    }
    .footer p {
      color: #9F78B8;
      font-size: 12px;
      margin: 0;
    }
    .highlight {
      color: #E7C9A5;
      font-weight: 600;
    }
  </style>
</head>
<body>
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #2A2733;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <div class="container">
          <!-- Header -->
          <div class="header">
            <h1>EPIC QUESTS</h1>
          </div>
          
          <!-- Content -->
          <div class="content">
            <h2>A New Hero Rises!</h2>
            <p>Greetings, adventurer <span class="highlight">${email}</span>.<br>Welcome to the realm of Epic Quests. To begin your journey and secure your hero's data, you must unlock this portal using the magic code below.</p>
            
            <div class="otp-container">
              <p class="otp-code" style="margin-left: 10px;">${otp}</p>
            </div>
            
            <p>Enter this 6-digit code in the app to forge your destiny. This code will expire soon!<br>If you did not initiate this quest, ignore this scroll.</p>
          </div>
          
          <!-- Footer -->
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Epic Quests. May your streaks be long and your XP plentiful.</p>
          </div>
        </div>
      </td>
    </tr>
  </table>
</body>
</html>
`;

export const resetPasswordTemplate = (code, email) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Epic Quests - Reset Your Password</title>
  <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Outfit:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #2A2733;
      font-family: 'Outfit', sans-serif;
      color: #F5EFE6;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #343140;
      border: 4px solid #4A4658;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    }
    .header {
      background: linear-gradient(135deg, #8E6BA8 0%, #5C3D74 100%);
      padding: 30px 20px;
      text-align: center;
      border-bottom: 4px solid #4A4658;
    }
    .header h1 {
      margin: 0;
      color: #E7C9A5;
      font-family: 'Press Start 2P', cursive;
      font-size: 20px;
      text-shadow: 2px 2px 0px #2B183D;
      letter-spacing: 1px;
    }
    .content {
      padding: 40px 30px;
      text-align: center;
    }
    .content h2 {
      color: #F5EFE6;
      font-size: 28px;
      margin-top: 0;
      margin-bottom: 20px;
      font-weight: 700;
    }
    .content p {
      color: #D6CFC5;
      font-size: 16px;
      line-height: 1.6;
      margin-bottom: 30px;
    }
    .otp-container {
      background-color: #2A2733;
      border: 2px dashed #E7C9A5;
      border-radius: 12px;
      padding: 20px;
      display: inline-block;
      margin-bottom: 30px;
    }
    .otp-code {
      font-family: 'Press Start 2P', monospace;
      font-size: 32px;
      color: #E7C9A5;
      letter-spacing: 10px;
      margin: 0;
      text-shadow: 0 0 10px rgba(231, 201, 165, 0.5);
    }
    .footer {
      background-color: #2B183D;
      padding: 20px;
      text-align: center;
      border-top: 2px solid #4A4658;
    }
    .footer p {
      color: #9F78B8;
      font-size: 12px;
      margin: 0;
    }
    .highlight {
      color: #E7C9A5;
      font-weight: 600;
    }
  </style>
</head>
<body>
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #2A2733;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <div class="container">
          <!-- Header -->
          <div class="header">
            <h1>EPIC QUESTS</h1>
          </div>
          
          <!-- Content -->
          <div class="content">
            <h2>Reset Your Password</h2>
            <p>Greetings, adventurer <span class="highlight">${email}</span>.<br>We received a request to reset the password for your Epic Quests account. To proceed, please use the magic code below.</p>
            
            <div class="otp-container">
              <p class="otp-code" style="margin-left: 10px;">${code}</p>
            </div>
            
            <p>Enter this 6-digit code in the app to verify your identity and set a new password.<br>If you did not initiate this request, please ignore this scroll.</p>
          </div>
          
          <!-- Footer -->
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Epic Quests. May your password be strong and your quests epic.</p>
          </div>
        </div>
      </td>
    </tr>
  </table>
</body>
</html>
`;
