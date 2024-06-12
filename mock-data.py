import requests
import json
import random

# Function to create tags with realistic names
def create_tags():
    url = "http://127.0.0.1:5000/tag/new"
    headers = {
        "Content-Type": "application/json"
    }

    tags = ["Technology", "Travel", "Food", "Health", "Fashion", "Sports", "Music", "Art", "Business", "Science"]

    for tag in tags:
        payload = {
            "tagName": tag
        }
        response = requests.post(url, headers=headers, data=json.dumps(payload))
        print(response.text)

# Function to create posts with realistic titles, descriptions, and tags
def create_posts():
    url = "http://127.0.0.1:5000/post/new"
    categories = ["Technology", "Travel", "Food", "Health", "Fashion", "Sports", "Music", "Art", "Business", "Science"]
    tags = ["Technology", "Travel", "Food", "Health", "Fashion", "Sports", "Music", "Art", "Business", "Science"]

    for i in range(15): # Creating 15 posts
        title = f"Interesting {categories[i%len(categories)]} News"
        desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod magna quis nunc gravida, nec ultrices nisi consectetur. Vivamus nec tellus ac lorem iaculis tristique. Cras vehicula elit justo, nec venenatis ex varius vel."
        chosen_tags = random.sample(tags, k=random.randint(1, 3)) # Randomly choosing 1 to 3 tags for each post
        payload = {
            "title": title,
            "desc": desc,
            "tags": ",".join(chosen_tags),
            "category": categories[i%len(categories)]
        }
        try:
            with open('D:/Bleh/Zeitgeist/download.png', 'rb') as file:
                files = {'image': file}
                response = requests.post(url, data=payload, files=files)
                response.raise_for_status()  # Raise an exception for 4xx or 5xx status codes
                print(response.text)
        except requests.exceptions.HTTPError as err:
            print(f"Error in creating post: {err}")

if __name__ == "__main__":
    create_tags()
    create_posts()
