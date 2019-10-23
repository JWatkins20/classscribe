from Crypto import Random
from Crypto.Cipher import AES
import base64

BLOCK_SIZE=16

def encrypt(message, passphrase):
    IV = Random.new().read(BLOCK_SIZE)
    aes = AES.new(passphrase, AES.MODE_CFB, IV)
    return base64.b64encode(aes.encrypt(message))

def decrypt(encrypted, passphrase):
    IV = Random.new().read(BLOCK_SIZE)
    aes = AES.new(passphrase, AES.MODE_CFB, IV)
    return aes.decrypt(base64.b64decode(encrypted))

salt_bytes = 16
salt = Random.new().read(salt_bytes)

print ("ID Number: 123456")
print ("Encrypted ID: ",encrypt("123456",salt))
