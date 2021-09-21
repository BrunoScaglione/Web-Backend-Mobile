from twilio.rest import Client

client = Client("AC3cf05e958bdc5c8bfd5baa701c8ced7e", "ac13d4a7d5253d355a5227080cfb0321")

#python is sycronus (unlike javascript), so we can simply iiterate
""" for msg in client.messages.list():
    print(msg.body) """

# ai roda no terminal python explore.py

#agora vamos mandar uma msg
# msg = client.messages.create(
#     to="+5515991409525",
#     from_="+18647540817", # remember that from is a reserved wrd in python thats because there is an underscore after in these usages. 
#     body="Hello from Python",
# )

# print(f"Created a new message: {msg.sid}")

#agora vamos deletar as mensagens

for msg in client.messages.list():
    print(f"Deleting {msg.body}")
    msg.delete()