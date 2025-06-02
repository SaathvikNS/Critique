from transformers.pipelines import pipeline
from random import randint

classifier = pipeline("zero-shot-classification", model = "facebook/bart-large-mnli")

def get_topic(text: str):
    # candidate_labels = ["Education", "Technology", "Health", "Politics", "Travel"]
    candidate_labels = [
        # News & Current Affairs
        "Politics",
        "Government & Policy",
        "Elections",
        "World Affairs",
        "Diplomacy",
        "Local News",
        "Law & Justice",
        "Crime & Policing",
        "Military & Defense",
        "Disasters & Emergencies",
        "Social Justice",
        "Human Rights",
        "Protests & Movements",
        # Business & Economy
        "Business & Industry",
        "Finance & Banking",
        "Stock Market",
        "Real Estate",
        "Economics",
        "Startups",
        "Entrepreneurship",
        "E-commerce",
        "Consumer Trends",
        "Investment & Trading",
        # Science & Technology
        "Technology",
        "Artificial Intelligence",
        "Machine Learning",
        "Cybersecurity",
        "Robotics",
        "Data Science",
        "Blockchain & Web3",
        "Quantum Computing",
        "Software Development",
        "Hardware & Devices",
        "Cloud Computing",
        "Space & Astronomy",
        "Scientific Research",
        "Climate Science",
        "Sustainability",
        "Environmental Technology",
        # Health & Wellness
        "Health & Medicine",
        "Mental Health",
        "Nutrition",
        "Fitness & Exercise",
        "Public Health",
        "Medical Innovations",
        "Pandemic Updates",
        "Addiction & Recovery",
        "Sexual Health",
        "Wellness & Lifestyle",
        # Arts, Culture & Society
        "Culture & Society",
        "Education",
        "History",
        "Religion & Spirituality",
        "Philosophy",
        "Literature",
        "Language & Linguistics",
        "Ethics",
        "Fashion & Beauty",
        "Food & Cooking",
        "Relationships & Dating",
        "Parenting & Family",
        "Home & Garden",
        # Entertainment & Media
        "Entertainment",
        "Movies & TV",
        "Celebrities & Gossip",
        "Music",
        "Theatre & Performing Arts",
        "Books & Publishing",
        "Comics & Graphic Novels",
        "Photography",
        "Memes & Internet Culture",
        "Pop Culture Trends",
        "Influencers & Creators",
        # Games & Leisure
        "Gaming",
        "Esports",
        "Board Games",
        "Outdoor & Adventure",
        "Travel & Tourism",
        "Hobbies & DIY",
        "Sports",
        "Motorsport",
        "Martial Arts",
        "Recreational Activities",
        # Careers & Society
        "Job Market & Careers",
        "Workplace Culture",
        "Personal Development",
        "Productivity",
        "Life Coaching",
        "Digital Nomadism",
        "Freelancing",
        "Remote Work",
        "Ethics in Work",
        "Education Policy",
        # Real-World Sectors
        "Automotive",
        "Agriculture",
        "Energy & Utilities",
        "Logistics & Supply Chain",
        "Manufacturing",
        "Transportation",
        "Infrastructure",
        "Urban Development",
        # Digital & Internet Culture
        "Social Media",
        "Online Communities",
        "Misinformation & Fact-Checking",
        "Digital Rights",
        "Internet Privacy",
        "Digital Marketing",
        "Content Creation",
        "Tech Trends",
        "UX & Design",
    ]

    detection = classifier(text, candidate_labels)

    n = randint(10,20)
    top_labels = detection["labels"][:n]
    top_scores = detection["scores"][:n]

    total = sum(top_scores)

    topic = {label: round(score / total, 4) for label, score in zip(top_labels, top_scores)}


    """format of output:
    1. topics list
    2. confidence score of each topic
    """
    return topic