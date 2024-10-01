import spacy

nlp = spacy.load('en_core_web_sm')

def analyze_cv(cv_path):
    try:
        with open(cv_path, 'r') as file:
            text = file.read()

        doc = nlp(text)
        technologies = [ent.text for ent in doc.ents if ent.label_ == 'TECH']
        experience = sum([int(ent.text) for ent in doc.ents if ent.label_ == 'EXPERIENCE'])

        return {
            'technologies': technologies,
            'experience': experience
        }
    except Exception as e:
        print(f"Error analyzing CV: {e}")
        return {
            'technologies': [],
            'experience': 0
        }