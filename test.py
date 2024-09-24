from twilio.rest import Client

account_sid = 'AC6e6d1b37d5ec9f1971d690111114fadd'
auth_token = 'f567c739e4cb6e6a733d72945ad120ef'
client = Client(account_sid, auth_token)

verification = client.verify \
    .v2 \
    .services('VA38ebf3571082d57fb30e5636e3f42b25') \
    .verifications \
    .create(to='+917096535156', channel='sms')

print(verification.sid)