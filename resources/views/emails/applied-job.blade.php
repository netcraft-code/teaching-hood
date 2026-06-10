<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Teacher Profile Mailer</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f4f4f4;padding:30px 0;">
<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0" border="0" style="background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">

    <!-- Header -->
    <tr>
        <td style="background:#0d6efd;padding:20px;text-align:center;color:#ffffff;font-size:24px;font-weight:bold;">
            Teacher Profile
        </td>
    </tr>

    <!-- Profile Section -->
    <tr>
        <td style="padding:25px;">
            <table width="100%">
                <tr>
                    <td width="90" valign="top">
                        <img src="https://teaching-hood-backend.netcraftglobal.com/storage/{{ $job->applied_job->user->avatar_url }}" width="80" height="80" style="border-radius:50%;border:3px solid #0d6efd;">
                    </td>
                    <td valign="top">
                        <div style="font-size:26px;font-weight:bold;color:#0d6efd;">{{ $job->applied->user->first_name }} {{ $job->applied->user->last_name }}</div>
                        <div style="font-size:16px;color:#555;">{{ $job->applied->user->position }}</div>
                        <div style="margin-top:10px;font-size:14px;color:#444;">📍 {{ $job->applied->user->addresses->city }}, {{ $job->applied->user->addresses->state }}</div>
                        <div style="margin-top:6px;font-size:14px;color:#444;">{{ $job->applied_job->user->total_experience ? "💼 ".$job->applied->user->total_experience : '' }} Years</div>
                        <div style="margin-top:6px;font-size:14px;color:#444;">{{ $job->applied_job->user->additional_info->notice_period ? "🔔 ".$job->applied_job->user->additional_info->notice_period : '' }} </div>
                    </td>
                </tr>
            </table>

            <!-- Skills -->
            <!--<table width="100%" style="margin-top:20px;">-->
            <!--    <tr>-->
            <!--        <td>-->
            <!--            <span style="display:inline-block;background:#d9ecff;color:#0d6efd;padding:8px 18px;border-radius:20px;font-size:14px;font-weight:bold;margin-right:10px;">{{ $job->applied->user->grade }}</span>-->
            <!--            <span style="display:inline-block;background:#d9ecff;color:#0d6efd;padding:8px 18px;border-radius:20px;font-size:14px;font-weight:bold;">{{ $job->applied->user->subject }}</span>-->
            <!--        </td>-->
            <!--    </tr>-->
            <!--</table>-->

            <!-- About -->
            <div style="margin-top:25px;border-top:1px solid #eee;padding-top:20px;">
                <div style="font-size:20px;font-weight:bold;color:#222;margin-bottom:10px;">About Me</div>
                <div style="font-size:15px;color:#555;line-height:1.6;">
                    {{ $job->applied->user->additional_info->about_us ?? '' }}
                </div>
            </div>

            <!-- Achievements -->
            @php
                $achievements = array_filter(array_map('trim', explode(',', $job->applied->user->additional_info->achievement ?? '')));
            @endphp
            
            @if(count($achievements))
                <div style="margin-top:25px;">
                    <div style="font-size:20px;font-weight:bold;color:#222;margin-bottom:10px;">Achievements</div>
                    <ul style="padding-left:20px;color:#555;line-height:1.8;font-size:15px;margin:0;">
                        @foreach($achievements as $item)
                            <li>{{ $item }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif
            
            @php
                $certifications = array_filter(array_map('trim', explode(',', $job->applied->user->additional_info->certification ?? '')));
            @endphp
            
            @if(count($certifications))
                <div style="margin-top:25px;">
                    <div style="font-size:20px;font-weight:bold;color:#222;margin-bottom:10px;">Certifications</div>
                    <ul style="padding-left:20px;color:#555;line-height:1.8;font-size:15px;margin:0;">
                        @foreach($certifications as $item)
                            <li>{{ $item }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif

            <!-- Button -->
            <div style="text-align:center;margin-top:35px;">
                <a href="https://teachinghood.netcraftglobal.com/view-profile/{{ $job->applied->user->id }}" style="background:#0d6efd;color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:30px;font-size:16px;font-weight:bold;display:inline-block;">
                    View Profile
                </a>
            </div>

        </td>
    </tr>

    <!-- Footer -->
    <tr>
        <td style="background:#f8f8f8;padding:18px;text-align:center;font-size:13px;color:#777;">
            © 2026 Teachinghood. All rights reserved.
        </td>
    </tr>

</table>

</td>
</tr>
</table>

</body>
</html>