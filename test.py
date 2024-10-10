import sys
import PyPDF2

# Check if the user provided a PDF filename as an argument
if len(sys.argv) > 1:
    pdfFilename = sys.argv[1]
else:
    print('User must specify a PDF file.')
    exit()

# Open the PDF file in binary read mode
try:
    with open(pdfFilename, 'rb') as pdfFile:
        pdfReader = PyPDF2.PdfReader(pdfFile)
        
        # Add the contents of the dictionary file to a list
        dictionaryList = []
        with open('pass.txt') as dictionaryFile:
            for word in dictionaryFile.readlines():
                dictionaryList.append(word.strip())  # strip to remove newline characters
        
        # Try each password from the dictionary
        print('Trying passwords...')
        for word in dictionaryList:
            password = str(word)
            print(f'Trying {password}')
            
            # Try to decrypt using the current password
            try:
                if pdfReader.decrypt(password):
                    print(f'Password found: {password}')
                    exit()
            except Exception as e:
                print(f'Error trying password {password}: {str(e)}')
                continue

        print('Password not found.')

except FileNotFoundError:
    print(f'The file {pdfFilename} was not found.')