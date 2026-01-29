<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Query</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f6f8; font-family: Arial, Helvetica, sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0" style="padding:20px;">
        <tr>
            <td align="center">

                <table width="600" cellpadding="0" cellspacing="0"
                       style="background:#ffffff; border-radius:6px; padding:24px;">

                    <tr>
                        <td>
                            <h2 style="margin-top:0; color:#333;">
                                New Query Received
                            </h2>

                            <p style="color:#555; font-size:14px;">
                                You have received a new message through the website.
                            </p>

                            <hr style="border:none; border-top:1px solid #e5e5e5; margin:20px 0;">

                            <p style="font-size:14px; color:#333;">
                                <strong>Name:</strong> {{ $data['name'] }}
                            </p>

                            <p style="font-size:14px; color:#333;">
                                <strong>Email:</strong> {{ $data['email'] }}
                            </p>
                            <hr style="border:none; border-top:1px solid #e5e5e5; margin:20px 0;">

                            <p style="font-size:14px; color:#333; line-height:1.6;">
                                {{ $data['message'] }}
                            </p>

                            <br>

                            <p style="font-size:12px; color:#999;">
                                This message was sent from the website contact form.
                            </p>
                        </td>
                    </tr>

                </table>

            </td>
        </tr>
    </table>

</body>
</html>
