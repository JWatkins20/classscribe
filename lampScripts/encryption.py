from cryptography.fernet import Fernet

def encryptID(idNumber):
	# hide this line key= line in published source code
	key = "BrefO7pJTG2SRyg0PfaOCrz63vZBffGq9Iw-ftNmxFo="
	f = Fernet(key)
	encrypt_value = f.encrypt(str(idNumber))
	return (encrypt_value)

