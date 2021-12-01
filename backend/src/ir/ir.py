# Information Retrieval Library
import csv
import copy
import urllib.request
import codecs
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import string
import nltk
nltk.download('punkt')
nltk.download('wordnet')

url = 'https://raw.githubusercontent.com/c0mpiler/SouthParkData/master/All-seasons.csv'
stream = urllib.request.urlopen(url)
reader = csv.reader(codecs.iterdecode(stream, 'utf-8'))
data = {}
for row in reader:
    if row[0] != 'Season' or row[1] != 'Episode':
        if row[0] not in data:
            data[row[0]] = {}
        if row[1] not in data[row[0]]:
            data[row[0]][row[1]] = ''
        data[row[0]][row[1]] += row[3]

docs = []
ordering = []
for key, value in data.items():
    for k in value.keys():
        docs.append(data[key][k])
        ordering.append((int(key),int(k)))

lemmatizer = nltk.stem.WordNetLemmatizer()
def __cleantext(doc):
    return [lemmatizer.lemmatize(t) for t in nltk.word_tokenize(doc.translate(dict((ord(punc), None) for punc in string.punctuation)))]
vectorizer = TfidfVectorizer(tokenizer=__cleantext)

def search(query):
    """
    Searches for an episode by some query.

    Returns a list of possible matches.
    """
    docs.append(query)
    vectors = vectorizer.fit_transform(docs)
    vector = cosine_similarity(vectors[-1], vectors)
    index = vector.argsort()[0][-2:-7:-1] # top 5 ep.
    docs.pop()

    out = []
    for i,v in enumerate(index):
        out.append({'id': ordering[v][1], 'season': ordering[v][0]})
    return out


def recommend(favorites):
    """
    Determines recommended episodes based on a list of favorites.
    """
    # TODO: cool things
    corpus = copy.deepcopy(docs)
    corpusIdx = copy.deepcopy(ordering)

    query = ''
    for i,v in enumerate(favorites):
        idx = corpusIdx.index((v['season'],v['id']))
        query += docs[idx]
        del corpus[idx]
        del corpusIdx[idx]

    corpus.append(query)
    vectors = vectorizer.fit_transform(corpus)
    vector = cosine_similarity(vectors[-1], vectors)
    index = vector.argsort()[0][-2:-7:-1]
    docs.pop()

    out = []
    for i,v in enumerate(index):
        out.append({'id': corpusIdx[v][1], 'season': corpusIdx[v][0]})
    return out
